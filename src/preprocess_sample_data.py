import pandas as pd
import uuid
import json
from datetime import datetime
import sys

SCHEMA_PATH = "sample_crm_data_schema.json"
DATA_PATH = "sample_crm_data.csv"
OUTPUT_PATH = "preprocessed_sample_data.csv"
REPORT_PATH = "data_validation_report.txt"

# Load schema
def load_schema(path):
    with open(path, 'r') as f:
        return json.load(f)

# Validate a row against schema (basic checks)
def validate_row(row, schema):
    errors = []
    # Required fields
    for field in schema['required']:
        if field not in row or pd.isnull(row[field]):
            errors.append(f"Missing required field: {field}")
    # Type checks (simplified)
    try:
        uuid.UUID(str(row['id']))
    except Exception:
        errors.append("Invalid UUID for id")
    try:
        datetime.fromisoformat(row['timestamp'].replace('Z','+00:00'))
    except Exception:
        errors.append("Invalid timestamp format")
    if row['source'] not in ['salesforce', 'hubspot']:
        errors.append("Invalid source")
    # Numeric checks
    try:
        float(row['usage_score'])
    except Exception:
        errors.append("Invalid usage_score")
    try:
        int(row['support_tickets'])
    except Exception:
        errors.append("Invalid support_tickets")
    return errors

def preprocess():
    schema = load_schema(SCHEMA_PATH)
    df = pd.read_csv(DATA_PATH)
    validation_report = []
    processed = []
    for idx, row in df.iterrows():
        row_dict = {
            'id': row['id'],
            'timestamp': row['timestamp'],
            'source': row['source'],
            'usage_score': row['usage_score'],
            'support_tickets': row['support_tickets'],
            'churn_risk': row.get('churn_risk', ''),
            'upsell_potential': row.get('upsell_potential', '')
        }
        errors = validate_row(row_dict, schema)
        if errors:
            validation_report.append(f"Row {idx+1}: {errors}")
        # Preprocessing: fill missing, normalize usage_score (0-1), etc.
        try:
            row_dict['usage_score'] = float(row_dict['usage_score']) / 100.0
        except Exception:
            row_dict['usage_score'] = 0.0
        try:
            row_dict['support_tickets'] = int(row_dict['support_tickets'])
        except Exception:
            row_dict['support_tickets'] = 0
        processed.append(row_dict)
    # Save preprocessed data
    out_df = pd.DataFrame(processed)
    out_df.to_csv(OUTPUT_PATH, index=False)
    # Save validation report
    with open(REPORT_PATH, 'w') as f:
        for line in validation_report:
            f.write(str(line) + '\n')
    print(f"Preprocessing complete. Output: {OUTPUT_PATH}\nValidation report: {REPORT_PATH}")

if __name__ == "__main__":
    preprocess()

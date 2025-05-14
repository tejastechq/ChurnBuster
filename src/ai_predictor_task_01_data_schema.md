# Task Instruction: Define Data Schema for AI Predictor

## Objective
Specify the required fields, types, and validation rules for CRM data ingestion to support churn prediction.

## Steps
1. Review CRM Connector data export format (Salesforce, HubSpot).
2. Identify essential fields (customer ID, timestamps, usage metrics, support tickets, etc.).
3. Define data types and validation rules for each field.
4. Document schema in Markdown and as a JSON schema (for code use).
5. Link schema to ingestion pipeline in AI Predictor module.

## Minimal Context/Dependencies
- CRM Connector (data format)
- ChurnBuster Spec (data_entities.CustomerRecord)

## Expected Output
- Markdown and JSON schema for CRM data ingestion
- Documentation in AI Predictor module

## HDTA Links
- [Implementation Plan: ai_predictor_implementation_plan.md](ai_predictor_implementation_plan.md)

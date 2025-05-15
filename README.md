# ChurnBuster

## Core Objective
ChurnBuster is a SaaS platform designed for mid-market SaaS companies to predict churn, identify upsell opportunities, and automate retention strategies. It leverages AI-driven insights and integrates seamlessly with popular CRMs like Salesforce and HubSpot.

## Key Features
- **AI-Powered Predictions**: Utilizes machine learning models (built with Python and TensorFlow) to accurately forecast customer churn and identify potential upsell opportunities.
- **CRM Integration**: Connects with Salesforce and HubSpot via a Node.js-based API layer for efficient data ingestion and synchronization.
- **Automated Alerting**: An intelligent Alert Engine triggers notifications via Slack and email based on AI-generated insights and predefined rules.
- **Interactive Dashboard**: A user-friendly interface (built with React and Tailwind CSS) provides real-time metrics, customer insights, and actionable playbooks. *(Currently under development, with React/Tailwind setup and a static placeholder UI present).*
- **Automated ROI Reporting**: Generates comprehensive PDF reports detailing Return on Investment, leveraging a CRCT agent and LaTeX for professional document formatting.

## Modules
The ChurnBuster platform is composed of the following main modules:
1.  **AI Predictor**: Handles all machine learning predictions.
2.  **CRM Connector**: Manages data flow between ChurnBuster and external CRMs.
3.  **Alert Engine**: Responsible for generating and dispatching alerts.
4.  **Dashboard App**: The primary user interface for interacting with the platform.
5.  **Report Generator**: Creates automated reports.

## Technology Stack
- **Backend & AI**: Python, TensorFlow, Node.js
- **Frontend**: React, Tailwind CSS
- **Reporting**: LaTeX
- **Development Framework**: This project utilizes the Cline Recursive Chain-of-Thought System (CRCT) for development and task management.

## Current Status
The core modules for ChurnBuster have been delivered for MVP (Minimum Viable Product) as of May 14, 2025. This includes the AI Predictor, CRM Connector, Alert Engine, and Report Generator, along with their dependencies, integrations, and documentation verified as complete.

The **Dashboard App** is currently partially implemented. The React/Tailwind setup and a static placeholder UI are in place. Full implementation of the dashboard is the next major development focus.

For more detailed project planning and status, please refer to `cline_docs/system_manifest.md` and other documents within the `cline_docs` directory.

## Getting Started
(This section will be populated with specific setup, build, and run instructions as the ChurnBuster application components are further developed and integrated.)

1.  **Prerequisites**:
    *   Node.js (for CRM Connector, Dashboard App)
    *   Python (for AI Predictor)
    *   LaTeX (for Report Generator)
    *   Access to Salesforce/HubSpot developer accounts (for CRM integration)
2.  **Installation**:
    ```bash
    # Clone the repository
    git clone <repository_url>
    cd ChurnBuster

    # Example installation steps for modules:
    # For the Dashboard App (if frontend dependencies are managed within its directory)
    # cd src/dashboard_app 
    # npm install

    # For the AI Predictor (if it has its own requirements.txt)
    # cd src/ai_predictor
    # pip install -r requirements.txt
    ```
3.  **Configuration**:
    *   Set up API keys and credentials for Salesforce, HubSpot, Slack, and email services in a secure manner (e.g., using environment variables or a configuration file not committed to the repository).
    *   Configure database connections if applicable.
    *   (Detailed configuration steps will be added as modules are finalized.)
4.  **Running the Application**:
    *   (Instructions for starting backend services, the frontend development server, and any other necessary processes will be provided here.)

## Project Structure (High-Level)
The ChurnBuster application components are planned to be organized within the `src/` directory. The overall workspace also includes the CRCT development framework:
'''
ChurnBuster/
├───src/
│   ├───ai_predictor/       # (Planned) Python, TensorFlow ML models
│   ├───crm_connector/      # (Planned) Node.js API for CRM integration
│   ├───alert_engine/       # (Planned) Logic for alerts
│   ├───dashboard_app/      # React + Tailwind UI (partially implemented, see existing directory)
│   └───report_generator/   # (Planned) LaTeX and CRCT agent for reports
├───docs/                     # Project-specific documentation (API designs, user guides, etc.)
├───cline_docs/               # CRCT System: Operational memory, prompts, templates for project management
├───cline_utils/              # CRCT System: Utility scripts for dependency management
├───.clinerules               # CRCT System: Configuration file
├───.gitignore
├───README.md                 # This file
├───requirements.txt          # Top-level Python dependencies (e.g., for CRCT utilities or shared project libs)
└───... (other configuration files, e.g., Dockerfile, .env.example)
'''
*Note: The `cline_docs`, `cline_utils`, and `.clinerules` are part of the CRCT development framework used to build and manage the ChurnBuster project.*

## Future Plans
- Complete the full implementation of the interactive Dashboard App, including dynamic data visualization and playbook integration.
- Continuously refine and improve the accuracy of the AI prediction models.
- Expand the capabilities of the Alert Engine with more sophisticated rule configurations.
- Develop additional automated playbooks for customer retention and upsell strategies.
- Enhance the Report Generator with more customizable report templates.

---

This README now reflects the ChurnBuster project. If you have specific details for the "Getting Started" section or want adjustments to the "Project Structure", let me know!

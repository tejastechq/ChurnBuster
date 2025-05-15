# Changelog

## Component: AI Predictor
---
### Model Evaluation and API Integration - 2025-05-14
- Model evaluation completed for baseline churn predictor. Results documented in `model_evaluation_report.md`.
- Model API server implemented and tested. End-to-end pipeline (data → model → API → client) is operational.

## Component: Dashboard App
---
### Correction - 2025-05-15
- Dashboard App is only partially implemented: React/Tailwind setup and static placeholder UI present.
- No API integration, playbook management, authentication, or user/admin documentation implemented.
- Previous claims of full implementation and documentation were incorrect.
- Documentation and progress trackers updated to reflect true state.
- Next step: Re-initiate Strategy phase for Dashboard App.

## Component: Alert Engine
---
### Alert Engine Integration - 2025-05-14
- Alert engine integration tested and working (`alert_engine_api_example.py`).

## General
---
### Project State Updates - 2025-05-14
- Updated `activeContext.md` to reflect Execution phase progress and next steps.
- Updated `.clinerules` to mark Set-up/Maintenance complete and begin Strategy phase.
- Updated `activeContext.md` with new work focus and next steps for area-based planning.

## [2025-05-15] - Dashboard App Core UI Completion
- **Description**: Implemented static UI for all core components of the Dashboard App including Overview, Metrics, Playbooks, Alerts, and Settings pages. Navigation is fully set up using React Router.
- **Reason**: To establish the foundational user interface as per the wireframes and UI/UX requirements for the ChurnBuster Dashboard App.
- **Affected Files**:
  - `src/dashboard_app/src/components/Overview.tsx`
  - `src/dashboard_app/src/components/Metrics.tsx`
  - `src/dashboard_app/src/components/Playbooks.tsx`
  - `src/dashboard_app/src/components/Alerts.tsx`
  - `src/dashboard_app/src/components/Settings.tsx`
  - `src/dashboard_app/src/App.tsx`
  - `src/dashboard_app/dashboard_app_task_03_core_ui.md`

## [0.3.0] - 2025-05-15
### Added
- Implemented Playbooks functionality with CRUD operations in `Playbooks.tsx`, integrated with API.
- Added Alerts data integration in `Alerts.tsx` to display churn risk notifications dynamically.
- Implemented Authentication integration with `AuthContext.tsx` and `Login.tsx`, including route protection in `App.tsx`.
- Updated `DataContext.tsx` to manage data for Playbooks and Alerts.
- Updated `client.ts` and `api.ts` to include necessary endpoints and interfaces for Playbooks, Alerts, and Authentication.

### Changed
- Updated `Settings.tsx` to display user information and provide a logout option.

### Fixed
- Ensured all components are properly integrated with their respective API endpoints.

## [0.4.0] - 2025-05-16
### Added
- Enhanced error handling for Playbooks CRUD operations in `Playbooks.tsx`.
- Added functionality to take action on alerts in `Alerts.tsx` with error handling.

### Changed
- Updated `DataContext.tsx` to refresh playbooks state after create, update, and delete operations.
- Updated `AuthContext.tsx` to include server-side logout call.

### Fixed
- Fixed state management issues in Playbooks to ensure UI reflects backend changes.

**The Changelog is for tracking changes to the *project's* files, not CRCT operations. CRCT operations are tracked in the HDTA documents.**
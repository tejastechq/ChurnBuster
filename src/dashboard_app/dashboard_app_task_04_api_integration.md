# Dashboard App Task 04: API Integration

## Objective
Integrate the Dashboard App with the AI Predictor API and other backend services to enable dynamic data display and interaction for churn prediction, customer metrics, playbooks, and alerts.

## Dependencies
- Completion of core UI implementation (`dashboard_app_task_03_core_ui.md`).
- Access to AI Predictor API documentation and endpoints.

## Steps
1. **Define API Endpoints**: Identify and document the required API endpoints for each Dashboard App view (Overview, Metrics, Playbooks, Alerts).
2. **Data Structure Mapping**: Map API response data to UI components for each view.
3. **State Management Setup**: Implement state management (e.g., Redux or React Context) to handle API data across components.
4. **API Client Setup**: Create a centralized API client using `axios` or Fetch API with error handling and authentication support.
5. **Integrate Overview Data**: Fetch and display summary data (e.g., churn risk distribution, key stats) in the Overview page.
6. **Integrate Metrics Data**: Fetch and display detailed customer metrics and graphs in the Metrics page.
7. **Integrate Playbooks Functionality**: Enable CRUD operations for playbooks (create, read, update, delete) via API calls.
8. **Integrate Alerts Data**: Fetch and display churn risk alerts with action options in the Alerts page.
9. **Authentication Integration**: Implement user authentication flow (login/logout) and secure API requests with tokens.
10. **Testing and Debugging**: Test API integrations for each view, handle edge cases (loading, error states), and debug issues.

## Expected Output
- Fully functional Dashboard App with dynamic data fetched from the AI Predictor API and other services.
- Secure authentication ensuring only authorized users access the dashboard.
- Error handling for API failures, with user-friendly feedback in the UI.

## Status
- [x] Define API Endpoints
  - **Overview**: `GET /api/overview` - Fetch summary data for churn risk distribution and key stats.
  - **Metrics**: `GET /api/metrics?customerId={id}&range={days}` - Fetch detailed metrics for graphs and filters.
  - **Playbooks**: 
    - `GET /api/playbooks` - List all playbooks.
    - `POST /api/playbooks` - Create a new playbook.
    - `PUT /api/playbooks/{id}` - Update an existing playbook.
    - `DELETE /api/playbooks/{id}` - Delete a playbook.
  - **Alerts**: `GET /api/alerts?status={status}` - Fetch churn risk alerts filtered by status.
    - `POST /api/alerts/{id}/action` - Take action on an alert (e.g., dismiss or trigger playbook).
  - **Authentication**: 
    - `POST /api/auth/login` - Authenticate user and receive token.
    - `POST /api/auth/logout` - Invalidate current token.
- [x] Data Structure Mapping
  - **Overview**: Map `GET /api/overview` response to display churn risk distribution (e.g., `{ highRisk: number, mediumRisk: number, lowRisk: number }`), CLV (`{ averageCLV: number }`), retention rate (`{ rate: number }`), and active playbooks count (`{ count: number }`).
  - **Metrics**: Map `GET /api/metrics` response to display customer metrics over time (e.g., `{ dates: string[], usageScores: number[], supportTickets: number[], churnProbabilities: number[] }`).
  - **Playbooks**: Map `GET /api/playbooks` response to list playbooks (e.g., `{ id: string, name: string, triggers: string[], actions: string[] }[]`), and handle CRUD responses for creation, update, and deletion.
  - **Alerts**: Map `GET /api/alerts` response to display alerts (e.g., `{ id: string, customerId: string, riskLevel: 'high' | 'medium' | 'low', lastActivity: string, riskScore: number }[]`), and handle action responses for `POST /api/alerts/{id}/action`.
  - **Authentication**: Map `POST /api/auth/login` response to store token and user info (e.g., `{ token: string, user: { id: string, name: string, email: string } }`).
- [x] State Management Setup
  - **Solution Chosen**: React Context API for managing global state related to API data and user authentication.
  - **Reason**: Simplicity and built-in support in React, suitable for the scale of the Dashboard App without the overhead of Redux.
  - **Implementation Plan**: Create context providers for authentication (token, user info) and data (overview, metrics, playbooks, alerts) to be used across components.
- [x] API Client Setup
  - **Implementation**: Centralized API client using Fetch API with error handling and authentication token management.
  - **Location**: `src/dashboard_app/src/api/client.ts`
  - **Features**: Methods for login/logout, fetching overview, metrics, playbooks, alerts, and CRUD operations for playbooks and alert actions.
- [x] Integrate Overview Data
  - **Implementation**: Updated Overview.tsx to use data from DataContext, displaying dynamic content for churn risk, CLV, retention rate, and active playbooks.
  - **Features**: Added refresh button to reload data on demand.
- [ ] Integrate Metrics Data
- [ ] Integrate Playbooks Functionality
- [ ] Integrate Alerts Data
- [ ] Authentication Integration
- [ ] Testing and Debugging 
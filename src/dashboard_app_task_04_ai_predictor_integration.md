# Task Instruction: Integrate with AI Predictor API

**Status: Drafted, needs review**

## Objective
Fetch and display prediction data (churn risk, CLV, retention metrics) from the AI Predictor API in the Dashboard App, focusing on the Metrics and Overview pages.

## Reference
- [Implementation Plan: dashboard_app_implementation_plan.md](dashboard_app_implementation_plan.md)
- [Core UI Task: dashboard_app_task_03_core_ui.md](dashboard_app_task_03_core_ui.md)

---

## Atomic Steps
1. **Review API Documentation**
   - Confirm available endpoints, request/response formats, and authentication requirements for the AI Predictor API.
2. **Plan Data Integration**
   - Identify which metrics are needed for the Metrics and Overview pages (churn risk, CLV, retention).
   - Define data structure and state management approach (e.g., React hooks, context).
3. **Implement API Calls**
   - Add API call logic to fetch prediction data.
   - Handle loading, error, and empty states.
4. **Display Data in Metrics Page**
   - Replace static placeholders with dynamic data for churn risk, CLV, and retention metrics.
5. **Display Data in Overview Page**
   - Update metric widgets to show live data from the API.
6. **Testing and Error Handling**
   - Test integration with mock and real API responses.
   - Ensure robust error handling and user feedback.

## Minimal Context/Dependencies
- AI Predictor API documentation and endpoints
- Metrics and Overview page components
- Core UI implementation

## Expected Output
- Metrics and Overview pages display live prediction data from the AI Predictor API
- Loading and error states are handled gracefully
- Ready for review and further integration (e.g., Alert Engine)

## HDTA Links
- [Implementation Plan: dashboard_app_implementation_plan.md](dashboard_app_implementation_plan.md)

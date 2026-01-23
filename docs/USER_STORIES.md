# User Stories & Acceptance Criteria

This document outlines the user stories for the AWS Cost Dashboard, organized by development Sprint.

## Sprint 1: Authentication & RBAC Foundation

### 1a. Secure Login
**Role**: All Roles
**Story**: As a User, I want to log in securely using email and password, so that I can access the system without unauthorized parties viewing sensitive cost data.
**Acceptance Criteria**:
1. [x] User enters valid credentials → Redirected to `/home`.
2. [x] User enters invalid credentials → Error message displayed ("Invalid credentials").
3. [x] Session is maintained via secure HTTP-only cookies.

### 1b. Role-Based Interface (RBAC)
**Role**: All Roles
**Story**: As a User, I want to see only navigation options relevant to my role, so that the interface is clean.
**Acceptance Criteria**:
1. [x] DevOps & Admin see "Upload" and "Settings" links.
2. [x] Finance & HOD do **NOT** see "Upload" or "Settings".
3. [x] User profile badge displays role name.

---

## Sprint 2: Dashboard Visualization & Cost Analysis
*(As defined in user request Table 4.4 - Refer to previous sections for details)*

---

## Sprint 3: Service Analysis & Advanced Investigation
**Focus**: Detailed analysis of specific services and cost drivers.

### Table 4.5 User Stories for Service Analysis & Advanced Features (Sprint 3)

| Features/Scope | User Stories | Acceptance Criteria |
| :--- | :--- | :--- |
| **3 a**<br><br>View cost distribution and cost investigation for specific AWS services per account. | **As a DevOps/Finance/HOD,**<br>I want to view top services cost per account,<br>So that I can identify which services consume the most budget.<br><br>**As a DevOps/Finance/HOD,**<br>I want to view all services cost per account,<br>So that I can see the long tail of cloud spending.<br><br>**As a DevOps/Finance/HOD,**<br>I want to view service cost comparison,<br>So that I can compare costs visually between different services.<br><br>**As a DevOps/Finance/HOD,**<br>I want to view services cost trend,<br>So that I can know monthly cost progression for selected services of accounts.<br><br>**As a DevOps/Finance/HOD,**<br>I want to view cost investigation,<br>So that I can drill down into granular usage types (e.g., t3.medium) for unexplained costs. | **Given that** I am on the Service Analysis page,<br>**When** I view the "Service Costs Comparison" section,<br>**Then** I should see a bar chart displaying the top 5 highest cost services by default.<br><br>**Given that** I am viewing the top services,<br>**When** I click the "Show All Services" button,<br>**Then** the chart should expand or a list should appear showing every service with recorded costs.<br><br>**Given that** I am viewing the comparison chart,<br>**When** multiple services are displayed,<br>**Then** each bar should be distinctly colored and labeled with value.<br><br>**Given that** I have selected a service,<br>**When** I scroll to the "Service Cost Trends" section,<br>**Then** I should see a chronological chart (Line or Bar) showing that service's cost over the last 12 months.<br><br>**Given that** I see a spike in the Trend chart,<br>**When** I click on a specific month bar/point,<br>**Then** a detailed "Cost Investigation" panel should open identifying the specific usage types driving that cost. |
| **3 b**<br><br>Filter period range, services and accounts for service costs comparison and service costs trends. | **As a DevOps/Finance/HOD,**<br>I want to filter selected month and account,<br>So that I can analyze the "Service Costs Comparison" for a specific financial period and client.<br><br>**As a DevOps/Finance/HOD,**<br>I want to filter selected service and account,<br>So that I can focus the "Service Costs Trends" chart on a specific resource context. | **Given that** I am on the Service Analysis page,<br>**When** I select a "Month" (e.g., October 2025) and "Account" from the top filters,<br>**Then** the "Service Costs Comparison" bar chart should update to show costs only for that specific month and account.<br><br>**Given that** I am viewing the Trends section,<br>**When** I select an "Account" and specific "Service" (e.g., AWS Data Transfer),<br>**Then** the trend chart below should refresh to display the 12-month history for that specific service-account combination. |

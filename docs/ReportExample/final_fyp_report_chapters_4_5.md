
# CHAPTER 4: RESULTS AND FINDINGS

This chapter will provide an explanation of the project's outcomes and conclusions, with particular attention to each of the Scrum Methodology phases that were covered in Chapter 3. This chapter offers a thorough justification of the results from every phase and a comprehensive comprehension of the results attained during the project.

## 4.1 Results of Initiation Phase

Chapter 4 presents the findings of the initiation phase, which reveal a thorough comprehension of the requirements for the AWS Cost Dashboard. The project team successfully identified and assessed the needs through stakeholder interviews and meetings, resulting in a clear document defining the system's functionalities and objectives. This phase guarantees alignments with stakeholder expectations, reducing misconceptions and increasing the possibility of a successful solution.

The next step is to meet with the DevOps team to further examine the needs that have been gathered. The purpose is to gain a thorough understanding of project requirements and allow effective communication between the development team and stakeholders. The result is an assessed collection of requirements that serve as an important basis for following project stages, keeping the development process informed and aligned with changing stakeholder demands. The project's iterative approach recognises that when stakeholders gain clarity or contribute more insights, the team must stay adaptive, reviewing and improving features such as the product backlog and user stories to ensure alignment with changing needs.

### 4.1.1 Results of Interviews

The initial phase of stakeholder interviews provides critical information about the requirements for the centralized cost monitoring. Stakeholders are identified throughout this interview process, and a set of questions is ready. To design the system based on stakeholder requirements, the team must obtain insights from the DevOps Lead and Finance Manager through active engagement. These interviews are a crucial component of the project since they give the team a thorough grasp of the needs and expectations of the stakeholders.

Table 4.1 and 4.2 provides a summary of the key questions and answers discussed during the interview sessions with the stakeholders. Table 4.1 is regarding the problem statement one: The manual inefficiency of tracking costs across multiple AWS accounts. Table 4.2 details the second problem statement: The lack of visibility into historical trends and cost anomalies.

**Table 4.1 Summary of the first interview**

| No | Question | Answer |
| :--- | :--- | :--- |
| 1 | Can you describe the current system for monitoring AWS costs across your clients? | Currently, our process is manual and decentralized. We have to log in to each client's AWS account individually to check their billing dashboard. We then export these costs into separate CSV files and manually merge them into a master spreadsheet. |
| 2 | What limitations or challenges have you encountered with this manual process? | The main issue is the time consumption and potential for human error. It takes 2-4 hours just to compile a weekly report. Additionally, because the data is in static spreadsheets, we cannot easily filter or visualize the data dynamically to answer specific questions from management. |
| 3 | How does this affect your team's productivity? | It significantly drains our productivity. Our DevOps engineers should be focusing on infrastructure optimization and automation, but instead, they are spending valuable hours on data entry and administrative reporting tasks. |

**Table 4.2 Summary of the second interview**

| No | Question | Answer |
| :--- | :--- | :--- |
| 1 | Can you give examples of scenarios where the current process failed to meet objectives? | There was an incident where a development server was left running over the weekend in a client account. Because we only manually check costs once a week, we didn't catch the spike until the following week, resulting in unnecessary expenditure that could have been avoided with better visibility. |
| 2 | What impact do you believe the lack of centralized visibility has on financial decision making? | Without a centralized view, we cannot easily compare spending trends across different projects or environments. We lack the historical data context to forecast future budgets accurately, leading to reactive rather than proactive financial planning. |
| 3 | What specific features do you feel are lacking to better manage these costs? | We critically need a centralized dashboard that pulls data automatically. We need to see spending breakdown by Service (EC2, S3, RDS) and by Environment (Dev, Staging, Prod) in real-time charts without manual intervention. |

### 4.1.2 Results of Analysis

Based on the interview, several key insights and findings were gathered about the current process and the proposed AWS Cost Dashboard. The analysis results are as follows:

**a) Inefficiency of Manual Aggregation**
Based on Question 1 and 2 in Table 4.1, the reliance on manual logins and spreadsheet merging is the primary bottleneck. This confirms the critical need for automation using AWS Cost Explorer APIs to fetch and aggregate data programmatically.

**b) Lack of Real-Time Visibility**
Based on Question 1 in Table 4.2, the delay in reporting due to manual cycles leads to "blind spots" where cost spikes go undetected. This validates the requirement for a dashboard that updates automatically or via simple triggers (like S3 reporting webhooks).

**c) Need for Granular Visualization**
Based on Question 3 in Table 4.2, stakehodlers require specific breakdowns (Service, Environment). The system design must prioritize flexible charting capabilities (bar charts for services, line charts for trends) over simple tabular data.

## 4.2 Results of Planning and Estimation Phase

In the Planning and Estimation Phase, the creation of the Functional Specification Document (FSD) began after requirements were gathered. This project is divided into three sprints:

*   **Sprint 1:** Focuses on System Setup, Authentication, and Basic Dashboard Layout (BOS).
*   **Sprint 2:** Dedicated to Data Ingestion mechanisms (CSV Upload, S3 Webhook integration) and Backend API development.
*   **Sprint 3:** Focuses on Advanced Visualization (Charts, Filtering) and Reporting features.

### 4.2.1 User Stories

User stories are informal, general explanations of software features written from the perspective of the end user.

**Table 4.3 User Stories for System Setup & Auth (Sprint 1)**

| Features / Scope | User Stories | Acceptance Criteria |
| :--- | :--- | :--- |
| **1a Authentication** | As a **User**, I want to **log in** with email and password so that I can access the private cost dashboard. | 1. User enters valid credentials -> Redirect to Home.<br>2. Invalid credentials -> Show error message.<br>3. Session is maintained via secure cookies. |
| **1b Dashboard Layout** | As a **User**, I want a **responsive sidebar navigation** to access different modules easily. | 1. Sidebar contains links to Home, Upload, and Settings.<br>2. Sidebar can collapse/expand for better viewing area. |

**Table 4.4 User Stories for Data Ingestion (Sprint 2)**

| Features / Scope | User Stories | Acceptance Criteria |
| :--- | :--- | :--- |
| **2a Manual Upload** | As an **Admin**, I want to **upload a CSV cost report** to import historical data manually. | 1. Upload page accepts CSV files.<br>2. System validates file format.<br>3. Success message shown upon completion. |
| **2b Automated Ingestion** | As a **System**, I want to **process S3 webhooks** to automatically ingest new cost reports. | 1. Webhook endpoint receives JSON payload.<br>2. System downloads file from S3.<br>3. Data is parsed and stored in database automatically. |

**Table 4.5 User Stories for Visualization (Sprint 3)**

| Features / Scope | User Stories | Acceptance Criteria |
| :--- | :--- | :--- |
| **3a Cost Overview** | As a **Finance Manager**, I want to see a **Monthly Trend Chart** to track spending over time. | 1. Area chart displays cost trends for the last 12 months.<br>2. Tooltip shows exact cost on hover. |
| **3b Filtering** | As a **DevOps Engineer**, I want to **filter costs by Account** to isolate client spending. | 1. Dropdown lists all active accounts.<br>2. Selecting an account updates all charts instantly. |

### 4.2.2 Sequence Diagram

*(Note: Please insert your Figure 4.1 here based on the generated PlantUML diagrams)*

The sequence diagram outlines the process of data ingestion. It begins with the User or System Trigger (S3 Event). The Data Parser reads the incoming CSV/JSON stream. The Backend API validates the schema and processes the records. Finally, the formatted data is stored in the Database (PostgreSQL), and a confirmation response is sent back to the User/System.

### 4.2.3 Design Interface of the System

In the development of the system, the UI design is crucial.

**a) Dashboard Home Page**
The main dashboard is designed with a "Card-based" layout. Key metrics (Total Cost, Active Accounts, Month-over-Month change) are displayed at the top for immediate visibility. Below this, the "Monthly Trend" area chart takes up the central space, providing a visual history of spending.

**b) Upload Interface**
The upload page features a clean drag-and-drop zone for CSV files. It includes a "Month/Year" selector to ensure the data is tagged to the correct billing period.

## 4.3 Results of Implementation Phase

In the Implementation phase, the project team turned the designs into a working product using Next.js (Frontend) and Laravel (Backend).

### 4.3.1 Interfaces of the System

*(Note: Insert screenshots of your final application here)*

**Figure 4.14 Login Page**
The login page features a secure, clean interface requiring Email and Password. It includes validation for empty fields and incorrect credentials.

**Figure 4.15 Main Dashboard**
The completed dashboard integrates Recharts for high-performance data visualization. The "Account Breakdown" pie chart and "Service Cost" bar chart interact dynamically—hovering over a slice highlights the specific cost details.

**Figure 4.16 Upload & Parsing**
The upload module successfully handles large CSV files. A progress bar indicates the parsing status, and a success notification confirms when data is successfully saved to the PostgreSQL database.

## 4.4 Summary

This chapter detailed the results of the Initiation, Planning, and Implementation phases. It highlighted the transition from a manual, error-prone process to a centralized, automated dashboard. The user stories guided the development of key features like authentication, data ingestion, and visualization, culminating in a functional web-based system that meets the stakeholder objectives.

---

# CHAPTER 5: CONCLUSION AND RECOMMENDATION

This chapter summarises the development of the AWS Cost Dashboard for Silentmode's IDP. It emphasises the limits found throughout the project and makes recommendations for future improvement.

## 5.1 Conclusion

The aim of this project was to develop a centralized AWS Cost Dashboard to streamline cost monitoring for DevOps teams. The project has been successfully achieved by accomplishing the following objectives:

### 5.1.1 Objective 1: To gather and analyse the requirements for the AWS Cost Dashboard
We successfully gathered requirements through interviews with the DevOps Lead, identifying the critical pain points of manual data entry and lack of visibility. The analysis confirmed the need for an automated, API-driven solution.

### 5.1.2 Objective 2: To design the interface of the AWS Cost Dashboard
We designed a user-friendly, responsive interface using Next.js. The design prioritizes data visualization, offering clear charts and interactive filters that allow users to drill down into costs by account or service.

### 5.1.3 Objective 3: To develop the centralized cost monitoring system
We successfully developed the full-stack system using Laravel (Backend) and PostgreSQL. The system now automates the ingestion of cost reports and provides a real-time dashboard, reducing the reporting time from hours to minutes.

## 5.2 Strength

*   **Centralized Efficiency:** The system consolidates data from multiple sources into a single pane of glass, eliminating the need to log in to multiple accounts.
*   **Automated Ingestion:** The S3 integration removes manual data entry errors and ensures data is always up-to-date.
*   **Interactive Visualization:** Unlike static spreadsheets, the dashboard allows dynamic filtering and deep-dive analysis through interactive charts.

## 5.3 Project Limitation

*   **Single Cloud Provider:** Currently, the system only supports AWS. It does not yet support Azure or Google Cloud Platform, which may be needed for a multi-cloud strategy.
*   **No Predictive Analytics:** The system reports historical data but does not yet use Machine Learning to forecast future spending or alert on anomalies automatically.

## 5.4 Recommendations for Future Enhancements

*   **Multi-Cloud Support:** Future iterations should include adaptors for Azure Cost Management and Google Cloud Billing to provide a true hybrid-cloud cost view.
*   **AI-Powered Forecasting:** Implementing a Machine Learning model (e.g., using Python or AWS SageMaker) could allow the system to predict future bills based on historical trends.
*   **Budget Alerts:** Adding a notification system (Email/Slack) to alert users when creating spending thresholds are breached would further enhance cost control.

## 5.5 Summary

In conclusion, the AWS Cost Dashboard successfully addresses the inefficiency of manual cost tracking. By centralizing data and automating visualization, it empowers Silentmode's DevOps team to make faster, data-driven decisions. While there are opportunities for future expansion into multi-cloud and AI, the current system delivers significant value by optimizing the foundational process of cloud cost management.

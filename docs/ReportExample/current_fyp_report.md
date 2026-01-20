Universiti Teknologi MARA

AWS Cost Dashboard for Silentmode’s Internal
Developer Platforms (IDP)

Student Name
MUHAMMAD IMAN NORADAM BIN MOHD NADZRI

Final Year Project Proposal
Bachelor of Information System (Hons.)
Information Systems Engineering (3u1i Mode)
Faculty of Computer Science and Mathematics

MARCH 2025

TABLE OF CONTENTS

TABLE OF CONTENTS​

ii

LIST OF FIGURES​

iv

LIST OF TABLES​

v

LIST OF ABBREVIATIONS​

vi

​
CHAPTER 1: INTRODUCTION​

1

1.1 Background of study​

1

1.2 Problem Statement​

5

1.3 Project Aim​

6

1.4 Project Objectives​

7

1.5 Project Scope​

7

1.6 Project Significance​

8

1.7 Outline of the Proposal​

9

1.8 Summary​

10

CHAPTER 2 : LITERATURE REVIEW
2.1 Overview of Amazon Web Services (AWS)​
2.1.1 AWS Cost Management and tools​

13
13

2.1.2 Challenges in managing multi-account cloud cost​

16

2.1.3 Benefits of Centralized Cost Dashboards​

17

2.2 Technical solutions​

18

2.2.1 Machine Learning​

19

2.2.2 ELT Pipelines​

19

2.2.3 Data Visualization​

20

2.2.4 Comparison of techniques​

21

2.3 System platform​
2.3.1 Internal Developer Platform (IDP)​
2.4 Methodology for AWS Cost Dashboard development​

23
23
24

2.4.1 Waterfall methodology​

24

2.4.2 Agile-Scrum methodology​

26

2.4.3 V-Model methodology​
2.5 Related Works​

28
32

2.5.1 AWS Cost Explorer​

32

2.5.2 CloudZero​

33

2.5.3 Vantage​

34

2.5.4 Comparison of related works​

35

2.6 Discussion​

37

2.7 Summary​

38

CHAPTER 3 : METHODOLOGY
3.1 Overview of SDLC Methodology​

39

3.2 Agile-Scrum model for AWS Cost Dashboard​

40

3.3 Scrum phases of AWS Cost Dashboard​

41

3.3.1 Initiation phase​

43

3.3.2 Planning and Estimation phase​

44

3.3.3 Implementation phase​

45

3.4 Software and Hardware specifications​

46

3.4 Summary​

48

REFERENCES​

50

APPENDIX A​

56

​

LIST OF FIGURES

FIGURES​
1.1

The business objectives mapped out by Silentmode Sdn. Bhd.​

2

1.2

Flowchart of current process​

4

2.1

Outline of AWS Cost Dashboard for Silentmode’s Internal Developer
Platform (IDP)​

​

PAGE

​

​

​

​

​

​
​

​

12

2.2

AWS Cost Explorer flow diagram

​

15

2.3

AWS Cost Explorer table​​

​

​

​

​

2.4

ELT pipeline process diagram​

​

​

​

​

2.5 ​

Waterfall model diagram

2.6

Agile-Scrum methodology model diagram​

2.7 ​

V-Model methodology diagram

2.8 ​

AWS Cost Explorer page​ ​

​

​

​

​

​

32

2.9 ​

CloudZero management page​

​

​

​

​

​

33

2.10 ​

Vantage cost management page​ ​

​

​

​

​

34

15
​

19
25

​

​

​

27
29

LIST OF TABLES

TABLE​

PAGE

1.1

Outline of each chapter ​

9

2.1

Comparison of technical solution​

21

2.2

Comparison between Waterfall, Agile-Scrum and V-Model​

30

2.3

Comparison between AWS Cost Explorer, CloudZero and Vantage​

33

3.1

Scrum phases of AWS Cost Dashboard project​

42

3.2

Software specifications​

47

3.3

Hardware specifications​

48

LIST OF ABBREVIATIONS

AWS​ ​

​

Amazon Web Services

ELT​

​

​

Extract Load Transform

ETL​ ​

​

Extract Transform Load

IDP​

​

​

Internal Developer Platforms

RAM​ ​

​

Random Access Memory

GB​

​

​

Gigabyte

SSD​ ​

​

Solid State Drive

FSD​ ​

​

Functional System Diagram

CHAPTER 1

INTRODUCTION
This system is entitled the AWS Cost Dashboard for Silentmode’s Internal Developer
Platforms (IDP). This chapter explains the motivation and purpose behind the AWS
Cost Dashboard project. It begins with the background of the study and outlines the
problems that led to the development of this system. The chapter continues with the
aim, objectives, and scope of the project. Finally, it presents the significance of the
system, the structure of this thesis, and a summary of the chapter.

1.1 ​ Background of study
In the digital transformation space, cloud computing is a key component of IT
infrastructure to use in the organization. One of the most adopted cloud
platforms in the world right now is Amazon Web Services (AWS). AWS is a
comprehensive cloud computing platform which offers a comprehensive suite
of cloud services, including compute, storage, databases, analytics,
networking, and machine learning tools. AWS enables organizations to
provision and manage these resources on-demand, allowing for rapid scaling
and innovation without the need for significant upfront investments in
physical hardware (Amazon Web Services, 2024).
At Silentmode Sdn. Bhd., there is an ongoing effort to improve how
development and operations teams manage their work, especially when it
comes to handling infrastructure across different environments and clients.
One of the ideas being explored is the creation of an Internal Developer
Platform (IDP), which would act as a centralized space for DevOps to access
tools, automate deployments, manage environments, and handle cloud
resources. While the platform is not in place yet, the vision is clear: to reduce
manual work and give the team better control and consistency when working
with cloud infrastructure. Figure 1.1 illustrates the business objectives
1

mapped out by Silentmode Sdn. Bhd., including key initiatives such as cost
management, platform development, infrastructure modernization, and
security compliance. It also highlights the role of the proposed Internal
Developer Platform (IDP) in supporting these objectives by centralizing
DevOps processes like cost reviews, environment provisioning, automated
deployments, and cost anomaly detection.

Figure 1.1 The business objectives mapped out by Silentmode Sdn. Bhd.
The AWS Cost Dashboard project supports this bigger picture. It addresses a
real problem the team faces today, which is spending hours manually
checking and compiling AWS billing data from separate accounts. By turning
the data into clear visual insights, the dashboard acts as the first step toward
building an integrated platform in the future. It gives the DevOps team a
better handle on where money is being spent, helps catch cost spikes early,
and lays the foundation for a more connected and efficient workflow once the
IDP is successfully deployed.

2

The company uses a multi account setup, with separate AWS accounts for
each client to manage different environments such as development, staging
and production. This method improves security and makes it easier to track
activities by keeping each client’ resources separate.
However, this multi account setup led to some challenges. It is hard to get a
clear and overall picture of the company’s AWS spending. Figure 1.2
illustrates how the DevOps teams have to keep track of the costs of each
account separately. Due to the absence of a centralized dashboard, users are
required to log into each account’s billing page, extract the data manually and
consolidate it into spreadsheets. At the end, the reports of the accounts also
need to be reviewed with the Head of Department. This manual process can
take 2 to 4 hours per reporting cycle, and it is easy to make mistakes along
the way. As a result, it slows things down and makes it harder to make quick
decisions.

3

Figure 1.2 Flowchart of current process
Because of this, there has been a growing need for a centralized AWS Cost
Dashboard such tool that would automatically visualize, gather and combine
data from all accounts to display historical trends of the accounts’ spending.
By having this kind of dashboard, it would not only reduce the workload of
4

the DevOps teams but also give everyone clearer insight into costs and make
smarter decisions based on the data.
The main goal of this project is to solve the current visibility issue by
building a centralized dashboard that automatically gathers AWS cost data
using the AWS Cost Explorer APIs. This dashboard will make it easy for
users to view and filter spending by service or environment, and track trends
over time through clear visualizations. This project matters because it
addresses a real need for Silentmode’s DevOps teams and makes it easier to
manage cloud spending across multiple accounts.

1.2​

Problem Statement
At Silentmode Sdn. Bhd., there is no centralized system to monitor costs
across AWS accounts. This creates two main challenges for the DevOps
teams: the time-consuming manual process of retrieving cost data and
difficulty in identifying historical spending trends. This made it difficult to
allocate budgets and control cloud expenditure. Each of these problems is
explained in detail below:

1.2.1 ​The DevOps team faces time-consuming challenges in
retrieving AWS cost data due to manual and repetitive
processes.
The current workflow for tracking AWS costs requires DevOps teams to log
in separately to each client’s AWS account. According to En Zhafri Syafiq,
the DevOps teams find it is so time consuming as they must navigate to the
Billing section or Cost Explorer, export data or take manual screenshots, and
then export this information into spreadsheets or charts for each account. On
average, this entire process can take between 2 to 4 hours per reporting cycle,
especially if more than five accounts are involved.
This manual routine is not only tedious but also introduces a high risk of
inconsistencies or human error, especially when handling large datasets.
Additionally, the process must often be repeated on a monthly basis for
budget review meetings or cost audits. This repetitive effort takes away
5

valuable time that could be spent on higher value tasks such as optimizing
infrastructure or improving automation pipelines.

1.2.2​ Difficulty in identifying historical spending trends
One of the biggest difficulties for Silentmode’s DevOps team is observing the
historical spending trends over time across all AWS accounts. There is
nothing presently available that gives the team a simple or automated view on
where the costs are moving to. The team must collect the data manually and
then combine the data, which takes time and loses some of the earlier
potential value, and often is after making timely recommendations to their
clients. An example of historical spending trends available is when a users
looks through the monthly cost of account spending for the entire year. These
insights help the team identify seasonal spikes, increases over time or some
unexplainable costs.
The way of manually aggregating the data takes up so much time for the team
and does not allow for valuable comparisons of costs across various services
and environments like development, staging, production. Even where analysis
is possible, it is difficult to analyze over a long period, where several datasets
are delivered in a different manner.
Everyone in the DevOps team agrees it would be much easier to implement
clear visuals such as charts, graphs, in an automated dashboard setup for
selected client accounts, to free up team members’ time. It's easy to see how
this would allow more time either in reporting or related works.

1.3​

Project Aim
The AWS Cost Dashboard is designed To develop a dashboard for internal
teams to efficiently monitor and analyze AWS costs by bringing all spending
data from multiple AWS accounts into one simple, centralized platform. This
tool will cut down the manual work the DevOps team currently does, helping
them access and analyze cost information faster and more accurately. Users
6

will be able to filter costs by account, service, or environment, and see
spending trends through charts, graphs, and tables.
By making cost insights more accessible, the dashboard helps the DevOps
team spot unusual spending sooner and use cloud resources more efficiently.
Other than just helping with financial decisions, it also improves transparency
and offers a flexible solution that can grow with the company or be adapted
by other teams facing similar cloud cost challenges.

1.4​

Project Objectives
The objectives of this project are:
1.​ To gather data and analyze the current cost tracking process across
multiple AWS accounts used by Silentmode’s DevOps team.
2.​ To design a centralized AWS Cost Dashboard that integrates with
AWS Cost Explorer APIs and visualizes cloud spending trends by
account, service, and environment.
3.​ To develop and implement the AWS Cost Dashboard with automated
data retrieval and interactive features such as charts, graphs, and
tables for better financial visibility and decision-making.

1.5​ Project Scope
This project is all about this design and development of a centralized AWS
Cost Dashboard to be used by the DevOps team at Silentmode Sdn. Bhd. It
was implemented during a single academic semester following the Final Year
Project (FYP) schedule, as well as within the established reporting periods of
the organization so far as DevOps is concerned. The system implemented is
geographically internal and it is utilized by Silentmode Sdn. Bhd., a company
based in Malaysia where its DevOps department deals with clients who have
multiple AWS accounts. Regarding sampling coverage, the requirements of
the dashboard and the feedback will be sought directly to the DevOps Lead,
7

devops team to carry out the internal testing to determine functionality and
usability. Technologically, the system is created in the underlying back-end
scripting technology of PHP and JavaScript in front-end, AWS Cost Explorer
APIs to access cost data in the cloud.

1.6​

Project Significance
1.6.1​ Significance to the DevOps Team at Silentmode
a)​ Centralized Cost Visibility:
The AWS Cost Dashboard provides a platform for DevOps to
view cost data from multiple AWS accounts, reducing the
need to log in and check each account individually.
b)​ Improved Efficiency:
By automating data collection and trend visualization, the
dashboard significantly reduces the time spent on manual report
preparation from hours to minutes.
c) Smarter Decision-Making:
The presence of visual charts and trend graphs allows the
DevOps team to identify cost anomalies and usage spikes
more effectively.

1.6.2​ Significance to Management
a) Faster reporting:
Management will have the ability to access real-time or monthly
summaries of AWS cost to helping the company minimize
unnecessary spending.
b) Improved Financial Visibility:​
​

By automating data collection and trend visualization, the dashboard
significantly reduces the time spent on manual report preparation
8

from hours to minutes.
c) Improved Planning:
Having access to clear historical trends and usage patterns will
significantly enhance management's ability to forecast future cloud
spending and aligning resources accordingly.

1.7​

Outline of the Proposal
This report consists of five chapters as outlined below:

Table 1.1 Outline of each chapter
Chapter title

Descriptions

Chapter 1: Introduction

Introduces

the

project

background,

problem

objectives,

scope,

by

presenting

statements,

significance,

the

aim and
and

thesis

structure.
Chapter 2: Literature

This chapter covers related studies and research

Review

on

cloud

cost

monitoring,

AWS

billing

challenges, and existing dashboard solutions. It
also includes findings from relevant academic
and

industry

sources

that

support

the

development of the proposed system.
Chapter 3: Methodology

This chapter explains the methodology used to
complete the project, including research methods,
interview responses, system analysis, design
phases, and the tools and technologies used
during development.

Chapter Title

Description

Chapter 4: Results and

This chapter outlines the results of the project

9

Discussion

with particular reference to the dashboard
deployment, initial testing, and a discussion of
the final features the dashboard contained. It also
discusses how the dashboard has been able to
fulfil the aims and address the original problems
with referring to documents such as FSD.

Chapter 5: Conclusion

This chapter concludes the thesis with a summary

and Future Work

of the problems experienced, the overall success
of the project, and recommendations for future
iterations of the system in terms of improvements
and scaling.

1.8​

Summary
This chapter introduced the AWS Cost Dashboard project by explaining the
background of the study and identifying key problems faced by Silentmode’s
DevOps team in managing AWS cost data across multiple accounts. The
project aim and specific objectives were explained, focusing on the
development of a centralized solution to address these challenges. The
chapter also defined the scope of the project in terms of time, technology, and
users, and emphasized its significance to both technical teams and
management. Finally, the structure of the thesis was outlined to provide a
clear roadmap for the rest of the report.

10

CHAPTER 2
LITERATURE REVIEW
This chapter presents the literature review for the development of the AWS
Cost Dashboard for multi account cloud environments. The references
gathered in this chapter are based on several sources such as articles, journals,
academic research database and other credible sources relevant to this project.
These resources provide necessary background knowledge and support for
understanding cloud cost optimization and the AWS billing system behind
developing centralized dashboard for DevOps team.

Figure 2.1 Outline of AWS Cost Dashboard for Silentmode’s Internal
Developer Platform (IDP)
Figure 2.1 outlines the topics and subtopics which are being discussed in this
chapter. The research topics are directly related to the project and cover five
identifiable subtopics which are AWS Cost Dashboard systems, system
platforms, automation goals, methodology and related work. This chapter
also includes a summary to provide a brief overview of the material covered.

2.1 ​ Overview of Amazon Web Services (AWS)
Amazon Web Services (AWS) is a cloud computing platform that delivers IT
infrastructure via web services. It enables businesses to request virtual
11

servers, or cloud instances, online, offering high availability and redundancy.
These instances can be scaled up significantly, with the ability to deploy
hundreds or even thousands as needed. It provides a variety of on-demand
products, such as Compute, Storage, Database, Analytics, Networking,
Mobile, Developer and Management Tools, IoT, Security, enterprise
applications, and the payment model is based on the pay as you go (Saini,
Sharma, Khan, Chauchan, & Singh, 2024).
AWS operates through a network of interconnected data centres connected to
each other with the high-speed fibre links. These are data centers that provide
various services such as storing data, an application of computation power,
databases, and the application of machine learning which is available
on-demand and accessible over the internet. It also helps to develop and
maintain applications in the case of a startup or large organization without
having to be concerned with the physical servers. It handles staple services
like server maintenance, scaling, patching, and security so that the users can
focus on the development and innovation.
According to GeeksforGeeks (2025), instead of having to manually configure
the databases, perform the backups and manage the failover, it is possible to
use Amazon RDS that makes the backend workload automatic and makes it
possible to put up a database within a few minutes with minimal effort.

2.1.1​ AWS Cost Management and tools
AWS Billing and Cost Management provides numerous tools that help in
handling billing, view and pay invoices, analyze, organize, plan, and optimize
the expenditures. This service is used to oversee, track, control, and monitor
your AWS usage costs on a monthly, month-to-date, or weekly basis (Bankar,
2018). According to Negru & Cristea (2013), cost management of a cloud is
different to merely citing the expense paid as there is also the aspect of
proactively planning the consumption of the resources, areas that one can
save on spending and enhancing the infrastructure to favor business
objectives. Ordynskaya, Silina, Divina, Tausova and Bagova, (2021) indicates
12

that “Costs in the management system are an object that directly impacts the
economic efficiency of the enterprise, the pricing mechanism in the
production process, and, as a result, the state of competitiveness in the
market”. The issue of cost management does not only impact the economic
benefits of a company but also has a direct impact on its level of
competitiveness in the marketplace (Chang, 2024).
Managing cloud expenditures is no longer a good practice, but it is an
essential one in any organization operating on Amazon Web Services and
especially those that establish numerous individual accounts in AWS (Kumar
& Shipra, 2021). Deochake (2023) indicated that with no effective cost
tracking mechanisms, the organizations or firms are likely to find it easy to
overspend in addition to failing to use existing cloud capacity and fail to
enjoy the monetary benefits that led them to migrate in the first place to the
cloud. The organization should find ways to determine patterns of
expenditure, rational shifts of resources, and tight budgetary restrictions in
order to demonstrate that the AWS investment has compensated all the
money spent (Polinati, 2025).
One of the most important parts of the Amazon Web services is the AWS
Cost explorer that gives the user an in-depth view of their expenditure
patterns (Kokkinos and Varvarigou, 2013). The user can create the reports in
the form of breaking the costs into service, region, account, or even user
defined tags. AWS Cost Explorer does not only specialize in examining past
expenditure but also includes in-built features in order to aid in future cost
planning. The service analyzes previous consumption trends to develop an
estimate of future costs allowing teams to prepare budgets and distribute
resources using sophisticated algorithms (Kokkinos et al., 2013).

13

Figure 2.2 AWS Cost Explorer flow diagram
(source: Goel & Goel, 2025)

Grouping of costs by service presents all the services used within the time
period together with in the Cost Explorer. These expenses are recorded as
entries in a database classified by service and retrievable.

Figure 2.3 Cost Explorer table
(source: Open Water Foundation, n.d)

The AWS Cost Anomaly Detection, as correctly defined by Deochake (2023),
is an effective method that allows managing the cost of using cloud services,
14

since it can be used for analysis of previous invoices and detection of unusual
expenditures using the machine learning technique. Such proactive cost
monitoring is particularly necessary in highly intricate and multi-account
situations where controlling distributed resources may hide probable
budgeting problems (Ye, 2017).
AWS Cost and Usage Reports (AWS CUR) is one of the utilities offered by
AWS to manage and analyze cloud costs. It provides comprehensive costs
and usage information by monitoring estimated charges of AWS services.
Users may set the reports to be automatically uploaded into a CSV file in an
Amazon S3 bucket, where the data would be refreshed daily and the user can
visualize the data through Microsoft Excel or Apache OpenOffice Calc.
These reports provide analysis by line, itemizing every composite of service
plus usage type and operation in an account. Also users are enabled to specify
how the data can be aggregated hourly, daily or monthly and filter it
according to self defined tags, product resources or services (What Are AWS
Cost and Usage Reports? - AWS Data Exports, 2025). The fact that it
accumulates data on the scope of the individual resources, makes it a strong
tool in the analysis of trends not only in costs but also in the areas of wastes
and identification of targeted accordingly optimization efforts (Garfinkel,
2007). According to Fang (2023), early access to this data assists in the
financial decision-making process, allowing teams to prepare in advance to
counter any changes in prices and cost management.
AWS Pricing Calculator is what (Kokkinos et al., 2013) designates which
allows one to know in advance exactly how much exactly the cloud
workloads will cost due to the comprehensive planning offered by Amazon
Web Services. The tool displays an estimate of the cost of using clouds in
detail to enable users to make wise decisions and utilize their resources
effectively. Floods are characterized by highs in absences, (Negru & Cristea,
2013).

With

the

AWS

Pricing

Calculator,

customers can

create

service-specific customizations in accordance to their needs and evaluate the
financial consequences of any set-up in question (Mustafa, 2023).

15

2.1.2​ Challenges in managing multi-account cloud cost
Many organizations use multiple AWS accounts to keep development of
environments separate and manage client resources independently. Besides,
multi-cloud platforms entail the adoption of multiple cloud suppliers
concurrently, which enhances redundancy and lowers the chances of an
organization relying on one specific supplier as this method provides a
greater level of flexibility and adapting to changing needs (Polinati, 2025).
Many organizations struggle to achieve genuine multi and hybrid cloud
functionality because each system typically has its own unique architecture,
APIs, and management tools. (Polinati, 2025). As observed by Polinati
(2025), this decentralized approach often leads to inconsistent reporting
formats, since individual accounts may use different tagging practices, cost
allocation methods, or reporting tools then making it challenging to compare
spending across various projects or business units. Last but not least is
transferring data from on-premises systems to the cloud can involve
significant risks if not carefully monitored and managed. It is essential to
develop migration strategies and policies that align effectively with the
existing IT infrastructure (Bankar, 2018).

2.1.3 Benefits of Centralized Cost Dashboards
With the presence of AWS, the delivery of IT infrastructure in organizations
has been transformed to be highly agile and less costly in operation.
According to Kumar et al., (2021) and Mustafa (2023), AWS has a global
infrastructure of a solid and affordable cloud platform, which can be used to
carry out various business activities. But, as Garfinkel (2007) mentions, early
adopters of AWS who needed redundancy and reliability had to invent their
own management systems, usually with several AWS accounts to set up
protection against resource failure. This decentralized practice created
complexity of operation and complicated the possibility of proper control
within the cloud. According to Prasad and Chakrabarty (2013), "it will be
better to have centralized monitoring clubbed with a centralized access
management at the enterprise". The workload of DevOps teams also can be
16

reduced with the presence of a centralized cost dashboard. As stated by Saini
et al. (2024) AWS provides services and tools that can support DevOps and
automation that can assist organizations to simplify development and speed
up the release of their applications. A centralized dashboard is essential to
cloud cost optimization systems by enabling real-time monitoring and
automated reporting that eliminates manual data consolidation while
providing stakeholders with holistic insights into spending patterns.

2.2​

Technical solutions
Technical solution In software engineering, an answer to a particular problem
or need in a software system through the concretely utilized tools, technology,
methodologies and architectural patterns (Brumec & Vrček, 2012). These are
the actual solutions that bring the abstract design principles to functional
software. They combined role-based monitoring templates and agent-based
monitoring solutions and made use of an event processing engine that
processes the collected data and provides a dependable and a full featured
monitoring solution. (Pourmajidi, Steinbacher, Erwin and Miranskyy, 2018).
Technical solutions are more than just picking the best components, but also
entail integration and orchestration of the components to make a unified and
efficient system, and require profound knowledge and expertise in system
architecture, high-performance, and security.
In software development, a technical solution refers to a well-rounded
approach that involves more than just applying a single piece of technology.
A technical solution is not merely about implementing the latest technologies;
it is about strategically applying the right technologies, tools, and techniques
to achieve a desired outcome, while also considering factors such as
scalability, maintainability, security, and cost-effectiveness (Robinson &
Taneh, 2018). It requires a deep understanding of the problem domain, the
available technologies, and the constraints and opportunities that exist within
the specific context of the project or organization (Hernández, Olaso and
Gutierrez, 2013).

17

2.2.1​ Machine Learning
Machine learning belongs to the field of artificial intelligence, as it allows
computer systems to learn based on data and enhance functionality without
explicitly programming (Adugna, Ramu, & Haldorai, 2024). Machine
learning is basically a topic which entails deployment of algorithms which
identify data trends and subsequently have decisions to be made or predict the
patterns. There is heavy use of ML in the modern software systems, more so
in the area where the traditional approaches can not handle either complexity
or surplus of data. The use of its algorithms in the interpretation of complex
datasets and directing automated decision manufacturing has now expanded
to be a universal reality in most applications in real life. With the complexity
of tasks and the improved volume of data, machine learning is crucial to the
development of intelligent, flexible and expandable software systems.would
be able to manage dynamic environments in a positive way (Verbraeken et
al., 2020).

2.2.2​ ELT Pipelines
The ELT (Extract, Load, Transform) pipeline has emerged as a key
architecture for cloud data integration. Extract Load Transform (ELT) is a
concept in which the extraction process takes place on the source, followed
by loading of results in an intermediate data storage such as a data lake,
which is a cloud storage in which the data is cleaned up before being
transported to data warehouses and analyzed. (Cottur and Gadad, 2020). This
order differs from the older ETL approach in which data is cleaned and
reshaped before it ever reaches the destination system. Pipelines that
integrate, ingest and transform data are designed to solve data management
problems like data consolidation across multiple sources of information
(Mbata, Sripada, & Zhong, 2024).

18

Figure 2.4 ELT pipeline process diagram
(source: Panigrahy et al., 2023)
The ETL data model transforms data before storing it to some form of staging
area to ensure the quality and compatibility of data. In contrast to this, ELT
uses the computing power of contemporary cloud systems by loading raw
data to a central source of data and then executing transformations on it in
that system. This design is more scalable especially to the organizations that
deal with a high amount of data or clients.

2.2.3 Data Visualization
The data visualization process involves a simplification of complex data so
they can be visualized in more comprehensible forms and that the users can
end up making a reasonable image and getting insight . It enhances the ability
of human perception and represents raw data in a form of easy-to-understand
graphics, symbols, and colors to better recognize the information data and
transmit valid information more efficiently. Some typical visualization
methods are bar charts that are best used to compare quantities across
categories. In addition, line graphs are used to measure trends over time and
pie charts that are helpful in visualizing proportions of a whole. To
demonstrate the frequency between two variables using gradation of colors,
heatmaps are practical and scatter plots help in exposing the correlations
between

numbers. Also, interactive dashboards incorporate various

visualizations into a single UI where real-time data exploration and different
user interactions are possible (Srivastava, 2023).
19

2.2.4 Comparison of techniques
Machine learning, ELT pipelines and Data Visualization are commonly
adopted in modern software systems, each providing distinct advantages and
limitations. First and foremost, Machine learning has been useful at
predictive modeling and automating decision-making that are complicated
and made on the basis of patterns in huge datasets. The large scale data
integration and storage ELT pipelines can be used to optimally take
advantage of cloud computing to load and transform data in an elastic
manner. At the same time, data visualization improves communication and
comprehension by transforming raw information into visual tools such as
graphs, dashboards, and others. The applicability of any method will also be
based on the purpose of objectives of the project particularly on prediction,
data processing, and provision of truth.

​
​

Table 2.1 Comparison of technical solution

Aspect

Machine
Learning

ELT pipeline

Data
Visualizatio
n

Purpose

Enables
automated
learning
and
prediction
based
on
historical data.

Integrates, stores,
and prepares data by
extracting, loading,
and
transforming
from
various
sources.

Presents
complex
data visually
for
easier
interpretatio
n
and
decision-ma
king.

Process flow

Involves model
training,
testing,
and
prediction.

Extracts raw data,
loads into a storage
system,
then
transforms it for
analysis.

Converts
structured
data
into
graphical
formats like
charts,
graphs, and
dashboards.

AWS Glue

Chart.js,
Filament,
Port.io,
Appsmith.

Tools
examples

and Linear
regression,
decision trees

20

Aspect

Machine
Learning

ELT pipeline

Data
visualizatio
n

Application
Focus

Forecasting
Automating
the
trends, anomaly flow of data from
detection.
AWS accounts to
dashboards.

Displaying
trends,
patterns, and
summaries
of
cost
metrics
interactively.

Strengths

Handles
Efficient
for
large-scale data handling large and
with
high diverse datasets.
complexity.

Simplifies
complex
data
for
easier
understandin
g.

Weaknesses

Requires large Requires
strong
amounts
of pipeline design.
clean, labeled
data.

Not suitable
for advanced
analytics
alone

Output Type

Predictive
models.

Structured datasets Insights in
ready for analytics. the form of
graphs and
interactive
elements.

Table 2.1 presents the comparison of technical approaches in supporting the
design of intelligent systems. Machine learning would be appropriate when
the system needs automatization and the prediction needs to be data-driven. It
requires an intensive computing environment and heavy data preparation.
ELT pipes are simpler to integrate data, especially when storage and
processing are in the cloud. However they might inefficiently respond in
real-time in using them with particular uses. The issue of data visualization
concerns the communication of data with the help of graphs to achieve
understanding, which makes it perfect within reports and presentations but
does not allow it to conduct independent analysis. The selection of a suitable
method will rely on the depth of analysis, the volume of data, as well as the
presentation requirements of the system.

21

2.3 ​ System platform
​

The idea of a system platform is of great importance in contemporary
software and embedded system development as systems have become more
complex and require more reduced time to market. Keutzer et al., (2000) have
described a system platform as a combination of hardware platform with a
software platform through which the hardware is reusable and parameterized
architectures and the software offers abstracted interfaces which facilitate
portability and reuse among different instances of hardware.This layered
approach helps developers build complex systems more efficiently by
offering common tools and services that hide the technical details while still
allowing for performance optimization when needed.

2.3.1 ​Internal Developer Platform (IDP)
An Internal Developer Platform (IDP) represents a self-service platform,
which aims at easing and smoothing the software development lifecycle with
infrastructure management unification and automation. (What Is an Internal
Developer Platform (IDP)?, 2025) considers an IDP as a combination of key
components including container orchestration, CI/CD pipelines, observability
tools, and runtime environments into a single interface. This allows
developers to concentrate more on the development of codes in the
applications and not infrastructure dependencies and environment settings.
Among the characteristics of an IDP, it is possible to differentiate its quality
to convert complexity into the implementation of operations and ensure
transparency to the platform teams and its control. This abstraction is being
done using APIs, user interfaces and templates, which enable developers to
communicate with the infrastructure in a consistent and secure way without
necessarily having great operational skills. Also, the IDPs improve developer
autonomy by minimizing bottlenecks caused by manual infrastructure
requests, increasing the velocity of delivery pipelines and creating a
continuous deployment culture (What Is an Internal Developer Platform
(IDP)?, 2025). IDPs increase efficiency and align workflow development
22

with organization policies by providing customizable

and a common

approach to environment configuration. In this way, they are emerging as a
critical component of the modern DevOps approach, especially in the settings
when teams are growing and multi-service environments are being created.

2.4​

Methodology for AWS Cost Dashboard development
Several development methodologies were taken into consideration for the
implementation

of

AWS

Cost

Dashboard.

Software

development

methodology represents a structured framework that guides the entire
software development lifecycle (Saeedi & Visvizi, 2021).

According to

Saravanos & Curinga (2023), the software development lifecycle (SDLC)
provides a structured model involving a sequence of phases, practices, and
activities that guide development teams through the processes of designing,
building,

and

deploying

software

applications. A

clearly defined

methodology is significant as it offers a reference guide to the project making
it reliable, consistent and efficient during the development process (Radack,
2009). By standardizing the approach, methodologies decrease the blurriness
of communication in the teams, with stakeholders or clients and improve their
communication (Lingham, Kin, Jing, Loong and Fatima-Tuz-Zahra, 2020). In
conclusion, they act as blueprints defining the path to be implemented during
the software development life-cycle to enable coordination and finally
delivery of high-quality software products.

2.4.1 Waterfall methodology
The Waterfall methodology is a common project management approach that
follows a step-by-step process. It progresses through distinct phases,
including requirement analysis, design, implementation, testing and
maintenance with each phase building on the one before it. According to
Dursun, Goker, and Mutlu (2022), Waterfall methodology is specifically
successful in the case of clarity of requirements and the low level of
variability, which explains why this approach is frequently used in a number
of industries.

23

Figure 2.5 Waterfall model diagram
(source: Saravanos & Curinga, 2023)
The advantage of the Waterfall model is that it is a well organized and
disciplined approach to software development with all stages having a clear
definition and before one can start another (Pargaonkar, 2023). This
procedure guides in reducing ambiguity in the development process and
enables the early identification of design defects or requirement problems.
The sequential method of the Waterfall methodology is considered as one of
its

advantages as it encourages

detailed planning and consistent

documentation at every stage of the development lifecycle. This helps teams
focus, reduces misunderstandings and ensures that project milestones are met
in an orderly and structured manner (Saravanos & Curinga, 2023). Moreover,
as identified by Saravanos et al., (2023), simulations of Waterfall model can
support the estimation of software task durations which could be used to
enhance predictability regarding software work and potential resource
limitations. This helps software teams to organize their projects better.
While the Waterfall methodology offers a structured framework for managing
projects, it also has some limitations. According to Ben-Zahia and Jaluta
(2014), the disadvantages of the Waterfall method is its dependence on fixed
requirements at the beginning of the project. Once development starts,
making some changes can be difficult and expensive especially if new
requirements need to emerge. The weakness is strengthened by Dursun et al,
(2022) who identified that the Waterfall model is not very suitable in projects
24

where it has a high level of complexity or a high incidence of requirements
changes due to its inability to adapt to such variables. Likewise, Chandra
(2015) notes that the lack of feedback between stages does not allow to detect
and identify errors early and thus is leading to defect delay and increased
costs of corrections. These are the problems which reduce the effectiveness of
the model into modern fast-changing landscapes of software development

2.4.2 Agile-Scrum methodology
Agile Scrum is a commonly implemented framework known for managing
complex projects through iterative development and continuous collaboration
with stakeholders. According to Žužek et al. (2020), Scrum was initially
presented as a software development project management framework but now
has become common in other areas because of its flexibility, programming to
change and straightforward division of responsibilities among the team
members to facilitate effective cooperation. The main idea behind Scrum is to
split the development process into a set amount of time known as sprints or
sprints each lasting two to four weeks on average.

Figure 2.6 Agile-Scrum methodology model diagram
(source: Azanha et al., 2017)
Higher order of task and responsibility division and organisation of team
members is one of the key benefits of utilising Scrum within project
25

environments (Fernandes et al., 2021). According to Azanha et al. (2017),
Scrum is a framework within which it is possible to employ various processes
and techniques to develop complex products. The visual management tools,
such as Scrum boards allow for better performance tracking and ensure that
everyone is aware of their contributions. Frequent meetings between the
Scrum Master, developers, and Product Owner help the product improve step
by step through ongoing changes. With each sprint, the product is expected to
become more refined and effective (Beerbaum, 2021). This advantage is also
highlighted by Zasornova, Lysenko, and Zasornov, (2022) that stated regular
communication in Scrum supports faster decision-making, reduces project
risk and makes handling documentation more manageable.
The disadvantage of Scrum is that its success heavily depends on the team's
understanding and commitment to the methodology. As stated by Berezutskyi
et al., (2023), Scrum works best when all team members understand the
method, are motivated, think critically and work together regularly. Without
these elements, the team may require additional training and the process can
become isolated with limited communication beyond scheduled meetings.
Another disadvantage is the Scrum Master plays a distinctly different role
from a traditional project manager, as they do not exercise direct control over
the team but rather support and trust the team to organize and manage their
own tasks (Shinde & Adkar, 2018). In Scrum-based projects, the client’s
vision plays a crucial role in shaping the development process. As noted by
Highsmith and Cockburn (2001), when the client lacks a clear understanding
of the desired product outcome, it can lead to uncertainty within the
development team then resulting in a final product that may differ from initial
expectations.

2.4.3 V-Model methodology
Just like the waterfall model, the V-Shaped life cycle is a sequential path of
execution of processes (Rastogi & Dept. of ISE, MVJCE Bangalore, 2015).
The V-Model is a graphical framework that represents the product
development lifecycle in a V-shaped structure, where the left side focuses on
26

defining and breaking down system requirements and design, while the right
side emphasizes system integration, verification, and validation through
structured testing processes (Zoppoli et al., 2023). This is further supported
by Ponce et al. (2021) who explain that the V-shaped structure illustrates how
the development process flows from user requirements down to the
implemented solution and then progresses upward through validation
activities to ensure the final product meets user expectations.

Figure 2.7 V-Model methodology diagram​
(source: Dharmapal & Sikamani, 2015)
One of the advantages of V-Model is it helps reduce the cost of fixing defects
by identifying them in the early stages of development (Regulwar et al.,
2010). Early detection can lower the risk of defects affecting other
components leading to a more cost-effective development cycle. As
highlighted by Bucanac (1999), the V-Model offers clear guidance for
implementing activities by providing detailed steps, useful suggestions and
thorough explanations for each task which is supported with practical
examples to improve understanding. This perspective is shared by Dharmapal
& Sikamani, (2015) that stated the test plan is created earlier to the coding
phase which allows developers and stakeholders to clearly understand the
testing scope and objectives early in the development process.
27

Although the V-model has its strengths, it also faces certain disadvantages.
During the implementation phase, the software is built without producing any
preliminary prototypes (Acharya & Sahu, 2020). This can be taken to be a
limitation since it reduces the opportunity of getting early assessments by the
users and raises the probability of functional errors up to the later stages of
development. The V-Model is not very adaptable and altering the project
scope is usually very demanding and costly (Mohammed et al., 2010). This is
confirmed by the fact that Rathnayaka et al. (2020) claimed that the V-Model
represents restricted flexibility because it needs to test the documentation and
re-modified it to align it with development of all changes in requirements.
This will be time devouring at least in those projects in which the
requirements often change because every change will demand some
additional effort to maintain an appropriate level of development and tests.
aligned.

2.4.4 Comparison of methodology
There are several well-known approaches to programming such as Waterfall,
Agile-Scrum, or V-Model, and all of them have their own benefits and
drawbacks. Waterfall is a sequential model in which one stage has to be over
before the next. Conversely, Agile-Scrum emphasizes adaptability, the
frequent meeting and constant development with short development cycles
also called sprints to enable the adjustment of teams quickly. The V-Model
implies test planning in the beginning and the alignment of every
development stage with a particular test stage to provide verification and
validation on each level.
The selection of an appropriate methodology depends on factors such as
approach, flexibility, stakeholder involvement, phases and iterative. Table 2.4
presents

a

comparison

of

Waterfall,

methodologies.

28

Agile-Scrum,

and

V-Model

Table 2.4 Comparison between Waterfall, Agile-Scrum and V-Model
Aspect

Waterfall

Agile-Scrum

V-Model

Approach

Linear and
sequential
development

Iterative and
incremental through
sprints

Sequential
with parallel
testing and
development
(V-shaped)

Flexibility

Low

High

Medium

Stakeholder
involvement

Minimal after
requirement phase

Continuous
involvement
throughout sprints

Involved
during
requirement
and
validation
phase

Phases

Requirement,
Design.
Implementation,
Testing,
Maintenance

Sprint Planning,
Development,
Review,
Retrospective

Requirement
s, System
Design,
Coding,
Verification,
Validation

Iterative

Not iterative as it
follows one
direction

Iterative as feedback
loops after each
sprint

Not iterative
as process
follows
predefined
stages

The selection of an appropriate development methodology depends on the
specific needs of the project. As it was explained in details above, Waterfall,
Agile-Scrum and V-Model also have certain benefits one might consider
depending on the flexibility of the project at hand, its complexity, along with
the number of its stakeholders. As an example, Agile-Scrum best fits
situations that are dynamic with the requirements that can change as time
goes by. It enables repetitive development that makes it possible to give
feedback and make adjustments.
Accordingly, it turns out to be compatible with projects where a high level of
proximity is beneficial to teamwork and fast decision. The Waterfall model is
suitable for very specific project demands right at his point of origin. Its one
29

directed and orderly progression is useful in controlling projects that involve
few changes and its phases are well documented, hence easier to follow. The
V-Model is however less flexible to changes and with little stakeholder
contact experiences once the requirement stage is complete. Its iterative
process is missing although it provides an early defect detection. It is best
applicable in projects that require intensive validation in which system
reliability is of essence.

2.5​

Related Works

​

This study attaches importance to the discussion of technical concepts
regarding the cost management tools of the cloud. It is concerned with better
cost tracking and management in the AWS environment particularly within a
multi-account organization. Solutions like AWS Cost Explorer, CloudZero,
Vantage were investigated based on their features in cost awareness, budgets
and anomalies. This paper is intended to point at the utility and connectivity
of those platforms. In that case, the study of these platforms contributes to
better management of cloud costs with the purpose to attain greater
efficiency.

2.5.1 ​AWS Cost Explorer
The AWS Cost Explorer is an in-built tool which assists individuals to
monitor and comprehend the AWS time spending. The graphs and the reports
created in this platform identify where the costs are being brought in such as
by service, account or region. The tool can be used to retrieve up to 13
months of historical consumption and predict future expenditures. It also has
ready created perspectives indicating cost tendencies and which can be
configured meeting various requirements. Cost Explorer can be accessed in
the AWS console in addition to being provided as an API automated access.

30

Figure 2.8 AWS Cost Explorer page
(source: Open Water Foundation, n.d.)

​
Based on Figure 2.8, the AWS Cost Explorer interface offers features such as
filters, charts, and data breakdowns. However, it may not be very user
friendly for beginners. The interface includes technical terms like “instance
type” and “linked account” that can be confusing for those who are not
familiar with AWS billing. In addition, the layout shows a lot of options on
the right-side screen, which can feel overwhelming. Users need to understand
how AWS handles cost and usage data to use the tool effectively. Although
the tool provides detailed information, it would be more effective if the
interface were simpler to use for those who are new to AWS.

2.5.2 ​CloudZero
CloudZero is a cloud cost management platform that helps teams understand
how their cloud spending relates to specific products, features or teams. It
provides real-time cost monitoring, alerts for unusual spending, and clear
dashboards to track where money is being used. CloudZero also helps
organize costs without needing detailed tagging so it is easier for teams to
connect technical decisions with business impact.

31

Figure 2.9 CloudZero management page
(source: Lowman, 2025)
Based on figure 2.9, CloudZero offers efficient data visualization that is
easily handled. The information on costs that CloudZero is displayed with the
different charts like bar graphs, line charts and pie charts presented in one
page. The technical terms are not heavily used, which makes the information
more user friendly to the users that are not familiar with some technical
terms. As an example, the filter option used in CloudZero is easily accessible
as it is located at the top of the page. In this case, placing the filters in a clear
and visible place can avoid the cognitive load and it does not overwhelm
users, especially those unfamiliar with the platform. This also enhances a
clear understanding of project’s teams of the data being presented. This
presents CloudZero as a better choice for organizations that want to have
efficiency in cloud costs management.

2.5.3 ​Vantage
​

Vantage is a cloud cost management platform designed to give teams,
especially engineers, clear and actionable insights into their cloud spending.
It integrates with major cloud providers like AWS, Azure and Google Cloud.
It combines all cost data into one simple dashboard. Vantage helps track costs
32

by service, team or app and it offers forecasts and detailed reports, including
Kubernetes and network usage. It also suggests ways to save money and can
automate AWS Savings Plans.

Figure 2.10 Vantage cost management page
(source: Vantage: Multi Cloud Cost Management & Optimization
Tool, n.d.)
Based on figure 2.10, Vantage offers well structured data visualization. The
platform displays bar charts and cost tables on a single page to allow users to
view cost trends and cost breakdown. In addition, Vantage includes filter
options that enable users to filter data by service, category and region to help
focus on specific cost areas. However, the data visualization in Vantage is
limited. The platform relies on bar charts and cost tables which is not
sufficient for users who need more detailed insights. Therefore, it can affect
the user’s ability to make fully informed decisions about the cost data.
Although Vantage is clear and easy to use, it could be improved by providing
more detailed data visualization features to increase its effectiveness to users.

2.5.4 ​Comparison of related works
AWS Cost Explorer, CloudZero and Vantage are platforms for cloud cost
management. Each of them aims to improve visibility, budget tracking and
integration in cloud infrastructure and has its own strengths and limitations.

33

Table 2.3 Comparison between AWS Cost Explorer, CloudZero and Vantage

AWS Cost
Explorer

CloudZero

Vantage

Cost
Allocation

Yes

Yes

Yes

Automated
Tagging

Yes

Yes

Yes

Data
visualization

Provides charts and
graphs

Provide chart types Provides
(bar, line, pie) on a bar charts
single page
and cost
tables

Budgets &
Cost Tracking

Yes

Yes

Yes

Customizable
Reports &
Dashboards

Suitable for
advanced users

Dashboards are
pre-configured but
clear

Customizab
le reports
with limited
visualizatio
n options

User Interface
(UI)

Many terms
unfamiliar to
beginners

User-friendly and
clear

Clean and
simple UI

Unified with
All Spend

Yes

Yes

Yes

Forecasting,
Cost
Anomalies &
Alerts

Yes

Yes

Yes

AWS

Yes

Yes

Yes

Azure

No

Yes

Yes

GCP

No

Yes

Yes

Datadog

No

Yes

Yes

Databricks

No

Yes

Yes

MongoDB

No

Yes

Yes

Features

Integration

34

AWS Cost
Explorer

CloudZero

Vantage

Snowflake

No

Yes

Yes

OpenAI

No

Yes

Yes

New Relic

No

No

Yes

Fastly

No

No

Yes

JIRA

No

Yes

Yes

Slack

No

Yes

Yes

Gitlab

No

Yes

No

GitHub

No

Yes

Yes

Table 2.3 shows the comparison between three cloud cost management
platforms: AWS Cost Explorer, CloudZero and Vantage. AWS Cost Explorer
is a tool from Amazon that helps users view and track cloud spending. AWS
Cost Explorer includes features like cost allocation, budget tracking and
forecasting but its interface may be confusing for beginners because of
technical terms used and not very friendly layout. For expert users, it may not
be a big deal for them but it can be more effective if the platform can provide
a more understandable term for users just like CloudZero and Vantage,
especially for beginners. CloudZero provides a better user-friendly
experience with clear data visualizations such as bar, line and pie charts
shown on one page. It also uses simple terms which makes it easier for users
who are not familiar with cloud billing. The filter options are placed at the top
of the page to help users quickly find what they need without feeling
overwhelmed compared to AWS Cost explorer. Vantage offers a simple
interface with cost tables and bar charts in one view. It includes filters option
to filter cost data by service, category or region just like AWS Cost Explorer
and CloudZero. Nevertheless, the platform has limited visualization features.
This will not give enough insights for users who want to see more detailed
cost information compared to CloudZero.

35

In the integration aspect, CloudZero and Vantage support more tools and
cloud providers compared to AWS Cost Explorer. Both CloudZero and
Vantage connect with tools like Azure, GCP, Datadog, MongoDB and Slack
while AWS Cost Explorer does not offer these connections. AWS Cost
Explorer is suitable for users already in the AWS ecosystem. CloudZero is a
good choice for teams that want clear visuals of cost data while Vantage is
helpful for teams who prefer a simple layout. The choice depends on the
organization’s needs and how much details and goals they want in their cost
management tools.

2.6​

Discussion
This chapter explains the chosen methodology, technical solution and system
platform for the AWS Cost Dashboard project based on what was found in
the literature review. The Agile-Scrum methodology is selected because this
project might need to adapt to changes along the way and receive feedback
regularly from the team. Scrum supports continuous collaboration and
iterative progress through sprints and encouraging teamwork by regular
updates. This will make it easier to improve the dashboard as development
goes on. For the technical solution, ELT (Extract, Load, Transform) pipeline
and data visualization techniques are chosen. The ELT pipeline works well
for handling large amounts of AWS cost data. It brings the data first, stores it
and then processes it all in one place. This is useful in cloud systems because
it saves much time. On top of that, data visualization is very important
because it can turn numbers and raw data into bar charts, line graphs and cost
tables. To sum up, by using Agile-Scrum, ELT pipeline and data
visualization, the project should help make AWS cost tracking easier and give
better visibility across multiple AWS accounts in AWS Cost Dashboard.

2.7 ​ Summary
This chapter discusses the concepts and studies which are used to create the
AWS Cost Dashboard. It presents the comparisons of relational works such as
AWS Cost Explorer, CloudZero and Vantage and describes it in terms of

36

some efforts and deficiencies. The technical solutions like ELT pipeline and
data visualization were selected, and Agile-Scrum were selected as the ones.
of other methodologies. These will assist in the management of data as well
as teamwork and lead the project towards its successful path in order to
construct the powerful AWS Cost Dashboard.

37

CHAPTER 3

METHODOLOGY
This chapter explains the methodology used to develop the AWS Cost
Dashboard system. It outlines the development requirements, project
procedures and the steps taken throughout the development process. The
Agile-Scrum methodology is chosen for this project to achieve the project
goals. This chapter also provides an overview of each stage in the
development cycle to show how the project was managed and completed
using the Agile-Scrum approach. This chapter also will explain about the
phases in Agile-Scrum methodology in detail to give a clear view about the
development process of AWS Cost Dashboard.

3.1 ​ Overview of SDLC Methodology
Methodology refers to the structured approach used to plan, carry out and
complete the development process based on the project. The guideline of
methodology can lead the task to be completed in a certain time and manage
the project until it reaches the project's goal. Methodology also offers every
step in the project to be organized and follows a flow whether it is sequential
or not to make the work more efficient and sustainable. In software
development context, methodology is important to apply in the project
because it allows the team to stay focused and deliver a system that meets the
users' requirements based on the system. It also includes the tools, techniques
and practices used throughout the project to make sure everything is done in a
consistent way and deliver a good quality of the product.
The Software Development Life Cycle (SDLC) is a structured process that
helps guide the development of software from start until it reaches the project
goal. It breaks down the project into stages like planning, analysis, design,
implementation testing and maintenance. There are different methods under
SDLC that developers can choose from depending on the project goals and

38

needs. Since every project is different, the chosen method should match the
project’s requirements and team’s workflow.

3.2 ​ Agile-Scrum model for AWS Cost Dashboard
Agile-Scrum is a project management approach that uses an iterative process.
It is often used in software development. This method focuses on delivering
results quickly and making improvements based on feedback. In this project,
Scrum process includes five phases which are initiation, planning and
estimation, implementation, review and retrospective, and releasing.
The first phase in the Scrum methodology is initiation. The purpose of this
phase focuses on the objectives, goals and deliverables of the project as well
as to discuss the requirements with the involved stakeholders regarding the
product backlog items. This step is important to ensure a clear understanding
between stakeholders about the project requirements. The next phase in the
Scrum methodology is the planning and estimation phase. In this phase, the
team starts by creating user stories that describe what needs to be developed
based on the requirements from the product backlog. These user stories help
the team to understand what the deliverables of the system should have. After
that, the team estimates the time and effort needed to complete each user
story and agrees on which stories will complete in the upcoming sprint and
adds them to the sprint backlog for further actions.
In the implementation phase, the Scrum team works on sprint backlog tasks.
Next, the team reviews what was completed and discusses ways to improve
for the next sprint cycle in the review and retrospective phase. Once the
product has been developed and tested, it is released for use in production.
During this cycle, the team joins a daily standup meeting every day
depending on the team lead on how much information is needed about the
progress and resolve any blockers that occur as pointed out in figure 3.1.
This cycle repeats until the full system is completed.

39

Figure 3.1 Agile-Scrum model of AWS Cost Dashboard development process

Figure 3. explains the Scrum model followed while developing the AWS Cost
Dashboard. The phases in the diagram include Initiation, Planning and
Estimation, Implementation, and Daily Scrum. The goal is to allow
continuous updates by planning work in smaller cycles (sprints). The phases
in this diagram will be discussed further in the Scrum Phases of AWS Cost
Dashboard section.
All in all, the Agile-Scrum method is a reliable methodology that fits for this
AWS Cost Dashboard project because it is able to respond to changing
requirements which is important when developing a cost dashboard that may
require updates and refinements over time.

3.3 ​ Scrum phases of AWS Cost Dashboard
The development of the AWS Cost Dashboard consists of three Scrum phases
which are Initiation, Planning and Estimation, and Implementation. Each
phase consists of activities, deliverables and objectives. Table 3.1 outlines
these phases to give a clear guide for monitoring progress with the
Agile-Scrum framework.

​
40

Table 3.1 Scrum phases of AWS Cost Dashboard project

Phases

Activities

Deliverables

Objectives

Initiation

Interview session

Requirements of

To gather

with stakeholder

AWS Cost

requirement

Dashboard

from
stakeholder

Review

Analyzed

To analyze

requirement with

requirement

the

DevOps teams

requirement
from
stakeholder

Planning and

Create user

Functional System

To design the

Estimation

stories

Diagram (FSD)

interfaces of
the AWS

Identify which

Cost

actions need to be

Dashboard

automated from
the current flow
of the process.

Create sequence
diagram
Design the Proof
of Concept (POC)
based on user
stories and
requirements

41

Meeting with

Prioritized backlog

DevOps team on

items

sprint planning

Phases

Activities

Deliverables

Implementation Develop the AWS Web based system

Objectives
To develop

Cost Dashboard

based on Internal

the

based on the

Developer Platform

integration in

designed features. (IDP) for AWS Cost
Dashboard

AWS
environment
to AWS Cost
Dashboard

3.3.1 ​Initiation phase
​

The Initiation stage will begin with a development session of the team and the
stakeholder where the requirements of the system are gathered. In this case,
the stakeholder will be the Head of Department (HOD) because the DevOps
team is under the Product Development unit therefore the HOD requested that
the AWS Cost Dashboard should be developed to limit the work of these
people so the DevOps team would be at ease.
During the interview session, a list of the requirements on the system is
drawn off the stakeholder. The major facilitation of this session is that both
the parties are in proper position with respect to what they need in the system.
When there is any misunderstanding they will give the relevant solutions on
how to deal with the challenges of the stakeholder and this will be proposed
by the team, particularly the team lead. This includes the fact that the team
leader may also need to use his or her critical thinking ability in arriving at
the solutions of the problems that the stakeholder may never clearly be aware
of. Having a common understanding of the requirements, it is time to discuss
42

this with the DevOps team. The DevOps team is the last group of people to
use the AWS cost Dashboard hence they should be engaged in determining
the viability and practicability of the needs of the stakeholder and taking it to
the subsequent levels. The needs may change with this review process since
new information or ideas will be discovered.
The requirements might be different depending on the stakeholder as much as
the project will have advanced.In the process, the Business analysts are going
to be required to re-run the process of requirement analysing. This is possible
by checking the user stories, modification of backlog items and change of the
overall aim of the project.

3.3.2 ​Planning and Estimation phase
This Plan and Estimation phase has started with the development of a user
story mapping of the AWS Cost Dashboard. This user story is crucial in
describing the relationship of each of the requisitions to the experience of the
user that can help the team visualize the input and output along with the route
of interactions within the system. Charting out such processes will enable the
stakeholders and the team members to get a better idea about how the system
will be operating and how they can improve the system accordingly.
User story format allows avoiding major problems at the planning phase of
the sprint, making the work of the team more understandable and contributing
to further goal attainment. Also, user stories help the team estimate the time
which should be dedicated to the next steps. After the preparation of the user
stories is over, the sequence diagram of the AWS Cost Dashboard has to be
created. Sequence diagrams are interaction diagrams which tell how things
are done through processes and operations. This assists the team to visualize
the flow of the system in greater detail, which comes in handy when it comes
to designing a system that would match well the stated demands. Once user
stories and system design are complete a Proof of Concept (POC) or
prototype is developed according to requirements. This prototype can be
considered as an incomplete version of the system, as it provides the team
with an opportunity to check whether the system fits the user expectations)
43

and then to proceed with its development. Such changes of prototypes are
discussed at the periodic meetings especially with the teams. It is during these
group discussions that the designs are cleared, feedback obtained and the
adjustments where necessary are incorporated before development can take
place. In the event that additional requirements are found in the development
process, business analysts will either come up with a different user story or
revise the current user story. This is dependent on the team capacity in
coming up with the features and urgency of the required needs. Once this
stage is over, the sprint planning takes place. In these sessions, the team will
select user stories that meet sprint goals and are of high priorities as a way of
making sure that the team develops very critical user stories.

3.3.3 ​Implementation phase
The implementation progress of the Agile-Scrum process on the AWS Cost
Dashboard for Silentmode’s Internal Developer Project (IDP) begins the work
on the implementation of the systems based on the former designs and
sequence schemes. This step will be devoted to the insertion of the designed
functions into a working product such as cost tracking modules, data
visualization objects, and filtration features in line with the user stories and
design requirements of the project.
The key activity that takes place at this point is the development of the AWS
Cost Dashboard on the basis of the features and requirements that have been
identified earlier. The output of this step is the web system embedded into the
AWS environment, which can be used specifically within the internal context
of the DevOps team. The goal is to make sure that the system has all the
major functions including the possibility to track costs by each account,
visualization tools and filtering options implemented fully and available
through a single dashboard interface. It is built on the basis of the Internal
Developer Platform (IDP) to allow this system to realize internal architecture
and deployment standards. Any code created is built based on the design,
provided in the previous sprint and the integration process is performed to
ensure that the dashboard is fully functional and can interface well with AWS
44

services and the use of these services. The developed code is first pushed to
the staging environment, where it is reviewed collaboratively with other team
members. Any identified issues are corrected in this phase before proceeding
to the final deployment stage.
The essential mission of the period is to develop a dashboard that will be
functioning and will show the information about cloud costs effectively and
readable in a form that will be comprehensible by users. In such a scenario,
DevOps teams will have access to AWS spending and will know how much
cost has been spent by clients of each account. The developing process is to
write the codes, combine all the systems and ensure that the dashboard works
as planned. As a way of making the team Scrum oriented, the team members
are doing the stand up meetings daily whereby each member of the team tells
everyone what tasks and progress has been done and issues they have
encountered that needs to be resolved and harmonized. Sprint reviews and
sprint retrospectives are carried out to get feedback of the team members and
also the stakeholders at the expiration of every sprint. This feedback will help
the team perform the next sprint in a better way.
Designing, developing, and testing about the user stories are repetitive actions
in every cycle of sprint. This is also tested after a feature is built, and this
usually takes place during the final week of the sprint. When the testing is
unsuccessful and the sprint is a failure, then what is left unfinished should be
a spill over and handed over to the subsequent sprint. Other requirements can
be implemented based on defects that have been seen in this context. To
avoid the same problems, the new user stories are going to be more detailed.
The sprint process will remain among the group, till all the items are
complete in terms of stability and mirror the requirements till they are in a
position to be deployed. This interactive cycle will ensure that the AWS Cost
Dashboard for Silentmode’s Internal Developer Platform project will be
developed through iterative cycles and will give us a working tool on cost
controls.

45

3.4 ​ Hardware and software specifications
During the process of developing the project of AWS Cost Dashboard,
appropriate hardware and software tools are to be used on the stages of
system planning, designing, and implementation to make the project
successful. These tools assist plenty of activities like interface designing,
programming, testing and teamwork. Compatibility, stability, and efficiency
of handling the cloud-based dashboard development platforms and
development environment criteria have been used to select both its platforms
and development environments.
Software required are the Laravel Filament as the development framework,
Visual Studio Code (VS Code) as an Integrated Development Environment
(IDE) and PHP as the prime programming language. Database administration
is made possible using PostgreSQL since it is highly competent in the
manipulation of structured information. Also, such tools as Microsoft Teams,
Jira, and Confluence are implemented to capture the full-cycle project
communication and documentation. Last but not least, version control for
collaborative development and change tracking. Table 3.2 shows these
software specifications.
Table 3.2 Software specifications
Software

Specification

Integrated Development

Visual Studio Code (VS Code)

Environment (IDE)
Framework

Laravel Filament

Programming language

PHP

Database

PostgreSQL

Meeting platform

Microsoft Teams

Documentation

Jira, Confluence

Version control

Git, gitlab

46

On the hardware side, the project necessitates computers that can support
state of the art development tools, code compilation, and perform local testing
without hitting a performance wall. The recommended system is Apple M1,
16GB RAM, SSD storage, and a stable internet connection. These are
hardware requirements that assist in promoting productivity in the
development process and facilitate the smooth operation of tools. The
specifications are discussed in Table 3.3.

Table 3.3 Hardware specifications
Hardware

Specification

Processor

Apple M1

RAM

16GB

Storage

SSD, 256GB

Operating System

Windows 10/11, MacOS

3.5 ​ Summary
​
This chapter describes the process followed to create this AWS Cost
Dashboard for Silentmode’s Internal Developer Platform (IDP) project.
Agile-Scrum was selected due to its flexibility and that it is able to deal with
changing requirements due to its ability to employ an iterative approach to
development. Sprints are used to manage the project, and tasks are
decomposed into small user stories, which guarantee effective project
planning, frequent updates, and successful cooperation between the project
team

and

stakeholders.

Every

stage,

which

includes

initiation,

implementation, as well as preparation, assists in enhancing communication,
mitigating risks, and allowing perpetuation of the betterment. User story
mapping, system design, and frequent test cycles are also used to develop a
system which will meet the desires of the stakeholders and are efficiently
designed. On the whole, the given approach can assist in providing a stable
47

and convenient dashboard that will enable more comfortable cost tracking
and visibility when using AWS. Future improvements may include predictive
analytics and cost anomaly detection to further optimize spending
​

48

Chapter 4

RESULTS AND FINDINGS

This chapter will provide an explanation of the project's outcomes and conclusions,
with particular attention to each of the Scrum Methodology phases that were covered
in Chapter 3. This chapter offers a thorough justification of the results from every
phase and a comprehensive comprehension of the results attained during the project.

4.1 Results of Initiation Phase

Chapter 4 presents the findings of the initiation phase, which reveal a thorough
comprehension of the requirements for the override price promotion. The project
team successfully identified and assessed the needs through stakeholder interviews
and meetings, resulting in a clear document defining the system's functionalities and
objectives. This phase guarantees alignments with stakeholder expectations, reducing
misconceptions and increasing the possibility of a successful solution.
The next step is to meet with the Product team to further examine the needs that have
been gathered. The purpose is to gain a thorough understanding of project
requirements and allow effective communication between the development team and
stakeholders. The result is an assessed collection of requirements that serve as an
important basis for following project stages, keeping the development process
informed and aligned with changing stakeholder demands. The project's iterative
approach recognises that when stakeholders gain clarity or contribute more insights,
the team must stay adaptive, reviewing and improving features such as the product
backlog and user stories to ensure alignment with changing needs. The result is an
analysed set of requirements, serving as a critical foundation for subsequent project
phases, ensuring the development process is

49

4.1.1 Results of Interviews
The initial phase of stakeholder interviews provides critical information about the
requirements for the override price promotion. Stakeholders are identified throughout
this interview process, and a set of questions is ready. To design the system based on
stakeholder requirements, the team must obtain insights from the Product Team and
Development Team through active engagement, where the meetings and interviews
will be back-and-forth. These interviews are a crucial component of the project since
they give the team a thorough grasp of the needs and expectations of the
stakeholders. The final requirements document, which describes the precise features
and objectives of the system in the FSD, turns into a crucial delivery. Table 4.1 and
4.2 provides a summary of the key questions and answers discussed during the
interview sessions with the stakeholders. Table 4.1 is regarding the problem
statement one, The lack of flexible approach to apply promotions that enables
businesses to tailor promotions to specific customer groups or/and for marketing
strategies. Table 4.2 are more detailed questions for the problem statement two, The
absence of functions to implement price override promotions that are specific to
certain outlets.

50

Chapter 5

CONCLUSION AND RECOMMENDATIONS

This chapter summarises the override price promotion mechanism, which helps the
HQ increase sales. It emphasises the limits found throughout the project and makes
recommendations for future improvement.

5.1 Conclusion
The aim of this project is to develop override price promotions within the fuel retail
management system. The project has been successfully achieved by showing the
accomplishments of all these objectives.
The objectives of the project that have been accomplished are:

51

REFERENCES

Acharya, B., & Sahu, P. K. (2020). SOFTWARE DEVELOPMENT LIFE CYCLE
MODELS: a REVIEW PAPER. In International Journal of Advanced Research in
Engineering and Technology (Vol. 11, Issue 12, pp.169–176). Retrieved June 15,
2025,
from
https://iaeme.com/MasterAdmin/Journal_uploads/IJARET/VOLUME_11_ISSUE_12
/IJARET_11_12_019.pdf
Adugna, T. D., Ramu, A., & Haldorai, A. (2024). A review of pattern recognition and
machine learning. Journal of Machine and Computing, 4(1), 210–221. Retrieved
June 13, 2025, from https://doi.org/10.53759/7669/jmc202404020
Azanha, A., Argoud, A. R. T. T., De Camargo, J. B., Junior, & Antoniolli, P. D. (2017).
Agile project management with Scrum. International Journal of Managing Projects
in
Business,
10(1),
121–142.
Retrieved
June
17, 2025, from
https://doi.org/10.1108/ijmpb-06-2016-0054
Bankar, S. (2018). Cloud computing using Amazon Web Services AWS. International
Journal of Trend in Scientific Research and Development, Volume-2(Issue-4),
2156–2157. Retrieved May 28, 2025, from https://doi.org/10.31142/ijtsrd14583

52

Beerbaum, D. (2021). Applying agile methodology to regulatory compliance projects in the
Financial industry: A case study research. SSRN Electronic Journal. Retrieved June
29, 2025, from https://doi.org/10.2139/ssrn.3834205
Ben-Zahia, M. A., & Jaluta, I. (2014). Criteria for selecting software development models.
Criteria for Selecting Software Development Models, 1–6. Retrieved June 20, 2025,
from https://doi.org/10.1109/gscit.2014.6970099
Berezutskyi, I., Tsiutsiura, S., Rusan, I., Sachenko, I., & Danylyshyn, S. (2023).
Disadvantages of using scrum model in IT projects. 2021 IEEE International
Conference on Smart Information Systems and Technologies (SIST), 89–93.
Retrieved June 22, 2025, from https://doi.org/10.1109/sist58284.2023.10223589
Brumec, S., & Vrček, N. (2012). Cost effectiveness of commercial computing clouds.
Information Systems, 38(4), 495–508. Retrieved June 1, 2025, from
https://doi.org/10.1016/j.is.2012.11.002
Bucanac, C. (1999). The V-Model. In University Of Karlskrona/Ronneby, University of
Karlskrona/Ronneby.
Retrieved
June
25,
2025,
from
https://www.onestoptesting.com/testing-download/download/The%20V-Model.pdf
Chandra, V. (2015). Comparison between Various Software Development Methodologies. In
International Journal of Computer Applications (Vols. 131–131, Issue No.9, pp.
7–8).
Retrieved
June
21,
2025,
from
https://ijcaonline.org/research/volume131/number9/chandra-2015-ijca-907294.pdf
Chang, M. (2024). Research on modern corporate cost management and cost control
methods. International Journal of Global Economics and Management, 2(3),
320–326. Retrieved 28 May, 2025, from https://doi.org/10.62051/ijgem.v2n3.38
Cottur, K., Gadad, V., & International Research Journal of Engineering and Technology
(IRJET). (2020). Design and Development of Data Pipelines. International Research
Journal of Engineering and Technology (IRJET), 07, 2715. Retrieved June 13, 2025,
from https://l1nq.com/WEQz0
Deochake, S. (2023). Cloud Cost Optimization: A comprehensive review of strategies and
case studies. SSRN Electronic Journal. Retrieved May 20, 2025, from
https://doi.org/10.2139/ssrn.4519171
Dharmapal, S., Research Scholar, & Sikamani, T., Prof &. H. O. D. (2015). The Agile V
Process model. In Research India Publications, International Journal of Applied
Engineering Research (Vol. 10, Issue 12, pp. 32601–32608). Retrieved June 26,
2025, from https://www.ripublication.com/ijaer10/ijaerv10n12_188.pdf
53

Dursun, M., & Goker, N. (2022). Evaluation of project management methodologies success
factors using fuzzy Cognitive map method: waterfall, agile, and lean six Sigma cases.
International Journal of Intelligent Systems and Applications in Engineering, 10(1),
35–43. Retrieved June 16, 2025 from https://doi.org/10.18201/ijisae.2022.265
Fang, W. (2023). Financial management problems and countermeasures of SMEs in the
context of big data. International Journal of Economics Finance and Management
Sciences. Retrieved June 2, 2025, from https://doi.org/10.11648/j.ijefm.20231104.15
Fernandes, S., Dinis-Carvalho, J., & Ferreira-Oliveira, A. T. (2021). Improving the
Performance of Student Teams in Project-Based Learning with Scrum. Education
Sciences,
11(8),
444.
Retrieved
June
25,
2025,
from
https://doi.org/10.3390/educsci11080444
Garfinkel, S. (2007). An evaluation of Amazon’s grid computing services: EC2, S3, and SQS.
Retrieved
May
15,
2025,
from
https://dash.harvard.edu/entities/publication/73120379-1f39-6bd4-e053-0100007fdf3
b

GeeksforGeeks. (2025, July 5). Introduction to Amazon Web Services. GeeksforGeeks.
Retrieved
July
7,
2025,
from
https://www.geeksforgeeks.org/cloud-computing/introduction-to-amazon-web-servic
es/
Hernandez, J. I. M., Olaso, J. R. O., & Gutierrez, A. (2013). Technology assessment in
software development projects using a system dynamics approach: a case of
application frameworks. In InTech eBooks. Retrieved June 18, 2025, from
https://doi.org/10.5772/54498
Highsmith, J., & Cockburn, A. (2001). Agile software development: the business of
innovation. Computer, 34(9), 120–127. Retrieved June 19, 2025, from
https://doi.org/10.1109/2.947100
Keutzer, K., Malik, S., Newton, A. R., Rabaey, J. M., & Sangiovanni-Vincentelli, A. (2000).
System-level design: Orthogonalization of concerns and platform-based design.
IEEE Transactions on Computer-Aided Design of Integrated Circuits and Systems,
19(12), 1523–1543. Retrieved June 10, 2025, from https://doi.org/10.1109/43.896012
Kokkinos, P., Varvarigou, T. A., Kretsis, A., Soumplis, P., & Varvarigos, E. A. (2013). Cost
and Utilization Optimization of Amazon EC2 Instances. 2013 IEEE 6th International
Conference on Cloud Computing, 518–525, 518–525. Retrieved June 3, 2025, from
https://doi.org/10.1109/cloud.2013.52
54

Kumar, N. E. K., & Shipra, N. (2021). Detailed study of cloud storage services on AWS
Cloud (Amazon Web Services). International Journal of Scientific Research in
Computer Science Engineering and Information Technology, 291–293. Retrieved
May 29, 2025, from https://doi.org/10.32628/cseit217666
Lingham, A. D., Kin, N. T. K., Jing, C. W., Loong, C. H., & Fatima-Tuz-Zahra. (2020).
Implementation of security features in software development phases. arXiv (Cornell
University).
Retrieved
June
21,
2025,
from
https://doi.org/10.48550/arxiv.2012.13108
Lowman, D. (2025, June 18). CloudZero launches advanced analytics for deeper visibility
and savings insights. CloudZero. Retrieved June 30, 2025, from
https://www.cloudzero.com/blog/cloud-cost-analytics/
Mbata, A., Sripada, Y., & Zhong, M. (2024). A Survey of Pipeline Tools for Data
Engineering. ARXIV. https://arxiv.org/abs/2406.08335. (n.d.). Retrieved June 23,
2025, from https://arxiv.org/abs/2506.00426. https://arxiv.org/abs/2506.00426

Mohammed, N., Munassar, A., & Govardhan, A. (2010). A Comparison Between Five
Models Of Software Engineering. A Comparison Between Five Models of Software
Engineering. Retrieved June
25, 2025, from
http://muazgultekin.weebly.com/uploads/6/4/9/1/6491447/comparasion_of_five_soft
ware_development_process.pdf
Mustafa, O. (2023). Overview of Amazon web services. In Apress eBooks (pp. 1–35).
Retrieved May 27, 2025, from https://doi.org/10.1007/978-1-4842-9303-4_1
Negru, C., & Cristea, V. (2013). Cost models - pillars for efficient cloud computing: position
paper. International Journal of Intelligent Systems Technologies and Applications,
12(1), 28. Retrieved May 21, 2025, from https://doi.org/10.1504/ijista.2013.055102
Open Water Foundation. (n.d.). Cost Explorer - Learn / AWS. Retrieved June 2, 2025, from
https://learn.openwaterfoundation.org/owf-learn-aws/costs/cost-explorer/cost-explore
r/
Ordynskaya, M. E., Silina, T. A., Divina, L. E., Tausova, I. F., & Bagova, S. A. (2021).
Functions of cost management systems in modern organizational management.
Universal Journal of Accounting and Finance, 9(3), 498–505. Retrieved May 28,
2025, from https://doi.org/10.13189/ujaf.2021.090324
Panigrahy, S., Dash, B., & Thatikonda, R. (2023). From Data Mess to Data Mesh: Solution
for
futuristic
Self-Serve
platforms.
IJARCCE,
12(4).
https://doi.org/10.17148/ijarcce.2023.124121
55

Pargaonkar, S. (2023). A Comprehensive Research Analysis of Software Development Life
Cycle (SDLC) Agile & Waterfall Model Advantages, Disadvantages, and
Application Suitability in Software Quality Engineering. International Journal of
Scientific and Research Publications, 13(8), 120–124. Retrieved June 17, 2025, from
https://doi.org/10.29322/ijsrp.13.08.2023.p14015
Polinati, A. K. (2025). Hybrid Cloud Security: Balancing performance, cost, and
compliance in Multi-Cloud deployments. Retrieved 2 June, 2025, from
https://doi.org/10.48550/ARXIV.2506.00426
Ponce, P., Mendez, E., & Molina, A. (2021). Teaching fuzzy controllers through a V-model
based methodology. Computers & Electrical Engineering, 94, 107267. Retrieved
June 23, 2025, from https://doi.org/10.1016/j.compeleceng.2021.107267

Pourmajidi, W., Steinbacher, J., Erwin, T., & Miranskyy, A. (2018). On challenges of cloud
monitoring. arXiv (Cornell University). Retrieved June 22, 2025, from
https://doi.org/10.48550/arxiv.1806.05914
Prasad, A., & Chakrabarty, P. (2013). Centralized Access Management and Monitoring as a
Service in Cloud Environments-A Critical Study. Computer and Information Science,
Radack,
S.
M.
(206(2).
Retrieved
June
12,
2025,
from
https://doi.org/10.5539/cis.v6n2p126
09). ITL Bulletin: The System Development Life Cycle (SDLC) (April 2009). Retrieved
June 16, 2025, from https://www.hsdl.org/?abstract&did=797067
Rastogi, V. & Dept. of ISE, MVJCE Bangalore. (2015). Software development life cycle
models- comparison, consequences. In IJCSIT International Journal of Computer
Science and Information Technologies (Vols. 6–1, pp. 168–172). Retrieved June 26,
2025,
from
https://www.ijcsit.com/docs/Volume%206/vol6issue01/ijcsit2015060137.pdf
Rathnayaka, I. G. U. D., Kumara, B., Department Remote Sensing & GIS, Faculty of
Geomatics, Sabaragamuwa University of Sri Lanka, & Department of Computing
and Information Systems, Faculty of Applied Sciences, Sabaragamuwa University of
Sri Lanka. (2020). A review of software development methodologies in software
engineering. Vol-6 Issue-4, 1844–1845. Retrieved June 25, 2025, from
https://ijariie.com/AdminUploadPdf/A_Review_of_Software_Development_Method
ologies_in_Software_Engineering_ijariie12553.pdf?srsltid=AfmBOoraaL-stzV1AT
Mhk8zVrgJ88gurYCHU75fK9DhCO1noXt19q00i

56

Regulwar, G. B., Jawandhiya, V. G. P. M., & Deshmukh, R. M. T. P. R. . (2010). Variations
in V model for software development. International Journal of Advanced Research
in Computer Science, 1(2), 135–140. Retrieved June 24, 2025, from
https://doi.org/10.26483/ijarcs.v1i2.37
Robinson, R. N., & Taneh, A. N. (2018). DIGITAL ILLITERACY: A CONSTRAINT TO
TECHNOLOGY EDUCATION ADVANCEMENT IN SOUTH-SOUTH REGION
OF NIGERIA. International Journal of Research -GRANTHAALAYAH, 6(11),
307–314.
Retrieved
June
5,
2025,
from
https://doi.org/10.29121/granthaalayah.v6.i11.2018.1132

Saeedi, K., & Visvizi, A. (2021). Software Development Methodologies, HEIs, and the
Digital Economy. Education Sciences, 11(2), 73. Retrieved June 20, 2025, from
https://doi.org/10.3390/educsci11020073
Saini, N. A., Sharma, N. C., Khan, N. N., Chauchan, N. R., & Singh, N. G. (2024). A
REVIEW PAPER ON AWS. EPRA International Journal of Multidisciplinary
Research
(IJMR),
164–169.
Retrieved
May
29,
2025,
from
https://doi.org/10.36713/epra15444
Saravanos, A., & Curinga, M. X. (2023). Simulating the Software Development Lifecycle:
The Waterfall Model. arXiv (Cornell University). Retrieved June 21, 2025, from
https://doi.org/10.48550/arxiv.2308.03940
Shinde, S., & Adkar, P. (2018). A modern review on scrum: Advance project management
method. International Journal of Trend in Scientific Research and Development,
Volume-2(Issue-4),
87–95.
Retrieved
June
25,
2025,
from
https://doi.org/10.31142/ijtsrd12864
Srivastava, D. (2023). An introduction to data visualization tools and techniques in various
domains. International Journal of Computer Trends and Technology, 71(4), 125–130.
https://doi.org/10.14445/22312803/IJCTT-V71I4P116
Vantage: Multi Cloud Cost Management & Optimization Tool. (n.d.). Vantage. Retrieved
June 25, 2025, from https://www.vantage.sh/
Verbraeken, J., Wolting, M., Katzy, J., Kloppenburg, J., Verbelen, T., & Rellermeyer, J. S.
(2020). A survey on distributed machine learning. ACM Computing Surveys, 53(2),
Article 30. https://doi.org/10.1145/3377454
What are AWS Cost and Usage Reports? - AWS Data Exports. (2025). Retrieved July 5,
2025, from https://docs.aws.amazon.com/cur/latest/userguide/what-is-cur.html

57

What is an Internal Developer Platform (IDP)? (2025, June 10). Internal Developer
Platform.
Retrieved
June
19,
2025,
from
https://internaldeveloperplatform.org/what-is-an-internal-developer-platform
Ye, K. (2017). Anomaly detection in clouds. Proceedings of the 2nd International
Conference on Cloud Computing and Security, 1–6, 1–2. Retrieved June 3, 2025,
from https://doi.org/10.1145/3129457.3129497
Zasornova, I., Lysenko, S., & Zasornov, O. (2022). CHOOSING SCRUM OR KANBAN
METHODOLOGY FOR PROJECT MANAGEMENT IN IT COMPANIES.
Computer Systems and Information Technologies, 4, 6–12. Retrieved June 21, 2025,
from https://doi.org/10.31891/csit-2022-4-1
Zoppoli, A., Armentani, E., Buonocore, L., Buonocore, S., Di Giovannantonio, S., Di
Castro, M., & Di Gironimo, G. (2023b). System engineering design approach and
virtual assessment of a new charging arm concept for LHC robotic TIM. The
International Journal of Advanced Manufacturing Technology, 128(3–4),
1889–1906. https://doi.org/10.1007/s00170-023-11848-6
Žužek, T., Kušar, J., Rihar, L., & Berlec, T. (2020). Agile-Concurrent hybrid: A framework
for concurrent product development using Scrum. Concurrent Engineering, 28(4),
255–264. Retrieved June 25, 2025, from https://doi.org/10.1177/1063293x20958541

58

APPENDICES

Appendix A: Gantt Chart for semester 6
No.

Week

1

Activities

SEMESTER 6

1

Meeting with
devops’ team
lead

2

Propose
project title

3

Requirement
gathering
with
stakeholder

4

Draft project
motivation

5

Review with
Coach

6

Submit
project
motivation
(F1)

7

Draft chapter
1

8

Review
chapter 1 with
Coach

9

Submit

2

3

4

5

6

7

8

9

59

10

11

12

13

14

15

16

17

chapter 1 to
SV
10

Draft outline
chapter 2

11

Review
outline
chapter 2 with
SV
and
Coach

12

Draft chapter
2

13

Draft outline
chapter 3

14

Submit
outline
chapter 3 to
sv

15

Draft chapter
3

16

Review the
outline
chapter 3 with
Coach
and
SV

17.

Submit
chapter 2 and
3 to SV

18.

Prepare full
proposal
report

18

Submit
proposal for
ai checking
and similarity
percentage

19

Prepare slide
presentation

20

Review the
slide
presentation
with Coach
and SV

21

Conduct
mock
presentation
of proposal

22

Presentation
of proposal

APPENDICES

60

61


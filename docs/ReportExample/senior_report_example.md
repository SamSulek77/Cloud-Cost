NUR SYAHIRA
BINTI ABD WAHAB

TS DR EDZREENA
EDZA BINTI ODZALY

Supervisor (Industry)

Supervisor (Academic)

Universiti Teknologi MARA

DYNAMIC PROMOTIONS – PRICE
OVERRIDE IN FUEL RETAIL
MANAGEMENT SYSTEM

AREENA BINTI ADNAN

Thesis submitted in fulfilment of the requirements
for Bachelor of Information Systems (Hons.)
Information Systems Engineering
College of Computing, Informatics and
Mathematics

JANUARI 2025

SUPERVISOR APPROVAL

DYNAMIC PROMOTIONS – PRICE OVERRIDE IN FUEL RETAIL
MANAGEMENT SYSTEM
By
AREENA BINTI ADNAN
2021477446
This thesis was prepared under the supervisors of the project supervisor, Ts. Dr.
Edzreena Edza Binti Odzaly. It was submitted to the Faculty of Computer, Informatics
and Media and was accepted in partial fulfilment of the requirements for the degree of
Bachelor of Information Systems (Hons.) Information Systems Engineering.

Approved by

………………………………
Ts. Dr. Edzreena Edza Binti Odzaly
Academic Supervisor

January 24, 2025

ii

INDUSTRY COACH APPROVAL

DYNAMIC PROMOTIONS – PRICE OVERRIDE IN FUEL RETAIL
MANAGEMENT SYSTEM
By
AREENA BINTI ADNAN
2021477446
This thesis was prepared under the supervisors of the industry coach, Nur Syahira Binti
Abd Wahab and conducted at Silentmode Sdn. Bhd. It was reviewed and endorsed by
the industry as part of fulfilling the practical requirements for the degree of Bachelor
of Information Systems (Hons.) Information Systems Engineering.

Approved by

………………………………
Nur Syahira Binti Abd Wahab
Industry Coach
Silentmode Sdn Bhd
January 24, 2025

iii

STUDENT DECLARATION

I certify that this thesis and the project to which it refers is the product of my own work
and that any idea or quotation from the work of other people, published or otherwise
are fully acknowledge in accordance with the student referring practices of the
discipline.

………………………………
AREENA BINTI ADNAN
2021477446

January 24, 2025

iv

ACKNOWLEDGEMENT

Alhamdulillah, I would like to express my heartfelt gratitude to my lecturer, Ts. Dr.
Edzreena, and my industry supervisor, Nur Syahira Binti Abd Wahab, as well as my
fellow developers and friends, for their invaluable support throughout my Final Year
Project (FYP). Their guidance, expertise, and encouragement have been a source of
strength, motivating me to move forward and produce quality research. I am truly
thankful for their unwavering support and commitment throughout this project.
I also wish to extend my sincerest and deepest thanks to my family for their
unconditional love and support. Their belief in my abilities and continuous words of
encouragement have been a constant source of motivation, enabling me to give my
very best to complete this FYP. I am forever grateful for the sacrifices they have made,
dedicating their time and effort to help me succeed.
Lastly, I want to acknowledge myself for believing in my abilities and staying
determined to overcome challenges during this journey.

v

ABSTRACT

This project focuses on enhancing the Revolutionary Point Of Sale (RONPOS) fuel
retail management system for client by introducing a dynamic Override Price
Promotions Module, addressing critical limitations in the current static promotions
framework. Existing promotions, such as combo sets, free products, and fixed
discounts, lack the flexibility for client Headquarter (HQ) to adapt to market trends or
tailor promotions to specific outlets or customer groups. This rigidity limits
competitiveness, leading to missed opportunities to attract customers and increase
sales. The new module enables HQ to adjust non-fuel prices dynamically through
override promotions, allowing quick responses to competitor actions, seasonal trends,
and customer needs. This supports strategic promotional activities, fosters customer
loyalty, and drives revenue growth. The project uses Agile Scrum methodology to
ensure iterative development, stakeholder collaboration, and adaptability to changing
requirements. It consists of three sprints: the first focuses on promotion setup in the
Back Office System (BOS), the second on promotion display in the Point of Sale (POS)
system, and the third on promotion reporting. The deliverables include setting up
promotions in BOS, displaying them in POS and receipts, and tracking override
promotions in reports. The new module simplifies real-time price adjustments and
enhances marketing strategies, enabling retailers to offer personalized and dynamic
promotions. This improves customer satisfaction, loyalty, and competitive positioning
by aligning promotions with market demands. Future enhancements may include realtime performance monitoring of promotions and automated synchronization between
RONPOS and back-office systems to further streamline processes. These
advancements will ensure the system remains responsive to the evolving needs of the
fuel retail industry, supporting proactive decision-making and sustained growth in a
highly competitive market.

vi

TABLE OF CONTENTS

CONTENT

PAGE

SUPERVISOR APPROVAL

ii

INDUSTRY COACH APPROVAL

iii

STUDENT DECLARATION

iv

ACKNOWLEDGEMENT

v

ABSTRACT

vi

TABLE OF CONTENTS

vii

LIST OF FIGURES

xi

LIST OF TABLES

xiii

LIST OF ABBREVIATIONS

xiv

CHAPTER ONE; INTRODUCTION
1.1

Background of Study

1

1.2

Problem Statement

6

1.3

Project Aim

7

1.4

Project Objectives

7

1.5

Project Scope

8

1.6

Project Significance

8

1.7

Outline of the Proposal

9

1.8

Summary

10

CHAPTER TWO: LITERATURE REVIEW

11

2.1

12

Retail

vii

2.1.1

Fuel Retail

14

2.1.2

Challenges in Fuel Retail

16

2.2

Promotions

18

2.2.1

Types of Promotions

19

2.2.2

Benefits of promotions

19

2.3

Application Platform

21

2.3.1

Web-Based System

21

2.3.1.1 Static Web-Based Application

23

2.3.1.2 Dynamic Web-Based Application

23

2.4

Related Systems

25

2.4.1

Passport X

25

2.4.2

X-Series

28

2.4.3

PDI Technologies

30

2.4.4

Comparison of Related System

32

2.5

Methodology

36

2.5.1

Waterfall Model

37

2.5.2

Spiral Model

38

2.5.3

Agile Scrum Methodology

40

2.5.4

Comparison of methodologies

42

2.6

Discussion

44

2.7

Summary

45

CHAPTER THREE: METHODOLOGY
3.1

Agile Scrum Methodology

46

3.2

Scrum Phase

47

3.2.1

Initiation Phase

52

3.2.2

Planning and Estimation

53

3.2.3

Implementation

55

3.3

Summary

56

viii

CHAPTER FOUR: RESULTS AND FINDINGS
4.1

Results of Initiation Phase

58

4.1.1

Results of Interviews

59

4.1.2

Results of Analysis

62

4.2

Results of Planning and Estimation Phase

63

4.2.1

User Stories

63

4.2.2

Sequence Diagram

68

4.2.3

Design Interface of the System

71

4.3

Results of Implementation Phase

78

4.3.1

Interfaces of the System

78

4.4

Summary

84

CHAPTER FIVE: CONCLUSION AND RECOMMENDATION
5.1

Conclusion

85

5.1.1 Objective 1: To gather and analyse the requirements for RONPOS
promotions module
85
5.1.2

Objective 2: To design the interface of RONPOS promotions module
86

5.1.3 Objective 3: To develop the override price promotions module for
RONPOS promotions module
86
5.2

Strength

87

5.3

Project Limitation

87

5.4

Recommendations for Future Enhancements

88

5.5

Summary

89

REFERENCES

90

APPENDICES

97

APPENDIX A:

97

GANTT CHART Semester 6

97

ix

GANTT CHART Semester 7

97

APPENDIX B: Functional Specification Document (FSD)

98

x

LIST OF FIGURES
FIGURE

PAGE

1.1

Flowchart of current promotion process

5

2.1

Structure of Literature Review

11

2.2

Passport X

26

2.3

X-Series

28

2.4

PDI Point of Sales (POS)

31

2.5

Waterfall Model

37

2.6

Spiral Model

39

2.7

Agile Scrum Model

41

4.1

Sequence Diagram of Override Price Promotion Setup

68

4.2

Sequence Diagram of Override Price Promotion in POS

69

4.3

Sequence Diagram of Override Price Promotion Transaction in POS

70

4.4

Sequence Diagram of Override Price Promotion Report in BOS

70

4.5

Override Price Promotion Section Setup

72

4.6

Override Price Promotion Trigger and Actions Setup

73

4.7

Override Price Promotion Availability Setup

74

4.8

Override Price Promotion in POS Cart

74

4.9

Override Price Promotion Section in POS

75

4.10

Override Price Promotion Details in POS

75

4.11

Override Price Promotion Details in Receipt

76

4.12

Override Price Promotion Summary Promotion Report by Product in BOS
76

4.13

Override Price Promotion Report in BOS

77

4.14

Override Price Promotion Setup at BOS

78

4.15

List of Promotions in BOS

79

4.16

Updating Override Price Promotion in BOS

79

xi

4.17

Override

Price

Promotion

Section

Page

in

POS
80

4.18

Override Price Promotion Details in POS – Promotion Page

81

4.19

Override Price Promotion in POS Cart

81

4.20

Override Price Promotion in Receipt

82

4.21

Override Price Promotion Report in Cloud BOS

83

xii

LIST OF TABLES
TABLE

PAGE

2.1

Comparison of Related System

33

2.2

Comparison of Methodologies

42

3.1

Scrum Phase

47

3.2

Scrum Phase for Each Sprint

49

3.3

System Specifications

56

4.1

Summary of The First Interview

60

4.2

Summary of The Second Interview

60

4.3

User Stories for Override Price Promotion Setup in BOS

64

4.4

User Stories of Override Price Promotion in POS

66

4.5

User Stories of Promotion Report in BOS

67

xiii

LIST OF ABBREVIATIONS

POS

Point-of-Sale

BOS

Back Office System

HQ

Headquarters

EV

Electric Vehicle

SDLC

Software Development Lifecycle

CSS

Cascading Style Sheets

HOS

Head Office System

RONPOS

Revolutionary Point Of Sale

xiv

CHAPTER 1

INTRODUCTION

This chapter introduces the proposed project: developing a override price promotions
module for RONPOS systems. It will begin by outlining the project’s background, the
problems that motivated this research, and the specific objectives aimed to achieve.
Additionally, this chapter will define the project's overall goal (aim), establish its scope,
and explain its significance. Finally, the report will include, and an outline and a concise
summary aimed at enhancing clarity and understanding of the entire project.

1.1

Background of Study

RONPOS is designed for fuel retailing businesses that sell fuel products basically
gasoline and diesel to both consumers and enterprises. Typical operators range
from large multinational corporations running extensive networks of service
stations to smaller independent operators operating single outlets. It forms the
chief lifeline in the energy supply chain, from which fuel needed for
transportation, heating, and other important applications is availed for use by the
members of the public. A headquarter is usually the core central management
entity of these fuel retail companies that oversees operation, formulates strategies,
and assures locations are upholding regulatory compliance for the retail sector.
HQ should be involved in charge of supply chain management, strategies on
pricing and marketing. It will also integrate new technologies, such as the
RONPOS system, to raise operational efficiency and customer satisfaction.

1

Fuel retailing has evolved into a dynamic and highly competitive business niche
focused on the direct sale of fuel products to end-users. It includes not only the
direct sales of gasoline and diesel but also often-associated services like
convenience stores, car washes, and automotive services. Fuel retailers must
approach the complex setting of fluctuating oil price scenarios, regulatory
requirements, and changes in consumer behaviours. On the other hand, the niche
has identified key business processes that include supply chain management to
maintain a steady supply of fuel, price strategies that will keep it competitive, and
customer service initiatives that retain and attract customers. Enabling all these
changes at the forefront will be the adoption of advanced technologies such as the
RONPOS system, critical for creating a seamless customer experience via
improved operational efficiencies and faster transaction speed.

A robust cloud-based point-of-sale (POS) system called RONPOS was created
especially for fuel retail companies. An essential component of fuel retail
management solutions offered as Software-as-a-Service (SaaS) to clients looking
for the best fuel station operations is a product made by Silentmode Sdn. Bhd. To
operate, RONPOS makes use of both cloud and on-premises hardware. The
RONPOS system is extremely dependable and adaptable to any size gasoline retail
convenience business management's specific requirements. RONPOS systems
makes seamless Point-of-Sale transactions possible by supporting several
payment options, including cash, credit cards, and loyalty programmes, which
improves consumer convenience and satisfaction. Fuel inventory levels are
tracked in real-time with strong inventory management features; this allows for
effective delivery management through purchase orders and invoicing as well as
low stock notifications. Retailers are empowered to make well-informed decisions
and optimise business strategies with detailed reporting and analytics solutions
that offer significant insights into sales performance, inventory status, fuel usage
trends, and consumer behaviour.

2

Fuel pumps, price displays, and tank gauges are all managed by forecourt systems,
which ensure smooth operation. Centralized control of fuel retail operations is
made possible by connecting to back-office systems, improving management and
efficiency. Strict security rules and compliance standards make the POS system
safer and more reliable, ensuring data protection, payment security, and fraud
prevention.

As technology has improved, the fuel retail industry has gone through big changes,
leading to the need for new solutions to improve promotion strategies. However,
many businesses still face problems with rigid promotion structures that limit their
ability to offer customized deals and adjust promotions quickly. This issue
prevents businesses from offering specific discounts to certain customers or
locations, reducing their ability to boost revenue and react quickly to market shifts.
This study looks at ways to improve fuel retail systems, focusing on flexible
promotions and location-based offers.

The sector in fuel retail is extremely competitive, and the success of it greatly
depends on customer loyalty and well-planned promotions. In order to. draw
customers, a lot of petrol merchants use a fixed pricing approach while still
providing promotions. However, stations who are hoping to compete successfully
face numerous obstacles from this static strategy. Retailers are unlikely able to
react regarding the shifts in the market or the actions of their competitors when
they are unable to dynamically modify their promotions. This limits their capacity
to draw in new business and hold onto existing customers.

In the current process, the promotions only available to three categories which are,
combo set, free product, and discount. While these promotions offer some
benefits, the lack of override price promotions creates significant challenges.
RONPOS system could offer a combo set such as a cup of Teh Tarik and pastries
with a gas purchases. This caters to the Malaysian love for Teh Tarik and provides
3

a convenient snack option. However, a competitor with a dynamic pricing solution
can immediately adjust prices to attract these customers. Secondly, the station
could offer a free bottle of water with every gas fill-up exceeding a specific
volume. This attracts customers and might lead to increased gas purchases to
qualify for the freebie. Thirdly, the 5% discount on premium gas during weekdays
could attract customer seeking a better deal is example for discount promotion.
While these types of promotions are options, they lack the flexibility to adapt to
real-time situations. For example, during the recent Hari Raya holiday in
Malaysia, our big competitor, a major fuel seller, had a surprise deal. They offered
big discounts on fuel bought during busy travel times, like when everyone was
heading home for the celebration. But because the system does not let us change
prices quickly, fuel retailer could not react well. Figure 1.1 depicts the current
process of existing promotion type in flowchart diagram.

4

Figure 1.1 Flowchart of current promotion process
By having an override price promotion that can be constantly modify, it will ease
the HQ to temporarily adjust fuel prices and convenience store items for
promotional purposes. This feature allows HQ to set up promotions with specific
values and automatically adjust pump prices during the promotion period. By
offering temporary discounts, this feature can attract more customers, increase
5

sales, build loyalty, provide a competitive environment, and enhance the overall
customer experience.

1.2

Problem Statement

Based on the observation and interview conducted with Nur Syahira Binti Abd
Wahab and Siti Nursyafiqah Binti Mohd Rode on 8th April 2024 about the current
business process of RONPOS, there are several problems that have been identified
as below:

i.

The lack of flexible approach to apply promotions that enables businesses
to tailor promotions to specific customer groups or/and for marketing
strategies.

At the existing fuel station outlet, there is a problem which are, the
headquarters (HQ) cannot create promotions that override the store’s prices.
This problem arises because the existing fuel retail system does not have a
dynamic approach for applying discounts, which prevents companies from
modifying promotions to target customers or marketing strategies. The
dynamic approach allows the HQ to modify it in real-time based on specific
conditions. Other than that, dynamic promotion can be adjusted quickly to
match competitors or respond to seasonal trends. This restriction continues to
come up all the time, making it difficult for companies to properly adjust to
marketing plans and time frames. Therefore, a feature that allows dynamic
discount application that are customised to fulfil marketing goals and adjust
to shifting market conditions must be put into place immediately.

ii.

The absence of functions to implement price override promotions that
are specific to certain outlets.
6

In certain instances, the HQ wants to apply price override promotions at
specific outlets only. However, to implement the promotion to specific
outlets, they must select the specific outlets from the list of outlets.
Unfortunately, the current system does not have functions to implement
override price promotions that are specific to certain outlets. Consequently,
all outlet to automatically apply override price promotions whenever the HQ
create override promotions for certain outlets instead of certain outlets only.
This setback led to all outlets automatically applying override price
promotions, instead of selectively as intended when HQ creates override
promotions for specific outlets. To ensure accuracy and efficiency in
promotion application in accordance with HQ directives, it is necessary to
develop and integrate functions within the system to enable precise
implementation of override price promotions for designated outlets. This
inefficiency in promotion management undermines targeted marketing efforts
and strategic directives.

1.3

Project Aim

The aim of this project is to develop dynamic promotion types of price override
in fuel retail point of sale system within the RONPOS.

1.4

Project Objectives

The main objectives of this project are:
i.

To gather and analyse the requirements for RONPOS promotions module.

ii.

To design the interface of RONPOS promotions module.

iii.

To develop the override price promotions module for RONPOS promotions
module.

7

1.5

Project Scope

The scope of the project will be concentrating on the development of the Fuel
Retail System that enables the HQ to create override promotions for fuel and nonfuel sales based on the requirements by several interview sessions with
stakeholders. The end user of this system are fuel retailers and headquarters. The
module will focus on managing override promotions that are held by HQ, thereby
providing a platform to facilitate the implementation of targeted promotional
activities across specific outlets. The systems will enable HQ to apply override
promotions in RONPOS system. The project will focus on fuel retails outlets
across Malaysia. The enhancement should address the specific challenges
mentioned, such as unable to create override promotion and implementation of
override promotion to specific outlets.

1.6

Project Significance
This project is exclusive for the fuel retailers(Shell and BHP)to manage the
override price promotion.
i.

Headquarters’ (HQ)
The significance of implementing override price promotions in the fuel retail
system lies in its ability to offer flexible and competitive override promotions
strategies. The ability to implement override price promotions offers
Headquarters (HQ) a flexible, dynamic tool to manage and deploy
promotions. Unlike traditional static promotions, HQ can adapt these override
promotions in response to real-time market risks and competitor actions,
enhancing the company's agility. This responsiveness is critical for retaining
client loyalty and driving revenue growth in the competitive fuel retail
industry, where adaptability is key.

ii.

Retailers

8

Override price promotions empower fuel retailers to tailor promotions based
on location, customer group, and time. For example, a station in Kuala
Lumpur can offer discounts during peak hours to attract higher foot traffic,
particularly targeting commuters. This customization not only maximizes
marketing impact but also ensures the promotions reach and engage the right
audience. Retailers benefit from increased customer satisfaction and
engagement as they deliver these personalized offers, fostering loyalty and
repeat visits.
iii.

Customers
Customers will gain more personalized experience through override price
promotions, as they can enjoy deals that have their specific needs and
preferences. For instance, a fuel station in Melaka might offer regular
discounts to loyal customers or special promotions during school holidays.
These customized deals enhance the overall customer experience, increasing
the likelihood of continued purchasing. This beneficial setup will increase
customer satisfaction, while at the same time increasing sales and loyalty for
fuel retailers.

1.7

Outline of the Proposal
The project proposal consists of three chapters, which are introduction, literature
review and methodology for the project RONPOS system. The introduction
section has been explained at the beginning of this proposal. The outline and
insight of the other two chapters can be summarized as below:
i.

Chapter 2 will highlight about literature review of this propose project. This
chapter focuses on the procedure for acquiring, identifying, evaluating, and
compiling relevant data for this project.

ii.

Chapter 3 will illustrate the methodology involved throughout this project. It
will outline the appropriate approach and methos that will be utilized to

9

complete this project. This section will discuss briefly for each phase based
on the information gathered.
iii.

Chapter 4 will discuss the result and findings of the project. It will display the
details of the activities for the project.

iv.

Chapter 5 concludes the project success as well as discussion on future
enhancements for the project.

1.8

Summary
In summary, this chapter describes an overview of the proposed project’
background and the system for the fuel retailers in Malaysia. It addresses the
problems statement that the HQ and retailers face, providing a well-defined focus
on implementing the best solution for the stakeholders. Furthermore, this chapter
provides an in-depth exploration of the project’s significance, highlighting the
advantages and benefits of implementing override promotions in the RONPOS
system. Finally, this chapter concludes with and explanation of the project outline
for the following Chapter 2, Chapter 3, Chapter 4, and Chapter 5.

10

CHAPTER 2

LITERATURE REVIEW

This chapter provides a fundamental of knowledge and insights about the literature review
for the dynamic promotions for override price in fuel retail management. It explores
existing studies, theories, and concepts, analysing their relevance and identifying gaps in
research. It aims to clarify the system’s clarification requirements for this project.
Furthermore, the chapter outlines potential methodologies for the system development
and reviews relevant literature pertaining to the project. It ends with an outline and
summary to help understand the role of the literature review in the project.

Figure 2.1 Structure of Literature Review

Figure 2.1 shows the overview structure of the literature review of this project which
covers a range of topics related to retail, promotion, and web-based application. This
chapter will explain on the application platform to be used for this project, exploring
11

comparison with existing promotion like discounts, and delves into different
methodologies for the project, including waterfall, agile scrum, and modified waterfall.
The central focus in on the override promotion for retail, with specific mentions of the
Passport X, X-Series and PDI technologies. Finally, this chapter also provides a summary
of this chapter

2.1

Retail

The retail sector is one of the major significances in an economy, as it directly
serves the consumers through all kinds of establishments, from small shops to
gigantic supermarket chains and malls, dealing in personal and household goods,
products, and services (Hameli, 2018). In advanced economies, the retail sector
has witnessed a rise in both the size of operations and market dominance, as large
retail chains have expanded their market share at the expense of independently
owned small stores (Pentescu & Paștiu, 2020). In the 2000s, there was a significant
shift in the retail sector with the rise of e-commerce. As was the case in times past,
consumers now detest going physically to stores but prefer to shop online from
the comfort of their couch and have purchases delivered to them (Andrews et al.,
2022). The accessibility or availability and product range are some of the benefits
online retail formats have over other retail formats. Online retail formats could
easily reach consumers across the globe without having to maintain as many stores
as would be necessary otherwise (Gauri et al., 2021). Though one cannot deny the
direct customer interaction that impacts the quality of the shopping experience and
speed of delivery, there can still be situations when online shops have an edge. For
example, objective information about products is easily accessible online, but
sensory items like perfumes or apparel may require personal inspection, giving
traditional offline formats an advantage in this case.

There are numerous strategies for retailing: pricing strategies, merchandising
techniques, and promotional tactics. In multiproduct retail markets, pricing
12

strategies are complex, and it involve setting prices for different products,
implementing price discrimination, making decisions on product variety and
pricing, and balancing price and quality considerations to offer a desirable mix of
attributes within each product line (Hamilton et al., 2020). The emergence of the
new age consumer has shifted bargaining power from sellers to buyers, enabling
consumers to access information and make purchases from multiple channels at
their own convenience, leading to the need for retailers to adopt omni-channel
marketing strategies to engage consumers across various touchpoints and deliver
seamless service (Shetty et al., 2018). To counter showrooming and improve
customer experiences, retailers should enhance in-store displays, use smart
technology, personalize interactions, offer omni-channel coupons, avoid big
discounts, keep messages consistent, and encourage positive online reviews with
incentives (Schrotenboer et al., 2022).

The growing globalization of retailing, surround both sales and supply points, has
significantly increased IT spending in the sector, with IT now playing a crucial
role in managing complex retail operations. (Tandon & Mohan, 2018).
Technology has transformed the retail industry by improving customer
satisfaction with features like mobile checkouts and contactless payments,
enhancing online shopping experiences, streamlining inventory management, and
automating price auditing processes (Kawadkar, 2019). With rapid Internet
advances, many retailers see the Internet of Things to achieve sustainable
competitive advantage and long-term profitability (Vojvodić, 2019). For example,
Smart in-store technologies like RFID-based smart fitting rooms, smart shelves,
smart shopping carts, self-checkout systems, and technology-mediated realities.
These technologies enable the optimization of business processes, boost key
business metrics, and provide competitive advantages in the market (Borisova et
al., 2020).

Retailers must produce creative ways to improve customer satisfaction in the face
of ongoing changes in the retail industry brought about by technological
13

advancements and changing consumer behaviour. These changes are brought by
saturated markets, difficulty differentiating products and prices, and difficulty
maintaining a competitive edge (de Sousa et al., 2021). The retailers should find
a way to make operations systematically suited to changing consumer behaviour,
caused by internet-driven shopping in supply chain and customer services through
virtual means, so that shopping for each category would be seamless and
satisfactory in all channels, especially when living through pandemics (Akram et
al., 2021). The following subsections will describe more on the fuel retail and its
challenges.

2.1.1 Fuel Retail

Since small-format and out-of-home retail have grown, fuel stations have been
able to capture significant incremental value from fuel retail and other nonfuel
retail (NFR) businesses, making fuel retail one of the more adaptable segments in
the oil and gas industry over the past ten years (Álvaro et al., 2021). The fuel
retailing sector comprises fuel terminals and half a million retail stations
worldwide, each with a costly underground fuel system fixed at a specific location
(Kwong Kiat, 2014). Using digital solutions to improve consumer experiences and
automated systems and sophisticated technologies like the Internet of Things (IoT)
to maximise operational efficiency, technology and innovation are key drivers of
retailing. The IoT, artificial intelligence (AI), and data analytics have combined to
revolutionize older retailing processes, much like the fuel retailing industry.
According to Sagar (2024), these technologies combine to drive operational
efficiency, supply chain logistic optimization, and personalization of customer
experience—running on IoT sensors that track environmental situations in realtime, track fuel inventory, and AI powering predictive analytics and price
strategies.
Consumer behaviour sectors is also evolving due to market process, growing
demand for non-fuel services at stations, technological advancements in retail and
14

petrol sectors, and changing consumer preferences towards organized retail are
influenced by factors like pricing, quality, hygiene, and variety of products across
global markets (Purohit & Jain, 2020). Fuel retailers have seen profit declines due
to higher spending and now rely on attracting customers, especially those aged
18-34, with the hope they will purchase profitable items inside the store. However,
many customers only buy low-margin items like water or chips (Badlani &
Singhal, 2016).
In the fuel retail industry, specific product offers are important for attracting and
keeping customers, especially as competition grows and consumer tastes change.
Fuel retailers are adding more variety to their products by not only selling
traditional fuels but also including alternative energy sources like biodiesel,
electric vehicle (EV) charging stations, and hydrogen fuel. Businesses also
diversify their product and service offerings to include a range of convenience
items and services that cater to customer needs beyond just fuel. Many retailers
also improve their offerings by adding convenience store items, such as snacks,
drinks, and car supplies, to create a one-stop-shop for customers (Nolan, 2024).
This includes partnering with food and beverage brands, providing quick service
restaurants, and offering essential vehicle services such as tire repairs and battery
swaps for electric vehicles.
Retailers are also focusing on creating a comprehensive customer experience by
incorporating amenities like clean restrooms and prayer facilities, which enhance
customer satisfaction and loyalty (bp, n.d.). This trend highlights the importance
of adaptability in the fuel retail sector, as companies that expand their service
offerings can better meet the evolving demands of consumers and remain
competitive in a rapidly changing market.
They often have loyalty programs and discounts on fuel purchases to encourage
customers to come back and build brand loyalty. As sustainability becomes a key
concern for shoppers, fuel retailers are changing their product lines to include ecofriendly choices and partnering with local businesses, which helps them stay
relevant in the changing fuel retail market. Rubies et al. (2022) outlines the need
for fuel retailers to adapt their product offerings in response to changing consumer
15

preferences, emphasizing the importance of incorporating alternative fuels like
biofuels and hydrogen, as well as expanding EV charging infrastructure, to remain
relevant in an evolving market.

2.1.2 Challenges in Fuel Retail

The challenges in implementing digital solutions in the fuel retail industry include
protecting against cyber threats, ensuring strong data security, creating a culture
of digital awareness among employees, and managing complex regulations to
remain secure and operational. (Haouel & Nemeslaki, 2024). Fuel retailers are
struggling to survive due to emerging trends like the rise of electric vehicles (EV)
and shifts in consumer behaviour towards sustainability. This is also mentioned
by Mohamed Rizwan & K.Karthikeyan (2023), who suggest that consumer
demands and needs are constantly evolving and business owners in the fuel retail
outlet industry need to be ready to adjust with the current trends. According to
Aziz (2020), to stay competitive in the fuel retail industry, fuel retailers must
invest in electric vehicle (EV) charging to attract customers to their stations. They
also need to keep up with new digital technologies and the rising demand for nonfuel services. To survive, these retailers must improve their services, business
processes, efficiency, and innovate to meet the changing needs of consumers.
To remain competitive, fuel retailers must invest in the EV charging industry and
keep pace with advancements in digital technology, such as mobile app
integrations and robust POS systems. These technologies can streamline services,
enhance customer engagement, and support the growing demand for non-fuel
retail services (Debra, 2023). Gupta (2020) also highlights several challenges
faced by fuel retailers, including a significant decline in fuel demand due to the
COVID-19 pandemic and changing consumer behaviours, as well as the rise of
alternative fuels and autonomous vehicles, which threaten traditional fuel sales
and necessitate innovation in service offerings. Additionally, it emphasizes the
crucial role of advanced technologies such as AI and data analytics in
16

personalizing retail experiences, the need for hyper-localization and hyperconvenience to enhance customer engagement, and the importance of forming
partnerships with grocery and technology companies to explore new revenue
streams and sustain competitive advantage in a rapidly evolving market.
The fuel retail industry faces major challenges in delivering high-quality products
and maintaining consistent standards, especially regarding product quality and
compliance with regulations. Creating customer satisfaction should always be a
priority; this is because, through smartphone applications, consumers can even
pay for fuel on the pump in advance and gain plenty of free vouchers. There is
also considerable importance to the efficiency of inventory management with the
help of which using IoT devices for getting real time data can prevent stock-out
and associated downtime. Furthermore, compliance and legal processes may be
hard to understand and deal with, but the compliance management software can
help retailers explain the standards and documents. Technology has been evolving
at an incredibly fast rate, and this is good news in some ways, but bad in others;
New and improved POSs with connections to inventory and CRM improve the
speed of transactions and the ability to interact with the client. Moreover, the issue
of price sensitivity is critical to competitiveness of that price, and rate-responsive
technology can make necessary adjustments to profitability instantly. Increasing
battery infrastructure and offering eco-friendly services, like low-carbon fuels or
electric vehicle charging, can attract environmentally conscious consumers as
demand for sustainable options grows. Finally, the threat of cyber criminality calls
for proper measures to ensure customer data is safeguarded and vulnerability audit
performed to ensure consumers trust in the retail sector is attained.

17

2.2

Promotions

Promotion can be defined as activities to advertise something. Promotion is an
essential technique that helps marketers achieve their goals for sales and boost
profits for their businesses. The goal of promotion is to convince customers that
the price displayed is reasonable and the product is necessary (Twin, 2022). There
are numerous purposes for promotions. According to Hitsch et al. (2021),
promotion in retail is to increase sales, attract new customers, build brand
awareness, customer loyalty, clearing excess inventory, improving customer
loyalty and data collection. Increasing sales through promotion can be achieved
by offering deals, discounts, and incentives to entice customers to make
purchases. Same goes for customers loyalty. It can be nurture through rewards,
loyalty plans and customised incentives as pointed out by Sinha & Verma, (2020).
This was also mentioned by Sarno et al. (2022), that good promo encourages
people to learn more about the bank’s offerings, while boosts consumer interest.
It was also reported by Kango et al. (2021), promotional activities have a huge
impact on student’s decisions to attend a higher education institution by
influencing the education’s image. It proves that promotion can build brand
awareness in the context of enhancing university’s image. With effective
promotional strategies, customer visit satisfaction and revisiting can be increase
(Pradini et al., 2022). Thus, tackling the power of a well-planned promotion and
stay ahead with continued shopping experiences, repeat visits, and customer
loyalty. This makes it so that through increased sales, promotions enable the
achievement of marketing aims due to more people being aware of the brand
through customer loyalty and enhanced customer experience and increasing
engagement in various industries.

18

2.2.1 Types of Promotions

There are several categories of promotions in retail industry such as sales
promotions, digital promotions, and loyalty promotions and more. According to
(Mishra et al., 2024) coupons, flash sales, discounts and loyalty bonus are forms
of sales promotions. This is also supported by Daosue & Wanarat (2019), as they
mentioned price discounts, feature advertising, trade deals, coupons, rewards
programs, rebates, contest, sweepstakes, and special displays are some types of
sales promotions. Digital promotion is a marketing strategy that are using digital
technology and the internet to promote products, services, or brands. According
to Afrizans & Majid (2023), social media, internet, mobile application, and email
is some kind of forms to perform digital marketing promotions. Other than that,
price promotion is a marketing strategy where businesses temporally reduce prices
through discounts, bonus pack or exclusive offers that is aims to attract customers
and encourage buyers by offering added value or immediate savings (Allender &
Richards, 2012). In addition, free shipping promotion also can be considered as
one of the type of promotions. According to Shehu et al. (2020), free shipping
promotions can be used when there is minimum purchases amount, offered for all
orders or applied to specific items. One of the common promotions is Buy-1-Free1 promotions. This type of promotion is used by retailers to attract customers and
increase the sales by offering free product on the second purchase item or related
product (Gordon-Hecker et al., 2020). By combining these types of promotions,
retailers can increase their sales and increase customer retention. The following
subsections will discuss on types and benefits of promotions.

2.2.2 Benefits of promotions

In general, promotions are some types of marketing strategies for businesses to
increase their revenue. Promotions also can increase brand awareness among
people. This is also supported by Daisue & Wanarat (2019), on sales promotion
19

have a significant positive effect on brand awareness. According to Kumar (2022),
sales promotion is considered efficient because it engages with customer directly
at the point of purchasing the product. As promotion attract customers to the
stores, store sales also increase in as it stimulates impulse purchase on certain
products through every number of weekends. (Daosue & Wanarat, 2019). Other
than that, promotions can improve the brand reputation. Promotion can positively
impact a university's reputation when viewed from a different perspective.
According to (Kango et al., 2021), promotions can affect the image of the
university in students where they are interested to register at the university after
went to education fair or direct visit to the college. Furthermore, promotion is one
of the methods used by retailers to retain customers to their store. By offering
incentives, loyalty, or deals it encourages repeat purchases and foster loyalty
among customers. Thus, promotions not only drive revenue and increase brand
awareness but also enhance brand reputation, attract new customers, and foster
loyalty, making them essential for achieving long-term business success.
Fuel retail promotions are essential for enhancing customer loyalty and driving
sales growth. Successful fuel rewards programs enhance customer loyalty by
offering clear benefits such as discounts, cashback, and points, which are aligned
with customer preferences and easily accessible through user-friendly apps or
cards. Additionally, personalization and engagement strategies, like tailored offers
and regular communication, along with flexible redemption options, ensure
customers feel valued and incentivized to participate (Dziadkowiec, 2024). This
is also supported by Rubies et al. (2022), fuel retail promotions that are tailored
to what customers want can greatly boost engagement and loyalty, leading to more
repeat visits and higher sales. By expanding their offerings and using new
strategies—like adding convenience services and focusing on sustainability—fuel
retailers can draw in more customers and enhance their brand image. Including
POS systems, Customer Relationship Management (CRM), and types of
promotions highlights how modern tools allow businesses to apply, track, and
customize promotions for targeted engagement and loyalty, maximizing their
impact on customer satisfaction and revenue (Debra, 2023).
20

2.3

Application Platform

An application platform is a comprehensive environment that supports the
development, deployment, and management of software applications. Application
platforms encompass a wide range of technologies and infrastructure that support
the diverse software components needed to run applications, playing a crucial role
for businesses and organizations in managing operations across various devices
and environments (Chappell, 2011). Application platform is important for
businesses due to their direct impact on business value, application functionality
and efficiency and ability to cater diverse types of requirements (Yasar, 2024).
The rising of many platforms for applications makes it easier for businesses to
implement their software as a service to potential clients. This literature review
section explains on the benefits and functionality of a web-based system in the context
of override promotions, gaining insights from relevant studies and industry practices.
The applications platforms discussed is Web-Based System.

2.3.1 Web-Based System

The web-based application platforms functions as a central hub for fuel retailers
to simplify the management of override promotions and improve overall
management efficiency. This literature review investigates the application
platform's capabilities in dynamic override promotions management by
leveraging the knowledge from various sources. Implementing modern web
technologies, the platform offers an easy-to-use interface that can be access via
web browser (Web Application Development, 2024). A programme that can be
accessed via HTTP and used with web browsers is known as a web-based system.
Web-based information systems, accessed through the web rather than locally
installed, facilitate rapid and accurate distribution of centralised updated information
across diverse locations and devices, using the internet's accessibility and flexibility

21

to enhance information exchange and distribution throughout businesses and
communities (Nusa & Faisal, 2020).

There are many key aspects on using web-based system as platform for the
businesses. Web-based system development has several advantages for its users,
including easier upgrades, continuous accessibility, and reducing reliance on any
system or device hardware or software-related. As pointed out by Sritart et al. (2023),
the system includes user roles like administrators, users, and guests with specific

permissions for data management and access, enables collection, storage, and
retrieval of organizational data, offers web-based access via personal computers
or smartphones for remote management, automates administrative tasks to
enhance efficiency and reduce staff workload, and includes security measures to
uphold data integrity and confidentiality.

Moreover, web-based system is good for small medium company as it helps them
to grow their customers base and boost sales so they can compete with larger
organizations. According to Effendi et al. (2020), the design of the website-based
sales information system aims to support Small and Medium Enterprises (SMEs)
in their efforts to market and promote their goods, by offering affordable means
for market expansion and ensuring feature simplicity for an easy-to-use user
experience for both customers and visitors. Other than that, web-based
applications are easy to update and maintain. This is also supported by Angelica
(2024), unlike mobile applications that require user-initiated updates, web-based
applications will automatically push out upgrades to users’ browsers without
requiring individuals’ installation, making the system updates seamless. The
following section will explain the static and dynamic web-based application.

22

2.3.1.1 Static Web-Based Application

Static web application or static website displays fixed content from the server
without any interaction with database or real-time data updates. Every page in the
static web application is pre-coded and hard coded in HTML, CSS and JavaScript.
This means that the content is determined at the time of creation and does not
change dynamically based in user input. Thus, every user will receive the same
content. To change the content of the website, the changes must be made manually
to the code and can only be made per page and file by file. For example, if changes
are made on home page, it will only reflect in the home page on the website.
According to Comocrat Software Solution (2023) and LTS Group (2023), there
are several advantages of the static web-based application. Firstly, they have faster
page loading speeds because their content is pre-built and delivered directly from
the server, minimizing delays and issues like broken images, which improves the
user experience. Secondly, static sites are quicker to create and publish since they
do not require complex coding or database connections, and tools like WYSIWYG
editors make the process straightforward and efficient. Finally, static websites tend
to have enhanced security as they do not interact with databases or rely on plugins,
reducing common vulnerabilities and making them generally safer from attacks.
On the other hand, the studies also highlighted several advantages and
disadvantages of the static web-based application. Firstly, they have limited
scalability, as they are not ideal for large or content-heavy projects. Adding many
pages can become a slow and repetitive process. Secondly, managing a static site
with frequent updates is less efficient, as each page must be updated individually,
making maintenance challenging for sites that require regular content changes.
Lastly, static websites offer limited interactivity, as they are not designed for realtime user interactions or personalized content based on user actions, restricting
their ability to engage users dynamically.

2.3.1.2 Dynamic Web-Based Application
23

Dynamic web-based application is a website that generates and displays content
in real-time, usually in response to user interactions or updates in the data.
Dynamic applications retrieve the data from the backend system or a database to
display relevant, updated information and making it highly responsive. Dynamic
websites allow for personalized content based on user behaviour, automatically
updating and reflecting changes across multiple pages, making it suitable for
handling large amounts of data (Comocrat Software Solution, 2023). Examples of
dynamic websites are YouTube, Twitter and Amazon.
According to Comocrat Software Solution (2023) and LTS Group (2023), there
are several advantages of the dynamic web-based application. Dynamic webbased applications offer several advantages for businesses. They allow for easy
updates, as changes made on one page can be automatically reflected across the
site, ensuring consistency without the need for redesigned the web. This is
especially beneficial for websites that require frequent content updates.
Additionally, dynamic websites improve the user experience by providing
personalized content specifically to individual users, such as location-based
information or recommendations based on past activity, leading to a more
engaging and relevant experience. Finally, dynamic websites are highly scalable,
allowing businesses to expand and adapt to current world as they grow, adding
more content, features, and functionalities without the need for a complete
overhaul.
On the other hand, the studies also highlighted several advantages and
disadvantages of the dynamic web-based application. Firstly, creating a dynamic
website is more complex and time-consuming than setting up a static site.
Organizing databases and connecting them to various pages requires additional
resources, which increases both development time and costs. Secondly,
performance can be an issue, as dynamic websites process content in real time and
pull data from databases, often resulting in slower load times compared to static
sites. This extra processing time can negatively impact user experience and SEO
rankings, especially if the site is not optimized for performance. Finally, security
24

concerns arise due to the complexity and numerous interactions within dynamic
websites. Vulnerabilities such as SQL injection and cross-site scripting can expose
the site to cyber-attacks, necessitating more robust security measures to protect
against potential threats.
In summary, web-based applications play a crucial role in enhancing the dynamic
promotions type override price in fuel retail management system. It includes both
static and dynamic elements that would allow HQ to benefit from the speed and
security of static pages for its non-interactive content, while still providing realtime updates and personalization through the dynamic components. These
combinations ensure efficiency, easy management and better user experience for
fuel retailers.

2.4

Related Systems

Numerous websites that already used a web-based system for promotion
management were discovered throughout the research process to comprehend in
detail regarding the delivery and the process of the system’s creation. This section
explores three related systems: Passport X by Gilbarco Veeder-Root, X-Series by
Lightspeed, and PDI Technologies. These three retail platforms have gained
position in the fuel retail industry, offering unique solution and functionality to
enhance fuel retailing processes.

2.4.1 Passport X

Passport X is a comprehensive Point of Sale (POS) system developed by Gilbarco
Veeder-Root, a prominent supplier of fuel dispensers, POS systems, and other
equipment for the retail petroleum industry. It offers a cloud-based Back Office
Solution (BOS) that is enabled by a state-of-the-art cloud-based Head Office
System (HOS) architecture, along with a POS system that is entirely customisable.
25

With Passport X, managers and employees alike may take use of the most cuttingedge retail solutions on the market to optimise sales, profitability, and overall
customer satisfaction.

Figure 2.2 Passport X
(Source: https://www.gilbarco.com/sea/)

Furthermore, Gilbarco Veeder-Root (n.d.) states that Passport X is specifically
designed for convenience store and fuel retailers to streamline the operation and
enhance customer service within their retail environments. Passport X allow fuel
retailers to effectively manage their promotional strategies, ensuring seamless
execution of discounts, bundle offers, and loyalty rewards. It facilitates accurate
promotion tracking and performance analysis, enabling retailers to optimize
promotional campaigns and enhance customer engagement while maintaining
legal compliance.
Key features of Passport X that is related to promotions in fuel retail:
i.

Flexible Promotions Management
Passport X allows retailers to create, manage, and customize a range of
promotions, such as discounts, loyalty rewards, and time-sensitive offers.
26

Retailers can target promotions for specific products, customer segments, or
times, maximizing the impact of each promotion.
ii.

Loyalty Program Integration
The system integrates with various loyalty programs, enabling customers to
earn and redeem points directly at the point of sale. This feature encourages
repeat purchases, as customers can easily accumulate and use rewards on fuel
and in-store products, enhancing customer retention.

iii.

Cross-Promotion Capability
Passport X supports cross-promotions between fuel purchases and
convenience store items. For example, it can offer discounts on food or
beverages with a fuel purchase, encouraging customers to buy more in-store.
This feature allows retailers to increase overall sales by driving multi-category
purchases.

iv.

Real-Time Promotional Updates
Retailers can make real-time updates to promotions across multiple locations.
This centralized control ensures that all sites are up to date with the latest
offers and enables rapid adjustments in response to market demand or
competitive promotions.

v.

Digital and Mobile Integration
Passport X is compatible with mobile wallets, apps, and digital coupons,
making it easier for retailers to reach tech-savvy customers. Digital coupons
and mobile-exclusive offers can be applied directly at the POS, increasing
accessibility to promotions and enhancing customer engagement.

vi.

Customer Data Collection and CRM Integration
The system gathers data on customer preferences and purchasing patterns,
which can be analysed for targeted promotions. When integrated with a CRM
system, this data enables personalized offers, increasing the relevance and
effectiveness of promotions.
27

2.4.2 X-Series

Lightspeed's X-Series is a modern point-of-sale (POS) system with modern
features and smooth integration capabilities that is intended to enable retail
enterprises. It is designed to benefit both single stores and multi-store chains, the
X-Series have advanced inventory management tools, in-depth reporting and
analytics facilities, CRM system and lot of promotion management
functionalities. It allows retailers to improve operational efficiency, drive
customer engagement and loyalty through highly targeted marketing campaigns
and optimize sales strategies across all of their channels.

Figure 2.3 X-Series
(Source: https://x-series-support.lightspeedhq.com/hc/enus/articles/25533688567323-Welcome-to-Retail-POS-X-Series)

With Lightspeed POS, retailers can maximize efficiency and team happiness as it
can manage inventory, suppliers, teams, and stores from one retail platform.
28

Furthermore, X-series offers integration with popular accounting tools and
eCommerce platforms and offers advanced inventory management.
Key features in X-series by Lightspeed related to promotions in fuel retail:
i.

Customizable Discounting and Promotions
The X-Series enables retailers to set up custom discounts and promotions,
such as percentage or dollar-based discounts, buy-one-get-one offers, and
seasonal sales. This flexibility allows retailers to easily adjust promotions
based on current sales goals or customer demand.

ii.

Loyalty Program Integration
Through Lightspeed Loyalty, the X-Series integrates loyalty programs
directly into the POS system. This feature allows customers to earn points for
purchases and redeem rewards, enhancing customer retention. Retailers can
create tailored loyalty rewards, such as exclusive discounts for repeat
customers or VIP members, making promotions more engaging.

iii.

Automated Promotions and Upselling
X-Series POS allows for automated promotions based on customer purchase
behaviour. Retailers can set rules to automatically apply discounts when
specific products are purchased or for certain customer groups. This
automation not only simplifies the checkout process but also encourages
customers to make additional purchases by suggesting complementary items
or upselling options.

iv.

Multi-Channel Promotion Management
The X-Series supports omnichannel promotions, which means promotions
created in the system can be applied across in-store and online platforms. This
feature is essential for retailers with both physical and e-commerce presence,
as it ensures that customers get a seamless promotional experience, regardless
of where they shop.

v.

Customer Segmentation and Targeted Promotions
29

With built-in customer data analytics, X-Series allows retailers to create
targeted promotions based on customer segments. For example, highspending customers or frequent shoppers can be offered exclusive discounts
or early access to sales, maximizing promotional effectiveness by catering to
specific shopper profiles.
vi.

Digital and Mobile Engagement
X-Series integrates with digital wallets and mobile apps, making it easy for
customers to redeem promotions using their smartphones. Retailers can also
send promotional notifications through mobile apps or via SMS/email
marketing, encouraging repeat visits and keeping customers informed about
the latest offers.

2.4.3 PDI Technologies

Founded in 1983 by Greg Gilkerson, Professional Datasolutions, Inc. was serving
over 10,1000 convenience retail sites within 15 years. PDI Petroleum Distribution
was released in 1999 as their first PDI Enterprise solution. PDI Technologies is a
comprehensive suite of software solutions designed to optimize operations,
manage inventory, enhance pricing strategies, and ensure regulatory compliance
for convenience store and petroleum wholesalers. As mentioned by PDI
Technologies (2022), PDI Technologies has been developing new and more
efficient methods for maximising retail promotions and loyalty, which raises sales
and brand awareness.

30

Figure 2.4 PDI Point of Sales (POS)
(Source: https://pditechnologies.com/increase-productivity/store-systems/pointof-sale/)

Features like convenience, gasoline, and foodservice businesses can all be
supported by PDI Point of Sale (POS) shown in Figure 2.4 on a single, cuttingedge technological platform. The solution's user-friendly interface increases client
throughput while supporting a wide range of complex transaction types and
reducing personnel training time. One of the key features of PDI POS is its
differential pricing, invoicing, payment terms, discounts, and point redemption
for strategic customer engagement. Based on PDI Technologies (2023), states that
PDI POS provides an unmatched promotion management experience, including
multibuys, connected promos, and fuel incentives plus adapting the ideal offer
dynamically for every single one of your clients.
Key features in PDI Technologies related to promotions in fuel retail:
i.

Loyalty and Rewards Programs
PDI’s loyalty management platform enables fuel retailers to create and
manage customized loyalty programs, allowing customers to earn points or
31

rewards for their purchases. This feature helps drive repeat business by
providing incentives for continued engagement, such as earning discounts on
fuel or in-store items.
ii.

Targeted Promotions
PDI uses customer data to help fuel stations create special offers for specific
groups of customers. For example, if a customer frequently buys fuel, they
might receive special discounts. This way, promotions are more likely to catch
customers' interest.

iii.

Cross-Channel Promotions
PDI allows fuel stations to offer promotions in different places, both in-store
and online. This means that customers can see the same deals whether they
visit the station or check the station’s website or app.

iv.

Digital Coupons
PDI helps fuel stations create digital coupons that customers can use on their
smartphones. Customers can easily redeem these coupons at the gas pump or
in the store, making it simple to save money.

v.

Personalized Offers
By using customer information, PDI helps fuel stations send special offers
tailored to each customer. For example, if a customer usually buys snacks,
they might receive a discount on their favourite snack. This makes customers
feel valued and encourages them to shop more.

2.4.4 Comparison of Related System

Table 2.1 shows the differences between the Passport X, X-Series and PDI
Technologies. The selected applications were graded against its goals for the
project and a comparison table is created which includes things like the promotion
management feature, back-office integration, inventory management and
32

reporting and analytics. This allows one to have a much more concrete
understanding of the evolving nature of the project in question. This process helps
you to determine what is missing what are the weaknesses, or what can be added
in the current system and those suggestions emerge as project idea for further
projects. It plays a crucial and strategic function in the research process by
enabling us to assess projects depending on how well they apply to the work that
is being developed from present.

Table 2.1 Comparison of Related System

Feature / System

Passport X

X-Series

PDI Technologies

Yes

Yes

Yes

Availability of
Promotion
Management
Promotion

Offers

basic Advanced

Comprehensive

Management

promotion

tools promotion

promotion

like discounts and management with management
loyalty programs.

customizable
discounts,
programs,

including

fuel

loyalty pricing
and optimization,

targeted marketing loyalty
campaigns.

programs,

and

digital

coupons.
Integration

Integrates
various

with Integrates with a Offers integration
Gilbarco wide range of third- with

systems for fuel party
management

apps systems

and including

loyalty programs.

for

seamless

accounting,

e- management

of

commerce,

and promotions

and

marketing tools.

33

back-office

inventory.

Table 2.1 (continued)

Scalability

Suitable for

Suitable for

Suitable for

single-location

single-location

single-location

and small to

and small to

and small to

medium-sized

medium-sized

medium-sized

chains.

chains.

chains.

Advanced

Basic reporting on

Extensive

Provides

Reporting

sales and fuel

reporting and

advanced

transactions

analytics for

analytics for fuel

detailed insights

pricing strategies,

into sales

inventory

performance,

turnover, and

customer

customer

behaviour, and

engagement

promotion

metrics.

effectiveness.
Inventory

Basic

inventory Advanced

Management

management

inventory

Includes

robust

inventory

features tailored for management with management
fuel

and real-time tracking, capabilities

convenience retail multi-location
environments.

support,

with

real-time tracking,
and automated

automated

replenishment, and

reordering.

integration

Integrates

back-office

with

seamlessly with e- systems.
commerce
platforms.

Considering the functions of these systems, Passport X, X-Series and PDI
Technologies are distinctive. The idea of Passport X is suitable for promotional
uses at the level of simple stores since it provides basic tools such as, for instance,
loyalty programmes and discounts. X-Series, on the other hand, sets apart because
34

of such exclusive features as flexible discounts, complex loyalty programs, and
targeted marketing that allow the business to introduce more particular and
efficient promotional activities. As for a detailed functionality list, PDI
Technologies boasts such advanced features as fuel pricing optimisation, highperformance rewards, and digital coupons. This way, it is possible to develop an
all-inclusive approach to the dynamic promotion – override price management
and enhance the customers’ interaction with the easily organizing the shops’
activities.

In relation to integration capabilities, Passport X stands out as it integrates with
Gilbarco systems, leading to effective fuel management within retail operations
and the efficient running of loyalty programs. X-Series stands out through a welldeveloped integration environment which covers a wide range of third-party
applications to enrich the functionality of accounting, e-commerce, and marketing
tools as well as corresponds to the versatile business needs. PDI’s forte lies in
working with back-end solutions, so that all aspects of managing promotions and
inventories across retail settings and channels are more effective and efficient. The
specific factors of integration within each system address various retail
management aspects, thus providing optimum solutions depending on the
requirement.

As for their ability to scale, Passport X, X-Series and PDI Technologies are best
for single outlet and small to medium sized retail franchises. These systems are
designed to effectively implement operations and promotions in these
environments, as offering powerful solutions for the small business companies of
retailing. Nevertheless, for companies of great size, or for those requiring, for
example, multi-site facilities, further assessment of expandability and extra
options might be needed to conclude the company’s compatibility.

35

Passport X by Gilbarco provides basic reporting capabilities for sales and fuel
transactions, complemented by a flexible self-service platform that enables
businesses to track site data and generate insightful dashboards (Gilbarco VeederRoot, n.d.). In contrast, X-Series by Lightspeed offers extensive reporting and
analytics, integrating with multiple third-party tools like DOR, Brightpearl by
Sage, Capitan, DAVO Sales Tax, and Fobi Insights, providing detailed insights
into sales performance, customer behaviour, and promotion effectiveness tailored
for retail environments. PDI Technologies specializes in advanced analytics
focused on fuel pricing strategies, inventory turnover, and customer engagement
metrics, supporting real-time, customizable reporting to facilitate strategic
business decisions in fuel retailing.

Passport X by Gilbarco enables simple inventory tracking features specifically on
fuel and convenience retail with a simple yet comprehensive inventory tracking
system. X-Series by Lightspeed offers options such as real time data, multiple
location, auto replenishment and can interface directly with internet-based sales
channels to streamline the processes. PDI Technologies precise inventory control
and monitoring, tracking of goods in real-time, automatic stock procurement, and
combined framework that blends with back-end supply chain systems makes this
solution highly valuable in fuel retailing.

2.5

Methodology

An appropriate methodology for the dynamic promotion overrides price
management must be chosen for helping in the system development. Waterfall,
Spiral and Agile Scrum methodologies also show the difference in the extent of
the success rate, level of detail, and flexibility in response to the needs and
changes within promotion planning and its implementation in fuel retail
businesses. A comparison of the characteristics of these methodologies is used to
determine which course is most suitable for formulating and executing
36

promotional approaches within retail spaces. This chapter will further describe the
methodology which includes approach methods and phases that has been
implemented in this project which are, waterfall, spiral and agile scrum.

2.5.1 Waterfall Model

The waterfall model, also referred to as the linear sequential life cycle model, is
the initial and most ancient one that has been used in software development
lifecycle (SDLC) for constructing software products with its simplicity and
sequence in which each stage is completed before moving on to the next without
overlapping. According to Herawati et al. (2021), waterfall model is a sequential
approach to software development that consists of stages including requirements
definition, system and software design, implementation and unit testing,
integration and system testing, and maintenance. It has a clear flow from one
phase to the next phase while ensuring each phase is completed before moving on
to the next phase.

Figure 2.5 Waterfall Model
(Source: Casteren, 2017)
37

Figure 2.5 depicts the seven phases of the waterfall model, which include system
requirements, software requirements, analysis, programme design, coding,
testing, and operations. To acquire a true picture of the existing business process,
requirements stages involve obtaining information and requirements from
stakeholders. According to Diansyah et al. (2023), for projects with well-defined,
consistent criteria, the Waterfall technique provides a clear strategy and structure.
Wiguna & Mahdiana (2023) also mentions that waterfall model has a long history
of reliability, encouragement of through documentation from planning to
maintenance, simplicity in comparison with other SDLC models, and stable,
easily understood concepts that allow for in-depth discussion and analysis of
every development stage, the Waterfall method stands out as a prominent subject
in research on the Software Development Life Cycle (SDLC). However,
according to Baba & Nonyelum (2017), the Waterfall model faces challenges in
the modern context, including its inability to adapt to rapid technological changes,
the growing need for Agile methodologies that allow for quick market adaptations,
and its rigid structure, which can hinder effective collaboration between teams.

2.5.2 Spiral Model

Spiral Model is one of the methods used to perform software engineering
development and other fields. In contrast to the waterfall technique, the Spiral
method is a very flexible paradigm that focuses on risk management and
prototyping (Sari et al., 2022). According to Diansyah et al. (2023), the project
progresses through four iterative phases in spiral until completion, allowing for
multiple iterations, with adaptive SDLC addressing the proof using both spiral
and iterative methodologies.

38

Figure 2.6 Spiral Model
(Source: Gurendo, 2015)

Based on Figure 2.6, spiral model consists of four phases which is determine
objectives, evaluate alternatives, develop, and plan next phase. The process starts
from accumulating product objectives/requirements (Business Requirements
Specification, Software Requirements Specification), looking for the designs, and
continuously communicating with the customer to update requirements.
Subsequent steps are – potential risks are assessed and then prioritized, and a plan
is made on how to overcome them and reach a prototype. Specifically, the
development phase includes implementing and evolving the product through the
Proof of Concept (POF) to get first feedback from users and continued through
the improving of more sophisticated copies. The last state of a project’s lifecycle
is concerned with the assessment of the project’s status and the formulation of the
next cycle. This is indeed a meta-model which is a combination of Waterfall and
Prototype model but not strictly Waterfall Increment. According to (Gurendo,
2015), although spiral model is flexible, it is a risk-driven model which means the
success of a project is largely dependent on the risk analysis phase. It is suitable
for large project and expensive to implement. This is also supported by Doshi et
al. (2021), process of following spiral model for designing a web application is
39

flexible, agile, easily maintained and more suitable due to segregation of modules
provided to the client early on, allowing for easy implementation of changing
client requirements during development.

2.5.3 Agile Scrum Methodology

The Scrum framework enables the implementation of Agile development
methodology through an iterative and incremental process, unlike the linear
approach of the waterfall model. The project that uses scrum usually divides
project into several phases, each of which resulting in a product that are ready to
be used by customers. The agile scrum method requires a formation of diverse
teams, excellent communication between team members, regular client feedback
etc. Scrum is usually used by organization to manage a complex software and
product development, using iterative and incremental practices. Wiguna &
Mahdiana (2023), also mention that scrum methodology is not suitable for a
small-scale project. The key events in Scrum include a Sprint, which is a timeboxed iteration of work lasting two to four weeks; Sprint Planning, a meeting to
decide the work for the upcoming Sprint; the Daily Scrum, a short daily meeting
for the development team to synchronize and plan their day; the Sprint Review,
where the team inspects the increment and adapts the backlog based on feedback;
and the Sprint Retrospective, where the team reflects on the Sprint and identifies
improvements (Schwaber & Sutherland, 2017).

40

Figure 2.7 Agile Scrum Model
(Source: Gurendo, 2020)

Figure 2.7 shows the process of scrum methodology starting with timebox
planning, requirement elicitation, detailed system design, coding, development
and testing, demonstration and lastly is a retrospective meeting. Timebox planning
divides work into specific duration known as sprints, where focus is on amount of
work done in that specific time and this makes it easy for managing projects,
improving visibility, and flexibility. Requirements elicitation is a cyclical process
of collecting and evaluating user and stakeholder’s necessity to respond to the
deficiencies and adapt to them. The team continues to improve the system of
systems design based on specifications along with the progressive technical needs
while incorporating the into interfaces and the architecture. Implementation and
development go hand in hand as does testing to take care of problems as they are
recognizing and to determine that the software is fit. Protests are useful in
responding to stakeholders’ needs to make changes where necessary. Thus, after
solutions are approve, a presentation meeting is conducted to discuss the
organisation’s integration with the input from developers to allow for an effective
and efficient operation of the system. Furthermore, daily scrum meetings in one
of the important features in scrum methodology. Daily scrum meeting’s goal is to
make team members aware of each other’s process and status on the current
project and ensuring that all team members are on the same page. During the daily
41

scrum, each members need to update their progress, what has been done, current
task and problems they are facing during the sprint or work.

2.5.4 Comparison of methodologies

Although there are numerous approaches to the SDLC technique, there is not a
single ideal approach because every project has different requirements and
environments. A significant difference has been identified between the waterfall
methodology, spiral model and agile scrum methodology based on Table 2.2.
Table 2.2 Comparison of Methodologies

Aspects/
Methodology
Project

Project Phases

Requirements

Communication

Flexibility

Deliverables

Waterfall

Spiral

Agile Scrum

Small

Big

Big

Sequential phases

Iterative and
Incremental.

Iterative
development with
sprints.

Iteratively refined

Gathered and

in each spiral

refined through

iteration.

each sprint.

Iterative, focuses

Daily scrum

Minimal

on risk analysis

meetings, and

collaboration.

and stakeholder

frequently team

engagement.

collaborations.

Beginning of the
project.

Highly flexible to

Difficult to

Adapt to changes.

changes.

Final deliverables

Incremental

Incremental

at the end of the

deliverables in

deliverables at the

project.

each iteration.

end of each sprint.

changes.

42

Table 2.2 (continued)

Risk Management

Risk assessment

Iterative approach

Continuous risk

only at the

with continuous

assessment and

beginning.

risk assessment in

mitigation.

each spiral.

In terms of project scope, Agile Scrum and Spiral is suitable for big project.
Waterfall is suitable for small project. In terms of requirement, project phases and
flexibility Agile Scrum is highly flexible to requirement changes since it follows
an iterative development with sprint and has continuous feedback in each sprint.
The spiral model gathers requirement in each spiral iterations allowing for
changes and ongoing feedback thus making it adaptable to changes in term of
flexibility. Spiral models use iterative and incremental phase. The waterfall model
is best for small project with clear, stable requirements due to its flexibility that is
difficult to changes since large project are prone to changes in requirements. It
required a structure and step-by-step approach.

Communication in waterfall relies primarily on documentation of the project and
limited. While agile scrum highly emphasized on communication with the daily
scrum meetings and frequent collaboration with each team member. The Spiral
model, being iterative, focuses on continuous risk analysis and active engagement
with stakeholders throughout its cycles.

As for Waterfall model, final deliverables are complete at the end of each phase
like requirements, design, and testing, concluding the project sequentially. Spiral
model produces incremental deliverables in iterative cycle, refining the project
continuously. Agile Scrum produces deliverables gradually, delivering it at the end
of each sprint usually lasting 1 to 4 weeks. In term of risk management, waterfall
model focuses it at the beginning of the project while spiral model takes an
iterative approach with ongoing risk assessment in each cycle and for agile scrum,
it emphasizes risk assessment and risk mitigation throughout the project.
43

2.6

Discussion

This literature review offers insights into the importance of promotion
management in fuel retailing industries. Promotions is vital in a retail industry
regardless in fuel industry because it significantly boost sales by attracting new
customers and encouraging repeat purchases through several types of promotions.
It explores existing studies, theories, and concepts related to promotion
management for retailers specifically in petroleum industries. It highlights how
web-based application platforms in this part of the processes have improved
efficiency and minimized risks to the environment.

Furthermore, the literature review provides a comprehensive comparison of
existing fuel retail management system, including Passport X, X-Series and PDI
Technologies, to gain a thorough understanding of the technological landscape
and identify potential areas for improvement and innovation in the future project.
It highlights how web application platforms in this part of the processes have
improved efficiency and minimized risks to the environment. These technologies
provide seamless integration with already existing systems, real-time data
synchronization, secure data storage, and extensive reporting.

However, one might wonder how these systems able to manage promotion to
boost stores sales and revenues. Particularly their ability to use data analytics and
IoT to understand customer buying patterns. Integrated analytics with IoT devices
and advances analytic with third party systems can enable retailers to have a realtime monitoring of customer preferences, predictive modelling of buying patterns,
and personalized promotion strategies based on data mining insights. Future
research can focus on implementing IoT solutions, advanced data mining
techniques and AI-driven approaches to enhance personalized promotions, boost
customer loyalty and increase sales as well as revenues.
44

Moreover, the literature review also delves into the comparison of different
methodologies for system development, such as waterfall, spiral approaches, and
agile scrum in the context of promotion management. The Waterfall methodology
is best suited for projects with stable needs because of its sequential and linear
approach. The Spiral approach is appropriate for projects with changing
requirements because it blends continual risk assessment with iterative
development. Agile Scrum places a strong emphasis on adaptability and
teamwork, enabling iterative development and ongoing stakeholder participation.

The comparison of several approaches, such as Waterfall, Spiral Model and Agile
Scrum for creating dynamic promotion – override price management in fuel retail
management system is one intriguing issue. Every methodology has advantages
and disadvantages, and the review aids in determining which strategy is best given
the demands of the project. The effectiveness of promotion management, as well
as the development process, can be impacted by selecting the appropriate
approach.

2.7

Summary

This literature review focuses on the significance of promotion management in
fuel retail and retail industries. It focuses attention on the advantages and features
of web-based platforms and emphasises their role in increasing productivity and
decreasing losses. The review also compares three different approaches such as
Waterfall, Spiral and Agile Scrum and examines other systems and solutions that
are available for retail industries to help choosing the best strategy for the fuel
retail management system. Furthermore, it includes a comparison of existing fuel
retail system, such as Passport X, X-Series, and PDI Technologies, to gain a
thorough understanding of the function and features implemented in fuel retail
management system.
45

CHAPTER 3

METHODOLOGY

This chapter offers a thorough analysis of the design process for the dynamic promotion
–override price in fuel sales management system. The methodological technique used to
guarantee efficient override promotion for both fuel and nonfuel sales will be described
in detail in the methodology chapter. This chapter seeks to clarify the procedures,
methods, and instruments used to achieve the goals outlined in section 1.4 by focusing on
the methodology. Additionally, this chapter will go into the precise process utilised to
collect needs from stakeholders, assess those requirements, and create a functional webbased system that would let headquarters and shops manage override campaigns.

3.1

Agile Scrum Methodology

The chosen methodology for this project has been the iterative and incremental
process. Agile Scrum methodology is suitable and best used for Dynamic
Promotion types of Override Price in Fuel Sales Management System as it
requires efficient teamwork collaboration and effective communication. Scrum
has five specific and separate phases: initiation, planning and estimation,
implementation, reviewing and retrospective, and releasing.

Scrum initiation will be the first step in the project development process to
accomplish the project goals. The goal of this phase is to create a mutual
understanding of the requirement made by the stakeholders regarding the product
backlog item. Secondly, the planning end estimation phase is where team
members decide the backlog item to be brought in the sprint and the sprint’s
46

duration. The backlog item or as it usually called as requirements can be separated
into smaller pieces to help in more efficient development process. The designation
of product will happen in this phase. Next is implementation where the
development of user story is held. After this phase, review and retrospective will
occur to evaluate and review the overall sprint cycle to enhance the effectiveness
of next sprint cycle. Lastly, after the implementation and testing of the product is
done, the product will be release to production. During this sprint cycle, daily
scrum meetings is held depending on the team lead decide how frequently the
meeting is going to be as pointed out in figure 2.7. In short, Agile Scrum
methodology is suitable for the project where communication and collaboration
play as an important role where requirements might change, and fuel retail
management system need continual improvement to meet stakeholder’s needs.

3.2

Scrum Phase

The phases in Agile Scrum are Initiation, Planning and Estimation,
Implementation, Review and Retrospective and Release. Table 3.1 shows the
activities and deliverables for each phase for dynamic promotion – override price
in fuel retail management system. It also covers the objectives of this project
shown in section 1.4.

Table 3.1 Scrum Phases

Phase

Activities

Deliverables

Interview and
meetings with
stakeholders to
Initiation

identify the
requirements

Requirements of
dynamic
promotion – price
override

Objectives
To gather
requirements from
stakeholders

Meeting with team

Analysed

To analyse the

lead to analyse the

requirement

requirements from

requirement

47

stakeholders

Table 3.1 (continued)

Create user stories
Create sequence
diagram
Design the
interfaces and
prototype based on
Planning and

the user stories

Estimation Period

Meeting with

Functional
Specification
Document (FSD)

To design the
interface of the
override promotion
management

teams and clients
regarding the
design interfaces
and prototypes
Meeting with team

Prioritized Backlog

on sprint planning

item

Develop the

Implementation

dynamic

Web-based systems

promotion – price

for dynamic

To develop the

override for fuel

promotion – price

override price

retail manage

override for fuel

promotions

system based on

sales management

module.

the designed

system

interfaces

48

Table 3.2 Scrum Phase for Each Sprint

Sprint

Phase

Activities

Deliverables

1. Interview and

Initiation

meetings with

1. Requirement

stakeholders to

s of dynamic

identify the

promotion –

requirements.

price

2. Meeting with

override

team lead to

2. Analysed
requirement.

analyse the
requirements.
1. Create

user

stories

and

Sprint 1

sequence

(Develo

diagram.

p in

2. Design
interfaces

and

prototype based
Planning
and
Estimation
Period

on

1. To gather
requirements
from
stakeholders.
2. To analyse the
requirements
from
stakeholders.

the

BOS
POS)

Objectives

the

and
user

stories.
3. Meeting

with

teams

and

clients
regarding

the

design
interfaces

and

prototypes.
4. Meeting

with

team on sprint
planning.

49

Functional
Specification
Document V 1.0
(FSD)

To design the
interface of the
override
promotion
management.

Table 3.2 (continued)

1. Front end of
Develop the

the override

dynamic promotion

price

– price override for

promotion

To develop the

Implementa

fuel retail

page.

override price

tion

management

2. Back end of

promotions

system in BOS

the price

module.

based on the

override

designed interfaces.

promotion
page.

1. Meeting with
stakeholders
for

Sprint 2
(Develo
p in
POS)

requirements
Initiation

clarification.
2. Meeting with
team lead to
analyse the
requirement

50

1. Requirement 1. To gather
s of dynamic

requirements

promotion –

from

price

stakeholders.

overrides.

2. To analyse the

2. Analysed

requirements

requirements

from

.

stakeholders.

Table 3.2 (continued)

1. Create

user

stories

and

sequence
diagram.
2. Design

the

interfaces

and

prototype based
Planning

on

the

And

stories.

Estimation

3. Meeting

Period

user
with

stakeholders
regarding

the

1. Functional
Specificatio

To design the

n Document

interface of the

V2.0 (FSD).

override

2. Prioritized

promotion

Backlog

management

item

design
interfaces

and

prototypes.
4. Meeting

with

team on sprint
planning.
1. Front end of
Develop the

the override

dynamic promotion

price

– price override for

promotion

To develop the

page.

override price

Implementa

fuel retail

tion

management

2. Back end of

system in BOS and

the

POS based on the

override

designed interfaces.

promotion
page

51

price

promotions
module.

Table 3.2 (continued)

1. Meeting with
stakeholders
for
To analyse the

requirements
Initiation

clarification.

Analysed

requirements

2. Meeting with

requirement.

from
stakeholders.

team lead to
analyse the
requirement.
Sprint 3

To design the

(Develo

Planning

p in

And

Meeting with team

Prioritized

BOS)

Estimation

on sprint planning.

Backlog item

Period

interface of the
override
promotion
management

Develop the
dynamic promotion
Implementa
tion

– price override for
fuel retail
management

To develop the
Fully develop

override price

system

promotions
module

system for
promotion report.

3.2.1 Initiation Phase
When the Agile Scrum methodology is initiated, project team members
concentrate on establishing and comprehending the requirements of dynamic
promotion – override price in fuel retail management system via interviews and
meetings with stakeholders. The main role here is to engage stakeholders in
gathering various requirements for dynamic promotion and override price
functionalities. After completing these tasks, what is received is a thorough list of
these requirements. This phase ensures the stakeholder’s understanding are
aligned

with

our

understanding,
52

thus

minimizing

misunderstanding.

Simultaneously, the project leaders get together to go through the requirements
gathered above ensuring that they are well understood and that any possible
obstacles or relationships have been identified. In another scenario where the
requirements needed cannot be developed, the team leader will decide other
solutions and revert to the clients regarding the provided solution. What comes
out of this second task is a fine-tuned set of analysed requirements. The primary
purpose of this stage is to ensure that each group member has a clear
understanding about the expectations of stakeholders’ concerning override
promotion as a critical foundation block in marketing strategies for forthcoming
steps in fuel retail promotion management process.

Despite the project progress, the requirements might change as the stakeholder’s
clarity increases and additional information are obtained. During this process, it
will need to go through the requirement analysing process again. This can be done
by revising the user stories, improving the backlog item and modifying the overall
project goals.

3.2.2 Planning and Estimation Period
In this phase, it has series of structured activities to prepare for the development
of the override promotion management system. The phase begins by writing user
stories that captures the stakeholders’ view of functional requirements. Good user
stories are important because they provide clear and concise descriptions of what
is expected, thus ensuring a common understanding between developers and
stakeholders on what needs to be done. Sufficiently constructed user stories are
necessary as they give unambiguous definitions of desirable qualities, making sure
that both development team and stakeholders have mutual understanding on what
is required to be accomplished. User stories assist in breaking down complex
requirements into manageable tasks hence facilitating better estimation period,
prioritization and implementation.
53

After generating user stories, sequence diagrams are developed to describe how
systems interact. These helps identify relationships among different components
to have coherent and efficient designs. To ensure that these interfaces meet users’
expectations and fulfil the identified requirements, the team creates the prototypes
based on these sequence diagrams and user stories.

These designs and prototypes are reviewed during regular meetings with the
teams, and clients. It is through these collaborative sessions that the designs are
validated, feedback is gathered, and necessary adjustments made before
development can begin. If extra requirement is gathered during the development
process, business analyst will create another user story or update the existing user
story. This depends on the team capacity to develop the features and urgency of
the requirements. After this stage is complete, sprint planning sessions are held in
which the most important user stories from the product backlog are brought into
the sprint cycle. During these sessions, user stories that align with sprint goals and
are of high priority are picked by the team to ensure that they develop very critical
features first.

The next step is creating a sprint backlog which includes user stories to be
accomplished within the current sprint. By doing so, it helps keep everyone
focused and productive on activities that bring out the most value for shareholders.
The key deliverable in this phase would be Functional Specification Design
(FSD), which encompasses detailed design and specifications of interfaces in a
system. To further guide subsequent development iterations, product backlog
items are prioritized as well as submitted for consideration by developers’ team.
The overriding objective at this stage is to carefully design an interface for
override promotion management system that meets stakeholder requirements and
ready for implementation.

54

3.2.3 Implementation

In the Implementation phase of Agile Scrum, the project team focuses on turning
detailed designs and specifications into a working product. The main thing they
do in this phase is develop a module that handles dynamic promotions - override
prices for the fuel retail management system. They make sure to stick closely to
the interfaces and prototypes as well as sequence diagram designed in the previous
phase. This involves coding, integrating different components, and making sure
the system meets all the requirements.
The result of this phase is a web-based system that allows for dynamic promotions
override price in fuel sales management. This means they can make real-time
changes and promotions, which makes the fuel retail operations more flexible and
responsive. The goal of this phase is to successfully develop the promotions
module so that it works smoothly within the overall system and provides the
desired capabilities to the end-users.
Throughout this phase, the team keeps following Scrum practices. They have daily
stand-up meetings to talk about progress, deal with any issues that come up, and
make sure everyone is on the same page. They also have regular sprint reviews
and retrospectives to evaluate the development process, get feedback, and make
improvements. By the end of this phase, the module they have developed is ready
to be integrated and tested, getting the project one step closer to delivering a strong
fuel retail management system.
The teams will keep on design, develop and test the system’s requirements in
repeated cycles. After each iteration the scrum team will gathers feedback and
write a comment on the overall sprint activities. The feedback from the
stakeholders also will be gathered. This feedback will give an insight to create the
next iteration of the product’s requirements. If the development of the user story
is completed, the testing will occur. In this project the testing phase will occur on
the last week of sprint cycles. If the testing part failed, and the sprint cycle is end,
the item will be brought to the next sprint, or we called it spillover item. If the is
55

failed during the testing the production or deployment of the requirement will be
on hold until the item is fixed. Entering the next sprint cycle, the team will go
through the same process which is, initiation, planning and estimation and
implementation. The failed item will have new requirements as the defect or bug
found during the testing is not covered in the user stories. The user stories will be
more refine. The sprint cycle will continue until the item is defect free and ready
to be released to the production. This is how the iteration of sprint occurs.
Table 3.3 shows the system specifications.
Table 3.3 System Specifications

3.3

Software

Specification

Framework

Laravel

Code editor

Visual Studio Code

Database

mySQL, postgress

Programming Language

JavaScript, HTML, PHP, CSS

Operating System

Windows

Platform

Web-based

Meeting tools

Microsoft Teams

Management tools

Jira

Summary
This chapter focuses on the chosen methodology for developing the project.
Choosing Agile Scrum methodology for developing the dynamic promotions
override price in a fuel retail management system ensures adaptability to future
requirements changes through its iterative development approach. By breaking
down tasks into manageable user stories and conducting frequent sprint cycles,
Agile Scrum promotes efficiency and transparency in project execution. This
methodology fosters collaboration among team members and stakeholders,
facilitating early stakeholder validation and ensuring that the system evolves
iteratively based on feedback. With a focus on continuous testing and integration,
Agile Scrum also enhances the reliability and quality of the developed features,

56

supported by proper hardware and software resources to maximize productivity
and meet project objectives effectively.

57

CHAPTER 4

RESULTS AND FINDINGS

This chapter will provide an explanation of the project's outcomes and conclusions, with
particular attention to each of the Scrum Methodology phases that were covered in
Chapter 3. This chapter offers a thorough justification of the results from every phase and
a comprehensive comprehension of the results attained during the project.

4.1

Results of Initiation Phase
Chapter 4 presents the findings of the initiation phase, which reveal a thorough
comprehension of the requirements for the override price promotion. The project
team successfully identified and assessed the needs through stakeholder
interviews and meetings, resulting in a clear document defining the system's
functionalities and objectives. This phase guarantees alignments with stakeholder
expectations, reducing misconceptions and increasing the possibility of a
successful solution.
The next step is to meet with the Product team to further examine the needs that
have been gathered. The purpose is to gain a thorough understanding of project
requirements and allow effective communication between the development team
and stakeholders. The result is an assessed collection of requirements that serve
as an important basis for following project stages, keeping the development
process informed and aligned with changing stakeholder demands. The project's
iterative approach recognises that when stakeholders gain clarity or contribute
more insights, the team must stay adaptive, reviewing and improving features
such as the product backlog and user stories to ensure alignment with changing
needs. The result is an analysed set of requirements, serving as a critical
foundation for subsequent project phases, ensuring the development process is
58

well-informed and aligned with evolving stakeholder needs. The iterative nature
of the project acknowledges that as stakeholders gain clarity or provide additional
insights, the team remains adaptable, revisiting and refining elements such as the
product backlog and user stories to maintain alignment with evolving
requirements.

4.1.1 Results of Interviews
The initial phase of stakeholder interviews provides critical information about the
requirements for the override price promotion. Stakeholders are identified
throughout this interview process, and a set of questions is ready. To design the
system based on stakeholder requirements, the team must obtain insights from the
Product Team and Development Team through active engagement, where the
meetings and interviews will be back-and-forth. These interviews are crucial
component of the project since they give the team a thorough grasp of the needs
and expectations of the stakeholders. The final requirements document, which
describes the precise features and objectives of the system in the FSD, turns into
a crucial delivery. Table 4.1 and 4.2 provides a summary of the key questions and
answers discussed during the interview sessions with the stakeholders. Table 4.1
is regarding the problem statement one, The lack of flexible approach to apply
promotions that enables businesses to tailor promotions to specific customer
groups or/and for marketing strategies. Table 4.2 are more detailed questions for
the problem statement two, The absence of functions to implement price override
promotions that are specific to certain outlets.

59

Table 4.1 Summary of the first interview

No
1

Question

Answer

Can you describe The current system’s promotions use a fixed pricing
the current system structure. All customers get the same discounts and
for

applying promotions, regardless of their buying habits. These

discounts

and promotions are usually linked to calendar events like

promotions within holidays and do not allow for changing prices or
the business?

tailoring promotions to specific customer groups or
marketing strategies

2

What limitations The main issue with our current promotion system is
or challenges have its lack of flexibility. We cannot quickly adjust
you encountered promotions to respond to market changes, which
with the current means we miss opportunities to offer discounts to
discount

specific customer groups or react swiftly to business

application

changes. This makes it challenging to stay

process?

competitive with other businesses that can easily
adjust prices. Additionally, because the system does
not allow for customizing promotions, it becomes
hard to keep customers engaged and loyal to our
pump stations.

3

What limitations or The main issue with our current promotion system is its
challenges
you

have lack of flexibility. We cannot quickly adjust promotions

encountered to respond to market changes, which means we miss

with the current opportunities to offer discounts to specific customer
discount

groups or react swiftly to business changes. This makes

application

it challenging to stay competitive with other businesses

process?

that can easily adjust prices. Additionally, because the
system does not allow for customizing promotions, it
becomes hard to keep customers engaged and loyal to
our pump stations.

60

Table 4.2 Summary of the second interview

No
1

Question

Answer

Can you give example of An example is when we want to offer special
scenarios in which the discounts to specific customer groups, like loyalty
current discount system members or first-time buyers. Currently, the
did

not

meet

the system applies the same promotion to everyone, so

objectives of customer we cannot give customized deals. Implementing an
groups

or

marketing override price promotion system would allow us to

initiatives?

adjust prices based on customer type or product
category, helping us better align promotions with
our business goals and engage customers more
effectively.

2

What impact do you The lack of flexibility in applying discounts, along
believe

the

lack

of with our reliance on the BOS and POS systems,

flexibility in discount seriously limits the success of our promotions.
application has on the Without the option to use price override
effectiveness

of

your promotions, we miss chances to boost sales and

promotional efforts?

build customer relationships, which limits our
business's growth potential.

3

What specific features or A key feature missing from our current RONPOS
capabilities do you feel system, which includes both BOS and POS, is the
are lacking in the current ability to create price override promotions. This
promotion

system to feature would enable us to quickly adjust prices

better tailor promotions and customize promotions based on real-time
to

specific

groups?

customer factors,

customer

conditions.

61

behaviour,

and

market

4.1.2 Results of Analysis
Based on the interview, several key insights and findings were gathered about
the current process and the proposed override price promotion. The analysis
results are as follows:
a) Current System Limitations
Based on the question 1, 2 and 3 in Table 4.1 as well as question 3 in Table
4.2, the current discount setup applies fixed promotions uniformly to all
customers, regardless of their buying habits. This lack of flexibility
prevents the business from targeting specific customer groups or adjusting
promotions based on inventory levels and customer groups. For example,
regular customer who usually buy a bulk of mineral water every month
will get the specific promotion amount. This becomes a hassle where staff
need to manually change the price in after adding the item to cart.
b) Challenges with flexibility
Based on the question 2 and 3 in Table 4.2, the lack of flexibility to quickly
adjust prices to react to market conditions or to clear out inventory. This
lack of adaptability makes it difficult to keep customers engaged,
especially to other fuel retailers that can more easily modify strategies. For
example, during the Hari Raya eve, HQ may want to override the price for
all large, carbonated drink at RM 2 when customers purchase them with
and ice
c) Lack of Customization
Based on the question 2 in Table 4.1, the current system cannot tailor
promotions for different customer group or marketing strategies.
Promotions are applied generally, leading to no ability to customize them
based on specific region and product categories. For example, fuel station
along the highway may want to have promotion override price of snacks
for customers who purchase fuel.

62

4.2

Results of Planning and Estimation Phase
In the Planning and Estimation Phase, the creation of FSD begin after the
requirements have been gathered and analyse. The FSD consists of user stories,
sequence diagram and prototype.
This project is divided into three sprints. Sprint 1 will focus on designing the
override price promotion in BOS covering both front-end and back-end section.
Several meetings occurred to check on the design and interfaces of the system.
Meeting with team was held to increase visibility on the item that are developed
in the sprint.
Sprint 2 will be dedicated to design and develop the promotion price override
page in POS as well as the receipt. There are several meetings held to check on
the design of the override page in POS and sprint point to develop the item during
sprint planning.
While in sprint three, the prioritizes item which is override price promotion in
BOS report section will be covered. Meetings was conducted to check on the
design and meeting is held to ensure the progress of the development are align
and to identify impediments that arise.
Before the completion of each sprint, many meetings were conducted to plan the
item that would be produced for the following sprint. The things were determined
during the product team meeting. In between sprints, multiple meetings with
stakeholders and the project team will be held to ensure that the development
items are in line with the stakeholder needs.

4.2.1 User Stories
User stories are informal, general information of a software feature written from
the perspective of the end user. Its purpose is to articulate how a software will
provide value to the customer. User stories are a few sentences in simple language
that outline the desired outcome. They do not go into detail. Requirements are
added later, once agreed upon by the team.

63

In the first sprint, the development is focused on override price promotion in BOS.
Table 4.3 shows the user stories for the features.
Table 4.3 User Stories for Override Price Promotion Setup in BOS

Features /

User Stories

Acceptance Criteria

Scope
1a

Override

As a HQ

Given that I am at Promotions

Price

I want to setup for

page,

Promotion

override price promotion

When I click on Create

Setup

in Cloud BOS

Promotion,

So that I can apply the

And I select Override Price type,

promotion for marketing

And I select Trigger button and

strategies

Action button,
And I filled in all the details,
And I click on Save,
Then the override price
promotion should be successfully
setup

1b

As a HQ,

Given that I am at Promotions

I want to edit the

page,

override price promotion

When I update override price

in Cloud BOS

promotion,

So that I can apply the

And I click on Save,

promotion for marketing

Then the override price

strategies

promotion should be successfully
updated

1c

As a HQ,

Given that I am at Promotions

I want to view the

page,

override price promotion

When I view the promotions,

in Cloud BOS

Then I should be able to access

So that I can review the

and view the override price

promotion for marketing

promotion with all relevant details

strategies

64

Table 4.3 (continued)

1d

As a HQ,

Given that I am at Promotions

I want to delete for

page,

override price promotion

When I click at the checkbox for

in Cloud BOS

specific promotion,

So that I can delete the

And I click on ‘Delete

promotion for marketing

Promotions’ button

strategies

And a prompt message popup
And I click on ‘Yes, delete it’
button'
Then the override price
promotion should be successfully
deleted from the promotions page
and click ‘Ok’ to complete the
activity

Based on the Table 4.3, Feature 1a addresses the need for HQ users to set up
override price promotions in Cloud BOS. When on the Promotions page, users
can create a new promotion by selecting the "Override Price" type, configuring
trigger and action buttons, and entering all necessary details. By clicking "Save,"
the promotion is successfully created and ready for implementation in marketing
strategies.
Feature 1b focuses on enabling HQ users to edit existing override price
promotions. From the Promotions page, users can update the details of an override
price promotion and save the changes. This ensures that the promotion reflects
any required updates for effective marketing.
Feature 1c emphasizes the need for HQ users to view override price promotions
for review purposes. On the Promotions page, users can access and view the
details of all override price promotions, allowing them to analyse and monitor
their configurations.
Finally, Feature 1d highlights the process of deleting an override price promotion
in Cloud BOS. HQ users can select a specific promotion via a checkbox on the
65

Promotions page, click the "Delete Promotions" button, confirm the action in a
popup prompt by selecting "Yes, delete it," and finalize the activity by clicking
"Ok." This ensures the promotion is successfully removed from the system.
In the second sprint, override promotion in POS promotion page and promotion
indication in receipt is developed.

Table 4.4 User Stories of Override Price Promotion in POS

Features / Scope
2a

User Stories

Acceptance Criteria

Override price

As a Cashier,

Given that I am on promotion

promotion in POS

I want to view list of

page in POS,

promotion page

override promotion

When I view the list of

in POS,

promotions,

So that I can review

Then the available override

the available override price promotion should be
price promotion in

displayed.

POS.
2b

Promotion

As a customer,

Given that I have completed a

indication in each

I want to see the

purchase,

line item of

override price

When receipt is printed

receipt.

promotion details for

Then each line item that are

each item on the

applicable to promotion should

receipt,

display the promotion name,

So that I understand

And the total tax amount should

the promotion

be visible on the receipt.

applied.

Based on the Table 4.4, feature 2a addresses the need for cashiers to view the list
of override price promotions in the POS system. When on the promotion page in
POS, cashiers can access a comprehensive list of all available override price
promotions. This feature ensures that cashiers can review and utilize the
promotions effectively during transactions.
Feature 2b focuses on providing customers with detailed visibility of override
price promotions on their receipts. After completing a purchase, the printed receipt
66

displays the promotion name for each applicable line item, offering customers
clarity about the promotions applied. This enhances transparency and ensures
customers have a clear understanding of the promotion they received.
In the third sprint, promotion report is developed. The promotion report page will
focus on the promotion type override price in Promotion Reports.
Table 4.5 User Stories of Promotion Report in BOS

Features /

User Stories

Acceptance Criteria

Scope
3a

Promotion

As a HQ/retailer,

Given that I have log into BOS

report for price

I want to view the

When I click the Promotion

override

Summary Promotion

under Items → Reports

promotion

Report by Product

Then I can see the promotion

So that I can view the

type price override under

promotion type price

Summary Promotion Report by

override in the

Product.

Summary Promotion
Report by Product.
3b

As a HQ/retailer,

Given that I have log into BOS

I want to view the

When I click the Promotion

Promotion Report

under Items → Reports

So that I can view the

Then I can see the promotion

promotion type price

type price override under

override in the

Promotion Report.

Promotion Report.

Based on the Table 4.5, Feature 3a addresses the need for HQ and retailer users to
view the Summary Promotion Report by Product in Cloud BOS. After logging
into BOS, users can navigate to the "Promotion" section under Items → Reports.
This feature allows users to access the Summary Promotion Report and view
details specific to the promotion type "price override" by product, aiding in the
analysis of promotion performance.
67

Feature 3b focuses on enabling HQ and retailer users to view the Promotion
Report in Cloud BOS. By logging into BOS and selecting "Promotion" under
Items → Reports, users can access the Promotion Report, which includes details
of the "price override" promotion type. This feature provides a comprehensive
view of the promotions applied, supporting strategic decision-making and
performance evaluation.

4.2.2 Sequence Diagram
This sequence diagram illustrates the flow of information in managing override
price promotion within fuel retail management system. The participants are HQ
(Headquarters), BOS (Back Office System), HUB, POS (Point of Sale) and Staff.
The process involves promotion setup, transactions with promotion and
promotion report.

Figure 4.1 Sequence Diagram of Override Price Promotion Setup
The sequence diagram Figure 4.1 outlines the process of setting up, updating, and
deleting promotions, highlighting the synchronization between HQ, BOS, HUB,
and POS. The process starts with HQ configuring an override price promotion in
BOS. At the store level, staff reload the POS system to prepare it for
synchronization.
Once the POS reload is complete, it sends a request to the HUB for promotion
details. The HUB queries BOS to check for any new or updated promotions. BOS
68

processes the query and responds with the relevant promotion details, including
pricing and conditions. The HUB then forwards this information to the POS. After
synchronization is completed, the promotion is updated and active in the POS
system.
The same process applies for updating or deleting promotions, where HQ makes
the changes in BOS, and staff ensure the POS is synchronized to reflect those
changes accurately.

Figure 4.2 Sequence Diagram of Override Price Promotion in POS
The process of viewing promotions in Figure 4.2 involves interactions between
HQ, BOS, and the POS system. HQ initiates the process by requesting to view
promotions in BOS. This triggers BOS to retrieve and display a list of all
configured promotions, including details such as promotion types, validity
periods, and applicable items.
At the store level, staff access the promotion page through the POS system. The
POS responds by displaying the requested promotion information, allowing staff
to view active, expired, or upcoming promotions relevant to their operations.

69

Figure 4.3 Sequence Diagram of Override Price Promotion Transaction in POS
The process of applying promotions during transactions in POS, Figure 4.3 begins
with the staff adding items to the cart in the POS system. As items are added, the
POS system automatically checks for any applicable promotions based on the
items, their quantities, and other promotion criteria.
Once a promotion is identified, the POS system displays the promotion details
directly in the cart. This includes information such as the promotion name, the
discount applied, and the updated total. This ensures that the staff and customers
are fully aware of the applied promotions before completing the transaction.

Figure 4.4 Sequence Diagram of Override Price Promotion Report in BOS
The process of viewing the promotion report in Figure 4.4 begins with HQ
requesting the report from BOS. Upon receiving the request, BOS retrieves the
required data by leveraging its microservices architecture. This ensures efficient
processing and aggregation of relevant information. The promotion report

70

highlights key metrics such as the total number of promotions sold, total gross
sales generated from these promotions, and the overall value of discounts applied
Once the data is processed, BOS generates and displays the promotion report to
HQ. This report offers insights into the performance of active past promotions,
enabling HQ to assess their impact on sales and revenue.

4.2.3 Design Interface of the System
In the development of the system, an important part is designing the UI, which
serves as a model created to meet the needs and expectations of the stakeholders.
This design has been developed together, using feedback and preferences from the
stakeholders through several meetings. The agreement on this UI model shows a
shared effort to build a system interface that matches stakeholder expectations
while improving user satisfaction and ease of use.
In the first sprint, the focus is on the override price promotion setup in BOS. This
focus aligns with the project's goals and provides a clear direction for the
development sprint. In the second sprint, the promotion page in POS and the
promotion indication on the receipt are addressed. The complexity arises from the
need to create a new page specifically for the override price promotion on the POS
promotion page. In the third sprint, the design of the report is handled. The
iterative process involves continuous feedback from stakeholders through
meetings, ensuring a seamless user experience. This approach highlights the
commitment to meeting stakeholder expectations and refining the system for
optimal functionality.

71

a) Override price promotion page setup

Figure 4.5 Override Price Promotion Section Setup
Figure 4.5 showcases a design specifically for creating override price
promotion. The “Name” field is for the promotion name such as Buy One
Get One Free Override. The “Type” is for choosing the type of promotion.
The "Apply Limit" field defines the maximum number of times a
promotion can be applied in a single transaction. If a value of zero is
entered, it indicates that there is no limit, allowing the promotion to be
applied an unlimited number of times per transaction. This field helps to
control how often a promotion can be used, ensuring it aligns with client
marketing strategies, such as limiting a discount to one use per customer
or allowing multiple uses if the promotion is part of a bundle or special
offer.

72

Figure 4.6 Override Price Promotion Trigger and Actions Setup
Figure 4.6 showcases the promotion trigger and the actions of the
promotion trigger. The "Triggers" section allows the user to define
conditions that will initiate an action. These conditions can include
specifying a fuel type, a group name, and setting minimum and maximum
quantity thresholds. The "Actions" section, on the other hand, defines the
response to the triggered conditions. In this case, the action is to "Override
product price," where the user buys the product, the current price will be
override, and specify a maximum quantity for the price override. The
interface provides options to add multiple triggers and actions, as well as
buttons to cancel or save the configuration.

73

Figure 4.7 Override Price Promotion Availability Setup
Figure 4.7 showcases the availability setup for the promotion. HQ can set
the active date and the active day of the promotion. Other than that, HQ
also can choose the applicable outlets for the promotions.

b) Override price promotion page in POS

Figure 4.8 Override Price Promotion in POS Cart
Figure 4.8 shows the promotion name and the promotion discount of the
items in the cart. Provide visibility to the staff whether the item has
promotion or not.
74

Figure 4.9 Override Price Promotion Section in POS
Figure 4.9 shows the promotion override price page in POS. This section
displays the promotion by type. In each section, there will be the list of
promotion that are available for the time.

Figure 4.10 Override Price Promotion Details in POS
Figure 4.10 shows the promotion details in the promotion override price
page in POS. This page will show the details of the promotion to the staff,
including information on its availability in terms of date and time, the
promotion’s active period (from and until), the trigger product for the
promotion, and the apply action required for the promotion. Additionally,
it will provide clear instructions on how the promotion should be applied,
ensuring staff can easily implement it at the point of sale. The page will
also display any specific conditions or exclusions related to the promotion
to avoid confusion during application.
75

Figure 4.11 Override Price Promotion Details in Receipt
Figure 4.11 shows the promotion name as well as the promotion discount
in the receipt after checkout. This enables the customer to view the
promotion items and the discounted price they get.

c) Promotion Report
The Promotion Report is based on the promotional product for Summary
Promotion Report by Product and promotion date for Promotion Report.

Figure 4.12 Override Price Promotion Summary Promotion Report by
Product in BOS
Figure 4.12 shows the promotion report that includes columns for the
product's barcode, promotion ID, promotion name, total quantity sold,
total gross sales, and total discount applied. The report is to track the
effectiveness of individual promotions by product, allowing user to
analyse how well certain promotions have contributed to sales, how much
discount was applied, and the overall impact on product performance.

76

Figure 4.13 Override Price Promotion Report in BOS
Figure 4.13 shows the promotion report that includes columns for the
product's barcode, promotion ID, promotion name, total quantity sold,
total gross sales, and total discount applied. The report is to track the
effectiveness of individual promotions, allowing user to analyse how well
certain promotions have contributed to sales for specific date, how much
discount was applied, and the overall impact on product performance.

77

4.3

Results of Implementation Phase
The implementation phase is the final stage of the project process. During this
phase, coding is carried out to turn the documented features into a working system.
Using the FSD, the system is built based on the user stories and UI provided in
the documentation. The system's interface flow is carefully planned to define user
actions, available features, and system responses. The layout and navigation of
the interface are designed to ensure simplicity and ease of use. The main goal of
this phase is to deliver a fully functional system that provides a good user
experience.

4.3.1 Interfaces of the System
This section showcases the system interface, designed to provide a clear overview
of the system's flow and details for each previously mentioned use case. The
interface visually represents user interactions, and the information displayed in
the system. It offers a thorough understanding of how users navigate and interact
with the system, emphasizing its key features and functionalities.
i.

Override price promotion setup.

Figure 4.14 Override Price Promotion Setup at BOS
Based on the Figure 4.14, this is the result of the implementation for the
promotion override price setup in BOS. User (HQ) need to log into
RONPOS back-office system. User will click Promotion under Marketing
78

section on the left side navigation of the page. User then need to click
‘Create Promotion’, the page will navigate to the Figure 4.14. User needs
to fill in the ‘Details’ section and ‘Availability’ section. User can choose
to add promotion trigger by clicking ‘Add Trigger’ button and fill all the
details required or right away click ‘Add Action’ to always trigger the
promotion.

Figure 4.15 List of Promotions in BOS
The Figure 4.15 shows the list of promotions in BOS. Once user click
‘Save’ on Figure 4.14, user can view the created override price promotion
in here.

Figure 4.16 Updating Override Price Promotion in BOS
The Figure 4.16 shows the page for updating the promotions details. Once
user enter click the promotion, user will click the desired promotion to
79

update the promotion. Figure above will display once user click one of the
promotions. In here user can change all the four sections of the promotion:
Details, Availability, Triggers and Actions. Once the changes have been
made, user can click on the ‘Save’ button in the green colour on the top
right of the page.
ii.

Override price promotion page in POS.

Figure 4.17 Override Price Promotion Section Page in POS
Figure 4.17 shows the promotion override price page in POS. Users need
to click ‘Dashboard’ then click the star icon on the above navigation bar
then click ‘Override’ section. User (cashier) can view the promotion
override price page. This page will show the available and ongoing
promotions.

80

Figure 4.18 Override Price Promotion Details in POS – Promotion Page
Figure 4.18 shows the promotion details once user clicks on the available
promotion in the Figure 4.17. The details include Promotion Type,
Availability, Available From, Until, Trigger and Apply Action.

Figure 4.19 Override Price Promotion in POS Cart
The Figure 4.19 shows the promotion in the cart once the cashier adds the
promotional item in the cart. Cashier can view the promotion name
81

“Hariku choco override price” displayed on top of the cart with the green
star on the left. The override price also will be displayed right below the
item ‘-4.00’.
iii.

Override price promotion in receipt.

Figure 4.20 Override Price Promotion in Receipt
The Figure 4.20 shows the promotion name and the calculation on the final
receipt after checkout. The promotion name appears in a box above the
promotional items, such as "Hariku Choco Override Price." The override
price promotion calculation is displayed below the promotional item in
brackets, for example, "(Discount: @-4.00)." This allows customers to
easily identify the promotion applied and the discounted price they
received.

82

iv.

Override price promotion in report page.

Figure 4.21 Override Price Promotion Report in Cloud BOS
The Figure 4.21 shows the promotion report when user go to Items →
Reports → Promotions. The page will display the promotion report. There
are two promotion report which are Summary Promotion Report by
Product and Promotion Report. These promotion reports will display the
promotional transaction that happen in POS. The column will display the
details of the promotional item, total sales, quantity and total discount
being offered.
The system starts with HQ setup the override price promotion in BOS. Once the
promotion has been saved the HQ can check again on the promotion details if any
changes are needed to the promotion. At the store level, cashier will sync and
reload the POS, this ensures that latest promotions are available in the POS. Staff
can check the promotions in the POS promotion page. When customers buy an
item that has promotion, it will be reflected in the POS after item are added to the
cart. Once the transaction has been made the promotion details are displayed in
the receipt for customer visibility. For reporting purpose, HQ can check the
Promotion Report page to evaluate the effectiveness of each promotion. The
report provides valuable insights into the performance of the promotions by
showcasing key metrics such as the total number of transactions per day and the
gross sales generated from each promotional item. This allows HQ to track the
success of the promotions over time and make informed decisions based on these
key performance indicators.
83

4.4

Summary
In this chapter, the project's outcomes and findings are explored, following the
phases of the Scrum methodology outlined previously. The initiation phase
involved identifying limitations in the existing system through stakeholder
engagement, emphasizing the need for a flexible override price promotion system.
The planning and estimation phase focused on creating the Functional
Specification Document (FSD), incorporating user stories, sequence diagrams,
and prototypes. Sprint planning prioritized features such as promotion setup,
display, and reporting, distributed across three sprints. The implementation phase
translated these designs into a functional system, integrating user-friendly
interfaces for HQ and cashiers to manage tailored promotions efficiently. The final
section highlights iterative feedback and alignment with business objectives.

84

CHAPTER 5

CONCLUSION AND RECOMMENDATIONS

This chapter summarises the override price promotion mechanism, which helps the HQ
increase sales. It emphasises the limits found throughout the project and makes
recommendations for future improvement.

5.1

Conclusion
The aim of this project is to develop override price promotions within the fuel
retail management system. The project has been successfully achieved by
showing the accomplishments of all these objectives.
The objectives of the project that have been accomplished are:
i.

To gather and analyse the requirements for RONPOS promotions module.

ii.

To design the interface of RONPOS promotions module.

iii.

To develop the override price promotions module for RONPOS
promotions module.

5.1.1 Objective 1: To gather and analyse the requirements for RONPOS
promotions module
The objective was achieved based on the completion of the Initiation phase.
Stakeholders were interviewed to fully comprehend the system's requirements at
this phase. These discussions were iterative, which allowed for ongoing input
gathering from stakeholders on the prototype and the developing system. Through
this iterative method, improvements were found and later included in the
prototype, which had an impact on the system's further development. The
deliverables are requirement on the calculation of the override price promotion,
85

requirements for the promotion page in POS and receipt. In addition, team
conversations were essential for carefully examining and analysing the
stakeholder needs that were collected. The deliverables can be found in section
4.1.

5.1.2 Objective 2: To design the interface of RONPOS promotions
module
The second objective focuses on the design of the module. A Functional
Specification Document was prepared to gather the requirements and design.
There were several activities done to complete the FSD. The activities include
writing user stories, sequence diagrams and the system prototype using Figma. To
decide which features would be built in the next sprint, the team jointly prioritized
and estimated the backlog items during a Sprint Planning meeting. The deliverable
is override price promotion FSD. The FSD has been completed in the middle of
the third sprint. The deliverables can be found in section 4.2.

5.1.3 Objective 3: To develop the override price promotions module for
RONPOS promotions module
The third objective of the project was successfully achieved during the
implementation phase, focusing on the development of the override price
promotion feature in the RONPOS system. Most of the work was concentrated on
the Back Office System (BOS), enabling headquarters to create and manage
override price promotions efficiently. These promotions are seamlessly reflected
in the Point of Sale (POS) system after synchronization, ensuring consistency
across platforms. While the primary development efforts were on the BOS,
minimal adjustments were made to the POS to ensure compatibility and accurate
implementation. This feature provides the headquarters with enhanced control and
flexibility in managing promotions, allowing for quick responses to market
demands while maintaining centralized oversight. The output of this objective is
86

the override price promotion setup in BOS and promotion transactions in POS.
The deliverables can be found in section 4.3.

5.2

Strength
The promotion functionality within the fuel retail management system covers a
wide range of capabilities, including configuring various promotion types such as
free product, combo set, and discount. It also allows for creating and managing
override price promotions. This comprehensive approach enables headquarters to
centrally manage and optimize promotions across all retail locations, ensuring
consistency and maximizing promotional effectiveness.

5.3

Project Limitation
There are some limitations in the project although the objective of this project has
been achieved. The limitations of this project are:
i.

Limited information on new promotion
Currently, the system offers limited visibility regarding new promotions,
as the POS must be synchronized every morning to ensure the latest
promotions created in BOS are available. For instance, when HQ creates
a promotion in the evening, staff may not be aware of it during the day and
must manually sync the POS to ensure it has the most up-to-date
information. Even if there are no new promotions, staff still need to
perform the synchronization since they are not notified of any updates,
leading to unnecessary syncing and inefficiencies. A more streamlined
process with automatic notifications or an improved syncing mechanism
would reduce the need for constant manual synchronization and enhance
workflow.

ii.

Promotion Report

87

Currently, the Promotion Report by Date does not display the selected date
range, creating ambiguity about the timeframe of the data presented. For
instance, even when a user filters the report to show data for one month,
the report title remains static and does not reflect the selected range. This
limitation leads to inefficiencies, as users must manually recall or
document the date range they chose while generating or sharing the report.
iii.

Ambiguity in Naming Fields for New Promotions
When creating a new promotion, there are two sections requiring the user
to input names, which can lead to confusion see Figure 4.14. The first
section, Details, includes a field labelled Name, while the second section,
Triggers, contains a Product subsection with a field called Group Name.
Users may struggle to understand the distinction between these two fields
and their specific purposes, potentially causing errors or inefficiencies
during promotion setup. Clearer labelling, additional tooltips, or improved
contextual guidance could help address this ambiguity and enhance user
experience.

5.4

Recommendations for Future Enhancements
There are several recommendations where it can enhance the system to improve
user experience. The recommendations are:
i.

Advanced filtering by promotion type and product categories
Enhance the reporting system to allow filtering by specific promotion types
(e.g., discounts, free product, combo deals, override price) and product
categories (e.g., fuel, snacks, car accessories). This would enable more
detailed analysis of how different types of promotions perform and help
identify the most effective strategies.

ii.

Promotion Budgeting and Cost Analysis
Integrating budgeting and cost-tracking into the promotion system helps
businesses monitor both direct and indirect promotion costs, compare them to
88

generated revenue, and ensure profitability. With budgeting tools and cost
limits, businesses can optimize promotional strategies, improve decisionmaking, and maximize return on investment (ROI).
iii.

Automated Promotion Recommendations
Implementing an AI-based system that can analyse past promotion data,
customer behaviours, and market trends would enable businesses to
automatically generate new promotional strategies based on actionable
insights. This system would look at historical data (e.g., sales, customer
preferences, seasonal trends) and use predictive analytics to suggest
promotions that are more likely to succeed.

5.5

Summary
The project successfully developed the override price promotions module for the
RONPOS system, achieving its objectives of gathering requirements, designing
the interface, and implementing the module. This feature enables headquarters to
manage override price promotions through the Back Office System (BOS), with
seamless synchronization to the Point of Sale (POS) for consistency across retail
locations. The project’s strengths lie in its comprehensive promotion management
capabilities, including free products, combo sets, and discounts, with the use of
Scrum ensuring flexibility and ongoing improvement. However, limitations exist
in reporting, particularly in the lack of differentiation between promotion types
and specific product categories. Recommendations for future enhancements
include advanced filtering in reports, promotion budgeting and cost analysis, and
implementing AI-based promotion recommendations to optimize strategies and
profitability.

89

REFERENCES

Afrizans, D. E., & Majid, N. (2023). Analysis of Language Strategies in the Digital
Promotion of the Mulyosari Group Through Instagram Media. International Journal
of Asian Business and Management, 2(6). https://doi.org/10.55927/ijabm.v2i6.7147
Akram, U., Fülöp, M. T., Tiron-Tudor, A., Topor, D. I., & Căpușneanu, S. (2021). Impact
of digitalization on customers’ well-being in the pandemic period: Challenges and
opportunities for the retail industry. International Journal of Environmental
Research and Public Health, 18(14). https://doi.org/10.3390/ijerph18147533
Allender, W. J., & Richards, T. J. (2012). Brand Loyalty and Price Promotion Strategies:
An

Empirical

Analysis.

Journal

of

Retailing,

88(3),

323–342.

https://doi.org/10.1016/J.JRETAI.2012.01.001
Álvaro, B., Chopra, A., Fruk, M., Krstić, L., Mantel, K., & Nägele, F. (2021). Fuel retail
in the age of new mobility. In McKinsey & Company (Issue April).
Andrews, M. J., Chatterji, A., Lerner, J., & Stern, S. (2022). The Role of Innovation and
Entrepreneurship in Economic Growth. In The Role of Innovation and
Entrepreneurship

in

Economic

Growth.

https://doi.org/10.7208/chicago/9780226810645.001.0001
Angelica, L. (2024, June 6). What is a Web-Based Application and System.
https://mockitt.wondershare.com/app-design/web-based-application.html
Aziz, W. A. (2020). Exploring Consumer Perception of Oil and Gas Retail Business to
Ensure Service Sustainable Development. 2020 2nd International Sustainability and
Resilience Conference: Technology and Innovation in Building Designs.
https://doi.org/10.1109/IEEECONF51154.2020.9319942
Baba, A. M., & Nonyelum, O. F. (2017). BOEHM-Waterfall Methodology: Issues and
Challenges. IRACST -International Journal of Computer Science and Information
Technology & Security, 7(4).

90

Badlani, M., & Singhal, D. K. (2016). THE INTERNATIONAL JOURNAL OF BUSINESS
& MANAGEMENT A Study on Value Added Service in Fuel Retailing: Impacting
Consumer Buying Behavior. www.theijbm.com
Borisova, A., Borisova, E., Kirichenko, E., & Dmitrieva, L. (2020). Digital technologies
in retail: is there an impact on businesses? SHS Web of Conferences, 80.
https://doi.org/10.1051/shsconf/20208001021
bp. (n.d.). Non-Fuels Retail Business and Facilities. Retrieved November 2, 2024, from
https://www.bp.com/en_id/indonesia/home/products-and-services/fuels-retail/nonfuels-retail-business-and-facilities.html
Casteren, W. Van. (2017). The Waterfall Model And The Agile Methodologies : A
Comparison By Project Characteristics-Short The Waterfall Model and Agile
Methodologies. Academic Competences in the Bachelor, February.
Chappell,

D.

(2011).

WHAT

IS

AN

APPLICATION

PLATFORM?

http://www.chappellassoc.com/writing/white_papers/What_is_an_Application_Plat
form-Chappell.pdf
Comocrat Software Solution. (2023, March 2). Difference between Static and Dynamic
Website!

Web

Development

Company

in

Noida.

https://www.linkedin.com/pulse/difference-between-static-dynamic-website
Daosue, C., & Wanarat, S. (2019). The effects of advertising and sales promotion on brand
awareness for a food product brand in wholesale shops, Bangkok and metropolitan
areas. ABAC Journal, 39(1).
de Sousa, P. R., Barbosa, M. W., de Oliveira, L. K., de Resende, P. T. V., Rodrigues, R.
R., Moura, M. T., & Matoso, D. (2021). Challenges, opportunities, and lessons
learned: Sustainability in Brazilian omnichannel retail. Sustainability (Switzerland),
13(2). https://doi.org/10.3390/su13020666
Debra. (2023, November 28). POS Systems in Managing Discounts and Promotions.
https://www.tillpoint.com/pos-systems-in-managing-discounts-and-promotions/
Diansyah, A. F., Rahman, M. R., Handayani, R., Nur Cahyo, D. D., & Utami, E. (2023).
Comparative Analysis of Software Development Lifecycle Methods in Software
91

Development: A Systematic Literature Review. International Journal of Advances
in Data and Information Systems, 4(2). https://doi.org/10.25008/ijadis.v4i2.1295
Doshi, D., Jain, L., & Gala, K. (2021). REVIEW OF THE SPIRAL MODEL AND ITS
APPLICATIONS. International Journal of Engineering Applied Sciences and
Technology, 5(12). https://doi.org/10.33564/ijeast.2021.v05i12.053
Dziadkowiec, P. (2024). Loyalty in fuel retail: What makes a fuel rewards program
successful? https://www.openloyalty.io/insider/loyalty-programs-in-fuel-retail
Effendi, D., Saepullah, S., & Rismaya, M. I. (2020). Web-Based Sales Information
System Design in Small and Medium Enterprises. International Journal of
Education, Information Technology, and Others, 3(3).
Gauri, D. K., Jindal, R. P., Ratchford, B., Fox, E., Bhatnagar, A., Pandey, A., Navallo, J.
R., Fogarty, J., Carr, S., & Howerton, E. (2021). Evolution of retail formats: Past,
present,

and

future.

Journal

of

Retailing,

97(1).

https://doi.org/10.1016/j.jretai.2020.11.002
Gilbarco Veeder-Root. (n.d.). Passport®

X. Retrieved June 23, 2024, from

https://www.gilbarco.com/sea/products/forecourt-automation/passport-x
Gordon-Hecker, T., Pittarello, A., Shalvi, S., & Roskes, M. (2020). Buy-one-get-one-free
deals attract more attention than percentage deals. Journal of Business Research,
111. https://doi.org/10.1016/j.jbusres.2019.02.070
Gupta, S. (2020, October 20). How fuel retail companies can win customers of the future.
https://www.ey.com/en_sg/insights/oil-gas/how-fuel-retail-companies-can-wincustomers-of-the-future
Gurendo, D. (2015, October 26). Software Development Life Cycle (SDLC). Spiral Model.
https://xbsoftware.com/blog/software-development-life-cycle-spiral-model/
Gurendo, D. (2020, January 15). Software Development Life Cycle (SDLC). Scrum Model
Step by Step. https://xbsoftware.com/blog/software-development-life-cycle-sdlcscrum-step-step/

92

Hameli, MSc. K. (2018). A Literature Review of Retailing Sector and Business Retailing
Types. ILIRIA International Review, 8(1). https://doi.org/10.21113/iir.v8i1.386
Hamilton, S. F., Liaukonyte, J., & Richards, T. J. (2020). Pricing strategies of food
retailers.

In

Annual

Review

of

Resource

Economics

(Vol.

12).

https://doi.org/10.1146/annurev-resource-101619-094219
Haouel, C., & Nemeslaki, A. (2024). Digital Transformation in Oil and Gas Industry
Opportunities and Challenges. Periodica Polytechnica Social and Management
Sciences, 32(1). https://doi.org/10.3311/PPSO.20830
Herawati, S., Negara, Y. D. P., Febriansyah, H. F., & Fatah, D. A. (2021). Application of
the Waterfall Method on a Web-Based Job Training Management Information
System at Trunojoyo University Madura. E3S Web of Conferences, 328.
https://doi.org/10.1051/e3sconf/202132804026
Hitsch, G. J., Hortaçsu, A., & Lin, X. (2021). Prices and promotions in U.S. retail markets.
Quantitative Marketing and Economics, 19(3–4). https://doi.org/10.1007/s11129021-09238-x
Kango, U., Kartiko, A., & Maarif, M. A. (2021). The Effect of Promotion on the Decision
to Choose a Higher Education through the Brand Image of Education. AL-ISHLAH:
Jurnal Pendidikan, 13(3). https://doi.org/10.35445/alishlah.v13i3.852
Kawadkar, V. (2019). ROLE OF TECHNOLOGY IN RETAIL INDUSTRY. www.jetir.org
Kumar, S. (2022). The Effect of Sales Promotion Techniques on Consumer Purchase. IUJ
Journal of Management Received Sept, 10(2). https://doi.org/10.11224/IUJ.10.02.14
Kwong Kiat, T. (2014). MAINTAINING CONTROL OVER INDUSTRY ARCHITECTURE
THE FUEL RETAILING INDUSTRY.
LTS Group. (2023, November 15). Static Vs Dynamic Website: The Key Differences And
Which To Use. https://www.linkedin.com/pulse/static-vs-dynamic-website-keydifferences-which-use-w0qec

93

Mishra, M., Kushwaha, R., & Gupta, N. (2024). Impact of sales promotion on consumer
buying behavior in the apparel industry. Cogent Business and Management, 11(1).
https://doi.org/10.1080/23311975.2024.2310552
Mohamed Rizwan, & K.Karthikeyan. (2023). Petroleum Retail Outlet as a Sustainable
Entrepreneurial business even during pandemic situations and its operational risks.
Journal of Population Therapeutics and Clinical Pharmacology, 30(12).
https://doi.org/10.47750/jptcp.2023.30.12.005
Nolan, M. (2024, June 6). 4 trends shifting the fuel & convenience industry.
https://www.mastercardservices.com/en/advisors/consumer-engagement-loyaltyconsulting/insights/4-trends-shifting-fuel-convenience
Nusa, I. B. S., & Faisal, F. M. (2020). Web-Based Information Systems: Developing a
Design Theory. IOP Conference Series: Materials Science and Engineering, 879(1).
https://doi.org/10.1088/1757-899X/879/1/012015
PDI Technologies. (2022, October 3). PDI Technologies Integrates Age and Identity
Verification with Its Offer Network to Help Retailers and Brands Maximize Reach,
Including

with

GasBuddy®

and

Fuel

Rewards®

Consumers.

https://pditechnologies.com/news/pdi-technologies-deal-hound/
PDI Technologies. (2023). Point of Sale (POS). https://pditechnologies.com/increaseproductivity/store-systems/point-of-sale/
Pentescu, A., & Paștiu, C. (2020). Retail Evolution in Eastern European Countries: An
Overview. KnE Social Sciences. https://doi.org/10.18502/kss.v4i1.5994
Pradini, G., Syarifuddin, B., Digdowiseiso, K., & Miranti, O. (2022). The Influence of
Products and Promotional Mix on Tourists’ Decision: (Case Study of Pramuka Bee
Park, Cibubur, East Jakarta). Budapest International Research and Critics InstituteJournal (BIRCI-Journal), 5(1).
Purohit, S., & Jain, A. K. (2020). Evolution of Fuel Retail in India Vis-a-Vis Indian
Customer: Shift in Consumer Behavior. International Journal of Management
(IJM), 11(8).

94

Rubies, M., Groves, S., Bonaccorsi, G., Portera, T., Masci, F., & Chalouhi, C. (2022, June
14).

A

New

Era

for

Fuel

Retailers.

https://www.bcg.com/publications/2022/reimagining-service-stations
Sagar, S. (2024). The Impact Of Digital Transformation On Retail Management And
Consumer Behavior. Issue 1. Ser, 26.
Sari, R., Rifa’i, A. M., Ahsan, M. S., Pahlevi, M. R., & Arief, M. I. (2022). Systematic
Literature Review of the spiral development model: Topics, trends, and application
areas. In International Journal of Research and Applied Technology (Vol. 2, Issue
2).
Sarno, Rivaldo, Y., Kamanda, S. V., & Yusman Edi. (2022). The Effect of Products,
Services and Promotions on Decision on Customer Request on Service Products at
Bank BSI Tiban Batam Branch. Jurnal Mantik, 6(2).
Schrotenboer, D., Constantinides, E., Herrando, C., & Vries, S. de. (2022). The Effects of
Omni-Channel Retailing on Promotional Strategy. In Journal of Theoretical and
Applied

Electronic

Commerce

Research

(Vol.

17,

Issue

2).

https://doi.org/10.3390/jtaer17020019
Schwaber, K., & Sutherland, J. (2017). The Scrum Guide: The Definitive The Rules of
the Game. Scrum.Org and ScrumInc, November.
Shehu, E., Papies, D., & Neslin, S. A. (2020). Free Shipping Promotions and Product
Returns.

Journal

of

Marketing

Research,

57(4).

https://doi.org/10.1177/0022243720921812
Shetty, A. S., Jeevananda, S., & Kalghatgi, J. R. (2018). How to win back the disgruntled
consumer? The omni-channel way. Journal of Business and Retail Management
Research, 12(4). https://doi.org/10.24052/jbrmr/v12is04/art-20
Sinha, S. K., & Verma, P. (2020). Impact of sales Promotion’s benefits on perceived value:
Does product category moderate the results? Journal of Retailing and Consumer
Services, 52, 101887. https://doi.org/10.1016/J.JRETCONSER.2019.101887
Sritart, H., Phudin, T., Tosranon, P., & Taertulakarn, S. (2023). Design and Evaluation of
Web-Based Information Systems for the Medical Laboratory. International Journal
95

of

Online

and

Biomedical

Engineering,

19(3).

https://doi.org/10.3991/ijoe.v19i03.36505
Tandon, K., & Mohan, M. (2018). The increasing importance of technology in the retail
sector. International Journal of Civil Engineering and Technology, 9(12).
Twin, A. (2022). The 4 Ps of Marketing and How to Use Them in Your Strategy.
Investopedia.
Vojvodić, K. (2019). Brick-and-mortar retailers: Becoming smarter with innovative
technologies.

Strategic

Management,

24(2).

https://doi.org/10.5937/straman1902003v
Web Application Development. (2024, March 26). What Is a Web-based Application?
Examples and Benefits. https://www.designveloper.com/blog/what-is-a-web-basedapplication/
Wiguna, K., & Mahdiana, D. (2023). Analysis of Information Systems Development
Methods: A Literature Review. INOVTEK Polbeng - Seri Informatika, 8(2).
https://doi.org/10.35314/isi.v8i2.3753
Yasar,

K.

(2024).

What

is

SaaS

(software

as

a

service)?

https://www.techtarget.com/searchcloudcomputing/definition/Software-as-aService

96

APPENDICES

APPENDIX A:
GANTT CHART Semester 6

GANTT CHART Semester 7

97

APPENDIX B: Functional Specification Document (FSD)

98

99

100

101

102

103

104

105

106

107

108

109


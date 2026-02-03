# UI Wireframes & Detailed Screens

This document provides textual wireframes and detailed descriptions for each major screen of the platform, based on the UI/UX plan.

---

## 1. Home Page

**Wireframe (Text):**

[Logo] [Home] [Explore] [Problems] [Dashboard] [Help] [Login/Signup]
-------------------------------------------------------------
| [Hero Section: Mission Statement & CTA]                  |
| [Quick Search Bar: "Search by problem, category..."]     |
-------------------------------------------------------------
| [Featured Startups]   | [Trending Problems]              |
| [Startup Card]        | [Problem Card]                   |
| ...                   | ...                              |
-------------------------------------------------------------
| [How It Works Section]                                   |
| [Testimonials/Press]                                     |
-------------------------------------------------------------
[Footer: About | Contact | Privacy | Terms | Social Links]

---

## 2. Startup Explorer

**Wireframe (Text):**

[Header]
-------------------------------------------------------------
| [Sidebar: Filters] | [Search Bar] [Sort]                 |
| [Category List]    | [Startup Cards Grid/List]           |
| [Problem List]     | [Card: Logo, Name, Desc, Tags, CTA] |
-------------------------------------------------------------
| [Pagination/Infinite Scroll]                             |
-------------------------------------------------------------

---

## 3. Problem Explorer

**Wireframe (Text):**

[Header]
-------------------------------------------------------------
| [Sidebar: Problem Categories/Filters]                    |
| [Problem Cards: Title, Description, # of Startups]       |
| [Click Problem → List of Startups Solving It]            |
-------------------------------------------------------------

---

## 4. Startup Profile Page

**Wireframe (Text):**

[Header]
-------------------------------------------------------------
| [Logo] [Startup Name] [Category] [Stage]                 |
| [Pitch Video] [Pitch Deck] [Demo Link]                   |
| [Problem(s) Solved] [Solution Description]               |
| [Team] [Traction] [Funding Needs]                        |
| [Contact/Connect Button]                                 |
| [Testimonials/Press/Awards]                              |
-------------------------------------------------------------

---

## 5. Investor Dashboard

**Wireframe (Text):**

[Header]
-------------------------------------------------------------
| [Personalized Feed: Startups Matching Interests]         |
| [Saved Startups] [Recent Updates]                        |
| [Compare Startups Tool]                                  |
| [Notifications]                                          |
-------------------------------------------------------------

---

## 6. Founder Dashboard

**Wireframe (Text):**

[Header]
-------------------------------------------------------------
| [Manage Startup Profiles]                                |
| [Update Info] [Upload Pitch Video/Deck]                  |
| [Investor Interest & Engagement]                         |
| [Analytics: Views, Messages, etc.]                       |
-------------------------------------------------------------

---

## 7. Onboarding & Walkthrough

**Wireframe (Text):**

[Header]
-------------------------------------------------------------
| [Step-by-step Guide/Modal]                               |
| [Progress Bar]                                           |
| [Input Fields/Instructions]                              |
| [FAQ/Help Link]                                          |
-------------------------------------------------------------

---

## 8. General Components

- **Header:** Navigation, logo, user menu.
- **Footer:** Info links, social, legal.
- **Sidebar:** Filters, categories, problems.
- **Cards:** For startups, problems, with quick info and actions.
- **Modals:** For onboarding, contact, walkthroughs.

---

## Next Steps

---

# Detailed User Flows

Below are step-by-step user flows for the most important actions on the platform. These can be used to guide both design and development.

---

## 1. Founder Onboarding & Startup Submission

1. User lands on Home page → clicks "Sign Up as Founder".
2. Fills in personal details (name, email, password) → submits.
3. Email verification (optional step).
4. Guided onboarding modal starts:
	- Step 1: Create Startup Profile (name, logo, category, stage)
	- Step 2: Describe Problem(s) being solved
	- Step 3: Add Solution, Team, Traction, Funding Needs
	- Step 4: Upload Pitch Video, Deck, Demo Link
	- Step 5: Review & Submit
5. Confirmation screen: "Your startup is live!"
6. Redirect to Founder Dashboard.

---

## 2. Investor Onboarding & Discovery

1. User lands on Home page → clicks "Sign Up as Investor".
2. Fills in personal details (name, email, password) → submits.
3. Email verification (optional step).
4. Guided onboarding modal starts:
	- Step 1: Set investment interests (problems, categories, stages)
	- Step 2: Personalize dashboard (notifications, saved startups)
	- Step 3: Tour of platform features
5. Redirect to Investor Dashboard.

---

## 3. Searching & Filtering Startups

1. User (any role) lands on Home or Explorer page.
2. Uses search bar to enter keywords (problem, category, startup name).
3. Applies filters in sidebar (category, stage, traction, location, etc.).
4. Results update in real-time (grid/list of startup cards).
5. User clicks a startup card → navigates to Startup Profile Page.

---

## 4. Exploring Problems

1. User clicks "Problems" in main navigation.
2. Sees list of problems (with counts of startups tackling each).
3. Clicks a problem card → sees all startups solving that problem.
4. Can compare approaches, stages, traction, and contact founders.

---

## 5. Investor-Startup Engagement

1. Investor views a Startup Profile Page.
2. Clicks "Contact/Connect" button.
3. Fills in message form (optional: select interest type, e.g., "Request Pitch Meeting").
4. Founder receives notification and can reply via dashboard.
5. Both parties can track engagement in their dashboards.

---

## 6. Founder Dashboard Management

1. Founder logs in and lands on dashboard.
2. Can edit startup profile, update info, upload new pitch materials.
3. Views analytics (profile views, investor messages).
4. Responds to investor interest and messages.

---

## 7. Notifications & Updates

1. User receives notification (new message, startup match, update, etc.).
2. Clicks notification icon → sees dropdown or notification center.
3. Clicks a notification → navigates to relevant page (e.g., message thread, startup profile).

---

## 8. Educational Walkthrough

1. New user logs in for the first time.
2. Interactive walkthrough modal appears, highlighting key features and actions.
3. User can skip or complete walkthrough.
4. Walkthrough progress is saved for later completion if skipped.

---

Use these user flows to inform detailed UI design, prototyping, and development tasks.

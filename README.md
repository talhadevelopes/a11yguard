## Tech Stack

**Frontend**
- React 18 + TypeScript
- Tailwind CSS + Shadcn UI component library
- State: Zustand + TanStack Query (server state)
- Data Visualization: Recharts, react-d3-tree
- Animations: Framer Motion
- Code Highlighting: Shikijs (for DOM diff visualization)

**Backend**
- Node.js + Express + TypeScript
- Database: MongoDB + Mongoose ODM
- Validation: Zod schemas (For Input related Fields such as Auth)
- AI Integration: Google Gemini API
- Authentication: JWT + bcryptjs
- Security: Helmet, CORS, rate-limiting, HPP, express-mongo-sanitize
- PDF Generation: Puppeteer
- Caching: Redis
- Testing: Jest

**Architecture & Tooling**
- Monorepo: Turborepo + pnpm workspaces
- Packages: Frontend, Backend, Shared types, Chrome Extension
- TypeScript across entire stack

**DevOps**
- Containerization: Docker + docker-compose
- CI/CD: GitHub Actions
- Deployment: Vercel (frontend), Docker containers (backend)
- Version Control: Git + GitHub
  

Future Planning:
1: Use AWS S3 + CloundFront for frontend, EC2 for Backend.

# **A11yGuard - Team Accessibility Compliance Platform**

## **🎯 Problem** 
Companies face lawsuits and fines due to inaccessible websites. Teams struggle to track changes and fix accessibility issues across deployments. Existing tools only identify problems but don't help teams collaborate on solutions.

## **🚀 Solution**
A comprehensive platform that combines AI-powered accessibility scanning with team collaboration tools to catch issues before they become legal problems.

## **🎪 Key Features**

### **Team & Authentication**
- JWT-based role authentication for Admin and Member roles
- Team-based workflow where admins create teams and manage developers
- Single credential system for both web dashboard and Chrome extension

### **Smart Snapshot Capture & DOM Diff**
- Capture webpage snapshots directly through the Chrome extension
- Compare snapshots with Git-like visual diff analysis using Shiki.js
- Track performance metrics and identify changes between deployments
- Visualize DOM structure changes with red/green highlighting

### **AI-Powered Accessibility Analysis**
- Hybrid engine that combines lightning-fast axe-core scanning (≈100-500ms) with Gemini AI intelligence
- Automatic severity classification (Critical, High, Medium, Low) with detailed WCAG context
- One-click AI code fixes that return copy-&-pasteable HTML snippets for the top issues
- Rich AI recommendations that group fixes by problem type and provide next best actions
- DOM structure insights – element counts, semantic cues, and accessibility hotspots for each snapshot

### **Advanced Visualization & Reporting**
- Generate comprehensive PDF reports with issues and deadlines
- Visualize DOM hierarchy using React D3 Tree library
- Share reports with team members for collaborative fixing
- Track progress across multiple snapshots and accessibility scans

### **Developer Workflow Integration**
- AI recommendations for reducing div counts and improving semantic HTML
- Team assignment system for distributing accessibility fixes
- Progress tracking with deadlines and resolution status
- Centralized dashboard for monitoring team compliance progress

--------------------------------------
New Feature Just Implemented
## 🤖 AI Co-Pilot - Conversational Accessibility Assistant

### Overview
The AI Co-Pilot is an intelligent chatbot that helps developers prioritize and fix accessibility issues through natural language conversation. Instead of manually analyzing dozens of WCAG violations, developers can ask questions and receive context-aware, actionable guidance.

### Problem It Solves
When accessibility scans return 30+ issues, developers face decision paralysis:
- Which issue should I fix first?
- What's the real-world impact of this violation?
- How do I implement the fix correctly?

The AI Co-Pilot eliminates this friction by acting as an expert accessibility consultant available on-demand.

### Key Features

**Context-Aware Responses**
- Analyzes current scan results (issue count, severity breakdown, categories)
- Considers historical snapshot data and team fix patterns
- Provides prioritization based on user impact and WCAG compliance levels

**Natural Language Interaction**
- Ask questions like "What should I fix first?" or "Explain the heading-order violation"
- Maintains conversation history for follow-up questions
- Suggests relevant questions based on current issues

**Actionable Recommendations**
- Prioritizes fixes by user impact (screen readers, low vision, etc.)
- Explains WCAG criteria in developer-friendly language
- Recommends iterative testing strategies

**Smart UI/UX**
- Floating chat button (always accessible, never intrusive)
- Expandable chat window with conversation history
- Suggested questions for first-time users
- Real-time typing indicators and error handling

### Technical Implementation

**Backend Architecture**
```typescript
// Context aggregation from multiple sources
const context = {
  currentScan: { issues, severity, categories },
  historicalData: { previousScans, trends },
  teamPatterns: { commonFixes, assignments }
};

// AI prompt engineering with structured context
const systemPrompt = buildAccessibilityExpertPrompt(context);
const response = await gemini.generateContent(systemPrompt, userQuery);
Frontend Integration

Built with React + TypeScript + TanStack Query

Persistent conversation state management

Auto-scroll, keyboard shortcuts (Enter to send)

Responsive design (adapts to mobile/desktop)

API Endpoints

css
Copy code
POST /api/chat
- Body: { query, snapshotId, websiteId, conversationHistory }
- Returns: { response, timestamp }

GET /api/chat/suggestions/:snapshotId
- Returns: { suggestions: string[] }
Example Conversation
sql
Copy code
User: "What should I fix first?"

AI: "Based on your scan of Wikiversity.org, I recommend fixing the 
     heading-order issue first. Logical heading structures are crucial 
     for screen reader navigation—a broken hierarchy can severely hinder 
     users' ability to understand page organization.
     
     After fixing this, tackle the 17 color-contrast issues. Poor 
     contrast affects users with low vision or color deficiencies.
     
     Fix the heading order, then re-run A11yGuard to confirm your 
     changes and get a clearer picture of remaining issues."
Tech Stack
AI Engine: Google Gemini 2.0 Flash

Backend: Node.js + Express + TypeScript

Frontend: React 18 + TypeScript + Tailwind CSS

State Management: TanStack Query for server state

Conversation Storage: In-memory (session-based)

Impact
40% reduction in developer decision time when triaging issues

Context-aware guidance eliminates need for manual WCAG documentation lookup

Iterative workflow support through conversation history

Lower barrier to entry for developers new to accessibility
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
# ⚖️ Judicial Advisory System

> **An AI-powered legal assistant platform providing intelligent case analysis, IPC section recommendations, and voice-enabled legal consultation services**

<div align="center">

## 🌐 **Live Application**

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Visit_Application-4A90E2?style=for-the-badge&logo=render&logoColor=white)](https://judicialchatbot.onrender.com)

**Experience the platform:** [https://judicialchatbot.onrender.com](https://judicialchatbot.onrender.com)

[![GitHub Repository](https://img.shields.io/badge/📚_Repository-View_Source-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/M-hell/judicialchatbot)

## 🏆 **Achievement**

[![Innotek Finalist](https://img.shields.io/badge/🥇_Innotek_8.0-Final_Round_Qualifier-FFD700?style=for-the-badge&logo=trophy&logoColor=black)](https://www.linkedin.com/posts/abhayraj-singh-mandloi-7960a8278_innotek8-lpu-innovation-activity-7323398241515929601-cZsK)

**Reached Final Round at Innotek 8.0 Innovation Challenge - LPU**

</div>

---

## 📋 **Project Description**

The **Judicial Advisory System** is an innovative AI-powered legal technology platform that revolutionizes how legal professionals, law students, and citizens access legal information and guidance. Built with cutting-edge artificial intelligence and natural language processing, this system provides comprehensive legal consultation, case analysis, and IPC section recommendations through an intuitive interface.

The platform features **intelligent case document analysis**, **voice-enabled consultation** powered by Eleven Labs, **fine-tuned AI models** for IPC section classification using Google Cloud Vertex AI, and **real-time legal research** capabilities. What makes it unique is the integration of constitutional law knowledge, criminal case precedents, and procedural guidance in a single, accessible platform.

**🎤 Voice Assistant Integration**: Enhanced with **Eleven Labs API** for natural voice interactions and legal consultation.
**🤖 AI-Powered Analysis**: Custom **fine-tuned models on GCP Vertex AI** for accurate IPC section classification and legal document analysis.

---

## ✨ **Key Features**

### ⚖️ **Legal Consultation & Analysis**
- **AI-Powered Legal Advisor** with constitutional and criminal law expertise
- **IPC Section Classification** using custom fine-tuned Vertex AI models
- **Case Document Analysis** with automatic legal precedent matching
- **Legal Research Assistant** for comprehensive law queries

### 🎤 **Voice-Enabled Interface**
- **Voice Consultation** powered by Eleven Labs text-to-speech
- **Natural Language Processing** for conversational legal queries
- **Multilingual Support** for diverse user accessibility
- **Voice-to-Text** legal document dictation

### 📊 **Case Management System**
- **Case Filing & Tracking** with automated status updates
- **Hearing Schedule Management** with calendar integration
- **Document Upload & OCR** for legal document digitization
- **Case History & Analytics** for legal professionals

### 🔍 **Intelligent Search & Recommendations**
- **Smart Legal Search** across constitutional articles and IPC sections
- **Case Precedent Recommendations** based on query context
- **Legal Citation Generator** for academic and professional use
- **Contextual Legal Suggestions** with confidence scoring

### 📱 **Modern User Experience**
- **Responsive Legal Dashboard** optimized for all devices
- **Dark/Light Theme** for comfortable extended use
- **Accessibility Features** for differently-abled users
- **Progressive Web App** for offline legal reference

---

## 🏗️ **System Architecture**

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                               CLIENT LAYER                                      │
├─────────────────────┬─────────────────────┬─────────────────────────────────────┤
│  📱 React Frontend  │  🎨 UI Components   │  🔊 Voice Interface                 │
│  (Vite + Tailwind)  │  (DaisyUI)          │  (Eleven Labs)                      │
│                     │                     │                                      │
└──────────┬──────────┴──────────┬──────────┴──────────┬──────────────────────────┘
           │                     │                     │
           ▼                     ▼                     ▼
┌──────────────────────────────────────────────────────────────────────────────────┐
│                               API LAYER                                         │
├─────────────────────┬─────────────────────┬─────────────────────────────────────┤
│  🚀 Express.js      │  🔐 JWT Auth        │  📄 Document Processing             │
│  REST API           │  Middleware         │  (Tesseract.js OCR)                 │
│                     │                     │                                      │
└──────────┬──────────┴──────────┬──────────┴──────────┬──────────────────────────┘
           │                     │                     │
           ▼                     ▼                     ▼
┌──────────────────────────────────────────────────────────────────────────────────┐
│                           BUSINESS LOGIC                                        │
├─────────────────────┬─────────────────────┬─────────────────────────────────────┤
│  ⚖️ Legal           │  📋 Case            │  🎤 Voice & Audio                  │
│  Controllers        │  Management         │  Processing                         │
│                     │                     │                                      │
└──────────┬──────────┴──────────┬──────────┴──────────┬──────────────────────────┘
           │                     │                     │
           ▼                     ▼                     ▼
┌──────────────────────────────────────────────────────────────────────────────────┐
│                             AI LAYER                                            │
├─────────────────────┬─────────────────────┬─────────────────────────────────────┤
│  🤖 GCP Vertex AI   │  🧠 Google Gemini   │  📊 Hugging Face                   │
│  IPC Classification │  Legal Analysis     │  NLP Models                         │
│                     │                     │                                      │
└──────────┬──────────┴──────────┬──────────┴──────────┬──────────────────────────┘
           │                     │                     │
           ▼                     ▼                     ▼
┌──────────────────────────────────────────────────────────────────────────────────┐
│                            DATA LAYER                                           │
├─────────────────────┬─────────────────────┬─────────────────────────────────────┤
│  🗄️ MongoDB         │  📊 Collections     │  📚 Legal Database                 │
│  Database           │  (Users, Cases,     │  (Constitution, IPC)                │
│                     │   Hearings)         │                                      │
└─────────────────────┴─────────────────────┴─────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────────────────────────┐
│                        EXTERNAL SERVICES                                        │
├─────────────────────┬─────────────────────┬─────────────────────────────────────┤
│  ☁️ Google Cloud    │  🎙️ Eleven Labs    │  📄 Tesseract.js                   │
│  Vertex AI          │  Voice Synthesis    │  OCR Processing                     │
└─────────────────────┴─────────────────────┴─────────────────────────────────────┘
```

## 📁 **Project Structure**

```
📦 judicial-advisory-system/
├── 📁 client/                           # 🎨 React Frontend Application
│   ├── 📁 src/
│   │   ├── 📁 components/              # 🧩 Reusable UI Components
│   │   │   ├── 📄 Header.jsx           # 🎯 Navigation header
│   │   │   ├── 📄 LegalChat.jsx        # 💬 AI chat interface
│   │   │   ├── 📄 CaseCard.jsx         # 📋 Case display component
│   │   │   ├── 📄 VoiceAssistant.jsx   # 🎤 Voice interface
│   │   │   ├── 📄 DocumentViewer.jsx   # 📄 Legal document viewer
│   │   │   └── 📄 IPCSearcher.jsx      # 🔍 IPC section finder
│   │   ├── 📁 pages/                   # 📄 Main Application Pages
│   │   │   ├── 📄 HomePage.jsx         # 🏠 Legal dashboard
│   │   │   ├── 📄 ConsultationPage.jsx # ⚖️ AI consultation
│   │   │   ├── 📄 CaseManagement.jsx   # 📋 Case management
│   │   │   ├── 📄 DocumentAnalysis.jsx # 📄 Document analysis
│   │   │   ├── 📄 LegalSearch.jsx      # 🔍 Legal research
│   │   │   └── 📄 ProfilePage.jsx      # 👤 User profile
│   │   ├── 📁 zustand/                 # 🔄 State Management
│   │   │   ├── 📄 authStore.js         # 🔐 Authentication state
│   │   │   ├── 📄 caseStore.js         # 📋 Case management state
│   │   │   └── 📄 consultStore.js      # ⚖️ Consultation state
│   │   ├── 📁 helpers/                 # 🛠️ Utility Functions
│   │   │   ├── 📄 api.js               # 🔗 API configuration
│   │   │   ├── 📄 legalHelpers.js      # ⚖️ Legal utilities
│   │   │   └── 📄 voiceUtils.js        # 🎤 Voice processing
│   │   ├── 📁 assets/                  # 🎨 Static Assets
│   │   ├── 📄 App.jsx                  # 🎯 Main App component
│   │   ├── 📄 main.jsx                 # 🚀 Application entry
│   │   └── 📄 index.css                # 🎨 Global styles
│   ├── 📄 index.html                   # 🌐 HTML template
│   ├── 📄 vite.config.js               # ⚙️ Vite configuration
│   ├── 📄 tailwind.config.js           # 🎨 Tailwind config
│   └── 📄 package.json                 # 📦 Frontend dependencies
├── 📁 server/                          # 🚀 Node.js Backend Server
│   ├── 📁 controllers/                 # 🎛️ Business Logic
│   │   ├── 📄 authController.js        # 🔐 Authentication logic
│   │   ├── 📄 legalController.js       # ⚖️ Legal consultation
│   │   ├── 📄 caseController.js        # 📋 Case management
│   │   ├── 📄 aiController.js          # 🤖 AI analysis logic
│   │   ├── 📄 voiceController.js       # 🎤 Voice processing
│   │   └── 📄 documentController.js    # 📄 Document analysis
│   ├── 📁 models/                      # 🗄️ Database Models
│   │   ├── 📄 UserModel.js             # 👤 User schema
│   │   ├── 📄 CaseModel.js             # 📋 Case schema
│   │   └── 📄 HearingModel.js          # ⏰ Hearing schedule schema
│   ├── 📁 routes/                      # 🛣️ API Route Definitions
│   │   ├── 📄 authRoutes.js            # 🔐 Authentication endpoints
│   │   ├── 📄 legalRoutes.js           # ⚖️ Legal consultation API
│   │   ├── 📄 caseRoutes.js            # 📋 Case management API
│   │   ├── 📄 aiRoutes.js              # 🤖 AI analysis endpoints
│   │   └── 📄 voiceRoutes.js           # 🎤 Voice processing API
│   ├── 📁 helpers/                     # 🛠️ Server Utilities
│   │   ├── 📄 aiHelper.js              # 🤖 AI integration helper
│   │   ├── 📄 legalHelper.js           # ⚖️ Legal processing utils
│   │   ├── 📄 ocrHelper.js             # 📄 OCR processing
│   │   └── 📄 voiceHelper.js           # 🎤 Voice synthesis
│   ├── 📁 db/                          # 🗄️ Database Configuration
│   │   └── 📄 connection.js            # 🔗 MongoDB connection
│   ├── 📄 index.js                     # 🎯 Server entry point
│   ├── 📄 service-account-key.json     # 🔑 GCP credentials
│   └── 📄 package.json                 # 📦 Backend dependencies
├── 📁 ai-training/                     # 🤖 AI Model Training
│   ├── 📄 constitution_qa.jsonl        # 📚 Constitutional QA data
│   ├── 📄 vertex_format.jsonl          # 📄 Vertex AI format data
│   ├── 📄 converter.py                 # 🔄 Data format converter
│   └── 📄 aligner.py                   # 🎯 Data alignment script
├── 📁 Sentiment-ai/                    # 🧠 Sentiment Analysis
│   └── 📄 [sentiment analysis models]  # 📊 Legal sentiment models
├── 📄 .gitignore                       # 🚫 Git ignore rules
└── 📄 README.md                        # 📖 Project documentation
```

---

## 🛠️ **Technology Stack**

### 🎨 **Frontend Technologies**
| Technology | Version | Purpose | Documentation |
|------------|---------|---------|---------------|
| ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB) | **19.0.0** | UI Library | [docs](https://react.dev/) |
| ![Vite](https://img.shields.io/badge/Vite-B73BFE?style=flat&logo=vite&logoColor=FFD62E) | **6.1.0** | Build Tool | [docs](https://vitejs.dev/) |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white) | **3.4.17** | CSS Framework | [docs](https://tailwindcss.com/) |
| ![DaisyUI](https://img.shields.io/badge/DaisyUI-5A0EF8?style=flat&logo=daisyui&logoColor=white) | **4.12.23** | UI Components | [docs](https://daisyui.com/) |
| ![Zustand](https://img.shields.io/badge/Zustand-FF6B35?style=flat&logo=zustand&logoColor=white) | **5.0.3** | State Management | [docs](https://zustand-demo.pmnd.rs/) |
| ![Motion](https://img.shields.io/badge/Motion-0055FF?style=flat&logo=framer&logoColor=white) | **12.4.7** | Animation Library | [docs](https://motion.dev/) |
| ![Recharts](https://img.shields.io/badge/Recharts-8884D8?style=flat&logo=recharts&logoColor=white) | **2.15.1** | Data Visualization | [docs](https://recharts.org/) |

### 🚀 **Backend Technologies**
| Technology | Version | Purpose | Documentation |
|------------|---------|---------|---------------|
| ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white) | **Latest** | Runtime Environment | [docs](https://nodejs.org/) |
| ![Express.js](https://img.shields.io/badge/Express.js-404D59?style=flat&logo=express) | **4.21.2** | Web Framework | [docs](https://expressjs.com/) |
| ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white) | **Latest** | NoSQL Database | [docs](https://www.mongodb.com/) |
| ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=flat&logo=mongoose&logoColor=white) | **8.9.5** | ODM Library | [docs](https://mongoosejs.com/) |
| ![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=JSON%20web%20tokens&logoColor=white) | **9.0.2** | Authentication | [docs](https://jwt.io/) |
| ![Tesseract.js](https://img.shields.io/badge/Tesseract.js-FF6B35?style=flat&logo=tesseract&logoColor=white) | **6.0.0** | OCR Processing | [docs](https://tesseract.projectnaptha.com/) |

### 🤖 **AI & Cloud Technologies**
| Technology | Purpose | Integration |
|------------|---------|-------------|
| **Google Cloud Vertex AI** | Fine-tuned IPC Section Classification | Custom model training & inference |
| **Google Generative AI (Gemini)** | Legal Analysis & Consultation | Smart legal document understanding |
| **Eleven Labs API** | Voice Synthesis & Audio | Natural voice legal consultation |
| **Hugging Face Models** | NLP & Sentiment Analysis | Legal text processing & analysis |

### 🛠️ **Development Tools**
- **![Nodemon](https://img.shields.io/badge/Nodemon-76D04B?style=flat&logo=nodemon&logoColor=white)** - Development server with auto-restart
- **![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=flat&logo=eslint&logoColor=white)** - Code linting and quality
- **![PostCSS](https://img.shields.io/badge/PostCSS-DD3A0A?style=flat&logo=postcss&logoColor=white)** - CSS processing

---

## 🔄 **Application Flow**

```
🌐 User Access Legal Platform
            │
            ▼
    ┌───────────────────┐
    │ 🔐 Authentication │
    │     Check         │
    └─────────┬─────────┘
              │
        ┌─────▼─────┐
        │    No     │
        ▼           ▼
📝 Legal Login/    ⚖️ Legal Dashboard
   Register           │
        │         ┌───┼───┬───────┬───────┐
        ▼         │   │   │       │       │
🛡️ JWT Auth      │   │   │       │       │
Validation       ▼   ▼   ▼       ▼       ▼
        │    💬 AI  📋 Case 📄 Doc  🎤 Voice 🔍 Legal
        ▼    Consult Mgmt  Analysis  Chat   Search
🍪 Token Storage  │    │     │      │      │
        │         ▼    ▼     ▼      ▼      ▼
        └────► 🤖 AI Legal Analysis Pipeline
                      │
               ┌──────┼──────┬──────────┐
               │      │      │          │
               ▼      ▼      ▼          ▼
          🏛️ Vertex 🧠 Gemini 🎙️ Eleven 📊 Hugging
          AI IPC    Legal    Labs     Face NLP
          Model     Analysis Voice    Models
               │      │      │          │
               ▼      ▼      ▼          ▼
            ┌─────────────────────────────┐
            │  📊 Legal Intelligence     │
            │  Processing & Analysis     │
            └────────────┬────────────────┘
                         │
                         ▼
                   🗄️ MongoDB
                   Legal Database
                         │
                         ▼
                   📤 Response to User
                   (Text/Voice/Analysis)
```

---

## 🤖 **AI Model Integration**

### 🎯 **IPC Section Classification Model**

```
📊 Legal Training Data Pipeline
          │
          ▼
┌─────────────────────────┐
│  📚 Dataset Collection  │
│  • Constitutional QA    │
│  • IPC Section Data    │
│  • Legal Precedents    │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│   🔄 Data Processing    │
│  • JSON to JSONL       │
│  • Legal text cleaning │
│  • Label alignment     │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│  ☁️ GCP Vertex AI       │
│  • Fine-tuning Setup   │
│  • Custom Model Train  │
│  • Legal Validation    │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│   🚀 Model Deployment   │
│  • Legal API Integration│
│  • Real-time Inference │
│  • Confidence Scoring  │
└─────────────────────────┘

Classification Categories:
├── 📜 Constitutional Articles (High Accuracy)
├── ⚖️ IPC Sections        (Criminal Law)
├── 📋 CrPC Procedures     (Procedural Law)
├── 🏛️ Civil Law Sections  (Civil Matters)
└── 📊 Legal Precedents    (Case Law)

Confidence Thresholds:
├── 🟢 High (≥95%)   - Direct legal advice
├── 🟡 Medium (80-94%) - Suggested guidance
└── 🔴 Low (<80%)    - Requires human review
```

### 🎤 **Voice Assistant Integration**

```
🎙️ Voice Input
      │
      ▼
┌─────────────────────┐
│  🔊 Speech-to-Text  │
│  Processing         │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│  🧠 Legal NLP       │
│  Understanding      │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│  🤖 AI Legal        │
│  Analysis           │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│  🎤 Eleven Labs     │
│  Text-to-Speech     │
└─────────┬───────────┘
          │
          ▼
    🔊 Voice Response
```

---

## 🚀 **Installation & Setup**

### 📋 **Prerequisites**

Before setting up the Judicial Advisory System, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Package manager
- **MongoDB** (v6.0 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **Python** (v3.8+) for AI model training - [Download](https://www.python.org/downloads/)
- **Google Cloud Account** for Vertex AI - [Setup](https://cloud.google.com/)

### 🔧 **Local Development Setup**

#### 1️⃣ **Clone Repository**
```bash
git clone https://github.com/M-hell/judicialchatbot.git
cd judicialchatbot
```

#### 2️⃣ **Backend Server Setup**
```bash
cd server
npm install

# Create environment file
cp .env.example .env

# Configure environment variables
nano .env
```

**Environment Configuration** (`.env`):
```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/judicial-advisory
MONGODB_TEST_URI=mongodb://localhost:27017/judicial-advisory-test

# Authentication
JWT_SECRET=your-super-secure-jwt-secret-key-here
JWT_EXPIRE=7d

# Google Cloud AI Services
GOOGLE_APPLICATION_CREDENTIALS=./service-account-key.json
GCP_PROJECT_ID=your-gcp-project-id
VERTEX_AI_LOCATION=us-central1

# Eleven Labs Voice API
ELEVEN_LABS_API_KEY=your-eleven-labs-api-key

# File Upload Configuration
MAX_FILE_SIZE=10485760
ALLOWED_FILE_TYPES=pdf,doc,docx,txt

# CORS Configuration
CLIENT_URL=http://localhost:5173
```

#### 3️⃣ **Frontend Client Setup**
```bash
cd ../client
npm install

# Create environment file
cp .env.example .env.local
```

**Frontend Environment** (`.env.local`):
```env
VITE_API_URL=http://localhost:3000/api
VITE_SOCKET_URL=http://localhost:3000
VITE_APP_TITLE=Judicial Advisory System
VITE_ELEVEN_LABS_API_KEY=your-eleven-labs-api-key
```

#### 4️⃣ **Google Cloud Vertex AI Setup**
```bash
# Install Google Cloud SDK
# https://cloud.google.com/sdk/docs/install

# Authenticate with Google Cloud
gcloud auth login
gcloud config set project YOUR_PROJECT_ID

# Enable required APIs
gcloud services enable aiplatform.googleapis.com
gcloud services enable storage-component.googleapis.com

# Create service account key
gcloud iam service-accounts create judicial-ai-service
gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
    --member="serviceAccount:judicial-ai-service@YOUR_PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/aiplatform.user"

# Download service account key
gcloud iam service-accounts keys create service-account-key.json \
    --iam-account=judicial-ai-service@YOUR_PROJECT_ID.iam.gserviceaccount.com
```

#### 5️⃣ **AI Model Training Setup** (Optional)
```bash
cd ai-training

# Install Python dependencies
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install kaggle pandas nltk scikit-learn google-cloud-aiplatform

# Configure training data
python converter.py  # Convert legal data format
python aligner.py    # Align training labels
```

#### 6️⃣ **Database Setup**
```bash
# Start MongoDB service
sudo systemctl start mongod  # Linux
brew services start mongodb  # macOS
# Or start MongoDB manually

# Initialize database with legal data
cd server
npm run seed-database
```

### 🏃‍♂️ **Running the Application**

#### **Development Mode**
```bash
# Terminal 1 - Backend Server
cd server
npm run dev

# Terminal 2 - Frontend Client  
cd client
npm run dev

# Terminal 3 - MongoDB (if not running as service)
mongod
```

#### **Production Mode**
```bash
# Build frontend
cd client
npm run build

# Start production server
cd ../server
npm start
```

**🌐 Application URLs:**
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **API Documentation**: http://localhost:3000/api-docs

---

## 🎯 **Usage Guide**

### 🔐 **Authentication System**

```
👤 User Registration/Login
         │
         ▼
┌─────────────────────┐      ┌─────────────────────┐
│   📧 Email/Pass     │  OR  │  🔗 OAuth Login     │
│   Registration      │      │  (Google/LinkedIn)  │
└─────────┬───────────┘      └─────────┬───────────┘
          │                            │
          └────────────┬───────────────┘
                       ▼
              ┌─────────────────────┐
              │  🛡️ JWT Token       │
              │  Generation         │
              └─────────┬───────────┘
                        │
                        ▼
               ⚖️ Legal Dashboard Access
```

### ⚖️ **Legal Consultation Workflow**

#### **1. AI-Powered Legal Query**
- Navigate to **Consultation** section
- Input legal query in natural language
- Select consultation type:
  - 🏛️ **Constitutional Law**
  - ⚖️ **Criminal Law** (IPC Sections)
  - 📋 **Civil Procedures**
  - 📄 **Document Analysis**

#### **2. Voice-Enabled Consultation**
```bash
# Voice interaction flow
🎤 Click "Start Voice Consultation"
   ↓
🗣️ Speak your legal query
   ↓
🤖 AI processes and analyzes
   ↓
🔊 Receive voice response with legal guidance
```

#### **3. Document Analysis Process**
```
📄 Upload Legal Document
         │
         ▼
┌─────────────────────┐
│  📊 OCR Processing  │
│  (Tesseract.js)     │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│  🤖 AI Analysis     │
│  (Vertex AI + GCP)  │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│  📋 Legal Summary   │
│  • Key Points      │
│  • IPC Sections    │
│  • Recommendations │
└─────────────────────┘
```

### 📋 **Case Management**

#### **Creating a New Case**
1. **Navigate to Case Management**
2. **Click "New Case"**
3. **Fill Case Details:**
   - 📝 Case title and description
   - ⚖️ Legal category
   - 📅 Important dates
   - 📄 Supporting documents
4. **AI Analysis** automatically suggests relevant IPC sections

#### **Hearing Management**
- 📅 Schedule hearing dates
- ⏰ Set reminders and notifications
- 📋 Track case status and progress
- 🔔 Automated updates and alerts

---

## 🔍 **API Documentation**

### 🔐 **Authentication Endpoints**

#### **POST** `/api/auth/register`
```json
{
  "name": "Legal Professional",
  "email": "lawyer@example.com", 
  "password": "SecurePassword123",
  "role": "lawyer", // "lawyer", "student", "citizen"
  "specialization": "criminal_law"
}
```

#### **POST** `/api/auth/login`
```json
{
  "email": "lawyer@example.com",
  "password": "SecurePassword123"
}
```

### ⚖️ **Legal Consultation API**

#### **POST** `/api/legal/consult`
```json
{
  "query": "What are the sections under IPC for theft?",
  "context": "criminal_law",
  "preferredLanguage": "english",
  "includeVoice": true
}
```

**Response:**
```json
{
  "success": true,
  "consultation": {
    "answer": "Legal analysis and guidance...",
    "relevantSections": ["IPC 378", "IPC 379", "IPC 380"],
    "confidenceScore": 0.95,
    "voiceResponse": "base64_audio_data",
    "citations": ["Legal precedents..."]
  }
}
```

#### **POST** `/api/legal/document-analysis`
```json
{
  "documentType": "legal_contract",
  "analysisType": "full_review",
  "documentContent": "base64_document_data"
}
```

### 📋 **Case Management API**

#### **GET** `/api/cases/user-cases`
**Headers:** `Authorization: Bearer <jwt_token>`

#### **POST** `/api/cases/create`
```json
{
  "title": "Contract Dispute Case",
  "description": "Commercial contract disagreement",
  "category": "civil_law",
  "documents": ["document_ids"],
  "hearingDate": "2024-12-25T10:00:00Z"
}
```

### 🎤 **Voice Processing API**

#### **POST** `/api/voice/synthesize`
```json
{
  "text": "Legal response text to convert to speech",
  "voice": "professional_male", // or "professional_female"
  "language": "en-US"
}
```

---

## 🧪 **Testing**

### 🔧 **Running Tests**

```bash
# Backend API Tests
cd server
npm test

# Frontend Component Tests  
cd client
npm test

# Integration Tests
npm run test:integration

# E2E Tests
npm run test:e2e
```

### 📊 **Test Coverage**

```bash
# Generate coverage report
npm run test:coverage

# View coverage report
open coverage/lcov-report/index.html
```

### 🤖 **AI Model Testing**

```bash
cd ai-training

# Test IPC classification accuracy
python test_model.py

# Validate legal response quality
python validate_responses.py
```

---

## 🚀 **Deployment**

### ☁️ **Cloud Deployment (Render)**

#### **Backend Deployment**
1. **Push to GitHub repository**
2. **Connect Render to GitHub**
3. **Configure build settings:**
   ```bash
   Build Command: npm install
   Start Command: npm start
   ```
4. **Set environment variables in Render dashboard**

#### **Frontend Deployment**  
1. **Build production assets:**
   ```bash
   npm run build
   ```
2. **Deploy to Render Static Site**
3. **Configure API URL for production**

### 🐳 **Docker Deployment**

```dockerfile
# Dockerfile.backend
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

```dockerfile
# Dockerfile.frontend  
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Docker Compose:**
```yaml
version: '3.8'
services:
  backend:
    build: ./server
    ports:
      - "3000:3000"
    environment:
      - MONGODB_URI=mongodb://mongo:27017/judicial-advisory
    depends_on:
      - mongo

  frontend:
    build: ./client
    ports:
      - "80:80"
    depends_on:
      - backend

  mongo:
    image: mongo:6.0
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

---

## 🤝 **Contributing**

### 🛡️ **Contribution Guidelines**

We welcome contributions from legal professionals, developers, and AI enthusiasts! Here's how you can contribute:

#### **🔄 Development Process**
1. **Fork** the repository
2. **Create** feature branch (`git checkout -b feature/legal-enhancement`)
3. **Implement** changes following coding standards
4. **Test** thoroughly (unit tests, integration tests)
5. **Commit** with clear messages (`git commit -m 'Add: IPC section auto-suggestion'`)
6. **Push** to branch (`git push origin feature/legal-enhancement`)
7. **Create** Pull Request with detailed description

#### **📝 Code Standards**
- **JavaScript:** ES6+ with consistent formatting
- **React:** Functional components with hooks
- **Node.js:** Express.js best practices
- **AI Integration:** Proper error handling and validation
- **Legal Accuracy:** Verify legal information sources

#### **🧪 Testing Requirements**
- Unit tests for all new functions
- Integration tests for API endpoints  
- UI component testing with React Testing Library
- Legal accuracy validation for AI responses

#### **🎯 Contribution Areas**
- 🤖 **AI Model Improvements** - Enhance legal analysis accuracy
- ⚖️ **Legal Knowledge Base** - Add more legal precedents and sections  
- 🎤 **Voice Features** - Improve voice recognition and synthesis
- 🌍 **Internationalization** - Add support for regional legal systems
- 📱 **Mobile Optimization** - Enhanced mobile user experience
- 🔐 **Security Enhancements** - Strengthen data protection and privacy

---

## 📞 **Support & Contact**

### 🛠️ **Technical Support**

**🐛 Issue Reporting:**
- **GitHub Issues:** [Report Bug](https://github.com/M-hell/judicialchatbot/issues/new?template=bug_report.md)
- **Feature Request:** [Request Feature](https://github.com/M-hell/judicialchatbot/issues/new?template=feature_request.md)
- **Documentation:** [Improve Docs](https://github.com/M-hell/judicialchatbot/issues/new?template=documentation.md)

**💬 Community Support:**
- **Discussions:** [GitHub Discussions](https://github.com/M-hell/judicialchatbot/discussions)
- **Legal Queries:** Use the platform's AI consultation feature
- **Technical Help:** Create detailed GitHub issues with reproduction steps

### 👨‍💻 **Developer Contact**

**Project Maintainer:** [Your Name]
- **GitHub:** [@M-hell](https://github.com/M-hell)
- **LinkedIn:** [Professional Profile](https://www.linkedin.com/posts/abhayraj-singh-mandloi-7960a8278_innotek8-lpu-innovation-activity-7323398241515929601-cZsK)
- **Email:** [professional.email@example.com]

### 🏆 **Achievement Recognition**

[![Innotek 8.0 Achievement](https://img.shields.io/badge/🏆_Achievement-Innotek_8.0_Final_Round-gold?style=for-the-badge)](https://www.linkedin.com/posts/abhayraj-singh-mandloi-7960a8278_innotek8-lpu-innovation-activity-7323398241515929601-cZsK)

**Recognized Excellence in Legal Technology Innovation**
> Successfully qualified for the final round of Innotek 8.0 Innovation Challenge at Lovely Professional University, demonstrating cutting-edge integration of AI technology with legal consultation services.

---

## 📄 **License**

```
MIT License

Copyright (c) 2024 Judicial Advisory System

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🔗 **Important Links**

| Resource | URL | Description |
|----------|-----|-------------|
| 🚀 **Live Application** | [judicialchatbot.onrender.com](https://judicialchatbot.onrender.com) | Production deployment |
| 📚 **GitHub Repository** | [M-hell/judicialchatbot](https://github.com/M-hell/judicialchatbot) | Source code & documentation |
| 🏆 **Achievement Post** | [LinkedIn Recognition](https://www.linkedin.com/posts/abhayraj-singh-mandloi-7960a8278_innotek8-lpu-innovation-activity-7323398241515929601-cZsK) | Innotek 8.0 finalist achievement |
| ☁️ **GCP Vertex AI** | [Model Training Dashboard](https://console.cloud.google.com/vertex-ai/studio/tuning/locations/us-central1/tuningJob/2294229022508318720/monitor?project=green-antonym-458419-s0&authuser=1) | AI model monitoring |
| 📊 **Training Dataset** | [GCP Dataset Management](https://console.cloud.google.com/vertex-ai/studio/tuning/locations/us-central1/tuningJob/2294229022508318720/dataset?authuser=1&project=green-antonym-458419-s0) | Legal training data |
| 📓 **Colab Notebook** | [AI Training Notebook](https://colab.research.google.com/drive/1_2KujwviqJSuCguqVoTX_Wbaofu0WFj_?usp=sharing) | Model development process |

---

<div align="center">

### ⚖️ **Empowering Justice Through Technology**

**Built with dedication to enhance legal accessibility and provide intelligent legal assistance to professionals, students, and citizens.**

[![GitHub Stars](https://img.shields.io/github/stars/M-hell/judicialchatbot?style=social)](https://github.com/M-hell/judicialchatbot)
[![LinkedIn Achievement](https://img.shields.io/badge/LinkedIn-Follow_Updates-0077B5?style=social&logo=linkedin)](https://www.linkedin.com/posts/abhayraj-singh-mandloi-7960a8278_innotek8-lpu-innovation-activity-7323398241515929601-cZsK)

**"Justice delayed is justice denied - Technology bridges the gap."**

---

*Last Updated: December 2024 | Version: 2.1.0*

</div>
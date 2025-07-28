# Kakitori Project Setup Guide

Complete setup instructions for the Kakitori Japanese language learning platform. This project consists of a React frontend (KakitoriAPP) and FastAPI backend (KakitoriSVC).

## 🏗️ Technology Stack

### Frontend (KakitoriAPP)
- **Framework:** React 19.1.0 with Vite 6.3.5
- **UI Library:** Material-UI (MUI) 7.1.1 + Emotion styling
- **Routing:** React Router DOM 7.6.1
- **HTTP Client:** Axios 1.10.0
- **Authentication:** Google OAuth (@react-oauth/google 0.12.2)
- **Build Tool:** Vite with React plugin
- **Linting:** ESLint with React hooks plugin
- **Development Server:** Vite dev server (typically port 5173)

### Backend (KakitoriSVC)
- **Framework:** FastAPI with uvicorn server
- **Database:** PostgreSQL 15+ with SQLAlchemy 2.0 ORM
- **Caching:** Redis 7+ for session storage and caching
- **Migrations:** Alembic for database schema management
- **Authentication:** JWT tokens + Google OAuth 2.0
- **Data Validation:** Pydantic models and schemas
- **API Documentation:** Automatic OpenAPI/Swagger generation
- **Containerization:** Docker & Docker Compose
- **Code Quality:** Black (formatter), flake8 (linter), mypy (type checking)

### Infrastructure & DevOps
- **Containerization:** Docker with multi-service Docker Compose
- **Database:** PostgreSQL 15 with persistent volumes
- **Cache:** Redis 7 Alpine with persistent volumes
- **Development:** Hot reload for both frontend and backend
- **Environment Management:** .env files for configuration
- **Health Checks:** Built-in health monitoring for all services

## 📋 Prerequisites

Install these tools before starting:

### Required Software
1. **Python 3.11+**
   - Download: https://www.python.org/downloads/
   - Required version: Python 3.11 or later
   - Verify installation: `python --version` or `python3 --version`
   - Make sure pip is included: `pip --version`

2. **Docker Desktop**
   - Download: https://www.docker.com/products/docker-desktop/
   - Required for backend services (PostgreSQL, Redis, FastAPI)
   - Verify installation: `docker --version` and `docker-compose --version`

3. **Node.js & npm**
   - Download: https://nodejs.org/ (LTS version recommended)
   - Required version: Node.js 18.x or later
   - Verify installation: `node -v` and `npm -v`

4. **Git**
   - Download: https://git-scm.com/downloads
   - Verify installation: `git --version`

5. **Code Editor (Recommended: VS Code)**
   - Download: https://code.visualstudio.com/

### Optional but Recommended
- **PostgreSQL client** (for direct database access)
- **Redis CLI** (for cache inspection)

## 🚀 Project Setup

### Step 1: Clone the Repositories

```bash
# Create project directory
mkdir kakitori-project
cd kakitori-project

# Clone both repositories
git clone <FRONTEND_REPO_URL> KakitoriAPP
git clone <BACKEND_REPO_URL> KakitoriSVC

# Your directory structure should look like:
# kakitori-project/
# ├── KakitoriAPP/    (React frontend)
# └── KakitoriSVC/    (FastAPI backend)
```

### Step 2: VS Code Workspace Setup (Recommended)

For the best development experience, set up VS Code to work with both repositories:

**Option A: Multi-root Workspace (Recommended)**
1. Open VS Code
2. Open the `KakitoriAPP` folder: `File → Open Folder → Select KakitoriAPP`
3. Add the backend to workspace: `File → Add Folder to Workspace → Select KakitoriSVC`
4. Save the workspace: `File → Save Workspace As → kakitori-workspace.code-workspace`

**Option B: Single Root (Alternative)**
- If you put both repos in a `kakitori-project` folder, just open that entire folder in VS Code

### Step 3: Environment Configuration

Before setting up the services, you need to create environment files for both frontend and backend with the provided API keys.

#### Backend Environment Variables

Create a `.env` file in the `KakitoriSVC` directory with the following template:

```bash
# Database Configuration
DATABASE_URL=postgresql://kakitori:password@localhost:5432/kakitori_db
DATABASE_TEST_URL=postgresql://kakitori:password@localhost:5432/kakitori_test_db

# Redis Configuration  
REDIS_URL=redis://localhost:6379/0

# Security
SECRET_KEY=your-super-secret-key-change-this-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# OAuth (Use the provided Google OAuth credentials)
GOOGLE_CLIENT_ID=your-provided-google-client-id
GOOGLE_CLIENT_SECRET=your-provided-google-client-secret

# Application Settings
DEBUG=True
ENVIRONMENT=development
FRONTEND_URL=http://localhost:5173
API_V1_STR=/api/v1
PROJECT_NAME=KakitoriSVC

# AI Services (Use the provided API keys)
OPENAI_API_KEY=your-provided-openai-api-key
ANTHROPIC_API_KEY=your-provided-anthropic-api-key
```

#### Frontend Environment Variables

Create a `.env` file in the `KakitoriAPP` directory:

```bash
# Google OAuth Configuration (Use the same credentials as backend)
VITE_GOOGLE_CLIENT_ID=your-provided-google-client-id
VITE_GOOGLE_CLIENT_SECRET=your-provided-google-client-secret

# Backend API URL
VITE_API_URL=http://localhost:8000

# AI Services (Use the provided API keys)
OPENAI_API_KEY=your-provided-openai-api-key
ANTHROPIC_API_KEY=your-provided-anthropic-api-key
```

**Important:** Replace the placeholder values with the actual API keys and credentials provided to you. The Google Client ID and Secret should match between frontend and backend files.

### Step 4: Backend Setup (KakitoriSVC)

#### Important: Start Docker Desktop First

**⚠️ Before proceeding, make sure Docker Desktop is launched and running on your system!**

Check that Docker is ready:
```bash
docker --version
docker-compose --version
```

#### First-Time Setup (Complete Environment)

```bash
# Make sure you're in KakitoriSVC directory
# Docker handles all Python dependencies automatically

# Windows (PowerShell/Command Prompt)
./init.bat

# Linux/macOS (Terminal)
chmod +x ./init.sh
./init.sh
```

This script will:
1. Start PostgreSQL and Redis containers
2. Build the FastAPI application container
3. Wait for database connectivity
4. Generate and apply database migrations
5. Seed initial data (Kanji, JLPT data, etc.)
6. Start the API server

**Takes 2-3 minutes on first run**

#### Daily Development (Quick Start)

For subsequent development sessions:

```bash
# Windows
./start.bat

# Linux/macOS
./start.sh
```

**Takes ~30 seconds**

### Step 5: Frontend Setup (KakitoriAPP)

```bash
# Navigate to frontend directory
cd ../KakitoriAPP

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🌐 Service URLs

Once everything is running:

| Service | URL | Description |
|---------|-----|-------------|
| **Frontend** | http://localhost:5173 | React app (Vite dev server) |
| **Backend API** | http://localhost:8000 | FastAPI server |
| **API Documentation** | http://localhost:8000/docs | Interactive Swagger UI |
| **Alternative API Docs** | http://localhost:8000/redoc | ReDoc documentation |
| **PostgreSQL** | localhost:5432 | Database (user: kakitori, password: password) |
| **Redis** | localhost:6379 | Cache server |

## 🔧 Development Workflow

### Frontend Development

```bash
cd KakitoriAPP

# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Backend Development

```bash
cd KakitoriSVC

# View running services
docker-compose ps

# View logs
docker-compose logs -f api          # API logs
docker-compose logs -f postgres     # Database logs
docker-compose logs -f redis        # Redis logs

# Access database directly
docker exec -it kakitori_postgres psql -U kakitori -d kakitori_db

# Access Redis CLI
docker exec -it kakitori_redis redis-cli

# Database migrations
docker-compose exec api alembic upgrade head
docker-compose exec api alembic revision --autogenerate -m "Description"

# Execute Python commands inside the container
docker-compose exec api python -c "print('Hello from container')"

# Access container shell for debugging
docker-compose exec api bash
```

### Stop Services

```bash
# Stop backend services
cd KakitoriSVC
./stop.bat  # Windows
./stop.sh   # Linux/macOS

# Stop frontend (Ctrl+C in terminal where npm run dev is running)
```

### Clean Reset (Nuclear Option)

If you need to completely reset the backend:

```bash
cd KakitoriSVC

# ⚠️ WARNING: This deletes ALL data including database!
./clean.bat  # Windows
./clean.sh   # Linux/macOS

# Then run init again
./init.bat   # Windows
./init.sh    # Linux/macOS
```

## 🧪 Testing

*Note: Testing framework is planned for future implementation.*

## 📦 Project Dependencies

### Frontend Dependencies (package.json)
- **React Ecosystem:** react@19.1.0, react-dom@19.1.0, react-router-dom@7.6.1
- **UI Framework:** @mui/material@7.1.1, @mui/icons-material@7.1.1
- **Styling:** @emotion/react@11.14.0, @emotion/styled@11.14.0
- **HTTP Client:** axios@1.10.0
- **Authentication:** @react-oauth/google@0.12.2
- **Build Tools:** vite@6.3.5, @vitejs/plugin-react@4.4.1
- **Code Quality:** eslint@9.25.0, @types/react@19.1.2

### Backend Dependencies (requirements.txt)
- **Framework:** fastapi[standard]
- **Database:** sqlalchemy, psycopg2-binary, alembic
- **Data Validation:** pydantic, pydantic-settings
- **Authentication:** python-jose[cryptography], passlib[bcrypt]
- **Environment:** python-dotenv
- **Cache:** redis
- **HTTP Client:** httpx
- **Google Auth:** google-auth, google-auth-oauthlib, google-auth-httplib2
- **AI Integration:** anthropic
- **File Upload:** python-multipart

### Development Dependencies (requirements-dev.txt)
- **Code Quality:** black@23.11.0, flake8@6.1.0, mypy@1.7.1
- **Git Hooks:** pre-commit@3.6.0
- **HTTP Testing:** httpx@0.25.2

## 🚨 Troubleshooting

### Common Issues

**Port conflicts:**
```bash
# Check what's using ports 5173, 8000, 5432, 6379
netstat -ano | findstr :8000  # Windows
lsof -i :8000                 # Linux/macOS

# Stop conflicting services
docker-compose down
```

**Database connection errors:**
```bash
# Check container status
docker ps

# View database logs
docker-compose logs postgres

# Reset database (⚠️ destroys data)
docker-compose down -v
./init.bat  # or ./init.sh
```

**Docker Desktop not running:**
```bash
# Make sure Docker Desktop is launched and running
# Check Docker status
docker --version
docker info

# If Docker is not running, start Docker Desktop application
# Wait for Docker to fully start before proceeding
```

**Frontend module not found errors:**
```bash
# Clear node_modules and reinstall
cd KakitoriAPP
rm -rf node_modules package-lock.json
npm install
```

**Build failures:**
```bash
# Clean Docker cache and rebuild
docker system prune -a
./clean.bat  # or ./clean.sh
./init.bat   # or ./init.sh
```

**Permission errors (Linux/macOS):**
```bash
# Make scripts executable
chmod +x *.sh
```

### Development Tips

1. **API Documentation:** Always refer to http://localhost:8000/docs for current API endpoints
2. **Hot Reload:** Both frontend (Vite) and backend (FastAPI) support hot reload
3. **Docker Development:** All backend development happens inside Docker containers for consistency
4. **Database Admin:** Use tools like pgAdmin or connect directly via psql
5. **Redis Inspection:** Use Redis CLI or Redis Desktop Manager
6. **Log Monitoring:** Use `docker-compose logs -f [service]` to monitor real-time logs
7. **Environment Switching:** Use different .env files for different environments
8. **Container Access:** Use `docker-compose exec api bash` to access the API container shell for debugging

### Performance Notes

- **Frontend:** Vite provides extremely fast hot reload and building
- **Backend:** FastAPI automatically generates OpenAPI docs and provides async performance
- **Database:** PostgreSQL with connection pooling and optimized indexes
- **Cache:** Redis for session storage and frequently accessed data
- **Docker:** All services use health checks for robust startup and monitoring

## 📚 Additional Resources

- **FastAPI Documentation:** https://fastapi.tiangolo.com/
- **React Documentation:** https://react.dev/
- **Vite Documentation:** https://vitejs.dev/
- **Material-UI Documentation:** https://mui.com/
- **PostgreSQL Documentation:** https://www.postgresql.org/docs/
- **Docker Compose Documentation:** https://docs.docker.com/compose/

## 🤝 Contributing

1. Create feature branches from main
2. Follow code quality standards (Black, ESLint)
3. Add tests for new features
4. Update documentation as needed
5. Use conventional commit messages
6. Ensure all services start successfully

---

**Note:** This setup guide assumes you're working in a development environment. For production deployment, additional configuration for environment variables, SSL certificates, and production-grade databases would be required.
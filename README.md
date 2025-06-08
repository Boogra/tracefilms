# TraceFilms - Digital Stronghold

A password-gated creative portal with cinematic design, manual user approval system, and integrated SceneForge tool for visual storyboarding.

## 🎬 Overview

TraceFilms is a secure, elegant digital stronghold designed for creative professionals. It features a beautiful tree-logo banner gateway, complete user management system, and embedded SceneForge for AI-powered storyboarding.

## 🏗️ Architecture

```
tracefilms/
├── frontend/          # React frontend with cinematic design
├── backend/           # Flask API with authentication & user management
├── sceneforge/        # Embedded SceneForge storyboarding tool
├── deployment/        # Vercel deployment configurations
└── README.md          # This file
```

## ✨ Features

### 🔐 Security & Access Control
- **Password-Protected Gateway**: Entire site locked behind authentication
- **Manual User Approval**: Admin controls all access requests
- **Session-Based Auth**: Secure login system with persistent sessions
- **Admin Panel**: Complete user management interface

### 🎨 Cinematic Design
- **Tree Logo Banner**: Elegant "TRACE - [Tree Logo] - FILMS" layout
- **Sanskrit Text**: Beautiful typography for headers
- **EB Garamond**: Professional body text
- **Earth Tones**: Colors sampled from the tree logo
- **Responsive Design**: Perfect on desktop and mobile

### 🛠️ Integrated Tools
- **SceneForge**: AI-powered storyboarding with video support
- **Runway Integration**: Video clip upload and preview
- **Asset Management**: Organized creative workflow
- **Export Capabilities**: PDF and Markdown export

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.11+
- MySQL database

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python src/main.py
```

### SceneForge Setup
```bash
cd sceneforge
npm install
npm run dev
```

## 🔧 Configuration

### Environment Variables

**Backend (.env)**
```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=tracefilms
DB_USERNAME=root
DB_PASSWORD=your_password
SECRET_KEY=your_secret_key
```

**Frontend**
Update API endpoints in `src/contexts/AuthContext.jsx` and `src/components/AdminPanel.jsx`

## 🌐 Deployment

### Vercel (Frontend)
1. Connect repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy from `frontend/` directory

### Backend Deployment
- Flask backend can be deployed to any Python hosting service
- Update CORS settings for production domain
- Configure database connection for production

## 👤 Default Admin Account

**Username:** vaughn  
**Email:** vaughn@southernprocurement.com  
**Password:** TraceFilms2024!

## 📱 Usage

### For Admins
1. Visit the site and click the tree banner
2. Login with admin credentials
3. Access Admin panel to manage users
4. Use SceneForge for creative work

### For New Users
1. Click "Request Access" on login modal
2. Wait for admin approval
3. Login once approved
4. Access portal tools

## 🎯 Key Components

### Frontend Components
- `LoginGateway.jsx` - Cinematic banner and login modal
- `Portal.jsx` - Main dashboard after login
- `AdminPanel.jsx` - User management interface
- `AuthContext.jsx` - Authentication state management

### Backend Routes
- `/api/auth/login` - User authentication
- `/api/auth/register` - New user registration
- `/api/admin/users` - User management
- `/api/admin/approve` - User approval

### SceneForge Features
- Visual storyboard management
- Video clip upload and preview
- AI prompt integration (MidJourney/Runway)
- Drag-and-drop scene reordering
- Export functionality

## 🔒 Security Features

- Session-based authentication
- CORS protection
- Input validation
- SQL injection prevention
- XSS protection
- Manual user approval workflow

## 🎨 Design Philosophy

TraceFilms embodies cinematic elegance with:
- Minimal, Scott Free-inspired design
- Mythic and reverent visual language
- Professional typography hierarchy
- Subtle animations and transitions
- Clean, focused user experience

## 📄 License

Private repository - All rights reserved.

## 🤝 Contributing

This is a private project. Access is controlled by the admin approval system.

---

**Built with passion for cinematic storytelling and creative collaboration.**


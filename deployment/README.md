# TraceFilms Deployment Guide

## 🚀 Vercel Deployment

### Frontend Deployment
1. Connect your GitHub repository to Vercel
2. Set the root directory to `frontend/`
3. Build command: `npm run build`
4. Output directory: `dist`
5. Install command: `npm install`

### Environment Variables (Vercel)
Set these in your Vercel dashboard:
```
VITE_API_BASE_URL=https://your-backend-url.com/api
NODE_ENV=production
```

### Custom Domain Setup
1. Add `tracefilms.io` as a custom domain in Vercel
2. Update DNS records as instructed by Vercel
3. SSL certificate will be automatically provisioned

## 🔧 Backend Deployment Options

### Option 1: Railway
1. Connect GitHub repository
2. Deploy from `backend/` directory
3. Set environment variables
4. Update CORS settings for your domain

### Option 2: Heroku
1. Create new Heroku app
2. Connect GitHub repository
3. Set buildpack to Python
4. Configure environment variables
5. Deploy from `backend/` branch

### Option 3: DigitalOcean App Platform
1. Create new app
2. Connect GitHub repository
3. Set source directory to `backend/`
4. Configure environment variables

## 🗄️ Database Setup

### Production Database Options
- **PlanetScale**: MySQL-compatible, serverless
- **Railway**: PostgreSQL with automatic backups
- **AWS RDS**: Managed MySQL/PostgreSQL
- **DigitalOcean Managed Databases**

### Database Migration
```sql
-- Run these commands in your production database
CREATE DATABASE tracefilms;
USE tracefilms;

-- Tables will be created automatically by Flask-SQLAlchemy
-- Admin user will be created on first run
```

## 🔐 Security Checklist

- [ ] Update SECRET_KEY for production
- [ ] Configure CORS for your domain only
- [ ] Set up SSL certificates
- [ ] Enable database backups
- [ ] Configure monitoring and logging
- [ ] Set up error tracking (Sentry)

## 📊 Monitoring

### Recommended Tools
- **Vercel Analytics**: Frontend performance
- **Sentry**: Error tracking
- **LogRocket**: User session recording
- **Uptime Robot**: Site monitoring

## 🔄 CI/CD Pipeline

### Automatic Deployment
1. Push to `main` branch triggers Vercel deployment
2. Backend can be configured for auto-deployment
3. Database migrations run automatically

### Testing
- Frontend: `npm run test`
- Backend: `python -m pytest`
- E2E: Cypress tests (optional)

## 📝 Post-Deployment

1. Test login functionality
2. Verify SceneForge integration
3. Test user registration and approval flow
4. Check admin panel functionality
5. Verify mobile responsiveness
6. Test all export features

## 🚨 Troubleshooting

### Common Issues
- **CORS errors**: Update backend CORS settings
- **Database connection**: Check environment variables
- **Build failures**: Verify Node.js version compatibility
- **API errors**: Check backend deployment logs

### Debug Commands
```bash
# Check Vercel deployment logs
vercel logs

# Test API endpoints
curl https://your-api.com/api/auth/check-session

# Check database connection
python -c "from src.models.user import db; print('DB connected')"
```


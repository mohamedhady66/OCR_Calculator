# 🚀 Deployment Guide - OCR Calculator

This guide covers multiple deployment options for making your OCR Calculator publicly accessible.

## 📋 Quick Comparison

| Platform | Cost | Difficulty | Best For |
|----------|------|------------|----------|
| **Azure App Service** | Free/$13+ | Easy | .NET apps, Microsoft ecosystem |
| **Railway** | Free/$5+ | Very Easy | Quick deployment, developers |
| **Render** | Free/$7+ | Easy | Modern apps, automatic deploys |
| **DigitalOcean** | $4+ | Medium | Full control, Docker |
| **Heroku** | $5+ | Easy | Quick prototypes |
| **Docker** | Varies | Medium | Any cloud provider |

---

## 🟦 Option 1: Azure App Service (Recommended for .NET)

### Prerequisites
- Azure account ([Get free $200 credit](https://azure.microsoft.com/free/))
- Azure CLI installed

### Deployment Steps

#### Method A: Using the Deployment Script

1. **Edit the script variables**:
   ```bash
   nano deploy-azure.sh
   ```
   Change `APP_NAME` to something unique (e.g., `ocr-calc-yourname`)

2. **Make it executable and run**:
   ```bash
   chmod +x deploy-azure.sh
   ./deploy-azure.sh
   ```

3. **Access your app**:
   ```
   https://YOUR_APP_NAME.azurewebsites.net
   ```

#### Method B: Visual Studio/Rider

1. Right-click project → **Publish**
2. Select **Azure** → **Azure App Service (Linux)**
3. Follow the wizard
4. Click **Publish**

### Free Tier Details
- **F1 (Free)**: 60 minutes/day compute, 1GB RAM, 1GB storage
- **B1 (Basic)**: $13/month, always on, custom domains

---

## 🚂 Option 2: Railway (Easiest - Recommended for Beginners)

### Why Railway?
- ✅ Super easy deployment
- ✅ Free tier available ($5/month credit)
- ✅ Automatic HTTPS
- ✅ Auto-deploys from GitHub

### Steps:

1. **Create account**: [railway.app](https://railway.app)

2. **Install Railway CLI**:
   ```bash
   brew install railway
   ```

3. **Login**:
   ```bash
   railway login
   ```

4. **Initialize and deploy**:
   ```bash
   cd /Users/mohamed.hady/RiderProjects/OCR_Calculator
   railway init
   railway up
   ```

5. **Get your URL**:
   ```bash
   railway domain
   ```

### Alternative: Deploy from GitHub
1. Push your code to GitHub
2. Go to [railway.app](https://railway.app)
3. Click **New Project** → **Deploy from GitHub**
4. Select your repository
5. Railway auto-detects .NET and deploys!

---

## 🎨 Option 3: Render (Great Free Tier)

### Why Render?
- ✅ Generous free tier
- ✅ Automatic SSL
- ✅ Easy to use
- ✅ Great for side projects

### Steps:

1. **Push to GitHub** (if not already):
   ```bash
   cd /Users/mohamed.hady/RiderProjects/OCR_Calculator
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO
   git push -u origin main
   ```

2. **Go to** [render.com](https://render.com)

3. **Create New Web Service**:
   - Connect your GitHub repository
   - Name: `ocr-calculator`
   - Environment: `Docker`
   - Plan: `Free`

4. **Deploy** - Render will use the Dockerfile automatically!

5. **Access**: `https://ocr-calculator.onrender.com`

### Note: Free tier spins down after inactivity (takes 30s to wake up)

---

## 🐳 Option 4: Docker + DigitalOcean/AWS/GCP

### Build and Test Locally

1. **Build Docker image**:
   ```bash
   cd /Users/mohamed.hady/RiderProjects/OCR_Calculator
   docker build -t ocr-calculator .
   ```

2. **Test locally**:
   ```bash
   docker run -p 8080:8080 ocr-calculator
   ```
   Open: http://localhost:8080

### Deploy to DigitalOcean

1. **Create Droplet** ($4/month):
   - OS: Ubuntu 22.04
   - Size: Basic ($4/month)

2. **SSH into droplet**:
   ```bash
   ssh root@YOUR_DROPLET_IP
   ```

3. **Install Docker**:
   ```bash
   curl -fsSL https://get.docker.com -o get-docker.sh
   sh get-docker.sh
   ```

4. **Clone and deploy**:
   ```bash
   git clone YOUR_REPO
   cd OCR_Calculator
   docker-compose up -d
   ```

5. **Setup Nginx reverse proxy** (optional):
   ```bash
   apt install nginx
   ```

---

## 🌐 Option 5: GitHub Pages + Backend API (Alternative)

Since this app is mostly client-side (Tesseract.js runs in browser), you could:

1. **Convert to pure static site**:
   - Extract HTML from Razor page
   - Host on GitHub Pages (free)
   - Add API endpoint only if needed

2. **Steps**:
   ```bash
   # Create static version
   mkdir docs
   cp OCR_Calculator/Pages/Index.cshtml docs/index.html
   # Edit to remove Razor syntax
   # Push to GitHub
   # Enable GitHub Pages in repo settings
   ```

---

## ⚙️ Pre-Deployment Checklist

Before deploying, ensure:

- [ ] Update `appsettings.json` for production
- [ ] Remove development error pages
- [ ] Add proper error handling
- [ ] Configure HTTPS (most platforms do this automatically)
- [ ] Set up analytics (optional)
- [ ] Test with different image types
- [ ] Optimize images and assets

### Production Configuration

Update `appsettings.json`:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Warning",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*"
}
```

---

## 🔒 Security Considerations

1. **HTTPS**: All recommended platforms provide free SSL
2. **File Upload Limits**: Already handled by browser-side processing
3. **Rate Limiting**: Consider adding if needed
4. **CORS**: Configure if calling from different domains

---

## 💰 Cost Breakdown

### Free Options
- **Railway**: $5/month free credit
- **Render**: 750 hours/month free
- **Azure**: F1 tier (limited)
- **GitHub Pages**: Free (static only)

### Paid (Cheapest to Expensive)
- **DigitalOcean**: $4/month
- **Railway**: $5/month (after credit)
- **Render**: $7/month
- **Azure B1**: $13/month
- **AWS**: Varies (~$10-20/month)

---

## 🎯 Recommended Path for You

### For Immediate Public Access (Free):
**Use Railway** - Quickest and easiest!

```bash
brew install railway
railway login
cd /Users/mohamed.hady/RiderProjects/OCR_Calculator
railway init
railway up
railway domain
```

Done! Your app is live in ~5 minutes.

### For Production/Serious Use:
**Use Azure App Service** - Best for .NET, professional features

```bash
chmod +x deploy-azure.sh
./deploy-azure.sh
```

### For Learning/Control:
**Use Docker + DigitalOcean** - Full control, learn deployment

---

## 🆘 Troubleshooting

### App won't start
- Check logs: `railway logs` or Azure portal
- Verify .NET 8.0 runtime is available
- Check port configuration (should be 8080)

### Can't access externally
- Check firewall settings
- Verify DNS/domain configuration
- Ensure HTTPS is configured

### OCR not working
- Tesseract.js loads from CDN (should work anywhere)
- Check browser console for errors
- Verify HTTPS (required for some browser features)

---

## 📚 Additional Resources

- [Azure App Service Docs](https://learn.microsoft.com/azure/app-service/)
- [Railway Docs](https://docs.railway.app/)
- [Render Docs](https://render.com/docs)
- [Docker Docs](https://docs.docker.com/)

---

## 🎉 Next Steps After Deployment

1. **Custom Domain**: Point your domain to the deployed app
2. **Analytics**: Add Google Analytics or similar
3. **Monitoring**: Set up uptime monitoring
4. **CDN**: Use Cloudflare for better performance
5. **Backup**: Regular backups if storing data

---

Need help? Check the platform-specific documentation or open an issue!

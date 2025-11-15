# 🚀 Quick Deploy - Choose Your Option

## ⚡ FASTEST: Railway (5 minutes)

**Perfect for:** Quick public demo, free tier available

```bash
# 1. Install Railway CLI
brew install railway

# 2. Run deployment script
./deploy-railway.sh

# 3. Get your URL
railway domain
```

✅ **Your app is now live!** Share the URL with anyone.

---

## 🏢 RECOMMENDED: Azure (10 minutes)

**Perfect for:** Production use, Microsoft ecosystem

```bash
# 1. Install Azure CLI
brew install azure-cli

# 2. Login
az login

# 3. Edit app name in script (must be unique)
nano deploy-azure.sh

# 4. Deploy
./deploy-azure.sh
```

✅ **Your app is at:** `https://YOUR-APP-NAME.azurewebsites.net`

---

## 🎨 EASY: Render (15 minutes)

**Perfect for:** Free hosting, auto-deploys from GitHub

1. Push code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "OCR Calculator"
   git remote add origin YOUR_GITHUB_URL
   git push -u origin main
   ```

2. Go to [render.com](https://render.com)
3. Click "New Web Service"
4. Connect GitHub repo
5. Select "Docker" environment
6. Click "Create Web Service"

✅ **Done!** Render auto-builds and deploys.

---

## 🐳 FLEXIBLE: Docker (Any Cloud)

**Perfect for:** Full control, any hosting provider

```bash
# Build
docker build -t ocr-calculator .

# Test locally
docker run -p 8080:8080 ocr-calculator

# Push to Docker Hub
docker tag ocr-calculator YOUR_USERNAME/ocr-calculator
docker push YOUR_USERNAME/ocr-calculator

# Deploy to any cloud provider that supports Docker
```

---

## 📊 Comparison

| Platform | Setup Time | Free Tier | Custom Domain | Best For |
|----------|------------|-----------|---------------|----------|
| **Railway** | 5 min | ✅ $5 credit | ✅ | Quick demo |
| **Render** | 15 min | ✅ 750hrs | ✅ | Side projects |
| **Azure** | 10 min | ⚠️ Limited | ✅ | Production |
| **Docker** | 20 min | Varies | ✅ | Full control |

---

## 💡 My Recommendation

### Just Want to Share It Quickly?
→ **Use Railway** (run `./deploy-railway.sh`)

### Building Something Serious?
→ **Use Azure** (run `./deploy-azure.sh`)

### Want Free Forever?
→ **Use Render** (deploy from GitHub)

---

## ❓ Need Help?

See full deployment guide: `DEPLOYMENT.md`

Or reach out for specific platform help!

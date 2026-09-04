# Quick Start Guide - 2 Minutes to Running

## Prerequisites Check

Do you have Node.js installed?

```bash
node --version
```

✅ If you see `v18.x.x` or higher → **Go to Step 1**  
❌ If you see an error → **Install Node.js first**

### Installing Node.js (5 minutes)

**Linux/Mac:**
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install --lts
```

**Windows:** Download from https://nodejs.org/ and run the installer

---

## Step 1: Install Dependencies

```bash
npm install
```

⏱️ This takes 1-3 minutes

---

## Step 2: Start the Server

```bash
npm run dev
```

You'll see:
```
➜  Local:   http://localhost:3000/
```

---

## Step 3: Open in Browser

Visit: **http://localhost:3000**

🎉 Done! The app is running.

---

## What to Do Now

1. **See the vehicle state** - Top left shows capacity
2. **View next point** - Top center shows selected collection point
3. **Look at the map** - Top right visualizes the route
4. **Click "ARRIVE AT CHECKPOINT"** - Simulate collection
5. **Adjust the sliders** - In verification modal
6. **Watch re-optimization** - System recalculates automatically

---

## For Mobile Testing

```bash
npm run dev -- --host
```

Then open `http://YOUR_IP:3000` on your phone

---

## If Something Goes Wrong

**Port already in use?**
- Close other apps using port 3000
- Or change port in `vite.config.ts`

**Dependencies fail to install?**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Can't find npm?**
- Node.js not installed or not in PATH
- Restart terminal after installing Node.js

---

## Next Steps

- Read **README.md** for full documentation
- Check **DEMO_GUIDE.md** for presentation script
- Review **MOBILE_TESTING.md** for device testing
- See **PROJECT_SUMMARY.md** for complete overview

---

**That's it! You're ready to explore the optimization platform. 🚀**

# Setup Guide - Smart Plastic Waste Collection Optimization Platform

## Quick Start (Automated)

If you have Node.js and npm already installed:

```bash
npm install
npm run dev
```

Then open `http://localhost:3000` in your browser.

---

## Complete Setup Instructions

### Step 1: Install Node.js

#### Option A: Using NVM (Recommended - Linux/Mac)

```bash
# Download and install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Reload your shell configuration
source ~/.bashrc  # or source ~/.zshrc for Zsh users

# Install Node.js LTS version
nvm install --lts

# Verify installation
node --version  # Should show v20.x.x or similar
npm --version   # Should show 10.x.x or similar
```

#### Option B: Direct Download (Windows/Mac/Linux)

1. Visit https://nodejs.org/
2. Download the LTS version (Long Term Support)
3. Run the installer and follow the instructions
4. Restart your terminal/command prompt
5. Verify: `node --version` and `npm --version`

#### Option C: Package Manager (Linux)

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install nodejs npm
```

**Fedora:**
```bash
sudo dnf install nodejs npm
```

**Arch Linux:**
```bash
sudo pacman -S nodejs npm
```

### Step 2: Install Project Dependencies

Navigate to the project directory and install dependencies:

```bash
cd /path/to/prototype
npm install
```

This will install:
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Zustand
- All required development dependencies

Installation typically takes 1-3 minutes depending on your internet connection.

### Step 3: Run Development Server

```bash
npm run dev
```

You should see output like:

```
  VITE v5.0.8  ready in 234 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

### Step 4: Open in Browser

- **Desktop**: Open `http://localhost:3000` in Chrome, Firefox, Safari, or Edge
- **Mobile (Same Network)**: 
  1. Find your computer's IP address: `ip addr` (Linux) or `ipconfig` (Windows)
  2. Open `http://YOUR_IP:3000` on your mobile device
  3. Make sure both devices are on the same network

---

## Building for Production

Create an optimized production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

The production build will be in the `dist/` directory.

---

## Mobile Testing

### Test on Physical Devices

1. **Start dev server with host flag:**
   ```bash
   npm run dev -- --host
   ```

2. **Find your local IP:**
   - Linux/Mac: `ifconfig` or `ip addr`
   - Windows: `ipconfig`

3. **Access from mobile:**
   - Open `http://YOUR_IP:3000` on your phone/tablet
   - Example: `http://192.168.1.100:3000`

### Test Responsive Breakpoints

Using Chrome DevTools:
1. Press `F12` or `Cmd+Option+I` (Mac) / `Ctrl+Shift+I` (Windows/Linux)
2. Click the device toolbar icon (or press `Cmd+Shift+M` / `Ctrl+Shift+M`)
3. Test these breakpoints:
   - 320px (iPhone SE)
   - 375px (iPhone 12/13)
   - 390px (iPhone 14 Pro)
   - 412px (Pixel 7)
   - 768px (iPad)
   - 1024px (iPad Pro)
   - 1280px+ (Desktop)

### PWA Installation

To test PWA functionality:

1. Open the site in Chrome/Edge on mobile or desktop
2. Look for the "Install" prompt in the address bar
3. Or open browser menu → "Install App" / "Add to Home Screen"
4. The app will install and open in standalone mode

---

## Troubleshooting

### "npm: command not found"

Node.js is not installed. Follow Step 1 above.

### "Cannot find module" errors

Dependencies not installed. Run:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Port 3000 already in use

Change the port in `vite.config.ts`:
```typescript
server: {
  host: true,
  port: 3001  // or any other port
}
```

### Slow build/install on Windows

If you're using Windows, consider:
1. Running as Administrator
2. Disabling antivirus temporarily during install
3. Using WSL2 (Windows Subsystem for Linux)

### "EACCES" permission errors (Linux/Mac)

Don't use sudo with npm. Fix permissions:
```bash
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

---

## Development Tips

### Hot Module Replacement (HMR)

Vite provides instant updates. When you save a file, changes appear immediately without full page reload.

### TypeScript Checking

Check for TypeScript errors:
```bash
npx tsc --noEmit
```

### Code Formatting

Format all files (if you have Prettier):
```bash
npx prettier --write .
```

### Clear Cache

If you encounter weird issues:
```bash
rm -rf node_modules/.vite
npm run dev
```

---

## System Requirements

### Minimum
- **RAM**: 4 GB
- **Storage**: 500 MB free space
- **Browser**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Recommended
- **RAM**: 8 GB or more
- **Storage**: 1 GB free space
- **Browser**: Latest version of Chrome or Edge
- **Node.js**: v20.x (LTS)
- **npm**: v10.x

---

## Browser Compatibility

| Browser | Desktop | Mobile | PWA Support |
|---------|---------|--------|-------------|
| Chrome | ✅ v90+ | ✅ v90+ | ✅ Yes |
| Edge | ✅ v90+ | ✅ v90+ | ✅ Yes |
| Safari | ✅ v14+ | ✅ v14+ | ⚠️ Limited |
| Firefox | ✅ v88+ | ✅ v88+ | ⚠️ Limited |
| Samsung Internet | N/A | ✅ v14+ | ✅ Yes |

---

## Network Access for Team Demo

To share the prototype with team members on the same network:

1. Start server with host flag:
   ```bash
   npm run dev -- --host
   ```

2. Note the Network URL shown:
   ```
   ➜  Network: http://192.168.1.100:3000/
   ```

3. Share this URL with team members

4. Ensure firewall allows port 3000:
   - **Linux**: `sudo ufw allow 3000`
   - **Windows**: Allow through Windows Defender Firewall
   - **Mac**: Allow through System Preferences → Security & Privacy

---

## Getting Help

If you encounter issues:

1. Check the **Troubleshooting** section above
2. Review error messages carefully
3. Check that all prerequisites are installed
4. Try clearing cache and reinstalling dependencies
5. Check GitHub Issues (if applicable)

---

## Next Steps

Once the server is running:

1. ✅ Explore the **Vehicle State** panel - see capacity visualization
2. ✅ Click **"ARRIVE AT CHECKPOINT"** - simulate collection
3. ✅ Use **Checkpoint Verification** sliders - adjust actual values
4. ✅ Click **"SIMULATE LIVE UPDATE"** - add point P6 mid-route
5. ✅ Adjust **Coefficient Sliders** - change optimization priorities
6. ✅ Use **Simulation Controls** - step through the algorithm
7. ✅ Review **Decision Trace** - understand the math
8. ✅ Check **Event Log** - see real-time events

Enjoy exploring the mathematical optimization engine! 🚀

# Wavefy Player 🌊

<div align="center">
  <img src="icon.png" alt="Wavefy Logo" width="120" />
</div>

**Wavefy** is a state-of-the-art, YouTube Music-inspired Progressive Web App (PWA) template. Engineered for seamless performance, it fetches audio directly from a GitHub repository, caches media for true offline playback, and delivers a premium, native-app experience right in the browser. 

Designed and developed by **Goorac Corporation**.

---

## 🚀 Next-Generation Features

* **Native App Feel:** Zero-lag modal navigation utilizing the browser's History API. Mobile hardware back buttons and swipe gestures work flawlessly to close modals without exiting the app.
* **True Offline Mode (PWA):** Powered by an advanced Service Worker (`sw.js`). Audio tracks are dynamically downloaded to the browser's native Cache Storage for instant, zero-data playback on return visits.
* **GitHub-Powered Backend:** No database or complex server required. Simply upload `.mp3` files to your connected GitHub repository, and Wavefy automatically syncs the tracklist in the background.
* **1-Click Installation:** Comes with a fully configured `manifest.json` and a custom, sleek "Add to Home Screen" prompt to install the app directly to a user's device.
* **Pixel-Perfect UI:** Strictly locked viewport prevents accidental mobile zooming. Features dynamic theme colors that smoothly adapt the mobile status bar to match the currently open interface.

---

## 📂 Project Structure

To run this template, ensure all four of these files are in the exact same root directory on a secure server (HTTPS) or `localhost`:

* `index.html` — The core application UI, styling, and client-side logic.
* `sw.js` — The Service Worker handling offline caching and network routing.
* `manifest.json` — The web app manifest defining the PWA installation properties.
* `icon.png` — Your app icon (must be a square PNG, 512x512 pixels recommended).

---

## 🛠️ Quick Setup

1.  **Deploy the Files:** Upload the core files to any static hosting provider (e.g., GitHub Pages, Vercel, Netlify).
2.  **Add Your Branding:** Replace the placeholder `icon.png` in the root folder with your own logo.
3.  **Configure Your Music Source:** Open `index.html` and locate the `--- CONFIG ---` section near the top of the script. Update these variables to point to the GitHub repository where you host your `.mp3` files:

    ```javascript
    // --- CONFIG ---
    const OWNER = 'corporationgoorac'; // Your GitHub Username/Org
    const REPO  = 'MP3Player-';        // Your Repository Name
    const BRANCH = 'main';             // The branch containing your files
    ```

---

## ⚖️ Copyright & Legal

**Wavefy** is a proprietary software template engineered by **Goorac Corporation**. 

Copyright © 2026 Goorac Corporation. All Rights Reserved.

*Unauthorized copying, modification, reproduction, distribution, or commercial use of this software and its UI/UX design, via any medium, is strictly prohibited without explicit, written permission from Goorac Corporation. This software is provided "as is", without warranty of any kind.*

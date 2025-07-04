# 🎵 Music Player Web App 🎶  
A Spotify-inspired music streaming web app built using **HTML**, **CSS**, and **JavaScript**. Users can browse albums, play songs, and enjoy smooth transitions and animations, all in a modern and responsive UI.

---

### 🚀 Live Demo

[Click here to view the live app](https://music-player-web-8nt70kq81-1harsh45s-projects.vercel.app/)


---

## 📂 Folder Structure

Music_player_web_app/
├── index.html
├── style.css
├── script.js
├── img/
│ ├── play.svg
│ ├── pause.svg
│ ├── music.svg
│ ├── volume.svg
│ └── ...
├── songs/
│ ├── Arijit Singh/
│ │ ├── Apana Bana Le.mp3
│ │ ├── Channa Mereya.mp3
│ │ ├── Kesariya.mp3
│ │ ├── cover.jpg
│ │ └── info.json
│ ├── Karan Aujla/
│ ├── Shubh/
│ └── Diljit Dosanjh/



Each artist folder contains:
- `song1.mp3`, `song2.mp3` — actual audio tracks.
- `cover.jpg` — album art.
- `info.json` — metadata (title, description, song list).

---

## 🚀 Features

- 🎧 Browse and play songs from different albums.
- 📀 Dynamic playlist rendering from `info.json`.
- 🌀 Click animation on song cards.
- ⏯ Play / Pause / Next / Previous song controls.
- 🔈 Volume control with mute toggle.
- 📱 Responsive UI optimized for all devices.

---

## 🛠 Technologies Used

- **HTML5** — Structure  
- **CSS3** — Styling, Flexbox, Animations  
- **JavaScript (Vanilla)** — Dynamic behavior, Audio playback  
- **Vercel** — Deployment platform

---

## 📄 How to Use Locally

```bash
git clone https://github.com/1Harsh45/Music_player_web_app.git
cd Music_player_web_app

📦 Deployment
This project is hosted using Vercel.
To redeploy:
git add .
git commit -m "Your message"
git push
Vercel will auto-deploy your changes.

📁 info.json Format
Each artist folder should contain a file like:

json
{
  "title": "Diljit Dosanjh Hits",
  "description": "Top Punjabi tracks by Diljit Dosanjh.",
  "songs": ["song1.mp3", "song2.mp3"]
}


🙋‍♂️ Author
Harshal Meshram
Full Stack Developer (MERN)
**💻 GitHub:** [1Harsh45](https://github.com/1Harsh45)




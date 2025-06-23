# 📱 GabayHabits

**GabayHabits** is a productivity and habit-tracking mobile app built with **React Native (Expo)**, **Firebase**, and **Tailwind CSS**, designed to help users stay focused, track their study routines, and collaborate in real-time group study rooms — with AI-powered assistance.

---

## 🌟 Features

- ✅ **Personal Dashboard** – View points, progress, and motivation boosts
- 🧠 **Flashcards** – Create, filter, and study cards by category
- ⏱️ **Pomodoro Timer** – Manage focus sessions using the Pomodoro technique
- 📅 **Schedule Sessions** – Organize solo and group study sessions
- 💬 **Group Study** – Join or create rooms with voice/video/chat support
- 🤖 **AI Tutor** – Integrated GPT-style AI chat support for Premium rooms
- 🛠️ **Admin Panel** – Monitor user activity, issues, and system health

---

## 📦 Tech Stack

- **React Native (Expo)**
- **Firebase (Auth + Realtime DB)**
- **Tailwind CSS** (via `nativewind`)
- **TypeScript**
- **React Navigation**

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/gabayhabits.git
cd gabayhabits
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npx expo start
```

> 📱 Open in Expo Go on your phone or in an emulator.

---

## 🖼️ Screenshots

| Dashboard | Group Study | Chat Room |
|----------|-------------|-----------|
| ![dashboard](assets/screens/dashboard.png) | ![group](assets/screens/groupstudy.png) | ![chat](assets/screens/chatroom.png) |

> _Replace `assets/screens/` with your actual screenshot paths._

---

## 🧪 Development Notes

- Tailwind styles are used via `nativewind`
- Firebase config is stored in `/firebase/firebase.ts`
- Navigation is handled via native stack + tab navigation
- Components are modular: `DashboardHeader`, `PomodoroTimer`, `ChatRoom`, etc.

---

## 🛡️ License

This project is licensed under the [MIT License](LICENSE).

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📬 Contact

For support or inquiries, contact **[yourname@email.com](mailto:yourname@email.com)**
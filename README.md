# 💬 ChatLab

**ChatLab** is a real-time, full-featured chat application where users can:
- 💬 Message friends instantly
- 👥 Create and manage group chats
- 🖼️ Share images and videos
- 📹 Start video calls with ZegoCloud
- 🤖 Ask AI-powered questions with CohereAI
- 🌗 Switch between light and dark mode for better UX

---

## 🚀 Tech Stack

| Tech             | Usage                                          |
|------------------|------------------------------------------------|
| **Next.js (App Router)** | Frontend framework                        |
| **Convex**       | Real-time database, events & cloud functions   |
| **Convex File Storage** | Store images and videos                 |
| **Clerk**        | Authentication and user management             |
| **ZegoCloud**    | Seamless video calling                         |
| **CohereAI**     | AI assistant for natural language responses     |
| **ShadCN/UI**    | Beautifully styled UI components               |
| **Tailwind CSS** | Utility-first CSS styling                      |
| **TypeScript**   | Type safety and better developer experience    |

---

## ✨ Features

- ✅ Real-time messaging (1-on-1 & group chats)
- ✅ AI Assistant (via CohereAI)
- ✅ Secure user authentication (Clerk)
- ✅ Media sharing (images & videos)
- ✅ Video calling (ZegoCloud)
- ✅ Dark & Light theme toggle
- ✅ Designed for only desktop

---

## 🛠️ Getting Started

1. Clone the repo:
   ```bash
   git clone https://github.com/your-username/chatlab.git
   cd chatlab
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file and add required environment variables:
   ```
   NEXT_PUBLIC_CONVEX_URL=
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=
   ZEGOCLOUD_APP_ID=
   ZEGOCLOUD_SERVER_SECRET=
   COHERE_API_KEY=
   ```

4. Run development server:
   ```bash
   npm run dev
   ```

---

## 📸 Screenshots

> _(Add some screenshots of chat, group, video call, and AI assistant UI here)_

---

## 🧠 AI Assistant Powered by

> [CohereAI](https://cohere.ai) – Language AI to enhance conversations with instant intelligent responses.

---

## 🔐 Auth Provided by

> [Clerk](https://clerk.dev) – Seamless user management and session handling.

---

## 📞 Video Calls With

> [ZegoCloud](https://www.zegocloud.com/) – Real-time engagement SDKs for fast video calling.

---

## 🌟 Credits

Built with 💻, ☕ and way too many dark/light theme switches.

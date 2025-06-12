# Mental Gym 🧠

*Where everyday people meet AI in the most human way possible.*

A beautifully designed web app that offers daily thinking prompts with ChatGPT-powered reflections. Built to introduce non-tech users to AI through meaningful, personal interactions.

![Mental Gym Preview](https://via.placeholder.com/800x400/667eea/ffffff?text=Mental+Gym+🧠)

## 🌟 Why Mental Gym?

Most people's first AI experience is intimidating chatbots or complex tools. Mental Gym changes that by creating a **zen-like space** where AI feels like a thoughtful friend helping you reflect on life.

### 🎯 Perfect For:
- **Anyone curious about AI** but intimidated by technical tools
- **Self-reflection enthusiasts** who want deeper insights
- **Busy people** who need guided thinking exercises
- **Developers** showcasing human-centered AI design

## ✨ Features

🎨 **Beautiful Zen Design**
- Flowing nature-inspired background with gentle animations
- Centered, glassmorphism UI cards for calm focus
- Mobile-first responsive design

🧠 **Thoughtful Daily Prompts**
- 10 carefully crafted questions across emotional intelligence, creativity, and philosophy
- Categorized with intuitive emojis (💝 Emotional, 🎨 Creative, 🤔 Philosophical)
- "Try Another Prompt" for variety

💬 **ChatGPT-Powered Reflections**
- Real GPT-3.5-turbo responses to your personal writing
- Conversational, warm tone (never robotic or clinical)
- Provides observations, gentle questions, and encouragement

🚀 **Zero Friction Experience**
- No signups, logins, or accounts required
- Write → Reflect → Get AI feedback in 30 seconds
- No data stored (each session is private and independent)

## 🏗️ Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **AI**: OpenAI GPT-3.5-turbo API
- **Styling**: Custom CSS with glassmorphism effects
- **Deployment**: Static site (Vercel/Netlify ready)
- **Security**: Environment variables, .gitignore protection

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- OpenAI API account

### 1. Clone & Install
```bash
git clone https://github.com/dwang0816/mental-gym.git
cd mental-gym
npm install
```

### 2. Set up OpenAI API
```bash
# Copy environment template
cp env.example .env

# Get your API key from https://platform.openai.com/api-keys
# Add to .env file:
VITE_OPENAI_API_KEY=sk-proj-your-actual-key-here
```

### 3. Run Development Server
```bash
npm run dev
# Open http://localhost:5173
```

### 4. Test the Experience
- Read the daily prompt
- Write a few sentences about your thoughts
- Click "Get AI Reflection" 
- Experience ChatGPT's thoughtful response!

## 📁 Project Structure

```
mental-gym/
├── src/
│   ├── components/
│   │   ├── PromptCard.tsx      # Beautiful prompt display with categories
│   │   ├── WriteArea.tsx       # Text input with word count & AI button
│   │   └── AIResponse.tsx      # ChatGPT feedback display
│   ├── services/
│   │   ├── prompts.ts          # 10 curated thinking prompts
│   │   └── claude.ts           # OpenAI API integration
│   ├── App.tsx                 # Main application with state management
│   ├── App.css                 # Zen-inspired styling with glassmorphism
│   └── vite-env.d.ts          # TypeScript environment definitions
├── .env                        # Your OpenAI API key (git-ignored)
├── .gitignore                  # Protects sensitive files
└── package.json                # Dependencies & scripts
```


## 💰 Cost Analysis

**GPT-3.5-turbo Pricing:**
- ~$0.001 per user interaction
- 1,000 users = ~$1 total cost
- Perfect for portfolio projects and demos

## 🎨 Design Philosophy

**Human-Centered AI**: Technology should feel helpful, not intimidating
**Zen Aesthetics**: Calm, focused environment for deep thinking  
**Accessibility First**: Works for all users, especially non-tech people
**Privacy by Design**: No data collection, each session is independent


### 🤝 Contributing

Mental Gym is open to contributions! Feel free to:
- Add new thoughtful prompts
- Improve the AI conversation flow  
- Enhance the zen design aesthetic
- Make the experience more accessible

---

*"The best way to introduce people to AI is through meaningful, personal interactions."*

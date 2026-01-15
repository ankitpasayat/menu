# 🍛 Menu - My Personal Meal Planning App

Hey! This is a meal planning app I built for myself (and my cook lol). It's a 14-day rotating menu optimized for muscle gain + fat loss. Nothing fancy, just does what I need it to do.

## 🎯 What's this about?

I was tired of figuring out what to eat every day, so I planned a 2-week rotating menu with:
- **~1800-2000 calories/day**
- **140-160g protein/day** 
- High protein sources like chicken, eggs, paneer, legumes, and soya
- No fish or red meat (just personal preference)
- **No dinner on Sundays** - because we all need a break right? 😅

## ✨ Features

- 📱 **PWA** - Install it on your phone, works offline
- 🌙 **Dark mode** - Easy on the eyes at night
- 🇮🇳 **Hindi + English** - हिंदी में भी!
- ▶️ **YouTube links** - Every recipe has a video tutorial
- ⏰ **Smart timing** - Shows the right meal based on time of day
- 👩‍🍳 **Cook schedule** - Shows when the cook arrives
- ⚠️ **Prep alerts** - Reminds you to soak dal or marinate chicken
- 📅 **14-day view** - See what's coming up in the next 2 weeks

## 🛠️ Equipment needed

I don't have an oven, so everything is designed for:
- 🍳 Gas stove
- 🌪️ Air fryer
- 📦 Microwave
- 🥗 Some recipes need no cooking at all

## 🚀 Running it locally

```bash
# Install deps
npm install

# Run dev server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) and you're good to go!

## 📱 Install as PWA

On your phone:
1. Open the app in Chrome/Safari
2. Tap "Add to Home Screen"
3. Done! Works like a native app 🎉

## � Customizing Recipes

All recipes are stored in a single config file that you can easily edit:

**Edit:** [`config/recipes.json`](config/recipes.json)

### Recipe Structure

Each day has breakfast, lunch, and optionally dinner:

```json
{
  "day": 1,
  "dayName": "Monday",
  "breakfast": {
    "name": "Egg Bhurji + Roti",
    "nameHi": "अंडा भुर्जी रोटी",
    "emoji": "🥚",
    "youtubeId": "dPAPY2Jl0mE",
    "protein": 28,
    "calories": 380,
    "prepTime": 15,
    "equipment": "stove",
    "prep": {
      "when": "morning",
      "taskEn": "Marinate chicken",
      "taskHi": "चिकन मैरिनेट करें"
    }
  }
}
```

### Fields explained:

| Field | Description |
|-------|-------------|
| `name` | Recipe name in English |
| `nameHi` | Recipe name in Hindi |
| `emoji` | Food emoji for the card |
| `youtubeId` | YouTube video ID (the part after `v=` in the URL) |
| `protein` | Protein in grams |
| `calories` | Calories per serving |
| `prepTime` | Cooking time in minutes |
| `equipment` | `stove`, `airfryer`, `microwave`, or `no-cook` |
| `prep` | (Optional) Prep instructions |
| `prep.when` | `night-before`, `morning`, or `advance` |

### Adding a new recipe

Just add a new day object to the `days` array. Sundays should not have a `dinner` field.

## 🗂️ Project structure

```
config/
  recipes.json    # ⭐ Edit this to change recipes!
app/
  page.tsx        # Main app UI
  layout.tsx      # Root layout
  globals.css     # Styles
lib/
  recipes.ts      # Recipe types & utilities
  i18n.ts         # Hindi/English translations
public/
  manifest.json   # PWA manifest
```

## 🤔 Why I built this

Honestly? I got tired of:
1. Asking "what should I eat today?" every single day
2. Not hitting my protein goals
3. My cook not knowing what to make
4. Random unplanned meals messing up my macros

So I spent a weekend planning everything out. Now I just open the app, show it to my cook, and we're set. Simple.

## 📝 Notes to self

- Sunday = no dinner (rest day vibes)
- Don't forget to soak rajma the night before 🫘
- Air fryer tandoori chicken hits different 🔥
- Remember to check prep alerts in the morning!

---

Made with ☕ and Next.js

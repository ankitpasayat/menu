export type Locale = 'en' | 'hi';

export const translations = {
  en: {
    // Header
    appTitle: "Today's Menu",
    day: "Day",
    
    // Meals
    breakfast: "Breakfast",
    lunch: "Lunch", 
    dinner: "Dinner",
    
    // Time labels
    morning: "Morning",
    afternoon: "Afternoon",
    evening: "Evening",
    
    // Cook schedule
    cookArrives: "Cook arrives",
    cookArrivesAt: "Cook arrives at",
    sundaySpecial: "Sunday",
    
    // Actions
    showAll: "All Meals",
    showCurrent: "Now",
    watchVideo: "Watch Video",
    tapToWatch: "Tap to watch",
    
    // Stats
    protein: "Protein",
    calories: "Calories",
    prepTime: "Prep",
    mins: "min",
    
    // Totals
    todayTotal: "Today's Total",
    todayMenu: "Today's Full Menu",
    otherMeals: "Other Meals",
    
    // Equipment
    stove: "Stove",
    airfryer: "Air Fryer",
    microwave: "Microwave",
    noCook: "No Cook",
    
    // Prep instructions
    prepRequired: "Prep Required",
    prepNightBefore: "Night before",
    prepMorning: "Morning",
    prepAdvance: "In advance",
    soakOvernight: "Soak overnight",
    marinate: "Marinate",
    
    // Settings
    settings: "Settings",
    language: "Language",
    theme: "Theme",
    lightMode: "Light",
    darkMode: "Dark",
    
    // Sunday special
    noDinner: "No dinner on Sundays! 🌙 Enjoy your evening.",
    
    // Future recipes
    viewFuture: "14-Day Plan",
    upcomingMeals: "Upcoming Meals",
    allDays: "All 14 Days",
  },
  hi: {
    // Header
    appTitle: "आज का खाना",
    day: "दिन",
    
    // Meals
    breakfast: "नाश्ता",
    lunch: "दोपहर का खाना",
    dinner: "रात का खाना",
    
    // Time labels
    morning: "सुबह",
    afternoon: "दोपहर",
    evening: "शाम",
    
    // Cook schedule
    cookArrives: "कुक आएगी",
    cookArrivesAt: "कुक आएगी",
    sundaySpecial: "रविवार",
    
    // Actions
    showAll: "सब देखें",
    showCurrent: "अभी",
    watchVideo: "वीडियो देखें",
    tapToWatch: "टैप करें",
    
    // Stats
    protein: "प्रोटीन",
    calories: "कैलोरी",
    prepTime: "समय",
    mins: "मिनट",
    
    // Totals
    todayTotal: "आज का Total",
    todayMenu: "आज का पूरा मेन्यू",
    otherMeals: "बाकी खाना",
    
    // Equipment
    stove: "गैस",
    airfryer: "एयर फ्रायर",
    microwave: "माइक्रोवेव",
    noCook: "बिना पकाए",
    
    // Prep instructions
    prepRequired: "तैयारी ज़रूरी",
    prepNightBefore: "रात को पहले",
    prepMorning: "सुबह",
    prepAdvance: "पहले से",
    soakOvernight: "रात भर भिगोएं",
    marinate: "मैरिनेट करें",
    
    // Settings
    settings: "सेटिंग्स",
    language: "भाषा",
    theme: "थीम",
    lightMode: "लाइट",
    darkMode: "डार्क",
    
    // Sunday special
    noDinner: "रविवार को रात का खाना नहीं! 🌙 शाम का मज़ा लें।",
    
    // Future recipes
    viewFuture: "14-दिन का प्लान",
    upcomingMeals: "आने वाले खाने",
    allDays: "सभी 14 दिन",
  }
};

export function t(locale: Locale, key: keyof typeof translations.en): string {
  return translations[locale][key] || translations.en[key];
}

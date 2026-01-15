// 14-day rotating high-protein meal plan for muscle gain + fat loss
// Target: ~1800-2000 cal/day, 140-160g protein
// For: 172cm, 100kg, sedentary - recomp goal
// Equipment: Stove, Microwave, Air Fryer (NO oven)
// Protein sources: Chicken, Eggs, Paneer, Legumes, Soya (NO fish/red meat)
// Sundays: No dinner (only breakfast & lunch)
// Supplements: Multivitamin, Ashwagandha 600mg, Omega-3, Whey available

export interface PrepInstruction {
  when: 'night-before' | 'morning' | 'advance';
  taskEn: string;
  taskHi: string;
}

export interface Recipe {
  name: string;
  nameHi: string;
  emoji: string;
  youtubeId: string;
  protein: number;
  calories: number;
  prepTime: number;
  equipment: 'stove' | 'airfryer' | 'microwave' | 'no-cook';
  prep?: PrepInstruction;
}

export interface DayMenu {
  breakfast: Recipe;
  lunch: Recipe;
  dinner?: Recipe; // Optional - no dinner on Sundays
}

export const recipes: DayMenu[] = [
  // Day 1 (Monday)
  {
    breakfast: {
      name: "Egg Bhurji + Roti",
      nameHi: "अंडा भुर्जी रोटी",
      emoji: "🥚",
      youtubeId: "dPAPY2Jl0mE", // Kabita's Kitchen
      protein: 28,
      calories: 380,
      prepTime: 15,
      equipment: 'stove'
    },
    lunch: {
      name: "Chicken Curry + Rice",
      nameHi: "चिकन करी चावल",
      emoji: "🍗",
      youtubeId: "yZiLBN8p6N8", // Ranveer Brar
      protein: 45,
      calories: 520,
      prepTime: 40,
      equipment: 'stove',
      prep: {
        when: 'morning',
        taskEn: "Marinate chicken with yogurt & spices",
        taskHi: "चिकन को दही और मसालों में मैरिनेट करें"
      }
    },
    dinner: {
      name: "Paneer Tikka (Air Fryer)",
      nameHi: "पनीर टिक्का",
      emoji: "🧀",
      youtubeId: "HlVWKSviLhA", // Hebbars Kitchen
      protein: 32,
      calories: 350,
      prepTime: 25,
      equipment: 'airfryer',
      prep: {
        when: 'morning',
        taskEn: "Marinate paneer cubes",
        taskHi: "पनीर को मैरिनेट करें"
      }
    }
  },
  // Day 2 (Tuesday)
  {
    breakfast: {
      name: "Greek Yogurt Bowl + Nuts",
      nameHi: "दही बाउल और मेवे",
      emoji: "🥛",
      youtubeId: "kCHHGgT1jJ4", // Hebbars Kitchen
      protein: 25,
      calories: 320,
      prepTime: 5,
      equipment: 'no-cook'
    },
    lunch: {
      name: "Chicken Shawarma Bowl",
      nameHi: "चिकन शवार्मा बाउल",
      emoji: "🥙",
      youtubeId: "EYXQBMh6z0c", // Ranveer Brar
      protein: 45,
      calories: 480,
      prepTime: 30,
      equipment: 'stove',
      prep: {
        when: 'morning',
        taskEn: "Marinate chicken with shawarma spices",
        taskHi: "शवार्मा मसालों में चिकन मैरिनेट करें"
      }
    },
    dinner: {
      name: "Egg Curry + Roti",
      nameHi: "अंडा करी रोटी",
      emoji: "🥚",
      youtubeId: "bCBj9bMJD6c", // Ranveer Brar
      protein: 28,
      calories: 380,
      prepTime: 25,
      equipment: 'stove'
    }
  },
  // Day 3 (Wednesday)
  {
    breakfast: {
      name: "Masala Omelette + Toast",
      nameHi: "मसाला आमलेट टोस्ट",
      emoji: "🍳",
      youtubeId: "8EZW6lCVcEQ", // Kabita's Kitchen
      protein: 26,
      calories: 350,
      prepTime: 12,
      equipment: 'stove'
    },
    lunch: {
      name: "Chicken Fried Rice",
      nameHi: "चिकन फ्राइड राइस",
      emoji: "🍚",
      youtubeId: "JvZpnujxMo4", // Ranveer Brar
      protein: 38,
      calories: 520,
      prepTime: 25,
      equipment: 'stove',
      prep: {
        when: 'morning',
        taskEn: "Cook rice and cool it completely",
        taskHi: "चावल पका कर पूरी तरह ठंडा करें"
      }
    },
    dinner: {
      name: "Tandoori Chicken (Air Fryer)",
      nameHi: "तंदूरी चिकन",
      emoji: "🍗",
      youtubeId: "m9hLOvnqPZ0", // Your Food Lab
      protein: 52,
      calories: 320,
      prepTime: 35,
      equipment: 'airfryer',
      prep: {
        when: 'night-before',
        taskEn: "Marinate chicken overnight",
        taskHi: "चिकन को रात भर मैरिनेट करें"
      }
    }
  },
  // Day 4 (Thursday)
  {
    breakfast: {
      name: "Moong Dal Chilla",
      nameHi: "मूंग दाल चीला",
      emoji: "🥞",
      youtubeId: "5vXU6SCIwA0", // Hebbars Kitchen
      protein: 22,
      calories: 280,
      prepTime: 20,
      equipment: 'stove',
      prep: {
        when: 'night-before',
        taskEn: "Soak moong dal overnight",
        taskHi: "मूंग दाल रात भर भिगोएं"
      }
    },
    lunch: {
      name: "Rajma Chawal",
      nameHi: "राजमा चावल",
      emoji: "🫘",
      youtubeId: "Xs_wJc-eeEA", // Your Food Lab
      protein: 26,
      calories: 450,
      prepTime: 45,
      equipment: 'stove',
      prep: {
        when: 'night-before',
        taskEn: "Soak rajma overnight (8-10 hrs)",
        taskHi: "राजमा रात भर भिगोएं (8-10 घंटे)"
      }
    },
    dinner: {
      name: "Chicken Keema",
      nameHi: "चिकन कीमा",
      emoji: "🍖",
      youtubeId: "Tc5sPBdvKQE", // Chef Ranveer Brar
      protein: 48,
      calories: 380,
      prepTime: 30,
      equipment: 'stove'
    }
  },
  // Day 5 (Friday)
  {
    breakfast: {
      name: "Besan Chilla + Chutney",
      nameHi: "बेसन चीला चटनी",
      emoji: "🥞",
      youtubeId: "bDLsIOQvXYs", // Hebbars Kitchen
      protein: 20,
      calories: 260,
      prepTime: 15,
      equipment: 'stove'
    },
    lunch: {
      name: "Thai Chicken Basil",
      nameHi: "थाई चिकन बेसिल",
      emoji: "🍜",
      youtubeId: "5DjZxDlDppc", // Your Food Lab
      protein: 42,
      calories: 450,
      prepTime: 20,
      equipment: 'stove'
    },
    dinner: {
      name: "Palak Paneer + Roti",
      nameHi: "पालक पनीर रोटी",
      emoji: "🥬",
      youtubeId: "2hEMVNXdxrY", // Ranveer Brar
      protein: 30,
      calories: 420,
      prepTime: 30,
      equipment: 'stove'
    }
  },
  // Day 6 (Saturday)
  {
    breakfast: {
      name: "Scrambled Eggs + Avocado Toast",
      nameHi: "स्क्रैम्बल्ड एग एवोकाडो टोस्ट",
      emoji: "🍞",
      youtubeId: "PUP7U5vTMM0", // Gordon Ramsay
      protein: 28,
      calories: 380,
      prepTime: 10,
      equipment: 'stove'
    },
    lunch: {
      name: "Korean Chicken Bowl",
      nameHi: "कोरियन चिकन बाउल",
      emoji: "🍗",
      youtubeId: "5oniGpqdOd4", // Maangchi
      protein: 45,
      calories: 520,
      prepTime: 35,
      equipment: 'airfryer',
      prep: {
        when: 'morning',
        taskEn: "Marinate chicken with gochujang",
        taskHi: "गोचुजांग में चिकन मैरिनेट करें"
      }
    },
    dinner: {
      name: "Soya Chunk Curry",
      nameHi: "सोया चंक करी",
      emoji: "🫘",
      youtubeId: "j71F-QLyvVs", // Hebbars Kitchen
      protein: 38,
      calories: 320,
      prepTime: 25,
      equipment: 'stove',
      prep: {
        when: 'morning',
        taskEn: "Soak soya chunks in hot water 15 mins",
        taskHi: "सोया चंक्स गरम पानी में 15 मिनट भिगोएं"
      }
    }
  },
  // Day 7 (Sunday - NO DINNER)
  {
    breakfast: {
      name: "Protein Pancakes",
      nameHi: "प्रोटीन पैनकेक",
      emoji: "🥞",
      youtubeId: "ZUPfPNKzKCM", // Hebbars Kitchen
      protein: 35,
      calories: 420,
      prepTime: 20,
      equipment: 'stove'
    },
    lunch: {
      name: "Chicken Biryani",
      nameHi: "चिकन बिरयानी",
      emoji: "🍚",
      youtubeId: "fXxBMrpFDKw", // Kabita's Kitchen
      protein: 45,
      calories: 580,
      prepTime: 50,
      equipment: 'stove',
      prep: {
        when: 'night-before',
        taskEn: "Marinate chicken, soak rice",
        taskHi: "चिकन मैरिनेट करें, चावल भिगोएं"
      }
    }
    // No dinner on Sunday
  },
  // Day 8 (Monday)
  {
    breakfast: {
      name: "Protein Oats + Banana",
      nameHi: "प्रोटीन ओट्स केला",
      emoji: "🥣",
      youtubeId: "6MNx5ZKkV2E", // Hebbars Kitchen
      protein: 32,
      calories: 380,
      prepTime: 10,
      equipment: 'microwave'
    },
    lunch: {
      name: "Chole + Roti",
      nameHi: "छोले रोटी",
      emoji: "🫘",
      youtubeId: "qQ8u13y4DOs", // Ranveer Brar
      protein: 24,
      calories: 420,
      prepTime: 40,
      equipment: 'stove',
      prep: {
        when: 'night-before',
        taskEn: "Soak chickpeas overnight",
        taskHi: "छोले रात भर भिगोएं"
      }
    },
    dinner: {
      name: "Grilled Chicken Breast",
      nameHi: "ग्रिल्ड चिकन ब्रेस्ट",
      emoji: "🍗",
      youtubeId: "6TH17gvp3gY", // Your Food Lab
      protein: 55,
      calories: 320,
      prepTime: 25,
      equipment: 'airfryer',
      prep: {
        when: 'morning',
        taskEn: "Marinate chicken with herbs",
        taskHi: "जड़ी-बूटियों में चिकन मैरिनेट करें"
      }
    }
  },
  // Day 9 (Tuesday)
  {
    breakfast: {
      name: "Egg Dosa",
      nameHi: "एग डोसा",
      emoji: "🥚",
      youtubeId: "CRu7AIj90HE", // Hebbars Kitchen
      protein: 24,
      calories: 320,
      prepTime: 20,
      equipment: 'stove'
    },
    lunch: {
      name: "Egg Biryani",
      nameHi: "एग बिरयानी",
      emoji: "🍚",
      youtubeId: "y7pLu-LmX2U", // Hebbars Kitchen
      protein: 28,
      calories: 480,
      prepTime: 45,
      equipment: 'stove',
      prep: {
        when: 'morning',
        taskEn: "Soak rice for 30 mins",
        taskHi: "चावल 30 मिनट भिगोएं"
      }
    },
    dinner: {
      name: "Mexican Chicken Burrito Bowl",
      nameHi: "मैक्सिकन चिकन बुरिटो बाउल",
      emoji: "🌯",
      youtubeId: "CfVdwSZ2L88", // Your Food Lab
      protein: 45,
      calories: 480,
      prepTime: 30,
      equipment: 'stove'
    }
  },
  // Day 10 (Wednesday)
  {
    breakfast: {
      name: "Oats Chilla",
      nameHi: "ओट्स चीला",
      emoji: "🥞",
      youtubeId: "VEpCMAxYKl0", // Hebbars Kitchen
      protein: 18,
      calories: 280,
      prepTime: 15,
      equipment: 'stove'
    },
    lunch: {
      name: "Butter Chicken + Rice",
      nameHi: "बटर चिकन चावल",
      emoji: "🍗",
      youtubeId: "H0GhcOj3GJA", // Chef Ranveer Brar
      protein: 45,
      calories: 520,
      prepTime: 40,
      equipment: 'stove',
      prep: {
        when: 'night-before',
        taskEn: "Marinate chicken overnight",
        taskHi: "चिकन रात भर मैरिनेट करें"
      }
    },
    dinner: {
      name: "Paneer Bhurji + Roti",
      nameHi: "पनीर भुर्जी रोटी",
      emoji: "🧀",
      youtubeId: "RJq7MVZbv9I", // Hebbars Kitchen
      protein: 32,
      calories: 380,
      prepTime: 20,
      equipment: 'stove'
    }
  },
  // Day 11 (Thursday)
  {
    breakfast: {
      name: "Boiled Eggs + Multigrain Toast",
      nameHi: "उबले अंडे मल्टीग्रेन टोस्ट",
      emoji: "🥚",
      youtubeId: "IgF0z5VLbqE", // Kabita's Kitchen
      protein: 28,
      calories: 320,
      prepTime: 10,
      equipment: 'stove'
    },
    lunch: {
      name: "Chicken Pulao",
      nameHi: "चिकन पुलाव",
      emoji: "🍚",
      youtubeId: "LQFJEvH6jN0", // Chef Ranveer Brar
      protein: 40,
      calories: 480,
      prepTime: 40,
      equipment: 'stove',
      prep: {
        when: 'morning',
        taskEn: "Soak rice for 30 mins",
        taskHi: "चावल 30 मिनट भिगोएं"
      }
    },
    dinner: {
      name: "Egg Fried Rice",
      nameHi: "एग फ्राइड राइस",
      emoji: "🍳",
      youtubeId: "Y-yKaffBPBI", // Kabita's Kitchen
      protein: 24,
      calories: 420,
      prepTime: 15,
      equipment: 'stove'
    }
  },
  // Day 12 (Friday)
  {
    breakfast: {
      name: "Sprouts + Egg Salad",
      nameHi: "स्प्राउट्स एग सलाद",
      emoji: "🥗",
      youtubeId: "BbhRsNu1t9Y", // Hebbars Kitchen
      protein: 26,
      calories: 280,
      prepTime: 10,
      equipment: 'no-cook',
      prep: {
        when: 'night-before',
        taskEn: "Sprout moong overnight",
        taskHi: "मूंग रात भर अंकुरित करें"
      }
    },
    lunch: {
      name: "Dal Makhani + Rice",
      nameHi: "दाल मखनी चावल",
      emoji: "🥣",
      youtubeId: "p6__J7dGjzQ", // Ranveer Brar
      protein: 22,
      calories: 450,
      prepTime: 45,
      equipment: 'stove',
      prep: {
        when: 'night-before',
        taskEn: "Soak dal overnight",
        taskHi: "दाल रात भर भिगोएं"
      }
    },
    dinner: {
      name: "Chicken Tikka (Air Fryer)",
      nameHi: "चिकन टिक्का",
      emoji: "🍗",
      youtubeId: "M0j68pSgHJA", // Your Food Lab
      protein: 52,
      calories: 320,
      prepTime: 30,
      equipment: 'airfryer',
      prep: {
        when: 'morning',
        taskEn: "Marinate chicken",
        taskHi: "चिकन मैरिनेट करें"
      }
    }
  },
  // Day 13 (Saturday)
  {
    breakfast: {
      name: "Egg Paratha",
      nameHi: "एग पराठा",
      emoji: "🥚",
      youtubeId: "x9Q8aJfMbmQ", // Hebbars Kitchen
      protein: 24,
      calories: 380,
      prepTime: 20,
      equipment: 'stove'
    },
    lunch: {
      name: "Japanese Chicken Katsu",
      nameHi: "जापानी चिकन कत्सु",
      emoji: "🍗",
      youtubeId: "nw3F1bLcz4Q", // Your Food Lab
      protein: 45,
      calories: 520,
      prepTime: 30,
      equipment: 'airfryer'
    },
    dinner: {
      name: "Kadhi Pakora + Rice",
      nameHi: "कढ़ी पकोड़ा चावल",
      emoji: "🥣",
      youtubeId: "kGKx0y7q3Ls", // Ranveer Brar
      protein: 20,
      calories: 420,
      prepTime: 35,
      equipment: 'stove'
    }
  },
  // Day 14 (Sunday - NO DINNER)
  {
    breakfast: {
      name: "Egg Benedict (Simplified)",
      nameHi: "एग बेनेडिक्ट",
      emoji: "🍳",
      youtubeId: "sEMFVhBGwGk", // Kabita's Kitchen
      protein: 28,
      calories: 420,
      prepTime: 20,
      equipment: 'stove'
    },
    lunch: {
      name: "Chicken Noodles (Hakka Style)",
      nameHi: "चिकन नूडल्स हक्का",
      emoji: "🍜",
      youtubeId: "DQE8HqTxqSc", // Hebbars Kitchen
      protein: 42,
      calories: 520,
      prepTime: 30,
      equipment: 'stove'
    }
    // No dinner on Sunday
  }
];

// Get current day index (0-13)
export function getDayIndex(): number {
  const startDate = new Date('2024-01-01');
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - startDate.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays % 14;
}

// Get current meal based on IST time
export function getMealType(): 'breakfast' | 'lunch' | 'dinner' {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const istTime = new Date(utc + (5.5 * 60 * 60 * 1000));
  const hour = istTime.getHours();
  
  if (hour >= 5 && hour < 11) {
    return 'breakfast';
  } else if (hour >= 11 && hour < 17) {
    return 'lunch';
  } else {
    return 'dinner';
  }
}

// Get IST hour
export function getISTHour(): number {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const istTime = new Date(utc + (5.5 * 60 * 60 * 1000));
  return istTime.getHours();
}

// Get IST time string
export function getISTTime(): string {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const istTime = new Date(utc + (5.5 * 60 * 60 * 1000));
  return istTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
}

// Check if today is Sunday
export function isSunday(): boolean {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const istTime = new Date(utc + (5.5 * 60 * 60 * 1000));
  return istTime.getDay() === 0;
}

// Get next cook arrival time
export function getNextCookTime(): { time: string; isSunday: boolean } {
  const hour = getISTHour();
  const sunday = isSunday();
  
  if (sunday) {
    if (hour < 10) {
      return { time: '10:00 AM', isSunday: true };
    } else if (hour < 19) {
      return { time: '7:00 PM', isSunday: false };
    } else {
      return { time: '7:00 AM', isSunday: false };
    }
  } else {
    if (hour < 7) {
      return { time: '7:00 AM', isSunday: false };
    } else if (hour < 19) {
      return { time: '7:00 PM', isSunday: false };
    } else {
      return { time: '7:00 AM', isSunday: false };
    }
  }
}

// Get meal emoji
export function getMealEmoji(mealType: 'breakfast' | 'lunch' | 'dinner'): string {
  return { breakfast: '🌅', lunch: '☀️', dinner: '🌙' }[mealType];
}

// Get equipment emoji
export function getEquipmentEmoji(equipment: string): string {
  const emojis: Record<string, string> = {
    'stove': '🔥',
    'airfryer': '🌀',
    'microwave': '📻',
    'no-cook': '❄️'
  };
  return emojis[equipment] || '🍳';
}

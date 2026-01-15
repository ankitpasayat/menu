'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  recipes, 
  getDayIndex, 
  getMealType, 
  getISTTime,
  getNextCookTime,
  getMealEmoji,
  getEquipmentEmoji,
  Recipe,
  DayMenu
} from '@/lib/recipes';
import { Locale, t } from '@/lib/i18n';

export default function Home() {
  const [todayMenu, setTodayMenu] = useState<DayMenu | null>(null);
  const [tomorrowMenu, setTomorrowMenu] = useState<DayMenu | null>(null);
  const [mealType, setMealType] = useState<'breakfast' | 'lunch' | 'dinner'>('breakfast');
  const [istTime, setIstTime] = useState('');
  const [dayIndex, setDayIndex] = useState(0);
  const [showAllMeals, setShowAllMeals] = useState(false);
  const [showFuturePlan, setShowFuturePlan] = useState(false);
  const [cookTime, setCookTime] = useState({ time: '7:00 AM', isSunday: false });
  
  // Settings
  const [locale, setLocale] = useState<Locale>('hi');
  const [darkMode, setDarkMode] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    // Load preferences from localStorage
    const savedLocale = localStorage.getItem('locale') as Locale;
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedLocale) setLocale(savedLocale);
    if (savedDarkMode) setDarkMode(savedDarkMode);
  }, []);

  useEffect(() => {
    // Apply dark mode
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', String(darkMode));
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('locale', locale);
  }, [locale]);

  useEffect(() => {
    const updateMenu = () => {
      const day = getDayIndex();
      const meal = getMealType();
      const nextCook = getNextCookTime();
      
      setDayIndex(day);
      setMealType(meal);
      setIstTime(getISTTime());
      setTodayMenu(recipes[day]);
      setTomorrowMenu(recipes[(day + 1) % 14]);
      setCookTime(nextCook);
    };

    updateMenu();
    const interval = setInterval(updateMenu, 60000);
    return () => clearInterval(interval);
  }, []);

  const openYouTube = (youtubeId: string) => {
    window.open(`https://www.youtube.com/watch?v=${youtubeId}`, '_blank');
  };

  const getCurrentRecipe = (): Recipe | null => {
    if (!todayMenu) return null;
    if (mealType === 'dinner' && !todayMenu.dinner) {
      // If it's dinner time on Sunday (no dinner), show lunch instead
      return todayMenu.lunch;
    }
    return todayMenu[mealType] || null;
  };

  // Get prep instructions that need attention now
  const getPrepAlerts = () => {
    const alerts: { recipe: Recipe; meal: string; when: string }[] = [];
    
    if (!todayMenu || !tomorrowMenu) return alerts;

    // Check tonight's dinner for morning prep (if dinner exists)
    if (todayMenu.dinner?.prep?.when === 'morning') {
      alerts.push({ recipe: todayMenu.dinner, meal: t(locale, 'dinner'), when: t(locale, 'prepMorning') });
    }

    // Check tomorrow's meals for night-before prep
    if (tomorrowMenu.breakfast.prep?.when === 'night-before') {
      alerts.push({ recipe: tomorrowMenu.breakfast, meal: t(locale, 'breakfast'), when: t(locale, 'prepNightBefore') });
    }
    if (tomorrowMenu.lunch.prep?.when === 'night-before') {
      alerts.push({ recipe: tomorrowMenu.lunch, meal: t(locale, 'lunch'), when: t(locale, 'prepNightBefore') });
    }
    if (tomorrowMenu.dinner?.prep?.when === 'night-before') {
      alerts.push({ recipe: tomorrowMenu.dinner, meal: t(locale, 'dinner'), when: t(locale, 'prepNightBefore') });
    }

    return alerts;
  };

  if (!todayMenu) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-6xl animate-pulse">🥗</div>
      </div>
    );
  }

  const currentRecipe = getCurrentRecipe();
  const prepAlerts = getPrepAlerts();

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{getMealEmoji(mealType)}</span>
            <div>
              <h1 className="text-lg font-bold text-gray-800 dark:text-white">
                {t(locale, mealType)}
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                🕐 {istTime} • {t(locale, 'day')} {dayIndex + 1}/14
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFuturePlan(!showFuturePlan)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                showFuturePlan 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-purple-100 dark:bg-purple-900 hover:bg-purple-200 dark:hover:bg-purple-800 text-purple-700 dark:text-purple-300'
              }`}
            >
              📅 {t(locale, 'viewFuture')}
            </button>
            <button 
              onClick={() => setShowAllMeals(!showAllMeals)}
              className="px-3 py-1.5 bg-green-100 dark:bg-green-900 hover:bg-green-200 dark:hover:bg-green-800 rounded-full text-sm font-medium text-green-700 dark:text-green-300 transition-colors"
            >
              {showAllMeals ? `📍 ${t(locale, 'showCurrent')}` : `📋 ${t(locale, 'showAll')}`}
            </button>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              ⚙️
            </button>
          </div>
        </div>
      </header>

      {/* Settings Panel */}
      {showSettings && (
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-4">
          <div className="max-w-4xl mx-auto space-y-4">
            <h3 className="font-semibold text-gray-800 dark:text-white">{t(locale, 'settings')}</h3>
            
            {/* Language Toggle */}
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-300">{t(locale, 'language')}</span>
              <div className="flex bg-gray-100 dark:bg-gray-700 rounded-full p-1">
                <button
                  onClick={() => setLocale('en')}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    locale === 'en' 
                      ? 'bg-white dark:bg-gray-600 text-gray-800 dark:text-white shadow' 
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setLocale('hi')}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    locale === 'hi' 
                      ? 'bg-white dark:bg-gray-600 text-gray-800 dark:text-white shadow' 
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  हिंदी
                </button>
              </div>
            </div>

            {/* Theme Toggle */}
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-300">{t(locale, 'theme')}</span>
              <div className="flex bg-gray-100 dark:bg-gray-700 rounded-full p-1">
                <button
                  onClick={() => setDarkMode(false)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    !darkMode 
                      ? 'bg-white dark:bg-gray-600 text-gray-800 dark:text-white shadow' 
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  ☀️ {t(locale, 'lightMode')}
                </button>
                <button
                  onClick={() => setDarkMode(true)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    darkMode 
                      ? 'bg-white dark:bg-gray-600 text-gray-800 dark:text-white shadow' 
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  🌙 {t(locale, 'darkMode')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cook Schedule Banner */}
      <div className="bg-amber-50 dark:bg-amber-900/30 border-b border-amber-200 dark:border-amber-800 px-4 py-2">
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-2 text-amber-800 dark:text-amber-200 text-sm">
          <span>👩‍🍳</span>
          <span>{t(locale, 'cookArrivesAt')} <strong>{cookTime.time}</strong></span>
          {cookTime.isSunday && <span className="bg-amber-200 dark:bg-amber-800 px-2 py-0.5 rounded text-xs">{t(locale, 'sundaySpecial')}</span>}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-4">
        
        {/* Prep Alerts */}
        {prepAlerts.length > 0 && (
          <div className="mb-4 bg-orange-50 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-800 rounded-2xl p-4">
            <h3 className="font-semibold text-orange-800 dark:text-orange-200 mb-2 flex items-center gap-2">
              <span>⚠️</span> {t(locale, 'prepRequired')}
            </h3>
            <div className="space-y-2">
              {prepAlerts.map((alert, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-white dark:bg-gray-800 rounded-xl p-3">
                  <span className="text-2xl">{alert.recipe.emoji}</span>
                  <div className="flex-1">
                    <div className="font-medium text-gray-800 dark:text-white">
                      {locale === 'hi' ? alert.recipe.nameHi : alert.recipe.name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {alert.meal} • {alert.when}
                    </div>
                    <div className="text-sm text-orange-600 dark:text-orange-400 mt-1">
                      📝 {locale === 'hi' ? alert.recipe.prep?.taskHi : alert.recipe.prep?.taskEn}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {showFuturePlan && (
          <FuturePlanView 
            recipes={recipes} 
            currentDayIndex={dayIndex} 
            locale={locale} 
            openYouTube={openYouTube}
          />
        )}

        {!showFuturePlan && !showAllMeals && currentRecipe && (
          <>
            {/* Current Meal Card */}
            <RecipeCard 
              recipe={currentRecipe} 
              onClick={() => openYouTube(currentRecipe.youtubeId)}
              size="large"
              locale={locale}
            />

            {/* Other meals */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3 px-1">
                {t(locale, 'otherMeals')}
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {mealType !== 'breakfast' && (
                  <RecipeCard 
                    recipe={todayMenu.breakfast}
                    onClick={() => openYouTube(todayMenu.breakfast.youtubeId)}
                    size="small"
                    label={t(locale, 'breakfast')}
                    locale={locale}
                  />
                )}
                {mealType !== 'lunch' && (
                  <RecipeCard 
                    recipe={todayMenu.lunch}
                    onClick={() => openYouTube(todayMenu.lunch.youtubeId)}
                    size="small"
                    label={t(locale, 'lunch')}
                    locale={locale}
                  />
                )}
                {mealType !== 'dinner' && todayMenu.dinner && (
                  <RecipeCard 
                    recipe={todayMenu.dinner}
                    onClick={() => todayMenu.dinner && openYouTube(todayMenu.dinner.youtubeId)}
                    size="small"
                    label={t(locale, 'dinner')}
                    locale={locale}
                  />
                )}
              </div>
            </div>
          </>
        )}

        {!showFuturePlan && showAllMeals && (
          <>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
              {t(locale, 'todayMenu')}
            </h2>
            <div className="space-y-4">
              <MealSection
                emoji="🌅"
                label={t(locale, 'breakfast')}
                recipe={todayMenu.breakfast}
                onClick={() => openYouTube(todayMenu.breakfast.youtubeId)}
                locale={locale}
              />
              <MealSection
                emoji="☀️"
                label={t(locale, 'lunch')}
                recipe={todayMenu.lunch}
                onClick={() => openYouTube(todayMenu.lunch.youtubeId)}
                locale={locale}
              />
              {todayMenu.dinner && (
                <MealSection
                  emoji="🌙"
                  label={t(locale, 'dinner')}
                  recipe={todayMenu.dinner}
                  onClick={() => todayMenu.dinner && openYouTube(todayMenu.dinner.youtubeId)}
                  locale={locale}
                />
              )}
              {!todayMenu.dinner && (
                <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-4 text-center">
                  <span className="text-2xl">🌙</span>
                  <p className="text-gray-500 dark:text-gray-400 mt-2">{t(locale, 'noDinner')}</p>
                </div>
              )}
            </div>

            {/* Daily Totals */}
            <div className="mt-6 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 rounded-2xl p-4">
              <h3 className="font-bold text-gray-800 dark:text-white mb-3 text-center">
                📊 {t(locale, 'todayTotal')}
              </h3>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-white/70 dark:bg-gray-800/70 rounded-xl p-3">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {todayMenu.breakfast.protein + todayMenu.lunch.protein + (todayMenu.dinner?.protein || 0)}g
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">💪 {t(locale, 'protein')}</div>
                </div>
                <div className="bg-white/70 dark:bg-gray-800/70 rounded-xl p-3">
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {todayMenu.breakfast.calories + todayMenu.lunch.calories + (todayMenu.dinner?.calories || 0)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">🔥 {t(locale, 'calories')}</div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

// Future Plan View Component - Shows all 14 days at a glance
function FuturePlanView({ 
  recipes, 
  currentDayIndex, 
  locale, 
  openYouTube 
}: { 
  recipes: DayMenu[]; 
  currentDayIndex: number; 
  locale: Locale; 
  openYouTube: (youtubeId: string) => void;
}) {
  const dayNames = locale === 'hi' 
    ? ['सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार', 'रविवार']
    : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
        📅 {t(locale, 'allDays')}
      </h2>
      
      <div className="space-y-3">
        {recipes.map((dayMenu, idx) => {
          const isToday = idx === currentDayIndex;
          const dayOfWeek = idx % 7;
          const weekNum = Math.floor(idx / 7) + 1;
          const isSunday = dayOfWeek === 6;
          const totalProtein = dayMenu.breakfast.protein + dayMenu.lunch.protein + (dayMenu.dinner?.protein || 0);
          const totalCalories = dayMenu.breakfast.calories + dayMenu.lunch.calories + (dayMenu.dinner?.calories || 0);
          
          return (
            <div 
              key={idx}
              className={`
                rounded-2xl overflow-hidden transition-all
                ${isToday 
                  ? 'ring-2 ring-green-500 bg-green-50 dark:bg-green-900/30' 
                  : 'bg-white dark:bg-gray-800'
                }
              `}
            >
              {/* Day Header */}
              <div className={`
                px-4 py-2 flex items-center justify-between
                ${isToday 
                  ? 'bg-green-500 text-white' 
                  : isSunday 
                    ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200'
                }
              `}>
                <div className="flex items-center gap-2">
                  <span className="font-bold">
                    {locale === 'hi' ? `दिन ${idx + 1}` : `Day ${idx + 1}`}
                  </span>
                  <span className="text-sm opacity-80">
                    ({dayNames[dayOfWeek]} • W{weekNum})
                  </span>
                  {isToday && (
                    <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs font-medium">
                      {locale === 'hi' ? 'आज' : 'Today'}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span>💪 {totalProtein}g</span>
                  <span>🔥 {totalCalories}</span>
                </div>
              </div>

              {/* Meals Grid */}
              <div className="p-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
                {/* Breakfast */}
                <MiniMealCard 
                  emoji="🌅"
                  label={locale === 'hi' ? 'नाश्ता' : 'Breakfast'}
                  recipe={dayMenu.breakfast}
                  locale={locale}
                  onClick={() => openYouTube(dayMenu.breakfast.youtubeId)}
                />
                
                {/* Lunch */}
                <MiniMealCard 
                  emoji="☀️"
                  label={locale === 'hi' ? 'लंच' : 'Lunch'}
                  recipe={dayMenu.lunch}
                  locale={locale}
                  onClick={() => openYouTube(dayMenu.lunch.youtubeId)}
                />
                
                {/* Dinner */}
                {dayMenu.dinner ? (
                  <MiniMealCard 
                    emoji="🌙"
                    label={locale === 'hi' ? 'डिनर' : 'Dinner'}
                    recipe={dayMenu.dinner}
                    locale={locale}
                    onClick={() => dayMenu.dinner && openYouTube(dayMenu.dinner.youtubeId)}
                  />
                ) : (
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-3 flex items-center justify-center text-gray-400 dark:text-gray-500 text-sm">
                    🌙 {locale === 'hi' ? 'कोई डिनर नहीं' : 'No dinner'}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Mini Meal Card for the 14-day view
function MiniMealCard({ 
  emoji, 
  label, 
  recipe, 
  locale, 
  onClick 
}: { 
  emoji: string; 
  label: string; 
  recipe: Recipe; 
  locale: Locale;
  onClick: () => void;
}) {
  return (
    <div 
      onClick={onClick}
      className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600/50 transition-colors"
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="text-sm">{emoji}</span>
        <span className="text-xs text-gray-500 dark:text-gray-400">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xl">{recipe.emoji}</span>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-gray-800 dark:text-white text-sm truncate">
            {locale === 'hi' ? recipe.nameHi : recipe.name}
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            <span>💪 {recipe.protein}g</span>
            <span>⏱️ {recipe.prepTime}m</span>
            {recipe.prep && <span className="text-orange-500">⚠️</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

// Meal Section Component
function MealSection({ 
  emoji, 
  label, 
  recipe, 
  onClick,
  locale 
}: { 
  emoji: string; 
  label: string; 
  recipe: Recipe; 
  onClick: () => void;
  locale: Locale;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">{emoji}</span>
        <span className="font-semibold text-gray-700 dark:text-gray-200">{label}</span>
      </div>
      <RecipeCard recipe={recipe} onClick={onClick} size="medium" locale={locale} />
    </div>
  );
}

// Recipe Card Component
interface RecipeCardProps {
  recipe: Recipe;
  onClick: () => void;
  size: 'large' | 'medium' | 'small';
  label?: string;
  locale: Locale;
}

function RecipeCard({ recipe, onClick, size, label, locale }: RecipeCardProps) {
  const sizeClasses = {
    large: 'rounded-3xl',
    medium: 'rounded-2xl',
    small: 'rounded-xl'
  };

  const thumbnailClasses = {
    large: 'aspect-video',
    medium: 'aspect-video',
    small: 'aspect-[4/3]'
  };

  const thumbnail = `https://img.youtube.com/vi/${recipe.youtubeId}/maxresdefault.jpg`;

  return (
    <div 
      onClick={onClick}
      className={`
        bg-white dark:bg-gray-800 shadow-lg overflow-hidden cursor-pointer
        transition-all duration-200 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]
        ${sizeClasses[size]}
      `}
    >
      {/* Thumbnail */}
      <div className={`relative w-full bg-gray-200 dark:bg-gray-700 ${thumbnailClasses[size]}`}>
        <Image
          src={thumbnail}
          alt={recipe.name}
          fill
          className="object-cover"
          unoptimized
        />
        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/10">
          <div className={`
            bg-red-600 rounded-full flex items-center justify-center shadow-lg
            ${size === 'large' ? 'w-16 h-16' : size === 'medium' ? 'w-14 h-14' : 'w-10 h-10'}
          `}>
            <span className={`text-white ml-1 ${size === 'large' ? 'text-3xl' : size === 'medium' ? 'text-2xl' : 'text-lg'}`}>
              ▶
            </span>
          </div>
        </div>
        {/* Equipment badge */}
        <div className="absolute top-2 right-2 bg-white/90 dark:bg-gray-800/90 rounded-full px-2 py-1 text-xs">
          {getEquipmentEmoji(recipe.equipment)}
        </div>
        {/* Label badge */}
        {label && (
          <div className="absolute top-2 left-2 bg-black/70 text-white rounded-full px-2 py-1 text-xs">
            {label}
          </div>
        )}
        {/* Prep indicator */}
        {recipe.prep && (
          <div className="absolute bottom-2 left-2 bg-orange-500 text-white rounded-full px-2 py-1 text-xs flex items-center gap-1">
            ⚠️ {recipe.prep.when === 'night-before' ? '🌙' : '☀️'}
          </div>
        )}
      </div>

      {/* Content */}
      <div className={`${size === 'large' ? 'p-4' : size === 'medium' ? 'p-3' : 'p-2'}`}>
        <div className="flex items-center gap-2">
          <span className={`${size === 'large' ? 'text-4xl' : size === 'medium' ? 'text-3xl' : 'text-2xl'}`}>
            {recipe.emoji}
          </span>
          <div className="flex-1 min-w-0">
            <h3 className={`font-bold text-gray-800 dark:text-white truncate ${size === 'large' ? 'text-xl' : size === 'medium' ? 'text-lg' : 'text-sm'}`}>
              {locale === 'hi' ? recipe.nameHi : recipe.name}
            </h3>
            {size !== 'small' && (
              <p className="text-gray-500 dark:text-gray-400 text-xs truncate">
                {locale === 'hi' ? recipe.name : recipe.nameHi}
              </p>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className={`flex items-center gap-3 mt-2 ${size === 'small' ? 'text-xs' : 'text-sm'}`}>
          <span className="flex items-center gap-1 text-green-600 dark:text-green-400 font-semibold">
            💪 {recipe.protein}g
          </span>
          <span className="flex items-center gap-1 text-orange-600 dark:text-orange-400">
            🔥 {recipe.calories}
          </span>
          <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
            ⏱️ {recipe.prepTime}m
          </span>
        </div>

        {/* Prep instruction inline for medium/large */}
        {recipe.prep && size !== 'small' && (
          <div className="mt-2 bg-orange-50 dark:bg-orange-900/30 rounded-lg px-3 py-2 text-sm text-orange-700 dark:text-orange-300">
            📝 {locale === 'hi' ? recipe.prep.taskHi : recipe.prep.taskEn}
          </div>
        )}

        {/* Watch hint for large card */}
        {size === 'large' && (
          <div className="mt-3 text-center">
            <span className="inline-flex items-center gap-2 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-4 py-2 rounded-full text-sm font-medium">
              <span className="text-lg">▶</span>
              {t(locale, 'watchVideo')}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

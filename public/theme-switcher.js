// Theme Switcher for OBGYN Application
// Manages light/dark theme preferences with localStorage persistence

(function() {
  'use strict';

  const THEME_KEY = 'obgyn-theme-preference';
  const THEMES = {
    LIGHT: 'light',
    DARK: 'dark'
  };

  // Initialize theme on page load
  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? THEMES.DARK : THEMES.LIGHT);
    
    applyTheme(theme);
    updateToggleButton(theme);
  }

  // Apply theme to document
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
  }

  // Toggle between themes
  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
    
    applyTheme(newTheme);
    updateToggleButton(newTheme);
    
    // Trigger custom event for other components
    window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: newTheme } }));
  }

  // Update toggle button appearance
  function updateToggleButton(theme) {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;

    if (theme === THEMES.DARK) {
      toggleBtn.innerHTML = '☀️';
      toggleBtn.setAttribute('aria-label', 'Switch to Light Mode');
      toggleBtn.setAttribute('title', 'Light Mode');
    } else {
      toggleBtn.innerHTML = '🌙';
      toggleBtn.setAttribute('aria-label', 'Switch to Dark Mode');
      toggleBtn.setAttribute('title', 'Dark Mode');
    }
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
  } else {
    initTheme();
  }

  // Expose toggle function globally
  window.toggleTheme = toggleTheme;

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(THEME_KEY)) {
      applyTheme(e.matches ? THEMES.DARK : THEMES.LIGHT);
    }
  });
})();

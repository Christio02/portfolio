import { atom } from 'nanostores';

declare global {
	interface Window {
		__INITIAL_THEME_STATE__?: boolean;
	}
}
/**
 * Atom to store the theme state.
 */
export const isDark = atom(false);

export const getThemeScript = () => {
	return `
      (function() {
        // Get theme from localStorage or system preference
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const isDarkMode = savedTheme === 'dark' || (!savedTheme && systemPrefersDark);
        
        // Apply theme immediately to prevent flash
        if (isDarkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        
        // Store the initial theme state for hydration
        window.__INITIAL_THEME_STATE__ = isDarkMode;
      })();
    `;
};

/**
 * Initializes the theme based on localStorage and system preferences.
 * This should be called on the client side (e.g., in a script that runs on mount).
 *
 * @returns {Function} Cleanup function to remove the system preference listener.
 */
export function initTheme() {
	// Use the global variable set by our script
	const initialIsDark = typeof window !== 'undefined' && window.__INITIAL_THEME_STATE__;
	isDark.set(!!initialIsDark);

	// Set up system preference listener
	if (typeof window !== 'undefined') {
		const systemPref = window.matchMedia('(prefers-color-scheme: dark)');

		const handleChange = (event: MediaQueryListEvent) => {
			if (!localStorage.getItem('theme')) {
				// If no theme set from button
				isDark.set(event.matches);
				applyTheme(event.matches);
			}
		};

		systemPref.addEventListener('change', handleChange);

		// Return cleanup function
		return () => {
			systemPref.removeEventListener('change', handleChange);
		};
	}

	return () => {};
}

/**
 * Toggles the theme between dark and light.
 */
export function toggleTheme() {
	const newValue = !isDark.get();
	isDark.set(newValue);
	applyTheme(newValue);
}

/**
 * Applies the theme to the document and saves it to localStorage.
 *
 * @param {boolean} isDark - Indicates if the theme is dark.
 */
export function applyTheme(isDark: boolean) {
	if (isDark) {
		document.documentElement.classList.add('dark');
		localStorage.setItem('theme', 'dark');
	} else {
		document.documentElement.classList.remove('dark');
		localStorage.setItem('theme', 'light');
	}
}

import { useEffect } from 'react';
import { initTheme } from '../stores/themeStore';

export default function ThemeInitializer() {
	useEffect(() => {
		const cleanup = initTheme();
		return cleanup;
	}, []);

	return null;
}

import React, { useState } from 'react';

export function useThemeSwitcher(defaultTheme: 'light' | 'dark') {
  const [theme, setTheme] = useState<'light' | 'dark'>(defaultTheme);
  const toggleTheme = (value: boolean) => setTheme(value ? 'dark' : 'light');
  return { theme, setTheme: toggleTheme };
}
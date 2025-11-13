import React, { useState } from 'react';

export function useThemeSwitcher() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const toggleTheme = (value: boolean) => setTheme(value ? 'dark' : 'light');
  return { theme, toggleTheme };
}
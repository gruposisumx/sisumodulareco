import React from 'react';
import { ColorPicker } from './ColorPicker';

interface Theme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

interface ThemeCustomizerProps {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export function ThemeCustomizer({ theme, onThemeChange }: ThemeCustomizerProps) {
  const handleColorChange = (key: keyof Theme) => (color: string) => {
    onThemeChange({ ...theme, [key]: color });
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
      <div className="space-y-4">
        <ColorPicker
          label="Primary Color"
          value={theme.primary}
          onChange={handleColorChange('primary')}
        />
        <ColorPicker
          label="Secondary Color"
          value={theme.secondary}
          onChange={handleColorChange('secondary')}
        />
        <ColorPicker
          label="Accent Color"
          value={theme.accent}
          onChange={handleColorChange('accent')}
        />
      </div>
      <div className="space-y-4">
        <ColorPicker
          label="Background Color"
          value={theme.background}
          onChange={handleColorChange('background')}
        />
        <ColorPicker
          label="Text Color"
          value={theme.text}
          onChange={handleColorChange('text')}
        />
      </div>
    </div>
  );
}
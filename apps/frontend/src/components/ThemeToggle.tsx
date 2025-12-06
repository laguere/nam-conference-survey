import { ActionIcon, useMantineColorScheme, useComputedColorScheme } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleColorScheme = () => {
    const newScheme = computedColorScheme === 'dark' ? 'light' : 'dark';
    setColorScheme(newScheme);
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <ActionIcon
        variant="default"
        size="lg"
        aria-label="Toggle theme"
        style={{ minWidth: '44px', minHeight: '44px' }}
      >
        <IconSun size={20} />
      </ActionIcon>
    );
  }

  const isDark = computedColorScheme === 'dark';

  return (
    <ActionIcon
      onClick={toggleColorScheme}
      variant="default"
      size="lg"
      aria-label={`Toggle theme. Current theme: ${isDark ? 'dark' : 'light'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      style={{ minWidth: '44px', minHeight: '44px' }}
    >
      {isDark ? <IconSun size={20} /> : <IconMoon size={20} />}
    </ActionIcon>
  );
}

/* eslint-disable react/prop-types */
import * as React from 'react';
import { useColorScheme } from '@mui/joy/styles';

import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeIcon from '@mui/icons-material/LightMode';

import { Switch, IconButton } from '@mui/joy';

export default function ColorSchemeToggle({ onClick, sx, ...other}) {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return (
      <IconButton
        size="sm"
        variant="outlined"
        color="neutral"
        {...other}
        sx={sx}
        disabled
      />
    );
  }
  return (
    <Switch
    size="lg"
    slotProps={{
      input: { 'aria-label': 'Dark mode' },
      thumb: {
        children: mode === 'dark' ? (<DarkModeRoundedIcon/>) : (<LightModeIcon/>),
        style: {
            transition: 'all 100ms ease-out'
        }
      },
    }}
    sx={{
      '--Switch-thumbSize': '16px',
      ...(Array.isArray(sx) ? sx : [sx])
    }}
    onClick={(event) => {
            if (mode === 'light') {
              setMode('dark');
            } else {
              setMode('light');
            }
            onClick?.(event);
          }}
    checked={ mode === 'dark' ? true : false }
  />
  );
}

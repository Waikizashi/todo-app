// ThemeToggle.tsx
import React from 'react';
import { useTheme } from '@/app/context/ThemeContext'
import { Button } from 'react-bootstrap';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Brightness3Icon from '@mui/icons-material/Brightness3';
import clsx from "clsx";

const ThemeSwitcher: React.FC = () => {
    const { theme, themeSwitch } = useTheme();

    return (
        <Button className={clsx('mx-0 px-1 pt-0 pb-1 secondary border-0',
            {
                'bg-dark': theme === 'light',
                'bg-light': theme === 'dark',
            })}
                onClick={themeSwitch}>
            {theme === 'light' ? <Brightness3Icon fontSize='small'/> : <WbSunnyIcon color='warning'  fontSize='small'/>}
        </Button>
    );
};

export default ThemeSwitcher;

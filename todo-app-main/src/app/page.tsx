'use client';
import React from 'react';
import {ThemeProvider, useTheme} from "@/app/context/ThemeContext";
import App from "@/app/App";

export default function Home() {

  return (
      <ThemeProvider>
        <App/>
      </ThemeProvider>
  );
}

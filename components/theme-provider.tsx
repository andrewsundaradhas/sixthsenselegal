'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

export function ThemeProvider({ children }: ThemeProviderProps) {
  return <NextThemesProvider attribute="class" defaultTheme="dark" forcedTheme="dark" enableSystem={false}>{children}</NextThemesProvider>
}

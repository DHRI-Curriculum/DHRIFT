'use client'

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import HomeIcon from '@mui/icons-material/Home'
import Link from 'next/link'
import { useTheme as useNextTheme } from 'next-themes'
import { useState, useEffect } from 'react'

interface HeaderProps {
  onMenuClick?: () => void
  showMenuButton?: boolean
}

/**
 * Header component with navigation and theme toggle
 */
export function Header({ onMenuClick, showMenuButton = false }: HeaderProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const { theme: currentTheme, setTheme } = useNextTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(currentTheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <AppBar position="sticky" elevation={1}>
      <Toolbar>
        {/* Menu button for mobile */}
        {showMenuButton && isMobile && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={onMenuClick}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* Logo/Home */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Link href="/inst" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
              DHRIFT
            </Typography>
          </Link>
          <Typography variant="caption" sx={{ ml: 1, opacity: 0.7, display: { xs: 'none', sm: 'block' } }}>
            Digital Humanities Research Infrastructure for Teaching
          </Typography>
        </Box>

        {/* Navigation buttons */}
        {!isMobile && (
          <Box sx={{ display: 'flex', gap: 1, mr: 2 }}>
            <Button
              component={Link}
              href="/inst"
              startIcon={<HomeIcon />}
              color="inherit"
            >
              Home
            </Button>
          </Box>
        )}

        {/* Theme toggle */}
        {mounted && (
          <IconButton onClick={toggleTheme} color="inherit" aria-label="toggle theme">
            {currentTheme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  )
}

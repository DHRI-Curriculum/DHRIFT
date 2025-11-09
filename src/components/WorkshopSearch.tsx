'use client'

import { useState } from 'react'
import {
  TextField,
  InputAdornment,
  Box,
  Chip,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'

interface WorkshopSearchProps {
  onSearchChange: (query: string) => void
  onFilterChange?: (filters: string[]) => void
  availableFilters?: string[]
}

/**
 * Search and filter component for workshops
 */
export function WorkshopSearch({
  onSearchChange,
  onFilterChange,
  availableFilters = [],
}: WorkshopSearchProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    onSearchChange(value)
  }

  const handleFilterToggle = (filter: string) => {
    const newFilters = selectedFilters.includes(filter)
      ? selectedFilters.filter(f => f !== filter)
      : [...selectedFilters, filter]

    setSelectedFilters(newFilters)
    onFilterChange?.(newFilters)
  }

  return (
    <Box sx={{ mb: 3 }}>
      <TextField
        fullWidth
        placeholder="Search workshops..."
        value={searchQuery}
        onChange={(e) => handleSearchChange(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: searchQuery && (
            <InputAdornment
              position="end"
              sx={{ cursor: 'pointer' }}
              onClick={() => handleSearchChange('')}
            >
              <ClearIcon />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 2 }}
      />

      {availableFilters.length > 0 && (
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {availableFilters.map((filter) => (
            <Chip
              key={filter}
              label={filter}
              onClick={() => handleFilterToggle(filter)}
              color={selectedFilters.includes(filter) ? 'primary' : 'default'}
              variant={selectedFilters.includes(filter) ? 'filled' : 'outlined'}
            />
          ))}
        </Box>
      )}
    </Box>
  )
}

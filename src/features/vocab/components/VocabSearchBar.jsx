import { useMemo } from 'react';
import { Box, TextField, InputAdornment, Select, MenuItem, Chip, Stack, IconButton, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

const JLPT_LEVELS = ['All', 'N5', 'N4', 'N3', 'N2', 'N1'];
const POS_OPTIONS = ['noun', 'verb', 'adjective', 'adverb', 'expression'];

export default function VocabSearchBar({ value, onChange, filters, onFiltersChange, disabled }) {
  const posValue = filters.pos ?? [];
  const jlptValue = filters.jlpt ?? 'All';

  const handleClear = () => onChange?.('');

  const placeholder = useMemo(() => 'Search by kanji, kana, or English…', []);

  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} alignItems={{ xs: 'stretch', sm: 'center' }}>
      <TextField
        fullWidth
        size="medium"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: value ? (
            <InputAdornment position="end">
              <Tooltip title="Clear">
                <span>
                  <IconButton onClick={handleClear} size="small" disabled={disabled}>
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </span>
              </Tooltip>
            </InputAdornment>
          ) : null,
        }}
      />

      <Select
        size="small"
        value={jlptValue}
        onChange={(e) => onFiltersChange?.({ ...filters, jlpt: e.target.value })}
        disabled={disabled}
        sx={{ minWidth: 110 }}
      >
        {JLPT_LEVELS.map((lvl) => (
          <MenuItem key={lvl} value={lvl}>{lvl}</MenuItem>
        ))}
      </Select>

      <Select
        multiple
        size="small"
        value={posValue}
        onChange={(e) => onFiltersChange?.({ ...filters, pos: e.target.value })}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((val) => (
              <Chip key={val} label={val} size="small" />
            ))}
          </Box>
        )}
        disabled={disabled}
        sx={{ minWidth: 220 }}
      >
        {POS_OPTIONS.map((opt) => (
          <MenuItem key={opt} value={opt}>{opt}</MenuItem>
        ))}
      </Select>
    </Stack>
  );
}

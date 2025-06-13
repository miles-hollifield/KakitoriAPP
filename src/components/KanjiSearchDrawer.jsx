import { useState } from 'react';
import {
  Drawer,
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Stack,
  Slider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Divider,
  IconButton
} from '@mui/material';
import {
  ExpandMore,
  Close,
  Search,
  FilterList,
  Clear
} from '@mui/icons-material';

const JLPT_LEVELS = ['N5', 'N4', 'N3', 'N2', 'N1'];
const GRADE_LEVELS = [
  'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6',
  'Secondary', 'Jinmeiyō', 'Hyōgai'
];
const FREQUENCY_LEVELS = ['Very High', 'High', 'Medium', 'Low', 'Very Low'];

export default function KanjiSearchDrawer({ open, onClose, onSearch, currentFilters }) {
  const [filters, setFilters] = useState({
    character: '',
    meaning: '',
    reading: '',
    jlptLevels: [],
    gradeLevels: [],
    strokeRange: [1, 30],
    frequency: [],
    compounds: '',
    ...currentFilters
  });

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onSearch(newFilters);
  };

  const handleArrayFilterToggle = (key, value) => {
    const currentArray = filters[key] || [];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    handleFilterChange(key, newArray);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      character: '',
      meaning: '',
      reading: '',
      jlptLevels: [],
      gradeLevels: [],
      strokeRange: [1, 30],
      frequency: [],
      compounds: ''
    };
    setFilters(clearedFilters);
    onSearch(clearedFilters);
  };

  const hasActiveFilters = () => {
    return filters.character || filters.meaning || filters.reading || 
           filters.jlptLevels.length > 0 || filters.gradeLevels.length > 0 ||
           filters.strokeRange[0] !== 1 || filters.strokeRange[1] !== 30 ||
           filters.frequency.length > 0 || filters.compounds;
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: { xs: '100%', sm: 400 },
          p: 3
        }
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
          <FilterList />
          Advanced Search
        </Typography>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </Box>

      <Stack spacing={3}>
        {/* Basic Search */}
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6">Basic Search</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={2}>
              <TextField
                fullWidth
                label="Kanji Character"
                placeholder="水, 火, 学..."
                value={filters.character}
                onChange={(e) => handleFilterChange('character', e.target.value)}
                InputProps={{
                  startAdornment: <Search sx={{ color: '#666', mr: 1 }} />
                }}
              />
              
              <TextField
                fullWidth
                label="English Meaning"
                placeholder="water, fire, study..."
                value={filters.meaning}
                onChange={(e) => handleFilterChange('meaning', e.target.value)}
              />
              
              <TextField
                fullWidth
                label="Reading (Kun/On)"
                placeholder="みず, スイ, ひ, カ..."
                value={filters.reading}
                onChange={(e) => handleFilterChange('reading', e.target.value)}
              />
            </Stack>
          </AccordionDetails>
        </Accordion>

        {/* JLPT Level */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6">JLPT Level</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {JLPT_LEVELS.map(level => (
                <Chip
                  key={level}
                  label={level}
                  onClick={() => handleArrayFilterToggle('jlptLevels', level)}
                  color={filters.jlptLevels.includes(level) ? 'primary' : 'default'}
                  variant={filters.jlptLevels.includes(level) ? 'filled' : 'outlined'}
                />
              ))}
            </Stack>
          </AccordionDetails>
        </Accordion>

        {/* Grade Level */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6">Grade Level</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {GRADE_LEVELS.map(grade => (
                <Chip
                  key={grade}
                  label={grade}
                  size="small"
                  onClick={() => handleArrayFilterToggle('gradeLevels', grade)}
                  color={filters.gradeLevels.includes(grade) ? 'secondary' : 'default'}
                  variant={filters.gradeLevels.includes(grade) ? 'filled' : 'outlined'}
                />
              ))}
            </Stack>
          </AccordionDetails>
        </Accordion>

        {/* Stroke Count */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6">Stroke Count</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ px: 2 }}>
              <Typography variant="body2" sx={{ mb: 2, color: '#666' }}>
                Range: {filters.strokeRange[0]} - {filters.strokeRange[1]} strokes
              </Typography>
              <Slider
                value={filters.strokeRange}
                onChange={(e, newValue) => handleFilterChange('strokeRange', newValue)}
                valueLabelDisplay="auto"
                min={1}
                max={30}
                marks={[
                  { value: 1, label: '1' },
                  { value: 10, label: '10' },
                  { value: 20, label: '20' },
                  { value: 30, label: '30' }
                ]}
              />
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Frequency */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6">Usage Frequency</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {FREQUENCY_LEVELS.map(freq => (
                <Chip
                  key={freq}
                  label={freq}
                  size="small"
                  onClick={() => handleArrayFilterToggle('frequency', freq)}
                  color={filters.frequency.includes(freq) ? 'success' : 'default'}
                  variant={filters.frequency.includes(freq) ? 'filled' : 'outlined'}
                />
              ))}
            </Stack>
          </AccordionDetails>
        </Accordion>

        {/* Compounds */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6">Compound Words</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              fullWidth
              label="Search in compound words"
              placeholder="学校, 水道, 火事..."
              value={filters.compounds}
              onChange={(e) => handleFilterChange('compounds', e.target.value)}
              helperText="Find kanji that appear in specific compound words"
            />
          </AccordionDetails>
        </Accordion>

        <Divider />

        {/* Action Buttons */}
        <Stack spacing={2}>
          {hasActiveFilters() && (
            <Button
              variant="outlined"
              startIcon={<Clear />}
              onClick={clearAllFilters}
              fullWidth
            >
              Clear All Filters
            </Button>
          )}
          
          <Button
            variant="contained"
            onClick={onClose}
            fullWidth
            sx={{ bgcolor: '#b8862b', '&:hover': { bgcolor: '#a0752a' } }}
          >
            Apply Filters
          </Button>
        </Stack>
      </Stack>
    </Drawer>
  );
}
import { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Fab
} from '@mui/material';
import { Search, FilterList, ViewModule, ViewList } from '@mui/icons-material';
import { sampleKanji } from '../services/mockData';

// Import our existing components
import KanjiCardView from '../features/kanji/KanjiCardView';
import KanjiListView from '../features/kanji/KanjiListView';
import KanjiCatalog from '../features/kanji/KanjiCatalog';
import KanjiSearchDrawer from '../features/kanji/KanjiSearchDrawer';
import KanjiDetailModal from '../features/kanji/KanjiDetailModal';

export default function Kanji() {
  const [searchTerm, setSearchTerm] = useState('');
  const [jlptFilter, setJlptFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [kanjiList, setKanjiList] = useState(sampleKanji);
  const [viewMode, setViewMode] = useState('cards'); // 'cards' or 'list'
  const [searchDrawerOpen, setSearchDrawerOpen] = useState(false);
  const [selectedKanji, setSelectedKanji] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState({});
  
  const itemsPerPage = 20;

  const toggleFavorite = (kanjiId) => {
    setKanjiList(prev => prev.map(kanji => 
      kanji.id === kanjiId 
        ? { ...kanji, isFavorite: !kanji.isFavorite }
        : kanji
    ));
  };

  const handleKanjiSelect = (kanji) => {
    setSelectedKanji(kanji);
    setDetailModalOpen(true);
  };

  const playAudio = (text) => {
    // Audio playback functionality would be implemented here
    console.log(`Playing audio for: ${text}`);
  };

  // Enhanced filter function that includes advanced filters
  const filteredKanji = useMemo(() => {
    return kanjiList.filter(kanji => {
      // Basic search filter
      const matchesSearch = searchTerm === '' || 
        kanji.character.includes(searchTerm) ||
        kanji.meaning.toLowerCase().includes(searchTerm.toLowerCase()) ||
        kanji.readings.on.includes(searchTerm) ||
        kanji.readings.kun.includes(searchTerm);
      
      // JLPT filter
      const matchesJLPT = jlptFilter === '' || kanji.jlptLevel === jlptFilter;
      
      // Advanced filters
      const matchesAdvanced = Object.entries(advancedFilters).every(([key, value]) => {
        if (!value || (Array.isArray(value) && value.length === 0)) return true;
        
        switch (key) {
          case 'jlptLevels':
            return value.length === 0 || value.includes(kanji.jlptLevel);
          case 'strokeRange':
            return kanji.strokes >= value[0] && kanji.strokes <= value[1];
          case 'frequency':
            return value.length === 0 || value.includes(kanji.frequency);
          case 'character':
            return !value || kanji.character.includes(value);
          case 'meaning':
            return !value || kanji.meaning.toLowerCase().includes(value.toLowerCase());
          case 'reading':
            return !value || kanji.readings.on.includes(value) || kanji.readings.kun.includes(value);
          default:
            return true;
        }
      });
      
      return matchesSearch && matchesJLPT && matchesAdvanced;
    });
  }, [searchTerm, jlptFilter, kanjiList, advancedFilters]);

  // Reset to page 1 when search changes
  useMemo(() => {
    setCurrentPage(1);
  }, [searchTerm, jlptFilter, advancedFilters]);

  const handleAdvancedSearch = (filters) => {
    setAdvancedFilters(filters);
  };

  return (
    <Box sx={{ 
      bgcolor: '#fafafa', 
      minHeight: '100vh',
      py: 4
    }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ 
          textAlign: 'center', 
          mb: 4,
          maxWidth: 800,
          mx: 'auto'
        }}>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 600, 
              mb: 2, 
              color: '#333'
            }}
          >
            Kanji Search
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#666',
              lineHeight: 1.6
            }}
          >
            Search and explore Japanese kanji characters. Master the building blocks of written Japanese.
          </Typography>
        </Box>

        {/* Search Controls - FIXED LAYOUT */}
        <Paper 
          sx={{ 
            p: 3,
            mb: 4, 
            borderRadius: 3,
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            height: '100px' // FIXED HEIGHT
          }}
        >
          {/* Using CSS Grid for consistent layout */}
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 300px 100px', // FIXED column sizes
            gap: 3,
            alignItems: 'center',
            height: '56px' // FIXED HEIGHT for form elements
          }}>
            {/* Search Input - Takes remaining space */}
            <TextField
              fullWidth
              placeholder="Search by character, meaning, or reading..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: '#666' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  height: 56, // FIXED HEIGHT
                  '&:hover fieldset': {
                    borderColor: '#b8862b',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#b8862b',
                  },
                },
              }}
            />
            
            {/* JLPT Filter - FIXED WIDTH */}
            <FormControl fullWidth>
              <InputLabel>JLPT Level</InputLabel>
              <Select
                value={jlptFilter}
                label="JLPT Level"
                onChange={(e) => setJlptFilter(e.target.value)}
                sx={{
                  height: 56, // FIXED HEIGHT
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#b8862b',
                  },
                }}
              >
                <MenuItem value="">All Levels</MenuItem>
                <MenuItem value="N5">N5 - Beginner</MenuItem>
                <MenuItem value="N4">N4 - Elementary</MenuItem>
                <MenuItem value="N3">N3 - Intermediate</MenuItem>
                <MenuItem value="N2">N2 - Upper Intermediate</MenuItem>
                <MenuItem value="N1">N1 - Advanced</MenuItem>
              </Select>
            </FormControl>

            {/* View Mode Toggle - FIXED WIDTH */}
            <Box sx={{ 
              display: 'flex', 
              gap: 1,
              justifyContent: 'center'
            }}>
              <IconButton
                onClick={() => setViewMode('cards')}
                sx={{
                  width: 40, // FIXED SIZE
                  height: 40, // FIXED SIZE
                  bgcolor: viewMode === 'cards' ? '#b8862b' : 'transparent',
                  color: viewMode === 'cards' ? 'white' : '#666',
                  '&:hover': {
                    bgcolor: viewMode === 'cards' ? '#a0752a' : 'rgba(184, 134, 43, 0.1)'
                  }
                }}
              >
                <ViewModule />
              </IconButton>
              <IconButton
                onClick={() => setViewMode('list')}
                sx={{
                  width: 40, // FIXED SIZE
                  height: 40, // FIXED SIZE
                  bgcolor: viewMode === 'list' ? '#b8862b' : 'transparent',
                  color: viewMode === 'list' ? 'white' : '#666',
                  '&:hover': {
                    bgcolor: viewMode === 'list' ? '#a0752a' : 'rgba(184, 134, 43, 0.1)'
                  }
                }}
              >
                <ViewList />
              </IconButton>
            </Box>
          </Box>
        </Paper>

        {/* Use KanjiCatalog component for the main content */}
        <KanjiCatalog
          kanji={filteredKanji}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          searchTerm={searchTerm}
          jlptFilter={jlptFilter}
          onToggleFavorite={toggleFavorite}
          viewMode={viewMode}
          onKanjiSelect={handleKanjiSelect}
          onPlayAudio={playAudio}
        />

        {/* Advanced Search FAB */}
        <Fab
          color="primary"
          onClick={() => setSearchDrawerOpen(true)}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            bgcolor: '#b8862b',
            '&:hover': {
              bgcolor: '#a0752a'
            }
          }}
        >
          <FilterList />
        </Fab>

        {/* Advanced Search Drawer */}
        <KanjiSearchDrawer
          open={searchDrawerOpen}
          onClose={() => setSearchDrawerOpen(false)}
          onSearch={handleAdvancedSearch}
          currentFilters={advancedFilters}
        />

        {/* Kanji Detail Modal */}
        <KanjiDetailModal
          open={detailModalOpen}
          onClose={() => setDetailModalOpen(false)}
          kanji={selectedKanji}
        />
      </Container>
    </Box>
  );
}
import { useState, useEffect } from 'react';
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
  Pagination
} from '@mui/material';
import { Search, ViewModule, ViewList } from '@mui/icons-material';
import { fetchKanji } from '../services/kanjiService';

// Import our existing components
import KanjiCatalog from '../features/kanji/KanjiCatalog';
import KanjiDetailDrawer from '../features/kanji/KanjiDetailDrawer';

export default function Kanji() {
  const [searchTerm, setSearchTerm] = useState('');
  const [jlptFilter, setJlptFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [kanjiList, setKanjiList] = useState([]);
  const [totalKanji, setTotalKanji] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('cards'); // 'cards' or 'list'
  const [selectedKanji, setSelectedKanji] = useState(null);
  const [detailDrawerOpen, setDetailDrawerOpen] = useState(false);
  
  const itemsPerPage = 20;

  const toggleFavorite = (kanjiId) => {
    setKanjiList(prev => prev.map(kanji => (
      kanji.id === kanjiId
        ? { ...kanji, isFavorite: !kanji.isFavorite }
        : kanji
    )));
  };

  const handleKanjiSelect = (kanji) => {
    setSelectedKanji(kanji);
    setDetailDrawerOpen(true);
  };

  const playAudio = (text) => {
    // Audio playback functionality would be implemented here
    console.log(`Playing audio for: ${text}`);
  };

  // Fetch kanji from API when filters change
  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchKanji({ 
      search: searchTerm, 
      jlpt: jlptFilter, 
      page: currentPage, 
      limit: itemsPerPage 
    })
      .then(data => {
        console.log('API Response:', data); // Debug log
        setKanjiList(data.items || []);
        setTotalKanji(data.total || 0);
        setTotalPages(data.pages || 1); // Use pages from API response
      })
      .catch(err => {
        console.error('Fetch error:', err); // Debug log
        setError('Failed to load kanji data');
      })
      .finally(() => setLoading(false));
  }, [searchTerm, jlptFilter, currentPage]);

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, jlptFilter]);

  return (
    <Box sx={{ bgcolor: '#fafafa', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4, maxWidth: 800, mx: 'auto' }}>
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 2, color: '#333' }}>
            Kanji Search
          </Typography>
          <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.6 }}>
            Search and explore Japanese kanji characters. Master the building blocks of written Japanese.
          </Typography>
        </Box>

        {/* Search Controls */}
        <Paper sx={{ p: 3, mb: 4, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', height: '100px' }}>
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 300px 100px',
            gap: 3,
            alignItems: 'center',
            height: '56px'
          }}>
            {/* Search Input */}
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
                  height: 56,
                  '&:hover fieldset': { borderColor: '#b8862b' },
                  '&.Mui-focused fieldset': { borderColor: '#b8862b' },
                },
              }}
            />

            {/* JLPT Filter */}
            <FormControl fullWidth>
              <InputLabel>JLPT Level</InputLabel>
              <Select
                value={jlptFilter}
                label="JLPT Level"
                onChange={(e) => setJlptFilter(e.target.value)}
                sx={{ height: 56, '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#b8862b' } }}
              >
                <MenuItem value="">All Levels</MenuItem>
                <MenuItem value="N5">N5 - Beginner</MenuItem>
                <MenuItem value="N4">N4 - Elementary</MenuItem>
                <MenuItem value="N3">N3 - Intermediate</MenuItem>
                <MenuItem value="N2">N2 - Upper Intermediate</MenuItem>
                <MenuItem value="N1">N1 - Advanced</MenuItem>
              </Select>
            </FormControl>

            {/* View Mode Toggle */}
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
              <IconButton
                onClick={() => setViewMode('cards')}
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: viewMode === 'cards' ? '#b8862b' : 'transparent',
                  color: viewMode === 'cards' ? 'white' : '#666',
                  '&:hover': { bgcolor: viewMode === 'cards' ? '#a0752a' : 'rgba(184, 134, 43, 0.1)' },
                }}
              >
                <ViewModule />
              </IconButton>
              <IconButton
                onClick={() => setViewMode('list')}
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: viewMode === 'list' ? '#b8862b' : 'transparent',
                  color: viewMode === 'list' ? 'white' : '#666',
                  '&:hover': { bgcolor: viewMode === 'list' ? '#a0752a' : 'rgba(184, 134, 43, 0.1)' },
                }}
              >
                <ViewList />
              </IconButton>
            </Box>
          </Box>
        </Paper>

        {/* Top Pagination Controls */}
        {totalPages > 1 && (
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
            color="primary"
            sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}
          />
        )}
        
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Typography sx={{ fontWeight: 500 }}>
            Showing {kanjiList.length} of {totalKanji} kanji
          </Typography>
        </Box>

        {/* Loading/Error State */}
        {loading && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography>Loading kanji data...</Typography>
          </Box>
        )}
        {error && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography color="error">{error}</Typography>
          </Box>
        )}
        
        {/* Main Content - Pass API pagination data directly */}
        {!loading && !error && (
          <KanjiCatalog
            kanji={kanjiList}
            totalKanji={totalKanji}
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            searchTerm={searchTerm}
            jlptFilter={jlptFilter}
            onToggleFavorite={toggleFavorite}
            viewMode={viewMode}
            onKanjiSelect={handleKanjiSelect}
            onPlayAudio={playAudio}
          />
        )}

        {/* Kanji Detail Drawer */}
        <KanjiDetailDrawer
          open={detailDrawerOpen}
          onClose={() => setDetailDrawerOpen(false)}
          kanji={selectedKanji}
          onToggleFavorite={toggleFavorite}
        />
      </Container>
    </Box>
  );
}
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
  Grid,
  Card,
  CardContent,
  IconButton,
  Chip,
  Pagination
} from '@mui/material';
import { Search, Star, StarBorder, VolumeUp } from '@mui/icons-material';
import { sampleKanji, jlptColors } from '../services/mockData';

export default function Kanji() {
  const [searchTerm, setSearchTerm] = useState('');
  const [jlptFilter, setJlptFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [kanjiList, setKanjiList] = useState(sampleKanji);
  const itemsPerPage = 20; // Show 20 kanji per page for better grid layout

  const toggleFavorite = (kanjiId) => {
    setKanjiList(prev => prev.map(kanji => 
      kanji.id === kanjiId 
        ? { ...kanji, isFavorite: !kanji.isFavorite }
        : kanji
    ));
  };

  // Filter kanji based on search and JLPT level
  const filteredKanji = useMemo(() => {
    return kanjiList.filter(kanji => {
      const matchesSearch = searchTerm === '' || 
        kanji.character.includes(searchTerm) ||
        kanji.meaning.toLowerCase().includes(searchTerm.toLowerCase()) ||
        kanji.readings.on.includes(searchTerm) ||
        kanji.readings.kun.includes(searchTerm);
      
      const matchesJLPT = jlptFilter === '' || kanji.jlptLevel === jlptFilter;
      
      return matchesSearch && matchesJLPT;
    });
  }, [searchTerm, jlptFilter, kanjiList]);

  // Reset to page 1 when search changes
  useMemo(() => {
    setCurrentPage(1);
  }, [searchTerm, jlptFilter]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredKanji.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentKanji = filteredKanji.slice(startIndex, startIndex + itemsPerPage);

  const getResultsText = () => {
    if (searchTerm || jlptFilter) {
      return `Found ${filteredKanji.length} kanji`;
    }
    return `Showing ${filteredKanji.length} kanji`;
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

        {/* Search Controls */}
        <Paper 
          sx={{ 
            p: 3,
            mb: 4, 
            borderRadius: 3,
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
          }}
        >
          <Grid container spacing={3} alignItems="center">
            {/* Search Input */}
            <Grid size={{ xs: 12, md: 8 }}>
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
                    '&:hover fieldset': {
                      borderColor: '#b8862b',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#b8862b',
                    },
                  },
                }}
              />
            </Grid>
            
            {/* JLPT Filter */}
            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth>
                <InputLabel>JLPT Level</InputLabel>
                <Select
                  value={jlptFilter}
                  label="JLPT Level"
                  onChange={(e) => setJlptFilter(e.target.value)}
                  sx={{
                    height: 56,
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
            </Grid>
          </Grid>
        </Paper>

        {/* Results Header */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 3 
        }}>
          <Typography variant="h6" sx={{ color: '#333', fontWeight: 600 }}>
            {getResultsText()}
          </Typography>
          
          {totalPages > 1 && (
            <Typography variant="body2" sx={{ color: '#666' }}>
              Page {currentPage} of {totalPages}
            </Typography>
          )}
        </Box>

        {/* Kanji Grid */}
        {currentKanji.length > 0 ? (
          <>
            <Grid container spacing={3}>
              {currentKanji.map((kanjiItem) => (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2.4 }} key={kanjiItem.id}>
                  <Card 
                    sx={{ 
                      height: 280, // Fixed height for all cards
                      cursor: 'pointer',
                      transition: 'all 0.2s ease-in-out',
                      display: 'flex',
                      flexDirection: 'column',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                      }
                    }}
                  >
                    <CardContent sx={{ 
                      p: 2.5, 
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}>
                      {/* Header Section */}
                      <Box>
                        <Box sx={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          alignItems: 'flex-start', 
                          mb: 2
                        }}>
                          <Typography
                            variant="h1"
                            sx={{
                              fontFamily: 'serif',
                              color: '#333',
                              fontWeight: 400,
                              lineHeight: 1,
                              fontSize: '3rem'
                            }}
                          >
                            {kanjiItem.character}
                          </Typography>
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(kanjiItem.id);
                              }}
                            >
                              {kanjiItem.isFavorite ? (
                                <Star sx={{ color: '#ff9800', fontSize: 20 }} />
                              ) : (
                                <StarBorder sx={{ color: '#ccc', fontSize: 20 }} />
                              )}
                            </IconButton>
                            <IconButton size="small">
                              <VolumeUp sx={{ color: '#666', fontSize: 20 }} />
                            </IconButton>
                          </Box>
                        </Box>

                        {/* Meaning */}
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            fontWeight: 600, 
                            mb: 2, 
                            color: '#b8862b',
                            fontSize: '1.1rem',
                            lineHeight: 1.3,
                            minHeight: 44, // Ensure consistent spacing
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}
                        >
                          {kanjiItem.meaning}
                        </Typography>

                        {/* Readings */}
                        <Box sx={{ mb: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                            <Typography variant="caption" sx={{ color: '#666', minWidth: 24, fontSize: '0.75rem', fontWeight: 600 }}>
                              On:
                            </Typography>
                            <Typography 
                              variant="caption" 
                              sx={{ 
                                fontWeight: 500, 
                                flex: 1, 
                                fontSize: '0.75rem',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                              }}
                            >
                              {kanjiItem.readings.on}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="caption" sx={{ color: '#666', minWidth: 24, fontSize: '0.75rem', fontWeight: 600 }}>
                              Kun:
                            </Typography>
                            <Typography 
                              variant="caption" 
                              sx={{ 
                                fontWeight: 500, 
                                flex: 1, 
                                fontSize: '0.75rem',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                              }}
                            >
                              {kanjiItem.readings.kun}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>

                      {/* Footer Section */}
                      <Box>
                        {/* Chips */}
                        <Box sx={{ display: 'flex', gap: 0.5, mb: 2, flexWrap: 'wrap' }}>
                          <Chip 
                            label={kanjiItem.jlptLevel} 
                            size="small" 
                            sx={{ 
                              bgcolor: jlptColors[kanjiItem.jlptLevel],
                              color: 'white',
                              fontSize: '0.65rem',
                              height: 20,
                              fontWeight: 600
                            }} 
                          />
                          <Chip 
                            label={`${kanjiItem.strokes}`} 
                            size="small" 
                            variant="outlined"
                            sx={{ 
                              fontSize: '0.65rem', 
                              height: 20,
                              borderColor: '#ccc'
                            }}
                          />
                          <Chip 
                            label={kanjiItem.frequency} 
                            size="small" 
                            color="success"
                            variant="outlined"
                            sx={{ 
                              fontSize: '0.65rem', 
                              height: 20
                            }}
                          />
                        </Box>

                        {/* Grade info */}
                        <Typography variant="caption" sx={{ color: '#999', fontSize: '0.7rem' }}>
                          {kanjiItem.grade} • {kanjiItem.strokes} strokes
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Pagination */}
            {totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                <Pagination 
                  count={totalPages}
                  page={currentPage}
                  onChange={(event, page) => setCurrentPage(page)}
                  color="primary"
                  size="large"
                  sx={{
                    '& .MuiPaginationItem-root': {
                      '&.Mui-selected': {
                        bgcolor: '#b8862b',
                        '&:hover': {
                          bgcolor: '#a0752a',
                        }
                      }
                    }
                  }}
                />
              </Box>
            )}
          </>
        ) : (
          /* No results */
          <Paper sx={{ 
            textAlign: 'center', 
            py: 8,
            borderRadius: 3,
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
          }}>
            <Typography variant="h6" sx={{ color: '#666', mb: 2 }}>
              No kanji found
            </Typography>
            <Typography variant="body2" sx={{ color: '#999' }}>
              Try adjusting your search terms or filters
            </Typography>
          </Paper>
        )}
      </Container>
    </Box>
  );
}
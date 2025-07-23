import { useState } from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Tabs,
  Tab,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  Button,
  Stack,
  Grid,
  Card,
  CardContent,
  LinearProgress,
} from '@mui/material';
import {
  Close,
  VolumeUp,
  Star,
  StarBorder,
  CheckCircle,
  PlayArrow,
  Edit,
  Quiz,
  OpenInNew
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const jlptColors = {
  N5: '#4caf50',
  N4: '#8bc34a',
  N3: '#ff9800',
  N2: '#ff5722',
  N1: '#f44336'
};

const gradeColors = {
  'Grade 1': '#4caf50',
  'Grade 2': '#66bb6a',
  'Grade 3': '#81c784',
  'Grade 4': '#a5d6a7',
  'Grade 5': '#c8e6c9',
  'Grade 6': '#e8f5e8',
  'Secondary': '#ff9800',
  'Jinmeiyō': '#9c27b0',
  'Hyōgai': '#607d8b'
};

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`kanji-tabpanel-${index}`}
      aria-labelledby={`kanji-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 2 }}>{children}</Box>}
    </div>
  );
}

export default function KanjiDetailDrawer({ 
  open, 
  onClose, 
  kanji, 
  onToggleFavorite,
  onMarkAsLearned,
  onPractice 
}) {
  const [selectedTab, setSelectedTab] = useState(0);
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const playAudio = (text, type = 'kanji') => {
    console.log(`Playing audio for ${type}: ${text}`);
  };

  const handleViewFullPage = () => {
    if (kanji) {
      navigate(`/kanji/${kanji.id}`);
      onClose();
    }
  };

  if (!kanji) return null;

  // Format meanings for display
  const meaningsText = Array.isArray(kanji.meanings) 
    ? kanji.meanings.join(', ') 
    : kanji.meanings || 'No meaning available';

  // Get readings arrays
  const onReadings = kanji.readings?.on || [];
  const kunReadings = kanji.readings?.kun || [];

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: { xs: '100%', sm: '100%', md: '600px', lg: '700px' },
          maxWidth: '100vw'
        }
      }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ 
          p: 3, 
          borderBottom: '1px solid #eee',
          bgcolor: '#fafafa',
          position: 'sticky',
          top: 0,
          zIndex: 1
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, color: '#333' }}>
              Kanji Details
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton onClick={handleViewFullPage} size="small">
                <OpenInNew />
              </IconButton>
              <IconButton onClick={onClose} size="small">
                <Close />
              </IconButton>
            </Box>
          </Box>

          {/* Kanji Character and Basic Info */}
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Typography 
              variant="h1" 
              sx={{ 
                fontFamily: 'serif',
                color: '#333',
                fontWeight: 400,
                mb: 2,
                fontSize: { xs: '3rem', md: '4rem' }
              }}
            >
              {kanji.character}
            </Typography>
            
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#b8862b' }}>
              {meaningsText}
            </Typography>
            
            <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap" useFlexGap sx={{ mb: 2 }}>
              {kanji.jlpt_level && (
                <Chip 
                  label={kanji.jlpt_level} 
                  size="small"
                  sx={{ 
                    bgcolor: jlptColors[kanji.jlpt_level],
                    color: 'white',
                    fontWeight: 600
                  }} 
                />
              )}
              {kanji.grade_level && (
                <Chip 
                  label={kanji.grade_level} 
                  size="small"
                  sx={{ 
                    bgcolor: gradeColors[kanji.grade_level] || '#999',
                    color: kanji.grade_level?.includes('Grade') ? 'white' : 'black',
                    fontWeight: 600
                  }} 
                />
              )}
              <Chip 
                label={`${kanji.stroke_count} strokes`} 
                size="small"
                variant="outlined"
                sx={{ fontWeight: 600 }}
              />
              {kanji.frequency && (
                <Chip 
                  label={kanji.frequency} 
                  size="small"
                  color="success"
                  variant="outlined"
                />
              )}
            </Stack>

            {/* Action Buttons */}
            <Stack direction="row" spacing={1} justifyContent="center">
              <IconButton 
                onClick={() => onToggleFavorite && onToggleFavorite(kanji.id)}
                sx={{ 
                  bgcolor: kanji.is_favorite ? 'rgba(255, 152, 0, 0.1)' : 'transparent',
                  '&:hover': { bgcolor: 'rgba(255, 152, 0, 0.2)' }
                }}
              >
                {kanji.is_favorite ? 
                  <Star sx={{ color: '#ff9800' }} /> : 
                  <StarBorder sx={{ color: '#ccc' }} />
                }
              </IconButton>
              
              <IconButton 
                onClick={() => playAudio(kanji.character, 'kanji')}
                sx={{ '&:hover': { bgcolor: 'rgba(33, 150, 243, 0.1)' } }}
              >
                <VolumeUp sx={{ color: '#2196f3' }} />
              </IconButton>
              
              {kanji.is_learned && (
                <IconButton disabled>
                  <CheckCircle sx={{ color: '#4caf50' }} />
                </IconButton>
              )}
            </Stack>
          </Box>
        </Box>

        {/* Tabs */}
        <Box sx={{ borderBottom: '1px solid #eee', bgcolor: 'white' }}>
          <Tabs 
            value={selectedTab} 
            onChange={handleTabChange} 
            variant="scrollable"
            scrollButtons="auto"
            sx={{ px: 2 }}
          >
            <Tab label="Readings" />
            <Tab label="Examples" />
            <Tab label="Details" />
          </Tabs>
        </Box>

        {/* Scrollable Content */}
        <Box sx={{ flex: 1, overflow: 'auto', px: 3 }}>
          <TabPanel value={selectedTab} index={0}>
            {/* Readings Tab */}
            <Stack spacing={3}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#333' }}>
                  Readings
                </Typography>
                
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Card sx={{ p: 2, bgcolor: '#f8f9fa' }}>
                      <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
                        On-yomi (音読み)
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {onReadings.length > 0 ? (
                          onReadings.map((reading, index) => (
                            <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <Chip 
                                label={reading}
                                size="small"
                                sx={{ bgcolor: '#b8862b', color: 'white' }}
                              />
                              <IconButton size="small" onClick={() => playAudio(reading, 'on-yomi')}>
                                <VolumeUp fontSize="small" />
                              </IconButton>
                            </Box>
                          ))
                        ) : (
                          <Typography variant="body2" sx={{ color: '#999' }}>No on-yomi readings</Typography>
                        )}
                      </Box>
                    </Card>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Card sx={{ p: 2, bgcolor: '#f8f9fa' }}>
                      <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
                        Kun-yomi (訓読み)
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {kunReadings.length > 0 ? (
                          kunReadings.map((reading, index) => (
                            <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <Chip 
                                label={reading}
                                size="small"
                                sx={{ bgcolor: '#4caf50', color: 'white' }}
                              />
                              <IconButton size="small" onClick={() => playAudio(reading, 'kun-yomi')}>
                                <VolumeUp fontSize="small" />
                              </IconButton>
                            </Box>
                          ))
                        ) : (
                          <Typography variant="body2" sx={{ color: '#999' }}>No kun-yomi readings</Typography>
                        )}
                      </Box>
                    </Card>
                  </Grid>
                </Grid>
              </Box>

              {/* Nanori readings if available */}
              {kanji.nanori && kanji.nanori.length > 0 && (
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#333' }}>
                    Nanori (Name readings)
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {kanji.nanori.map((reading, index) => (
                      <Chip 
                        key={index}
                        label={reading} 
                        variant="outlined" 
                        size="small"
                        sx={{ color: '#666' }}
                      />
                    ))}
                  </Box>
                </Box>
              )}
            </Stack>
          </TabPanel>

          <TabPanel value={selectedTab} index={1}>
            {/* Examples Tab */}
            <Stack spacing={3}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>
                Example Words
              </Typography>
              
              {kanji.examples && kanji.examples.length > 0 ? (
                <List sx={{ p: 0 }}>
                  {kanji.examples.map((example, index) => (
                    <ListItem key={index} sx={{ px: 0, py: 2, borderBottom: '1px solid #f0f0f0' }}>
                      <ListItemText 
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Typography variant="h6" sx={{ fontFamily: 'serif', color: '#333' }}>
                              {example}
                            </Typography>
                          </Box>
                        }
                        secondary="Example compound word"
                      />
                      <IconButton size="small" onClick={() => playAudio(example, 'compound')}>
                        <VolumeUp fontSize="small" />
                      </IconButton>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Card sx={{ p: 3, textAlign: 'center', bgcolor: '#f8f9fa' }}>
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    No example words available for this kanji.
                  </Typography>
                </Card>
              )}
            </Stack>
          </TabPanel>

          <TabPanel value={selectedTab} index={2}>
            {/* Details Tab */}
            <Stack spacing={3}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>
                Kanji Information
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Card sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ color: '#b8862b', fontWeight: 700 }}>
                      {kanji.stroke_count}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#666' }}>
                      Total Strokes
                    </Typography>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Card sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ color: '#4caf50', fontWeight: 700 }}>
                      {kanji.radical || '—'}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#666' }}>
                      Radical
                    </Typography>
                  </Card>
                </Grid>
              </Grid>

              <Card sx={{ p: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                  Details
                </Typography>
                <Stack spacing={1}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2">JLPT Level</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {kanji.jlpt_level || 'N/A'}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2">Grade Level</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {kanji.grade_level || 'N/A'}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2">Frequency</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {kanji.frequency || 'Unknown'}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2">Unicode</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {kanji.unicode || 'N/A'}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2">Examples</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {kanji.examples?.length || 0}
                    </Typography>
                  </Box>
                </Stack>
              </Card>

              <Card sx={{ p: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                  Your Progress
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Mastery Level</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {kanji.is_learned ? '100%' : '0%'}
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={kanji.is_learned ? 100 : 0}
                    sx={{ 
                      height: 8, 
                      borderRadius: 4,
                      '& .MuiLinearProgress-bar': { 
                        bgcolor: kanji.is_learned ? '#4caf50' : '#ff9800' 
                      }
                    }} 
                  />
                </Box>
                <Typography variant="caption" sx={{ color: '#666' }}>
                  Status: {kanji.is_learned ? 'Learned' : 'Learning'}
                </Typography>
              </Card>
            </Stack>
          </TabPanel>
        </Box>

        {/* Action Buttons - Fixed at bottom */}
        <Box sx={{ 
          p: 3, 
          borderTop: '1px solid #eee',
          bgcolor: 'white',
          position: 'sticky',
          bottom: 0
        }}>
          <Stack spacing={2}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<PlayArrow />}
              onClick={() => onPractice && onPractice(kanji)}
              sx={{ 
                bgcolor: '#b8862b',
                '&:hover': { bgcolor: '#a0752a' }
              }}
            >
              Practice This Kanji
            </Button>
            
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Quiz />}
                  sx={{ 
                    borderColor: '#4caf50',
                    color: '#4caf50',
                    '&:hover': { borderColor: '#45a049', bgcolor: 'rgba(76, 175, 80, 0.04)' }
                  }}
                >
                  Quiz
                </Button>
              </Grid>
              
              <Grid item xs={6}>
                {!kanji.is_learned ? (
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<CheckCircle />}
                    onClick={() => onMarkAsLearned && onMarkAsLearned(kanji.id)}
                    sx={{ 
                      borderColor: '#4caf50',
                      color: '#4caf50',
                      '&:hover': { borderColor: '#45a049', bgcolor: 'rgba(76, 175, 80, 0.04)' }
                    }}
                  >
                    Mark Learned
                  </Button>
                ) : (
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<CheckCircle />}
                    disabled
                    sx={{ 
                      borderColor: '#4caf50',
                      color: '#4caf50'
                    }}
                  >
                    Learned ✓
                  </Button>
                )}
              </Grid>
            </Grid>
          </Stack>
        </Box>
      </Box>
    </Drawer>
  );
}
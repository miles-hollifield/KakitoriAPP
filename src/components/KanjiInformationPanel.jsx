import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
  Stack,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  VolumeUp,
  Star,
  StarBorder,
  CheckCircle,
  Bookmark,
  BookmarkBorder,
  PlayArrow,
  Edit,
  ExpandMore,
  School,
  Quiz,
  Visibility,
  Timeline
} from '@mui/icons-material';

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
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function KanjiInformationPanel({ 
  kanji, 
  onToggleFavorite, 
  onMarkAsLearned, 
  onPractice 
}) {
  const [selectedTab, setSelectedTab] = useState(0);

  if (!kanji) {
    return (
      <Paper sx={{ p: 4, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', position: 'sticky', top: 20 }}>
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" sx={{ color: '#666', mb: 2 }}>
            Select a kanji to view details
          </Typography>
          <Typography variant="body2" sx={{ color: '#999' }}>
            Click on any kanji card to see comprehensive information including readings, meanings, stroke order, and example compounds
          </Typography>
        </Box>
      </Paper>
    );
  }

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const playAudio = (text, type = 'kanji') => {
    // Audio playback functionality would be implemented here
    console.log(`Playing audio for ${type}: ${text}`);
  };

  return (
    <Paper sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', position: 'sticky', top: 20 }}>
      {/* Header Section */}
      <Box sx={{ p: 3, textAlign: 'center', borderBottom: '1px solid #eee' }}>
        <Typography 
          variant="h1" 
          sx={{ 
            fontFamily: 'serif',
            color: '#333',
            fontWeight: 400,
            mb: 2,
            fontSize: { xs: '4rem', md: '6rem' }
          }}
        >
          {kanji.character}
        </Typography>
        
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: '#b8862b' }}>
          {kanji.meaning}
        </Typography>
        
        <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap" useFlexGap sx={{ mb: 2 }}>
          <Chip 
            label={kanji.jlptLevel} 
            sx={{ 
              bgcolor: jlptColors[kanji.jlptLevel],
              color: 'white',
              fontWeight: 600
            }} 
          />
          <Chip 
            label={kanji.gradeLevel || 'Secondary'} 
            sx={{ 
              bgcolor: gradeColors[kanji.gradeLevel || 'Secondary'],
              color: 'white',
              fontWeight: 600
            }} 
          />
          <Chip 
            label={`${kanji.strokes} strokes`} 
            variant="outlined"
            sx={{ fontWeight: 600 }}
          />
          <Chip 
            label={kanji.frequency || 'High'} 
            color="success"
            variant="outlined"
          />
        </Stack>

        {/* Action Buttons */}
        <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 2 }}>
          <IconButton 
            onClick={() => onToggleFavorite(kanji.id)}
            sx={{ 
              bgcolor: kanji.isFavorite ? 'rgba(255, 152, 0, 0.1)' : 'transparent',
              '&:hover': { bgcolor: 'rgba(255, 152, 0, 0.2)' }
            }}
          >
            {kanji.isFavorite ? 
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
          
          {kanji.isLearned && (
            <IconButton disabled>
              <CheckCircle sx={{ color: '#4caf50' }} />
            </IconButton>
          )}
        </Stack>
      </Box>

      {/* Tabs Navigation */}
      <Tabs 
        value={selectedTab} 
        onChange={handleTabChange} 
        variant="scrollable"
        scrollButtons="auto"
        sx={{ borderBottom: '1px solid #eee' }}
      >
        <Tab label="Readings" />
        <Tab label="Compounds" />
        <Tab label="Stroke Order" />
        <Tab label="Statistics" />
      </Tabs>

      {/* Tab Content */}
      <TabPanel value={selectedTab} index={0}>
        {/* Readings Tab */}
        <Stack spacing={3} sx={{ px: 3 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#333' }}>
              Readings
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card sx={{ p: 2, bgcolor: '#f8f9fa' }}>
                  <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
                    On-yomi (音読み)
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="h5" sx={{ color: '#b8862b', fontWeight: 600 }}>
                      {kanji.readings.on}
                    </Typography>
                    <IconButton size="small" onClick={() => playAudio(kanji.readings.on, 'on-yomi')}>
                      <VolumeUp fontSize="small" />
                    </IconButton>
                  </Box>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Card sx={{ p: 2, bgcolor: '#f8f9fa' }}>
                  <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
                    Kun-yomi (訓読み)
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="h5" sx={{ color: '#b8862b', fontWeight: 600 }}>
                      {kanji.readings.kun}
                    </Typography>
                    <IconButton size="small" onClick={() => playAudio(kanji.readings.kun, 'kun-yomi')}>
                      <VolumeUp fontSize="small" />
                    </IconButton>
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </Box>

          <Divider />

          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#333' }}>
              Example Words
            </Typography>
            <List sx={{ p: 0 }}>
              {kanji.examples?.map((example, index) => {
                const [word, reading] = example.split(' (');
                const cleanReading = reading?.replace(')', '');
                return (
                  <ListItem key={index} sx={{ px: 0, py: 1, borderBottom: '1px solid #f0f0f0' }}>
                    <ListItemText 
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Typography variant="h6" sx={{ fontFamily: 'serif', color: '#333' }}>
                            {word}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#666' }}>
                            ({cleanReading})
                          </Typography>
                        </Box>
                      }
                      secondary={kanji.exampleMeanings?.[index] || 'Example meaning'}
                    />
                    <IconButton size="small" onClick={() => playAudio(word, 'compound')}>
                      <VolumeUp fontSize="small" />
                    </IconButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Stack>
      </TabPanel>

      <TabPanel value={selectedTab} index={1}>
        {/* Compounds Tab */}
        <Stack spacing={3} sx={{ px: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>
            Compound Words
          </Typography>
          
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Kun'yomi Compounds
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                {kanji.kunCompounds?.map((compound, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Card sx={{ p: 2, '&:hover': { bgcolor: '#f8f9fa' } }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                          <Typography variant="h6" sx={{ fontFamily: 'serif' }}>
                            {compound.word}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#666' }}>
                            {compound.reading}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#999' }}>
                            {compound.meaning}
                          </Typography>
                        </Box>
                        <IconButton size="small">
                          <VolumeUp fontSize="small" />
                        </IconButton>
                      </Box>
                    </Card>
                  </Grid>
                )) || (
                  <Typography variant="body2" sx={{ color: '#666', p: 2 }}>
                    No kun'yomi compounds available
                  </Typography>
                )}
              </Grid>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                On'yomi Compounds
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                {kanji.onCompounds?.map((compound, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Card sx={{ p: 2, '&:hover': { bgcolor: '#f8f9fa' } }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                          <Typography variant="h6" sx={{ fontFamily: 'serif' }}>
                            {compound.word}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#666' }}>
                            {compound.reading}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#999' }}>
                            {compound.meaning}
                          </Typography>
                        </Box>
                        <IconButton size="small">
                          <VolumeUp fontSize="small" />
                        </IconButton>
                      </Box>
                    </Card>
                  </Grid>
                )) || (
                  <Typography variant="body2" sx={{ color: '#666', p: 2 }}>
                    No on'yomi compounds available
                  </Typography>
                )}
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Stack>
      </TabPanel>

      <TabPanel value={selectedTab} index={2}>
        {/* Stroke Order Tab */}
        <Stack spacing={3} sx={{ px: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>
            Stroke Order Diagram
          </Typography>
          
          <Card sx={{ p: 4, textAlign: 'center', bgcolor: '#f8f9fa' }}>
            <Typography variant="h1" sx={{ 
              fontFamily: 'serif',
              color: '#b8862b',
              mb: 2,
              fontSize: '8rem'
            }}>
              {kanji.character}
            </Typography>
            <Typography variant="body2" sx={{ color: '#666', mb: 3 }}>
              Interactive stroke order diagram will be displayed here
            </Typography>
            <Button 
              variant="contained" 
              startIcon={<Edit />}
              sx={{ bgcolor: '#2196f3', '&:hover': { bgcolor: '#1976d2' } }}
            >
              Practice Writing
            </Button>
          </Card>
          
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Stroke Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Card sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ color: '#b8862b', fontWeight: 700 }}>
                    {kanji.strokes}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#666' }}>
                    Total Strokes
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ color: '#4caf50', fontWeight: 700 }}>
                    {kanji.radical || '水'}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#666' }}>
                    Radical
                  </Typography>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </TabPanel>

      <TabPanel value={selectedTab} index={3}>
        {/* Statistics Tab */}
        <Stack spacing={3} sx={{ px: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>
            Learning Statistics
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card sx={{ p: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                  Your Progress
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Mastery Level</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {kanji.isLearned ? '100%' : '0%'}
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={kanji.isLearned ? 100 : 0}
                    sx={{ 
                      height: 8, 
                      borderRadius: 4,
                      '& .MuiLinearProgress-bar': { 
                        bgcolor: kanji.isLearned ? '#4caf50' : '#ff9800' 
                      }
                    }} 
                  />
                </Box>
                <Typography variant="caption" sx={{ color: '#666' }}>
                  Times practiced: {kanji.practiceCount || 0}
                </Typography>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Card sx={{ p: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                  Usage Stats
                </Typography>
                <Stack spacing={1}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2">Frequency Rank</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      #{kanji.frequencyRank || 'N/A'}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2">Common Words</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {kanji.examples?.length || 0}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2">Difficulty</Typography>
                    <Chip 
                      label={kanji.difficultyLevel || 'Medium'} 
                      size="small"
                      color={
                        kanji.difficultyLevel === 'beginner' ? 'success' :
                        kanji.difficultyLevel === 'intermediate' ? 'warning' : 'error'
                      }
                    />
                  </Box>
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </Stack>
      </TabPanel>

      {/* Action Buttons */}
      <Box sx={{ p: 3, borderTop: '1px solid #eee' }}>
        <Stack spacing={2}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<PlayArrow />}
            onClick={() => onPractice(kanji)}
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
                Quiz Mode
              </Button>
            </Grid>
            
            <Grid item xs={6}>
              {!kanji.isLearned ? (
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<CheckCircle />}
                  onClick={() => onMarkAsLearned(kanji.id)}
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
    </Paper>
  );
}
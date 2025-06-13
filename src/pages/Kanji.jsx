import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Button,
  Chip,
  LinearProgress,
  Paper,
  IconButton,
  TextField,
  InputAdornment,
  Tab,
  Tabs,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Stack,
  Badge
} from '@mui/material';
import { 
  Search,
  Star,
  StarBorder,
  VolumeUp,
  School,
  Quiz,
  TrendingUp,
  FilterList,
  Bookmark,
  BookmarkBorder,
  PlayArrow,
  EmojiEvents,
  Timeline,
  Visibility,
  Edit,
  CheckCircle
} from '@mui/icons-material';

// Sample kanji data - in a real app, this would come from an API
const sampleKanji = [
  {
    id: 1,
    character: '水',
    readings: { on: 'スイ', kun: 'みず' },
    meaning: 'water',
    strokes: 4,
    jlptLevel: 'N5',
    frequency: 'high',
    examples: ['水道 (すいどう)', '水曜日 (すいようび)', '水着 (みずぎ)'],
    isLearned: true,
    isFavorite: false,
    difficultyLevel: 'beginner'
  },
  {
    id: 2,
    character: '火',
    readings: { on: 'カ', kun: 'ひ' },
    meaning: 'fire',
    strokes: 4,
    jlptLevel: 'N5',
    frequency: 'high',
    examples: ['火曜日 (かようび)', '火事 (かじ)', '花火 (はなび)'],
    isLearned: true,
    isFavorite: true,
    difficultyLevel: 'beginner'
  },
  {
    id: 3,
    character: '木',
    readings: { on: 'モク・ボク', kun: 'き' },
    meaning: 'tree, wood',
    strokes: 4,
    jlptLevel: 'N5',
    frequency: 'high',
    examples: ['木曜日 (もくようび)', '木材 (もくざい)', '大木 (たいぼく)'],
    isLearned: false,
    isFavorite: false,
    difficultyLevel: 'beginner'
  },
  {
    id: 4,
    character: '金',
    readings: { on: 'キン・コン', kun: 'かね' },
    meaning: 'gold, money',
    strokes: 8,
    jlptLevel: 'N5',
    frequency: 'high',
    examples: ['金曜日 (きんようび)', '金額 (きんがく)', '現金 (げんきん)'],
    isLearned: false,
    isFavorite: true,
    difficultyLevel: 'beginner'
  },
  {
    id: 5,
    character: '学',
    readings: { on: 'ガク', kun: 'まな(ぶ)' },
    meaning: 'study, learn',
    strokes: 8,
    jlptLevel: 'N5',
    frequency: 'high',
    examples: ['学校 (がっこう)', '学生 (がくせい)', '数学 (すうがく)'],
    isLearned: false,
    isFavorite: false,
    difficultyLevel: 'beginner'
  },
  {
    id: 6,
    character: '家',
    readings: { on: 'カ・ケ', kun: 'いえ・うち' },
    meaning: 'house, home',
    strokes: 10,
    jlptLevel: 'N5',
    frequency: 'high',
    examples: ['家族 (かぞく)', '家庭 (かてい)', '実家 (じっか)'],
    isLearned: false,
    isFavorite: false,
    difficultyLevel: 'intermediate'
  }
];

const difficultyColors = {
  beginner: '#4caf50',
  intermediate: '#ff9800',
  advanced: '#f44336'
};

const jlptColors = {
  N5: '#4caf50',
  N4: '#8bc34a',
  N3: '#ff9800',
  N2: '#ff5722',
  N1: '#f44336'
};

// Kanji page for Kakitori
export default function Kanji() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedKanji, setSelectedKanji] = useState(null);
  const [kanjiList, setKanjiList] = useState(sampleKanji);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const toggleFavorite = (kanjiId) => {
    setKanjiList(prev => prev.map(kanji => 
      kanji.id === kanjiId 
        ? { ...kanji, isFavorite: !kanji.isFavorite }
        : kanji
    ));
  };

  const markAsLearned = (kanjiId) => {
    setKanjiList(prev => prev.map(kanji => 
      kanji.id === kanjiId 
        ? { ...kanji, isLearned: true }
        : kanji
    ));
  };

  const filteredKanji = kanjiList.filter(kanji => {
    const matchesSearch = kanji.character.includes(searchTerm) || 
                         kanji.meaning.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         kanji.readings.on.includes(searchTerm) ||
                         kanji.readings.kun.includes(searchTerm);
    
    switch (selectedTab) {
      case 0: return matchesSearch; // All
      case 1: return matchesSearch && !kanji.isLearned; // To Learn
      case 2: return matchesSearch && kanji.isLearned; // Learned
      case 3: return matchesSearch && kanji.isFavorite; // Favorites
      default: return matchesSearch;
    }
  });

  const learnedCount = kanjiList.filter(k => k.isLearned).length;
  const totalCount = kanjiList.length;
  const progressPercentage = (learnedCount / totalCount) * 100;

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 1, color: '#333' }}>
          Kanji Learning Hub
        </Typography>
        <Typography variant="body1" sx={{ color: '#666', mb: 3 }}>
          Master Japanese kanji with interactive lessons and practice
        </Typography>

        {/* Progress Overview */}
        <Paper sx={{ p: 3, mb: 3, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Overall Progress
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <LinearProgress 
                  variant="determinate" 
                  value={progressPercentage} 
                  sx={{ 
                    flexGrow: 1,
                    height: 12, 
                    borderRadius: 6,
                    bgcolor: '#f0f0f0',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: '#b8862b',
                      borderRadius: 6
                    }
                  }} 
                />
                <Typography variant="h6" sx={{ color: '#b8862b', fontWeight: 700, minWidth: 60 }}>
                  {Math.round(progressPercentage)}%
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: '#666' }}>
                {learnedCount} of {totalCount} kanji learned
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack direction="row" spacing={2} justifyContent="center">
                <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#f8f9fa', minWidth: 80 }}>
                  <Typography variant="h4" sx={{ color: '#4caf50', fontWeight: 700 }}>
                    {learnedCount}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#666' }}>
                    Learned
                  </Typography>
                </Paper>
                <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#f8f9fa', minWidth: 80 }}>
                  <Typography variant="h4" sx={{ color: '#ff9800', fontWeight: 700 }}>
                    {totalCount - learnedCount}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#666' }}>
                    To Learn
                  </Typography>
                </Paper>
              </Stack>
            </Grid>
          </Grid>
        </Paper>

        {/* Quick Actions */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={6} sm={3}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<School />}
              sx={{ 
                py: 2, 
                bgcolor: '#b8862b',
                '&:hover': { bgcolor: '#a0752a' }
              }}
            >
              Start Lesson
            </Button>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Quiz />}
              sx={{ 
                py: 2,
                borderColor: '#4caf50',
                color: '#4caf50',
                '&:hover': { borderColor: '#45a049', bgcolor: 'rgba(76, 175, 80, 0.04)' }
              }}
            >
              Practice Quiz
            </Button>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Edit />}
              sx={{ 
                py: 2,
                borderColor: '#2196f3',
                color: '#2196f3',
                '&:hover': { borderColor: '#1976d2', bgcolor: 'rgba(33, 150, 243, 0.04)' }
              }}
            >
              Stroke Order
            </Button>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<TrendingUp />}
              sx={{ 
                py: 2,
                borderColor: '#9c27b0',
                color: '#9c27b0',
                '&:hover': { borderColor: '#7b1fa2', bgcolor: 'rgba(156, 39, 176, 0.04)' }
              }}
            >
              Study Stats
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={3}>
        {/* Left Panel - Kanji List */}
        <Grid item xs={12} lg={8}>
          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            {/* Search and Filter */}
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                placeholder="Search kanji by character, meaning, or reading..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: '#666' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />
              
              <Tabs value={selectedTab} onChange={handleTabChange} sx={{ mb: 2 }}>
                <Tab label={`All (${kanjiList.length})`} />
                <Tab 
                  label={
                    <Badge badgeContent={kanjiList.filter(k => !k.isLearned).length} color="warning">
                      To Learn
                    </Badge>
                  } 
                />
                <Tab 
                  label={
                    <Badge badgeContent={learnedCount} color="success">
                      Learned
                    </Badge>
                  } 
                />
                <Tab 
                  label={
                    <Badge badgeContent={kanjiList.filter(k => k.isFavorite).length} color="error">
                      Favorites
                    </Badge>
                  } 
                />
              </Tabs>
            </Box>

            {/* Kanji Grid */}
            <Grid container spacing={2}>
              {filteredKanji.map((kanji) => (
                <Grid item xs={12} sm={6} md={4} key={kanji.id}>
                  <Card 
                    sx={{ 
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      border: selectedKanji?.id === kanji.id ? '2px solid #b8862b' : '1px solid #e0e0e0',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 25px rgba(0,0,0,0.12)'
                      }
                    }}
                    onClick={() => setSelectedKanji(kanji)}
                  >
                    <CardContent sx={{ p: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Typography 
                          variant="h2" 
                          sx={{ 
                            fontFamily: 'serif',
                            color: '#333',
                            fontWeight: 400,
                            lineHeight: 1
                          }}
                        >
                          {kanji.character}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                          <IconButton 
                            size="small" 
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(kanji.id);
                            }}
                          >
                            {kanji.isFavorite ? 
                              <Star sx={{ color: '#ff9800', fontSize: 18 }} /> : 
                              <StarBorder sx={{ color: '#ccc', fontSize: 18 }} />
                            }
                          </IconButton>
                          {kanji.isLearned && (
                            <CheckCircle sx={{ color: '#4caf50', fontSize: 18 }} />
                          )}
                        </Box>
                      </Box>
                      
                      <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                        {kanji.meaning}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                        <Chip 
                          label={kanji.jlptLevel} 
                          size="small" 
                          sx={{ 
                            bgcolor: jlptColors[kanji.jlptLevel],
                            color: 'white',
                            fontSize: '0.7rem'
                          }} 
                        />
                        <Chip 
                          label={`${kanji.strokes} strokes`} 
                          size="small" 
                          variant="outlined"
                          sx={{ fontSize: '0.7rem' }}
                        />
                      </Box>
                      
                      <Typography variant="caption" sx={{ color: '#666', display: 'block', mb: 0.5 }}>
                        On: {kanji.readings.on}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#666', display: 'block' }}>
                        Kun: {kanji.readings.kun}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Right Panel - Kanji Details */}
        <Grid item xs={12} lg={4}>
          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', position: 'sticky', top: 20 }}>
            {selectedKanji ? (
              <>
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                  <Typography 
                    variant="h1" 
                    sx={{ 
                      fontFamily: 'serif',
                      color: '#333',
                      fontWeight: 400,
                      mb: 2
                    }}
                  >
                    {selectedKanji.character}
                  </Typography>
                  
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 1, color: '#b8862b' }}>
                    {selectedKanji.meaning}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', mb: 2 }}>
                    <Chip 
                      label={selectedKanji.jlptLevel} 
                      sx={{ 
                        bgcolor: jlptColors[selectedKanji.jlptLevel],
                        color: 'white'
                      }} 
                    />
                    <Chip 
                      label={`${selectedKanji.strokes} strokes`} 
                      variant="outlined"
                    />
                    <Chip 
                      label={selectedKanji.difficultyLevel} 
                      sx={{ 
                        bgcolor: difficultyColors[selectedKanji.difficultyLevel],
                        color: 'white'
                      }} 
                    />
                  </Box>
                </Box>

                <Divider sx={{ mb: 3 }} />

                {/* Readings */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    Readings
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
                      On-yomi (音読み)
                    </Typography>
                    <Typography variant="h6" sx={{ color: '#b8862b' }}>
                      {selectedKanji.readings.on}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
                      Kun-yomi (訓読み)
                    </Typography>
                    <Typography variant="h6" sx={{ color: '#b8862b' }}>
                      {selectedKanji.readings.kun}
                    </Typography>
                  </Box>
                </Box>

                <Divider sx={{ mb: 3 }} />

                {/* Examples */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    Common Words
                  </Typography>
                  <List sx={{ p: 0 }}>
                    {selectedKanji.examples.map((example, index) => (
                      <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                        <ListItemText 
                          primary={example}
                          primaryTypographyProps={{
                            fontFamily: 'serif',
                            fontSize: '1rem'
                          }}
                        />
                        <IconButton size="small">
                          <VolumeUp fontSize="small" />
                        </IconButton>
                      </ListItem>
                    ))}
                  </List>
                </Box>

                <Divider sx={{ mb: 3 }} />

                {/* Action Buttons */}
                <Stack spacing={2}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<PlayArrow />}
                    sx={{ 
                      bgcolor: '#b8862b',
                      '&:hover': { bgcolor: '#a0752a' }
                    }}
                  >
                    Practice This Kanji
                  </Button>
                  
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Edit />}
                    sx={{ 
                      borderColor: '#2196f3',
                      color: '#2196f3',
                      '&:hover': { borderColor: '#1976d2', bgcolor: 'rgba(33, 150, 243, 0.04)' }
                    }}
                  >
                    Stroke Order
                  </Button>
                  
                  {!selectedKanji.isLearned && (
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<CheckCircle />}
                      onClick={() => markAsLearned(selectedKanji.id)}
                      sx={{ 
                        borderColor: '#4caf50',
                        color: '#4caf50',
                        '&:hover': { borderColor: '#45a049', bgcolor: 'rgba(76, 175, 80, 0.04)' }
                      }}
                    >
                      Mark as Learned
                    </Button>
                  )}
                  
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={selectedKanji.isFavorite ? <Bookmark /> : <BookmarkBorder />}
                    onClick={() => toggleFavorite(selectedKanji.id)}
                    sx={{ 
                      borderColor: '#ff9800',
                      color: '#ff9800',
                      '&:hover': { borderColor: '#f57c00', bgcolor: 'rgba(255, 152, 0, 0.04)' }
                    }}
                  >
                    {selectedKanji.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                  </Button>
                </Stack>
              </>
            ) : (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="h6" sx={{ color: '#666', mb: 2 }}>
                  Select a kanji to view details
                </Typography>
                <Typography variant="body2" sx={{ color: '#999' }}>
                  Click on any kanji card to see readings, meanings, and example words
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
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
  Badge,
  ToggleButton,
  ToggleButtonGroup,
  Fab
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
  CheckCircle,
  ViewList,
  ViewComfy,
  GridView,
  Sort,
  Tune
} from '@mui/icons-material';

// Import our new components
import KanjiSearchDrawer from '../features/kanji/KanjiSearchDrawer';
import KanjiInformationPanel from '../features/kanji/KanjiInformationPanel';
import JLPTGroupingView from '../features/kanji/JLPTGroupingView';
import KanjiDetailModal from '../features/kanji/KanjiDetailModal';
import KanjiCard from '../features/kanji/KanjiCard';

// Enhanced sample kanji data
const sampleKanji = [
  {
    id: 1,
    character: '水',
    readings: { on: 'スイ', kun: 'みず' },
    meaning: 'water',
    strokes: 4,
    jlptLevel: 'N5',
    gradeLevel: 'Grade 1',
    frequency: 'Very High',
    frequencyRank: 365,
    examples: ['水道 (すいどう)', '水曜日 (すいようび)', '水着 (みずぎ)'],
    exampleMeanings: ['water supply', 'Wednesday', 'swimsuit'],
    isLearned: true,
    isFavorite: false,
    difficultyLevel: 'beginner',
    practiceCount: 15,
    radical: '水',
    kunCompounds: [
      { word: '水', reading: 'みず', meaning: 'water' },
      { word: '水着', reading: 'みずぎ', meaning: 'swimsuit' }
    ],
    onCompounds: [
      { word: '水道', reading: 'すいどう', meaning: 'water supply' },
      { word: '水曜日', reading: 'すいようび', meaning: 'Wednesday' }
    ]
  },
  {
    id: 2,
    character: '火',
    readings: { on: 'カ', kun: 'ひ' },
    meaning: 'fire',
    strokes: 4,
    jlptLevel: 'N5',
    gradeLevel: 'Grade 1',
    frequency: 'High',
    frequencyRank: 412,
    examples: ['火曜日 (かようび)', '火事 (かじ)', '花火 (はなび)'],
    exampleMeanings: ['Tuesday', 'fire incident', 'fireworks'],
    isLearned: true,
    isFavorite: true,
    difficultyLevel: 'beginner',
    practiceCount: 12,
    radical: '火'
  },
  {
    id: 3,
    character: '木',
    readings: { on: 'モク・ボク', kun: 'き' },
    meaning: 'tree, wood',
    strokes: 4,
    jlptLevel: 'N5',
    gradeLevel: 'Grade 1',
    frequency: 'High',
    frequencyRank: 298,
    examples: ['木曜日 (もくようび)', '木材 (もくざい)', '大木 (たいぼく)'],
    exampleMeanings: ['Thursday', 'lumber', 'large tree'],
    isLearned: false,
    isFavorite: false,
    difficultyLevel: 'beginner',
    practiceCount: 3,
    radical: '木'
  },
  {
    id: 4,
    character: '金',
    readings: { on: 'キン・コン', kun: 'かね' },
    meaning: 'gold, money',
    strokes: 8,
    jlptLevel: 'N5',
    gradeLevel: 'Grade 1',
    frequency: 'High',
    frequencyRank: 156,
    examples: ['金曜日 (きんようび)', '金額 (きんがく)', '現金 (げんきん)'],
    exampleMeanings: ['Friday', 'amount of money', 'cash'],
    isLearned: false,
    isFavorite: true,
    difficultyLevel: 'beginner',
    practiceCount: 0,
    radical: '金'
  },
  {
    id: 5,
    character: '学',
    readings: { on: 'ガク', kun: 'まな(ぶ)' },
    meaning: 'study, learn',
    strokes: 8,
    jlptLevel: 'N5',
    gradeLevel: 'Grade 1',
    frequency: 'Very High',
    frequencyRank: 89,
    examples: ['学校 (がっこう)', '学生 (がくせい)', '数学 (すうがく)'],
    exampleMeanings: ['school', 'student', 'mathematics'],
    isLearned: false,
    isFavorite: false,
    difficultyLevel: 'beginner',
    practiceCount: 7,
    radical: '子'
  },
  {
    id: 6,
    character: '家',
    readings: { on: 'カ・ケ', kun: 'いえ・うち' },
    meaning: 'house, home',
    strokes: 10,
    jlptLevel: 'N4',
    gradeLevel: 'Grade 2',
    frequency: 'High',
    frequencyRank: 234,
    examples: ['家族 (かぞく)', '家庭 (かてい)', '実家 (じっか)'],
    exampleMeanings: ['family', 'home/household', 'parents home'],
    isLearned: false,
    isFavorite: false,
    difficultyLevel: 'intermediate',
    practiceCount: 2,
    radical: '宀'
  },
  {
    id: 7,
    character: '時',
    readings: { on: 'ジ', kun: 'とき・じ' },
    meaning: 'time, hour',
    strokes: 10,
    jlptLevel: 'N4',
    gradeLevel: 'Grade 2',
    frequency: 'Very High',
    frequencyRank: 67,
    examples: ['時間 (じかん)', '時計 (とけい)', '何時 (なんじ)'],
    exampleMeanings: ['time', 'clock/watch', 'what time'],
    isLearned: false,
    isFavorite: false,
    difficultyLevel: 'intermediate',
    practiceCount: 0,
    radical: '日'
  },
  {
    id: 8,
    character: '言',
    readings: { on: 'ゲン・ゴン', kun: 'い(う)・こと' },
    meaning: 'say, word',
    strokes: 7,
    jlptLevel: 'N3',
    gradeLevel: 'Grade 2',
    frequency: 'High',
    frequencyRank: 178,
    examples: ['言葉 (ことば)', '発言 (はつげん)', '言語 (げんご)'],
    exampleMeanings: ['word/language', 'statement', 'language'],
    isLearned: false,
    isFavorite: false,
    difficultyLevel: 'intermediate',
    practiceCount: 0,
    radical: '言'
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

const VIEW_MODES = {
  LIST: 'list',
  GRID: 'grid',
  JLPT: 'jlpt'
};

const SORT_OPTIONS = [
  { value: 'stroke', label: 'Stroke Count' },
  { value: 'frequency', label: 'Frequency' },
  { value: 'jlpt', label: 'JLPT Level' },
  { value: 'alphabetical', label: 'Alphabetical' }
];

export default function Kanji() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedKanji, setSelectedKanji] = useState(null);
  const [kanjiList, setKanjiList] = useState(sampleKanji);
  const [viewMode, setViewMode] = useState(VIEW_MODES.GRID);
  const [sortBy, setSortBy] = useState('stroke');
  const [searchDrawerOpen, setSearchDrawerOpen] = useState(false);
  const [searchFilters, setSearchFilters] = useState({});
  const [modalOpen, setModalOpen] = useState(false);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleViewModeChange = (event, newMode) => {
    if (newMode !== null) {
      setViewMode(newMode);
    }
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

  const handlePractice = (kanji) => {
    console.log('Starting practice for:', kanji.character);
    // Practice functionality would be implemented here
  };

  const handleStartLevelPractice = (level) => {
    console.log('Starting practice for level:', level);
    // Level practice functionality would be implemented here
  };

  const handleAdvancedSearch = (filters) => {
    setSearchFilters(filters);
  };

  const applyFiltersAndSearch = (kanji) => {
    // Basic search
    const matchesBasicSearch = searchTerm === '' || 
      kanji.character.includes(searchTerm) || 
      kanji.meaning.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kanji.readings.on.includes(searchTerm) ||
      kanji.readings.kun.includes(searchTerm);

    // Advanced filters
    const matchesCharacterFilter = !searchFilters.character || 
      kanji.character.includes(searchFilters.character);
    
    const matchesMeaningFilter = !searchFilters.meaning || 
      kanji.meaning.toLowerCase().includes(searchFilters.meaning.toLowerCase());
    
    const matchesReadingFilter = !searchFilters.reading || 
      kanji.readings.on.includes(searchFilters.reading) ||
      kanji.readings.kun.includes(searchFilters.reading);
    
    const matchesJLPTFilter = !searchFilters.jlptLevels?.length || 
      searchFilters.jlptLevels.includes(kanji.jlptLevel);
    
    const matchesGradeFilter = !searchFilters.gradeLevels?.length || 
      searchFilters.gradeLevels.includes(kanji.gradeLevel);
    
    const matchesStrokeFilter = !searchFilters.strokeRange || 
      (kanji.strokes >= searchFilters.strokeRange[0] && kanji.strokes <= searchFilters.strokeRange[1]);
    
    const matchesFrequencyFilter = !searchFilters.frequency?.length || 
      searchFilters.frequency.includes(kanji.frequency);

    return matchesBasicSearch && matchesCharacterFilter && matchesMeaningFilter && 
           matchesReadingFilter && matchesJLPTFilter && matchesGradeFilter && 
           matchesStrokeFilter && matchesFrequencyFilter;
  };

  const filteredKanji = kanjiList.filter(kanji => {
    const matchesFilters = applyFiltersAndSearch(kanji);
    
    switch (selectedTab) {
      case 0: return matchesFilters; // All
      case 1: return matchesFilters && !kanji.isLearned; // To Learn
      case 2: return matchesFilters && kanji.isLearned; // Learned
      case 3: return matchesFilters && kanji.isFavorite; // Favorites
      default: return matchesFilters;
    }
  });

  const sortedKanji = [...filteredKanji].sort((a, b) => {
    switch (sortBy) {
      case 'stroke':
        return a.strokes - b.strokes;
      case 'frequency':
        return (a.frequencyRank || 9999) - (b.frequencyRank || 9999);
      case 'jlpt':
        const jlptOrder = { N5: 1, N4: 2, N3: 3, N2: 4, N1: 5 };
        return jlptOrder[a.jlptLevel] - jlptOrder[b.jlptLevel];
      case 'alphabetical':
        return a.character.localeCompare(b.character);
      default:
        return 0;
    }
  });

  const learnedCount = kanjiList.filter(k => k.isLearned).length;
  const totalCount = kanjiList.length;
  const progressPercentage = (learnedCount / totalCount) * 100;

  // Open modal on kanji click
  const handleKanjiClick = (kanji) => {
    setSelectedKanji(kanji);
    setModalOpen(true);
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 1, color: '#333' }}>
          Kanji Learning Hub
        </Typography>
        <Typography variant="body1" sx={{ color: '#666', mb: 3 }}>
          Master Japanese kanji with interactive lessons and comprehensive practice tools
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
                {learnedCount} of {totalCount} kanji learned • {filteredKanji.length} shown with current filters
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

      {/* View Mode Toggle and Controls */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={handleViewModeChange}
            size="small"
          >
            <ToggleButton value={VIEW_MODES.GRID}>
              <GridView fontSize="small" />
            </ToggleButton>
            <ToggleButton value={VIEW_MODES.LIST}>
              <ViewList fontSize="small" />
            </ToggleButton>
            <ToggleButton value={VIEW_MODES.JLPT}>
              <School fontSize="small" />
            </ToggleButton>
          </ToggleButtonGroup>

          {viewMode !== VIEW_MODES.JLPT && (
            <TextField
              select
              size="small"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              SelectProps={{ native: true }}
              sx={{ minWidth: 120 }}
            >
              {SORT_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
          )}
        </Box>

        <Button
          variant="outlined"
          startIcon={<Tune />}
          onClick={() => setSearchDrawerOpen(true)}
          sx={{ 
            borderColor: '#b8862b',
            color: '#b8862b',
            '&:hover': { borderColor: '#a0752a', bgcolor: 'rgba(184, 134, 43, 0.04)' }
          }}
        >
          Advanced Search
        </Button>
      </Box>

      {/* Main Content Area */}
      {viewMode === VIEW_MODES.JLPT ? (
        <JLPTGroupingView 
          kanjiList={sortedKanji}
          onKanjiSelect={handleKanjiClick}
          onStartLevelPractice={handleStartLevelPractice}
        />
      ) : (
        <Grid container spacing={3}>
          {/* Left Panel - Kanji List */}
          <Grid item xs={12} lg={selectedKanji ? 8 : 12}>
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

              {/* Results Count */}
              <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>
                Showing {sortedKanji.length} kanji
                {Object.keys(searchFilters).length > 0 && ' with filters applied'}
              </Typography>

              {/* Kanji Display */}
              {viewMode === VIEW_MODES.GRID ? (
                <Grid container spacing={2}>
                  {sortedKanji.map((kanji) => (
                    <Grid item xs={12} sm={6} md={4} lg={selectedKanji ? 4 : 3} key={kanji.id}>
                      <KanjiCard
                        kanji={kanji}
                        selected={selectedKanji?.id === kanji.id}
                        onClick={() => handleKanjiClick(kanji)}
                        onToggleFavorite={toggleFavorite}
                      />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <List sx={{ p: 0 }}>
                  {sortedKanji.map((kanji) => (
                    <ListItem 
                      key={kanji.id}
                      sx={{ 
                        mb: 1,
                        border: selectedKanji?.id === kanji.id ? '2px solid #b8862b' : '1px solid #e0e0e0',
                        borderRadius: 2,
                        cursor: 'pointer',
                        '&:hover': { bgcolor: '#f8f9fa' }
                      }}
                      onClick={() => handleKanjiClick(kanji)}
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ 
                          bgcolor: 'transparent', 
                          color: '#333',
                          fontSize: '2rem',
                          fontFamily: 'serif',
                          width: 60,
                          height: 60
                        }}>
                          {kanji.character}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText 
                        primary={kanji.meaning}
                        secondary={`On: ${kanji.readings.on} • Kun: ${kanji.readings.kun} • ${kanji.strokes} strokes • ${kanji.jlptLevel}`}
                        primaryTypographyProps={{
                          fontWeight: 600,
                          fontSize: '1.1rem'
                        }}
                        secondaryTypographyProps={{
                          fontSize: '0.9rem'
                        }}
                      />
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {kanji.isFavorite && <Star sx={{ color: '#ff9800', fontSize: 20 }} />}
                        {kanji.isLearned && <CheckCircle sx={{ color: '#4caf50', fontSize: 20 }} />}
                        <IconButton 
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(kanji.id);
                          }}
                        >
                          <BookmarkBorder fontSize="small" />
                        </IconButton>
                      </Box>
                    </ListItem>
                  ))}
                </List>
              )}

              {sortedKanji.length === 0 && (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                  <Typography variant="h6" sx={{ color: '#666', mb: 2 }}>
                    No kanji found
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#999' }}>
                    Try adjusting your search terms or filters
                  </Typography>
                </Box>
              )}
            </Paper>
          </Grid>

          {/* Right Panel - Kanji Details (desktop only) */}
          {selectedKanji && (
            <Grid item xs={12} lg={4} sx={{ display: { xs: 'none', lg: 'block' } }}>
              <KanjiInformationPanel 
                kanji={selectedKanji}
                onToggleFavorite={toggleFavorite}
                onMarkAsLearned={markAsLearned}
                onPractice={handlePractice}
              />
            </Grid>
          )}
        </Grid>
      )}

      {/* Kanji Detail Modal (mobile/tablet and hybrid) */}
      <KanjiDetailModal 
        open={modalOpen} 
        onClose={() => setModalOpen(false)} 
        kanji={selectedKanji} 
      />

      {/* Advanced Search Drawer */}
      <KanjiSearchDrawer 
        open={searchDrawerOpen}
        onClose={() => setSearchDrawerOpen(false)}
        onSearch={handleAdvancedSearch}
        currentFilters={searchFilters}
      />

      {/* Floating Action Button for Mobile */}
      <Fab 
        color="primary" 
        sx={{ 
          position: 'fixed', 
          bottom: 16, 
          right: 16,
          bgcolor: '#b8862b',
          '&:hover': { bgcolor: '#a0752a' },
          display: { xs: 'flex', md: 'none' }
        }}
        onClick={() => setSearchDrawerOpen(true)}
      >
        <Tune />
      </Fab>
    </Box>
  );
}
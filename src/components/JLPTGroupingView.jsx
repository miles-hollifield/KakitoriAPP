import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  Avatar,
  IconButton,
  Divider
} from '@mui/material';
import {
  ExpandMore,
  School,
  Quiz,
  TrendingUp,
  Star,
  CheckCircle,
  PlayArrow,
  Timeline,
  EmojiEvents
} from '@mui/icons-material';

const jlptLevels = {
  N5: {
    name: 'N5 - Beginner',
    color: '#4caf50',
    description: 'Basic kanji for everyday use',
    totalKanji: 103,
    estimatedHours: 150
  },
  N4: {
    name: 'N4 - Elementary',
    color: '#8bc34a',
    description: 'Foundation kanji for basic communication',
    totalKanji: 181,
    estimatedHours: 300
  },
  N3: {
    name: 'N3 - Intermediate',
    color: '#ff9800',
    description: 'Kanji for daily life and simple business',
    totalKanji: 367,
    estimatedHours: 450
  },
  N2: {
    name: 'N2 - Upper Intermediate',
    color: '#ff5722',
    description: 'Advanced kanji for complex topics',
    totalKanji: 415,
    estimatedHours: 600
  },
  N1: {
    name: 'N1 - Advanced',
    color: '#f44336',
    description: 'Comprehensive kanji for native-level reading',
    totalKanji: 1000,
    estimatedHours: 900
  }
};

export default function JLPTGroupingView({ kanjiList, onKanjiSelect, onStartLevelPractice }) {
  const [expandedLevel, setExpandedLevel] = useState('N5');

  const getKanjiByLevel = (level) => {
    return kanjiList.filter(kanji => kanji.jlptLevel === level);
  };

  const getLevelProgress = (level) => {
    const levelKanji = getKanjiByLevel(level);
    const learnedCount = levelKanji.filter(k => k.isLearned).length;
    return {
      learned: learnedCount,
      total: levelKanji.length,
      percentage: levelKanji.length > 0 ? (learnedCount / levelKanji.length) * 100 : 0
    };
  };

  const handleAccordionChange = (level) => (event, isExpanded) => {
    setExpandedLevel(isExpanded ? level : false);
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* JLPT Overview Header */}
      <Paper sx={{ p: 4, mb: 3, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 2, color: '#333' }}>
          JLPT Level Overview
        </Typography>
        <Typography variant="body1" sx={{ color: '#666', mb: 3 }}>
          Master kanji systematically by JLPT levels. Track your progress from beginner to advanced.
        </Typography>

        {/* Progress Summary Cards */}
        <Grid container spacing={3}>
          {Object.entries(jlptLevels).map(([level, info]) => {
            const progress = getLevelProgress(level);
            return (
              <Grid item xs={12} sm={6} md={2.4} key={level}>
                <Card sx={{ 
                  p: 2, 
                  textAlign: 'center',
                  border: `2px solid ${info.color}`,
                  '&:hover': { 
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.12)'
                  },
                  transition: 'all 0.2s'
                }}>
                  <Typography variant="h5" sx={{ color: info.color, fontWeight: 700, mb: 1 }}>
                    {level}
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#333', fontWeight: 600, mb: 1 }}>
                    {progress.learned}/{progress.total}
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={progress.percentage}
                    sx={{ 
                      height: 8, 
                      borderRadius: 4,
                      mb: 1,
                      '& .MuiLinearProgress-bar': { bgcolor: info.color }
                    }} 
                  />
                  <Typography variant="caption" sx={{ color: '#666' }}>
                    {Math.round(progress.percentage)}% Complete
                  </Typography>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Paper>

      {/* Detailed Level Breakdown */}
      <Box>
        {Object.entries(jlptLevels).map(([level, info]) => {
          const levelKanji = getKanjiByLevel(level);
          const progress = getLevelProgress(level);
          
          return (
            <Accordion 
              key={level}
              expanded={expandedLevel === level}
              onChange={handleAccordionChange(level)}
              sx={{ 
                mb: 2, 
                borderRadius: 2, 
                '&:before': { display: 'none' },
                boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
              }}
            >
              <AccordionSummary 
                expandIcon={<ExpandMore />}
                sx={{ 
                  bgcolor: `${info.color}10`,
                  borderRadius: 2,
                  '&.Mui-expanded': { borderRadius: '8px 8px 0 0' }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                  <Avatar sx={{ bgcolor: info.color, color: 'white', fontWeight: 700 }}>
                    {level}
                  </Avatar>
                  
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>
                      {info.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                      {info.description}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ textAlign: 'right', minWidth: 120 }}>
                    <Typography variant="h6" sx={{ color: info.color, fontWeight: 700 }}>
                      {progress.learned}/{progress.total}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#666' }}>
                      {Math.round(progress.percentage)}% complete
                    </Typography>
                  </Box>
                </Box>
              </AccordionSummary>
              
              <AccordionDetails sx={{ p: 3 }}>
                <Grid container spacing={3} sx={{ mb: 3 }}>
                  {/* Level Statistics */}
                  <Grid item xs={12} md={8}>
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                        Progress Details
                      </Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={progress.percentage}
                        sx={{ 
                          height: 12, 
                          borderRadius: 6,
                          mb: 1,
                          '& .MuiLinearProgress-bar': { bgcolor: info.color }
                        }} 
                      />
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="body2" sx={{ color: '#666' }}>
                          {progress.learned} kanji learned
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#666' }}>
                          {progress.total - progress.learned} remaining
                        </Typography>
                      </Box>
                      
                      <Grid container spacing={2}>
                        <Grid item xs={4}>
                          <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#f8f9fa' }}>
                            <Typography variant="h5" sx={{ color: info.color, fontWeight: 700 }}>
                              {info.estimatedHours}h
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#666' }}>
                              Est. Study Time
                            </Typography>
                          </Paper>
                        </Grid>
                        <Grid item xs={4}>
                          <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#f8f9fa' }}>
                            <Typography variant="h5" sx={{ color: '#4caf50', fontWeight: 700 }}>
                              {levelKanji.filter(k => k.isFavorite).length}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#666' }}>
                              Favorites
                            </Typography>
                          </Paper>
                        </Grid>
                        <Grid item xs={4}>
                          <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#f8f9fa' }}>
                            <Typography variant="h5" sx={{ color: '#ff9800', fontWeight: 700 }}>
                              {Math.round(progress.percentage / 10)}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#666' }}>
                              Mastery Score
                            </Typography>
                          </Paper>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                      Quick Actions
                    </Typography>
                    <Stack spacing={2}>
                      <Button
                        fullWidth
                        variant="contained"
                        startIcon={<PlayArrow />}
                        onClick={() => onStartLevelPractice(level)}
                        sx={{ 
                          bgcolor: info.color,
                          '&:hover': { bgcolor: info.color, filter: 'brightness(0.9)' }
                        }}
                      >
                        Practice {level}
                      </Button>
                      
                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<Quiz />}
                        sx={{ 
                          borderColor: info.color,
                          color: info.color,
                          '&:hover': { borderColor: info.color, bgcolor: `${info.color}10` }
                        }}
                      >
                        Level Quiz
                      </Button>
                      
                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<Timeline />}
                        sx={{ 
                          borderColor: '#666',
                          color: '#666',
                          '&:hover': { borderColor: '#333', bgcolor: '#f5f5f5' }
                        }}
                      >
                        Study Plan
                      </Button>
                    </Stack>
                  </Grid>
                </Grid>
                
                <Divider sx={{ mb: 3 }} />
                
                {/* Kanji Grid for this level */}
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                  Kanji in this level ({levelKanji.length})
                </Typography>
                
                {levelKanji.length > 0 ? (
                  <Grid container spacing={2}>
                    {levelKanji.slice(0, 20).map((kanji) => (
                      <Grid item xs={6} sm={4} md={3} lg={2} key={kanji.id}>
                        <Card 
                          sx={{ 
                            p: 2, 
                            textAlign: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            border: kanji.isLearned ? '2px solid #4caf50' : '1px solid #e0e0e0',
                            '&:hover': {
                              transform: 'translateY(-2px)',
                              boxShadow: '0 8px 25px rgba(0,0,0,0.12)'
                            }
                          }}
                          onClick={() => onKanjiSelect(kanji)}
                        >
                          <Box sx={{ position: 'relative', mb: 1 }}>
                            <Typography 
                              variant="h4" 
                              sx={{ 
                                fontFamily: 'serif',
                                color: '#333',
                                fontWeight: 400
                              }}
                            >
                              {kanji.character}
                            </Typography>
                            
                            {/* Status indicators */}
                            <Box sx={{ 
                              position: 'absolute', 
                              top: -8, 
                              right: -8,
                              display: 'flex',
                              gap: 0.5
                            }}>
                              {kanji.isFavorite && (
                                <Star sx={{ color: '#ff9800', fontSize: 16 }} />
                              )}
                              {kanji.isLearned && (
                                <CheckCircle sx={{ color: '#4caf50', fontSize: 16 }} />
                              )}
                            </Box>
                          </Box>
                          
                          <Typography variant="caption" sx={{ color: '#666', display: 'block' }}>
                            {kanji.meaning}
                          </Typography>
                        </Card>
                      </Grid>
                    ))}
                    
                    {levelKanji.length > 20 && (
                      <Grid item xs={12}>
                        <Box sx={{ textAlign: 'center', mt: 2 }}>
                          <Button 
                            variant="text" 
                            sx={{ color: info.color }}
                          >
                            View all {levelKanji.length} kanji in {level}
                          </Button>
                        </Box>
                      </Grid>
                    )}
                  </Grid>
                ) : (
                  <Paper sx={{ p: 4, textAlign: 'center', bgcolor: '#f8f9fa' }}>
                    <Typography variant="body1" sx={{ color: '#666' }}>
                      No kanji available for this level yet.
                    </Typography>
                  </Paper>
                )}
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Box>
    </Box>
  );
}
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  LinearProgress,
  Button,
  Avatar,
  IconButton,
  Chip,
  Divider,
  Stack
} from '@mui/material';
import { 
  School, 
  Quiz, 
  PlayArrow,
  Star,
  LocalFireDepartment,
  TrendingUp,
  MoreVert,
  Add,
  EmojiEvents,
  MenuBook,
  TextFields,
  Refresh,
  Timeline,
  CalendarToday,
  FlagOutlined,
  CheckCircle
} from '@mui/icons-material';

// Dashboard page for Kakitori
export default function Dashboard() {
  return (
    <Box sx={{ width: '100%', p: { xs: 2, md: 3 } }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 700, 
            color: '#333',
            mb: 1
          }}
        >
          Overview
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            color: '#666'
          }}
        >
          Welcome back, John! Ready to continue your Japanese learning journey?
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Left Column - Main Content */}
        <Grid size={{ xs: 12, lg: 8 }}>
          {/* Today's Progress */}
          <Card sx={{ p: 3, mb: 3, border: '1px solid #f0f0f0' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, color: '#333' }}>
                Today's Progress
              </Typography>
              <Chip 
                icon={<LocalFireDepartment />}
                label="25 Day Streak" 
                sx={{ 
                  bgcolor: '#ff9800', 
                  color: 'white',
                  fontWeight: 600
                }}
              />
            </Box>

            <Grid container spacing={3}>
              {/* Daily Goals */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#333' }}>
                  Daily Goals
                </Typography>
                
                <Stack spacing={2}>
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Kanji Practice</Typography>
                      <Typography variant="body2" sx={{ color: '#b8862b', fontWeight: 600 }}>8/10</Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={80} 
                      sx={{ 
                        height: 8, 
                        borderRadius: 4,
                        bgcolor: '#f5f5f5',
                        '& .MuiLinearProgress-bar': { bgcolor: '#b8862b' }
                      }} 
                    />
                  </Box>

                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Vocabulary Review</Typography>
                      <Typography variant="body2" sx={{ color: '#4caf50', fontWeight: 600 }}>15/15</Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={100} 
                      sx={{ 
                        height: 8, 
                        borderRadius: 4,
                        bgcolor: '#f5f5f5',
                        '& .MuiLinearProgress-bar': { bgcolor: '#4caf50' }
                      }} 
                    />
                  </Box>

                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Grammar Lessons</Typography>
                      <Typography variant="body2" sx={{ color: '#ff9800', fontWeight: 600 }}>1/2</Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={50} 
                      sx={{ 
                        height: 8, 
                        borderRadius: 4,
                        bgcolor: '#f5f5f5',
                        '& .MuiLinearProgress-bar': { bgcolor: '#ff9800' }
                      }} 
                    />
                  </Box>
                </Stack>
              </Grid>

              {/* Study Stats */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#333' }}>
                  Your Stats
                </Typography>
                
                <Grid container spacing={2}>
                  <Grid size={6}>
                    <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#f8f9fa', borderRadius: 2 }}>
                      <Typography variant="h4" sx={{ color: '#b8862b', fontWeight: 700 }}>342</Typography>
                      <Typography variant="caption" sx={{ color: '#666' }}>Kanji Learned</Typography>
                    </Box>
                  </Grid>
                  <Grid size={6}>
                    <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#f8f9fa', borderRadius: 2 }}>
                      <Typography variant="h4" sx={{ color: '#4caf50', fontWeight: 700 }}>1,247</Typography>
                      <Typography variant="caption" sx={{ color: '#666' }}>Vocabulary</Typography>
                    </Box>
                  </Grid>
                  <Grid size={6}>
                    <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#f8f9fa', borderRadius: 2 }}>
                      <Typography variant="h4" sx={{ color: '#2196f3', fontWeight: 700 }}>25</Typography>
                      <Typography variant="caption" sx={{ color: '#666' }}>Study Streak</Typography>
                    </Box>
                  </Grid>
                  <Grid size={6}>
                    <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#f8f9fa', borderRadius: 2 }}>
                      <Typography variant="h4" sx={{ color: '#ff9800', fontWeight: 700 }}>8.5h</Typography>
                      <Typography variant="caption" sx={{ color: '#666' }}>This Week</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Card>

          {/* JLPT Preparation */}
          <Card sx={{ p: 3, mb: 3, border: '1px solid #f0f0f0' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, color: '#333' }}>
                JLPT N4 Preparation
              </Typography>
              <Button 
                startIcon={<FlagOutlined />}
                variant="outlined"
                size="small"
                sx={{ 
                  borderColor: '#b8862b',
                  color: '#b8862b',
                  '&:hover': { borderColor: '#a0752a', bgcolor: 'rgba(184, 134, 43, 0.04)' }
                }}
              >
                Set Goal
              </Button>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>Overall Progress</Typography>
                <Typography variant="body1" sx={{ color: '#b8862b', fontWeight: 700 }}>65%</Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={65} 
                sx={{ 
                  height: 12, 
                  borderRadius: 6,
                  bgcolor: '#f5f5f5',
                  '& .MuiLinearProgress-bar': {
                    bgcolor: '#b8862b',
                    borderRadius: 6
                  }
                }} 
              />
              <Typography variant="body2" sx={{ color: '#666', mt: 1 }}>
                235 days until exam • Estimated completion: March 2025
              </Typography>
            </Box>

            <Grid container spacing={3}>
              <Grid size={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h5" sx={{ color: '#b8862b', fontWeight: 700, mb: 1 }}>342/1000</Typography>
                  <Typography variant="body2" sx={{ color: '#666', fontWeight: 500 }}>Kanji</Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={34.2} 
                    sx={{ 
                      mt: 1,
                      height: 4, 
                      borderRadius: 2,
                      '& .MuiLinearProgress-bar': { bgcolor: '#b8862b' }
                    }} 
                  />
                </Box>
              </Grid>
              <Grid size={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h5" sx={{ color: '#4caf50', fontWeight: 700, mb: 1 }}>1247/2500</Typography>
                  <Typography variant="body2" sx={{ color: '#666', fontWeight: 500 }}>Vocabulary</Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={49.88} 
                    sx={{ 
                      mt: 1,
                      height: 4, 
                      borderRadius: 2,
                      '& .MuiLinearProgress-bar': { bgcolor: '#4caf50' }
                    }} 
                  />
                </Box>
              </Grid>
              <Grid size={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h5" sx={{ color: '#2196f3', fontWeight: 700, mb: 1 }}>89%</Typography>
                  <Typography variant="body2" sx={{ color: '#666', fontWeight: 500 }}>Grammar</Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={89} 
                    sx={{ 
                      mt: 1,
                      height: 4, 
                      borderRadius: 2,
                      '& .MuiLinearProgress-bar': { bgcolor: '#2196f3' }
                    }} 
                  />
                </Box>
              </Grid>
              <Grid size={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h5" sx={{ color: '#ff9800', fontWeight: 700, mb: 1 }}>76%</Typography>
                  <Typography variant="body2" sx={{ color: '#666', fontWeight: 500 }}>Listening</Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={76} 
                    sx={{ 
                      mt: 1,
                      height: 4, 
                      borderRadius: 2,
                      '& .MuiLinearProgress-bar': { bgcolor: '#ff9800' }
                    }} 
                  />
                </Box>
              </Grid>
            </Grid>
          </Card>

          {/* Continue Learning */}
          <Card sx={{ p: 3, border: '1px solid #f0f0f0' }}>
            <Typography variant="h5" sx={{ fontWeight: 600, color: '#333', mb: 3 }}>
              Continue Learning
            </Typography>
            
            <Grid container spacing={3}>
              <Grid size={{ xs: 6, md: 3 }}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<School />}
                  sx={{ 
                    height: 100,
                    flexDirection: 'column', 
                    gap: 1,
                    bgcolor: '#b8862b',
                    '&:hover': { bgcolor: '#a0752a' }
                  }}
                >
                  <Typography variant="body1" sx={{ fontWeight: 600, textTransform: 'none' }}>
                    Lesson 12
                  </Typography>
                  <Typography variant="caption">
                    Grammar: Conditional Forms
                  </Typography>
                </Button>
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Quiz />}
                  sx={{ 
                    height: 100,
                    flexDirection: 'column', 
                    gap: 1,
                    borderColor: '#4caf50',
                    color: '#4caf50',
                    '&:hover': {
                      borderColor: '#45a049',
                      bgcolor: 'rgba(76, 175, 80, 0.04)'
                    }
                  }}
                >
                  <Typography variant="body1" sx={{ fontWeight: 600, textTransform: 'none' }}>
                    Quiz Mode
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#666' }}>
                    5 pending reviews
                  </Typography>
                </Button>
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Refresh />}
                  sx={{ 
                    height: 100,
                    flexDirection: 'column', 
                    gap: 1,
                    borderColor: '#2196f3',
                    color: '#2196f3',
                    '&:hover': {
                      borderColor: '#1976d2',
                      bgcolor: 'rgba(33, 150, 243, 0.04)'
                    }
                  }}
                >
                  <Typography variant="body1" sx={{ fontWeight: 600, textTransform: 'none' }}>
                    Review
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#666' }}>
                    23 cards due
                  </Typography>
                </Button>
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<PlayArrow />}
                  sx={{ 
                    height: 100,
                    flexDirection: 'column', 
                    gap: 1,
                    borderColor: '#ff9800',
                    color: '#ff9800',
                    '&:hover': {
                      borderColor: '#f57c00',
                      bgcolor: 'rgba(255, 152, 0, 0.04)'
                    }
                  }}
                >
                  <Typography variant="body1" sx={{ fontWeight: 600, textTransform: 'none' }}>
                    Practice
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#666' }}>
                    Speaking & Listening
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Grid>

        {/* Right Column - Sidebar */}
        <Grid size={{ xs: 12, lg: 4 }}>
          {/* Recent Activity */}
          <Card sx={{ p: 3, mb: 3, border: '1px solid #f0f0f0' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>
                Recent Activity
              </Typography>
              <IconButton size="small">
                <MoreVert fontSize="small" />
              </IconButton>
            </Box>
            
            <Stack spacing={2.5}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: '#b8862b', width: 36, height: 36 }}>
                  <School sx={{ fontSize: 18 }} />
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Completed Kanji Lesson 12
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#666' }}>
                    2 hours ago
                  </Typography>
                </Box>
                <CheckCircle sx={{ color: '#4caf50', fontSize: 20 }} />
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: '#4caf50', width: 36, height: 36 }}>
                  <Quiz sx={{ fontSize: 18 }} />
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Perfect score on Quiz 8
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#666' }}>
                    Yesterday
                  </Typography>
                </Box>
                <Star sx={{ color: '#ff9800', fontSize: 20 }} />
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: '#2196f3', width: 36, height: 36 }}>
                  <MenuBook sx={{ fontSize: 18 }} />
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Learned 25 new vocabulary
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#666' }}>
                    2 days ago
                  </Typography>
                </Box>
                <Typography variant="caption" sx={{ color: '#4caf50', fontWeight: 600 }}>
                  +25
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: '#ff9800', width: 36, height: 36 }}>
                  <FlagOutlined sx={{ fontSize: 18 }} />
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Started JLPT N4 practice
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#666' }}>
                    3 days ago
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </Card>

          {/* This Week's Schedule */}
          <Card sx={{ p: 3, mb: 3, border: '1px solid #f0f0f0' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
              <CalendarToday sx={{ color: '#b8862b', fontSize: 20 }} />
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>
                This Week
              </Typography>
            </Box>
            
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2">Study Time Goal</Typography>
                <Typography variant="body2" sx={{ color: '#b8862b', fontWeight: 600 }}>8.5/10h</Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={85} 
                sx={{ 
                  height: 8, 
                  borderRadius: 4,
                  '& .MuiLinearProgress-bar': { bgcolor: '#b8862b' }
                }} 
              />
              
              <Divider sx={{ my: 1 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2">Lessons Completed</Typography>
                <Typography variant="body2" sx={{ color: '#4caf50', fontWeight: 600 }}>8/10</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2">Review Sessions</Typography>
                <Typography variant="body2" sx={{ color: '#2196f3', fontWeight: 600 }}>12/15</Typography>
              </Box>
            </Stack>
          </Card>

          {/* Achievements */}
          <Card sx={{ p: 3, border: '1px solid #f0f0f0' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#333', mb: 3 }}>
              Recent Achievements
            </Typography>
            
            <Stack spacing={2}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2, 
                p: 2, 
                bgcolor: '#fff3e0', 
                borderRadius: 2,
                border: '1px solid #ffcc02'
              }}>
                <EmojiEvents sx={{ color: '#ff9800', fontSize: 24 }} />
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    25-Day Streak Master
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#666' }}>
                    Study for 25 consecutive days
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2, 
                p: 2, 
                bgcolor: '#e8f5e8', 
                borderRadius: 2,
                border: '1px solid #4caf50'
              }}>
                <EmojiEvents sx={{ color: '#4caf50', fontSize: 24 }} />
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Vocabulary Collector
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#666' }}>
                    Learn 1000+ vocabulary words
                  </Typography>
                </Box>
              </Box>

              <Button 
                variant="outlined" 
                fullWidth 
                sx={{ 
                  mt: 2, 
                  borderColor: '#b8862b', 
                  color: '#b8862b',
                  textTransform: 'none',
                  '&:hover': { 
                    borderColor: '#a0752a', 
                    bgcolor: 'rgba(184, 134, 43, 0.04)' 
                  }
                }}
              >
                View All Achievements
              </Button>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
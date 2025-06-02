import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  LinearProgress,
  Button,
  Avatar,
  Chip,
  Stack,
  Paper,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar
} from '@mui/material';
import { 
  TrendingUp, 
  School, 
  Quiz, 
  BookmarkBorder,
  PlayArrow,
  Star,
  LocalFireDepartment,
  ArrowForward,
  EmojiEvents,
  Timeline,
  Chat,
  SmartToy,
  Translate,
  MenuBook,
  Assignment
} from '@mui/icons-material';

// Dashboard page for Kakitori
export default function Dashboard() {
  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Welcome Section */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 1, color: '#333' }}>
          Welcome back, John! 👋
        </Typography>
        <Typography variant="body1" sx={{ color: '#666' }}>
          Ready to continue your Japanese learning journey?
        </Typography>
      </Box>

      {/* Top Stats Row */}
      <Box sx={{ width: '100%', maxWidth: 1400, mx: 'auto' }}>
        <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <Typography variant="h2" sx={{ fontWeight: 700, color: '#b8862b', mb: 1 }}>
              15
            </Typography>
            <Typography variant="body1" sx={{ color: '#666', fontWeight: 500 }}>
              Kanji Learned Today
            </Typography>
            <Typography variant="caption" sx={{ color: '#4caf50' }}>
              +3 from yesterday
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <Typography variant="h2" sx={{ fontWeight: 700, color: '#4caf50', mb: 1 }}>
              42
            </Typography>
            <Typography variant="body1" sx={{ color: '#666', fontWeight: 500 }}>
              Vocabulary Words
            </Typography>
            <Typography variant="caption" sx={{ color: '#4caf50' }}>
              +8 from yesterday
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <Typography variant="h2" sx={{ fontWeight: 700, color: '#2196f3', mb: 1 }}>
              8
            </Typography>
            <Typography variant="body1" sx={{ color: '#666', fontWeight: 500 }}>
              Lessons Completed
            </Typography>
            <Typography variant="caption" sx={{ color: '#4caf50' }}>
              2 remaining today
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', background: 'linear-gradient(135deg, #ff9800 0%, #ff5722 100%)', color: 'white' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
              <Typography variant="h2" sx={{ fontWeight: 700 }}>
                25
              </Typography>
              <LocalFireDepartment sx={{ fontSize: '2rem' }} />
            </Box>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              Day Study Streak
            </Typography>
            <Typography variant="caption">
              Your longest ever!
            </Typography>
          </Paper>
        </Grid>
              </Grid>

        <Grid container spacing={3}>
        {/* Left Column - Main Content */}
        <Grid item xs={12} lg={8}>
          {/* Learning Progress Overview */}
          <Paper sx={{ p: 4, mb: 3, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: '#333' }}>
              Learning Progress
            </Typography>
            
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>JLPT N4 Progress</Typography>
                    <Typography variant="h6" sx={{ color: '#b8862b', fontWeight: 700 }}>65%</Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={65} 
                    sx={{ 
                      height: 12, 
                      borderRadius: 6,
                      bgcolor: '#f0f0f0',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: '#b8862b',
                        borderRadius: 6
                      }
                    }} 
                  />
                  <Typography variant="body2" sx={{ color: '#666', mt: 1 }}>
                    235 days until exam • 1,200 kanji remaining
                  </Typography>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>Kanji Mastery</Typography>
                    <Typography variant="body1" sx={{ color: '#4caf50', fontWeight: 600 }}>342/1000</Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={34.2} 
                    sx={{ 
                      height: 8, 
                      borderRadius: 4,
                      bgcolor: '#f0f0f0',
                      '& .MuiLinearProgress-bar': { bgcolor: '#4caf50' }
                    }} 
                  />
                </Box>

                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>Vocabulary</Typography>
                    <Typography variant="body1" sx={{ color: '#2196f3', fontWeight: 600 }}>1,247/2,500</Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={49.88} 
                    sx={{ 
                      height: 8, 
                      borderRadius: 4,
                      bgcolor: '#f0f0f0',
                      '& .MuiLinearProgress-bar': { bgcolor: '#2196f3' }
                    }} 
                  />
                </Box>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="body1" sx={{ fontWeight: 600, mb: 2 }}>Weekly Study Time</Typography>
                <Box sx={{ display: 'flex', alignItems: 'end', gap: 1, height: 120, mb: 2 }}>
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
                    const heights = [60, 80, 45, 90, 75, 30, 85];
                    return (
                      <Box key={day} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                        <Box 
                          sx={{ 
                            width: '100%', 
                            bgcolor: index === 6 ? '#b8862b' : '#e0e0e0', 
                            height: heights[index],
                            borderRadius: 1,
                            mb: 1
                          }} 
                        />
                        <Typography variant="caption" sx={{ color: '#666' }}>{day}</Typography>
                      </Box>
                    );
                  })}
                </Box>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  Total this week: <strong>8.5 hours</strong> • Goal: 10 hours
                </Typography>
              </Grid>
            </Grid>
          </Paper>

          {/* Quick Actions */}
          <Paper sx={{ p: 4, mb: 3, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: '#333' }}>
              Continue Learning
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={6} sm={4} md={3}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<School />}
                  sx={{ 
                    py: 3, 
                    flexDirection: 'column', 
                    gap: 1,
                    borderColor: '#b8862b',
                    color: '#b8862b',
                    borderRadius: 3,
                    '&:hover': {
                      borderColor: '#a0752a',
                      bgcolor: 'rgba(184, 134, 43, 0.04)'
                    }
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Start Lesson
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#666' }}>
                    Chapter 12
                  </Typography>
                </Button>
              </Grid>
              <Grid item xs={6} sm={4} md={3}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Quiz />}
                  sx={{ 
                    py: 3, 
                    flexDirection: 'column', 
                    gap: 1,
                    borderColor: '#4caf50',
                    color: '#4caf50',
                    borderRadius: 3,
                    '&:hover': {
                      borderColor: '#45a049',
                      bgcolor: 'rgba(76, 175, 80, 0.04)'
                    }
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Take Quiz
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#666' }}>
                    5 pending
                  </Typography>
                </Button>
              </Grid>
              <Grid item xs={6} sm={4} md={3}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<BookmarkBorder />}
                  sx={{ 
                    py: 3, 
                    flexDirection: 'column', 
                    gap: 1,
                    borderColor: '#2196f3',
                    color: '#2196f3',
                    borderRadius: 3,
                    '&:hover': {
                      borderColor: '#1976d2',
                      bgcolor: 'rgba(33, 150, 243, 0.04)'
                    }
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Review Cards
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#666' }}>
                    23 due
                  </Typography>
                </Button>
              </Grid>
              <Grid item xs={6} sm={4} md={3}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Chat />}
                  sx={{ 
                    py: 3, 
                    flexDirection: 'column', 
                    gap: 1,
                    borderColor: '#9c27b0',
                    color: '#9c27b0',
                    borderRadius: 3,
                    '&:hover': {
                      borderColor: '#7b1fa2',
                      bgcolor: 'rgba(156, 39, 176, 0.04)'
                    }
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    AI Tutor
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#666' }}>
                    Practice
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Paper>

          {/* Upcoming Lessons */}
          <Paper sx={{ p: 4, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, color: '#333' }}>
                Recommended for You
              </Typography>
              <Button endIcon={<ArrowForward />} sx={{ color: '#b8862b' }}>
                View All
              </Button>
            </Box>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card sx={{ p: 3, borderRadius: 2, border: '1px solid #e0e0e0' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Avatar sx={{ bgcolor: '#b8862b', width: 48, height: 48 }}>
                      <MenuBook />
                    </Avatar>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Kanji: Family & Relations
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#666' }}>
                        Learn 15 new kanji characters
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Chip label="20 min" size="small" sx={{ bgcolor: '#f5f5f5' }} />
                    <Button size="small" sx={{ color: '#b8862b' }}>Start</Button>
                  </Box>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card sx={{ p: 3, borderRadius: 2, border: '1px solid #e0e0e0' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Avatar sx={{ bgcolor: '#4caf50', width: 48, height: 48 }}>
                      <Translate />
                    </Avatar>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Conversation Practice
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#666' }}>
                        Restaurant ordering dialogue
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Chip label="15 min" size="small" sx={{ bgcolor: '#f5f5f5' }} />
                    <Button size="small" sx={{ color: '#4caf50' }}>Practice</Button>
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Right Column - Sidebar */}
        <Grid item xs={12} lg={4}>
          <Stack spacing={3}>
            {/* Recent Activity */}
            <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: '#333' }}>
                Recent Activity
              </Typography>
              
              <List sx={{ p: 0 }}>
                <ListItem sx={{ px: 0, py: 1 }}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: '#b8862b', width: 40, height: 40, fontSize: 18, fontWeight: 600 }}>
                      漢
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary="Completed Kanji Lesson 12"
                    secondary="2 hours ago"
                    primaryTypographyProps={{ fontWeight: 600, fontSize: 14 }}
                    secondaryTypographyProps={{ fontSize: 12 }}
                  />
                  <Star sx={{ color: '#ffc107', fontSize: 20 }} />
                </ListItem>
                
                <ListItem sx={{ px: 0, py: 1 }}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: '#4caf50', width: 40, height: 40, fontSize: 18, fontWeight: 600 }}>
                      語
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary="Learned 25 new vocabulary"
                    secondary="Yesterday"
                    primaryTypographyProps={{ fontWeight: 600, fontSize: 14 }}
                    secondaryTypographyProps={{ fontSize: 12 }}
                  />
                  <Chip label="+25" size="small" sx={{ bgcolor: '#4caf50', color: 'white', fontWeight: 600 }} />
                </ListItem>
                
                <ListItem sx={{ px: 0, py: 1 }}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: '#2196f3', width: 40, height: 40, fontSize: 18, fontWeight: 600 }}>
                      練
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary="Perfect score on Quiz 8"
                    secondary="2 days ago"
                    primaryTypographyProps={{ fontWeight: 600, fontSize: 14 }}
                    secondaryTypographyProps={{ fontSize: 12 }}
                  />
                  <Typography variant="body2" sx={{ color: '#2196f3', fontWeight: 700 }}>
                    100%
                  </Typography>
                </ListItem>
              </List>
            </Paper>

            {/* Achievements */}
            <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: '#333' }}>
                Recent Achievements
              </Typography>
              
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, bgcolor: '#fff3e0', borderRadius: 2 }}>
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
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, bgcolor: '#e8f5e8', borderRadius: 2 }}>
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
              </Stack>
            </Paper>

            {/* Community Activity */}
            <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: '#333' }}>
                Community
              </Typography>
              
              <Stack spacing={2}>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                    📚 Study Group: N4 Preparation
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#666' }}>
                    24 members • Next session: Tomorrow 7 PM
                  </Typography>
                </Box>
                
                <Divider />
                
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                    🎯 Challenge: 100 Kanji in 7 Days
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#666' }}>
                    Progress: 45/100 • 2 days remaining
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={45} 
                    sx={{ 
                      mt: 1,
                      height: 6, 
                      borderRadius: 3,
                      bgcolor: '#f0f0f0',
                      '& .MuiLinearProgress-bar': { bgcolor: '#ff9800' }
                    }} 
                  />
                </Box>
                
                <Button 
                  variant="outlined" 
                  fullWidth 
                  sx={{ 
                    mt: 2, 
                    borderColor: '#b8862b', 
                    color: '#b8862b',
                    '&:hover': { borderColor: '#a0752a', bgcolor: 'rgba(184, 134, 43, 0.04)' }
                  }}
                >
                  Join Community
                </Button>
              </Stack>
            </Paper>
          </Stack>
        </Grid>
      </Grid>
      </Box>
    </Box>
  );
}
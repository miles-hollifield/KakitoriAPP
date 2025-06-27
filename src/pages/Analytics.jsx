import {
  Box,
  Typography,
  Grid,
  Card,
  Paper,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  IconButton
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  School,
  MenuBook,
  AccessTime,
  Speed,
  Quiz,
  CheckCircle,
  MoreVert
} from '@mui/icons-material';

// Mock data
const recentSessions = [
  { id: 1, type: 'Kanji Practice', duration: '25 min', score: 92, items: 15, time: '2 hours ago' },
  { id: 2, type: 'Vocabulary Review', duration: '18 min', score: 88, items: 30, time: '4 hours ago' },
  { id: 3, type: 'JLPT N4 Quiz', duration: '35 min', score: 95, items: 25, time: 'Yesterday' },
  { id: 4, type: 'Grammar Lesson', duration: '40 min', score: 78, items: 12, time: 'Yesterday' },
  { id: 5, type: 'Kanji Writing', duration: '22 min', score: 85, items: 18, time: '2 days ago' }
];

// Analytics page for Kakitori
export default function Analytics() {
  return (
    <Box sx={{ 
      width: '100%',
      minHeight: '100vh',
      bgcolor: '#fafafa',
      p: 0
    }}>
      {/* Section 1: This Week's Performance - Full Width */}
      <Paper sx={{ 
        p: 4, 
        borderRadius: 0,
        boxShadow: 'none',
        width: '100%',
        m: 0,
        mb: 0,
        borderBottom: '1px solid #e0e0e0'
      }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: '#333' }}>
          This Week's Performance
        </Typography>
        
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card sx={{ p: 3, textAlign: 'center', bgcolor: '#fff8e1', border: '1px solid #b8862b' }}>
              <School sx={{ color: '#b8862b', fontSize: 32, mb: 1 }} />
              <Typography variant="h4" sx={{ color: '#b8862b', fontWeight: 700, mb: 1 }}>
                120
              </Typography>
              <Typography variant="body2" sx={{ color: '#666', fontWeight: 500 }}>
                Kanji Practiced
              </Typography>
              <Chip 
                icon={<TrendingUp />} 
                label="+15% vs last week" 
                size="small" 
                sx={{ mt: 1, bgcolor: '#4caf50', color: 'white' }}
              />
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card sx={{ p: 3, textAlign: 'center', bgcolor: '#e8f5e8', border: '1px solid #4caf50' }}>
              <MenuBook sx={{ color: '#4caf50', fontSize: 32, mb: 1 }} />
              <Typography variant="h4" sx={{ color: '#4caf50', fontWeight: 700, mb: 1 }}>
                208
              </Typography>
              <Typography variant="body2" sx={{ color: '#666', fontWeight: 500 }}>
                Vocabulary Items
              </Typography>
              <Chip 
                icon={<TrendingUp />} 
                label="+8% vs last week" 
                size="small" 
                sx={{ mt: 1, bgcolor: '#4caf50', color: 'white' }}
              />
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card sx={{ p: 3, textAlign: 'center', bgcolor: '#e3f2fd', border: '1px solid #2196f3' }}>
              <AccessTime sx={{ color: '#2196f3', fontSize: 32, mb: 1 }} />
              <Typography variant="h4" sx={{ color: '#2196f3', fontWeight: 700, mb: 1 }}>
                7.2h
              </Typography>
              <Typography variant="body2" sx={{ color: '#666', fontWeight: 500 }}>
                Study Time
              </Typography>
              <Chip 
                icon={<TrendingDown />} 
                label="-5% vs last week" 
                size="small" 
                sx={{ mt: 1, bgcolor: '#ff9800', color: 'white' }}
              />
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card sx={{ p: 3, textAlign: 'center', bgcolor: '#fff3e0', border: '1px solid #ff9800' }}>
              <Speed sx={{ color: '#ff9800', fontSize: 32, mb: 1 }} />
              <Typography variant="h4" sx={{ color: '#ff9800', fontWeight: 700, mb: 1 }}>
                87%
              </Typography>
              <Typography variant="body2" sx={{ color: '#666', fontWeight: 500 }}>
                Avg Accuracy
              </Typography>
              <Chip 
                icon={<TrendingUp />} 
                label="+3% vs last week" 
                size="small" 
                sx={{ mt: 1, bgcolor: '#4caf50', color: 'white' }}
              />
            </Card>
          </Grid>
        </Grid>
      </Paper>

      {/* Section 2: Recent Study Sessions - Full Width Table */}
      <Paper sx={{ 
        p: 4, 
        borderRadius: 0,
        boxShadow: 'none',
        width: '100%',
        m: 0
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, color: '#333' }}>
            Recent Study Sessions
          </Typography>
          <IconButton>
            <MoreVert />
          </IconButton>
        </Box>
        
        <TableContainer>
          <Table sx={{ width: '100%' }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, fontSize: '1rem' }}>Activity</TableCell>
                <TableCell align="center" sx={{ fontWeight: 600, fontSize: '1rem' }}>Duration</TableCell>
                <TableCell align="center" sx={{ fontWeight: 600, fontSize: '1rem' }}>Items</TableCell>
                <TableCell align="center" sx={{ fontWeight: 600, fontSize: '1rem' }}>Score</TableCell>
                <TableCell align="center" sx={{ fontWeight: 600, fontSize: '1rem' }}>Time</TableCell>
                <TableCell align="center" sx={{ fontWeight: 600, fontSize: '1rem' }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentSessions.map((session) => (
                <TableRow key={session.id} sx={{ '&:hover': { bgcolor: '#f8f9fa' } }}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ 
                        bgcolor: session.type.includes('Kanji') ? '#b8862b' : 
                                 session.type.includes('Vocab') ? '#4caf50' : '#2196f3',
                        width: 40, 
                        height: 40 
                      }}>
                        {session.type.includes('Kanji') ? <School fontSize="small" /> :
                         session.type.includes('Vocab') ? <MenuBook fontSize="small" /> : 
                         <Quiz fontSize="small" />}
                      </Avatar>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {session.type}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {session.duration}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body1" sx={{ fontWeight: 600, color: '#b8862b' }}>
                      {session.items}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Chip 
                      label={`${session.score}%`}
                      sx={{ 
                        bgcolor: session.score >= 90 ? '#4caf50' : 
                                 session.score >= 80 ? '#ff9800' : '#f44336',
                        color: 'white',
                        fontWeight: 600,
                        fontSize: '0.875rem',
                        minWidth: 60
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2" sx={{ color: '#666' }}>
                      {session.time}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <CheckCircle sx={{ color: '#4caf50', fontSize: 24 }} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
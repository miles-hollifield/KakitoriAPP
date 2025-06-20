import {
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  Chip,
  Box
} from '@mui/material';
import {
  Star,
  StarBorder
} from '@mui/icons-material';
import { jlptColors } from '../../services/mockData';

export default function KanjiCardView({ kanji, onToggleFavorite }) {
  const KanjiCard = ({ kanjiItem }) => (
    <Card 
      sx={{ 
        height: 320,
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
        }
      }}
    >
      <CardContent sx={{ 
        p: 3, 
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start', 
          mb: 2,
          minHeight: 60
        }}>
          <Typography
            variant="h2"
            sx={{
              fontFamily: 'serif',
              color: '#333',
              fontWeight: 400,
              lineHeight: 1,
              fontSize: '3.5rem'
            }}
          >
            {kanjiItem.character}
          </Typography>
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(kanjiItem.id);
            }}
          >
            {kanjiItem.isFavorite ? (
              <Star sx={{ color: '#ff9800' }} />
            ) : (
              <StarBorder sx={{ color: '#ccc' }} />
            )}
          </IconButton>
        </Box>

        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 600, 
            mb: 2, 
            color: '#b8862b',
            minHeight: 32
          }}
        >
          {kanjiItem.meaning}
        </Typography>

        <Box sx={{ mb: 2, minHeight: 50 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Typography variant="body2" sx={{ color: '#666', minWidth: 30, fontSize: '0.875rem' }}>
              On:
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500, flex: 1, fontSize: '0.875rem' }}>
              {kanjiItem.readings.on}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" sx={{ color: '#666', minWidth: 30, fontSize: '0.875rem' }}>
              Kun:
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500, flex: 1, fontSize: '0.875rem' }}>
              {kanjiItem.readings.kun}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap', minHeight: 32 }}>
          <Chip 
            label={kanjiItem.jlptLevel} 
            size="small" 
            sx={{ 
              bgcolor: jlptColors[kanjiItem.jlptLevel],
              color: 'white',
              fontSize: '0.7rem',
              height: 24
            }} 
          />
          <Chip 
            label={`${kanjiItem.strokes} strokes`} 
            size="small" 
            variant="outlined"
            sx={{ fontSize: '0.7rem', height: 24 }}
          />
          <Chip 
            label={kanjiItem.frequency} 
            size="small" 
            color="success"
            variant="outlined"
            sx={{ fontSize: '0.7rem', height: 24 }}
          />
        </Box>

        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="caption" sx={{ color: '#666' }}>
            {kanjiItem.grade} • {kanjiItem.strokes} strokes
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Grid container spacing={3} justifyContent="center">
      {kanji.map((kanjiItem) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={kanjiItem.id}>
          <KanjiCard kanjiItem={kanjiItem} />
        </Grid>
      ))}
    </Grid>
  );
}
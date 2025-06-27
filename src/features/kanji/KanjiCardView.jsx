import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Chip,
  Box
} from '@mui/material';
import {
  Star,
  StarBorder,
  VolumeUp
} from '@mui/icons-material';
import { jlptColors } from '../../services/mockData';

export default function KanjiCardView({ kanji, onToggleFavorite, onKanjiSelect }) {
  return (
    <Box sx={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: 3,
      width: '100%'
    }}>
      {kanji.map((kanjiItem) => (
        <Card 
          key={kanjiItem.id}
          sx={{ 
            height: '280px', // FIXED height - every card exactly the same
            cursor: 'pointer',
            transition: 'all 0.2s ease-in-out',
            display: 'flex',
            flexDirection: 'column',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
            }
          }}
          onClick={() => onKanjiSelect && onKanjiSelect(kanjiItem)}
        >
          <CardContent sx={{ 
            p: 2.5, 
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            {/* Top Section - Kanji Character and Actions */}
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
                      onToggleFavorite(kanjiItem.id);
                    }}
                  >
                    {kanjiItem.isFavorite ? (
                      <Star sx={{ color: '#ff9800', fontSize: 20 }} />
                    ) : (
                      <StarBorder sx={{ color: '#ccc', fontSize: 20 }} />
                    )}
                  </IconButton>
                  <IconButton 
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log(`Playing audio for: ${kanjiItem.character}`);
                    }}
                  >
                    <VolumeUp sx={{ color: '#666', fontSize: 20 }} />
                  </IconButton>
                </Box>
              </Box>

              {/* Meaning - Fixed height container */}
              <Box sx={{ height: 44, mb: 2 }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 600, 
                    color: '#b8862b',
                    fontSize: '1.1rem',
                    lineHeight: 1.3,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {kanjiItem.meaning}
                </Typography>
              </Box>

              {/* Readings - Fixed height container */}
              <Box sx={{ height: 50, mb: 2 }}>
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

            {/* Bottom Section - Chips and Meta Info */}
            <Box>
              {/* Chips - Fixed height container */}
              <Box sx={{ display: 'flex', gap: 0.5, mb: 2, flexWrap: 'wrap', minHeight: 32 }}>
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
      ))}
    </Box>
  );
}
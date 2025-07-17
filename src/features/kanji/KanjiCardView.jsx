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
  VolumeUp,
  CheckCircle
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
            height: '380px', // Further increased height to prevent text cutoff
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
                    {kanjiItem.is_favorite ? (
                      <Star sx={{ color: '#ff9800', fontSize: 20 }} />
                    ) : (
                      <StarBorder sx={{ color: '#ccc', fontSize: 20 }} />
                    )}
                  </IconButton>
                  {kanjiItem.is_learned && (
                    <CheckCircle sx={{ color: '#4caf50', fontSize: 18 }} />
                  )}
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

              {/* Meanings - Fixed height container */}
              <Box sx={{ height: 60, mb: 2 }}>
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
                  {Array.isArray(kanjiItem.meanings) 
                    ? kanjiItem.meanings.join(', ') 
                    : kanjiItem.meanings || 'No meaning available'}
                </Typography>
              </Box>

              {/* Readings - Fixed height container */}
              <Box sx={{ height: 70, mb: 2 }}>
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
                    {kanjiItem.readings?.on?.join(', ') || 'N/A'}
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
                    {kanjiItem.readings?.kun?.join(', ') || 'N/A'}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Bottom Section - Chips and Meta Info */}
            <Box>
              {/* Chips - Fixed height container */}
              <Box sx={{ display: 'flex', gap: 0.5, mb: 3, flexWrap: 'wrap', minHeight: 56 }}>
                {kanjiItem.jlpt_level && (
                  <Chip 
                    label={kanjiItem.jlpt_level} 
                    size="small" 
                    sx={{ 
                      bgcolor: jlptColors[kanjiItem.jlpt_level] || '#666',
                      color: 'white',
                      fontSize: '0.65rem',
                      height: 20,
                      fontWeight: 600
                    }} 
                  />
                )}
                
                {kanjiItem.grade_level && (
                  <Chip 
                    label={kanjiItem.grade_level} 
                    size="small" 
                    sx={{ 
                      bgcolor: gradeColors[kanjiItem.grade_level] || '#999',
                      color: kanjiItem.grade_level?.includes('Grade') ? 'white' : 'black',
                      fontSize: '0.65rem',
                      height: 20,
                      fontWeight: 600
                    }} 
                  />
                )}
                
                <Chip 
                  label={`${kanjiItem.stroke_count} strokes`} 
                  size="small" 
                  variant="outlined"
                  sx={{ 
                    fontSize: '0.65rem', 
                    height: 20,
                    borderColor: '#ccc'
                  }}
                />
                
                {kanjiItem.frequency && (
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
                )}
              </Box>

              {/* Unicode and additional info */}
              <Box sx={{ minHeight: 32 }}>
                <Typography variant="caption" sx={{ color: '#999', fontSize: '0.7rem', lineHeight: 1.2 }}>
                  {kanjiItem.unicode && `Unicode: ${kanjiItem.unicode}`}
                  {kanjiItem.radical && ` • Radical: ${kanjiItem.radical}`}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
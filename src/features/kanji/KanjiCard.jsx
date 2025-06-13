import { Card, CardContent, Typography, Box, Chip, IconButton } from '@mui/material';
import { Star, StarBorder, CheckCircle } from '@mui/icons-material';

// KanjiCard reusable component
export default function KanjiCard({ kanji, selected, onClick, onToggleFavorite }) {
  return (
    <Card
      sx={{
        cursor: 'pointer',
        transition: 'all 0.2s',
        border: selected ? '2px solid #b8862b' : '1px solid #e0e0e0',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 25px rgba(0,0,0,0.12)'
        }
      }}
      onClick={onClick}
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
              onClick={e => {
                e.stopPropagation();
                onToggleFavorite && onToggleFavorite(kanji.id);
              }}
            >
              {kanji.isFavorite ? (
                <Star sx={{ color: '#ff9800', fontSize: 18 }} />
              ) : (
                <StarBorder sx={{ color: '#ccc', fontSize: 18 }} />
              )}
            </IconButton>
            {kanji.isLearned && <CheckCircle sx={{ color: '#4caf50', fontSize: 18 }} />}
          </Box>
        </Box>
        <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
          {kanji.meaning}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
          <Chip label={kanji.jlptLevel} size="small" sx={{ bgcolor: '#4caf50', color: 'white', fontSize: '0.7rem' }} />
          <Chip label={`${kanji.strokes} strokes`} size="small" variant="outlined" sx={{ fontSize: '0.7rem' }} />
          <Chip label={kanji.frequency} size="small" color="success" variant="outlined" sx={{ fontSize: '0.7rem' }} />
        </Box>
        <Typography variant="caption" sx={{ color: '#666', display: 'block', mb: 0.5 }}>
          On: {kanji.readings.on}
        </Typography>
        <Typography variant="caption" sx={{ color: '#666', display: 'block' }}>
          Kun: {kanji.readings.kun}
        </Typography>
      </CardContent>
    </Card>
  );
}

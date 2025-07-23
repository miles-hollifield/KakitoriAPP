import {
  Box,
  Typography,
  IconButton,
  Paper,
  List,
  ListItem,
  Divider,
  Chip,
  Stack
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

export default function KanjiListView({ kanji, onToggleFavorite, onPlayAudio, onKanjiSelect }) {
  const KanjiListItem = ({ kanjiItem }) => (
    <ListItem 
      sx={{ 
        py: 3,
        px: 0,
        cursor: 'pointer',
        '&:hover': { 
          bgcolor: 'rgba(184, 134, 43, 0.04)' 
        }
      }}
      onClick={() => onKanjiSelect && onKanjiSelect(kanjiItem)}
    >
      <Box sx={{ display: 'flex', width: '100%', alignItems: 'flex-start', gap: 3 }}>
        {/* Large Kanji Character */}
        <Typography
          variant="h1"
          sx={{
            fontFamily: 'serif',
            color: '#333',
            fontWeight: 400,
            fontSize: '4rem',
            lineHeight: 1,
            minWidth: '80px',
            textAlign: 'center'
          }}
        >
          {kanjiItem.character}
        </Typography>

        {/* Main Content */}
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          {/* Meta info line */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
            <Typography variant="body2" sx={{ color: '#666' }}>
              {kanjiItem.stroke_count} strokes
            </Typography>
            {kanjiItem.jlpt_level && (
              <Chip 
                label={kanjiItem.jlpt_level} 
                size="small" 
                sx={{ 
                  bgcolor: jlptColors[kanjiItem.jlpt_level],
                  color: 'white',
                  fontSize: '0.7rem',
                  height: 18
                }} 
              />
            )}
            {kanjiItem.grade_level && (
              <Typography variant="body2" sx={{ color: '#666' }}>
                {kanjiItem.grade_level}
              </Typography>
            )}
            {kanjiItem.frequency && (
              <Chip 
                label={kanjiItem.frequency} 
                size="small" 
                color="success"
                variant="outlined"
                sx={{ fontSize: '0.7rem', height: 18 }}
              />
            )}
            {kanjiItem.is_learned && (
              <CheckCircle sx={{ color: '#4caf50', fontSize: 18 }} />
            )}
          </Box>

          {/* Main meanings */}
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 500, 
              mb: 2, 
              color: '#333',
              lineHeight: 1.3
            }}
          >
            {Array.isArray(kanjiItem.meanings) 
              ? kanjiItem.meanings.join(', ') 
              : kanjiItem.meanings || 'No meaning available'}
          </Typography>

          {/* Readings */}
          <Box sx={{ mb: 2 }}>
            <Box sx={{ mb: 1 }}>
              <Typography component="span" variant="body2" sx={{ color: '#666', fontWeight: 600, mr: 1 }}>
                On-yomi:
              </Typography>
              <Typography component="span" variant="body2" sx={{ color: '#333' }}>
                {kanjiItem.readings?.on?.join(', ') || 'N/A'}
              </Typography>
            </Box>
            <Box>
              <Typography component="span" variant="body2" sx={{ color: '#666', fontWeight: 600, mr: 1 }}>
                Kun-yomi:
              </Typography>
              <Typography component="span" variant="body2" sx={{ color: '#333' }}>
                {kanjiItem.readings?.kun?.join(', ') || 'N/A'}
              </Typography>
            </Box>
          </Box>

          {/* Additional info */}
          <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap' }}>
            {kanjiItem.radical && (
              <Typography variant="caption" sx={{ color: '#999' }}>
                Radical: {kanjiItem.radical}
              </Typography>
            )}
            {kanjiItem.unicode && (
              <Typography variant="caption" sx={{ color: '#999' }}>
                Unicode: {kanjiItem.unicode}
              </Typography>
            )}
            {kanjiItem.examples && kanjiItem.examples.length > 0 && (
              <Typography variant="caption" sx={{ color: '#999' }}>
                {kanjiItem.examples.length} example word{kanjiItem.examples.length !== 1 ? 's' : ''}
              </Typography>
            )}
          </Stack>
        </Box>

        {/* Actions */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(kanjiItem.id);
            }}
          >
            {kanjiItem.is_favorite ? (
              <Star sx={{ color: '#ff9800' }} />
            ) : (
              <StarBorder sx={{ color: '#ccc' }} />
            )}
          </IconButton>
          <IconButton 
            size="small" 
            onClick={(e) => {
              e.stopPropagation();
              onPlayAudio && onPlayAudio(kanjiItem.character);
            }}
          >
            <VolumeUp sx={{ color: '#666' }} />
          </IconButton>
        </Box>
      </Box>
    </ListItem>
  );

  return (
    <Paper sx={{ borderRadius: 2 }}>
      <List sx={{ p: 2 }}>
        {kanji.map((kanjiItem, index) => (
          <Box key={kanjiItem.id}>
            <KanjiListItem kanjiItem={kanjiItem} />
            {index < kanji.length - 1 && (
              <Divider sx={{ my: 1 }} />
            )}
          </Box>
        ))}
      </List>
    </Paper>
  );
}
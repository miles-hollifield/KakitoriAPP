import {
  Box,
  Typography,
  IconButton,
  Paper,
  List,
  ListItem,
  Divider
} from '@mui/material';
import {
  Star,
  StarBorder,
  VolumeUp
} from '@mui/icons-material';

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
          <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
            {kanjiItem.strokes} strokes, JLPT {kanjiItem.jlptLevel}, Jōyō kanji, taught in {kanjiItem.grade}.
          </Typography>

          {/* Main meaning */}
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 500, 
              mb: 2, 
              color: '#333',
              lineHeight: 1.3
            }}
          >
            {kanjiItem.meaning}
          </Typography>

          {/* Readings */}
          <Box sx={{ mb: 2 }}>
            <Box sx={{ mb: 1 }}>
              <Typography component="span" variant="body2" sx={{ color: '#666', fontWeight: 600, mr: 1 }}>
                Kun:
              </Typography>
              <Typography component="span" variant="body2" sx={{ color: '#333' }}>
                {kanjiItem.readings.kun}
              </Typography>
            </Box>
            <Box>
              <Typography component="span" variant="body2" sx={{ color: '#666', fontWeight: 600, mr: 1 }}>
                On:
              </Typography>
              <Typography component="span" variant="body2" sx={{ color: '#333' }}>
                {kanjiItem.readings.on}
              </Typography>
            </Box>
          </Box>
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
            {kanjiItem.isFavorite ? (
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
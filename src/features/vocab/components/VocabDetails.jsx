import { Box, Chip, Divider, Stack, Typography, IconButton, Tooltip } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

export default function VocabDetails({ item }) {
  if (!item) {
    return (
      <Box sx={{ py: 4 }}>
        <Typography variant="body2" color="text.secondary">Select a word to see details.</Typography>
      </Box>
    );
  }

  const playAudio = () => {
    if (item.audioUrl) {
      const audio = new Audio(item.audioUrl);
      audio.play().catch(() => {});
    }
  };

  return (
    <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
        <Box>
          <Typography variant="h4" fontWeight={800}>
            {item.kanji || item.kana?.[0]}
          </Typography>
          {item.kana && (
            <Typography variant="h6" color="text.secondary">{item.kana.join(' / ')}</Typography>
          )}
        </Box>
        <Tooltip title={item.audioUrl ? 'Play audio' : 'No audio available'}>
          <span>
            <IconButton onClick={playAudio} disabled={!item.audioUrl}>
              <VolumeUpIcon />
            </IconButton>
          </span>
        </Tooltip>
      </Stack>

      <Typography variant="body1" sx={{ mt: 1.5 }}>
        {Array.isArray(item.meanings) ? item.meanings.join('; ') : item.meanings}
      </Typography>

      <Stack direction="row" spacing={1} sx={{ mt: 1.5, flexWrap: 'wrap' }}>
        {item.jlpt && <Chip label={`JLPT ${item.jlpt}`} size="small" />}
        {item.pos?.map((p) => <Chip key={p} label={p} size="small" variant="outlined" />)}
      </Stack>

      {item.examples?.length ? (
        <>
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle1" fontWeight={700}>Examples</Typography>
          <Stack spacing={1.5} sx={{ mt: 1 }}>
            {item.examples.map((ex, i) => (
              <Box key={i}>
                <Typography variant="body1">{ex.jp}</Typography>
                <Typography variant="body2" color="text.secondary">{ex.en}</Typography>
              </Box>
            ))}
          </Stack>
        </>
      ) : null}
    </Box>
  );
}

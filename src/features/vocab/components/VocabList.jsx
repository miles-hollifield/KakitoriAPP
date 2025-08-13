import { List, ListItemButton, ListItemText, ListItemAvatar, Avatar, Skeleton, Typography, Box } from '@mui/material';

export default function VocabList({ items, loading, onSelect, selectedId, query }) {
  if (loading) {
    return (
      <Box>
        {Array.from({ length: 8 }).map((_, i) => (
          <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: 1 }}>
            <Skeleton variant="circular" width={40} height={40} />
            <Box sx={{ flex: 1 }}>
              <Skeleton width="60%" />
              <Skeleton width="40%" />
            </Box>
          </Box>
        ))}
      </Box>
    );
  }

  if (!items?.length) {
    return (
      <Box sx={{ py: 4 }}>
        <Typography variant="body2" color="text.secondary">
          {query ? 'No matches found.' : 'Try searching for a word (e.g., 食べる, たべる, or "eat").'}
        </Typography>
      </Box>
    );
  }

  return (
    <List dense disablePadding>
      {items.map((item) => (
        <ListItemButton
          key={item.id}
          selected={selectedId === item.id}
          onClick={() => onSelect?.(item)}
          sx={{ borderRadius: 1, mb: 0.5 }}
        >
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.dark' }}>
              {item.kana?.[0]?.charAt(0) || item.kanji?.[0] || '?'}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {item.kanji || item.kana?.[0]}
                {item.kana && item.kanji ? (
                  <Typography component="span" variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    {item.kana?.[0]}
                  </Typography>
                ) : null}
              </Typography>
            }
            secondary={
              <Typography variant="body2" color="text.secondary">
                {Array.isArray(item.meanings) ? item.meanings.join(', ') : item.meanings}
              </Typography>
            }
          />
        </ListItemButton>
      ))}
    </List>
  );
}

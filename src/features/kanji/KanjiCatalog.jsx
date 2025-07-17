import {
  Box,
  Typography,
  Pagination
} from '@mui/material';
import KanjiCardView from './KanjiCardView';
import KanjiListView from './KanjiListView';

export default function KanjiCatalog({ 
  kanji, 
  totalKanji,
  totalPages,
  currentPage, 
  searchTerm,
  jlptFilter,
  onToggleFavorite,
  viewMode = 'cards',
  onKanjiSelect,
  onPlayAudio
}) {
  const getResultsText = () => {
    if (searchTerm || jlptFilter) {
      return `Found ${totalKanji} kanji`;
    }
    return `Showing ${totalKanji} kanji`;
  };

  return (
    <Box sx={{ maxWidth: '100%', mx: 'auto' }}>
      {/* Results Header */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 3 
      }}>
        <Typography variant="h6" sx={{ color: '#333', fontWeight: 600 }}>
          {getResultsText()}
        </Typography>
        
        {totalPages > 1 && (
          <Typography variant="body2" sx={{ color: '#666' }}>
            Page {currentPage} of {totalPages}
          </Typography>
        )}
      </Box>

      {/* Kanji Display - NO MORE SLICING! */}
      {kanji.length > 0 ? (
        <>
          {viewMode === 'cards' ? (
            <KanjiCardView 
              kanji={kanji}
              onToggleFavorite={onToggleFavorite}
              onKanjiSelect={onKanjiSelect}
            />
          ) : (
            <KanjiListView
              kanji={kanji}
              onToggleFavorite={onToggleFavorite}
              onKanjiSelect={onKanjiSelect}
              onPlayAudio={onPlayAudio}
            />
          )}


        </>
      ) : (
        /* No results */
        <Box sx={{ 
          textAlign: 'center', 
          py: 8 
        }}>
          <Typography variant="h6" sx={{ color: '#666', mb: 2 }}>
            No kanji found
          </Typography>
          <Typography variant="body2" sx={{ color: '#999' }}>
            Try adjusting your search terms or filters
          </Typography>
        </Box>
      )}
    </Box>
  );
}
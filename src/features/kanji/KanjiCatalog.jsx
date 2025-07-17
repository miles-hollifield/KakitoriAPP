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
  itemsPerPage, 
  onPageChange,
  searchTerm,
  jlptFilter,
  onToggleFavorite,
  viewMode = 'cards',
  onKanjiSelect,
  onPlayAudio
}) {
  const getResultsText = () => {
    if (kanji.length === 0) return 'No kanji found';
    
    const startIndex = (currentPage - 1) * itemsPerPage + 1;
    const endIndex = Math.min(startIndex + kanji.length - 1, totalKanji);
    
    return `Showing ${startIndex}-${endIndex} of ${totalKanji} kanji`;
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

      {/* Kanji Display */}
      {kanji.length > 0 ? (
        <>
          {/* Top Pagination */}
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <Pagination 
                count={totalPages}
                page={currentPage}
                onChange={(event, page) => onPageChange(page)}
                color="primary"
                size="large"
                sx={{
                  '& .MuiPaginationItem-root': {
                    '&.Mui-selected': {
                      bgcolor: '#b8862b',
                      '&:hover': {
                        bgcolor: '#a0752a',
                      }
                    }
                  }
                }}
              />
            </Box>
          )}

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

          {/* Bottom Pagination */}
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination 
                count={totalPages}
                page={currentPage}
                onChange={(event, page) => onPageChange(page)}
                color="primary"
                size="large"
                sx={{
                  '& .MuiPaginationItem-root': {
                    '&.Mui-selected': {
                      bgcolor: '#b8862b',
                      '&:hover': {
                        bgcolor: '#a0752a',
                      }
                    }
                  }
                }}
              />
            </Box>
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
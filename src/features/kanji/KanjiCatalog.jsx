// components/KanjiCatalog.jsx
import {
  Box,
  Typography,
  Pagination
} from '@mui/material';
import KanjiCardView from '../kanji/KanjiCardView';

export default function KanjiCatalog({ 
  kanji, 
  currentPage, 
  itemsPerPage, 
  onPageChange,
  searchTerm,
  jlptFilter,
  onToggleFavorite
}) {
  const totalPages = Math.ceil(kanji.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentKanji = kanji.slice(startIndex, startIndex + itemsPerPage);

  const getResultsText = () => {
    if (searchTerm || jlptFilter) {
      return `Found ${kanji.length} kanji`;
    }
    return `Showing ${kanji.length} kanji`;
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
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

      {/* Kanji Cards using existing component */}
      {currentKanji.length > 0 ? (
        <>
          <KanjiCardView 
            kanji={currentKanji}
            onToggleFavorite={onToggleFavorite}
          />

          {/* Pagination */}
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
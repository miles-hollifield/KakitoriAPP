import { useEffect, useMemo, useState } from 'react';
import { Box, Container, Typography, Divider, Alert, Grid } from '@mui/material';
import VocabSearchBar from '../features/vocab/components/VocabSearchBar.jsx';
import VocabList from '../features/vocab/components/VocabList.jsx';
import VocabDetails from '../features/vocab/components/VocabDetails.jsx';
import { searchVocab } from '../features/vocab/services/vocabService.js';

// MVP Vocab page: search, filter, results list, details panel
export default function Vocab() {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({ jlpt: 'All', pos: [] });
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Debounce query to avoid spamming search
  const debouncedQuery = useDebounce(query, 250);

  useEffect(() => {
    let active = true;
    async function run() {
      setLoading(true);
      setError(null);
      try {
        const data = await searchVocab({
          query: debouncedQuery,
          jlpt: filters.jlpt,
          pos: filters.pos,
          limit: 50,
        });
        if (!active) return;
        setResults(data);
        // Auto-select first item if none selected
        setSelected((prev) => prev ?? data[0] ?? null);
      } catch (e) {
        if (!active) return;
        setError(e.message || 'Failed to load vocabulary');
      } finally {
        if (active) setLoading(false);
      }
    }
    run();
    return () => {
      active = false;
    };
  }, [debouncedQuery, filters.jlpt, filters.pos]);

  const handleSelect = (item) => setSelected(item);

  const resultCount = useMemo(() => results?.length ?? 0, [results]);

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, md: 3 } }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Vocabulary
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Look up Japanese words by kanji, kana, or English meaning. Filter by JLPT level and part of speech.
        </Typography>
      </Box>

      <VocabSearchBar
        value={query}
        onChange={setQuery}
        filters={filters}
        onFiltersChange={setFilters}
        disabled={loading}
      />

      <Box sx={{ mt: 2, mb: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="subtitle2" color="text.secondary">
          {loading ? 'Searching…' : `${resultCount} result${resultCount === 1 ? '' : 's'}`}
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={2}>
        <Grid item xs={12} md={5} lg={4}>
          <VocabList
            items={results}
            loading={loading}
            onSelect={handleSelect}
            selectedId={selected?.id}
            query={debouncedQuery}
          />
        </Grid>
        <Grid item xs={12} md={7} lg={8}>
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <VocabDetails item={selected} />
          </Box>
          <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            {selected && (
              <>
                <Divider sx={{ my: 2 }} />
                <VocabDetails item={selected} />
              </>
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

// Small local debounce hook to avoid extra files
function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}
import React from 'react';
import { useParams } from 'react-router-dom';
import KanjiInformationPanel from '../features/kanji/KanjiInformationPanel';
import { Box, Container, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

// TODO: Replace with real kanji data fetching
const mockKanjiData = [
  // Example kanji objects
  { id: 1, character: '日', meaning: 'sun, day', readings: { on: 'ニチ, ジツ', kun: 'ひ, -び, -か' } },
  { id: 2, character: '月', meaning: 'moon, month', readings: { on: 'ゲツ, ガツ', kun: 'つき' } },
];

export default function KanjiDetail() {
  const { kanjiId } = useParams();
  const navigate = useNavigate();
  // Replace with real data fetching logic
  const kanji = mockKanjiData.find(k => String(k.id) === kanjiId);

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        Back
      </Button>
      {kanji ? (
        <KanjiInformationPanel kanji={kanji} />
      ) : (
        <Box>Kanji not found.</Box>
      )}
    </Container>
  );
}

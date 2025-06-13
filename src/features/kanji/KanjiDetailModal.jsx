import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import KanjiInformationPanel from './KanjiInformationPanel';
import { useNavigate } from 'react-router-dom';

export default function KanjiDetailModal({ open, onClose, kanji }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  if (!kanji) return null;

  const handleViewFullPage = () => {
    navigate(`/kanji/${kanji.id}`);
    onClose && onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullScreen={fullScreen} maxWidth="sm" fullWidth>
      <DialogTitle>
        {kanji.character}
        <Button onClick={handleViewFullPage} sx={{ float: 'right' }} variant="outlined" size="small">
          View Full Page
        </Button>
      </DialogTitle>
      <DialogContent>
        <KanjiInformationPanel kanji={kanji} hideActions />
      </DialogContent>
    </Dialog>
  );
}

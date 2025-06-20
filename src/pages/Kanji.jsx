import { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { sampleKanji } from '../services/mockData';
import KanjiCatalog from '../features/kanji/KanjiCatalog';

export default function Kanji() {
 const [searchTerm, setSearchTerm] = useState('');
 const [jlptFilter, setJlptFilter] = useState('');
 const [currentPage, setCurrentPage] = useState(1);
 const [kanjiList, setKanjiList] = useState(sampleKanji);
 const itemsPerPage = 12; // Show 12 kanji per page

 const toggleFavorite = (kanjiId) => {
   setKanjiList(prev => prev.map(kanji => 
     kanji.id === kanjiId 
       ? { ...kanji, isFavorite: !kanji.isFavorite }
       : kanji
   ));
 };

 // Filter kanji based on search and JLPT level
 const filteredKanji = useMemo(() => {
   return kanjiList.filter(kanji => {
     const matchesSearch = searchTerm === '' || 
       kanji.character.includes(searchTerm) ||
       kanji.meaning.toLowerCase().includes(searchTerm.toLowerCase()) ||
       kanji.readings.on.includes(searchTerm) ||
       kanji.readings.kun.includes(searchTerm);
     
     const matchesJLPT = jlptFilter === '' || kanji.jlptLevel === jlptFilter;
     
     return matchesSearch && matchesJLPT;
   });
 }, [searchTerm, jlptFilter, kanjiList]);

 // Reset to page 1 when search changes
 useMemo(() => {
   setCurrentPage(1);
 }, [searchTerm, jlptFilter]);

 return (
   <Box sx={{ 
     bgcolor: '#fafafa', 
     minHeight: '100vh',
     py: 4
   }}>
     <Container maxWidth="xl">
       {/* Header */}
       <Box sx={{ 
         textAlign: 'center', 
         mb: 6,
         maxWidth: 600,
         mx: 'auto'
       }}>
         <Typography 
           variant="h4" 
           sx={{ 
             fontWeight: 600, 
             mb: 2, 
             color: '#333'
           }}
         >
           Kanji Search
         </Typography>
         <Typography 
           variant="body1" 
           sx={{ 
             color: '#666',
             lineHeight: 1.6
           }}
         >
           Search and explore Japanese kanji characters
         </Typography>
       </Box>

       {/* Search Controls */}
       <Paper 
         sx={{ 
           p: 4,
           mb: 4, 
           borderRadius: 2,
           maxWidth: 1000,
           mx: 'auto'
         }}
       >
         <Box sx={{ display: 'flex', gap: 3, width: '100%' }}>
           {/* Search Input */}
           <TextField
             placeholder="Search by character, meaning, or reading..."
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
             InputProps={{
               startAdornment: (
                 <InputAdornment position="start">
                   <Search sx={{ color: '#666' }} />
                 </InputAdornment>
               ),
             }}
             sx={{
               width: 700,
               '& .MuiOutlinedInput-root': {
                 height: 56,
                 '&:hover fieldset': {
                   borderColor: '#b8862b',
                 },
                 '&.Mui-focused fieldset': {
                   borderColor: '#b8862b',
                 },
               },
             }}
           />
           
           {/* JLPT Filter */}
           <FormControl sx={{ width: 200 }}>
             <InputLabel>JLPT Level</InputLabel>
             <Select
               value={jlptFilter}
               label="JLPT Level"
               onChange={(e) => setJlptFilter(e.target.value)}
               sx={{
                 height: 56,
                 '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                   borderColor: '#b8862b',
                 },
               }}
             >
               <MenuItem value="">All Levels</MenuItem>
               <MenuItem value="N5">N5</MenuItem>
               <MenuItem value="N4">N4</MenuItem>
               <MenuItem value="N3">N3</MenuItem>
               <MenuItem value="N2">N2</MenuItem>
               <MenuItem value="N1">N1</MenuItem>
             </Select>
           </FormControl>
         </Box>
       </Paper>

       {/* Kanji Catalog */}
       <KanjiCatalog 
         kanji={filteredKanji}
         currentPage={currentPage}
         itemsPerPage={itemsPerPage}
         onPageChange={setCurrentPage}
         onToggleFavorite={toggleFavorite}
         searchTerm={searchTerm}
         jlptFilter={jlptFilter}
       />
     </Container>
   </Box>
 );
}
import { List, ListItem, ListItemIcon, ListItemText, Box } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const navItems = [
  'Kanji',
  'Vocab',
  'Kana',
  'Lessons',
  'JLPT Practice',
  'Review',
  'AI Tutor',
  'Dialog',
  'Community',
];

// Sidebar component for Kakitori
export default function Sidebar() {
  return (
    <Box
      component="nav"
      sx={{
        width: 180,
        bgcolor: '#fff',
        height: '100vh',
        borderRight: '1px solid #eee',
        pt: 2,
        boxShadow: '1px 0 4px #0001',
        position: 'fixed',
        top: 40,
        left: 0,
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <List>
        {navItems.map((text) => (
          <ListItem button key={text} sx={{ py: 0.5 }}>
            <ListItemIcon sx={{ minWidth: 32 }}>
              <StarBorderIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={text}
              primaryTypographyProps={{ fontSize: 13 }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

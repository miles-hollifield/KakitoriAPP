import { Avatar } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// UserAvatar reusable component
export default function UserAvatar() {
  return (
    <Avatar sx={{ bgcolor: '#fff', color: '#222', width: 28, height: 28 }}>
      <AccountCircleIcon />
    </Avatar>
  );
}

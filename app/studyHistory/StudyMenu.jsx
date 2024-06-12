import * as React from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import Cloud from '@mui/icons-material/Cloud';
import ArticleIcon from '@mui/icons-material/Article';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import BorderColorIcon from '@mui/icons-material/BorderColor';
export default function StudyMenu() {
  return (
    <Paper sx={{ width: 320, maxWidth: '100%' }}>
      <MenuList>
        <MenuItem>
          <ListItemIcon>
            <AssignmentIndIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>참여 프로젝트</ListItemText>
          <Typography color="text.secondary">😎</Typography>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <ArticleIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>블로그 변경 이력</ListItemText>
          <Typography color="text.secondary">😄</Typography>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <BorderColorIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>공부 일지</ListItemText>
          <Typography color="text.secondary">🙂</Typography>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}

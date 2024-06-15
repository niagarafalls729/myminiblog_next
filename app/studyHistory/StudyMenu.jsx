'use client';

import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import ArticleIcon from '@mui/icons-material/Article';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import BorderColorIcon from '@mui/icons-material/BorderColor';

import { useEffect, useState } from 'react';

export default function StudyMenu(props) {
  const pageClick = e => {
    props.onPageChange(e);
  };

  return (
    <Paper sx={{ width: 320, maxWidth: '100%' }}>
      <MenuList>
        <MenuItem
          onClick={() => {
            pageClick(0);
          }}
        >
          <ListItemIcon>
            <AssignmentIndIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>참여 프로젝트</ListItemText>
          <Typography color="text.secondary">😎</Typography>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            pageClick(1);
          }}
        >
          <ListItemIcon>
            <ArticleIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>블로그 변경 이력</ListItemText>
          <Typography color="text.secondary">😄</Typography>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            pageClick(2);
          }}
        >
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

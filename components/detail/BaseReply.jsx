import { useState, useEffect, useRef } from 'react';

import React from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import styles from './detail.module.css';

import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useAppSelector } from '@/redux/hooks';
import Link from 'next/link';
import dayjs from 'dayjs';

function BaseReply(props) {
  const { arrFrom, onReplyC, useUrl } = props;
  const [openReply, setOpenReply] = useState(true);

  const isContents = useRef('');
  const userStatus = useAppSelector(state => state.user.status);
  const userId = useAppSelector(state => state.user.id);

  const handleClick = () => {
    setOpenReply(!openReply);
  };

  const save_reply = async () => {
    const createForm = {
      contents: isContents.current.value,
      id: userStatus ? userId : '익명' + dayjs().format('mmss'),
      member_create: userStatus ? 'Y' : 'N',
      guestbook_fk: props.index,
    };
    isContents.current.value = '';
    onReplyC(createForm);
  };

  return (
    <Grid container>
      <Grid xs={0} lg={2}></Grid>
      <Grid xs={12} lg={8} className={styles['create_wrap']}>
        <List sx={{ width: '100%' }}>
          <ListItemButton onClick={handleClick} style={{ background: 'gray' }}>
            <ListItemText primary={`댓글 ${arrFrom.length}`} />

            {openReply ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openReply} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {arrFrom.map((e, index) => (
                <ListItemButton key={index} aria-readonly>
                  <Grid container sx={{ width: '100%' }}>
                    <Grid xs={12} lg={12}>
                      {e.contents}
                    </Grid>
                    <Grid xsOffset="auto">
                      {e.id}/ {e.creation_timestamp}
                    </Grid>
                  </Grid>
                </ListItemButton>
              ))}
            </List>
          </Collapse>
          <Grid container rowSpacing={4} sx={{ width: '100%' }}>
            <Grid xs={12} lg={12}>
              <TextField
                variant="outlined"
                inputProps={{ ref: isContents }}
                className="!w-full"
                multiline
                rows={4}
                placeholder="비회원도 입력 가능! 단 댓글 삭제 및 수정 불가능합니다."
              />
              <Button fullWidth variant="contained" onClick={save_reply}>
                저장
              </Button>
            </Grid>
            <Grid xs={12} lg={12}>
              <Link href={`/${useUrl}`}>
                <Button fullWidth variant="contained" color="error">
                  목록으로!
                </Button>
              </Link>
            </Grid>
          </Grid>
        </List>
      </Grid>
      <Grid xs={0} lg={2}></Grid>
    </Grid>
  );
}
export default React.memo(BaseReply);

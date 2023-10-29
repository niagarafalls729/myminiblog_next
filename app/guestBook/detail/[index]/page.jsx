'use client';
import { useState, useEffect, useRef } from 'react';
import { axiosGet } from '@/api/baseGet';
import { useParams } from 'next/navigation';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import styles from './detail.module.css';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
 
import Link from 'next/link';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


export default function detail() {
  const params = useParams();

  console.log('params', params.index);

  const [form, setForm] = useState({});
  useEffect(() => {
    myAPI();
  }, []);

  const myAPI = async () => {
    try {
      const res = await axiosGet('guestBook', params);
      // API 호출에서 데이터를 가져온 후 rows 배열에 추가
      setForm(res[0]);
      console.log('res',res);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const deleteApi = () =>{
      console.log("DDDKDKDKDK")
  }
  return (
    <>
      <div className="p-1" style={{ zIndex: 10, position: 'sticky' }}>
        <Grid container>
          <Grid xs={0} lg={2}></Grid>
          <Grid xs={12} lg={8} className={styles['create_wrap']}>
            <Grid container>
              <Grid xs={11} lg={11}>
                제목 : {form.title}
              </Grid>
              <Grid xs={1} lg={1} xsOffset="auto">
            <Link  href={`/components/create/guestBook/${params.index}`}>
              <EditIcon  />
            </Link>
              <DeleteIcon onClick={deleteApi}/>
              </Grid>
            </Grid>
            <Grid container>
              <Grid xs={4} lg={4}>
                작성자 : {form.id}
              </Grid>
              <Grid xs={4} lg={4} xsOffset="auto">
                작성일 : {form.creation_timestamp}
              </Grid>
            </Grid>
            <hr />

            <hr />
            <Grid xs={12} lg={12}>
              <div dangerouslySetInnerHTML={{ __html: form.contents }} />
            </Grid>
            <Grid xs={12} lg={12}>
              <Reply index={params.index}></Reply>
            </Grid>
          </Grid>
          <Grid xs={0} lg={2}></Grid>
        </Grid>
      </div>
    </>
  );
}

const Reply = props => {
  console.log('props.params', props.index);
  const isTitle = useRef('');
  const [openReply, setOpenReply] = useState(false);
  const [mounted, setMounted] = useState(false);
  const handleClick = () => {
    console.log('handleClick');
    setOpenReply(!openReply);
  };

  const [form, setForm] = useState({});
  useEffect(() => {
    console.log('useEffect');
    setMounted(true);
    myAPI();
  }, [props.index]);

  const myAPI = async () => {
    try {
      const res = await axiosGet('guestBook_reply', { index: props.params });
      // API 호출에서 데이터를 가져온 후 rows 배열에 추가
      setForm(res[0]);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };
  const fn_save = () => {};
  return !mounted ? (
    'loading....'
  ) : (
    <List sx={{ width: '100%' }}>
      <ListItemButton onClick={handleClick} style={{ background: 'gray' }}>
        <ListItemText primary="댓글 갯수추가" />
        {openReply ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openReply} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton disabled>
            <Grid container sx={{ width: '100%' }}>
              <Grid xs={12} lg={12}>
                내용요용ㅇ용 
              </Grid>
              <Grid xsOffset="auto">idasdfsadf/2023-10-30</Grid>
            </Grid>
          </ListItemButton>
          {/* <ListItem>
            <Grid container rowSpacing={4} sx={{ width: '100%' }}>
              <Grid xs={12} lg={12}>
                <TextField
                  variant="outlined"
                  inputProps={{ ref: isTitle }}
                  className="!w-full"
                  multiline
                  rows={4}
                  placeholder="비회원도 입력가눙!"
                />
              </Grid>
              <Grid xs={12} lg={12}>
                <Button fullWidth variant="contained" onClick={fn_save}>
                  저장
                </Button>
              </Grid>
            </Grid>
          </ListItem> */}
        </List>
      </Collapse>
      <Grid container rowSpacing={4} sx={{ width: '100%' }}>
              <Grid xs={12} lg={12}>
                <TextField
                  variant="outlined"
                  inputProps={{ ref: isTitle }}
                  className="!w-full"
                  multiline
                  rows={4}
                  placeholder="비회원도 입력가눙!"
                />
              </Grid>
              <Grid xs={12} lg={12}>
                <Button fullWidth variant="contained" onClick={fn_save}>
                  저장
                </Button>
              </Grid>
            </Grid>
    </List>
  );
};

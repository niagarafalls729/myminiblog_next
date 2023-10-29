'use client';
import { useState, useEffect, useRef } from 'react';
import { axiosGet, savePost } from '@/api/baseGet';
import { usePathname, useParams } from 'next/navigation';

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
import { useAppSelector } from '@/redux/hooks';
import Link from 'next/link';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';
export default function detail() {
  const params = useParams();
  const userStatus = useAppSelector(state => state.user.status);
  const userId = useAppSelector(state => state.user.id);
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
      console.log('res', res);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };
  console.log('userId', userId, form.id, userStatus);
  console.log('userId', userId == form.id);

  const showButton = userStatus
    ? //로그인한 경우
      //로그인 id === 글쓴이
      userId === form.id
      ? true
      : false
    : //비회원
      form.member_create === 'N';

  const deleteApi = () => {
    console.log('DDDKDKDKDK');
  };
  return (
    <>
      <div className="p-1" style={{ zIndex: 10, position: 'sticky' }}>
        <Grid container>
          <Grid xs={0} lg={2}></Grid>
          <Grid xs={12} lg={8} className={styles['create_wrap']}>
            <Grid container sx={{ bgcolor: 'grey.500' }}>
              <Grid xs={11} lg={11}>
                제목 : {form.title}
              </Grid>
              {showButton && (
                <Grid xs={1} lg={1} xsOffset="auto">
                  <Link href={`/components/create/guestBook/${params.index}`}>
                    <EditIcon />
                  </Link>
                  <DeleteIcon onClick={deleteApi} />
                </Grid>
              )}
            </Grid>
            <Grid container sx={{ bgcolor: 'grey.500' }}>
              <Grid xs={4} lg={4}>
                작성자 : {form.id}
              </Grid>
              <Grid xs={4} lg={4} xsOffset="auto">
                작성일 : {form.creation_timestamp}
              </Grid>
            </Grid>
            <hr />
            <hr />
            <Grid xs={12} lg={12} minHeight={400}>
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
  const router = usePathname();
  const userStatus = useAppSelector(state => state.user.status);
  const userId = useAppSelector(state => state.user.id);

  const [openReply, setOpenReply] = useState(false);
  const [form, setForm] = useState([]);
  const isContents = useRef('');

  const handleClick = () => {
    setOpenReply(!openReply);
  };

  useEffect(() => {
    myAPI();
  }, [props.index]);

  const myAPI = async () => {
    try {
      const res = await axiosGet('guestBook/Reply', { index: props.index });
      setForm(res);

      console.log('form', form);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const save_reply = async () => {
    const createForm = {
      contents: isContents.current.value,
      id: userStatus ? userId : '익명' + dayjs().format('mmss'),
      member_create: userStatus ? 'Y' : 'N',
      guestbook_fk: props.index,
    };

    const rtn = await savePost(
      router.split('/')[1] === 'guestBook'
        ? 'guestBook/Reply'
        : 'myStudy/Reply',
      createForm
    );
    alert(rtn.message);

    // 페이지를 이동합니다.
    location.reload();
  };

  return (
    <List sx={{ width: '100%' }}>
      <ListItemButton onClick={handleClick} style={{ background: 'gray' }}>
        <ListItemText primary={`댓글 ${form.length}`} />

        {openReply ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openReply} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {form.map((e, index) => (
            <ListItemButton key={index} aria-readonly>
              <Grid container sx={{ width: '100%', color: 'black' }}>
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
          <Link href={`/guestBook`}>
            <Button fullWidth variant="contained" color="error">
              목록으로!
            </Button>
          </Link>
        </Grid>
      </Grid>
    </List>
  );
};

'use client';
import { useState, useEffect, useRef } from 'react';
import { axiosGet, savePost } from '@/api/baseGet';
import { usePathname, useParams } from 'next/navigation';
import styles from './detail.module.css';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { useAppSelector } from '@/redux/hooks';
import Link from 'next/link';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';
export default function BaseDetail(props) {

  const { detailform, onModi , onDele } = props;

  const userStatus = useAppSelector(state => state.user.status);
  const userId = useAppSelector(state => state.user.id);
  const [form, setForm] = useState(detailform);
  const showButton = userStatus
    ? //로그인한 경우
      //로그인 id === 글쓴이
      userId === form.id
      ? true
      : false
    : //비회원
      form.member_create === 'N'; 
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
                    <EditIcon onClick={onModi}/>
                  <DeleteIcon onClick={onDele} />
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
          </Grid>
          <Grid xs={0} lg={2}></Grid>
        </Grid>
      </div>
    </>
  );
}

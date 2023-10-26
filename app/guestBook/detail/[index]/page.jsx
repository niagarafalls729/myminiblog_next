'use client';
import { useState, useEffect } from 'react';
import { axiosGet } from '@/api/baseGet';
import { useParams } from 'next/navigation';

import Button from '@mui/material/Button';
import styles from './detail.module.css';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import TextField from '@mui/material/TextField';
import BasicEditor from '@/components/editor/index';
// import BasicEditor from '@/components/editor/copy';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import RefreshIcon from '@mui/icons-material/Refresh';

export default function detail() {
  const params = useParams();

  console.log('params', params.index);

  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState({});
  useEffect(() => {
    setMounted(true);
    myAPI();
  }, []);

  const myAPI = async () => {
    try {
      const res = await axiosGet('guestBook', params);
      // API 호출에서 데이터를 가져온 후 rows 배열에 추가
      setForm(res[0]);
      console.log(res);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  return (
    <>
      <div className="p-8" style={{ zIndex: 10, position: 'sticky' }}>
        <Grid container>
          <Grid xs={0} md={4} lg={4}></Grid>
          <Grid xs={12} md={6} lg={4} className={styles['create_wrap']}>
            <Grid xs={12} md={12} lg={12}>
              제목 : {form.title}
            </Grid>
            <Grid xs={12} md={12} lg={12}>
              <div dangerouslySetInnerHTML={{ __html: form.contents }} />
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

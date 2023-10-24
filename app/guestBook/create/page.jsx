'use client';
import { useState, useRef, useMemo, useEffect } from 'react'; // useEffect 추가
import Button from '@mui/material/Button';
import styles from './create.module.css';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import TextField from '@mui/material/TextField';
import BasicEditor from '@/components/editor/index';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useAppSelector } from '@/redux/hooks';
import { saveBlob } from '@/api/baseGet';

import dayjs from 'dayjs';
const stylesCSS = {
  input: {
    '& input[type=number]': {
      MozAppearance: 'textfield',
    },
    '& input[type=number]::-webkit-outer-spin-button': {
      WebkitAppearance: 'none',
    },
    '& input[type=number]::-webkit-inner-spin-button': {
      WebkitAppearance: 'none',
    },
  },
};

export default function page() {
  const [mounted, setMounted] = useState(false);
  const userStatus = useAppSelector(state => state.user.status);
  const userId = useAppSelector(state => state.user.id);
  const isTitle = useRef(null);
  const isContents = useRef(null);
  const isCaptcha = useRef(null);
  const [titlelErr, settitlelErr] = useState(false);
  const [helperText, setHelperText] = useState('');
  const [captcha, setCaptcha] = useState('');
  const generateRandomNumber = () =>
    Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

  useEffect(() => {
    setMounted(true);
    setCaptcha(generateRandomNumber);
  }, []);

  const errCHK = () => {
    const titleValue = isTitle.current.value;
    if (titleValue.length === 0) {
      settitlelErr(true);
      setHelperText('제목을 입력해주세요!!!!');
    } else {
      settitlelErr(false);
      setHelperText('');
    }
  };
  const handleClickShowPassword = () => setCaptcha(generateRandomNumber);

  const fn_save = async () => {
    console.log(
      '입력된 값:',
      isContents.current.value,
      isCaptcha.current.value
    );
    console.log('입력된 값:', isContents.current);
    // if (captcha != isCaptcha.current.value) return alert('값틀림');

    if (isContents.current) {
      console.log('Text from child:', isContents.current.text);
    }
    const createGuestBook = {
      title: isTitle.current.value,
      contents: isContents.current.text,
      id: userStatus ? userId : '익명' + dayjs().format('MMDDHHmmss'),
    };
    console.log('cc', createGuestBook);
    const rtn = await saveBlob('guestBook/Create', createGuestBook);
    alert(rtn.message);

    // 페이지를 이동합니다.
    location.reload();
  };

  return !mounted ? (
    'loading....'
  ) : (
    <div className="p-8" style={{ zIndex: 10, position: 'sticky' }}>
      <Grid container>
        <Grid xs={0} md={4} lg={4}></Grid>
        <Grid xs={12} md={6} lg={4} className={styles['create_wrap']}>
          <Grid xs={12} md={12} lg={12} className={styles['input_title']}>
            <TextField
              id="outlined-basic"
              label="제목"
              variant="outlined"
              helperText={helperText}
              fullWidth
              color={!titlelErr ? 'primary' : 'warning'}
              onBlur={errCHK}
              onChange={errCHK}
              inputProps={{ ref: isTitle }}
            />
          </Grid>
          <Grid xs={12} md={12} lg={12} className="mb-8">
            <BasicEditor
              ref={isContents}
              style={{ height: '300px', marginBottom: '20px' }} // 스타일 속성을 객체로 설정
              onTextChange={e => console.log('Text changed:', e)}
            />
          </Grid>
          <Grid xs={12} md={12} lg={12} className="mb-8">
            <div style={{ display: 'flex' }}>
              <Grid xs={6} md={6} lg={6}>
                <FormControl style={{ width: '100%' }}>
                  <InputLabel color="error"> {captcha}</InputLabel>
                  <OutlinedInput
                    onClick={handleClickShowPassword}
                    disabled
                    type={'number'}
                    endAdornment={<RefreshIcon color="primary" />}
                  />
                </FormControl>
              </Grid>
              <Grid xs={6} md={6} lg={6}>
                <TextField
                  label="captcha 번호 입력"
                  variant="outlined"
                  type="number"
                  fullWidth
                  sx={{ ...stylesCSS.input }}
                  inputProps={{ ref: isCaptcha }}
                />
              </Grid>
            </div>
          </Grid>
          <Button fullWidth variant="contained" onClick={fn_save}>
            저장
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

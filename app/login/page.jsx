'use client';
import { useState, useRef, useMemo } from 'react';
import Button from '@mui/material/Button';
import { savePost, getPost } from '@/api/baseGet';
import styles from './login.module.css';
import useDetect from '@/app/layout/mediaQuery/Detect';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Swal from 'sweetalert2';

import { useRouter } from 'next/navigation';
import { loginImgPc, loginImgMo } from '@/public/img/loginImg';
import { setUser } from '@/redux/features/userSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
export default function page() {
  const idRef = useRef(null);
  const pwRef = useRef(null);

  const router = useRouter();
  const dispatch = useAppDispatch();
  const disSize = useDetect();

  // const sizeV = disSize == 'mo' ? '500/1000' : '1200/2400';

  const [value, setValue] = useState('login');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const loginApi = async () => {
      if (idRef.current.value == null || idRef.current.value.length < 5)
        return Swal.fire('ID 5글자 이상');
      if (pwRef.current.value == null || pwRef.current.value.length < 5)
        return Swal.fire('PW 5글자 이상');

      const loginUser = {
        id: idRef.current.value,
        pw: pwRef.current.value,
      };
      const rtn = await getPost('login', loginUser);
      Swal.fire(rtn.message);

      // 페이지를 이동합니다.
      if (rtn.code === '0000') {
        dispatch(setUser(rtn));
        router.push('/');
      } else {
        Swal.fire('비번 틀림');
      }
    };

    return (
      <CustomTabPanel value={value} index={'login'}>
        <Grid container spacing={3} className="p-4 ">
          <Grid xs={12} md={12} lg={12}></Grid>
          <Grid xs={12} md={12} lg={12}>
            <TextField
              id="outlined-basic"
              label="아이디"
              variant="outlined"
              fullWidth
              inputProps={{ ref: idRef }}
            />
          </Grid>
          <Grid xs={12} md={12} lg={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                비밀번호
              </InputLabel>
              <OutlinedInput
                fullWidth
                inputProps={{ ref: pwRef }}
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="비밀번호"
              />
            </FormControl>
          </Grid>
          <Grid xs={12} md={12} lg={12}>
            <Button fullWidth variant="contained" onClick={loginApi}>
              로그인
            </Button>
          </Grid>
        </Grid>
      </CustomTabPanel>
    );
  };
  const Join = () => {
    const emailRef = useRef('');
    const [emailErr, setEmailErr] = useState(false);
    const [emailHelperText, setEmailHelperText] = useState('비번찾기용!');
    const errEmailCHK = () => {
      const emailValue = emailRef.current.value;
      console.log('이메일 값:', emailValue);
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const isValidEmail = emailPattern.test(emailValue);
      if (isValidEmail) {
        setEmailHelperText('올바른 이메일 주소입니다.');
        setEmailErr(false);
      } else {
        setEmailHelperText('유효하지 않은 이메일 주소입니다.');
        setEmailErr(true);
      }
    };
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const joinApi = async () => {
      if (emailErr) return Swal.fire('이메일확인하삼! 비번찾기용');
      if (idRef.current.value == null || idRef.current.value.length < 5)
        return Swal.fire('ID 5글자 이상');
      if (pwRef.current.value == null || pwRef.current.value.length < 5)
        return Swal.fire('PW 5글자 이상');
      const createUser = {
        id: idRef.current.value,
        pw: pwRef.current.value,
        email: emailRef.current.value,
      };
      const rtn = await savePost('saveUser', createUser);
      Swal.fire(rtn.message);
      // 페이지를 이동합니다.
      location.reload();
    };

    return (
      <CustomTabPanel value={value} index={'join'}>
        <Grid container spacing={3} className="p-4 ">
          <Grid xs={12} md={12} lg={12}></Grid>
          <Grid xs={12} md={12} lg={12}>
            <TextField
              label="아이디"
              variant="outlined"
              fullWidth
              inputProps={{ ref: idRef }}
            />
          </Grid>
          <Grid xs={12} md={12} lg={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="pw"> 비밀번호</InputLabel>
              <OutlinedInput
                id="pw"
                fullWidth
                inputProps={{ ref: pwRef }}
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={e => {
                        e.preventDefault();
                      }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="비밀번호"
              />
            </FormControl>
          </Grid>
          <Grid xs={12} md={12} lg={12}>
            <TextField
              label="이메일"
              variant="outlined"
              helperText={emailHelperText}
              fullWidth
              color={!emailErr ? 'primary' : 'warning'}
              onBlur={errEmailCHK}
              onChange={errEmailCHK}
              inputProps={{ ref: emailRef }} // ref 설정을 inputProps에 추가
            />
          </Grid>
          <Grid xs={12} md={12} lg={12}>
            <Button fullWidth variant="contained" onClick={joinApi}>
              회원가입
            </Button>
          </Grid>
        </Grid>
      </CustomTabPanel>
    );
  };
  return (
    <>
      <div className={styles['main_login']}>
        {/* <img
          src={`https://picsum.photos/${sizeV}?grayscale`}
          // style={{disSize =="mo" ? 'position: a':'' }}
          className={styles[disSize]}
          alt="Random Image"
        /> */}
        {/* <img
          src={sizeV == 'mo' ? loginImgMo[0].url : loginImgPc[0].url}
          // style={{disSize =="mo" ? 'position: a':'' }}
          className={styles[disSize]}
          alt="Random Image"
        /> */}

        <div className="p-8 " style={{ zIndex: 10, position: 'sticky' }}>
          <Grid container>
            <Grid xs={0} md={4} lg={4}></Grid>
            <Grid xs={12} md={4} lg={4}>
              <Box sx={{ width: '100%' }}>
                <Tabs value={value} variant="fullWidth" onChange={handleChange}>
                  <Tab value="login" label="로그인" />
                  <Tab value="join" label="회원가입" />
                </Tabs>
                <Login></Login>
                <Join></Join>
              </Box>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
}

function CustomTabPanel(props) {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Box>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

'use client';
import { useState, useRef, useMemo } from 'react';
import Button from '@/components/ui/Button';
import { savePost, getPost } from '@/api/baseGet';
import styles from './login.module.css';
import useDetect from '@/app/layout/mediaQuery/Detect';
import Grid from '@/components/ui/Grid';
import Input from '@/components/ui/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
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
            <Input
              label="아이디"
              fullWidth
              ref={idRef}
            />
          </Grid>
          <Grid xs={12} md={12} lg={12}>
            <div className={styles.passwordInput}>
              <Input
                label="비밀번호"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                ref={pwRef}
              />
              <button 
                type="button"
                className={styles.passwordToggle}
                onClick={handleClickShowPassword}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
          </Grid>
          <Grid xs={12} md={12} lg={12}>
            <Button fullWidth variant="primary" onClick={loginApi}>
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
            <Input
              label="아이디"
              fullWidth
              ref={idRef}
            />
          </Grid>
          <Grid xs={12} md={12} lg={12}>
            <div className={styles.passwordInput}>
              <Input
                label="비밀번호"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                ref={pwRef}
              />
              <button 
                type="button"
                className={styles.passwordToggle}
                onClick={handleClickShowPassword}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
          </Grid>
          <Grid xs={12} md={12} lg={12}>
            <Input
              label="이메일"
              helperText={emailHelperText}
              fullWidth
              error={emailErr}
              onBlur={errEmailCHK}
              onChange={errEmailCHK}
              ref={emailRef}
            />
          </Grid>
          <Grid xs={12} md={12} lg={12}>
            <Button fullWidth variant="primary" onClick={joinApi}>
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
              <div className={styles.tabContainer}>
                <div className={styles.tabs}>
                  <button 
                    className={`${styles.tab} ${value === 'login' ? styles.active : ''}`}
                    onClick={() => setValue('login')}
                  >
                    로그인
                  </button>
                  <button 
                    className={`${styles.tab} ${value === 'join' ? styles.active : ''}`}
                    onClick={() => setValue('join')}
                  >
                    회원가입
                  </button>
                </div>
                <Login></Login>
                <Join></Join>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
}

const CustomTabPanel = props => {
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
};

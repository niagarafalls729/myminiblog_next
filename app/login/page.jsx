'use client';
import { useState, useRef } from 'react';
import { savePost, getPost } from '@/api/baseGet';
import styles from './login.module.css';
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

  const [value, setValue] = useState('login');

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
        // 사용자 정보를 올바른 구조로 설정
        const userData = {
          id: rtn.id,
          email: rtn.email,
          status: rtn.status,
        };
        dispatch(setUser(userData));
        router.push('/');
      } else {
        Swal.fire('비번 틀림');
      }
    };

    return (
      <CustomTabPanel value={value} index={'login'}>
        <div className={styles.formContent}>
          <div className={styles.inputGroup}>
            <Input label="아이디" fullWidth ref={idRef} />
          </div>
          <div className={styles.inputGroup}>
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
          </div>
          <div className={styles.inputGroup}>
            <button className={styles.loginButton} onClick={loginApi}>
              로그인
            </button>
          </div>
        </div>
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
        <div className={styles.formContent}>
          <div className={styles.inputGroup}>
            <Input label="아이디" fullWidth ref={idRef} />
          </div>
          <div className={styles.inputGroup}>
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
          </div>
          <div className={styles.inputGroup}>
            <Input
              label="이메일"
              helperText={emailHelperText}
              fullWidth
              error={emailErr}
              onBlur={errEmailCHK}
              onChange={errEmailCHK}
              ref={emailRef}
            />
          </div>
          <div className={styles.inputGroup}>
            <button className={styles.loginButton} onClick={joinApi}>
              회원가입
            </button>
          </div>
        </div>
      </CustomTabPanel>
    );
  };
  return (
    <>
      <div className={styles['main_login']}>
        {/* 움직이는 배경 요소들 */}
        <div className={styles['floating-element-1']}></div>
        <div className={styles['floating-element-2']}></div>
        <div className={styles['floating-element-3']}></div>
        <div className={styles['floating-element-4']}></div>

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

        <div
          style={{
            zIndex: 10,
            position: 'relative',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
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
      {value === index && <div>{children}</div>}
    </div>
  );
};

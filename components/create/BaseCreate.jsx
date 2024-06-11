'use client';
import { useState, useRef, useMemo, useEffect } from 'react'; // useEffect 추가

import { axiosGet } from '@/api/baseGet';
import Button from '@mui/material/Button';
import styles from './create.module.css';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import TextField from '@mui/material/TextField';
import BasicEditor from '@/components/editor/index';
// import BasicEditor from '@/components/editor/copy';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useAppSelector } from '@/redux/hooks';
import { useRouter, useParams, usePathname } from 'next/navigation';

import { savePost } from '@/api/baseGet';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';

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

export default function BaseCreate(props) {
  const { originForm, save } = props;
  const path = usePathname().split('/');

  const [mounted, setMounted] = useState(false);
  const userStatus = useAppSelector(state => state.user.status);
  const userId = useAppSelector(state => state.user.id);
  const isTitle = useRef(null);
  const isContents = useRef(null);
  const isCaptcha = useRef(null);
  const isPw = useRef(null);

  const [titlelErr, settitlelErr] = useState(false);
  const [helperText, setHelperText] = useState('');
  const [captcha, setCaptcha] = useState('');

  const [form, setForm] = useState();
  const generateRandomNumber = () =>
    Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

  useEffect(() => {
    setMounted(true);
    setCaptcha(generateRandomNumber);
    setForm(originForm ?? '');
    // myAPI();
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
    // 로그인 회원은 입력안함으로 패스
    // 쿼리파라미터 값으로 2는 필요
    // 마지막은 값 대칭
    // 수정
    if (
      !userStatus &&
      path[2] != 'create' &&
      form.password != isPw.current.value
    ) {
      return Swal.fire('비밀번호가 틀립니다!');
    }
    // 로그인 회원은 패스
    // 쿼리파라미터 값으로 1은 필요
    // 마지막은 값 대칭
    // 글쓰기
    if (
      !userStatus &&
      path[2] == 'create' &&
      captcha != isCaptcha.current.value
    ) {
      return Swal.fire('Captcha가 틀립니다!');
    }
    const createForm = {
      title: isTitle.current.value,
      contents: isContents.current.text,
      id: userStatus ? userId : '익명' + dayjs().format('mmss'),
      member_create: userStatus ? 'Y' : 'N',
      password: isPw.current.value,
    };
    console.log('cc', createForm);
    save(createForm);
  };

  return !mounted ? (
    'loading....'
  ) : (
    <div className={styles['create_wrap']}>
      <div>
        <TextField
          id="outlined-basic"
          variant="outlined"
          placeholder="제목"
          helperText={helperText}
          fullWidth
          color={!titlelErr ? 'primary' : 'warning'}
          onBlur={errCHK}
          onChange={errCHK}
          inputProps={{ ref: isTitle, autoFocus: true }}
          defaultValue={form.title}
          autoFocus={form.title && true}
        />
      </div>
      <div className="!w-full mb-8 inline-block">
        <BasicEditor
          value={form.contents}
          ref={isContents}
          style={{ height: '300px', marginBottom: '20px' }} // 스타일 속성을 객체로 설정
        />
      </div>
      <div className="mb-8">
        <div
          style={{
            display: userStatus || path[2] != 'create' ? 'none' : 'flex',
            width: '100%',
          }}
        >
          <div
            style={{
              width: '100%',
            }}
          >
            <FormControl style={{ width: '100%' }}>
              <InputLabel color="error"> {captcha}</InputLabel>
              <OutlinedInput
                onClick={handleClickShowPassword}
                disabled
                type={'number'}
                endAdornment={<RefreshIcon color="primary" />}
              />
            </FormControl>
          </div>
          <div
            style={{
              width: '100%',
            }}
          >
            <TextField
              label="captcha 번호 입력"
              variant="outlined"
              type="number"
              fullWidth
              sx={{ ...stylesCSS.input }}
              inputProps={{ ref: isCaptcha }}
            />
          </div>
        </div>
        <FormControl
          style={{ width: '100%', display: userStatus ? 'none' : 'auto' }}
        >
          <OutlinedInput
            type={'number'}
            inputProps={{ ref: isPw }}
            placeholder="비밀번호 입력"
          />
        </FormControl>
        <br />
        <br />
        <Button fullWidth variant="contained" onClick={fn_save}>
          저장
        </Button>
      </div>
    </div>
  );
}

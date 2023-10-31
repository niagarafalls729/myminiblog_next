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
import { useRouter, useParams } from 'next/navigation';
import { savePost } from '@/api/baseGet';
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
  const router = useRouter();
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
  const params = useParams();

  const [form, setForm] = useState({});
  // console.log('-------------------');
  // console.log('params', params.index[0]);
  // console.log('params', params);
  // console.log('detail query', router);
  // console.log('-------------------');

  const generateRandomNumber = () =>
    Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

  useEffect(() => {
    setMounted(true);
    setCaptcha(generateRandomNumber);
    myAPI();
  }, []);

  const myAPI = async () => {
    try {
      if (params.index[1] == null) {
        return;
      }
      const res = await axiosGet(params.index[0], { index: params.index[1] });
      // // API 호출에서 데이터를 가져온 후 rows 배열에 추가
      setForm(res[0]);
      // console.log("res",res);
      // console.log("form",res[0].title)
      isTitle.current.value = res[0].title;
      isContents.current.text = res[0].contents;
      isContents.current.value = res[0].contents;
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

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
    if (
      !userStatus &&
      params.index.length == 2 &&
      form.password != isPw.current.value
    ) {
      return alert('값틀림');
    }
    // 로그인 회원은 패스
    // 쿼리파라미터 값으로 1은 필요
    // 마지막은 값 대칭
    // if (  !userStatus && params.index.length == 1 && captcha != isCaptcha.current.value) return alert('값틀림');

    const createForm = {
      title: isTitle.current.value,
      contents: isContents.current.text,
      id: userStatus ? userId : '익명' + dayjs().format('mmss'),
      member_create: userStatus ? 'Y' : 'N',
      password: isPw.current.value,
      index: form.index,
    };
    console.log('cc', createForm);

    const rtn = await savePost(
      params.index[0] === 'guestBook' ? 'guestBook/Create' : '/myStudy/Create',
      createForm
    );
    alert(rtn.message);

    // 페이지를 이동합니다.
    router.push(params.index[0] === 'guestBook' ? '/guestBook' : '/myStudy');
  };

  return !mounted ? (
    'loading....'
  ) : (
    <div className="p-8" style={{ zIndex: 10 }}>
      <Grid container>
        <Grid xs={0} md={4} lg={4}></Grid>
        <Grid xs={12} md={6} lg={4} className={styles['create_wrap']}>
          <Grid xs={12} md={12} lg={12} className={styles['input_title']}>
            <Grid container>
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
            </Grid>
            <Grid xs={12} md={12} lg={12} className="!w-full mb-8 inline-block">
              {/* <BasicEditor></BasicEditor> */}
              <BasicEditor
                value={form.contents}
                ref={isContents}
                style={{ height: '300px', marginBottom: '20px' }} // 스타일 속성을 객체로 설정
              />
            </Grid>
            <Grid xs={12} md={12} lg={12} className="mb-8">
              <div
                style={{
                  display:
                    userStatus || params.index.length == 2 ? 'none' : 'flex',
                }}
              >
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
              <FormControl
                style={{ width: '100%', display: userStatus ? 'none' : 'auto' }}
              >
                <OutlinedInput
                  type={'number'}
                  inputProps={{ ref: isPw }}
                  placeholder="비밀번호 입력"
                />
              </FormControl>
            </Grid>
            <Button fullWidth variant="contained" onClick={fn_save}>
              저장
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

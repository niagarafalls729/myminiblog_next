'use client';
import { useState, useRef, useMemo, useEffect } from 'react';

import { axiosGet } from '@/api/baseGet';
import Button from '@/components/ui/Button';
import styles from './create.module.css';
import Input from '@/components/ui/Input';
import BasicEditor from '@/components/editor/index';
import { useAppSelector } from '@/redux/hooks';
import { useRouter, useParams, usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';

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
  }, []);

  // originForm이 변경될 때마다 form 상태 업데이트
  useEffect(() => {
    if (originForm) {
      console.log('BaseCreate originForm 업데이트:', originForm);
      setForm(originForm);
    }
  }, [originForm]);

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
      contents: isContents.current.getContents
        ? isContents.current.getContents()
        : isContents.current.text,
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
        <Input
          placeholder="제목"
          helperText={helperText}
          fullWidth
          error={titlelErr}
          onBlur={errCHK}
          onChange={errCHK}
          ref={isTitle}
          defaultValue={form?.title || ''}
          autoFocus={form?.title && true}
        />
      </div>
      <div className="!w-full mb-8 inline-block">
        <BasicEditor
          value={form?.contents || ''}
          ref={isContents}
          style={{ height: '300px', marginBottom: '20px' }}
        />
      </div>
      <div className="mb-8">
        <div
          className={styles.captchaSection}
          style={{
            display: userStatus || path[2] != 'create' ? 'none' : 'flex',
          }}
        >
          <div className={styles.captchaContainer}>
            <div className={styles.captchaDisplay}>
              <span className={styles.captchaText}>{captcha}</span>
              <button
                className={styles.refreshButton}
                onClick={handleClickShowPassword}
                type="button"
              >
                <FontAwesomeIcon icon={faRefresh} />
              </button>
            </div>
          </div>
          <div className={styles.captchaInput}>
            <Input
              type="number"
              placeholder="captcha 번호 입력"
              fullWidth
              ref={isCaptcha}
            />
          </div>
        </div>
        <div
          className={styles.passwordSection}
          style={{ display: userStatus ? 'none' : 'flex' }}
        >
          <div className={styles.passwordInput}>
            <Input
              type="number"
              placeholder="비밀번호 입력"
              fullWidth
              ref={isPw}
            />
          </div>
        </div>
        <div style={{ marginTop: '24px' }}>
          <Button fullWidth variant="primary" onClick={fn_save}>
            저장
          </Button>
        </div>
      </div>
    </div>
  );
}

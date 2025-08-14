'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { setUser } from '@/redux/features/userSlice';
import { savePost } from '@/api/baseGet';
import Swal from 'sweetalert2';
import styles from './userModi.module.css';

export default function UserModi() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [emailErr, setEmailErr] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState('');

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    // 사용자 상태 확인
    if (!user || !user.id || !user.status) {
      Swal.fire(
        '로그인이 필요합니다',
        '로그인 페이지로 이동합니다.',
        'warning'
      );
      router.push('/login');
      return;
    }

    // 기존 이메일 설정
    if (user.email) {
      setNewEmail(user.email);
    }
  }, [user, router]);

  const validateEmail = email => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const handleEmailChange = email => {
    setNewEmail(email);
    if (email && !validateEmail(email)) {
      setEmailErr(true);
      setEmailHelperText('유효하지 않은 이메일 주소입니다.');
    } else {
      setEmailErr(false);
      setEmailHelperText('올바른 이메일 주소입니다.');
    }
  };

  const handlePasswordChange = async () => {
    if (!currentPassword) {
      return Swal.fire('현재 비밀번호를 입력해주세요.');
    }
    if (!newPassword) {
      return Swal.fire('새 비밀번호를 입력해주세요.');
    }
    if (newPassword.length < 5) {
      return Swal.fire('새 비밀번호는 5글자 이상이어야 합니다.');
    }
    if (newPassword !== confirmPassword) {
      return Swal.fire('새 비밀번호와 확인 비밀번호가 일치하지 않습니다.');
    }

    try {
      const response = await savePost('updatePassword', {
        id: user.id,
        currentPassword,
        newPassword,
      });

      if (response.code === '0000') {
        Swal.fire('성공!', '비밀번호가 변경되었습니다.', 'success');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        Swal.fire(
          '오류',
          response.message || '비밀번호 변경에 실패했습니다.',
          'error'
        );
      }
    } catch (error) {
      console.error('비밀번호 변경 오류:', error);

      // 더 구체적인 에러 메시지 표시
      let errorMessage = '비밀번호 변경 중 오류가 발생했습니다.';
      if (error.message === 'Failed to make the API request') {
        errorMessage =
          '백엔드 서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.';
      } else if (error.code === 'ERR_NETWORK') {
        errorMessage =
          '네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.';
      }

      Swal.fire('연결 오류', errorMessage, 'error');
    }
  };

  const handleEmailChangeSubmit = async () => {
    if (!newEmail) {
      return Swal.fire('이메일을 입력해주세요.');
    }
    if (emailErr) {
      return Swal.fire('올바른 이메일 주소를 입력해주세요.');
    }

    try {
      const response = await savePost('updateEmail', {
        id: user.id,
        newEmail,
      });

      if (response.code === '0000') {
        Swal.fire('성공!', '이메일이 변경되었습니다.', 'success');
        // Redux 상태 업데이트
        const updatedUser = { ...user, email: newEmail };
        dispatch(setUser(updatedUser));
      } else {
        Swal.fire(
          '오류',
          response.message || '이메일 변경에 실패했습니다.',
          'error'
        );
      }
    } catch (error) {
      console.error('이메일 변경 오류:', error);

      // 더 구체적인 에러 메시지 표시
      let errorMessage = '이메일 변경 중 오류가 발생했습니다.';
      if (error.message === 'Failed to make the API request') {
        errorMessage =
          '백엔드 서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.';
      } else if (error.code === 'ERR_NETWORK') {
        errorMessage =
          '네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.';
      }

      Swal.fire('연결 오류', errorMessage, 'error');
    }
  };

  const handleGoBack = () => {
    router.push('/');
  };

  if (!user || !user.id || !user.status) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>사용자 정보 수정</h1>
        <p>안전한 계정 관리를 위해 정보를 수정할 수 있습니다.</p>
      </div>

      <div className={styles.content}>
        {/* 비밀번호 변경 섹션 */}
        <div className={styles.section}>
          <h2>비밀번호 변경</h2>
          <div className={styles.formGroup}>
            <label>현재 비밀번호</label>
            <div className={styles.passwordInput}>
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)}
                placeholder="현재 비밀번호를 입력하세요"
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? '👁️' : '🙈'}
              </button>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>새 비밀번호</label>
            <div className={styles.passwordInput}>
              <input
                type={showNewPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="새 비밀번호를 입력하세요 (5글자 이상)"
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? '👁️' : '🙈'}
              </button>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>새 비밀번호 확인</label>
            <div className={styles.passwordInput}>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="새 비밀번호를 다시 입력하세요"
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? '👁️' : '🙈'}
              </button>
            </div>
          </div>

          <button
            className={styles.submitButton}
            onClick={handlePasswordChange}
          >
            비밀번호 변경
          </button>
        </div>

        {/* 이메일 변경 섹션 */}
        <div className={styles.section}>
          <h2>이메일 변경</h2>
          <div className={styles.formGroup}>
            <label>현재 이메일</label>
            <input
              type="text"
              value={user.email || '등록된 이메일이 없습니다'}
              disabled
              className={styles.disabledInput}
            />
          </div>

          <div className={styles.formGroup}>
            <label>새 이메일</label>
            <input
              type="email"
              value={newEmail}
              onChange={e => handleEmailChange(e.target.value)}
              placeholder="새 이메일을 입력하세요"
              className={emailErr ? styles.errorInput : ''}
            />
            {emailHelperText && (
              <span
                className={`${styles.helperText} ${emailErr ? styles.errorText : ''}`}
              >
                {emailHelperText}
              </span>
            )}
          </div>

          <button
            className={styles.submitButton}
            onClick={handleEmailChangeSubmit}
          >
            이메일 변경
          </button>
        </div>

        {/* 돌아가기 버튼 */}
        <div className={styles.actions}>
          <button className={styles.backButton} onClick={handleGoBack}>
            메인으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}

'use client';
import { useState } from 'react';
import styles from './detail.module.css';
import { useAppSelector } from '@/redux/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function BaseDetail(props) {
  const { detailform, onModi, onDele } = props;

  const userStatus = useAppSelector(state => state.user.status);
  const userId = useAppSelector(state => state.user.id);
  const [form, setForm] = useState(detailform || {});

  // detailform이 변경될 때 form 상태 업데이트
  if (detailform && JSON.stringify(detailform) !== JSON.stringify(form)) {
    setForm(detailform);
  }

  // 권한 체크 로직 수정
  const isLoggedIn = userStatus === true; // 로그인 상태
  const isAuthor = isLoggedIn && userId === form.id; // 본인이 작성한 글인지
  const isGuestPost = form.member_create === 'N'; // 게스트가 작성한 글인지 (비회원 글)
  const isGuestUser = !isLoggedIn; // 현재 사용자가 비회원인지

  // 수정/삭제 버튼 표시 조건:
  // 1. 로그인한 사용자가 본인이 작성한 글인 경우
  // 2. 비회원이 비회원이 작성한 글인 경우
  const showButton = isAuthor || (isGuestUser && isGuestPost);

  // 버튼 툴팁 메시지 생성
  const getModifyTooltip = () => {
    if (isAuthor) {
      return "본인이 작성한 글을 수정합니다";
    } else if (isGuestPost && isGuestUser) {
      return "비회원이 작성한 글입니다. 비밀번호로 인증 후 수정 가능합니다";
    }
    return "수정";
  };

  const getDeleteTooltip = () => {
    if (isAuthor) {
      return "본인이 작성한 글을 삭제합니다";
    } else if (isGuestPost && isGuestUser) {
      return "비회원이 작성한 글입니다. 비밀번호로 인증 후 삭제 가능합니다";
    }
    return "삭제";
  };

  // 디버깅을 위한 로그
  console.log('BaseDetail 권한 체크:', {
    userStatus,
    userId,
    formId: form.id,
    memberCreate: form.member_create,
    isLoggedIn,
    isAuthor,
    isGuestPost,
    isGuestUser,
    showButton,
    formData: form,
  });

  // detailform이 없으면 로딩 상태 표시
  if (!detailform) {
    return <div>데이터 로딩 중...</div>;
  }

  return (
    <div className="p-1" style={{ zIndex: 10, position: 'sticky' }}>
      <div className={styles.container}>
        {/* 제목 영역 */}
        <div className={styles.header}>
          <div className={styles.title}>제목 : {form.title || ''}</div>
          {showButton && (
            <div className={styles.actions}>
              <button
                className={styles.actionButton}
                onClick={onModi}
                title={getModifyTooltip()}
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button
                className={styles.actionButton}
                onClick={onDele}
                title={getDeleteTooltip()}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          )}
        </div>

        {/* 작성자 & 작성일 */}
        <div className={styles.meta}>
          <div>작성자 : {form.id || ''}</div>
          <div>작성일 : {form.creation_timestamp || ''}</div>
          {/* 디버깅용 정보 (개발 중에만 표시) */}
          {process.env.NODE_ENV === 'development' && (
            <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
              로그인상태: {isLoggedIn ? '로그인됨' : '로그아웃'} | 
              권한: {isAuthor ? '작성자' : '일반사용자'} | 
              게스트글: {isGuestPost ? '예' : '아니오'} |
              비회원사용자: {isGuestUser ? '예' : '아니오'} |
              버튼표시: {showButton ? '예' : '아니오'}
            </div>
          )}
        </div>

        <hr />
        <hr />

        {/* 본문 내용 */}
        <div className={styles.content}>
          <div dangerouslySetInnerHTML={{ __html: form.contents || '' }} />
        </div>
      </div>
    </div>
  );
}

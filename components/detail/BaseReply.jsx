import { useState, useRef } from 'react';
import React from 'react';
import styles from './detail.module.css';
import { useAppSelector } from '@/redux/hooks';
import Link from 'next/link';
import dayjs from 'dayjs';

const BaseReply = ({ arrFrom, onReplyC, useUrl, index }) => {
  const [openReply, setOpenReply] = useState(true);
  const isContents = useRef('');
  const userStatus = useAppSelector(state => state.user.status);
  const userId = useAppSelector(state => state.user.id);

  const handleClick = () => {
    setOpenReply(!openReply);
  };

  const save_reply = () => {
    const createForm = {
      contents: isContents.current.value,
      id: userStatus ? userId : '익명' + dayjs().format('mmss'),
      member_create: userStatus ? 'Y' : 'N',
      guestbook_fk: index,
    };
    isContents.current.value = '';
    onReplyC(createForm);
  };

  return (
    <div className={styles.replyContainer}>
      <div className={styles.replyBox}>
        <button className={styles.replyHeader} onClick={handleClick}>
          댓글 {arrFrom.length}
          <span className={styles.icon}>{openReply ? '▲' : '▼'}</span>
        </button>

        {openReply && (
          <ul className={styles.replyList}>
            {arrFrom.map((e, index) => (
              <li key={index} className={styles.replyItem}>
                <div className={styles.replyContent}>{e.contents}</div>
                <div className={styles.replyMeta}>
                  {e.id} / {e.creation_timestamp}
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className={styles.inputSection}>
          <textarea
            ref={isContents}
            className={styles.textInput}
            rows={4}
            placeholder="비회원도 입력 가능! 단 댓글 삭제 및 수정 불가능합니다."
          />
          <button className={styles.submitButton} onClick={save_reply}>
            저장
          </button>
        </div>

        <div className={styles.listButton}>
          <Link href={`/${useUrl}`} className={styles.linkButton}>
            목록으로!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default React.memo(BaseReply);

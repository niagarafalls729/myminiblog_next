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
  const [form, setForm] = useState(detailform);
  const showButton =
    (userStatus && userId === form.id) || form.member_create === 'N';

  return (
    <div className="p-1" style={{ zIndex: 10, position: 'sticky' }}>
      <div className={styles.container}>
        {/* 제목 영역 */}
        <div className={styles.header}>
          <div className={styles.title}>제목 : {form.title}</div>
          {showButton && (
            <div className={styles.actions}>
              <button 
                className={styles.actionButton}
                onClick={onModi}
                title="수정"
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button 
                className={styles.actionButton}
                onClick={onDele}
                title="삭제"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          )}
        </div>

        {/* 작성자 & 작성일 */}
        <div className={styles.meta}>
          <div>작성자 : {form.id}</div>
          <div>작성일 : {form.creation_timestamp}</div>
        </div>

        <hr />
        <hr />

        {/* 본문 내용 */}
        <div className={styles.content}>
          <div dangerouslySetInnerHTML={{ __html: form.contents }} />
        </div>
      </div>
    </div>
  );
}

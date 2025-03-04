'use client';
import { useState } from 'react';
import styles from './detail.module.css';
import { useAppSelector } from '@/redux/hooks';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

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
              <EditIcon onClick={onModi} />
              <DeleteIcon onClick={onDele} />
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

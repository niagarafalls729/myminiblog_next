'use client';

import { useEffect, useState } from 'react';
import styles from './studyHistory.module.css';
import Github from '@/app/studyHistory/Github';
import StudyMenu from '@/app/studyHistory/StudyMenu';

export default function History() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      {isMounted && (
        <>
          {' '}
          <div className={styles['wrap']}>
            <div className={styles['left']}>
              <StudyMenu />
            </div>
            <div className={styles['right']}>
              <Github />
            </div>
          </div>
        </>
      )}
    </>
  );
}

'use client';

import { useEffect, useState } from 'react';
import styles from './studyHistory.module.css';
import Github from '@/app/studyHistory/Github';
import StudyHistory from '@/app/studyHistory/StudyHistory';
import Project from '@/app/studyHistory/Project';
import StudyMenu from '@/app/studyHistory/StudyMenu';

export default function History() {
  const [isMounted, setIsMounted] = useState(false);
  const [isPage, setIsPage] = useState(0);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const pageChange = page => {
    setIsPage(page);
  };

  const Page = () => {
    switch (isPage) {
      case 0:
        return <Project></Project>;
      case 1:
        return <Github></Github>;
      case 2:
        return <StudyHistory></StudyHistory>;
      default:
        return <Github></Github>;
    }
  };
  return (
    <>
      {isMounted && (
        <>
          <div className={styles['wrap']}>
            <div className={styles['left']}>
              <StudyMenu onPageChange={pageChange} />
            </div>
            <div className={styles['right']}>
              <Page />
            </div>
          </div>
        </>
      )}
    </>
  );
}

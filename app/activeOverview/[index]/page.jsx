'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './activeOverview.module.css';
import Github from '@/app/activeOverview/[index]/Github';
import StudyHistory from '@/app/activeOverview/[index]/StudyHistory';
import Project from '@/app/activeOverview/[index]/Project';
import SideMenu from '@/app/activeOverview/[index]/SideMenu';

export default function History() {
  const [isMounted, setIsMounted] = useState(false);
  const [isPage, setIsPage] = useState('Project');
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);
  useEffect(() => {
    const trimmedPath = pathname.replace('/activeOverview/', '');
    setIsPage(trimmedPath);
  }, [pathname]);
  const pageChange = page => {
    setIsPage(page);
  };

  const Page = () => {
    switch (isPage) {
      case 'Project':
        return <Project></Project>;
      case 'Github':
        return <Github></Github>;
      case 'StudyHistory':
        return <StudyHistory></StudyHistory>;
      default:
        return <Project></Project>;
    }
  };
  return (
    <>
      {isMounted && (
        <>
          <div className={styles['wrap']}>
            <div className={styles['left']}>
              <SideMenu onPageChange={pageChange} />
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

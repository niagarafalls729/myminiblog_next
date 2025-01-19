'use client';

import { useEffect, useState } from 'react';
import styles from './activeOverview.module.css';
import Career from '@/app/introduction/career';

export default function Proejct() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      {isMounted && (
        <>
          <div className={styles['project_wrap']}>
            <p className={styles['sub_title']}>경력사항</p>
            <Career></Career>
            <br />
            <h3>
              제 포트폴리오를 확인해 주셔서 감사합니다. <br />
              어떠한 질문이나 제안이 있으시면 언제든지 연락 주시기 바랍니다.
              <br></br> 👻 010-9898-9845
              <br></br> 👌 wltn729@gmail.com
            </h3>
          </div>
        </>
      )}
    </>
  );
}

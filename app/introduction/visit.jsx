'use client';
import styles from './visit.module.css';
import { getPost } from '@/api/baseGet';
import { useState, useEffect, forwardRef } from 'react';
export default function Visit() {
  const [mounted, setMounted] = useState(false);
  const [isVisitCnt, setIsVisitCnt] = useState({ today: 1, total: 9999 });
  useEffect(() => {
    setMounted(true);
    getVisitCnt();
  }, []);
  const getVisitCnt = async () => {
    try {
      const res = await getPost('visitCnt');
      console.log('getVisitCnt', res);
      setIsVisitCnt({
        ...isVisitCnt,
        today: res.today,
        total: res.total,
      });
    } catch (error) {}
  };
  return (
    <>
      {mounted && (
        <div className={styles['visit_wrap']}>
          <h4>😍접속자 집계😗</h4>
          <h5>오늘 : {isVisitCnt.today}</h5>
          <h5>전체 : {isVisitCnt.total + 1029}</h5>
        </div>
      )}
    </>
  );
}

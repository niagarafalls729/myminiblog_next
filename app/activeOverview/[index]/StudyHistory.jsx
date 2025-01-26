'use client';

import { useEffect, useState } from 'react';
import MonacoEditorApp from '../../../components/monacoEditor';
export default function StudyHistory() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      {isMounted && (
        <>
          {/* <MonacoEditorApp /> */}
          <p>
            여기에 MonacoEditor를 불러오려고 하는중. .. 진행중 이며 일단은
            meterial 테마 부터 다 제거 하고 진행 예정
          </p>
        </>
      )}
    </>
  );
}

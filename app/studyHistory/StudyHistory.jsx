'use client';

import { useEffect, useState } from 'react';

export default function StudyHistory() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      {isMounted && (
        <>
          <h1>StudyHistory</h1>
        </>
      )}
    </>
  );
}

'use client';

import { useEffect, useState } from 'react';

export default function Proejct() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      {isMounted && (
        <>
          <h1>project</h1>
        </>
      )}
    </>
  );
}

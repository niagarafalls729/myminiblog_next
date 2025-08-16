import React, { useEffect, useMemo } from 'react';
import Button from '@/components/ui/Button';

const RandomCHk = ({ outputVal }) => {
  const min = 1000; // 최소값 (1000)
  const max = 9999; // 최대값 (9999)
  const randomNumber = useMemo(
    () => Math.floor(Math.random() * (max - min + 1)) + min,
    []
  );

  useEffect(() => {
    outputVal(randomNumber);
  }, [outputVal, randomNumber]);
  return (
    <div style={{ 
      width: '100%', 
      maxWidth: '200px',
      margin: '0 auto'
    }}>
      <Button
        variant="primary"
        style={{ width: '100%', height: '100%' }}
      >
        {randomNumber}
      </Button>
    </div>
  );
};

export default RandomCHk;

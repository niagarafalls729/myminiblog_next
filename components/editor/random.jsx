import React, { useEffect, useMemo } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
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
    <Grid item xs={6} md={6} lg={6}>
      <Button
        color="primary"
        variant="contained"
        style={{ width: '100%', height: '100%' }}
      >
        {randomNumber}
      </Button>
    </Grid>
  );
};

export default RandomCHk;

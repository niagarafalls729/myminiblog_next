'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

export default function BaseDial() {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        <SpeedDialAction
          key={'up'}
          icon={<ArrowUpwardIcon />}
          tooltipTitle={'up!!!'}
          onClick={() => {
            handleScrollToTop();
          }}
        />
      </SpeedDial>
    </Box>
  );
}

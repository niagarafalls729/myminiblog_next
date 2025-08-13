'use client';

import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faPlus } from '@fortawesome/free-solid-svg-icons';
import styles from './BaseDial.module.css';

export default function BaseDial() {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={styles['speed-dial-container']}>
      <button 
        className={styles['speed-dial-button']}
        onClick={handleScrollToTop}
        title="맨 위로"
        aria-label="맨 위로 스크롤"
      >
        <FontAwesomeIcon icon={faArrowUp} />
      </button>
    </div>
  );
}

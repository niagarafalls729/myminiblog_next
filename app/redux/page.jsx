'use client';

import { decrement, increment, reset } from '@/redux/features/counterSliceJS';
import { toggleDarkAndLight } from '@/redux/features/darkSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
export default function Home() {
  const count = useAppSelector(state => state.counter.value);
  const darkV = useAppSelector(state => state.darkAndLight.value);

  const dispatch = useAppDispatch();

  // 다크모드 토글 스타일
  const themeToggleStyle = {
    position: 'relative',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: darkV 
      ? 'linear-gradient(135deg, #2c3e50, #34495e)' 
      : 'linear-gradient(135deg, #ffd700, #ffed4e)',
    boxShadow: darkV 
      ? '0 2px 10px rgba(44, 62, 80, 0.3)' 
      : '0 2px 10px rgba(255, 215, 0, 0.3)',
    transition: 'all 0.3s ease',
    overflow: 'hidden',
    border: 'none',
    color: darkV ? '#ecf0f1' : '#333',
    transform: 'scale(1)',
    ':hover': {
      transform: 'scale(1.1)',
      boxShadow: darkV 
        ? '0 4px 15px rgba(44, 62, 80, 0.4)' 
        : '0 4px 15px rgba(255, 215, 0, 0.4)'
    }
  };

  return (
    <main style={{ maxWidth: 1200, marginInline: 'auto', padding: 20 }}>
      <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
        <h4 style={{ marginBottom: 16 }}>{count}</h4>
        <button onClick={() => dispatch(increment())}>increment</button>
        <button
          onClick={() => dispatch(decrement())}
          style={{ marginInline: 16 }}
        >
          decrement
        </button>
        <button onClick={() => dispatch(reset())}>reset</button>
        <button
          style={{ display: 'none' }}
          id="dark"
          onClick={() => dispatch(toggleDarkAndLight())}
        ></button>
        <label htmlFor="dark" style={themeToggleStyle}>
          {darkV ? (
            <FontAwesomeIcon 
              icon={faSun} 
              style={{ color: '#f39c12', fontSize: '18px' }}
            />
          ) : (
            <FontAwesomeIcon 
              icon={faMoon} 
              style={{ color: '#4a4a4a', fontSize: '18px' }}
            />
          )}
        </label>
      </div>
    </main>
  );
}

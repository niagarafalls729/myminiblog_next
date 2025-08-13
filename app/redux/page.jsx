'use client';

import { decrement, increment, reset } from '@/redux/features/counterSliceJS';
import { toggleDarkAndLight } from '@/redux/features/darkSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';
export default function Home() {
  const count = useAppSelector(state => state.counter.value);

  const dispatch = useAppDispatch();

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
        <label htmlFor="dark">
          <FontAwesomeIcon icon={faSun} />
        </label>
      </div>
    </main>
  );
}

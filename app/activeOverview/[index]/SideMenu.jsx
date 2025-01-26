'use client';

import { useRouter } from 'next/navigation';
export default function SideMenu(props) {
  const pageClick = e => {
    props.onPageChange(e);
  };
  const router = useRouter();
  return (
    <div style={{ width: '240px', maxWidth: '100%' }}>
      <div>
        <button
          onClick={() => {
            router.push('/activeOverview/Project');
          }}
        >
          <p>참여 프로젝트 😎</p>
        </button>
        <hr />
        <button
          onClick={() => {
            router.push('/activeOverview/Github');
          }}
        >
          <p>블로그 변경 이력 😄</p>
        </button>
        <hr />
        <button
          onClick={() => {
            router.push('/activeOverview/StudyHistory');
          }}
        >
          <p>공부 일지 🙂</p>
        </button>
      </div>
    </div>
  );
}

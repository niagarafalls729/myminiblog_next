'use client';

import { useState, useEffect } from 'react';
export default function history() {
  const [dataLoaded, setDataLoaded] = useState(false); // 데이터를 불러왔는지 여부를 추적

  useEffect(() => {
    setDataLoaded(true); // 데이터를 불러왔음을 표시
  }, []);

  return (
    <>
      {dataLoaded ? (
        <p>
          1,일단 여기다가 깃허브를 어떻게든 연동을 시켜서 커밋 기록을 손쉽게 볼
          수 있도록한다.
          <br />
          2.날짜 api 자동으로 하루에 한번
          <br />
          3.DB 자동 닫힘을 방지해서 하루에 한번 select문이든 뭐든 의미없어보이는
          행동 db로 연결
          <br />
          4.방문자 ip 수집
          <br />
          ... 위 사항은 모바일 환경 고려해서 반응형으로 개발
          <br />
        </p>
      ) : (
        '데이터 로딩 중...' // 데이터를 로딩 중인 동안 표시될 메시지
      )}
    </>
  );
}

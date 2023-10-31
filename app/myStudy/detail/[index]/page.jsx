'use client';

import { useState, useEffect } from 'react';
import BaseDetail from '@/components/detail/BaseDetail';
import { axiosGet } from '@/api/baseGet';
import { usePathname, useParams } from 'next/navigation';

export default function myStudy() {
  const [detailform, setDetailform] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false); // 데이터를 불러왔는지 여부를 추적
  const params = useParams();
  useEffect(() => {
    const myAPI = async () => {
      try {
        const res = await axiosGet('guestBook', params);
        setDetailform(res[0]);
        setDataLoaded(true); // 데이터를 불러왔음을 표시
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    myAPI();
  }, []);

  const handleRowClick = index => {
    console.log('클릭된 로우의 인덱스:', index);
    // 여기에서 필요한 작업 수행
  };

  return (
    <>
      {dataLoaded ? (
        <BaseDetail
          detailform={detailform}
          index={params.index}
          onRowClick={handleRowClick}
        />
      ) : (
        '데이터 로딩 중...' // 데이터를 로딩 중인 동안 표시될 메시지
      )}
    </>
  );
}

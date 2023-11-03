'use client';

import { useState, useEffect } from 'react';
import BaseTableList from '@/components/table/BaseTableList';
import { axiosGet } from '@/api/baseGet';
import { usePathname, useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
export default function myStudy() {
  const path = usePathname();

  const router = useRouter();
  const [rows, setRows] = useState([]);
  const columns = [
    { id: 'title', label: '제목', align: 'center' },
    { id: 'id', label: '작성자', align: 'right' },
    { id: 'created', label: '작성일', align: 'right' },
  ];
  const [dataLoaded, setDataLoaded] = useState(false); // 데이터를 불러왔는지 여부를 추적

  useEffect(() => {
    const myAPI = async () => {
      try {
        // 하드코딩된 부분을 최대한 없애자 집가서 !
        console.log('path', path);
        const res = await axiosGet(path);
        const dataRows = res.map(e => ({
          index: e.index,
          title: e.title,
          id: e.id,
          created: e.creation_timestamp,
        }));
        setRows(dataRows);
        setDataLoaded(true); // 데이터를 불러왔음을 표시
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    myAPI();
  }, []);
  const handleRowClick = index => {
    console.log('클릭된 로우의 인덱스:', path, index);
    // 여기에서 필요한 작업 수행
    // 하드코딩된 부분을 최대한 없애자 집가서 !
    router.push(path + '/detail/' + index);
  };

  return (
    <>
      {dataLoaded ? (
        <BaseTableList
          columns={columns}
          rows={rows}
          onRowClick={handleRowClick}
          useUrl={path.split('/')[1]}
          disabledWrite={true}
        />
      ) : (
        '데이터 로딩 중...' // 데이터를 로딩 중인 동안 표시될 메시지
      )}
    </>
  );
}

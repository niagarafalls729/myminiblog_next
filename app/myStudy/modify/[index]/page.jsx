'use client'

import { useState, useEffect } from 'react';
import BaseCreate from '@/components/create/BaseCreate'; 
import { savePost } from '@/api/baseGet';
import { usePathname, useParams } from 'next/navigation';

export default function CreateAndModify() {
    const [dataLoaded, setDataLoaded] = useState(false); // 데이터를 불러왔는지 여부를 추적
    const params = useParams();
    const path = usePathname();
    useEffect(() => { 
        setDataLoaded(true);  
    }, []);

    const modifyApi = async (e) =>{ 
        e.index = params.path
        const rtn = await savePost( path, e);
        alert(rtn.message);
        // 페이지를 이동합니다.
      //   {
      //     "title": "adsda",
      //     "contents": "<p>asdasd</p>",
      //     "id": "익명1944",
      //     "member_create": "N",
      //     "password": ""
      //      index: form.index,
      // }  

        router.push('/'+path[1]);
    }
  return (
    <>
      {dataLoaded ? (
        <>
            <BaseCreate save={modifyApi}></BaseCreate>
        </>
      ) : (
        <p>데이터 로딩 중...</p>
      )}
    </>
  );
}

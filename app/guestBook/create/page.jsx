'use client'

import { useState, useEffect } from 'react';
import BaseCreate from '@/components/create/BaseCreate'; 
import { savePost } from '@/api/baseGet';
import { usePathname, useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
export default function CreateAndModify() {
    const [dataLoaded, setDataLoaded] = useState(false); // 데이터를 불러왔는지 여부를 추적
    const path = usePathname();
    const router = useRouter();
    useEffect(() => {
      setDataLoaded(true);
     },[]);

    const createApi = async (e) =>{ 

      console.log("path",path,e)
        const rtn = await savePost( path+'/init', e);
        alert(rtn.message);
      //   {
      //     "title": "adsda",
      //     "contents": "<p>asdasd</p>",
      //     "id": "익명1944",
      //     "member_create": "N",
      //     "password": ""
      // }
        // 페이지를 이동합니다.
        router.push('/'+path.split('/')[1]);
    }
  return (
    <>
      {dataLoaded ? (
        <>
            <BaseCreate save={createApi}></BaseCreate>
        </>
      ) : (
        <p>데이터 로딩 중...</p>
      )}
    </>
  );
}

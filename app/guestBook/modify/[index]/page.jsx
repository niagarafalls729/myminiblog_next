'use client';

import { useState, useEffect } from 'react';
import BaseCreate from '@/components/create/BaseCreate';
import { savePost, axiosGet } from '@/api/baseGet';
import { usePathname, useParams, useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

export default function CreateAndModify() {
  const [dataLoaded, setDataLoaded] = useState(false); // 데이터를 불러왔는지 여부를 추적
  const [originForm, setOriginForm] = useState('');
  const params = useParams();
  const path = usePathname();
  const router = useRouter();
  useEffect(() => {
    console.log('Before fetching data');
    const fetchData = async () => {
      try {
        const detailRes = await axiosGet('guestBook', params);
        setOriginForm(detailRes[0]);
        setDataLoaded(true);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    console.log('After fetching data');
    fetchData();
  }, []);

  const modifyApi = async e => {
    e.index = params.index;
    const replacePath = path.replace('modify', 'create');
    const rtn = await savePost(replacePath, e);
    Swal.fire(rtn.message);
    // 페이지를 이동합니다.
    //   {
    //     "title": "adsda",
    //     "contents": "<p>asdasd</p>",
    //     "id": "익명1944",
    //     "member_create": "N",
    //     "password": ""
    //      index: form.index,
    // }

    router.push('/' + path.split('/')[1]);
  };
  return (
    <>
      {dataLoaded ? (
        <>
          <BaseCreate originForm={originForm} save={modifyApi}></BaseCreate>
        </>
      ) : (
        <p>데이터 로딩 중...</p>
      )}
    </>
  );
}

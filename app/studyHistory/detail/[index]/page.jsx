'use client';

import { useState, useEffect } from 'react';
import BaseDetail from '@/components/detail/BaseDetail';
import BaseReply from '@/components/detail/BaseReply';
import { axiosGet, savePost } from '@/api/baseGet';
import { useRouter, usePathname, useParams } from 'next/navigation';
import Swal from 'sweetalert2';

export default function studyHistoryDetail() {
  const [detailform, setDetailform] = useState([]);
  const [arrFrom, setArrFrom] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false); // 데이터를 불러왔는지 여부를 추적
  const params = useParams();
  const path = usePathname();
  const pathSplit = usePathname().split('/');
  const router = useRouter();

  useEffect(() => {
    console.log('Before fetching data');
    const fetchData = async () => {
      try {
        const [detailRes, replyRes] = await Promise.all([
          axiosGet(path.split('/')[1], params),
          axiosGet(path.split('/')[1] + '/reply', params),
        ]);
        console.log('Data fetched successfully', detailRes[0]);
        setDetailform(detailRes[0]);
        setArrFrom(replyRes);
        setDataLoaded(true);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    console.log('After fetching data');
    fetchData();
  }, []);

  const detailModify = () => {
    console.log('pathSplit', pathSplit[0], pathSplit[1], pathSplit[2]);
    // params 활용 자식에게 전달했다가 굳이 다시 부모에게 전달할필요없음.
    //editor 화면으로 보낸다.
    const replacePath = path.replace('detail', 'modify');
    router.push(replacePath);
  };

  const detailDelete = async () => {
    Swal.fire({
      title: '비밀번호를 입력해주세요',
      input: 'text',
      icon: 'warning',
      inputPlaceholder:
        detailform.password + '입력 당시 비밀번호를 입력해주세요',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      inputValidator: value => {
        return new Promise(async resolve => {
          if (value === detailform.password) {
            resolve();
            const replacePath = path.replace('detail', 'delete');
            const createForm = {
              index: params.index,
            };
            const rtn = await savePost(replacePath, createForm);

            Swal.fire(rtn.message);
            // // 페이지를 이동합니다.
            router.push('/' + pathSplit[1]);
          } else {
            return resolve('비밀번호가 틀렸습니다 :)');
          }
        });
      },
    });
  };
  const replyCreate = async e => {
    e.guestbook_fk = params.index;
    // 하드코딩된 부분을 최대한 없애자 집가서 !
    console.log('re', e);
    const rtn = await savePost(path.split('/')[1] + '/reply', e);
    Swal.fire(rtn.message);
    // 데이터를 다시 가져옵니다.
    const updatedData = await axiosGet(path.split('/')[1] + '/reply', params);
    // 상태를 업데이트하고 컴포넌트를 다시 렌더링합니다.
    setArrFrom(updatedData);
  };

  return (
    <>
      {dataLoaded ? (
        <>
          <BaseDetail
            detailform={detailform}
            onModi={detailModify}
            onDele={detailDelete}
          />
          <BaseReply
            arrFrom={arrFrom}
            onReplyC={replyCreate}
            useUrl={pathSplit[1]}
          />
        </>
      ) : (
        <p>데이터 로딩 중...</p>
      )}
    </>
  );
}

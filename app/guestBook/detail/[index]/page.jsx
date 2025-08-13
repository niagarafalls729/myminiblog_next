'use client';

import { useState, useEffect } from 'react';
import BaseDetail from '@/components/detail/BaseDetail';
import BaseReply from '@/components/detail/BaseReply';
import { axiosGet, savePost } from '@/api/baseGet';
import { useRouter, usePathname, useParams } from 'next/navigation';
import Swal from 'sweetalert2';

export default function guestBookDetail() {
  const [detailform, setDetailform] = useState(null);
  const [arrFrom, setArrFrom] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const path = usePathname();
  const pathSplit = usePathname().split('/');
  const router = useRouter();

  useEffect(() => {
    // params.index가 있을 때만 API 호출
    if (!params.index) {
      console.log('params.index가 없습니다.');
      setLoading(false);
      return;
    }

    console.log('상세 페이지 데이터 로딩 시작 - index:', params.index);
    setLoading(true);

    const fetchData = async () => {
      try {
        console.log('API 호출 시작');
        // 새로운 단일 게시글 조회 API 사용
        const [detailRes, replyRes] = await Promise.all([
          axiosGet(`guestBook/detail/${params.index}`),
          axiosGet('guestBook/reply', { index: params.index }),
        ]);
        
        console.log('API 호출 완료:', {
          detailRes,
          replyRes
        });
        
        setDetailform(detailRes);
        setArrFrom(replyRes || []);
      } catch (error) {
        console.error('데이터 로딩 실패:', error);
        setDetailform(null);
        setArrFrom([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.index]); // params.index가 변경될 때만 실행

  const detailModify = () => {
    console.log('수정 페이지로 이동:', pathSplit);
    const replacePath = path.replace('detail', 'modify');
    router.push(replacePath);
  };

  const detailDelete = async () => {
    if (!detailform) {
      Swal.fire('데이터가 없습니다.');
      return;
    }

    Swal.fire({
      title: '비밀번호를 입력해주세요',
      input: 'text',
      icon: 'warning',
      inputPlaceholder: detailform.password + '입력 당시 비밀번호를 입력해주세요',
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
    console.log('댓글 생성:', e);
    
    try {
      const rtn = await savePost('guestBook/reply', e);
      Swal.fire(rtn.message);
      
      // 댓글 목록만 다시 가져오기
      const updatedData = await axiosGet('guestBook/reply', { index: params.index });
      setArrFrom(updatedData || []);
    } catch (error) {
      console.error('댓글 생성 실패:', error);
      Swal.fire('댓글 생성에 실패했습니다.');
    }
  };

  // 로딩 중일 때
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '200px',
        fontSize: '18px',
        color: '#666'
      }}>
        데이터 로딩 중...
      </div>
    );
  }

  // 데이터가 없을 때
  if (!detailform) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '200px',
        fontSize: '18px',
        color: '#666'
      }}>
        게시글을 찾을 수 없습니다.
      </div>
    );
  }

  return (
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
  );
}

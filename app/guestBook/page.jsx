'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import BaseTableList from '../../components/table/BaseTableList';
import { axiosGet } from '../../api/baseGet';
import styles from './guestBook.module.css';
import { IoAdd } from 'react-icons/io5';

export default function GuestBook() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  
  // URL에서 페이지 파라미터 읽기 (기본값: 1)
  const urlPage = parseInt(searchParams.get('page')) || 1;
  
  const [rows, setRows] = useState([]);
  const [pagination, setPagination] = useState({
    page: urlPage,
    limit: 10,
    total: 0,
    totalPages: 0
  });
  const [loading, setLoading] = useState(false);

  // 모바일 체크
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const columns = [
    { id: 'GUESTBOOK_ID', label: '번호', align: 'center', width: '80px' },
    { id: 'TITLE', label: '제목', width: 'auto' },
    { id: 'AUTHOR', label: '작성자', align: 'center', width: '100px' },
    { id: 'CREATED_AT', label: '작성일', align: 'center', width: '120px' }
  ];

  const fetchData = async (page = 1, limit = 10) => {
    console.log('fetchData 호출 - page:', page);
    setLoading(true);
    try {
      const response = await axiosGet('/guestBook', { page, limit });
      console.log('API 응답:', response);
      console.log('API 응답 데이터 길이:', response.data.length);
      console.log('API 응답 pagination:', response.pagination);
      
      // 첫 번째 데이터의 구조 확인
      if (response.data && response.data.length > 0) {
        console.log('첫 번째 데이터 구조:', response.data[0]);
        console.log('title 값:', response.data[0].title);
        console.log('contents 값:', response.data[0].contents);
        console.log('id 값:', response.data[0].id);
        console.log('index 값:', response.data[0].index);
        console.log('creation_timestamp 값:', response.data[0].creation_timestamp);
      }

      if (response.data && response.pagination) {
        // 데이터 변환 - API 응답 구조에 맞게 수정
        const transformedData = response.data.map(item => {
          // 날짜 처리 개선
          let formattedDate = '날짜 없음';
          if (item.creation_timestamp) {
            try {
              // 이미 한국 시간으로 변환된 문자열이므로 직접 사용
              formattedDate = item.creation_timestamp;
            } catch (error) {
              console.log('날짜 변환 오류:', error);
              formattedDate = item.creation_timestamp || '날짜 없음';
            }
          }
          
          // 댓글 개수를 제목에 추가
          const titleWithReplyCount = item.replyCount > 0 
            ? `${item.title} (${item.replyCount})` 
            : item.title;
          
          return {
            GUESTBOOK_ID: item.index || '',
            TITLE: titleWithReplyCount || '',      // 댓글 개수가 포함된 제목
            CONTENT: item.contents || '', // contents를 내용으로
            AUTHOR: item.id || '',
            CREATED_AT: formattedDate
          };
        });

        console.log('변환된 데이터:', transformedData);
        console.log('변환된 데이터 길이:', transformedData.length);

        setRows(transformedData);
        setPagination(response.pagination);
        console.log('상태 업데이트 완료 - rows:', transformedData.length, 'pagination:', response.pagination);
      }
    } catch (error) {
      console.error('데이터 가져오기 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  // URL 파라미터가 변경될 때마다 데이터 가져오기
  useEffect(() => {
    console.log('URL 페이지 변경 감지:', urlPage);
    fetchData(urlPage, 10);
  }, [urlPage]);

  const handlePageChange = (newPage) => {
    console.log('handlePageChange 호출 - newPage:', newPage);
    
    if (newPage === undefined || newPage === null || isNaN(newPage)) {
      console.log('유효하지 않은 페이지 번호:', newPage);
      return;
    }

    // API는 1-indexed, frontend는 0-indexed이므로 +1
    const apiPage = newPage + 1;
    console.log('API 호출할 페이지:', apiPage);

    // URL 업데이트
    const params = new URLSearchParams(searchParams);
    params.set('page', apiPage.toString());
    router.push(`/guestBook?${params.toString()}`);
  };

  // 로우 클릭 핸들러 추가
  const handleRowClick = (rowData) => {
    console.log('로우 클릭:', rowData);
    if (rowData && rowData.GUESTBOOK_ID) {
      router.push(`/guestBook/detail/${rowData.GUESTBOOK_ID}`);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>방명록</h1>
        <button 
          onClick={() => router.push('/guestBook/create')}
          className={styles.addButton}
        >
          <IoAdd size={24} />
        </button>
      </div>
      <div className={styles.tableWrapper}>
        <BaseTableList
          columns={columns}
          rows={rows}
          pagination={pagination}
          onPageChange={handlePageChange}
          onRowClick={handleRowClick}
          loading={loading}
          dataLoaded={true}
        />
      </div>
    </div>
  );
}

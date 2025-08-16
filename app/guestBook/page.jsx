'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import BaseTableList from '../../components/table/BaseTableList';
import { axiosGet } from '../../api/baseGet';
import styles from './guestBook.module.css';
import { IoAdd } from 'react-icons/io5';
import Link from 'next/link';

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
    { id: 'TITLE', label: '제목', width: '80%', padding: '20px' },
    { id: 'AUTHOR', label: '작성자', align: 'center', width: '10%', padding: '16px 8px' },
    { id: 'CREATED_AT', label: '작성일', align: 'center', width: '10%', padding: '16px 8px' }
  ];

  // 날짜 형식을 YY-MM-DD HH:mm으로 변환하는 함수
  const formatDate = (dateString) => {
    if (!dateString) return '날짜 없음';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        // 이미 한국 시간 형식인 경우 (예: "2025-08-16 21:56")
        const match = dateString.match(/(\d{4})-(\d{2})-(\d{2})\s+(\d{2}):(\d{2})/);
        if (match) {
          const year = match[1].slice(-2); // 뒤의 2자리만
          const month = match[2];
          const day = match[3];
          const hour = match[4];
          const minute = match[5];
          return `${year}-${month}-${day} ${hour}:${minute}`;
        }
        return dateString;
      }
      
      // UTC 시간을 한국 시간으로 변환
      const koreanTime = new Date(date.getTime() + (9 * 60 * 60 * 1000));
      const year = koreanTime.getFullYear().toString().slice(-2);
      const month = String(koreanTime.getMonth() + 1).padStart(2, '0');
      const day = String(koreanTime.getDate()).padStart(2, '0');
      const hour = String(koreanTime.getHours()).padStart(2, '0');
      const minute = String(koreanTime.getMinutes()).padStart(2, '0');
      
      return `${year}-${month}-${day} ${hour}:${minute}`;
    } catch (error) {
      console.log('날짜 변환 오류:', error);
      return dateString;
    }
  };

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
          // 날짜 처리 개선 - YY-MM-DD HH:mm 형식으로 변환
          const formattedDate = formatDate(item.creation_timestamp);
          
          return {
            GUESTBOOK_ID: item.index || '', // 디테일 페이지 이동을 위해 필요
            TITLE: item.title || '',      // 제목
            CONTENT: item.contents || '', // contents를 내용으로
            AUTHOR: item.id || '',
            CREATED_AT: formattedDate,
            COMMENT_COUNT: item.replyCount || 0 // 댓글 수를 별도 필드로 추가
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

  useEffect(() => {
    fetchData(urlPage);
  }, [urlPage]);

  const handlePageChange = (newPage) => {
    console.log('페이지 변경:', newPage);
    const nextPage = newPage + 1; // 0-based를 1-based로 변환
    router.push(`/guestBook?page=${nextPage}`);
  };

  const handleRowClick = (rowData) => {
    console.log('행 클릭:', rowData);
    // 상세 페이지로 이동
    if (rowData && rowData.GUESTBOOK_ID) {
      router.push(`/guestBook/detail/${rowData.GUESTBOOK_ID}`);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>방명록</h1>
        <Link href="/guestBook/create" className={styles.createButton}>
          <IoAdd />
          글쓰기
        </Link>
      </div>
      
      <BaseTableList
        columns={columns}
        rows={rows}
        onRowClick={handleRowClick}
        useUrl="guestBook"
        pagination={pagination}
        onPageChange={handlePageChange}
        loading={loading}
        variant="minimal"
        hoverEffect={true}
        striped={false}
      />
    </div>
  );
}

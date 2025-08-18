'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import BaseTableList from '../../components/table/BaseTableList';
import { axiosGet } from '../../api/baseGet';
import styles from './dcbest.module.css';

export default function DCBest() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  // URL에서 페이지 파라미터 읽기 (기본값: 1)
  const urlPage = parseInt(searchParams.get('page')) || 1;
  const urlSearch = searchParams.get('search') || '';

  const [rows, setRows] = useState([]);
  const [pagination, setPagination] = useState({
    page: urlPage,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(urlSearch);

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
    { id: 'TITLE', label: '제목', width: '70%', padding: '20px' },
    {
      id: 'AUTHOR',
      label: '작성자',
      align: 'center',
      width: '15%',
      padding: '16px 8px',
    },
    {
      id: 'VIEW_COUNT',
      label: '조회수',
      align: 'center',
      width: '8%',
      padding: '16px 8px',
    },
    {
      id: 'POST_DATE',
      label: '작성일',
      align: 'center',
      width: '12%',
      padding: '16px 8px',
    },
  ];

  // 날짜 형식을 MM-DD HH:mm으로 변환하는 함수
  const formatDate = dateString => {
    if (!dateString) return '날짜 없음';

    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        // 이미 한국 시간 형식인 경우 (예: "2025-08-16 21:56")
        const match = dateString.match(
          /(\d{4})-(\d{2})-(\d{2})\s+(\d{2}):(\d{2})/
        );
        if (match) {
          const month = match[2];
          const day = match[3];
          const hour = match[4];
          const minute = match[5];
          return `${month}-${day} ${hour}:${minute}`;
        }
        return dateString;
      }

      // UTC 시간을 한국 시간으로 변환
      const koreanTime = new Date(date.getTime() + 9 * 60 * 60 * 1000);
      const month = String(koreanTime.getMonth() + 1).padStart(2, '0');
      const day = String(koreanTime.getDate()).padStart(2, '0');
      const hour = String(koreanTime.getHours()).padStart(2, '0');
      const minute = String(koreanTime.getMinutes()).padStart(2, '0');

      return `${month}-${day} ${hour}:${minute}`;
    } catch (error) {
      console.log('날짜 변환 오류:', error);
      return dateString;
    }
  };

  const fetchData = async (page = 1, limit = 10, search = '') => {
    console.log('fetchData 호출 - page:', page, 'search:', search);
    setLoading(true);
    try {
      const response = await axiosGet('/dcbest', { page, limit, search });
      console.log('API 응답:', response);
      console.log('API 응답 데이터 길이:', response.data.length);
      console.log('API 응답 pagination:', response.pagination);

      // 첫 번째 데이터의 구조 확인
      if (response.data && response.data.length > 0) {
        console.log('첫 번째 데이터 구조:', response.data[0]);
      }

      if (response.data && response.pagination) {
        // 데이터 변환 - API 응답 구조에 맞게 수정
        const transformedData = response.data.map(item => {
          // 날짜 처리 개선 - YY-MM-DD HH:mm 형식으로 변환
          const formattedDate = formatDate(item.POST_DATE);

          return {
            POST_ID: item.POST_ID || '', // 디테일 페이지 이동을 위해 필요
            TITLE: item.TITLE || '', // 제목
            CONTENT: item.CONTENT || '', // 내용
            AUTHOR: item.AUTHOR || '',
            VIEW_COUNT: item.VIEW_COUNT || 0,
            POST_DATE: formattedDate,
            POST_URL: item.POST_URL || '',
          };
        });

        console.log('변환된 데이터:', transformedData);
        console.log('변환된 데이터 길이:', transformedData.length);

        setRows(transformedData);
        setPagination(response.pagination);
        console.log(
          '상태 업데이트 완료 - rows:',
          transformedData.length,
          'pagination:',
          response.pagination
        );
      }
    } catch (error) {
      console.error('데이터 가져오기 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(urlPage, 10, urlSearch);
  }, [urlPage, urlSearch]);

  const handlePageChange = newPage => {
    console.log('페이지 변경:', newPage);
    const nextPage = newPage + 1; // 0-based를 1-based로 변환
    const params = new URLSearchParams();
    params.set('page', nextPage.toString());
    if (searchTerm) {
      params.set('search', searchTerm);
    }
    router.push(`/dcbest?${params.toString()}`);
  };

  const handleSearch = searchValue => {
    console.log('검색:', searchValue);
    setSearchTerm(searchValue);
    const params = new URLSearchParams();
    params.set('page', '1'); // 검색 시 첫 페이지로 이동
    if (searchValue.trim()) {
      params.set('search', searchValue.trim());
    }
    router.push(`/dcbest?${params.toString()}`);
  };

  const handleRowClick = rowData => {
    console.log('행 클릭:', rowData);
    // 상세 페이지로 이동
    if (rowData && rowData.POST_ID) {
      router.push(`/dcbest/detail/${rowData.POST_ID}`);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>실베</h1>
        <div className={styles.subtitle}>디시인사이드 실시간베스트 게시글</div>
      </div>

      <div className={styles.tableWrapper}>
        <BaseTableList
          columns={columns}
          rows={rows}
          onRowClick={handleRowClick}
          useUrl="dcbest"
          pagination={pagination}
          onPageChange={handlePageChange}
          loading={loading}
          variant="minimal"
          hoverEffect={true}
          striped={false}
          searchValue={searchTerm}
          onSearch={handleSearch}
        />
      </div>
    </div>
  );
}

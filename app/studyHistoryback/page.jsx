'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import BaseTableList from '../../components/table/BaseTableList';
import { axiosGet } from '../../api/baseGet';

export default function StudyHistoryBack() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
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

  const columns = [
    { id: 'STUDY_HISTORY_ID', label: '번호', align: 'center' },
    { id: 'TITLE', label: '제목' },
    { id: 'CONTENT', label: '내용' },
    { id: 'AUTHOR', label: '작성자' },
    { id: 'CREATED_AT', label: '작성일' }
  ];

  const fetchData = async (page = 1, limit = 10) => {
    console.log('fetchData 호출 - page:', page);
    setLoading(true);
    try {
      const response = await axiosGet('/studyHistoryback', { page, limit });
      console.log('API 응답:', response);
      console.log('API 응답 데이터 길이:', response.data.length);
      console.log('API 응답 pagination:', response.pagination);
      
      // 첫 번째 데이터의 구조 확인
      if (response.data && response.data.length > 0) {
        console.log('첫 번째 데이터 구조:', response.data[0]);
        console.log('CREATED_AT 원본 값:', response.data[0].CREATED_AT);
        console.log('CREATED_AT 타입:', typeof response.data[0].CREATED_AT);
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
          
          return {
            STUDY_HISTORY_ID: item.index || '',
            TITLE: item.title || '',
            CONTENT: item.contents || '',
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
    router.push(`/studyHistoryback?${params.toString()}`);
  };

  return (
    <div>
      <h1>학습 기록</h1>
      <BaseTableList
        columns={columns}
        rows={rows}
        pagination={pagination}
        onPageChange={handlePageChange}
        loading={loading}
        dataLoaded={true}
      />
    </div>
  );
}

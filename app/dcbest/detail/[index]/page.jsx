'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { axiosGet } from '../../../../api/baseGet';
import styles from './detail.module.css';
import { IoArrowBack, IoEye, IoTime, IoPerson } from 'react-icons/io5';
import Link from 'next/link';

export default function DCBestDetail() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const postId = params.index;

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

  // 이미지 경로를 서버 URL로 변환하는 함수
  const fixImagePaths = (content) => {
    if (typeof content !== 'string') return content;
    
    // 환경변수에서 API URL 가져오기
    const apiUrl = process.env.NEXT_PUBLIC_API_KEY || 'http://localhost:4000';
    
    console.log('이미지 경로 수정 전:', content);
    
    // /crawled_images/ 경로를 서버 URL로 변경
    let modifiedContent = content.replace(
      /src="\/crawled_images\//g, 
      `src="${apiUrl}/crawled_images/`
    );
    
    // onerror 이벤트 핸들러 제거 (reload_img 오류 방지)
    modifiedContent = modifiedContent.replace(
      /onerror="[^"]*"/g,
      'onerror="this.style.display=\'none\';"'
    );
    
    console.log('이미지 경로 수정 후:', modifiedContent);
    console.log('API URL:', apiUrl);
    
    return modifiedContent;
  };

  const fetchPostDetail = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axiosGet(`/dcbest/${postId}`);
      console.log('게시글 상세 응답:', response);
      console.log('response.data:', response.data);
      console.log('CONTENT 타입:', typeof response?.CONTENT);
      console.log('CONTENT 값:', response?.CONTENT);
      console.log('전체 post 객체:', response);
      
      if (response) {
        // API 응답 구조: { POST_ID, TITLE, ... }
        const postData = response;
        
        console.log('✅ 데이터 받음:', postData);
         
         // CONTENT가 [object Object]인 경우 처리
         let content = postData.CONTENT;
         if (content === '[object Object]' || typeof content === 'object') {
           content = '게시글 내용을 불러올 수 없습니다.';
         }
         
         // 이미지 경로 수정
         content = fixImagePaths(content);
         
         // 날짜 포맷팅
         const formattedDate = formatDate(postData.POST_DATE);
         
         setPost({
           ...postData,
           CONTENT: content,
           POST_DATE: formattedDate
         });
       } else {
         setError('게시글을 찾을 수 없습니다.');
       }
    } catch (error) {
      console.error('게시글 상세 조회 실패:', error);
      setError('게시글을 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (postId) {
      fetchPostDetail();
    }
  }, [postId]);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>게시글을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h2>오류 발생</h2>
          <p>{error}</p>
          <Link href="/dcbest" className={styles.backButton}>
            <IoArrowBack />
            목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h2>게시글을 찾을 수 없습니다</h2>
          <Link href="/dcbest" className={styles.backButton}>
            <IoArrowBack />
            목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href="/dcbest" className={styles.backButton}>
          <IoArrowBack />
          목록으로
        </Link>
        <h1 className={styles.title}>실시간베스트</h1>
      </div>

      <div className={styles.postContainer}>
        <div className={styles.postHeader}>
          <h2 className={styles.postTitle}>{post.TITLE}</h2>
          <div className={styles.postMeta}>
            <div className={styles.metaItem}>
              <IoPerson />
              <span>{post.AUTHOR || '익명'}</span>
            </div>
            <div className={styles.metaItem}>
              <IoTime />
              <span>{post.POST_DATE}</span>
            </div>
            <div className={styles.metaItem}>
              <IoEye />
              <span>조회수 {post.VIEW_COUNT || 0}</span>
            </div>
          </div>
        </div>

                 <div className={styles.postContent}>
           <div className={styles.content}>
             {typeof post.CONTENT === 'string' ? (
               <div dangerouslySetInnerHTML={{ __html: post.CONTENT }} />
             ) : (
               <div>
                 <p>게시글 내용을 불러올 수 없습니다.</p>
                 <p>콘솔에서 데이터 구조를 확인해주세요.</p>
                 <pre style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                   {JSON.stringify(post.CONTENT, null, 2)}
                 </pre>
               </div>
             )}
           </div>
         </div>

        {post.POST_URL && (
          <div className={styles.originalLink}>
            <a 
              href={post.POST_URL} 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.linkButton}
            >
              원본 게시글 보기
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

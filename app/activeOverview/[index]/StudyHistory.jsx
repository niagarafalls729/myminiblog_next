'use client';

import { useEffect, useState } from 'react';
import styles from './StudyHistory.module.css';

export default function Board() {
  const [isMounted, setIsMounted] = useState(false);
  const [posts, setPosts] = useState([
    { id: 1, title: 'React 기본 개념', author: '홍길동', date: '2024-03-13' },
    { id: 2, title: 'Next.js 서버 구성', author: '김철수', date: '2024-03-12' },
    {
      id: 3,
      title: 'CSS Module 스타일링',
      author: '이영희',
      date: '2024-03-10',
    },
  ]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      {isMounted && (
        <div className={styles['container']}>
          <h1 className={styles['title']}>📋 게시판</h1>

          <table className={styles['table']}>
            <thead>
              <tr>
                <th className={styles['th']}>번호</th>
                <th className={styles['th']}>제목</th>
                <th className={styles['th']}>작성자</th>
                <th className={styles['th']}>작성일</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post, index) => (
                <tr key={post.id} className={styles['tr']}>
                  <td className={styles['td']}>{posts.length - index}</td>
                  <td className={styles['td-title']}>{post.title}</td>
                  <td className={styles['td']}>{post.author}</td>
                  <td className={styles['td']}>{post.date}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button className={styles['write-btn']}>글쓰기</button>
        </div>
      )}
    </>
  );
}

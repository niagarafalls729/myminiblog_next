'use client';

import { useEffect, useState } from 'react';
import GitHubCalendar from 'react-github-calendar';
import axios from 'axios';
import dayjs from 'dayjs';
import styles from './Github.module.css';

export default function Github() {
  const [combinedCommits, setCombinedCommits] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedCommits, setDisplayedCommits] = useState([]);
  const commitsPerPage = 10; // 한 번에 보여줄 커밋 개수

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const owner = process.env.NEXT_PUBLIC_GITHUB || 'niagarafalls729';
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

  const fetchAllCommits = async repo => {
    let page = 1;
    const perPage = 100;
    let allCommits = [];

    try {
      while (true) {
        const url = `https://api.github.com/repos/${owner}/${repo}/commits?per_page=${perPage}&page=${page}`;
        
        const config = token ? {
          headers: {
            Authorization: `token ${token}`,
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'niagarafalls729-blog'
          },
        } : {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'niagarafalls729-blog'
          }
        };

        const response = await axios.get(url, config);
        
        if (response.data.length === 0) {
          break;
        }

        const commitsWithRepo = response.data.map(commit => ({
          ...commit,
          repo: repo
        }));

        allCommits = [...allCommits, ...commitsWithRepo];
        page++;
      }
    } catch (error) {
      console.error(`Error fetching commits for ${repo}:`, error);
      throw error;
    }

    return allCommits;
  };

  useEffect(() => {
    const reactRepo = 'myminiblog_next';
    const reactNode = 'node_api_blog';

    const fetchCommits = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let reactCommits = [];
        let nodeCommits = [];
        
        try {
          reactCommits = await fetchAllCommits(reactRepo);
        } catch (error) {
          console.error(`${reactRepo} 저장소 오류:`, error);
          setError(`${reactRepo} 저장소 오류: ${error.message}`);
          return;
        }
        
        try {
          nodeCommits = await fetchAllCommits(reactNode);
        } catch (error) {
          console.error(`${reactNode} 저장소 오류:`, error);
          setError(`${reactNode} 저장소 오류: ${error.message}`);
          return;
        }

        const allCommits = [...reactCommits, ...nodeCommits];
        const sortedCommits = allCommits.sort((a, b) => 
          new Date(b.commit.author.date) - new Date(a.commit.author.date)
        );

        setCombinedCommits(sortedCommits);
        setDisplayedCommits(sortedCommits.slice(0, commitsPerPage));
        setHasMore(sortedCommits.length > commitsPerPage);
        setCurrentPage(1);
      } catch (error) {
        console.error('Error fetching commits:', error);
        setError('커밋 데이터를 가져오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    if (isMounted) {
      fetchCommits();
    }
  }, [isMounted, owner, token]);

  const loadMore = () => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    
    const nextPage = currentPage + 1;
    const startIndex = (nextPage - 1) * commitsPerPage;
    const endIndex = startIndex + commitsPerPage;
    const newCommits = combinedCommits.slice(startIndex, endIndex);
    
    setDisplayedCommits(prev => [...prev, ...newCommits]);
    setCurrentPage(nextPage);
    setHasMore(endIndex < combinedCommits.length);
    setLoadingMore(false);
  };

  if (!isMounted) {
    return null;
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <p className={styles.loadingText}>GitHub 활동을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.errorContainer}>
          <div className={styles.errorIcon}>⚠️</div>
          <h3 className={styles.errorTitle}>오류가 발생했습니다</h3>
          <p className={styles.errorMessage}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>GitHub 활동</h1>
        <p className={styles.subtitle}>나의 개발 활동 히스토리를 확인해보세요</p>
      </div>

      <div className={styles.calendarSection}>
        <h2 className={styles.sectionTitle}>📅 커밋 캘린더</h2>
        <div className={styles.calendarWrapper}>
          <GitHubCalendar username={owner} />
        </div>
      </div>

      <div className={styles.commitsSection}>
        <h2 className={styles.sectionTitle}>📝 최근 커밋 내역</h2>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr>
                <th className={`${styles.th} ${styles.thRepo}`}>저장소</th>
                <th className={`${styles.th} ${styles.thMessage}`}>커밋 메시지</th>
                <th className={`${styles.th} ${styles.thDate}`}>날짜</th>
              </tr>
            </thead>
            <tbody>
              {displayedCommits.map((commit, index) => (
                <tr key={`${commit.sha}-${index}`} className={styles.tableRow}>
                  <td className={`${styles.td} ${styles.tdRepo}`}>
                    <span className={`${styles.repoBadge} ${
                      commit.repo === 'myminiblog_next' ? styles.frontend : styles.backend
                    }`}>
                      {commit.repo === 'myminiblog_next' ? 'Frontend' : 'Backend'}
                    </span>
                  </td>
                  <td className={`${styles.td} ${styles.tdMessage}`}>
                    <div className={styles.commitMessage}>
                      <span className={styles.messageText}>{commit.commit.message}</span>
                      <span className={styles.commitHash}>{commit.sha.substring(0, 7)}</span>
                    </div>
                  </td>
                  <td className={`${styles.td} ${styles.tdDate}`}>
                    <span className={styles.dateText}>
                      {dayjs(commit.commit.author.date).format('YYYY-MM-DD HH:mm')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {hasMore && (
          <div className={styles.loadMoreContainer}>
            <button 
              onClick={loadMore} 
              disabled={loadingMore}
              className={styles.loadMoreButton}
            >
              {loadingMore ? (
                <>
                  <div className={styles.loadingSpinner}></div>
                  로딩 중...
                </>
              ) : (
                '더보기'
              )}
            </button>
            <p className={styles.loadMoreInfo}>
              {displayedCommits.length} / {combinedCommits.length} 커밋 표시됨
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

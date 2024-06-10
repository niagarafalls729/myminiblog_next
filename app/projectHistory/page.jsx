'use client';

import { useEffect, useState } from 'react';
import GitHubCalendar from 'react-github-calendar';
import axios from 'axios';
import dayjs from 'dayjs';
import styles from './projectHistory.module.css';
export default function History() {
  const [commits, setCommits] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsMounted(true);
    fetchCommits();
  }, []);

  const fetchCommits = async () => {
    const owner = process.env.NEXT_PUBLIC_GITHUB;
    const repo = 'myminiblog_next';
    const url = `https://api.github.com/repos/${owner}/${repo}/commits`;
    const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `token ${token}`,
        },
      });
      setCommits(response.data);
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <>
      {isMounted && (
        <>
          <div className={styles['wrap']}>
            <div className={styles['left']}></div>
            <div className={styles['right']}>
              <p>
                1,일단 여기다가 깃허브를 어떻게든 연동을 시켜서 커밋 기록을
                손쉽게 볼 수 있도록한다.
                <br />
                2.날짜 api 자동으로 하루에 한번
                <br />
                3.DB 자동 닫힘을 방지해서 하루에 한번 select문이든 뭐든
                의미없어보이는 행동 db로 연결
                <br />
                4.방문자 ip 수집
                <br />
                ... 위 사항은 모바일 환경 고려해서 반응형으로 개발
                <br />
              </p>
              <GitHubCalendar
                username={process.env.NEXT_PUBLIC_GITHUB}
                showWeekdayLabels
              />
              <ul>
                {commits.map(e => (
                  <li key={e.sha}>
                    <strong>{e.commit.message}</strong>-{' '}
                    {dayjs(e.commit.author.date).format('YYYY-MM-DD')}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
}

'use client';

import { useEffect, useState } from 'react';
import GitHubCalendar from 'react-github-calendar';
import axios from 'axios';
import dayjs from 'dayjs';
export default function Github() {
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
          <div style={{ paddingTop: '20px' }}>
            <br />
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
        </>
      )}
    </>
  );
}

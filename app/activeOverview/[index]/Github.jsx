'use client';

import { useEffect, useState } from 'react';
import GitHubCalendar from 'react-github-calendar';
import axios from 'axios';
import dayjs from 'dayjs';
export default function Github() {
  const [isReact, setIsReact] = useState([]);
  const [isNode, setIsNode] = useState([]);
  const [combinedCommits, setCombinedCommits] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const owner = process.env.NEXT_PUBLIC_GITHUB;
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
  const fetchAllCommits = async repo => {
    let page = 1;
    const perPage = 100;
    let allCommits = [];

    while (true) {
      const url = `https://api.github.com/repos/${owner}/${repo}/commits?per_page=${perPage}&page=${page}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `token ${token}`,
        },
      });

      if (response.data.length === 0) {
        break;
      }
      allCommits = allCommits.concat(response.data);
      page += 1;
    }

    return allCommits;
  };
  useEffect(() => {
    const reactRepo = 'myminiblog_next';
    const reactNode = 'node_api_blog';

    const fetchCommits = async () => {
      try {
        const [reactCommits, nodeCommits] = await Promise.all([
          fetchAllCommits(reactRepo),
          fetchAllCommits(reactNode),
        ]);

        const combined = [...reactCommits, ...nodeCommits];
        combined.sort(
          (a, b) =>
            new Date(b.commit.author.date) - new Date(a.commit.author.date)
        );
        setCombinedCommits(combined);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCommits();
  }, []);

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
              {combinedCommits.map(e => (
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

'use client';

import { useEffect, useState } from 'react';
import GitHubCalendar from 'react-github-calendar';
import axios from 'axios';
import dayjs from 'dayjs';

export default function Github() {
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

      const commitsWithRepoName = response.data.map(e => ({
        ...e,
        repoName: repo === 'myminiblog_next' ? 'server' : 'front',
      }));

      allCommits = allCommits.concat(commitsWithRepoName);
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

        const combined = [...reactCommits, ...nodeCommits].sort(
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
        <div style={{ paddingTop: '20px', padding: '0 10px', width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <GitHubCalendar username={owner} showWeekdayLabels />
          </div>
          <div style={{ overflowX: 'auto', marginTop: '20px' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                minWidth: '600px',
              }}
            >
              <thead>
                <tr style={{ backgroundColor: '#f4f4f4' }}>
                  <th style={{ border: '1px solid #ddd', padding: '10px' }}>
                    Repository
                  </th>
                  <th
                    style={{
                      border: '1px solid #ddd',
                      padding: '10px',
                      maxWidth: '600px',
                    }}
                  >
                    Commit Message
                  </th>
                  <th
                    style={{
                      border: '1px solid #ddd',
                      padding: '10px',
                      textAlign: 'right',
                      minWidth: '130px',
                    }}
                  >
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {combinedCommits.map(e => (
                  <tr key={e.sha}>
                    <td style={{ border: '1px solid #ddd', padding: '10px' }}>
                      {e.repoName}
                    </td>
                    <td style={{ border: '1px solid #ddd', padding: '10px' }}>
                      {e.commit.message}
                    </td>
                    <td
                      style={{
                        border: '1px solid #ddd',
                        padding: '10px',
                        textAlign: 'right',
                      }}
                    >
                      {dayjs(e.commit.author.date).format('YYYY-MM-DD')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

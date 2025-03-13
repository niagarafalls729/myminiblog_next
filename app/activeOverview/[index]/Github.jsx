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
        <div className={styles.container}>
          <div className={styles.calendarWrapper}>
            <GitHubCalendar username={owner} showWeekdayLabels />
          </div>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead className={styles.thead}>
                <tr>
                  <th className={`${styles.th} ${styles.thRepo}`}>
                    Repository
                  </th>
                  <th className={`${styles.th} ${styles.thMessage}`}>
                    Commit Message
                  </th>
                  <th className={`${styles.th} ${styles.thDate}`}>Date</th>
                </tr>
              </thead>
              <tbody>
                {combinedCommits.map(e => (
                  <tr key={e.sha}>
                    <td className={`${styles.td} ${styles.tdRepo}`}>
                      {e.repoName}
                    </td>
                    <td className={`${styles.td} ${styles.tdMessage}`}>
                      {e.commit.message}
                    </td>
                    <td className={`${styles.td} ${styles.tdDate}`}>
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

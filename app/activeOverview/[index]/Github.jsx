'use client';

import { useEffect, useState } from 'react';
import GitHubCalendar from 'react-github-calendar';
import axios from 'axios';
import dayjs from 'dayjs';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
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
      const commitsWithRepoName = [];
      for (let e of response.data) {
        if (repo == 'myminiblog_next') {
          e.repoName = 'server';
        } else {
          e.repoName = 'front';
        }

        commitsWithRepoName.push(e);
      }

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
            {/* 
            <ul>
              {combinedCommits.map(e => (
                <li key={e.sha}>
                  <span></span>
                  <strong></strong>-{' '}
                
                </li>
              ))}
            </ul> 
            */}

            <TableContainer sx={{ maxWidth: 1050 }} component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>repository</TableCell>
                    <TableCell>commit coment</TableCell>
                    <TableCell align="right">date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {combinedCommits.map(e => (
                    <TableRow key={e.sha}>
                      <TableCell sx={{ width: 100 }}>{e.repoName}</TableCell>
                      <TableCell>{e.commit.message}</TableCell>
                      <TableCell sx={{ width: 120 }} align="right">
                        {dayjs(e.commit.author.date).format('YYYY-MM-DD')}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </>
      )}
    </>
  );
}

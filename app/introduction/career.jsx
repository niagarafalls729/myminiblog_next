'use client';
import styles from './career.module.css';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { axiosGetMain } from '@/api/baseGet';
import { useState, useEffect, forwardRef } from 'react';
import React from 'react';
const mapData = [
  {
    company: 'MDS테크',
    company_from_to: '2022-05-16~재직중',
    projects: [
      {
        project: '파킹프렌즈',
        project_from_to: '2022-05-16~진행중',
        desc: null,
        stack: null,
        work: null,
      },
      {
        project: '그룹웨어 이관',
        project_from_to: '2022-09-01~2022-12-20',
        desc: null,
        stack: null,
        work: null,
      },
      {
        project: '카플릭스',
        project_from_to: '2023-02-01~진행중',
        desc: null,
        stack: null,
        work: null,
      },
    ],
  },
  {
    company: '에쓰푸드',
    company_from_to: '2021-11-08~2022-05-02',
    projects: [
      {
        project: 'Fresh On',
        project_from_to: '2021-11-08~2022-05-02',
        desc: null,
        stack: null,
        work: null,
      },
      {
        project: '존쿡마켓',
        project_from_to: '2021-12-01~2022-05-02',
        desc: null,
        stack: null,
        work: null,
      },
    ],
  },
  {
    company: '한국비즈넷',
    company_from_to: '2019-09-16~2022-11-15',
    projects: [
      {
        project: 'Online CRM',
        project_from_to: '2019-09-16~2021-11-05',
        desc: null,
        stack: null,
        work: null,
      },
      {
        project: '기타 홈페이지 유지보수',
        project_from_to: '2019-09-16~2021-11-05',
        desc: null,
        stack: null,
        work: null,
      },
      {
        project: 'GSABIS',
        project_from_to: '2019-09-16~2021-11-05',
        desc: '해외 물류 ERP',
        stack: '넥사크로,자바,티베로,제우스,오즈리포트',
        work: '해외 물류중 주로 해운,항운 컨테이너 로직 및 통관등 각종 레포트 갭라',
      },
      {
        project: 'S-ERP',
        project_from_to: '2021-02-01~2021-11-05',
        desc: null,
        stack: null,
        work: null,
      },
    ],
  },
];
export default function Career() {
  const [mounted, setMounted] = useState(false);
  const [career, setCareer] = useState([]);

  useEffect(() => {
    setMounted(true);
    myAPI();
  }, []);

  const myAPI = async () => {
    try {
      const res = await axiosGetMain('main');
      setCareer(res);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };
  console.log('career', career);

  // const [career, setCareer] = useState(mapData);

  const RightGrid = ({ project, innerIndex }) => {
    return (
      <Grid xs={12} md={6} key={innerIndex} className="p-2">
        <hr className={`${styles['companyHR']} ${styles['rightHR']}`} />
        <h2 className={styles['project_h1']}>{project.project}</h2>
        <p className={styles['project_from_to_p']}>{project.project_from_to}</p>
        <h3>Description</h3>
        {project.desc}
        <h3>Key development achievements</h3>
        {project.work}
        <h3>Tech</h3>
        {project.stack}
      </Grid>
    );
  };
  return (
    <>
      <Grid container>
        {career.map((item, index) => (
          <React.Fragment key={index}>
            <Grid xs={12} md={6} key={index}>
              {/* <Grid xs={12} md={0} key={index}>
                <hr className={styles['companyHR']} />
              </Grid> */}
              <hr className={styles['companyHR']} />
              <h1>{item.company}</h1>
              <p>{item.company_from_to}</p>
            </Grid>
            {item.projects.map((project, innerIndex) =>
              innerIndex === 0 ? (
                
                <RightGrid
                  project={project}
                  innerIndex={innerIndex}
                  key={innerIndex}
                />
              ) : (
                <React.Fragment key={innerIndex}>
                  <Grid xs={12} md={6}></Grid>
                  <RightGrid
                    key={innerIndex}
                    project={project}
                    innerIndex={innerIndex}
                  />
                </React.Fragment>
              )
            )}
          </React.Fragment>
        ))}
      </Grid>
      <hr />
    </>
  );
}

'use client';
import styles from './career.module.css';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { axiosGetMain } from '@/api/baseGet';
import { useState, useEffect, forwardRef } from 'react';
import React from 'react';

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
        <br />
        {project.link != ' ' && '✔️'}
        <a href={project.link}>{project.link}</a>
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

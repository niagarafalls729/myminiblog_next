'use client';
import styles from './career.module.css';
import { axiosGetMain } from '@/api/baseGet';
import { useState, useEffect } from 'react';
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
      <div key={innerIndex} className={`${styles['rightGrid']} p-2`}>
        <hr className={`${styles['companyHR']} ${styles['rightHR']}`} />
        <h2 className={styles['project_h1']}>{project.project}</h2>
        <p className={styles['project_from_to_p']}>{project.project_from_to}</p>
        <h3>Description</h3>
        {project.desc}
        <h3>Key achievements</h3>
        <div style={{ whiteSpace: 'pre-line' }}>{project.work}</div>
        <br />
        {project.link !== ' ' && '✔️'}
        <a href={project.link}>{project.link}</a>
        <h3>Tech</h3>
        {project.stack}
      </div>
    );
  };

  return (
    <>
      <div className={styles['container']}>
        {career.map((item, index) => (
          <React.Fragment key={index}>
            <div className={styles['leftGrid']} key={index}>
              <hr className={styles['companyHR']} />
              <h1>{item.company}</h1>
              <p>{item.company_from_to}</p>
            </div>
            {item.projects.map((project, innerIndex) =>
              innerIndex === 0 ? (
                <RightGrid
                  project={project}
                  innerIndex={innerIndex}
                  key={innerIndex}
                />
              ) : (
                <React.Fragment key={innerIndex}>
                  <div className={styles['placeholder']}></div>
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
      </div>
      <hr />
    </>
  );
}

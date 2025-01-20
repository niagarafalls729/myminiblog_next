import styles from './introduction.module.css';

import Career from '@/app/introduction/career';
import Weather from '@/app/introduction/weather';
import Visit from '@/app/introduction/visit';
import BaseDial from '@/components/dial/BaseDial';
import { colors } from '@mui/material';
import Link from 'next/link';
export default function Introduction() {
  return (
    <>
      <div className={styles['total_wrap']}>
        <div></div>
        <div>
          <div className="animate__animated animate__flash">
            <p className={styles['title']}>
              안녕하세요!
              <br />
              김지수입니다 <span className={styles['pin_point']}>.</span>
              <br />
            </p>
            <p className={styles['weather']}>
              <Weather />
            </p>
          </div>
          <div>
            <p style={{ fontWeight: 'bold' }}></p>
            <p style={{ fontWeight: 'bold' }} className={styles['about_me']}>
              저는 5년 이상의 웹사이트 개발 경험을 가진 전 풀스택 , 현
              프론트엔드 개발자입니다.
              <br /> 제 목표는 혁신적인 프론트엔드 솔루션을 개발하여 사용자와
              비즈니스에 가치를 제공하는 것이며,
              <br /> 새로운 기술에 대한 지속적인 열정으로 미래의 웹 개발
              트렌드를 선도하고자 합니다.
              <br /> 지금 현재 보고 계신 블로그는 Next.js , node.js , pm2 ,
              nginx ,oracle을 사용하여 반응형으로 구성했습니다.
              <br />
              결혼 준비로 인해 약간의 업데이트가 지연되었습니다.
              <br />
              차근차근 다시 수정하고 있습니다.
              <br /> <br />
              저의 참여 프로젝트는 👉{' '}
              <span style={{ color: 'blue' }}>
                <Link href="/activeOverview/Project"> 이동</Link>{' '}
              </span>
            </p>
          </div>
        </div>
      </div>
      <Visit />
      <BaseDial />
    </>
  );
}

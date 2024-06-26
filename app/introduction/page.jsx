import styles from './introduction.module.css';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Career from '@/app/introduction/career';
import Weather from '@/app/introduction/weather';
import Visit from '@/app/introduction/visit';
import BaseDial from '@/components/dial/BaseDial';
export default function Introduction() {
  return (
    <>
      <Grid container className={styles['total_wrap']}>
        <Grid xs={0} md={4}></Grid>
        <Visit />
        <Grid xs={12} md={6}>
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
            </p>
            {/* <p style={{ fontFamily: "궁서체" }}>
              저는 4년 이상의 웹 애플리케이션 및 웹사이트 개발 경험을 가진
              프론트엔드 개발자입니다. 제 목표는 혁신적인 프론트엔드 솔루션을
              개발하여 사용자와 비즈니스에 가치를 제공하는 것이며, 새로운 기술에
              대한 지속적인 열정으로 미래의 웹 개발 트렌드를 선도하고자 합니다.
            </p> */}
            {/* <p style={{ fontWeight: "bold", color: "hotpink" }}>
              음 사실... 이건 아닙니다, 그저 개발이 재미있습니다. <br />
              개발이 아직도 재미있고, 새로운 업무는 늘 배울때마다 삶의
              활력소입니다! 돈이최고!
            </p> */}
            <br />
            <p className={styles['sub_title']}>경력사항</p>
            <Career></Career>
            <br />
            <h3>
              제 포트폴리오를 확인해 주셔서 감사합니다. <br />
              어떠한 질문이나 제안이 있으시면 언제든지 연락 주시기 바랍니다.
              <br></br> 👻 010-9898-9845
              <br></br> 👌 wltn729@gmail.com
            </h3>
          </div>
        </Grid>

        <Grid xs={0} md={4}></Grid>
      </Grid>
      <BaseDial />
    </>
  );
}

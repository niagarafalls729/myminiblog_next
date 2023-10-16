import styles from "./introduction.module.css";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
export default function Introduction() {
  return (
    <>
      <Grid container>
        <Grid xs={0} md={4}></Grid>
        <Grid xs={12} md={6}>
          <div className="animate__animated animate__flash">
            <p className={styles["title"]}>
              안녕하세요!
              <br />
              김지수입니다 <span className={styles["pin_point"]}>.</span>
            </p>
          </div>
          <div>
            <p style={{ fontWeight: "bold" }}></p>
            <p style={{ fontFamily: "궁서체" }}>
              저는 4년 이상의 웹 애플리케이션 및 웹사이트 개발 경험을 가진
              프론트엔드 개발자입니다. 제 목표는 혁신적인 프론트엔드 솔루션을
              개발하여 사용자와 비즈니스에 가치를 제공하는 것이며, 새로운 기술에
              대한 지속적인 열정으로 미래의 웹 개발 트렌드를 선도하고자 합니다.
            </p>
            <p style={{ fontWeight: "bold", color: "hotpink" }}>
              음 사실... 이건 아닙니다, 그저 개발이 재미있습니다. <br />
              개발이 아직도 재미있고, 새로운 업무는 늘 배울때마다 삶의
              활력소입니다! 돈이최고!
            </p>
            <br />
            <p className={styles["sub_title"]}>경력사항</p>
            <Grid container>
              <Grid xs={12} md={4}>
                <div>MDS 테크</div>
              </Grid>
              <Grid xs={12} md={8}>
                카플릭스
              </Grid>
            </Grid>
            <Grid container>
              <Grid xs={12} md={4}>
                <div>에쓰푸드(주)</div>
              </Grid>
              <Grid xs={12} md={8}>
                <div>에쓰푸드(주)</div>
              </Grid>
            </Grid>
            <Grid container>
              <Grid xs={12} md={4}>
                <div>한국비즈넷</div>
              </Grid>
              <Grid xs={12} md={8}>
                <div>한국비즈넷</div>
              </Grid>
            </Grid>
            <br />제 포트폴리오를 확인해 주셔서 감사합니다. 어떠한 질문이나
            제안이 있으시면 언제든지 연락 주시기 바랍니다.
          </div>
        </Grid>

        <Grid xs={0} md={4}></Grid>
      </Grid>
    </>
  );
}

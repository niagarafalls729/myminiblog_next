"use client";
import { useState, useRef, useMemo } from "react";
import Button from "@mui/material/Button";
import { savePost, axiosGet } from "@/api/baseGet";
import styles from "./login.module.css";
import useDetect from "@/app/layout/mediaQuery/Detect";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import TextField from "@mui/material/TextField";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

export default function page() {
  const disSize = useDetect();
  const idRef = useRef(null);
  const pwRef = useRef(null);
  const emailRef = useRef(null);

  const [emailErr, setEmailErr] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState("비번찾기용!");
  const sizeV = disSize == "mo" ? "500/1000" : "1200/2400";

  const [value, setValue] = useState("join");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const errEmailCHK = () => {
    const emailValue = emailRef.current.value;
    console.log("이메일 값:", emailValue);
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValidEmail = emailPattern.test(emailValue);
    if (isValidEmail) {
      setEmailHelperText("올바른 이메일 주소입니다.");
      setEmailErr(false);
    } else {
      setEmailHelperText("유효하지 않은 이메일 주소입니다.");
      setEmailErr(true);
    }
  };
  const joinApi = () => {
    if (idRef.current.value == null || idRef.current.value.length < 5)
      return alert("ID 5글자 이상");
    if (pwRef.current.value == null || pwRef.current.value.length < 5)
      return alert("PW 5글자 이상");
    const createUser = {
      id: idRef.current.value,
      pw: pwRef.current.value,
      email: emailRef.current.value,
    };
    savePost("saveUser", createUser);
  };
  return (
    <>
      <div className={styles["main_login"]}>
        {/* https://picsum.photos/1200/2400 */}
        {/* <img
          src={`https://picsum.photos/${sizeV}?grayscale`}
          // style={{disSize =="mo" ? 'position: a':'' }}
          className={styles[disSize]}
          alt="Random Image"
        /> */}

        <div className="p-8 " style={{ zIndex: 10, position: "sticky" }}>
          <Grid container>
            <Grid xs={0} md={4} lg={4}></Grid>
            <Grid xs={12} md={4} lg={4}>
              <Box sx={{ width: "100%" }}>
                <Tabs
                  value={value}
                  variant="fullWidth"
                  onChange={handleChange}
                  textColor="secondary"
                  indicatorColor="secondary"
                  aria-label="secondary tabs example"
                >
                  <Tab value="login" label="로그인" />
                  <Tab value="join" label="회원가입" />
                </Tabs>

                <CustomTabPanel value={value} index={"login"}>
                  <Grid container spacing={3} className="p-4 ">
                    <Grid xs={12} md={12} lg={12}></Grid>
                    <Grid xs={12} md={12} lg={12}>
                      <TextField
                        id="outlined-basic"
                        label="아이디"
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                    <Grid xs={12} md={12} lg={12}>
                      <TextField
                        id="outlined-basic"
                        label="비밀번호"
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                    <Grid xs={12} md={12} lg={12}>
                      <Button fullWidth variant="contained">
                        로그인
                      </Button>
                    </Grid>
                  </Grid>
                </CustomTabPanel>

                <CustomTabPanel value={value} index={"join"}>
                  <Grid container spacing={3} className="p-4 ">
                    <Grid xs={12} md={12} lg={12}></Grid>
                    <Grid xs={12} md={12} lg={12}>
                      <TextField
                        id="outlined-basic"
                        label="아이디"
                        variant="outlined"
                        fullWidth
                        inputProps={{ ref: idRef }}
                      />
                    </Grid>
                    <Grid xs={12} md={12} lg={12}>
                      <TextField
                        id="outlined-basic"
                        label="비밀번호"
                        variant="outlined"
                        fullWidth
                        inputProps={{ ref: pwRef }}
                      />
                    </Grid>
                    <Grid xs={12} md={12} lg={12}>
                      <TextField
                        id="outlined-basic"
                        label="이메일"
                        variant="outlined"
                        helperText={emailHelperText}
                        fullWidth
                        color={!emailErr ? "primary" : "warning"}
                        onBlur={errEmailCHK}
                        onChange={errEmailCHK}
                        inputProps={{ ref: emailRef }} // ref 설정을 inputProps에 추가
                      />
                    </Grid>
                    <Grid xs={12} md={12} lg={12}>
                      <Button fullWidth variant="contained" onClick={joinApi}>
                        회원가입
                      </Button>
                    </Grid>
                  </Grid>
                </CustomTabPanel>
              </Box>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
}

function CustomTabPanel(props) {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Box>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

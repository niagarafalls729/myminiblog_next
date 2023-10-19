"use client";

// 클라이언트 사이드로 마킹
import Link from "next/link";
import { useState } from "react";
import "./nav.css";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
import { dark, light, toggleDarkAndLight } from "@/redux/features/darkSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Typed from "@/components/typed/index";
import dayjs from "dayjs";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
const Pc = () => {
  const dispatch = useAppDispatch();

  return (
    <>
      <div className="underLine">
        <nav className="navbar">
          <div className="container">
            <div className="logo"></div>
            <div className={`nav-elements main`}>
              <ul>
                <li>
                  <Link href="/">블로그 주인</Link>
                </li>
                <li>
                  <Link href="/myStudy">공부일지</Link>
                </li>
                <li>
                  <Link href="/guestBook/[id]" as="guestBook/1">
                    방명록
                  </Link>
                </li>
                <li>
                  <Link href="/myGit" as="/myGit">
                    {" "}
                    깃허브
                  </Link>
                </li>
              </ul>
            </div>
            <div className={`nav-elements`}>
              <button
                style={{ display: "none" }}
                id="dark"
                onClick={() => dispatch(toggleDarkAndLight())}
              ></button>
              <label htmlFor="dark">
                <SettingsBrightnessIcon></SettingsBrightnessIcon>
              </label>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};
const Mo = (props) => {
  const [showNavbar, setShowNavbar] = useState(false);
  const today = dayjs(); // 현재 날짜 및 시간을 가져옵니다
  const formattedDate = today.format("YY년MM월DD일"); // 원하는 형식으로 날짜를 포맷합니다
  const dispatch = useAppDispatch();

  const handleShowNavbar = () => {
    console.log("handleShowNavbar");
    setShowNavbar(!showNavbar);
    if (!showNavbar) {
      document.body.style.overflow = "hidden"; // body에 CSS를 적용
    } else {
      document.body.style.overflow = "auto"; // body에 CSS를 적용
    }
  };

  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(panel === expanded ? false : panel);
  };

  return (
    <>
      <div className="mo_display">
        <div className="logo">
          <button
            style={{ display: "none" }}
            id="dark"
            onClick={() => dispatch(toggleDarkAndLight())}
          ></button>
          <label htmlFor="dark">
            <SettingsBrightnessIcon></SettingsBrightnessIcon>
          </label>
        </div>

        <div className="menu-icon" onClick={() => setShowNavbar(!showNavbar)}>
          {!showNavbar ? <MenuIcon /> : <CloseIcon />}
        </div>
        <div
          className={`nav-elements main  ${showNavbar && "active"}`}
          style={{
            backgroundColor: props.darkV ? "#eff2f5" : "black",
          }}
        >
          <div className={"navUp"}>
            <ul>
              <Typed
                setText={[
                  "안녕하세요!<br/> <strong> 지수 </strong>의 블로그입니다.",
                  "오늘(" + formattedDate + ")도 좋은 하루 보내세여>__@",
                ]}
              ></Typed>
            </ul>
          </div>
          <div className={"navDown"}>
            <List
              sx={{
                width: "100%",
              }}
              style={{
                backgroundColor: props.darkV ? "hotpink" : "black",
              }}
              component="nav"
              aria-labelledby="nested-list-subheader"
            >
              <ListItemButton>
                <Link href="/" onClick={() => setShowNavbar(!showNavbar)}>
                  <ListItemText primary="블로그 주인" />
                </Link>
              </ListItemButton>

              <ListItemButton>
                <Link
                  href="/myStudy"
                  onClick={() => setShowNavbar(!showNavbar)}
                >
                  <ListItemText primary="공부일지" />
                </Link>
              </ListItemButton>

              <ListItemButton onClick={handleChange(2)}>
                <ListItemText primary="방명록" />
                {expanded === 2 ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={expanded === 2 ? true : false} unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <Link
                      href="/guestBook/[id]"
                      as="guestBook/1"
                      onClick={() => setShowNavbar(!showNavbar)}
                    >
                      <ListItemText primary="방명록" />
                    </Link>
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 4 }}>
                    <Link
                      href="/guestBook/[id]"
                      as="guestBook/2"
                      onClick={() => setShowNavbar(!showNavbar)}
                    >
                      <ListItemText primary="주인장에게 비밀글쓰기!" />
                    </Link>
                  </ListItemButton>
                </List>
              </Collapse>

              <ListItemButton>
                <Link
                  href="/myGit"
                  as="/myGit"
                  onClick={() => setShowNavbar(!showNavbar)}
                >
                  <ListItemText primary="깃허브" />
                </Link>
              </ListItemButton>
            </List>
          </div>
        </div>
      </div>
    </>
  );
};
function Navigation() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const darkV = useAppSelector((state) => state.darkAndLight.value);
  if (darkV) {
    document.body.setAttribute("data-theme", "light");
  } else {
    document.body.setAttribute("data-theme", "dark");
  }
  return (
    <>
      {" "}
      <ThemeProvider theme={darkTheme}>
        {!darkV && <CssBaseline />}
        <Pc></Pc>
        <Mo darkV={darkV}></Mo>
      </ThemeProvider>
    </>
  );
}

export default Navigation;

'use client';

// 클라이언트 사이드로 마킹
import Link from 'next/link';
import { useState } from 'react';
import './nav.css';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import { toggleDarkAndLight } from '@/redux/features/darkSlice';
import { logout } from '@/redux/features/userSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import Typed from '@/components/typed/index';
import dayjs from 'dayjs';
import HomeIcon from '@mui/icons-material/Home';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const Pc = () => {
  const dispatch = useAppDispatch();
  const userStatus = useAppSelector(state => state.user.status);
  const userId = useAppSelector(state => state.user.id);
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
                  <Link href="/activeOverview/Project">나의 여정</Link>
                </li>
                <li>
                  <Link href="/guestBook" as="/guestBook">
                    방명록
                  </Link>
                </li>
                {userStatus ? (
                  <>
                    <li>
                      <Link href="/userModi">{userId} 비밀번호 변경</Link>
                    </li>
                    <li>
                      <Link href="/" onClick={() => dispatch(logout())}>
                        로그아웃
                      </Link>
                    </li>
                  </>
                ) : (
                  <Link href="/login" as="/login">
                    로그인/회원가입
                  </Link>
                )}
              </ul>
            </div>
            <div className={`nav-elements`}>
              <button
                style={{ display: 'none' }}
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
const Mo = props => {
  const userStatus = useAppSelector(state => state.user.status);
  const userId = useAppSelector(state => state.user.id);
  const [showNavbar, setShowNavbar] = useState(false);
  const today = dayjs(); // 현재 날짜 및 시간을 가져옵니다
  const formattedDate = today.format('YY년MM월DD일'); // 원하는 형식으로 날짜를 포맷합니다
  const dispatch = useAppDispatch();

  const handleShowNavbar = () => {
    console.log('handleShowNavbar');
    setShowNavbar(!showNavbar);
    if (!showNavbar) {
      document.body.style.overflow = 'hidden'; // body에 CSS를 적용
    } else {
      document.body.style.overflow = 'auto'; // body에 CSS를 적용
    }
  };

  const [expanded, setExpanded] = useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(panel === expanded ? false : panel);
  };
  const [open, setOpen] = useState(true);
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <div className="mo_display">
        <div className="logo" style={{ zIndex: 25 }}>
          <button
            style={{ display: 'none' }}
            id="dark"
            onClick={() => dispatch(toggleDarkAndLight())}
          ></button>
          <label htmlFor="dark" style={{ zIndex: 25 }}>
            <SettingsBrightnessIcon></SettingsBrightnessIcon>
          </label>
        </div>
        <div style={{ zIndex: 25 }}>
          <Link href="/">
            <label htmlFor="home">
              <HomeIcon></HomeIcon>
            </label>
          </Link>
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          {!showNavbar ? <MenuIcon /> : <CloseIcon />}
        </div>
        <div
          className={`nav-elements main  ${showNavbar && 'active'}`}
          // style={{
          //   backgroundColor: props.darkV ? "#eff2f5" : "black",
          // }}
          style={{
            backgroundColor: !props.darkV ? '#eff2f5' : 'black',
          }}
        >
          <div className={'navUp'}>
            <ul>
              <Typed
                setText={[
                  '안녕하세요!<br/> <strong> 지수 </strong>의 블로그입니다.',
                  '오늘(' + formattedDate + ')도 <br/>좋은 하루 보내세여>__@',
                ]}
              ></Typed>
            </ul>
          </div>
          <div className={'navDown'}>
            <List
              sx={{
                width: '100%',
              }}
              style={{
                backgroundColor: 'hotpink',
              }}
              component="nav"
              aria-labelledby="nested-list-subheader"
            >
              <Link href="/" onClick={handleShowNavbar}>
                <ListItemButton>
                  <ListItemText primary="블로그 주인" />
                </ListItemButton>
              </Link>

              <ListItemButton onClick={handleChange(1)}>
                <ListItemText primary="나의 여정" />
                {expanded === 1 ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={expanded === 1 ? true : false} unmountOnExit>
                <List component="div" disablePadding>
                  <Link
                    href="/activeOverview/Project"
                    onClick={handleShowNavbar}
                  >
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText primary="참여프로젝트" />
                    </ListItemButton>
                  </Link>
                  <Link
                    href="/activeOverview/Github"
                    onClick={handleShowNavbar}
                  >
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText primary="블로그 변경 이력" />
                    </ListItemButton>
                  </Link>
                  <Link
                    href="/activeOverview/StudyHistory"
                    onClick={handleShowNavbar}
                  >
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText primary="공부 일지" />
                    </ListItemButton>
                  </Link>
                </List>
              </Collapse>

              <Link href="/guestBook" onClick={handleShowNavbar}>
                <ListItemButton>
                  <ListItemText primary="방명록" />
                </ListItemButton>
              </Link>

              {userStatus ? (
                <>
                  <ListItemButton onClick={handleChange(2)}>
                    <ListItemText primary="로그아웃 & 수정 " />
                    {expanded === 2 ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={expanded === 2 ? true : false} unmountOnExit>
                    <List component="div" disablePadding>
                      <Link href="/" onClick={() => dispatch(logout())}>
                        <ListItemButton sx={{ pl: 4 }}>
                          <ListItemText primary={userId + ' 로그아웃'} />
                        </ListItemButton>
                      </Link>
                      <Link href="/userModi" onClick={handleShowNavbar}>
                        <ListItemButton sx={{ pl: 4 }}>
                          <ListItemText primary={userId + ' 비밀번호 변경'} />
                        </ListItemButton>
                      </Link>
                    </List>
                  </Collapse>
                </>
              ) : (
                <Link href="/login" as="/login" onClick={handleShowNavbar}>
                  <ListItemButton>
                    <ListItemText primary="로그인/회원가입" />
                  </ListItemButton>
                </Link>
              )}
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
      mode: 'dark',
    },
  });
  const darkV = useAppSelector(state => state.darkAndLight.value);
  if (darkV) {
    document.body.setAttribute('data-theme', 'dark');
  } else {
    document.body.setAttribute('data-theme', 'light');
  }
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        {darkV && <CssBaseline />}
        <Pc></Pc>
        <Mo darkV={darkV}></Mo>
      </ThemeProvider>
    </>
  );
}

export default Navigation;

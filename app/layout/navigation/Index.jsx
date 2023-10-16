'use client';

// 클라이언트 사이드로 마킹
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import './nav.css';
import Image from 'next/image';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import Typed from '@/components/typed/index'

import styles from './nav.module.css'
import dayjs from 'dayjs';

const Pc = () => {
  const userID = useAppSelector((state) => state.user.id);
  const dispatch = useAppDispatch();

  return (
    <>
      <div className="underLine">
        <nav className="navbar">
          <div className="container">
            <div className="logo">

            </div>
            <div className={`nav-elements main`}>
              <ul>
                <li>
                  <Link href="/">블로그 주인</Link>
                </li>
                <li>
                  <Link href="/myStudy">공부일지</Link>
                </li>
                <li>
                  <Link href="/guestBook/[id]" as='guestBook/1'>방명록</Link>
                </li>
                <li>
                  <Link href="/myGit" as='/myGit'> 깃허브</Link>
                </li>
              </ul>
            </div>
            <div className={`nav-elements login`}>
              <ul>

              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}
const Mo = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const today = dayjs(); // 현재 날짜 및 시간을 가져옵니다
  const formattedDate = today.format('YY년MM월DD일'); // 원하는 형식으로 날짜를 포맷합니다

  const handleShowNavbar = () => {
    console.log("handleShowNavbar")
    setShowNavbar(!showNavbar);
    if (!showNavbar) {
      document.body.style.overflow = 'hidden'; // body에 CSS를 적용
    } else {
      document.body.style.overflow = 'auto'; // body에 CSS를 적용
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
          <Link href="/">

          </Link>
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          {!showNavbar ? <MenuIcon /> : <CloseIcon />}

        </div>
        <div className={`nav-elements main  ${showNavbar && 'active'}`}>
          <div className={'navUp'}>
            <ul>
              <Typed setText={['안녕하세요!<br/> <strong> 지수 </strong>의 블로그입니다.', '오늘(' + formattedDate + ')도 좋은 하루 보내세여>__@']}></Typed>
            </ul>
          </div>
          <div className={'navDown'}>
            <List
              sx={{ width: '100%', bgcolor: 'background.paper' }}
              component="nav"
              aria-labelledby="nested-list-subheader"
            >

              <ListItemButton>
                <Link href="/" onClick={handleShowNavbar}>
                  <ListItemText primary="블로그 주인" />
                </Link>
              </ListItemButton>

              <ListItemButton >
                <Link href="/myStudy" onClick={handleShowNavbar}>
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
                    <Link href="/guestBook/[id]" as='guestBook/1' onClick={handleShowNavbar}>
                      <ListItemText primary="방명록" />
                    </Link>
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 4 }}>
                    <Link href="/guestBook/[id]" as='guestBook/2' onClick={handleShowNavbar}>
                      <ListItemText primary="주인장에게 비밀글쓰기!" />
                    </Link>
                  </ListItemButton>

                </List>
              </Collapse>
              <ListItemButton >
                <Link href="/myGit" as='/myGit' onClick={handleShowNavbar}>
                  <ListItemText primary="공부일지" />
                </Link>
              </ListItemButton>


            </List>
          </div>
        </div>
      </div >
    </>
  )
}
function Navigation() {

  return (
    <>
      <Pc></Pc>
      <Mo></Mo>
    </>
  );
}

export default Navigation;

'use client';

// 클라이언트 사이드로 마킹
import Link from 'next/link';
import { useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import './nav.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faTimes,
  faChevronDown,
  faChevronUp,
  faSun,
  faMoon,
  faHome,
} from '@fortawesome/free-solid-svg-icons';
import { toggleDarkAndLight } from '@/redux/features/darkSlice';
import { logout } from '@/redux/features/userSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import Typed from '@/components/typed/index';
import dayjs from 'dayjs';

// 현재 페이지 상태를 유지하는 스마트 링크 컴포넌트
const SmartLink = ({ href, children, className, onClick, as }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 현재 방명록 페이지인지 확인
  const isGuestBookPage = pathname === '/guestBook';
  const currentPage = searchParams.get('page') || '1';

  // 방명록 페이지에서 방명록 링크를 클릭할 때는 현재 페이지 유지
  if (href === '/guestBook' && isGuestBookPage) {
    return (
      <Link
        href={`/guestBook?page=${currentPage}`}
        className={className}
        onClick={onClick}
        as={as}
      >
        {children}
      </Link>
    );
  }

  // 그 외의 경우는 기본 동작
  return (
    <Link href={href} className={className} onClick={onClick} as={as}>
      {children}
    </Link>
  );
};

const Pc = () => {
  const dispatch = useAppDispatch();
  const userStatus = useAppSelector(state => state.user.status);
  const userId = useAppSelector(state => state.user.id);
  const darkV = useAppSelector(state => state.darkAndLight.value);
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
                  <SmartLink href="/guestBook" as="/guestBook">
                    방명록
                  </SmartLink>
                </li>
                <li>
                  <Link href="/dcbest">
                    실베
                  </Link>
                </li>
                {userStatus ? (
                  <>
                    <li>
                      <Link href="/userModi">{userId} 비밀번호 변경</Link>
                    </li>
                    <li>
                      <Link
                        href="/"
                        onClick={() => {
                          dispatch(logout());
                          // 로그아웃 후 페이지 새로고침
                          setTimeout(() => {
                            window.location.reload();
                          }, 100);
                        }}
                      >
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
              <label htmlFor="dark" className="theme-toggle">
                {darkV ? (
                  <FontAwesomeIcon
                    icon={faSun}
                    className="theme-icon sun-icon active"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faMoon}
                    className="theme-icon moon-icon active"
                  />
                )}
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
          <label htmlFor="dark" style={{ zIndex: 25 }} className="theme-toggle">
            {props.darkV ? (
              <FontAwesomeIcon
                icon={faSun}
                className="theme-icon sun-icon active"
              />
            ) : (
              <FontAwesomeIcon
                icon={faMoon}
                className="theme-icon moon-icon active"
              />
            )}
          </label>
        </div>
        <div style={{ zIndex: 25 }}>
          <Link href="/">
            <label htmlFor="home">
              <FontAwesomeIcon icon={faHome} />
            </label>
          </Link>
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          {!showNavbar ? (
            <FontAwesomeIcon icon={faBars} />
          ) : (
            <FontAwesomeIcon icon={faTimes} />
          )}
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
            <nav className="mobile-nav">
              <Link href="/" onClick={handleShowNavbar} className="nav-item">
                블로그 주인
              </Link>

              <div className="nav-item">
                <button className="nav-toggle" onClick={handleChange(1)}>
                  <span>나의 여정</span>
                  <FontAwesomeIcon
                    icon={expanded === 1 ? faChevronUp : faChevronDown}
                  />
                </button>
                <div
                  className={`nav-submenu ${expanded === 1 ? 'expanded' : ''}`}
                >
                  <Link
                    href="/activeOverview/Project"
                    onClick={handleShowNavbar}
                    className="nav-subitem"
                  >
                    참여프로젝트
                  </Link>
                  <Link
                    href="/activeOverview/Github"
                    onClick={handleShowNavbar}
                    className="nav-subitem"
                  >
                    블로그 변경 이력
                  </Link>
                  {/* <Link
                    href="/activeOverview/StudyHistory"
                    onClick={handleShowNavbar}
                    className="nav-subitem"
                  >
                    공부 일지
                  </Link> */}
                </div>
              </div>

              <SmartLink
                href="/guestBook"
                onClick={handleShowNavbar}
                className="nav-item"
              >
                방명록
              </SmartLink>

              <Link
                href="/dcbest"
                onClick={handleShowNavbar}
                className="nav-item"
              >
                실베
              </Link>

              {userStatus ? (
                <div className="nav-item">
                  <button className="nav-toggle" onClick={handleChange(2)}>
                    <span>로그아웃 & 수정</span>
                    <FontAwesomeIcon
                      icon={expanded === 2 ? faChevronUp : faChevronDown}
                    />
                  </button>
                  <div
                    className={`nav-submenu ${expanded === 2 ? 'expanded' : ''}`}
                  >
                    <Link
                      href="/"
                      onClick={() => {
                        dispatch(logout());
                        // 로그아웃 후 페이지 새로고침
                        setTimeout(() => {
                          window.location.reload();
                        }, 100);
                      }}
                      className="nav-subitem"
                    >
                      {userId} 로그아웃
                    </Link>
                    <Link
                      href="/userModi"
                      onClick={handleShowNavbar}
                      className="nav-subitem"
                    >
                      {userId} 비밀번호 변경
                    </Link>
                  </div>
                </div>
              ) : (
                <Link
                  href="/login"
                  as="/login"
                  onClick={handleShowNavbar}
                  className="nav-item"
                >
                  로그인/회원가입
                </Link>
              )}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};
const Navigation = () => {
  const darkV = useAppSelector(state => state.darkAndLight.value);
  if (darkV) {
    document.body.setAttribute('data-theme', 'dark');
  } else {
    document.body.setAttribute('data-theme', 'light');
  }
  return (
    <>
      <Pc></Pc>
      <Mo darkV={darkV}></Mo>
    </>
  );
};

export default Navigation;

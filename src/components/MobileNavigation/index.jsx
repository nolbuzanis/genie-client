import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const MenuContainer = styled.div`
  text-align: center;
  height: 55px;
  width: 100%;
  background: white;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 100;
  border-top: 1px solid #d6d6d6;
  padding: 6px 0;
`;
const StyledLink = styled(Link)`
  width: 33%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;
const MenuSpacing = styled.div`
  height: 55px;
  @media (min-width: 1024px) {
    display: none;
  }
`;
const Text = styled.h2`
  width: 100%;
  color: ${({ active }) => (active ? '#4568dc' : '#818181')};
  font-size: 14px;
  //margin-top: -10px;
  //text-transform: uppercase;
  font-weight: 400;
`;
// const Circle = styled.div`
//     width: 9px;
//     height: 9px;
//     border-radius: 50%;
//     background: ${({ active }) => active ? '#1FB6FF' : '#818181'}
// `;
// const CircleContainer = styled.div`
//     display: flex;
//     width: 36px;
//     height: 34px;
//     margin: 0 auto;
//     justify-content: space-between;
//     align-items: center;
// `;
const HomeSvg = styled.svg`
  width: 24px;
  height: 24px;
`;
const ReleaseSvg = styled.svg`
  width: 26px;
  height: 26px;
`;

const HomeIcon = ({ active }) => (
  // <HomeSvg
  //   xmlns='http://www.w3.org/2000/svg'
  //   width='26.012'
  //   height='26.012'
  //   viewBox='0 0 26.012 26.012'
  // >
  //   <g
  //     id='prefix__Group_59'
  //     data-name='Group 59'
  //     transform='translate(-122 -519)'
  //   >
  //     <path
  //       id='prefix__basic_home'
  //       d='M13.506 3L2 14.506h3.452v11.506h4.6v-6.137h6.136v6.136h4.6V14.506h4.219z'
  //       transform='translate(121.5 517.5)'
  //       style={{
  //         fill: 'none',
  //         stroke: active ? '#4568dc' : '#818181',
  //         strokeLinejoin: 'round',
  //         strokeMiterlimit: 10,
  //         strokeWidth: '3px'
  //       }}
  //     />
  //     <path
  //       id='prefix__basic_home-2'
  //       d='M13.506 3L2 14.506h3.452v11.506h4.6v-6.137h6.136v6.136h4.6V14.506h4.219z'
  //       data-name='basic_home'
  //       transform='translate(121.5 517.5)'
  //       style={{ fill: '#fff' }}
  //     />
  //   </g>
  // </HomeSvg>
  <HomeSvg
    xmlns='http://www.w3.org/2000/svg'
    id='prefix__home-24px_4_'
    data-name='home-24px (4)'
    viewBox='0 0 24 24'
  >
    <path
      id='prefix__Path_396'
      fill='none'
      d='M0 0h24v24H0z'
      data-name='Path 396'
    />
    <path
      id='prefix__Path_397'
      style={{ fill: active ? '#656ded' : '#818181' }}
      d='M10 19v-5h4v5a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-7h1.7a.5.5 0 0 0 .33-.87L12.67 3.6a1.008 1.008 0 0 0-1.34 0l-8.36 7.53a.5.5 0 0 0 .33.87H5v7a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1z'
      data-name='Path 397'
    />
  </HomeSvg>
);
const LinkIcon = ({ active }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    id='prefix__share-24px_2_'
    width={24}
    height={24}
    data-name='share-24px (2)'
    viewBox='0 0 24 24'
  >
    <path
      id='prefix__Path_389'
      fill='none'
      d='M0 0h24v24H0z'
      data-name='Path 389'
    />
    <path
      id='prefix__Path_390'
      style={{ fill: active ? '#656ded' : '#818181' }}
      d='M18 16.08a2.912 2.912 0 0 0-1.96.77L8.91 12.7A3.274 3.274 0 0 0 9 12a3.274 3.274 0 0 0-.09-.7l7.05-4.11A2.993 2.993 0 1 0 15 5a3.274 3.274 0 0 0 .09.7L8.04 9.81a3 3 0 1 0 0 4.38l7.12 4.16a2.821 2.821 0 0 0-.08.65A2.92 2.92 0 1 0 18 16.08z'
      data-name='Path 390'
    />
  </svg>
);

const ReleasesIcon = ({ active }) => (
  <ReleaseSvg
    xmlns='http://www.w3.org/2000/svg'
    id='prefix__library_music-24px_1_'
    width='25.322'
    height='25.322'
    data-name='library_music-24px (1)'
    viewBox='0 0 25.322 25.322'
  >
    <path
      id='prefix__Path_216'
      d='M0 0h25.322v25.322H0z'
      data-name='Path 216'
      style={{ fill: 'none' }}
    />
    <path
      style={{ fill: active ? '#4568dc' : '#818181' }}
      id='prefix__Path_217'
      d='M21.751 2H8.584a2.2 2.2 0 0 0-2.195 2.195v13.167a2.2 2.2 0 0 0 2.195 2.195h13.167a2.2 2.2 0 0 0 2.195-2.195V4.195A2.2 2.2 0 0 0 21.751 2zm.557 16.067H7.894V3.631h14.414zm-8.787-1.8a2.744 2.744 0 0 0 2.743-2.743V7.486h3.292V5.292h-4.388v6.046a2.685 2.685 0 0 0-1.646-.56 2.743 2.743 0 1 0 0 5.486zM3.293 6.389H2v15.362a2.2 2.2 0 0 0 2.195 2.195h15.362V22.76H3.293z'
      data-name='Path 217'
      transform='translate(-.312 -.312)'
    />
  </ReleaseSvg>
);
const MenuIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={30}
    height={26}
    viewBox='0 0 30 26'
  >
    <defs>
      <style
        dangerouslySetInnerHTML={{
          __html:
            '\n            .prefix__cls-2{fill:none;stroke:#818181;stroke-linecap:round;stroke-width:2px}\n        ',
        }}
      />
    </defs>
    <g
      id='prefix__Group_61'
      data-name='Group 61'
      transform='translate(-205.703 -465)'
    >
      <rect
        id='prefix__Rectangle_2088'
        width={30}
        height={26}
        data-name='Rectangle 2088'
        rx={1}
        transform='translate(205.703 465)'
        style={{ fill: 'none' }}
      />
      <path
        id='prefix__Line_5'
        d='M0 0L20.703 0'
        className='prefix__cls-2'
        data-name='Line 5'
        transform='translate(210.5 473.5)'
      />
      <path
        id='prefix__Line_6'
        d='M0 0L20.703 0'
        className='prefix__cls-2'
        data-name='Line 6'
        transform='translate(210.5 479.5)'
      />
      <path
        id='prefix__Line_7'
        d='M0 0L15 0'
        className='prefix__cls-2'
        data-name='Line 7'
        transform='translate(216.203 485.5)'
      />
    </g>
  </svg>
);

const menuItems = [
  {
    icon: (props) => <HomeIcon {...props} />,
    path: '/home',
    text: 'Home',
  },
  {
    icon: (props) => <LinkIcon {...props} />,
    path: '/profile',
    text: 'Link',
  },
  {
    icon: (props) => <ReleasesIcon {...props} />,
    path: '/releases',
    text: 'Releases',
  },
  {
    icon: (props) => <MenuIcon {...props} />,
    path: '/menu',
    text: 'Menu',
  },
];

const MobileNavigation = ({ lockedRoutes }) => {
  const path = window.location.pathname;
  const hiddenRoutes = [
    ...lockedRoutes,
    '/menu',
    '/introduction',
    '/find-artist-uri',
    '/pricing',
    '/settings',
    '/update-payment',
  ];
  if (window.innerWidth >= 1024 || hiddenRoutes.includes(path)) return null;
  return (
    <>
      <MenuSpacing />
      <MenuContainer>
        {menuItems.map((item, i) => {
          const active = path.includes(item.path);
          return (
            <StyledLink to={item.path} key={i}>
              {item.icon({ active })}
              <Text active={active}>{item.text}</Text>
            </StyledLink>
          );
        })}
      </MenuContainer>
    </>
  );
};

export default MobileNavigation;

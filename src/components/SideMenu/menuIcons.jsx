import React from 'react';
import styled from 'styled-components';

const MenuSvg = styled.svg`
  width: 20px;
  height: 20px;
  margin-right: 20px;
`;

export const HomeIcon = ({ active }) => (
  <MenuSvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 19.667 20.837'>
    <g id='prefix__iconfinder_home_353416' transform='translate(-8.501 -7.103)'>
      <path
        d='M13.068 25.829v8.05a.367.367 0 0 0 .367.367h8.639v-7.29h4.058v7.289h2.414a.366.366 0 0 0 .367-.367v-8.05l-7.918-7.884zm6.443 4.523h-3.662v-3.4h3.662z'
        transform='translate(-2.656 -6.305)'
        style={{ fill: active ? '#656ded' : '#444444' }}
      />
      <path
        d='M27.862 16.629L18.335 7.1l-4.494 4.5V9.619a.837.837 0 1 0-1.674 0v3.652l-3.359 3.358a1.046 1.046 0 0 0 1.48 1.48l8.048-8.047 8.047 8.047a1.046 1.046 0 1 0 1.479-1.48z'
        style={{ fill: active ? '#656ded' : '#444444' }}
      />
    </g>
  </MenuSvg>
);

export const ReleaseIcon = ({ active }) => (
  <MenuSvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
    <path
      d='M20 2H8a2.006 2.006 0 0 0-2 2v12a2.006 2.006 0 0 0 2 2h12a2.006 2.006 0 0 0 2-2V4a2.006 2.006 0 0 0-2-2zm-3 5h-2v5.37a2.584 2.584 0 0 1-2.16 2.6 2.5 2.5 0 1 1-.5-4.97 2.456 2.456 0 0 1 1.66.51V6a1 1 0 0 1 1-1h2a1 1 0 0 1 0 2zM3 6a1 1 0 0 0-1 1v13a2.006 2.006 0 0 0 2 2h13a1 1 0 0 0 0-2H5a1 1 0 0 1-1-1V7a1 1 0 0 0-1-1z'
      transform='translate(-2 -2)'
      style={{ fill: active ? '#656ded' : '#444444' }}
    />
  </MenuSvg>
);

export const FollowerIcon = ({ active }) => (
  <MenuSvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 19.014 20.222'>
    <g
      id='prefix__interface_2_'
      data-name='interface (2)'
      transform='translate(-2.951)'
    >
      <g
        id='prefix__Group_342'
        data-name='Group 342'
        transform='translate(2.951)'
      >
        <path
          id='prefix__Path_338'
          d='M7.757 42.45a4.671 4.671 0 0 1 .927-2.8 3.434 3.434 0 0 0-5.734 2.555s.809 7.225 3.439 7.225c1.016 0 1.76-1.08 2.291-2.4a27.354 27.354 0 0 1-.919-4.511z'
          className='prefix__cls-1'
          data-name='Path 338'
          transform='translate(-2.951 -30.829)'
          style={{ fill: active ? '#656ded' : '#444444' }}
        />
        <path
          id='prefix__Path_339'
          d='M7.951 13.974a3.037 3.037 0 0 0 2.667-1.583 4.2 4.2 0 0 1-.64-3.71 3.035 3.035 0 1 0-2.027 5.293z'
          data-name='Path 339'
          transform='translate(-4.512 -6.283)'
          style={{ fill: active ? '#656ded' : '#444444' }}
        />
        <path
          id='prefix__Path_340'
          d='M70.086 38.77a3.421 3.421 0 0 0-2.295.883 4.668 4.668 0 0 1 .927 2.8v.068a27.346 27.346 0 0 1-.919 4.511c.531 1.324 1.274 2.4 2.291 2.4 2.63 0 3.439-7.225 3.439-7.225a3.439 3.439 0 0 0-3.443-3.437z'
          className='prefix__cls-1'
          data-name='Path 340'
          transform='translate(-54.511 -30.829)'
          style={{ fill: active ? '#656ded' : '#444444' }}
        />
        <path
          id='prefix__Path_341'
          d='M65.977 12.39a3.041 3.041 0 1 0 .64-3.71 4.194 4.194 0 0 1-.64 3.71z'
          data-name='Path 341'
          transform='translate(-53.069 -6.282)'
          style={{ fill: active ? '#656ded' : '#444444' }}
        />
        <path
          id='prefix__Path_342'
          d='M33.474 36.751a4.094 4.094 0 0 0-4.094 4.094s.963 8.6 4.094 8.6 4.094-8.6 4.094-8.6a4.094 4.094 0 0 0-4.094-4.094z'
          className='prefix__cls-1'
          data-name='Path 342'
          transform='translate(-23.967 -29.224)'
          style={{ fill: active ? '#656ded' : '#444444' }}
        />
        <circle
          id='prefix__Ellipse_60'
          cx='3.615'
          cy='3.615'
          r='3.615'
          className='prefix__cls-1'
          data-name='Ellipse 60'
          transform='translate(5.892)'
          style={{ fill: active ? '#656ded' : '#444444' }}
        />
      </g>
    </g>
  </MenuSvg>
);

export const GuidesIcon = () => (
  <MenuSvg
    xmlns='http://www.w3.org/2000/svg'
    id='prefix__description-24px'
    width={20}
    height={20}
    viewBox='0 0 20 20'
  >
    <path
      id='prefix__Path_354'
      d='M0 0h20v20H0z'
      data-name='Path 354'
      style={{ fill: 'none' }}
    />
    <path
      id='prefix__Path_355'
      d='M13.375 2h-7.5a1.939 1.939 0 0 0-1.866 2L4 20a1.939 1.939 0 0 0 1.866 2h11.259A1.946 1.946 0 0 0 19 20V8zm1.875 16h-7.5v-2h7.5zm0-4h-7.5v-2h7.5zm-2.812-5V3.5L17.594 9z'
      data-name='Path 355'
      transform='translate(-1 -2)'
      style={{ fill: '#444' }}
    />
  </MenuSvg>
);

export const RoadmapIcon = () => (
  <MenuSvg
    xmlns='http://www.w3.org/2000/svg'
    width={20}
    height={20}
    viewBox='0 0 20 20'
  >
    <g id='prefix__explore-24px' transform='translate(-5 -5)'>
      <path
        id='prefix__Path_356'
        d='M12 10.9a1.1 1.1 0 1 0 1.1 1.1 1.1 1.1 0 0 0-1.1-1.1zM12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm2.19 12.19L6 18l3.81-8.19L18 6z'
        data-name='Path 356'
        transform='translate(3 3)'
        style={{ fill: '#444' }}
      />
    </g>
  </MenuSvg>
);

export const PolicyIcon = ({ active }) => (
  <MenuSvg
    xmlns='http://www.w3.org/2000/svg'
    id='prefix__policy-24px'
    width={20}
    height={20}
    viewBox='0 0 20 20'
  >
    <g id='prefix__Group_149' data-name='Group 149'>
      <path
        id='prefix__Rectangle_2125'
        d='M0 0H20V20H0z'
        data-name='Rectangle 2125'
        style={{ fill: 'none' }}
      />
    </g>
    <g id='prefix__Group_151' data-name='Group 151' transform='translate(2)'>
      <g id='prefix__Group_150' data-name='Group 150'>
        <path
          id='prefix__Path_253'
          d='M18.556 4.636L10.778 1 3 4.636v5.455C3 15.136 6.319 19.855 10.778 21a9.743 9.743 0 0 0 5.081-3.373l-2.7-2.836a4.157 4.157 0 0 1-5.436-.582 4.718 4.718 0 0 1 0-6.427 4.174 4.174 0 0 1 6.11 0 4.73 4.73 0 0 1 .557 5.718l2.51 2.636a12.015 12.015 0 0 0 1.659-6.045z'
          className='prefix__cls-2'
          data-name='Path 253'
          transform='translate(-3 -1)'
          style={{ fill: active ? '#656ded' : '#444444' }}
        />
        <circle
          id='prefix__Ellipse_47'
          cx={3}
          cy={3}
          r={3}
          className='prefix__cls-2'
          data-name='Ellipse 47'
          transform='translate(4.778 7)'
          style={{ fill: active ? '#656ded' : '#444444' }}
        />
      </g>
    </g>
  </MenuSvg>
);

export const HelpIcon = ({ active }) => (
  <MenuSvg
    xmlns='http://www.w3.org/2000/svg'
    id='prefix__help-24px_1_'
    width={20}
    height={20}
    data-name='help-24px (1)'
    viewBox='0 0 20 20'
  >
    <path
      id='prefix__Path_373'
      d='M0 0h20v20H0z'
      data-name='Path 373'
      style={{ fill: 'none' }}
    />
    <path
      id='prefix__Path_374'
      d='M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 17h-2v-2h2zm2.07-7.75l-.9.92a3.5 3.5 0 0 0-1.04 1.69A4.587 4.587 0 0 0 13 15h-2v-.5a4.046 4.046 0 0 1 .22-1.31 4 4 0 0 1 .95-1.52l1.24-1.26a1.963 1.963 0 0 0 .55-1.8 1.991 1.991 0 0 0-1.39-1.53 2.016 2.016 0 0 0-2.47 1.27.883.883 0 0 1-.82.65h-.3a.866.866 0 0 1-.82-1.12 4.008 4.008 0 0 1 3.23-2.83 4.068 4.068 0 0 1 3.87 1.8 3.307 3.307 0 0 1-.19 4.4z'
      data-name='Path 374'
      transform='translate(-2 -2)'
      style={{ fill: active ? '#656ded' : '#444444' }}
    />
  </MenuSvg>
);

export const SettingsIcon = ({ active }) => (
  <MenuSvg
    xmlns='http://www.w3.org/2000/svg'
    width='19.454'
    height={20}
    viewBox='0 0 19.454 20'
  >
    <g
      id='prefix__settings-24px_1_'
      data-name='settings-24px (1)'
      transform='translate(-2.271 -2)'
    >
      <path
        id='prefix__Path_372'
        d='M19.43 12.98a7.793 7.793 0 0 0 .07-.98 7.793 7.793 0 0 0-.07-.98l2.11-1.65a.5.5 0 0 0 .12-.64l-2-3.46a.5.5 0 0 0-.61-.22l-2.49 1a7.306 7.306 0 0 0-1.69-.98l-.38-2.65A.488.488 0 0 0 14 2h-4a.488.488 0 0 0-.49.42l-.38 2.65a7.683 7.683 0 0 0-1.69.98l-2.49-1a.488.488 0 0 0-.61.22l-2 3.46a.493.493 0 0 0 .12.64l2.11 1.65a7.931 7.931 0 0 0-.07.98 7.931 7.931 0 0 0 .07.98l-2.11 1.65a.5.5 0 0 0-.12.64l2 3.46a.5.5 0 0 0 .61.22l2.49-1a7.306 7.306 0 0 0 1.69.98l.38 2.65A.488.488 0 0 0 10 22h4a.488.488 0 0 0 .49-.42l.38-2.65a7.683 7.683 0 0 0 1.69-.98l2.49 1a.488.488 0 0 0 .61-.22l2-3.46a.5.5 0 0 0-.12-.64zM12 15.5a3.5 3.5 0 1 1 3.5-3.5 3.5 3.5 0 0 1-3.5 3.5z'
        data-name='Path 372'
        style={{ fill: active ? '#656ded' : '#444444' }}
      />
    </g>
  </MenuSvg>
);

export const ProfileIcon = ({ active }) => (
  <MenuSvg
    xmlns='http://www.w3.org/2000/svg'
    width={20}
    height={20}
    viewBox='0 0 20 20'
  >
    <g id='prefix__account_circle-24px' transform='translate(-2 -2)'>
      <path
        id='prefix__Path_376'
        d='M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 3a3 3 0 1 1-3 3 3 3 0 0 1 3-3zm0 14.2a7.2 7.2 0 0 1-6-3.22c.03-1.99 4-3.08 6-3.08s5.97 1.09 6 3.08a7.2 7.2 0 0 1-6 3.22z'
        data-name='Path 376'
        style={{ fill: active ? '#656ded' : '#444444' }}
      />
    </g>
  </MenuSvg>
);

export const LinkIcon = ({ active }) => (
  <MenuSvg
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
      style={{ fill: active ? '#656ded' : '#444444' }}
      d='M18 16.08a2.912 2.912 0 0 0-1.96.77L8.91 12.7A3.274 3.274 0 0 0 9 12a3.274 3.274 0 0 0-.09-.7l7.05-4.11A2.993 2.993 0 1 0 15 5a3.274 3.274 0 0 0 .09.7L8.04 9.81a3 3 0 1 0 0 4.38l7.12 4.16a2.821 2.821 0 0 0-.08.65A2.92 2.92 0 1 0 18 16.08z'
      data-name='Path 390'
    />
  </MenuSvg>
);

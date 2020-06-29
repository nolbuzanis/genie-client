import React from 'react';
import styled from 'styled-components';

const PlatformList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  max-width: 400px;
  width: 100%;
  padding: 25px 0 0;
`;

const SpotifySvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={68} height={68} viewBox="0 0 68 68">
    <defs>
      <filter id="Rectangle_2208" x={0} y={0} width={68} height={68} filterUnits="userSpaceOnUse">
        <feOffset dy={3} input="SourceAlpha" />
        <feGaussianBlur stdDeviation={3} result="blur" />
        <feFlood floodOpacity="0.161" />
        <feComposite operator="in" in2="blur" />
        <feComposite in="SourceGraphic" />
      </filter>
    </defs>
    <g id="Group_431" data-name="Group 431" transform="translate(-15 -538)">
      <g transform="matrix(1, 0, 0, 1, 15, 538)" filter="url(#Rectangle_2208)">
        <rect id="Rectangle_2208-2" data-name="Rectangle 2208" width={50} height={50} rx={5} transform="translate(9 6)" fill="#fff" />
      </g>
      <g id="spotify_2_copy" data-name="spotify (2) copy" transform="translate(29 549)">
        <circle id="Oval" cx={20} cy={20} r={20} fill="#1db954" />
        <g id="Group" transform="translate(6.616 10.742)">
          <path id="Path" d="M19.43,5.378v0a1.536,1.536,0,0,1-.849-.28C13.636,2.167,7.881,2.045,2.2,3.19a5.133,5.133,0,0,1-.944.2A1.224,1.224,0,0,1,0,2.161,1.24,1.24,0,0,1,1.08.851C7.571-.559,14.206-.435,19.864,2.894a1.317,1.317,0,0,1,.77,1.286A1.189,1.189,0,0,1,19.43,5.378Z" transform="translate(2.138 12.978)" fill="#fff" />
          <path id="Path-2" data-name="Path" d="M22.37,6.6h0a1.985,1.985,0,0,1-.976-.327A26.065,26.065,0,0,0,2.48,3.983a3.3,3.3,0,0,1-.944.2A1.525,1.525,0,0,1,0,2.675,1.538,1.538,0,0,1,1.229,1.062,27.031,27.031,0,0,1,8.98,0,28.11,28.11,0,0,1,23.01,3.548a1.621,1.621,0,0,1,.9,1.535A1.524,1.524,0,0,1,22.37,6.6Z" transform="translate(1.332 6.641)" fill="#fff" />
          <path id="Path-3" data-name="Path" d="M1.379,1.184A33.708,33.708,0,0,1,10.694,0c5.786,0,11.85,1.184,16.281,3.727A1.825,1.825,0,0,1,28,5.488,1.822,1.822,0,0,1,26.159,7.3l0,0A1.846,1.846,0,0,1,25.133,7C19.492,3.685,9.4,2.89,2.87,4.684a3.871,3.871,0,0,1-1.024.2A1.814,1.814,0,0,1,0,3.045,1.847,1.847,0,0,1,1.379,1.184Z" transform="translate(0 0)" fill="#fff" />
        </g>
      </g>
    </g>
  </svg>
);
const YoutubeSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={68} height={68} viewBox="0 0 68 68">
    <defs>
      <filter id="prefix__Rectangle_2208" width={68} height={68} x={0} y={0} filterUnits="userSpaceOnUse">
        <feOffset dy={3} />
        <feGaussianBlur result="blur" stdDeviation={3} />
        <feFlood floodOpacity=".161" />
        <feComposite in2="blur" operator="in" />
        <feComposite in="SourceGraphic" />
      </filter>
      <style dangerouslySetInnerHTML={{ __html: "\n            .prefix__cls-1{fill:#fff}\n        " }} />
    </defs>
    <g id="prefix__Group_455" data-name="Group 455" transform="translate(-252 -580)">
      <g filter="url(#prefix__Rectangle_2208)" transform="translate(252 580)">
        <rect id="prefix__Rectangle_2208-2" width={50} height={50} className="prefix__cls-1" data-name="Rectangle 2208" rx={5} transform="translate(9 6)" />
      </g>
      <g id="prefix__iconfinder_youtube_317714_1_" data-name="iconfinder_youtube_317714 (1)" transform="translate(267 592.336)">
        <path id="prefix__Path_398" fill="#e02f2f" d="M37.825 10.186s-.373-2.81-1.518-4.048a5.271 5.271 0 0 0-3.828-1.723C27.132 4 19.112 4 19.112 4h-.018s-8.02 0-13.366.414A5.273 5.273 0 0 0 1.9 6.138C.756 7.375.382 10.186.382 10.186A65.65 65.65 0 0 0 0 16.781v3.091a65.627 65.627 0 0 0 .382 6.6s.373 2.805 1.518 4.04c1.455 1.622 3.362 1.573 4.212 1.743 3.056.313 12.991.41 12.991.41s8.028-.014 13.375-.424a5.294 5.294 0 0 0 3.828-1.727c1.144-1.235 1.518-4.044 1.518-4.044a65.658 65.658 0 0 0 .382-6.6v-3.088a65.658 65.658 0 0 0-.381-6.596z" data-name="Path 398" />
        <path id="prefix__Path_399" d="M12 10v17.2l14.332-8.6z" className="prefix__cls-1" data-name="Path 399" transform="translate(1.029 -.267)" />
      </g>
    </g>
  </svg>
);
const AppleSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={68} height={68} viewBox="0 0 68 68">
    <defs>
      <linearGradient id="prefix__linear-gradient" x1="-.458" x2="1.475" y1="-.371" y2="1.368" gradientUnits="objectBoundingBox">
        <stop offset=".064" stopColor="#fb413e" />
        <stop offset=".382" stopColor="#ff3c32" />
        <stop offset=".52" stopColor="#ad69e3" stopOpacity=".749" />
        <stop offset=".629" stopColor="#5dc4f9" />
        <stop offset=".963" stopColor="#60c2f8" />
      </linearGradient>
      <filter id="prefix__Rectangle_2214" width={68} height={68} x={0} y={0} filterUnits="userSpaceOnUse">
        <feOffset dy={3} />
        <feGaussianBlur result="blur" stdDeviation={3} />
        <feFlood floodOpacity=".161" />
        <feComposite in2="blur" operator="in" />
        <feComposite in="SourceGraphic" />
      </filter>
    </defs>
    <g id="prefix__Group_456" data-name="Group 456" transform="translate(-208 -569)">
      <g filter="url(#prefix__Rectangle_2214)" transform="translate(208 569)">
        <rect id="prefix__Rectangle_2214-2" width={50} height={50} fill="#fff" data-name="Rectangle 2214" rx={5} transform="translate(9 6)" />
      </g>
      <g id="prefix__iconfinder_Applemusicandroid_5584525" transform="translate(157.5 434.782)">
        <path id="prefix__Path_401" fill="url(#prefix__linear-gradient)" d="M360.364 338.09a1.744 1.744 0 0 1 1.487.381 1.7 1.7 0 0 1 .648 1.373v19.565a5.23 5.23 0 0 1-5.721 5.721 4.647 4.647 0 0 1-3.013-.953 3.1 3.1 0 0 1-1.182-2.479 3.935 3.935 0 0 1 1.487-3.127 5.758 5.758 0 0 1 3.852-1.259 6.365 6.365 0 0 1 1.869.305.11.11 0 0 0 .076-.038.034.034 0 0 0 .038-.038v-12.587a.224.224 0 0 0-.114-.191.218.218 0 0 0-.229-.076l-14.3 2.746a.36.36 0 0 0-.305.381v15.408a5.23 5.23 0 0 1-5.721 5.721 4.528 4.528 0 0 1-3.013-.992 3 3 0 0 1-1.182-2.441 3.935 3.935 0 0 1 1.487-3.127 5.758 5.758 0 0 1 3.852-1.259 6.364 6.364 0 0 1 1.869.305.11.11 0 0 0 .076-.038.034.034 0 0 0 .038-.038v-17.7a2.631 2.631 0 0 1 .572-1.678 2.411 2.411 0 0 1 1.526-.915z" data-name="Path 401" transform="translate(-264 -188.225)" />
      </g>
    </g>
  </svg>
);
const SoundCloudSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={68} height={68} viewBox="0 0 68 68">
    <defs>
      <filter id="prefix__Rectangle_2212" width={68} height={68} x={0} y={0} filterUnits="userSpaceOnUse">
        <feOffset dy={3} />
        <feGaussianBlur result="blur" stdDeviation={3} />
        <feFlood floodOpacity=".161" />
        <feComposite in2="blur" operator="in" />
        <feComposite in="SourceGraphic" />
      </filter>
      <style dangerouslySetInnerHTML={{ __html: "\n            .prefix__cls-3{fill:#f70}\n        " }} />
    </defs>
    <g id="prefix__Group_440" data-name="Group 440" transform="translate(-146 -662)">
      <g id="prefix__Group_439" data-name="Group 439" filter="url(#prefix__Rectangle_2212)" transform="translate(146 662)">
        <rect id="prefix__Rectangle_2212-2" width={50} height={50} fill="#fff" data-name="Rectangle 2212" rx={5} transform="translate(9 6)" />
      </g>
      <g id="prefix__soundcloud-logotype" transform="translate(161 677.372)">
        <g id="prefix__Group_354" data-name="Group 354" transform="translate(0 4.609)">
          <path id="prefix__Path_358" d="M1.648 11.094v-.006c-.024-.1-.083-.165-.154-.165s-.13.069-.154.165v.006a14.022 14.022 0 0 0-.265 1.915C1.022 13.665 1 14.3 1 14.9s.024 1.252.074 1.895a13.614 13.614 0 0 0 .263 1.913.019.019 0 0 0 0 .007.268.268 0 0 0 .052.106l.015.019a.118.118 0 0 0 .085.039.129.129 0 0 0 .087-.039l.015-.019a.256.256 0 0 0 .052-.106.019.019 0 0 0 0-.007 14.185 14.185 0 0 0 .264-1.908c.05-.645.076-1.28.074-1.891s-.022-1.241-.072-1.895a13.512 13.512 0 0 0-.261-1.92z" className="prefix__cls-3" data-name="Path 358" transform="translate(.85 .772)" />
          <path id="prefix__Path_359" d="M.382 12.142c-.013-.054-.048-.1-.091-.1s-.076.043-.089.1a8.015 8.015 0 0 0-.156 1.12c-.03.387-.043.759-.043 1.111s.013.733.043 1.115A8.285 8.285 0 0 0 .2 16.609a.12.12 0 0 0 .031.061l.007.011a.074.074 0 0 0 .05.026.07.07 0 0 0 .05-.026l.009-.011a.145.145 0 0 0 .03-.061 8.039 8.039 0 0 0 .154-1.12c.03-.38.044-.752.043-1.111s-.013-.728-.043-1.115a7.322 7.322 0 0 0-.149-1.121z" className="prefix__cls-3" data-name="Path 359" transform="translate(0 1.723)" />
          <path id="prefix__Path_360" d="M2.947 10.3v-.007c-.033-.131-.117-.23-.217-.23s-.183.1-.215.23a.01.01 0 0 1 0 .007 19.13 19.13 0 0 0-.37 2.684c-.07.919-.106 1.809-.1 2.648 0 .861.033 1.754.1 2.656a19.134 19.134 0 0 0 .369 2.68.013.013 0 0 1 0 .007.349.349 0 0 0 .074.148.084.084 0 0 0 .022.022.165.165 0 0 0 .12.057.172.172 0 0 0 .12-.057.126.126 0 0 0 .022-.022.372.372 0 0 0 .074-.148v-.007a19.413 19.413 0 0 0 .369-2.68c.07-.9.106-1.795.1-2.652s-.031-1.734-.1-2.652a19.384 19.384 0 0 0-.368-2.684z" className="prefix__cls-3" data-name="Path 360" transform="translate(1.735 .04)" />
          <path id="prefix__Path_361" d="M4.271 9.948v-.009c-.037-.146-.128-.256-.241-.256s-.2.109-.239.256v.009a21.068 21.068 0 0 0-.411 2.978c-.078 1.02-.117 2.011-.115 2.945 0 .956.037 1.947.117 2.948a21.257 21.257 0 0 0 .402 2.981v.011a.386.386 0 0 0 .081.163.108.108 0 0 0 .028.026.191.191 0 0 0 .133.065.2.2 0 0 0 .136-.065.108.108 0 0 0 .024-.026.4.4 0 0 0 .081-.163.026.026 0 0 1 0-.011 21.617 21.617 0 0 0 .409-2.976c.078-1 .117-1.993.115-2.945s-.035-1.928-.115-2.948a21.052 21.052 0 0 0-.405-2.983z" className="prefix__cls-3" data-name="Path 361" transform="translate(2.776 -.286)" />
          <path id="prefix__Path_362" d="M5.762 8.3s-.006-.007-.006-.011c-.044-.185-.161-.32-.3-.32s-.256.137-.3.32c0 0 0 .007-.006.011a26.7 26.7 0 0 0-.517 3.745c-.1 1.283-.146 2.528-.143 3.7 0 1.2.046 2.445.144 3.708a26.986 26.986 0 0 0 .515 3.741s.006.007.006.015a.488.488 0 0 0 .1.206c.009.015.019.019.03.033a.218.218 0 0 0 .337 0c.011-.015.02-.019.031-.033a.535.535 0 0 0 .1-.206c0-.007.006-.011.006-.015a27.27 27.27 0 0 0 .515-3.741c.1-1.263.146-2.508.146-3.7 0-1.178-.044-2.422-.144-3.7A26.694 26.694 0 0 0 5.762 8.3z" className="prefix__cls-3" data-name="Path 362" transform="translate(3.826 -1.749)" />
          <path id="prefix__Path_363" d="M24.835 10.593a9.706 9.706 0 0 0-17-1.719v17.51h19.434a2.688 2.688 0 0 0 2-.8 8.631 8.631 0 0 0-4.436-14.991z" className="prefix__cls-3" data-name="Path 363" transform="translate(6.674 -4.609)" />
          <path id="prefix__Path_364" d="M7.337 7.27s-.006-.009-.006-.015c-.05-.207-.182-.359-.339-.359s-.287.152-.337.359c0 .006-.006.009-.006.015a30.071 30.071 0 0 0-.582 4.213c-.111 1.441-.165 2.841-.161 4.163 0 1.352.052 2.752.163 4.171a30.154 30.154 0 0 0 .58 4.21s.006.007.006.015a.567.567 0 0 0 .115.232c.011.019.022.022.035.037a.244.244 0 0 0 .38 0 .215.215 0 0 0 .033-.037.567.567 0 0 0 .115-.232c0-.007.006-.011.006-.015a30.719 30.719 0 0 0 .58-4.21c.109-1.419.163-2.817.163-4.163 0-1.328-.05-2.728-.161-4.169a29.725 29.725 0 0 0-.584-4.215z" className="prefix__cls-3" data-name="Path 364" transform="translate(5.033 -2.66)" />
        </g>
      </g>
    </g>
  </svg>

);
const DeezerSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={68} height={68} viewBox="0 0 68 68">
    <defs>
      <filter id="prefix__Rectangle_2212" width={68} height={68} x={0} y={0} filterUnits="userSpaceOnUse">
        <feOffset dy={3} />
        <feGaussianBlur result="blur" stdDeviation={3} />
        <feFlood floodOpacity=".161" />
        <feComposite in2="blur" operator="in" />
        <feComposite in="SourceGraphic" />
      </filter>
    </defs>
    <g id="prefix__Group_438" data-name="Group 438" transform="translate(-41 -670)">
      <g filter="url(#prefix__Rectangle_2212)" transform="translate(41 670)">
        <rect id="prefix__Rectangle_2212-2" width={50} height={50} fill="#fff" data-name="Rectangle 2212" rx={5} transform="translate(9 6)" />
      </g>
      <path id="prefix__iconfinder_deezer_4691336" d="M17.866 21.56h5.311v-1.608h-5.314v1.608zm-11.909 0h5.309v-1.608h-5.31v1.608zM0 21.56h5.311v-1.608H0v1.608zm11.909 0h5.317v-1.608h-5.317v1.608zm11.915 0h5.311v-1.608h-5.311v1.608zm0-2.093h5.311v-1.6h-5.311v1.615zm-11.914 0h5.329v-1.6h-5.33v1.615zm-11.91 0h5.318v-1.6H0v1.615zm5.96 0h5.317v-1.6H5.96v1.627-.012zm11.933 0h5.317v-1.6h-5.339v1.627l.021-.012zm0-2.088h5.317v-1.6h-5.339v1.615h.021zm-11.9 0h5.293v-1.6H5.96v1.615h.02zm-5.956 0h5.292v-1.6H0v1.615h.019zm11.909 0h5.317v-1.6h-5.342v1.615h.019zm11.927 0h5.262v-1.6h-5.311v1.615h.033zm0-2.088h5.262v-1.616h-5.311v1.61h.033zm-11.909 0h5.3v-1.616h-5.345v1.61h.04zm-11.909 0h5.286v-1.616H0v1.61h.036zm17.881 0h5.317v-1.616h-5.378v1.61h.053zm0-2.088h5.317v-1.614h-5.378v1.6h.053zM.055 13.2h5.286v-1.6H0v1.6h.036zm11.909 0h5.317v-1.6h-5.372v1.6h.039zm11.909 0h5.262v-1.611h-5.311V13.2h.033zm-11.964-2.1h5.317V9.492h-5.317zm11.915 0h5.311V9.491h-5.311zM11.909 9.008h5.317V7.4h-5.317zm11.915 0h5.311V7.4h-5.311zm0-2.094h5.311V5.3h-5.311z" transform="translate(60 687.831)" />
    </g>
  </svg>
);
const TidalSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={68} height={68} viewBox="0 0 68 68">
    <defs>
      <filter id="prefix__Rectangle_2212" width={68} height={68} x={0} y={0} filterUnits="userSpaceOnUse">
        <feOffset dy={3} />
        <feGaussianBlur result="blur" stdDeviation={3} />
        <feFlood floodOpacity=".161" />
        <feComposite in2="blur" operator="in" />
        <feComposite in="SourceGraphic" />
      </filter>
    </defs>
    <g id="prefix__Group_449" data-name="Group 449" transform="translate(-41 -753)">
      <g id="prefix__Group_446" data-name="Group 446" filter="url(#prefix__Rectangle_2212)" transform="translate(41 753)">
        <rect id="prefix__Rectangle_2212-2" width={50} height={50} fill="#fff" data-name="Rectangle 2212" rx={5} transform="translate(9 6)" />
      </g>
      <path id="prefix__iconfinder_tidal_4691505_1_" d="M15.2 3.992l-5.066 5.067-5.067-5.067L0 9.059l5.067 5.067 5.067-5.067 5.066 5.067-5.067 5.067L15.2 24.26l5.067-5.067-5.067-5.067 5.067-5.067L15.2 3.992zm5.1 5.067l5.035-5.035 5.035 5.035-5.035 5.035z" data-name="iconfinder_tidal_4691505 (1)" transform="translate(60 769.756)" />
    </g>
  </svg>
);
const PandoraSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={68} height={68} viewBox="0 0 68 68">
    <defs>
      <filter id="prefix__Rectangle_2212" width={68} height={68} x={0} y={0} filterUnits="userSpaceOnUse">
        <feOffset dy={3} />
        <feGaussianBlur result="blur" stdDeviation={3} />
        <feFlood floodOpacity=".161" />
        <feComposite in2="blur" operator="in" />
        <feComposite in="SourceGraphic" />
      </filter>
    </defs>
    <g id="prefix__Group_448" data-name="Group 448" transform="translate(-146 -753)">
      <g id="prefix__Group_446" data-name="Group 446" filter="url(#prefix__Rectangle_2212)" transform="translate(146 753)">
        <rect id="prefix__Rectangle_2212-2" width={50} height={50} fill="#fff" data-name="Rectangle 2212" rx={5} transform="translate(9 6)" />
      </g>
      <g id="prefix___x32_47-pandora" transform="translate(112.725 743.999)">
        <g id="prefix__Group_460" data-name="Group 460" transform="translate(55.275 26.001)">
          <g id="prefix___x35_3-pandora_4_">
            <g id="prefix__Group_459" data-name="Group 459">
              <g id="prefix__Group_458" data-name="Group 458">
                <g id="prefix__Group_457" data-name="Group 457">
                  <path id="prefix__Path_402" fill="#0d93f2" d="M80.323 35.729A11.082 11.082 0 0 0 69.192 26H55.275v28.76h7.171a1.8 1.8 0 0 0 1.792-1.8v-5.39h5.378a10.78 10.78 0 0 0 10.707-11.841z" data-name="Path 402" transform="translate(-55.275 -26.001)" />
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
);
const YoutubeMusicSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={68} height={68} viewBox="0 0 68 68">
    <defs>
      <filter id="prefix__Rectangle_2212" width={68} height={68} x={0} y={0} filterUnits="userSpaceOnUse">
        <feOffset dy={3} />
        <feGaussianBlur result="blur" stdDeviation={3} />
        <feFlood floodOpacity=".161" />
        <feComposite in2="blur" operator="in" />
        <feComposite in="SourceGraphic" />
      </filter>
      <style dangerouslySetInnerHTML={{ __html: "\n            .prefix__cls-1{fill:#fff}\n        " }} />
    </defs>
    <g id="prefix__Group_461" data-name="Group 461" transform="translate(-241 -715)">
      <g id="prefix__Group_448" data-name="Group 448" transform="translate(95 -38)">
        <g id="prefix__Group_446" data-name="Group 446" filter="url(#prefix__Rectangle_2212)" transform="translate(146 753)">
          <rect id="prefix__Rectangle_2212-2" width={50} height={50} className="prefix__cls-1" data-name="Rectangle 2212" rx={5} transform="translate(9 6)" />
        </g>
      </g>
      <g id="prefix__XMLID_167_" transform="translate(262 731.83)">
        <circle id="prefix__XMLID_791_" cx="14.5" cy="14.5" r="14.5" fill="red" transform="translate(0 .17)" />
        <path id="prefix__XMLID_42_" d="M49.687 42.668a7.018 7.018 0 1 1-7.018 7.018 7.028 7.028 0 0 1 7.018-7.018m0-.668a7.687 7.687 0 1 0 7.687 7.687A7.688 7.688 0 0 0 49.687 42z" className="prefix__cls-1" transform="translate(-34.982 -34.982)" />
        <path id="prefix__XMLID_274_" d="M72 72.686l6.517-4.01L72 65z" className="prefix__cls-1" transform="translate(-59.969 -54.139)" />
      </g>
    </g>
  </svg>
);
const NapsterSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={68} height={68} viewBox="0 0 68 68">
    <defs>
      <filter id="prefix__Rectangle_2212" width={68} height={68} x={0} y={0} filterUnits="userSpaceOnUse">
        <feOffset dy={3} />
        <feGaussianBlur result="blur" stdDeviation={3} />
        <feFlood floodOpacity=".161" />
        <feComposite in2="blur" operator="in" />
        <feComposite in="SourceGraphic" />
      </filter>
    </defs>
    <g id="prefix__Group_462" data-name="Group 462" transform="translate(-241 -715)">
      <g id="prefix__Group_448" data-name="Group 448" transform="translate(95 -38)">
        <g id="prefix__Group_446" data-name="Group 446" filter="url(#prefix__Rectangle_2212)" transform="translate(146 753)">
          <rect id="prefix__Rectangle_2212-2" width={50} height={50} fill="#fff" data-name="Rectangle 2212" rx={5} transform="translate(9 6)" />
        </g>
      </g>
      <g id="prefix__comp_x5F_224-napster" transform="translate(232.999 693.458)">
        <g id="prefix__Group_463" data-name="Group 463" transform="translate(26.001 37.542)">
          <path id="prefix__Path_403" d="M45.539 59.917a8.819 8.819 0 0 1-3.3 2 8.794 8.794 0 0 1-3.295-2zm2.881-13.073a11.775 11.775 0 0 1 4.559-2.371v10.558c0 14.37-21.484 14.252-21.484.02V44.466a11.771 11.771 0 0 1 4.552 2.384 10.742 10.742 0 0 1 12.373-.006zm-13.676-3.832A11.013 11.013 0 0 1 49.737 43a15.043 15.043 0 0 0-1.349.753 13.386 13.386 0 0 0-12.307.007 15.032 15.032 0 0 0-1.336-.747zm-5.875-1.461v4.539a6.116 6.116 0 0 0 .006 10.368c1.729 16.054 25 15.739 26.7.1l.02-.111a6.1 6.1 0 0 0 .013-10.362v-4.534a13.935 13.935 0 0 0-3.282.485 13.523 13.523 0 0 0-20.141.007 14.214 14.214 0 0 0-3.316-.492zM42.978 58.5s2.358-.02 4.015-.1a4.435 4.435 0 0 0 1.67-.426 3.419 3.419 0 0 0 1.716-3.1c-5.207-.04-6.544-.256-7.401 3.626zM34.1 54.88a3.418 3.418 0 0 0 1.716 3.1 4.4 4.4 0 0 0 1.67.426c1.657.072 4.015.1 4.015.1-.862-3.888-2.201-3.672-7.401-3.626zm11.076 8.083a1.36 1.36 0 0 0-.452-.478 9.029 9.029 0 0 1-4.971 0 1.362 1.362 0 0 0-.419.432 1.8 1.8 0 0 0-.242.629 6.172 6.172 0 0 0 6.3 0 1.541 1.541 0 0 0-.216-.583z" data-name="Path 403" transform="translate(-26.001 -37.542)" />
        </g>
      </g>
    </g>
  </svg>
);

const IconName = styled.p`
  color: ${props => props.color ? props.color : '#444444'};
  font-size: 12px;
  margin-top: -10px;
  font-weight: 400;
`;
const IconContainer = styled.div`
  text-align: center;
  margin-bottom: 15px;
  width: 33%;
`;

const list = {
  apple: { icon: <AppleSvg />, label: 'Apple Music' },
  spotify: { icon: <SpotifySvg />, label: 'Spotify' },
  youtube: { icon: <YoutubeSvg />, label: 'Youtube' },
  youtubeMusic: { icon: <YoutubeMusicSvg />, label: 'Youtube Music' },
  deezer: { icon: <DeezerSvg />, label: 'Deezer' },
  soundcloud: { icon: <SoundCloudSvg />, label: 'SoundCloud' },
  tidal: { icon: <TidalSvg />, label: 'Tidal' },
  pandora: { icon: <PandoraSvg />, label: 'Pandora' },
  napster: { icon: <NapsterSvg />, label: 'Napster' }
}

const PlatformIcons = ({ links, color, clickable }) => {

  const parsedLinks = Object.keys(links).sort();

  return (<PlatformList>
    {parsedLinks.map(key => (
      list[key] &&
      <IconContainer key={key} as={clickable && 'a'} href={clickable && links[key]} target='_blank'>
        {list[key].icon}
        <IconName color={color}>{list[key].label}</IconName>
      </IconContainer>
    ))}
  </PlatformList>);
};

export default PlatformIcons;
import React, { useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Link } from 'react-router-dom';
import PulseLoader from 'react-spinners/PulseLoader';
import { css } from "@emotion/core";

import Footer from '../../components/Footer';
import Header from '../../components/Header';
import defaultPic from './default-pic.png';
import { fetchAllArticles } from '../../api';

const Hero = styled.div`
  height: 400px;
  width: 100%;
  background-image: linear-gradient(to right, #4568dc 0%, #8872ff 100%);
  text-align: center;
`;
const Background = styled.div`
  width: 100%;
  //height: 100%;
  background: #efefef;
`;
const Heading = styled.h1`
  color: white;
  font-size: calc(32px + 2vw);
  font-weight: bold;
  padding-top: 180px;
`;
const SubHeading = styled.h2`
  font-size: calc(16px + 1.5vw);
  font-weight: 500;
  color: white;
`;
const Articles = styled.ul`
  width: 100%;
  min-height: 500px;
  padding: 75px 30px 60px;
  max-width: 900px;
  background: #efefef;
  list-style: none;
  margin: 0 auto;
  box-sizing: border-box;
`;

const Article = styled(Link)`
  box-sizing: border-box;
  display: flex;
  position: relative;
  cursor: pointer;
  justify-content: space-between;
  width: 100%;
  height: min-200px;
  background: white;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  padding-left: 20px;
`;
const ArticleTitle = styled.h3`
  font-size: 26px;
  font-weight: 600;
  padding-top: 30px;
  color: #444444;
  @media only screen and (max-width: 500px) {
    font-size: 18px;
  }
`;

const loadingStyles = css`
  position: relative;
  display: block;
  margin: 0 auto;
  text-align: center;
  top: 40%;
`;
const ArticleSubTitle = styled.p`
  font-size: 18px;
  color: #818181;
  font-weight: 500;
  padding-top: 15px;
  @media only screen and (max-width: 500px) {
    display: none;
  }
`;
const ArticleMeta = styled.p`
  font-size: 18px;
  font-weight: 500;
  color: #444444;
  padding-top: 15px;
  padding-bottom: 25px;
  @media only screen and (max-width: 500px) {
    font-size: 15px;
  }
`;
const ArticlePic = styled.div`
  background: url('${({ src }) => src || defaultPic}') center center no-repeat;
  background-size: cover;
  width: 220px;
  margin-left: 10px;
  paddin-bottom: 40px;
`;

const Guides = () => {
  const [articles, setArticles] = React.useState();
  useEffect(() => {
    const getAllArticles = async () => {
      const serverResponse = await fetchAllArticles();

      if (serverResponse.error) {
        return;
      }

      setArticles(serverResponse);
    };

    getAllArticles();
  }, []);

  return (
    <Background>
      <Header />
      <Hero>
        <Heading>Guides</Heading>
        <SubHeading>Discover the latest tips & tricks</SubHeading>
      </Hero>
      <Articles>
        {articles
          ? articles.map(item => (
              <Article key={item.id} to={`/article/${item.id}`}>
                <div>
                  <ArticleTitle>{item.title}</ArticleTitle>
                  <ArticleSubTitle>{item.subtitle}</ArticleSubTitle>
                  <ArticleMeta>
                    {moment(item.created_at).format('MMM D')} · {item.length}{' '}
                    min read
                  </ArticleMeta>
                </div>
                <ArticlePic src={item.img} />
              </Article>
            ))
          : <PulseLoader
          css={loadingStyles}
          size={40}
          //size={"150px"} this also works
          color='#656ded'
          loading={true}
        />}
      </Articles>
      <Footer />
    </Background>
  );
};

export default Guides;

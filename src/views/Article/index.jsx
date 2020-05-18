import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import { fetchArticle } from '../../api';
import moment from 'moment';
import PulseLoader from 'react-spinners/PulseLoader';
import { css } from "@emotion/core";

import Footer from '../../components/Footer';
import Header from '../../components/Header';

const loadingStyles = css`
  position: relative;
  display: block;
  margin: 0 auto;
  text-align: center;
  top: 40%;
`;

const Hero = styled.div`
  height: 400px;
  width: 100%;
  padding: 0 20px;
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
  font-size: calc(20px + 1.5vw);
  font-weight: bold;
  padding-top: 180px;
`;
const SubHeading = styled.h2`
  font-size: calc(15px + 1vw);
  font-weight: 400;
  padding-top: 30px;
  color: white;
`;
const Content = styled.div`
  max-width: 800px;
  font-size: calc(16px + 0.3vw);
  padding: 60px 0;
  margin: 0 auto;
  > * {
    color: #444444;
    line-height: 1.83;
  }
  > h1,
  h2,
  h3,
  h4 {
    padding: 15px 30px;
  }
  > * p {
    padding: 15px 30px;
    word-wrap: break-word;
  }
  > p {
    padding: 15px 30px;
    word-wrap: break-word;
  }
  > * img {
    max-width: 100%;
    margin: 15px auto 0;
  }
  > * a {
    color: #656ded;
  }
  > p a:hover {
    color: #656ded;
  }
`;
const Meta = styled.p`
  font-weight: 500;
  padding-bottom: 45px;
  padding: 0 30px 30px;
  line-height: 1.83;
`;
//const articleMarkdown = "<em>If you’ve already set up a profile with Genie, skip to step 3.</em>  ### 1. Create your account (it’s free!)  Navigate to the [Signup](/signup) page and fill out the required fields to create your account. Your information is secure and private as underlined in our [Privacy Policy](/privacy-policy) and [Terms of Service](/terms-of-service). We will never share your confidential information with anyone.  ![Create your account](https://firebasestorage.googleapis.com/v0/b/genie-guides/o/Screen%20Shot%202020-05-17%20at%209.44.48%20PM.png?alt=media&token=0db8779e-69e7-4104-b454-d29a9b8d8a5a)  ### 2. Enter your Spotify Artist URI  A Spotify Artist Unique Resource Identifier (URI) is unique to each artist on Spotify and Genie uses this to prefill out your profile, such as your name & photo. You can change these later under profile settings.  ![Enter your Spotify Artist URI](https://firebasestorage.googleapis.com/v0/b/genie-guides/o/Screen%20Shot%202020-05-18%20at%2011.28.11%20AM.png?alt=media&token=bf053599-121b-4a13-976b-a8a21e9d7d0e)  ### 3. Create a new release in Genie  In order to have your fans pre-save your latest release, you need to create the song on Genie and specify a release date. The “release date” is the date that Genie will save this song to your follower’s music libraries (Spotify, Apple Music, etc). <br> <br> You cannot create a new release of the song if the song does not exist first on Spotify. <br> <br> a. Click create new release on the releases page.  ![Create new release (1)](https://firebasestorage.googleapis.com/v0/b/genie-guides/o/Screen%20Shot%202020-05-17%20at%209.56.56%20PM.png?alt=media&token=21652a3b-e4c9-43cf-9230-42a0b5a31c8f)  b. Enter the Spotify URI of the song.  ![Create new release (2)](https://firebasestorage.googleapis.com/v0/b/genie-guides/o/Screen%20Shot%202020-05-17%20at%209.51.11%20PM.png?alt=media&token=11e30715-8076-46fa-bf30-8183604a2cf0)  c. If you have Genie Premium, optionally enter the Apple Music Song ID.  <br><br>d.  Select a release date.  ![Create new release (3)](https://firebasestorage.googleapis.com/v0/b/genie-guides/o/Screen%20Shot%202020-05-17%20at%209.51.25%20PM.png?alt=media&token=6c435c91-ffe8-401e-bc7d-0701889bfb03)  ### 4. Share your public artist page on Genie on other social media channels to attract followers.  These followers will carry over on each new release you set up!";

const Article = () => {
  const { id } = useParams();
  const [articleData, setArticleData] = useState();

  useEffect(() => {
    const getArticle = async () => {
      const serverResponse = await fetchArticle(id);

      if (serverResponse.error) {
        return;
      }
      setArticleData(serverResponse);
    };
    getArticle();
  }, [id]);

  if (!articleData) {
    return <PulseLoader
    css={loadingStyles}
    size={40}
    //size={"150px"} this also works
    color='#656ded'
    loading={true}
  />;
  }
  
  return (
    <Background>
      <Header />
      <Hero>
        <Heading>{articleData.title}</Heading>
        <SubHeading>
          {moment(articleData.created_at).format('MMM D')} ·{' '}
          {articleData.length} min read
        </SubHeading>
      </Hero>
      <Content>
        <Meta>{articleData.subtitle}</Meta>
        <ReactMarkdown source={articleData.content.replace(/  +/g, ' \n ')} escapeHtml={false} />
      </Content>
      <Footer />
    </Background>
  );
};

export default Article;

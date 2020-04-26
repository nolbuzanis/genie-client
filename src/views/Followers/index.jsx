import React from 'react';
import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroller';
import { useAuth } from '../../Context/authContext';
import { follow } from '../../api';

const List = styled.div`
  width: 100%;
  `;
const Header = styled.h1`
  margin: 0;
  text-align: center;
  font-size: 24px;
  padding: 40px 40px 0;
  font-weight: 600;
  color: #4568dc;
`;
const Total = styled.h2`
  font-size: 20px;
  font-weight: normal;
  padding-top: 5px;
  color: #4568dc;
  text-align: center;
`;
const FollowerCard = styled.div`
  display: flex;
`;
const FollowerPic = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;


const Followers = () => {

  const { user } = useAuth();
  React.useEffect(() => {

  });

  return <>
    <Header>Followers</Header>
    <Total>{user.followers}</Total>
    <List>
      <FollowerCard>
        <FollowerPic src='' />
      </FollowerCard>
    </List>
  </>
};

export default Followers;
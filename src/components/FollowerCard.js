import React from 'react';
import './Followers.css';

const FollowerCard = props => {
  const date = new Date(Date.parse(props.followerSince));

  return (
    <div className='myfollowers-card'>
      <div
        className='myfollowers-card-photo'
        style={{
          background: `url('${props.img}') center center no-repeat`,
          backgroundSize: 'cover'
        }}
      ></div>
      <div className='myfollowers-card-content'>
        <h3>{props.name}</h3>
        <p>follower since {date.toDateString()}</p>
      </div>
    </div>
  );
};

export default FollowerCard;

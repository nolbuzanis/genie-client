import React from 'react';
import './Followers.css';
import FollowerCard from './FollowerCard';
import { connect } from 'react-redux';
import { getMyFollowers } from '../actions';

class MyFollowers extends React.Component {
  componentDidMount() {
    this.props.getMyFollowers();
  }

  renderListOfFollowers = () => {
    if (!this.props.followers.followersData) {
      return null;
    }
    return this.props.followers.followersData.map(follower => {
      return (
        <FollowerCard
          name={follower.name}
          img={follower.img}
          followerSince={follower.Subscription.createdAt}
          key={follower.spotifyId}
        />
      );
    });
  };

  render() {
    return (
      <div
        style={{ backgroundColor: '#333333', width: '100%', height: '100vh' }}
      >
        <div className='myfollowers-container'>
          <div className='myfollowers-header'>
            <h1>My Followers</h1>
            <h2>{this.props.followers.total}</h2>
          </div>
          {this.renderListOfFollowers()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { followers: state.followers };
};

export default connect(
  mapStateToProps,
  { getMyFollowers }
)(MyFollowers);

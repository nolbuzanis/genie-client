import React from 'react';
import { connect } from 'react-redux';
import { logUserOut, recentBlast } from '../actions';
import './Dashboard.css';
import { Link } from 'react-router-dom';

class Profile extends React.Component {
  componentDidUpdate = () => {
    if (!this.props.mostRecent) {
      this.props.recentBlast();
    }
  };

  renderUserDetails = () => {
    return (
      <div className='dashbaord-container'>
        <div className='dashboard-col large'>
          <div className='dashboard-feature'>
            <span>Subscribers</span>
            <h3>0</h3>
          </div>
          <div className='dashboard-feature'>
            <span>New subscriptions this week</span>
            <h3>0</h3>
          </div>
          <div className='dashboard-feature'>
            <span>Total saves</span>
            <h3>0</h3>
          </div>
        </div>
        <div className='dashboard-col small'>
          <Link to='/' className='recent-blast-link'>
            See recent blast
          </Link>
          <div
            className='recent-blast-img'
            style={{
              background: `url('${
                this.props.mostRecent ? this.props.mostRecent.img : ''
              }') center center no-repeat`,
              backgroundSize: 'cover'
            }}
          ></div>
        </div>
      </div>
    );
  };

  render() {
    return <div>{this.renderUserDetails()}</div>;
  }
}

const mapStateToProps = state => {
  return { auth: state.auth, mostRecent: state.blasts.mostRecent };
};

export default connect(
  mapStateToProps,
  { logUserOut, recentBlast }
)(Profile);

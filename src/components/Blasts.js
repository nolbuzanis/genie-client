import React from 'react';
import { Link } from 'react-router-dom';
import './Blasts.css';
import { connect } from 'react-redux';
import { recentBlast } from '../actions';

class Blasts extends React.Component {
  componentDidMount() {
    if (!this.props.mostRecent) {
      this.props.recentBlast();
    }
  }

  renderMostRecentBlast = () => {
    if (!this.props.mostRecent) {
      return (
        <div className='blasts-column recent'>
          <div className='recent-blast-header'>Recent Blast</div>
          <div className='recent-blast-background'></div>
        </div>
      );
    }
    return (
      <div className='blasts-column recent'>
        <div className='recent-blast-header'>Recent Blast</div>
        <div
          className='recent-blast-background'
          style={{
            background: `url('${this.props.mostRecent.img}') center center no-repeat`,
            backgroundSize: 'cover'
          }}
        ></div>
        <Link to='/' className='recent-blast-button'>
          view results
        </Link>
      </div>
    );
  };

  render() {
    return (
      <div style={{ paddingTop: '120px' }} className='blast-container'>
        {this.renderMostRecentBlast()}
        <div className='blasts-column selection'>
          <Link to='/blasts/new'>Make a new blast</Link>
          <Link to='/blasts/all'>See all blasts</Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { mostRecent: state.blasts.mostRecent };
};

export default connect(
  mapStateToProps,
  { recentBlast }
)(Blasts);

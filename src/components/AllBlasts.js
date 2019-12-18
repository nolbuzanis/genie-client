import React from 'react';
import './Blasts.css';
import { connect } from 'react-redux';
import { fetchMyBlasts } from '../actions';

class AllBlasts extends React.Component {
  componentDidMount = () => {
    if (!this.props.allBlasts) {
      console.log('Fetching my blasts...');
      this.props.fetchMyBlasts();
    }
  };

  renderSongBlast = () => {
    console.log(this.props.allBlasts);
    if (!this.props.allBlasts) {
      return null;
    }
    return this.props.allBlasts.map(blast => {
      return (
        <div className='song-blast'>
          <div
            className='blast-photo'
            style={{
              background: `url(${blast.img}) center center no-repeat`,
              backgroundSize: 'cover'
            }}
          ></div>
          <div className='blast-content'>
            <h3>{blast.songName}</h3>
            <span>{blast.spotifyURI}</span>
            <p>Created on {blast.createdAt}</p>
          </div>
          <div className='blast-saves'>{blast.saves}</div>
        </div>
      );
    });
  };

  render() {
    return (
      <div
        className='blast-container'
        style={{ paddingTop: '120px', display: 'block' }}
      >
        <h2>All Blasts</h2>
        <ul>{this.renderSongBlast()}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { allBlasts: state.blasts.all };
};

export default connect(
  mapStateToProps,
  { fetchMyBlasts }
)(AllBlasts);

import React from 'react';
import './Blasts.css';
import { connect } from 'react-redux';
import { newSongBlast } from '../actions';

class NewBlast extends React.Component {
  state = { songURI: '' };

  onFormSubmit = e => {
    let { songURI } = this.state;
    e.preventDefault();
    console.log(songURI);

    if (songURI.includes('spotify')) {
      // If string contains spotify:track:1293109hdq then return only the URI
      songURI = songURI.split(':')[2];
    }

    this.props.newSongBlast(songURI);
  };

  render() {
    return (
      <div className='newblast-container' style={{ paddingTop: '60px' }}>
        <form onSubmit={this.onFormSubmit}>
          <h1 className='new-blast-header'>Make a blast.</h1>
          <div>
            <div className='new-blast-description'>
              <span>Song URI: </span>
              <a>What is this?</a>
            </div>
            <input
              className='ui input'
              type='text'
              value={this.state.songURI}
              onChange={e => this.setState({ songURI: e.target.value })}
            ></input>
          </div>
          <button className='ui button'>Create</button>
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  { newSongBlast }
)(NewBlast);

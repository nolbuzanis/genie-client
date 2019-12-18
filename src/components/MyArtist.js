import React from 'react';
import './MyArtist.css';
import { connect } from 'react-redux';
import {
  artistURIEntered,
  editArtistPhoto,
  editArtistDetails
} from '../actions';
import styled from 'styled-components';

const StyledLink = styled.a`
  color: #8872ff;
  font-weight: 500;
  &:hover {
    color: #8872ff;
  }
`;

class MyArtist extends React.Component {
  state = {
    artistName: '',
    spotifyURI: '',
    artistDescription: '',
    enteredURI: '',
    errors: {
      enteredURI: ''
    },
    uploading: false,
    wasChanged: false
  };
  componentDidMount() {
    // Set it to run just after redux store populates with data
    setTimeout(() => {
      if (this.props.auth.user) {
        this.setState({ artistName: this.props.auth.user.artistName });
        this.setState({ spotifyURI: this.props.auth.user.spotifyURI });
        this.setState({ artistDescription: this.props.auth.user.desc });
      }
    }, 200);
  }

  submitNewArtistDetails = e => {
    e.preventDefault();

    if (
      !this.state.artistDescription ||
      !this.state.artistName ||
      !this.state.artistDescription
    ) {
      return;
    }

    const artist = {
      id: this.props.auth.user.userId,
      artistName: this.state.artistName,
      desc: this.state.artistDescription,
      spotifyURI: this.state.spotifyURI
    };
    this.props.editArtistDetails(artist);
  };

  onSubmitURI = e => {
    e.preventDefault();
    console.log('Button clicked!');
    let { enteredURI } = this.state;
    if (enteredURI === '') {
      this.setState({
        errors: {
          enteredURI: 'Please enter a valid URI'
        }
      });
      return;
    }
    if (enteredURI.includes('spotify')) {
      enteredURI = enteredURI.split(':')[2];
    }

    this.props.artistURIEntered(enteredURI);
  };

  render() {
    if (!this.props.auth.user) {
      return null;
    }
    if (this.props.auth.user.spotifyURI) {
      return (
        <div className='myartist-container'>
          <div className='artist-photo-section'>
            <p>Your photo:</p>
            <div
              className='artist-photo'
              style={{
                background: `url('${
                  this.props.auth ? this.props.auth.user.img : ''
                }') center center no-repeat`,
                backgroundSize: 'cover'
              }}
            ></div>
            <input
              onChange={e => {
                this.setState({ uploading: true });
                this.props.editArtistPhoto(e.target.files[0]);
              }}
              className='artist-file-input'
              type='file'
              name='file'
              id='file'
            ></input>
            <label for='file' className='artist-file-button'>
              {this.state.uploading ? 'Uploading...' : 'Upload'}
            </label>
          </div>
          <div className='artist-details-section'>
            <label>Artist name:</label>
            <input
              value={this.state.artistName}
              onChange={e =>
                this.setState({ artistName: e.target.value, wasChanged: true })
              }
            ></input>
            <label>Spotify URI:</label>
            <input
              className='artist-uri-input'
              value={this.state.spotifyURI}
              onChange={e =>
                this.setState({ spotifyURI: e.target.value, wasChanged: true })
              }
            ></input>
            <label className='artist-description-label'>Description:</label>
            <textarea
              className='artist-description-input'
              value={this.state.artistDescription}
              onChange={e =>
                this.setState({
                  artistDescription: e.target.value,
                  wasChanged: true
                })
              }
            ></textarea>
            <button
              className='update-button'
              onClick={e => this.submitNewArtistDetails(e)}
              style={{ visibility: `${this.state.wasChanged ? '' : 'hidden'}` }}
            >
              Update
            </button>
            <div style={{ textAlign: 'center' }}>
              <label>Your unique artist url: </label>
              <a href={'/artists/' + this.props.auth.user.userId}>
                www.idpt.com/artists/{this.props.auth.user.userId}
              </a>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className='myartist-container'>
        <div className='myartist-popup-content'>
          <h2>Welcome to Independent!</h2>
          <p>
            Your spotify artist URI is needed to start setting up your profile.
          </p>
          <form onSubmit={e => this.onSubmitURI(e)}>
            <input
              type='text'
              value={this.state.enteredURI}
              onChange={e => {
                this.setState({ enteredURI: e.target.value });
              }}
              placeholder='Spotify URI'
            ></input>
            <StyledLink
              target='_blank'
              href='https://distrokid.zendesk.com/hc/en-us/articles/360014159394-How-Do-I-Find-My-Spotify-Artist-URI-'
            >
              what is this?
            </StyledLink>
            <button type='submit'>Get Started</button>
            <p style={{ color: '#bd3200', paddingTop: '15px' }}>
              {this.state.errors.enteredURI}
            </p>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.auth };
};

export default connect(
  mapStateToProps,
  { artistURIEntered, editArtistPhoto, editArtistDetails }
)(MyArtist);

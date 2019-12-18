import React from 'react';
import './PublicProfile.css';
import { connect } from 'react-redux';
import { fetchArtistProfile } from '../actions';
import { Link } from 'react-router-dom';
import SocialIcon from './SocialIcon';

class PublicProfile extends React.Component {
  componentWillMount() {
    const { match } = this.props;
    if (!this.props.public) {
      console.log('Fetching artist profile');
      this.props.fetchArtistProfile(match.params.artistId);
    }
  }

  renderSocialIcon = icon => {
    if (icon) {
      return <SocialIcon name={icon} />;
    }
    return null;
  };

  render() {
    if (!this.props.public) {
      return null;
    }
    const {
      artistName,
      img,
      followerCount,
      desc,
      facebook,
      instagram,
      twitter,
      website
    } = this.props.public.artist;

    return (
      <div className='public-container'>
        <div
          className='artist-photo'
          style={{
            background: `url('${img}') center center no-repeat`,
            backgroundSize: 'cover'
          }}
        >
          <div className='artist-photo-overlay'></div>
          <Link to='/' className='logo'>
            idpt.
          </Link>
          <div className='artist-photo-content'>
            <h2>{artistName}</h2>
            <a
              className='follow-button'
              href={
                '/spotify/auth/' +
                this.props.history.location.pathname.split('/')[2]
              }
            >
              Follow
            </a>
            <p>{followerCount ? followerCount : '0'} followers</p>
          </div>
        </div>
        <div className='artist-info'>
          <h3>Bio</h3>
          <p>{desc}</p>
          {/*<h3>New Releases</h3>*/}
          {facebook | instagram | twitter | website ? <h3>Social</h3> : ''}
          <div className='social-icons'>
            {this.renderSocialIcon(facebook)}
            {this.renderSocialIcon(instagram)}
            {this.renderSocialIcon(twitter)}
            {this.renderSocialIcon(website)}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { public: state.public };
};

export default connect(
  mapStateToProps,
  { fetchArtistProfile }
)(PublicProfile);

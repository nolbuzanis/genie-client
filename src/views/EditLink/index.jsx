import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
//import { useHistory, Link } from 'react-router-dom';
import { useAuth } from '../../Context/authContext';
import Button from '../../components/Button';
import Header from '../../components/PageHeader';
import { uploadUserPhoto, updateUserProfile, getReleases } from '../../api';
import { useToasts } from 'react-toast-notifications';
import { Formik } from 'formik';
import * as Yup from 'yup';
import InputSection from '../../components/InternalInput';
import { useHistory, Link } from 'react-router-dom';
import Popup from '../../components/Popup';
import ClipLoader from 'react-spinners/ClipLoader';
import { css } from '@emotion/core';

const override = css`
  display: inline-block;
  margin-left: 15px;
`;

const Background = styled.div`
  position: relative;
  width: 100%;
  min-height: 100%;
  background: linear-gradient(90deg, #373b44 0%, #4286f4 100%);
  ${(props) =>
    props.img && `background: url(${props.img}) center center no-repeat;`}
  background-size: cover;
  text-align: center;
  color: white;
  padding-bottom: 40px;
`;
const Mask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  -webkit-backdrop-filter: blur(30px);
  backdrop-filter: blur(30px);
  background-color: rgba(0, 0, 0, 0.3);
`;
const FileInput = styled.input`
  visibility: hidden;
  display: none;
`;
const Content = styled.div`
  position: relative;
  z-index: 1;
`;
// const ArtistName = styled.h1`
//   text-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
//   font-size: 36px;
//   padding-top: 25px;
//   font-weight: 600;
//   color: white;
// `;
// const Bio = styled.p`
//   font-size: 18px;
//   font-weight: 500;
//   opacity: 0.9;
//   color: white;
//   padding-top: 25px;
//   padding-bottom: 10px;
// `;
const Heading = styled.h2`
  font-size: 20px;
  font-weight: 500;
  padding-top: 30px;
  color: #efefef;
`;
const SongCard = styled.div`
  width: 100%;
  position: relative;
  max-width: 400px;
  background: white;
  border-radius: 10px;
  margin: 15px auto 0;
  padding: 15px;
  justify-content: space-between;
`;
const AlbumCover = styled.img`
  display: block;
  width: 80px;
  height: 80px;
  margin: 0 auto;
  background-color: grey;
`;
const SongName = styled.p`
  color: #444444;
  font-size: 16px;
  font-weight: 500;
  padding-top: 10px;
`;
const ReleaseDate = styled.p`
  color: #444444;
  font-size: 14px;
`;
const SmallButtonWrapper = styled.div`
  width: 120px;
  padding: 10px 0 0;
  margin: 0 auto;
`;
const urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/;
const validationSchema = Yup.object().shape({
  name: Yup.string().trim().required('Name is required.'),
  //bio: Yup.string().trim().required('Bio is required.'),
  instagram: Yup.string().trim().matches(urlRegex, 'Must be a valid URL.'),
  facebook: Yup.string().trim().matches(urlRegex, 'Must be a valid URL.'),
  twitter: Yup.string().trim().matches(urlRegex, 'Must be a valid URL.'),
  website: Yup.string().trim().matches(urlRegex, 'Must be a valid URL.'),
});
const Form = styled.form`
  max-width: 560px;
  margin: 0 auto;
  padding: 0 30px;
`;
const Spacing = styled.div`
  height: 20px;
`;
const ViewLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  margin: 0 auto;
  font-size: 16px;
  padding: 5px;
  margin-top: 5px;
  font-weight: 500;
  color: white;
`;
const ViewArrow = styled.img`
  width: 16.1px;
  height: 16.1px;
  margin-left: 6px;
`;
const DropdownContainer = styled.div`
  background: white;
  position: absolute;
  left: 0;
  z-index: 1;
  right: 0;
  top: 0;
  overflow: hidden;
  border-radius: 5px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  padding: 20px;
`;
const DropdownHeader = styled.h2`
  color: #444444;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  padding-bottom: 25px;
`;
const SongContent = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  text-align: left;
`;
// const ReleaseList = styled.ul`
//   padding:
// `;
//const Message = styled.p``;

const DropdownAlbumCover = styled.img`
  margin-right: 15px;
  margin-left: 0;
  width: 60px;
  height: 60px;
`;

const parseDate = (timestamp) => {
  if (!timestamp) return '';
  if (timestamp._seconds) timestamp = timestamp._seconds * 1000;
  const date = new Date(timestamp);
  const parsed = date
    .toLocaleString('default', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
    .split(' ');
  return parsed[0] + '. ' + parsed[1] + ' ' + parsed[2];
};

const ReleasesDropdown = ({ user, setAuth, onClose }) => {
  const menuRef = useRef();
  const [songs, setSongs] = useState();
  const { addToast } = useToasts();
  const history = useHistory();

  useEffect(() => {
    const fetchReleases = async () => {
      const response = await getReleases();

      if (response.error) {
        console.log(response.error);
        addToast('Error fetching releases!', { appearance: 'error' });
      }

      //console.log(response);
      setSongs(response);
    };
    fetchReleases();
  }, [addToast]);

  const handleDropdownClick = (e) => {
    setTimeout(onClose, 10);
  };

  useEffect(() => {
    // add when mounted
    window.addEventListener('mousedown', handleDropdownClick);
    // return function to be called when unmounted
    return () => {
      window.removeEventListener('mousedown', handleDropdownClick);
    };
    // eslint-disable-next-line
  }, []);

  const handleReleaseClick = async ({ name, releaseDate, img, id, links }) => {
    if (user.latest && user.latest.songId === id) return;
    const newLatest = {
      name,
      releaseDate,
      img,
      songId: id,
      links,
    };

    const response = await updateUserProfile({ latest: newLatest });

    if (response.error) {
      return addToast('Error switching latest release', {
        appearance: 'error',
      });
    }

    //success, update user
    setAuth((prevState) => ({
      user: { ...prevState.user, latest: newLatest },
    }));
  };

  return (
    <DropdownContainer ref={menuRef}>
      <DropdownHeader>
        Select Latest
        {!songs && (
          <ClipLoader css={override} size={20} color='#444444' loading={true} />
        )}
      </DropdownHeader>
      {songs && songs.error && (
        <p>
          Oops! There was an error. Please send us a message and we'll sort it
          out!
        </p>
      )}
      {songs &&
        !songs.error &&
        (songs.length > 0 ? (
          songs.map((song, i) => {
            return (
              <SongContent onClick={() => handleReleaseClick(song)} key={i}>
                <DropdownAlbumCover src={song.img} />
                <div>
                  <SongName>{song.name}</SongName>
                  <ReleaseDate>{parseDate(song.releaseDate)}</ReleaseDate>
                </div>
              </SongContent>
            );
          })
        ) : (
          <p>No releases found. Create your first one below! </p>
        ))}
      <Spacing />
      <Button type='button' onClick={() => history.push('/releases/new')}>
        Add Release
      </Button>
    </DropdownContainer>
  );
};

const EditLink = () => {
  const { user, setAuth } = useAuth();
  const [uploading, setUploading] = useState(false);
  const { addToast } = useToasts();
  const [popup, setPopup] = useState(false);
  const history = useHistory();
  const [dropdown, setDropdown] = useState(false);

  const handlePhotoSubmit = async (e) => {
    const photo = e.target.files[0];
    setUploading(true);
    console.log(photo);
    //Api call
    const response = await uploadUserPhoto(photo);

    if (response.error) {
      console.log(response.error);
      addToast(response.error.message, { appearance: 'error' });
      return setUploading(false);
    }
    user.img = response;
    setAuth({ user });
    addToast('Profile picture saved.', { appearance: 'success' });
    return setUploading(false);

    // If success, show success alert
    // If error, show error alert
  };

  const initialValues = {
    name: user.name,
    bio: user.bio,
    instagram: user.instagram,
    facebook: user.facebook,
    twitter: user.twitter,
    website: user.website,
  };

  const handleFormSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    const response = await updateUserProfile(values);

    if (response.error) {
      addToast(response.error.message, { appearance: 'error' });
      return setSubmitting(false);
    }

    addToast('Profile saved.', { appearance: 'success' });
    setSubmitting(false);
    return setAuth({ user: { ...user, ...values } });
  };

  const handleAddPresave = () => {
    if (!user.uri && !user.deezerId) return setPopup('link_accounts');
    history.push('/presave/new');
  };

  return (
    <Background img={user.img}>
      <Popup open={popup ? true : false} setOpen={setPopup} type={popup} />
      <Mask />
      <Content>
        <Header alternate>Edit Your Link</Header>
        <ViewLink to={`/artist/${user.id}`} target='_blank'>
          View live <ViewArrow src='/assets/arrow-forward-white.png' />
        </ViewLink>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}
        >
          {(props) => (
            <Form onSubmit={props.handleSubmit}>
              <Spacing />
              <InputSection {...props} name='name' transparent large center />
              <Spacing />
              <InputSection
                {...props}
                name='bio'
                type='textarea'
                transparent
                center
                placeholder='What should your fans know about you?'
              />
              <Spacing />
              <FileInput
                onChange={(e) => handlePhotoSubmit(e)}
                className='artist-file-input'
                type='file'
                name='img'
                id='img'
              />
              <Button
                as='label'
                htmlFor='img'
                className='artist-file-button'
                disabled={uploading}
                isLoading={uploading}
                alternate
                style={{ borderColor: '#fff' }}
              >
                {uploading ? 'Uploading' : 'Change Background'}
              </Button>
              <Heading>Latest</Heading>
              <SongCard>
                {user.latest && (
                  <>
                    <AlbumCover src={user.latest.img} />
                    <SongName>{user.latest.name}</SongName>
                    <ReleaseDate>
                      {parseDate(user.latest.releaseDate)}
                    </ReleaseDate>
                  </>
                )}
                {dropdown && (
                  <ReleasesDropdown
                    onClose={() => setDropdown(false)}
                    user={user}
                    setAuth={setAuth}
                  />
                )}
                <SmallButtonWrapper>
                  <Button small type='button' onClick={() => setDropdown(true)}>
                    Select
                  </Button>
                </SmallButtonWrapper>
              </SongCard>
              <Heading>Upcoming</Heading>
              <SongCard>
                {user.upcoming ? (
                  <>
                    <AlbumCover src={user.upcoming.img} />
                    <SongName>{user.upcoming.name}</SongName>
                    <ReleaseDate>
                      {parseDate(user.upcoming.releaseDate)}
                    </ReleaseDate>
                    <SmallButtonWrapper>
                      <Button
                        small
                        type='button'
                        onClick={() => history.push('/presave/edit')}
                      >
                        Edit
                      </Button>
                    </SmallButtonWrapper>
                  </>
                ) : (
                  <SmallButtonWrapper>
                    <Button type='button' small onClick={handleAddPresave}>
                      Add
                    </Button>
                  </SmallButtonWrapper>
                )}
              </SongCard>
              <Heading>Social Media</Heading>
              <InputSection
                {...props}
                name='instagram'
                label='Instagram'
                placeholder='Optional'
                transparent
              />
              <InputSection
                {...props}
                name='facebook'
                label='Facebook'
                placeholder='Optional'
                transparent
              />
              <InputSection
                {...props}
                name='twitter'
                label='Twitter'
                placeholder='Optional'
                transparent
              />
              <InputSection
                {...props}
                name='website'
                label='Website'
                placeholder='Optional'
                transparent
              />
              <Spacing />
              <Button
                type='submit'
                disabled={!(props.isValid && props.dirty)}
                isLoading={props.isSubmitting}
              >
                {props.isSubmitting ? 'Saving' : 'Save'}
              </Button>
            </Form>
          )}
        </Formik>
      </Content>
    </Background>
  );
};

export default EditLink;

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import authContext from '../../Context/authContext';
import { uploadUserPhoto, updateUserProfile } from '../../api';
import { useAlert } from 'react-alert';

const Header = styled.h1`
  padding-top: 50px;
  padding-left: 30px;
`;
const UniqueLink = styled.p`
  overflow: hidden;
  font-size: 14px;
  padding-left: 30px;
  font-weight: 300;
  padding-top: 20px;
  > a {
    color: #9fc7ff;
    &:hover {
      color: #9fc7ff;
    }
  }
`;
const ArtistPhoto = styled.div`
  box-sizing: content-box;
  position: relative;
  width: 100%;
  background: url('${props => props.img}') center center no-repeat;
  background-size: cover;
  margin-top: 15px;
  min-width: 320px;
  height: calc(320px + 10vw);
  max-height: 420px;
  flex-basis: 320px;
  max-width: 420px;
  flex-grow: 1;
`;
const PhotoOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  top: 0;
  left: 0;
`;
const ChangePhotoButton = styled.label`
  display: block;
  background-color: white;
  width: 156px;
  height: 36px;
  font-weight: 300;
  font-size: 12px;
  border: 0;
  border-radius: 18px;
  box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.16);
  position: absolute;
  bottom: 35px;
  margin-left: -78px;
  left: 50%;
  text-align: center;
  line-height: 36px;
  cursor: pointer;
`;
const FileInput = styled.input`
  visibility: hidden;
`;
const SubmitButton = styled.button`
  display: block;
  background: ${props => props.disabled ? '#E3E3E3' : '#8872FF'};
  color: ${props => props.disabled ? '#ACACAC' : 'white'};
  font-size: 20px;
  height: 44px;
  width: 180px;
  border-radius: 10px;
  border: none;
  box-shadow: 4px 4px 6px rgba(0,0,0,0.16);
  margin: 30px auto;
`;
const Input = styled.input`
  box-sizing: border-box;
  display: block;
  width: 100%;
  border: ${props => {
    if (props.disabled) {
      return '1px solid #D8D8D8';
    } else {
      return props.error ? '1px solid #BD3200' : '1px solid #979797';
    }
  }};
  padding: 10px 15px;
  font-size: 16px;
  margin: 8px 0;
  line-height: 26px;
  height: 40px;
  background-color: ${props => (props.disabled ? '#D8D8D8' : '')};
`;
const Form = styled.form`
  width: 100%;
  
`;

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required.'),
  bio: Yup.string().required('Bio is required.'),
  uri: Yup.string().required('URI is required.'),
  instagram: Yup.string().url('Must be a valid URL.'),
  facebook: Yup.string().url('Must be a valid URL.'),
  twitter: Yup.string().url('Must be a valid URL.'),
  website: Yup.string().url('Must be a valid URL.')
});

const ErrorMsg = styled.label`
  display: block;
  font-size: 12px;
  color: #bd3200;
`;
const InputLabel = styled.p`
  font-size: 20px;
  padding-top: 5px;
`;
const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  //padding-bottom: 50px;
`;

const resizeTextArea = e => {
  e.target.style.height = '';
  e.target.style.resize = 'none';
  e.target.style.height = `${e.target.scrollHeight + 8}px`;
};
const ChangeUriLink = styled(Link)`
  display: inline-block;
  font-size: 12px;
  color: #525252;
  text-decoration: underline;
  margin-left: 6px;
  //margin-bottom: 20px;
  &:hover,
  &:active {
    color: #525252;
  }
`;
const Container = styled.div`
  max-width: 880px;
  margin: 0 auto;
`;
const FormContainer = styled.div`
flex-basis: 320px;
  max-width: 420px;
  flex-grow: 1;
  min-width: 320px;
  padding: 10px 30px;
  box-sizing: border-box;
`;

const InputSection = props => (
  <div>
    <InputLabel>{props.label}</InputLabel>
    <Input
      as={props.type === 'textarea' ? 'textarea' : ''}
      onClick={props.type === 'textarea' ? resizeTextArea : () => { }}
      onInput={props.type === 'textarea' ? resizeTextArea : () => { }}
      value={props.values[props.name]}
      type={props.type || 'text'}
      onChange={props.handleChange}
      onBlur={props.handleBlur}
      name={props.name}
      error={props.errors[props.name] && props.touched[props.name]}
      disabled={props.name === 'uri'}
    />
    {props.errors[props.name] && props.touched[props.name] && (
      <ErrorMsg>{props.errors[props.name]}</ErrorMsg>
    )}
  </div>
);

const EditProfile = () => {
  const { user, follower, setAuth } = React.useContext(authContext);
  const [uploading, setUploading] = React.useState(false);
  const alert = useAlert();

  const handlePhotoSubmit = async (e) => {
    const photo = e.target.files[0];
    setUploading(true);
    console.log(photo);
    //Api call
    const response = await uploadUserPhoto(photo);

    if (response.error) {
      console.log(response.error);
      alert.show('Error!');
      return setUploading(false);
    }
    user.img = response;
    setAuth({ user, follower });
    alert.show('Updated Picture!', { type: 'success' });
    return setUploading(false);

    // If success, show success alert
    // If error, show error alert
  }

  const initialValues = {
    name: user.name,
    bio: user.bio,
    uri: user.uri,
    instagram: user.instagramURL,
    facebook: user.facebookURL,
    twitter: user.twitterURL,
    website: user.websiteURL
  };

  const handleFormSubmit = async (values, { setSubmitting, resetForm }) => {

    setSubmitting(true);
    const response = await updateUserProfile(values);

    if (response.error) {
      alert.show('Error!');
      return setSubmitting(false);
    }


    alert.show('Updated Profile!', { type: 'success' });
    setSubmitting(false);
    return setAuth({ user: { ...user, ...values }, follower });

  };

  return (
    <Container>
      <Header>Edit Profile</Header>
      <UniqueLink>
        {'Your unique artist url: '}
        <Link to={'artist/' + user.uri}>{'www.idpt.artists/' + user.uri}</Link>
      </UniqueLink>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {props => (
          < Form onSubmit={props.handleSubmit}>
            {console.log(props)}
            <FlexContainer>
              <ArtistPhoto img={user.img}>
                <PhotoOverlay />
                <FileInput
                  onChange={e => handlePhotoSubmit(e)}
                  className='artist-file-input'
                  type='file'
                  name='img'
                  id='img'
                ></FileInput>
                <ChangePhotoButton htmlFor='img' className='artist-file-button' disabled={uploading}>
                  {uploading ? 'Uploading...' : 'Change Photo'}
                </ChangePhotoButton>
              </ArtistPhoto>
              <FormContainer>
                <InputSection {...props} name='name' label='Name'></InputSection>
                <InputSection
                  {...props}
                  name='bio'
                  label='Bio'
                  type='textarea'
                ></InputSection>
                <InputSection
                  {...props}
                  name='uri'
                  label='Spotify URI'
                ></InputSection>
                <ChangeUriLink to='#'>Need to change your spotify URI?</ChangeUriLink>
              </FormContainer>
            </FlexContainer>
            <SubmitButton type='submit' disabled={!props.isValid || !props.dirty}>
              {props.isSubmitting ? 'Submitting...' : 'Submit'}
            </SubmitButton>
          </Form>
        )}
      </Formik>

    </Container >
  );
};

export default EditProfile;

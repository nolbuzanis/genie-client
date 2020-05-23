import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../../Context/authContext';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { uploadUserPhoto, updateUserProfile } from '../../api';
import { useToasts } from 'react-toast-notifications';
import Button from '../../components/Button';
import Header from '../../components/PageHeader';
import InputSection from '../../components/InternalInput';

const ArtistPhoto = styled.img`
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin: 30px auto 0;
  display: block;
`;
const ChangePhotoButton = styled(Button)`
  width: 156px;
  cursor: pointer;
  height: 36px;
  //font-weight: 300;
  font-size: 12px;
  border-radius: 18px;
  box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.16);
  margin: 15px auto 0;
  text-align: center;
  line-height: 36px;
  color: white;
  background: linear-gradient(90deg, #8872ff, #4568dc);
  display: block;
`;
const FileInput = styled.input`
  visibility: hidden;
  display: none;
`;
const Form = styled.form`
  width: 100%;
  padding: 0 30px;
  box-sizing: border-box;
`;
const SubHeader = styled(Header)`
  font-size: 20px;
`;

const urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/;
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required('Name is required.'),
  bio: Yup.string()
    .trim()
    .required('Bio is required.'),
  instagram: Yup.string()
    .trim()
    .matches(urlRegex, 'Must be a valid URL.'),
  facebook: Yup.string()
    .trim()
    .matches(urlRegex, 'Must be a valid URL.'),
  twitter: Yup.string()
    .trim()
    .matches(urlRegex, 'Must be a valid URL.'),
  website: Yup.string()
    .trim()
    .matches(urlRegex, 'Must be a valid URL.')
});

// const ChangeUriLink = styled(Link)`
//   display: inline-block;
//   font-size: 12px;
//   color: #525252;
//   text-decoration: underline;
//   margin-left: 6px;
//   //margin-bottom: 20px;
//   &:hover,
//   &:active {
//     color: #525252;
//   }
// `;
const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;
const ButtonWrapper = styled.div`
  margin: 0 auto;
  padding: 25px 0 50px;
  width: 200px;
`;

const Profile = () => {
  const { user, follower, setAuth } = useAuth();
  const [uploading, setUploading] = React.useState(false);
  const { addToast } = useToasts();

  const handlePhotoSubmit = async e => {
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
    setAuth({ user, follower });
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
    website: user.website
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
    return setAuth({ user: { ...user, ...values }, follower });
  };

  return (
    <Container>
      <Header>Profile</Header>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {props => (
          <Form onSubmit={props.handleSubmit}>
            <ArtistPhoto src={user.img || '/default-user-256.png'} />
            <FileInput
              onChange={e => handlePhotoSubmit(e)}
              className='artist-file-input'
              type='file'
              name='img'
              id='img'
            />
            <ChangePhotoButton
              as='label'
              htmlFor='img'
              className='artist-file-button'
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : 'Change Photo'}
            </ChangePhotoButton>
            <InputSection {...props} name='name' label='Name' />
            <InputSection {...props} name='bio' label='Bio' type='textarea' />
            <SubHeader>Social Media</SubHeader>
            <InputSection
              {...props}
              name='instagram'
              label='Instagram'
              placeholder='Optional'
            />
            <InputSection
              {...props}
              name='facebook'
              label='Facebook'
              placeholder='Optional'
            />
            <InputSection
              {...props}
              name='twitter'
              label='Twitter'
              placeholder='Optional'
            />
            <InputSection
              {...props}
              name='website'
              label='Website'
              placeholder='Optional'
            />
            <ButtonWrapper>
              <Button type='submit' disabled={!(props.isValid && props.dirty)}>
                {props.isSubmitting ? 'Saving...' : 'Save'}
              </Button>
            </ButtonWrapper>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Profile;

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import authContext from '../../Context/authContext';

const Header = styled.h1`
  padding-top: 110px;
  padding-left: 30px;
`;
const UniqueLink = styled.p`
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
  visibility: ${props => (props.disabled ? 'hidden' : 'inherit')};
  background: #9fc7ff;
  color: black;
  font-size: 20px;
  height: 44px;
  width: 180px;
  border-radius: 10px;
  border: none;
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
  line-height: 22px;
  height: 40px;
  background-color: ${props => (props.disabled ? '#D8D8D8' : '')};
`;
const Form = styled.form`
  padding: 10px 30px;
  width: 100%;
  max-width: 420px;
  flex-basis: 320px;
  min-width: 320px;
  box-sizing: border-box;
  flex-grow: 1;
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
  margin-bottom: 20px;
  &:hover,
  &:active {
    color: #525252;
  }
`;
const Container = styled.div`
  max-width: 880px;
  margin: 0 auto;
`;
const FormContainer = styled(Formik)``;

const InputSection = props => (
  <div>
    <InputLabel>{props.label}</InputLabel>
    <Input
      as={props.type === 'textarea' ? 'textarea' : ''}
      onClick={props.type === 'textarea' && resizeTextArea}
      onInput={props.type === 'textarea' && resizeTextArea}
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
  const { auth } = React.useContext(authContext);
  console.log(auth);
  if (!auth) {
    return null;
  }
  return null;

  // return (
  //   <Container>
  //     <Header>Edit Profile</Header>
  //     <UniqueLink>
  //       Your unique artist url:{' '}
  //       <Link to={'artists/' + '1'}>{'www.idpt.artists/' + user.userId}</Link>
  //     </UniqueLink>
  //     <FlexContainer>
  //       <ArtistPhoto img={user.img}>
  //         <PhotoOverlay />
  //         <FileInput
  //           onChange={e => {
  //             this.setState({ uploading: true });
  //             this.props.editArtistPhoto(e.target.files[0]);
  //           }}
  //           className='artist-file-input'
  //           type='file'
  //           name='file'
  //           id='file'
  //         ></FileInput>
  //         <ChangePhotoButton htmlFor='file' className='artist-file-button'>
  //           {this.state.uploading ? 'Uploading...' : 'Change Photo'}
  //         </ChangePhotoButton>
  //       </ArtistPhoto>
  //       <FormContainer
  //         initialValues={initialValues}
  //         validationSchema={validationSchema}
  //         onSubmit={console.log}
  //       >
  //         {props => (
  //           <Form onSubmit={props.handleSubmit}>
  //             <InputSection {...props} name='name' label='Name'></InputSection>
  //             <InputSection
  //               {...props}
  //               name='bio'
  //               label='Bio'
  //               type='textarea'
  //             ></InputSection>
  //             <InputSection
  //               {...props}
  //               name='uri'
  //               label='Spotify URI'
  //             ></InputSection>
  //             <ChangeUriLink>Need to change your spotify URI?</ChangeUriLink>

  //             <SubmitButton type='submit' disabled={props.isValid}>
  //               Update
  //             </SubmitButton>
  //           </Form>
  //         )}
  //       </FormContainer>
  //     </FlexContainer>
  //   </Container>
  // );
};

export default EditProfile;

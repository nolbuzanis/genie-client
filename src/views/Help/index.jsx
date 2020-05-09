import React from 'react';
import styled from 'styled-components';
import BackPageHeader from '../../components/BackPageHeader';
import { Formik } from 'formik';
import * as Yup from 'yup';
import InputSection from '../../components/InternalInput';
import Button from '../../components/Button';
import { useToasts } from 'react-toast-notifications';
import { sendHelpMessage } from '../../api';

const Form = styled.form`
  max-width: 400px;
  margin: 0 auto;
  padding: 30px;
`;
const Spacing = styled.div`
  height: 30px;
`;

const validationSchema = Yup.object().shape({
  subject: Yup.string()
    .trim()
    .required('Subject is required.'),
  description: Yup.string()
    .trim()
    .required('Description is required.')
});

const initialValues = {
  subject: '',
  description: ''
};

const Help = () => {
  const { addToast } = useToasts();

  const handleFormSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);

    //submit to backend
    const response = await sendHelpMessage(values);

    if (response.error) {
      return addToast(
        'Oops! There seems to be an issue. Please send your message to purplegenieapp@gmail.com.',
        {
          appearance: 'error',
          autoDismiss: false
        }
      );
    }

    resetForm();
    addToast('Message sent! We’ll reply as soon as we can.', {
      appearance: 'success'
    });
    //setSubmitting(false);
  };

  return (
    <>
      <BackPageHeader>Contact Us</BackPageHeader>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={handleFormSubmit}
      >
        {props => (
          <Form onSubmit={props.handleSubmit}>
            <p>
              Have a question or general feedback about the app? Let us know!
            </p>
            <InputSection
              {...props}
              name='subject'
              label='Subject'
              placeholder='What’s this about?'
            />
            <InputSection
              {...props}
              name='description'
              label='Description'
              type='textarea'
              placeholder='Give us the nitty, gritty details.'
            />
            <Spacing />
            <Button type='submit' disabled={!(props.isValid && props.dirty)}>
              {props.isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Help;

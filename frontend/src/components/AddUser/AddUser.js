import React, { useEffect, useState } from 'react';
import { Container, Row, Col, FormControl, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { getAllUsers, addNewUser } from '../../api/Api';

const AddUser = () => {
  const [userUpdated, setUserUpdated] = useState(false);
  async function fetchAllUsers() {
    try {
      const userList = await getAllUsers();
      setUserUpdated(false);
      userList.map(user => console.log(user.firstName + '::' + user.lastName + '::' + user.empId));
    } catch (err) {
      console.log('Error' + err);
    }
  }

  useEffect(() => {
    fetchAllUsers();
  }, [userUpdated]);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      empId: ''
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('Please enter First Name'),
      lastName: Yup.string().required('Please enter Last Name'),
      empId: Yup.string().required('Please enter Employee ID')
    }),
    onSubmit: async value => {
      console.log(value);
      try {
        const resp = await addNewUser(value);
        setUserUpdated(true);
        console.log(resp.message);
      } catch (err) {
        console.log('Error' + err);
      }
      formik.resetForm();
    }
  });
  return (
    <>
      <Container>
        <Row>
          <Col className='mt-5'>
            <form onSubmit={formik.handleSubmit}>
              <FormControl
                required
                placeholder='FirstName'
                name='firstName'
                errors={formik.errors.firstName}
                className={
                  formik.touched.firstName
                    ? formik.errors.firstName
                      ? 'is-invalid mb-2 mt-2'
                      : 'is-valid mb-2 mt-2'
                    : 'mb-2 mt-2'
                }
                {...formik.getFieldProps('firstName')}
              ></FormControl>
              <FormControl.Feedback type='invalid'>{formik.errors.firstName}</FormControl.Feedback>
              <FormControl
                placeholder='LastName'
                name='lastName'
                required
                errors={formik.errors.lastName}
                {...formik.getFieldProps('lastName')}
                className={
                  formik.touched.lastName
                    ? formik.errors.lastName
                      ? 'is-invalid mb-2 mt-2'
                      : 'is-valid mb-2 mt-2'
                    : 'mb-2 mt-2'
                }
              ></FormControl>
              <FormControl.Feedback type='invalid'>{formik.errors.lastName}</FormControl.Feedback>
              <FormControl
                placeholder='Employee ID'
                name='empId'
                required
                errors={formik.errors.empId}
                {...formik.getFieldProps('empId')}
                className={
                  formik.touched.empId
                    ? formik.errors.empId
                      ? 'is-invalid mb-2 mt-2'
                      : 'is-valid mb-2 mt-2'
                    : 'mb-2 mt-2'
                }
              ></FormControl>
              <FormControl.Feedback type='invalid'>{formik.errors.empId}</FormControl.Feedback>
              <div className='float-right'>
                <Button
                  variant='primary'
                  disabled={!formik.isValid || !formik.dirty}
                  type='submit'
                  className='ml-2 mr-2'
                >
                  Add
                </Button>
                <Button
                  variant='outline-secondary'
                  onClick={() => {
                    formik.resetForm();
                  }}
                >
                  Reset
                </Button>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AddUser;

import React, { useEffect, useState } from 'react';
import { Row, Col, FormControl, Button, ListGroup, Alert } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './AddUser.scss';

import { getAllUsers, addNewUser, updateUserById, deleteUserById } from '../../api/Api';

const AddUser = () => {
  let [userUpdated, setUserUpdated] = useState(false);
  let [users, setUsers] = useState([]);

  let [editMode, setEditMode] = useState(false);
  let [userId, setUserId] = useState('');
  let [firstName, setFirstName] = useState('');
  let [lastName, setLastName] = useState('');
  let [empId, setEmpId] = useState('');
  let [statusMessage, setStatusMessage] = useState({ show: false, message: '', variant: '' });

  async function fetchAllUsers() {
    try {
      setUsers(await getAllUsers());
      setUserUpdated(false);
    } catch (err) {
      setStatusMessage({ ...statusMessage, show: true, message: err, variant: 'danger' });
    }
  }
  function editUser(user) {
    setEditMode(true);
    setUserId(user._id);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmpId(user.empId);
  }

  async function deleteUser(user) {
    try {
      const resp = await deleteUserById(user);
      setUserUpdated(true);
      setStatusMessage({
        ...statusMessage,
        show: true,
        message: resp.message,
        variant: 'success'
      });
    } catch (err) {
      setStatusMessage({
        ...statusMessage,
        show: true,
        message: err,
        variant: 'danger'
      });
    }
    resetFormState();
    formik.resetForm();
  }

  function resetFormState() {
    setFirstName('');
    setLastName('');
    setEmpId('');
    setEditMode(false);
  }

  useEffect(() => {
    fetchAllUsers();
  }, [userUpdated]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      userId: userId,
      firstName: firstName,
      lastName: lastName,
      empId: empId
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('Please enter First Name'),
      lastName: Yup.string().required('Please enter Last Name'),
      empId: Yup.number().required('Please enter Employee ID')
    }),
    onSubmit: async value => {
      try {
        const resp = !editMode ? await addNewUser(value) : await updateUserById(value);
        setUserUpdated(true);
        setStatusMessage({
          ...statusMessage,
          show: true,
          message: resp.message,
          variant: 'success'
        });
      } catch (err) {
        setStatusMessage({
          ...statusMessage,
          show: true,
          message: err,
          variant: 'danger'
        });
      }
      resetFormState();
      formik.resetForm();
    }
  });

  return (
    <>
      <Row>
        <Col className="mt-3">
          <Alert
            variant={statusMessage.variant}
            show={statusMessage.show}
            onClose={() => {
              setStatusMessage({ ...statusMessage, show: false });
            }}
            dismissible
          >
            {statusMessage.message}
          </Alert>
          <form onSubmit={formik.handleSubmit}>
            <FormControl
              required
              placeholder="FirstName"
              name="firstName"
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
            <FormControl.Feedback type="invalid">{formik.errors.firstName}</FormControl.Feedback>
            <FormControl
              placeholder="LastName"
              name="lastName"
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
            <FormControl.Feedback type="invalid">{formik.errors.lastName}</FormControl.Feedback>
            <FormControl
              placeholder="Employee ID"
              name="empId"
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
            <FormControl.Feedback type="invalid">{formik.errors.empId}</FormControl.Feedback>
            <div className="float-right">
              <Button
                variant="primary"
                disabled={!formik.isValid || !formik.dirty}
                type="submit"
                className="ml-2 mr-2"
              >
                {editMode ? 'Update' : 'Add'}
              </Button>
              <Button
                variant="outline-secondary"
                onClick={() => {
                  resetFormState();
                  formik.resetForm();
                }}
              >
                Reset
              </Button>
            </div>
          </form>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          {users.length === 0 && (
            <Alert variant="warning">Users are not available in database!!</Alert>
          )}
          <ListGroup>
            {users.map(user => {
              return (
                <ListGroup.Item className="user-list" key={user._id}>
                  <div>
                    <p>FirstName : {user.firstName}</p>
                    <p>LastName : {user.lastName}</p>
                    <p>Employee ID : {user.empId}</p>
                  </div>
                  <div>
                    <Button variant="outline-primary" onClick={() => editUser(user)}>
                      Edit
                    </Button>
                    <br />
                    <Button
                      variant="outline-secondary"
                      className="mt-2"
                      onClick={() => {
                        deleteUser(user);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default AddUser;

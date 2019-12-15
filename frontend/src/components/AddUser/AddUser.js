import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  FormControl,
  FormLabel,
  Button,
  ListGroup,
  Alert,
  Container
} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './AddUser.scss';
import * as _ from 'lodash';
import { getAllUsers, addNewUser, updateUserById, deleteUserById } from '../../api/Api';

const AddUser = () => {
  let [userUpdated, setUserUpdated] = useState(false);
  let [users, setUsers] = useState([]);
  let [sortMode, setSortMode] = useState(false);
  let [editMode, setEditMode] = useState(false);
  let [userList, setUserList] = useState([]);
  let [userId, setUserId] = useState('');
  let [firstName, setFirstName] = useState('');
  let [firstNameSort, setFirstNameSort] = useState(false);
  let [lastName, setLastName] = useState('');
  let [lastNameSort, setLastNameSort] = useState(false);
  let [empId, setEmpId] = useState('');
  let [empIdSort, setEmpIdSort] = useState(false);
  let [statusMessage, setStatusMessage] = useState({
    show: false,
    message: '',
    variant: ''
  });

  function scrollToTop() {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }
  async function fetchAllUsers() {
    try {
      setUsers(await getAllUsers());
      setUserList(await getAllUsers());
      setUserUpdated(false);
    } catch (err) {
      setStatusMessage({
        ...statusMessage,
        show: true,
        message: err,
        variant: 'danger'
      });
    }
  }
  function editUser(user) {
    setEditMode(true);
    setUserId(user._id);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmpId(user.empId);
    scrollToTop();
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
    scrollToTop();
  }

  useEffect(() => {
    fetchAllUsers();
  }, [userUpdated]);

  const handleChange = e => {
    let newList = [];
    if (e.target.value !== '') {
      newList = userList.filter(item => {
        const fData = item.firstName.toLowerCase();
        const lData = item.lastName.toLowerCase();
        const filter = e.target.value.toLowerCase();
        return (
          fData.includes(filter) || lData.includes(filter) || item.empId.toString().includes(filter)
        );
      });
    } else {
      newList = userList;
    }
    setUsers(newList);
  };
  const handleSort = field => {
    setSortMode(true);
    const sortByField = _.sortBy(users, field);
    setUsers(sortByField);
  };
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
      <Container>
        <Row className="mt-3">
          <Col>
            <h3>Manage User</h3>
          </Col>
        </Row>
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
              <FormLabel className="mt-2">First Name</FormLabel>
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
              <FormLabel className="mt-2">Last Name</FormLabel>
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
              <FormLabel className="mt-2">Employee ID</FormLabel>
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
                  variant="dark"
                  disabled={!formik.isValid || !formik.dirty}
                  type="submit"
                  className="ml-2 mr-2"
                >
                  {editMode ? 'Update' : 'Add'}
                </Button>
                <Button
                  variant="light"
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
          <Col xs={12} sm={6}>
            <FormControl
              placeholder="Search"
              name="searchUser"
              onChange={handleChange}
              className="mb-4"
            />
          </Col>
          <Col xs={12} sm={6}>
            Sort By:
            <Button
              data-testid="sortFirstName"
              variant="outline-dark"
              className={sortMode && firstNameSort ? 'active ml-2' : 'ml-2'}
              onClick={() => {
                handleSort('firstName');
                setFirstNameSort(true);
                setLastNameSort(false);
                setEmpIdSort(false);
              }}
            >
              First Name
            </Button>
            <Button
              data-testid="sortLastName"
              variant="outline-dark"
              className={sortMode && lastNameSort ? 'active ml-2' : 'ml-2'}
              onClick={() => {
                handleSort('lastName');
                setLastNameSort(true);
                setFirstNameSort(false);
                setEmpIdSort(false);
              }}
            >
              Last Name
            </Button>
            <Button
              data-testid="sortId"
              variant="outline-dark"
              className={sortMode && empIdSort ? 'active ml-2' : 'ml-2'}
              onClick={() => {
                handleSort('empId');
                setEmpIdSort(true);
                setFirstNameSort(false);
                setLastNameSort(false);
              }}
            >
              ID
            </Button>
          </Col>
        </Row>

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
                      <Button variant="dark" onClick={() => editUser(user)}>
                        Edit
                      </Button>
                      <br />
                      <Button
                        variant="light"
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
      </Container>
    </>
  );
};

export default AddUser;

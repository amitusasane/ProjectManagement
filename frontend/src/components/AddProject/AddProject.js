import React, { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  FormControl,
  Button,
  ListGroup,
  Alert,
  Form,
  Modal
} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './AddProject.scss';

import SearchModal from '../common/SearchModal';

import { getAllProject, addNewProject, updateProjectById, deleteProjectById } from '../../api/Api';
import * as moment from 'moment';

const AddProject = () => {
  const initialStartDate = formatDate(new Date());
  const initialEndDate = formatDate(getAfterDate(1));

  let [projectUpdated, setProjectUpdated] = useState(false);
  let [projects, setProjects] = useState([]);

  let [editMode, setEditMode] = useState(false);
  let [projectId, setProjectId] = useState('');
  let [projectName, setProjectName] = useState('');

  let [startDate, setStartDate] = useState(initialStartDate);
  let [endDate, setEndDate] = useState(initialEndDate);
  let [dateRequired, setDateRequired] = useState(false);

  let [priority, setPriority] = useState('');
  let [statusMessage, setStatusMessage] = useState({ show: false, message: '', variant: '' });

  async function fetchAllProjects() {
    try {
      setProjects(await getAllProject());
      setProjectUpdated(false);
    } catch (err) {
      setStatusMessage({ ...statusMessage, show: true, message: err, variant: 'danger' });
    }
  }

  async function deleteProject(project) {
    try {
      const resp = await deleteProjectById(project);
      setProjectUpdated(true);
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

  function editProject(project) {
    setEditMode(true);
    setProjectId(project._id);
    setProjectName(project.projectName);
    setDateRequired(project.dateRequired);
    setStartDate(project.startDate ? formatDate(project.startDate) : initialStartDate);
    setEndDate(project.endDate ? formatDate(project.endDate) : initialEndDate);
    setPriority(project.priority);
    setManager(project.manager);
  }

  //Call this function after setStatusMessag to autoHide alert message
  function autoHideAlert() {
    setTimeout(() => {
      setStatusMessage({
        ...statusMessage,
        show: false
      });
    }, 5000);
  }

  function resetFormState() {
    setProjectName('');
    setStartDate(initialStartDate);
    setEndDate(initialEndDate);
    setPriority('');
    setManager('');
    setDateRequired(false);
    setEditMode(false);
  }

  function getAfterDate(num) {
    return moment().add(num, 'day');
  }

  function formatDate(date) {
    return moment(date).format('YYYY-MM-DD');
  }

  let [showManagerModal, setShowManagerModal] = useState(false);
  let [manager, setManager] = useState('');

  function onCloseManagerModal(val) {
    setShowManagerModal(false);
  }
  function onSearchManager(data, setFieldValue) {
    setFieldValue('manager', data.name);
  }

  useEffect(() => {
    fetchAllProjects();
  }, [projectUpdated]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      projectId: projectId,
      projectName: projectName,
      startDate: startDate,
      endDate: endDate,
      priority: priority,
      dateRequired: dateRequired,
      manager: manager
    },
    validationSchema: Yup.object({
      projectName: Yup.string().required('Please enter Project Name'),
      startDate: Yup.date().when('dateRequired', {
        is: true,
        then: Yup.date().required('Please enter start date'),
        otherwise: Yup.date()
      }),
      endDate: Yup.date().when('dateRequired', {
        is: true,
        then: Yup.date()
          .required('Please enter end date')
          .test('compare', 'End date should be greater than Start date', function(endDate) {
            return endDate > this.parent.startDate;
          }),
        otherwise: Yup.date()
      }),
      priority: Yup.number().required('Please enter Priority'),
      dateRequired: Yup.boolean(),
      manager: Yup.string().required('Please select Manager from serach')
    }),
    onSubmit: async value => {
      if (!value.dateRequired) {
        delete value.startDate;
        delete value.endDate;
      }
      try {
        const resp = !editMode ? await addNewProject(value) : await updateProjectById(value);
        setProjectUpdated(true);
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
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Project Name:
              </Form.Label>
              <Col sm="10">
                <FormControl
                  required
                  placeholder="ProjectName"
                  name="projectName"
                  errors={formik.errors.projectName}
                  className={
                    formik.touched.projectName
                      ? formik.errors.projectName
                        ? 'is-invalid mb-2 mt-2'
                        : 'is-valid mb-2 mt-2'
                      : 'mb-2 mt-2'
                  }
                  {...formik.getFieldProps('projectName')}
                ></FormControl>
                <FormControl.Feedback type="invalid">
                  {formik.errors.projectName}
                </FormControl.Feedback>
              </Col>
            </Form.Group>

            <Form.Check
              type="checkbox"
              name="dateRequired"
              value={formik.values.dateRequired}
              checked={formik.values.dateRequired}
              label="Set Start and End date"
              {...formik.getFieldProps('dateRequired')}
            />
            <FormControl
              placeholder="Start Date"
              name="startDate"
              type="date"
              disabled={!formik.values.dateRequired}
              required={false}
              errors={formik.errors.startDate}
              className={
                formik.touched.startDate
                  ? formik.errors.startDate
                    ? 'is-invalid mb-2 mt-2'
                    : 'is-valid mb-2 mt-2'
                  : 'mb-2 mt-2'
              }
              {...formik.getFieldProps('startDate')}
            ></FormControl>
            <FormControl.Feedback type="invalid">{formik.errors.startDate}</FormControl.Feedback>
            <FormControl
              placeholder="End Date"
              name="endDate"
              type="date"
              disabled={!formik.values.dateRequired}
              required={false}
              errors={formik.errors.endDate}
              className={
                formik.touched.endDate
                  ? formik.errors.endDate
                    ? 'is-invalid mb-2 mt-2'
                    : 'is-valid mb-2 mt-2'
                  : 'mb-2 mt-2'
              }
              {...formik.getFieldProps('endDate')}
            ></FormControl>
            <FormControl.Feedback type="invalid">{formik.errors.endDate}</FormControl.Feedback>
            <FormControl
              placeholder="priority"
              name="priority"
              required
              errors={formik.errors.priority}
              className={
                formik.touched.priority
                  ? formik.errors.priority
                    ? 'is-invalid mb-2 mt-2'
                    : 'is-valid mb-2 mt-2'
                  : 'mb-2 mt-2'
              }
              {...formik.getFieldProps('priority')}
            ></FormControl>
            <FormControl.Feedback type="invalid">{formik.errors.priority}</FormControl.Feedback>
            <FormControl
              plaintext
              required
              readOnly
              name="manager"
              errors={formik.errors.manager}
              className={
                formik.touched.manager
                  ? formik.errors.manager
                    ? 'is-invalid mb-2 mt-2'
                    : 'is-valid mb-2 mt-2'
                  : 'mb-2 mt-2'
              }
              {...formik.getFieldProps('manager')}
            ></FormControl>
            <Button
              onClick={() => {
                setShowManagerModal(true);
              }}
            >
              Search manager
            </Button>

            <FormControl.Feedback type="invalid">{formik.errors.manager}</FormControl.Feedback>
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
            <SearchModal
              id="searchManager"
              heading="Serach Manager"
              showModal={showManagerModal}
              onCloseModal={onCloseManagerModal}
              data={[
                { name: 'SHREE', id: '1' },
                { name: 'OM', id: '2' }
              ]}
              onSearch={data => {
                onSearchManager(data, formik.setFieldValue);
              }}
            />
          </form>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          {projects.length === 0 && (
            <Alert variant="warning">Projects are not available in database!!</Alert>
          )}
          <ListGroup>
            {projects.map(project => {
              return (
                <ListGroup.Item className="project-list" key={project._id}>
                  <div>
                    <p>Project : {project.projectName}</p>
                    <p>Start Date : {project.startDate && formatDate(project.startDate)}</p>
                    <p>End Date : {project.endDate && formatDate(project.endDate)}</p>
                    <p>Priority : {project.priority}</p>
                    <p>Manager : {project.manager}</p>
                  </div>
                  <div>
                    <Button variant="outline-primary" onClick={() => editProject(project)}>
                      Update
                    </Button>
                    <br />
                    <Button
                      variant="outline-secondary"
                      className="mt-2"
                      onClick={() => {
                        deleteProject(project);
                      }}
                    >
                      Suspend
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
export default AddProject;

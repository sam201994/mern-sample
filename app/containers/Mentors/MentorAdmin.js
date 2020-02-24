/*
 *
 * Mentor Admin Form Page
 *
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import MentorActions from './actions';

const Button = styled.div`
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border-radius: 4px;
  box-sizing: border-box;
  color: #f5f5f8;
  background-color: #102f41;
  &:hover {
    background-color: #5abcbb;
  }
  text-align: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  width: 100%;
  max-width: 350px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const Label = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.div`
  color: #102f41;
`;

const ErrorContainer = styled.div`
  color: red;
  font-size: 10px;
`;

const InputField = styled.div`
  input[type='text'],
  select {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
`;

const HeadingContainer = styled.div`
  color: #102f41;
  font-size: 50px;
  margin: 20px;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 700px;
  margin: 100px;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Body = styled.div`
  display: flex;
  width: 700px;
  justify-content: space-between;
`;

const AddButton = styled(Button)`
  position: absolute;
  width: 50px;
  margin-left: -50px;
  height: 44px;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
`;

const TaskContainer = styled.div`
  display: flex;
  align-content: flex-start;
  max-width: 350px;
  flex-wrap: wrap;
`;

const TaskTags = styled(Button)`
  width: auto;
  margin: 2px;
`;

class MentorAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: {},
      form: props.mentor,
      id: props.id,
    };
  }

  componentWillReceiveProps = nextProps => {
    this.setState({ form: nextProps.mentor, id: nextProps.id, inputTask: '' });
  };

  handleSubmit = () => {
    const { form, id } = this.state;
    const { actions } = this.props;
    let error = {};

    if (!form.location) {
      error = {
        ...error,
        location: 'Please enter your current location',
      };
    }
    if (!form.company) {
      error = {
        ...error,
        company: 'Please enter company',
      };
    }
    if (!form.fullName) {
      error = {
        ...error,
        fullName: 'Please enter your name',
      };
    }
    this.setState({
      error,
    });
    if (Object.keys(error).length === 0) {
      if (id) {
        actions.saveEditedMentor(id, form);
      } else {
        actions.saveNewMentor(form);
      }
    }
  };

  handleChange = (key, event) => {
    const { form } = this.state;
    const newFormValue = {
      ...form,
      [key]: event.target.value,
    };
    this.setState({
      form: newFormValue,
    });
  };

  handleInputTask = event => {
    this.setState({
      inputTask: event.target.value,
    });
  };

  addTasks = () => {
    const { form, inputTask } = this.state;
    const newTaskList = form.tasks || [];
    if (newTaskList.indexOf(inputTask) === -1 && inputTask) {
      newTaskList.push(inputTask);
      this.setState({
        inputTask: '',
        form: {
          ...form,
          tasks: newTaskList,
        },
      });
    }
  };

  removeTaskTag = task => {
    const { form } = this.state;
    const taskList = form.tasks || [];
    const newTaskList = taskList.filter(value => value !== task);
    this.setState({
      form: {
        ...form,
        tasks: newTaskList,
      },
    });
  };

  render() {
    const { error, form, inputTask } = this.state;
    const taskList = form.tasks ? form.tasks : [];
    return (
      <Box>
        <Header>
          <Field>
            <HeadingContainer>Mentor Admin</HeadingContainer>
          </Field>
        </Header>
        <Body>
          <Container>
            <Field>
              <Label>
                <Title>Name*</Title>
                <ErrorContainer>{error.fullName}</ErrorContainer>
              </Label>
              <InputField>
                <input
                  type="text"
                  value={form.fullName || ''}
                  onChange={value => this.handleChange('fullName', value)}
                />
              </InputField>
            </Field>

            <Field>
              <Label>
                <Title>Company*</Title>
                <ErrorContainer>{error.company}</ErrorContainer>
              </Label>
              <InputField>
                <input
                  type="text"
                  value={form.company || ''}
                  onChange={value => this.handleChange('company', value)}
                />
              </InputField>
            </Field>

            <Field>
              <Label>
                <Title>Location*</Title>
                <ErrorContainer>{error.location}</ErrorContainer>
              </Label>
              <InputField>
                <input
                  type="text"
                  value={form.location || ''}
                  onChange={value => this.handleChange('location', value)}
                />
              </InputField>
            </Field>

            <Field>
              <Button onClick={this.handleSubmit}>Submit</Button>
            </Field>
          </Container>
          <LeftContainer>
            <Field>
              <Label>
                <Title>Tasks</Title>
                <ErrorContainer>{error.tasks}</ErrorContainer>
              </Label>
              <InputField>
                <input
                  type="text"
                  value={inputTask || ''}
                  onChange={value => this.handleInputTask(value)}
                />
                <AddButton onClick={this.addTasks}>+</AddButton>
              </InputField>
            </Field>
            <Field>
              <TaskContainer>
                {taskList.map(task => (
                  <TaskTags onClick={value => this.removeTaskTag(task)}>
                    {task}
                  </TaskTags>
                ))}
              </TaskContainer>
            </Field>
          </LeftContainer>
        </Body>
      </Box>
    );
  }
}

function mapStateToProps(state) {
  const { mentors } = state;
  return {
    mentor: mentors.edit.mentor,
    id: mentors.edit.id,
  };
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      saveNewMentor: MentorActions.saveNewMentor,
      saveEditedMentor: MentorActions.saveEditedMentor,
    },
    dispatch,
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MentorAdmin);

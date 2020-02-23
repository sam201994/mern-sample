/*
 *
 * Mentors Page Container
 *
 */

import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MdAdd } from 'react-icons/md';
import MentorRow from './MentorRow';
import MentorActions from './actions';

const Page = styled.div`
  margin: 2%;
`;

const Header = styled.div``;

const Body = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(19rem, 1fr));
  justify-items: start;

  grid-column-gap: 10px;
  grid-row-gap: 10px;
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  width: 40px;
  margin: 30px;
  height: 40px;
  border-radius: 50%;
  &:hover {
    cursor: pointer;
    color: #b24444;
  }
`;

class Mentors extends Component {
  handleToMentorAdmin = () => {
    const { history, actions } = this.props;
    actions.clearEditMentor();
    history.push('/mentor_admin');
  };

  render() {
    const { mentors } = this.props;
    return (
      <Page>
        <Header>
          <Button onClick={this.handleToMentorAdmin}>
            <MdAdd size={25} />
          </Button>
        </Header>
        <Body>
          {mentors.map(mentor => (
            <MentorRow mentor={mentor} key={mentor._id} />
          ))}
        </Body>
      </Page>
    );
  }
}

function mapStateToProps(state) {
  const { mentors } = state;
  return { mentors: mentors.mentorsList };
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      clearEditMentor: MentorActions.clearEditMentor,
    },
    dispatch,
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Mentors);

/*
 *
 * Mentors Row Container
 *
 */

import React, { Component } from 'react';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { MdEdit, MdDelete } from 'react-icons/md';
import Avatar from '../../images/avatar.png';
import MentorActions from './actions';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  width: 300px;
  margin: 20px;
  height: 320px;
`;

const TopCol = styled.div``;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  position: absolute;
  margin-left: 230px;
  margin-top: 5px;
`;

const Button = styled.div`
  margin: 5px;
  &:hover {
    cursor: pointer;
    color: #b24444;
  }
`;

const BottomCol = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const Img = styled.img`
  vertical-align: middle;
  height: 250px;
  width: 100%;
`;

const Name = styled.div``;
const Description = styled.div`
  font-size: 12px;
  color: rgb(144, 139, 139);
  padding-top: 3px;
`;

class MentorRow extends Component {
  onEditButton = () => {
    const { actions, mentor } = this.props;
    actions.goToEditMentorForm(mentor._id, mentor);
  };

  onDeleteButton = () => {
    const { actions, mentor } = this.props;
    actions.deleteMentor(mentor._id);
  };

  render() {
    const { mentor } = this.props;
    return (
      <Container>
        <TopCol>
          <ButtonRow>
            <Button onClick={this.onDeleteButton}>
              <MdDelete />
            </Button>
            <Button onClick={this.onEditButton}>
              <MdEdit />
            </Button>
          </ButtonRow>
          <Img src={Avatar} alt="avatar" />
        </TopCol>
        <BottomCol>
          <Name>{mentor.fullName}</Name>
          <Description>
            {mentor.location}, {mentor.company}
          </Description>
        </BottomCol>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      deleteMentor: MentorActions.deleteMentor,
      goToEditMentorForm: MentorActions.goToEditMentorForm,
    },
    dispatch,
  ),
});

export default connect(
  null,
  mapDispatchToProps,
)(MentorRow);

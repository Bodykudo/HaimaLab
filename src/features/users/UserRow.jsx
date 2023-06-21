/* eslint-disable react/prop-types */
import styled from 'styled-components';
import { HiTrash, HiPencil, HiEye } from 'react-icons/hi2';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import Tag from '../../ui/Tag';
import { useDeleteUser } from './useDeleteUser';
import CreateUserForm from './CreateUserForm';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { calculateAge } from '../../utils/helpers';
import Stacked from '../../ui/Stacked';
import { useUser } from '../authentication/useUser';

const Device = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

function UserRow({ user }) {
  const { deleteUser } = useDeleteUser();
  const { user: userAuth } = useUser();
  const navigate = useNavigate();

  const currentRole = userAuth?.user_metadata?.userRole;
  const isSuper = userAuth?.user_metadata?.isSuper;

  const { id: userId, fullName, email, sex, birthDate, userRole } = user;

  const statusToTagName = {
    male: 'blue',
    female: 'red',
  };

  return (
    <Table.Row>
      {/* <div></div> */}
      <Stacked>
        <Device>{fullName}</Device>
        <div>{email}</div>
      </Stacked>
      <Stacked>
        <Tag type={statusToTagName[sex]}>{sex}</Tag>
      </Stacked>
      <Stacked>
        <div>{calculateAge(birthDate)} years old</div>
        <div>{format(new Date(birthDate), 'MMM dd yyyy')}</div>
      </Stacked>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={userId} />

            <Menus.List id={userId}>
              <Menus.Button
                icon={<HiEye />}
                onClick={() => navigate(`/${userRole}/${userId}`)}
              >
                Profile
              </Menus.Button>

              {userRole !== 'admin' ? (
                currentRole === 'admin' ||
                (currentRole === 'doctor' && userRole === 'patient') ? (
                  <Modal.Open opens="edit">
                    <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                  </Modal.Open>
                ) : null
              ) : (
                isSuper && (
                  <Modal.Open opens="edit">
                    <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                  </Modal.Open>
                )
              )}

              {isSuper && user.userId !== userAuth?.user_metadata?.userId && (
                <Modal.Open opens="delete">
                  <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                </Modal.Open>
              )}
            </Menus.List>

            <Modal.Window name="edit">
              {userRole !== 'patient' ? (
                <CreateUserForm userToEdit={user} userRole={userRole} />
              ) : currentRole === 'admin' ? (
                <CreateUserForm userToEdit={user} userRole={userRole} />
              ) : (
                <CreateUserForm
                  userToEdit={user}
                  userRole={userRole}
                  healthRecords={true}
                />
              )}
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="user"
                onConfirm={() => deleteUser(userId)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default UserRow;

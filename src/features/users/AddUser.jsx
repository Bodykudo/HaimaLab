/* eslint-disable react/prop-types */
import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
// import CreateDeviceForm from './CreateDeviceForm';
import CreateUserForm from './CreateUserForm';

function AddUser({ userRole }) {
  return (
    <div>
      <Modal>
        <Modal.Open opens="user-form">
          <Button>Add new user</Button>
        </Modal.Open>
        <Modal.Window name="user-form">
          <CreateUserForm userRole={userRole} />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddUser;

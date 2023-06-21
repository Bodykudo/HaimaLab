import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import CreateDeviceForm from './CreateDeviceForm';

function AddDevice() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="device-form">
          <Button>Add new device</Button>
        </Modal.Open>
        <Modal.Window name="device-form">
          <CreateDeviceForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddDevice;

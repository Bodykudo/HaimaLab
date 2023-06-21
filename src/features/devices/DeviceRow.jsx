/* eslint-disable react/prop-types */
import styled from 'styled-components';
import { HiTrash, HiPencil, HiSquare2Stack } from 'react-icons/hi2';
import { useDeleteDevice } from './useDeleteDevice';
import {
  capitalize,
  formatCurrency,
  formatDistanceFromNow,
} from '../../utils/helpers';
import CreateDeviceForm from './CreateDeviceForm';
import { useCreateDevice } from './useCreateDevice';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import Tag from '../../ui/Tag';
import { format } from 'date-fns';
import Stacked from '../../ui/Stacked';

const Device = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;

function DeviceRow({ device }) {
  const { deleteDevice } = useDeleteDevice();
  const { createDevice } = useCreateDevice();

  const {
    id: deviceId,
    name,
    manufacturer,
    serialNumber,
    cost,
    purchaseDate,
    // lastMaintenance,
    warranty,
    status,
    image,
    // description,
  } = device;

  function handleDuplicate() {
    createDevice({
      name: `Copy of ${name}`,
      manufacturer,
      serialNumber,
      cost,
      status,
      purchaseDate,
      image,
      warranty,
    });
  }

  const statusToTagName = {
    active: 'green',
    inactive: 'silver',
  };

  return (
    <Table.Row>
      <Stacked>
        <Device>{name}</Device>
        <div>{manufacturer}</div>
      </Stacked>
      <Stacked>
        <Tag type={statusToTagName[status]}>{status}</Tag>
        <div>{warranty} Years.</div>
      </Stacked>
      <Stacked>
        <Price>{formatCurrency(cost)}</Price>
        <Discount>{serialNumber}</Discount>
      </Stacked>
      <Stacked>
        <span>{capitalize(formatDistanceFromNow(purchaseDate))}</span>
        <span>{format(new Date(purchaseDate), 'MMM dd yyyy')}</span>
      </Stacked>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={deviceId} />

            <Menus.List id={deviceId}>
              <Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate}>
                Duplicate
              </Menus.Button>

              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit">
              <CreateDeviceForm deviceToEdit={device} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="device"
                onConfirm={() => deleteDevice(deviceId)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default DeviceRow;

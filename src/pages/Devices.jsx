import Heading from '../ui/Heading';
import Row from '../ui/Row';
import DeviceTable from '../features/devices/DeviceTable';
import AddDevice from '../features/devices/AddDevice';
import DeviceTableOperations from '../features/devices/DeviceTableOperations';

function Devices() {
  document.title = 'HaimaLab - Devices';

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All devices</Heading>
        <DeviceTableOperations />
      </Row>

      <Row>
        <DeviceTable />
        <AddDevice />
      </Row>
    </>
  );
}

export default Devices;

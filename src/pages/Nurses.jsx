import Heading from '../ui/Heading';
import Row from '../ui/Row';
// import DeviceTable from '../features/devices/DeviceTable';
// import AddDevice from '../features/devices/AddDevice';
// import DeviceTableOperations from '../features/devices/DeviceTableOperations';
import UserTable from '../features/users/UserTable';
import AddUser from '../features/users/AddUser';
import { useUserRole } from '../hooks/useUserRole';
import UserTableOperations from '../features/users/UserTableOperations';

function Nurses() {
  const userRole = useUserRole();
  document.title = 'HaimaLab - Nurses';

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All nurses</Heading>
        <UserTableOperations />
      </Row>

      <Row>
        <UserTable userRole="nurse" />
        {userRole === 'admin' ? <AddUser userRole="nurse" /> : null}
      </Row>
    </>
  );
}

export default Nurses;

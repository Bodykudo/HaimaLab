import Heading from '../ui/Heading';
import Row from '../ui/Row';
// import DeviceTable from '../features/devices/DeviceTable';
// import AddDevice from '../features/devices/AddDevice';
// import DeviceTableOperations from '../features/devices/DeviceTableOperations';
import UserTable from '../features/users/UserTable';
import AddUser from '../features/users/AddUser';
// import { useUserRole } from '../hooks/useUserRole';
import UserTableOperations from '../features/users/UserTableOperations';
import { useUser } from '../features/authentication/useUser';

function Admins() {
  const { user: userAuth } = useUser();
  const isSuper = userAuth?.user_metadata?.isSuper;
  document.title = 'HaimaLab - Admins';

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All admins</Heading>
        <UserTableOperations />
      </Row>

      <Row>
        <UserTable userRole="admin" />
        {isSuper && <AddUser userRole="admin" />}
      </Row>
    </>
  );
}

export default Admins;

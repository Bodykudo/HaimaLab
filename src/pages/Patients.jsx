import Heading from '../ui/Heading';
import Row from '../ui/Row';
// import DeviceTable from '../features/devices/DeviceTable';
// import AddDevice from '../features/devices/AddDevice';
// import DeviceTableOperations from '../features/devices/DeviceTableOperations';
import UserTable from '../features/users/UserTable';
import AddUser from '../features/users/AddUser';
import { useUserRole } from '../hooks/useUserRole';
import UserTableOperations from '../features/users/UserTableOperations';

function Patients() {
  const userRole = useUserRole();
  document.title = 'HaimaLab - Patients';

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All patients</Heading>
        <UserTableOperations />
      </Row>

      <Row>
        <UserTable userRole="patient" />
        {userRole === 'admin' ? <AddUser userRole="patient" /> : null}
      </Row>
    </>
  );
}

export default Patients;

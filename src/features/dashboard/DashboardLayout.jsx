import styled from 'styled-components';
import Spinner from '../../ui/Spinner';
import { useAllUsers } from '../users/useAllUsers';
// import { useDevices } from '../devices/useDevices';
import Stats from './Stats';
import { useAllDevices } from '../devices/useAllDevices';
import StaffChart from './StaffChart';
import PatientsChart from './PatientsChart';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto auto auto auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { users, isLoading: isLoadingUsers } = useAllUsers();
  const { devices, isLoading: isLoadingDevices } = useAllDevices();

  if (isLoadingUsers || isLoadingDevices) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats users={users} devices={devices} />
      <StaffChart confirmedStays={users} />
      <PatientsChart confirmedStays={users} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;

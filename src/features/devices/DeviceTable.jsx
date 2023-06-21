import DeviceRow from './DeviceRow';
import { useDevices } from './useDevices';
import Table from '../../ui/Table';
import Spinner from '../../ui/Spinner';
import Menus from '../../ui/Menus';
import Pagination from '../../ui/Pagination';
import { styled } from 'styled-components';
import Stacked from '../../ui/Stacked';

const TableElement = styled.div`
  overflow: hidden;
`;

function DeviceTable() {
  const { isLoading, devices, count } = useDevices();

  if (isLoading) return <Spinner />;

  return (
    <Menus>
      {/* Image - Name - Manufacturer - Warranty - Price - Serial Number - Date - Button */}
      <Table columns="1fr 1fr 1fr 1fr 0.1fr">
        <Table.Header>
          <Stacked>
            <span>Device</span>
            <span>Company</span>
          </Stacked>
          <TableElement>
            <Stacked>
              <span>Status</span>
              <span>Warranty</span>
            </Stacked>
          </TableElement>
          <TableElement>
            <Stacked>
              <span>Cost</span>
              <span>Serial No</span>
            </Stacked>
          </TableElement>
          <TableElement>Purchase Date</TableElement>
          <TableElement></TableElement>
        </Table.Header>

        <Table.Body
          data={devices}
          render={(device) => <DeviceRow device={device} key={device.id} />}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default DeviceTable;

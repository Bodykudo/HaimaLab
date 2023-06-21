/* eslint-disable react/prop-types */
import UserRow from './UserRow';
import Table from '../../ui/Table';
import Spinner from '../../ui/Spinner';
import Menus from '../../ui/Menus';
import { useUsers } from './useUsers';
import Pagination from '../../ui/Pagination';

function UserTable({ userRole }) {
  const { isLoading, users: allUsers, count } = useUsers(userRole);

  if (isLoading) return <Spinner />;

  const users = allUsers.filter((user) => user.userRole === userRole);

  return (
    <Menus>
      {/* Image - Name - Manufacturer - Warranty - Price - Serial Number - Date - Button */}
      <Table columns="1fr 1fr 1fr 0.1fr">
        <Table.Header>
          <div>Name</div>
          <div>Sex</div>
          <div>Age</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={users}
          render={(user) => <UserRow user={user} key={user.id} />}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default UserTable;

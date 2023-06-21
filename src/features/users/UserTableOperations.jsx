import TableOperations from '../../ui/TableOperations';
import Filter from '../../ui/Filter';
import SortBy from '../../ui/SortBy';

function UserTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="sex"
        options={[
          { value: 'all', label: 'All' },
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' },
        ]}
      />

      <SortBy
        options={[
          { value: 'fullName-asc', label: 'Sory by name (A-Z)' },
          { value: 'fullName-desc', label: 'Sort by name (Z-A)' },
          { value: 'birthDate-asc', label: 'Sort by age (low first)' },
          { value: 'birthDate-desc', label: 'Sort by age (high first)' },
        ]}
      />
    </TableOperations>
  );
}

export default UserTableOperations;

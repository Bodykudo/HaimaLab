import TableOperations from '../../ui/TableOperations';
import Filter from '../../ui/Filter';
import SortBy from '../../ui/SortBy';

function DeviceTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: 'all', label: 'All' },
          { value: 'active', label: 'Active' },
          { value: 'inactive', label: 'Inactive' },
        ]}
      />

      <SortBy
        options={[
          {
            value: 'purchaseDate-asc',
            label: 'Sort by purchase date (old first)',
          },
          {
            value: 'purchaseDate-desc',
            label: 'Sort by purchase date (new first)',
          },
          { value: 'name-asc', label: 'Sory by name (A-Z)' },
          { value: 'name-desc', label: 'Sort by name (Z-A)' },
          {
            value: 'manufacturer-asc',
            label: 'Sort by manufacturer (A-Z)',
          },
          { value: 'manufacturer-desc', label: 'Sort by manufacturer (Z-A)' },
          { value: 'cost-asc', label: 'Sort by price (low first)' },
          { value: 'cost-desc', label: 'Sort by price (high first)' },
          { value: 'warranty-asc', label: 'Sort by warranty (low first)' },
          { value: 'warranty-desc', label: 'Sort by warranty (high first)' },
        ]}
      />
    </TableOperations>
  );
}

export default DeviceTableOperations;

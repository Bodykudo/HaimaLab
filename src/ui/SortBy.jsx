import { useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Select from './Select';

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedValue = searchParams.get('sortBy') || '';

  function handleChange(e) {
    searchParams.set('sortBy', e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      onChange={handleChange}
      value={selectedValue}
      type="white"
    />
  );
}

SortBy.propTypes = {
  options: PropTypes.array.isRequired,
};

export default SortBy;

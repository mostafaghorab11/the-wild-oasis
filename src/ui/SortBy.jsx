import { useSearchParams } from 'react-router-dom';
import Select from './Select';

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSort = searchParams.get('sortBy') || options[0].value;

  function handleChange(event) {
    searchParams.set('sortBy', event.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      value={currentSort}
      onChange={handleChange}
      type="white"
    />
  );
}

export default SortBy;

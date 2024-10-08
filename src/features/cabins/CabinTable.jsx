import { useSearchParams } from 'react-router-dom';
import Empty from '../../ui/Empty';
import Menus from '../../ui/Menus';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import CabinRow from './CabinRow';
import { useCabins } from './useCabins';

function CabinTable() {
  const { isPending, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  if (isPending) return <Spinner />;
  if (cabins.length === 0) return <Empty resourceName="cabins" />;

  // 1. Filter
  const filterValue = searchParams.get('discount') || 'all';

  let filteredCabins;

  if (filterValue === 'all') filteredCabins = cabins;
  if (filterValue === 'no-discount')
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (filterValue === 'with-discount')
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  // 2. Sort
  const sortBy = searchParams.get('sortBy') || 'name-asc';
  const [field, direction] = sortBy.split('-');

  const modifier = direction === 'asc' ? 1 : -1;

  if (field === 'name')
    filteredCabins.sort((a, b) => (a.name > b.name ? modifier : -modifier));
  if (field === 'maxCapacity')
    filteredCabins.sort((a, b) =>
      a.maxCapacity > b.maxCapacity ? modifier : -modifier
    );
  if (field === 'regularPrice')
    filteredCabins.sort((a, b) =>
      a.regularPrice > b.regularPrice ? modifier : -modifier
    );
  if (field === 'discount')
    filteredCabins.sort((a, b) =>
      a.discount > b.discount ? modifier : -modifier
    );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={filteredCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;

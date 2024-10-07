import { useState } from 'react';
import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import CreateCabinForm from './CreateCabinForm';

function AddCabin() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <Button onClick={() => setShowForm((show) => !show)}>
        Add new cabin
      </Button>
      {showForm && (
        <Modal onClose={() => setShowForm((show) => !show)}>
          <CreateCabinForm onCloseModal={() => setShowForm((show) => !show)} />
        </Modal>
      )}
    </div>
  );
}
 
export default AddCabin;

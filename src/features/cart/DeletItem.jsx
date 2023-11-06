import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { deleteItem } from './cartSlice';
import PropTypes from 'prop-types';

function DeletItem({ pizzaId }) {
  const dispatch = useDispatch();

  function handleDeletItem() {
    dispatch(deleteItem(pizzaId));
  }

  return (
    <Button type="small" onClick={handleDeletItem}>
      Delete
    </Button>
  );
}

DeletItem.propTypes = {
  pizzaId: PropTypes.number.isRequired,
};

export default DeletItem;

import { formatCurrency } from '../../utils/helpers';
import PropTypes from 'prop-types';
import DeletItem from './DeletItem';
import UpdateItemQuantity from './UpdateItemQuantity';

function CartItem({ item }) {
  const { name, quantity, totalPrice, pizzaId } = item;
  return (
    <li className="py-3">
      <p className="py-2 font-semibold capitalize">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between text-sm">
        <p>{formatCurrency(totalPrice)}</p>
        <div className="flex gap-3">
          <UpdateItemQuantity pizzaId={pizzaId} quantity={quantity} />
          <DeletItem type="small" pizzaId={pizzaId}>
            Delete
          </DeletItem>
        </div>
      </div>
    </li>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    pizzaId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    totalPrice: PropTypes.number.isRequired,
  }).isRequired,
};

export default CartItem;

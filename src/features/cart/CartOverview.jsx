import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTotalCartQuantity, getTotalCartPrice } from './cartSlice';

function CartOverview() {
  const cartTotalPizzas = useSelector(getTotalCartQuantity);
  const cartTotalPrice = useSelector(getTotalCartPrice);

  if (!cartTotalPizzas) return null;
  return (
    <div className="flex items-center justify-between bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:py-6 md:text-base">
      <p className="space-x-4 font-semibold sm:space-x-6">
        <span>{cartTotalPizzas} pizzas</span>
        <span>{cartTotalPrice}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;

import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart, getTotalCartPrice } from '../cart/cartSlice';
import EmptyCart from '../cart/EmptyCart';
import store from '../../store';
import { formatCurrency } from '../../utils/helpers';
import { useState } from 'react';
import { fetchAddress } from '../user/userSlice';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const dispatch = useDispatch();
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart);
  const navigation = useNavigation();
  const formErrors = useActionData();

  const isSubmitting = navigation.state === 'submitting';

  const {
    username,
    status: addressStatus,
    address,
    position,
    error: errorAddress,
  } = useSelector((state) => state.user);

  const isLoadingAddress = addressStatus === 'loading';

  const totalCartPrice = useSelector(getTotalCartPrice);
  const priority = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = priority + totalCartPrice;

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="p-6">
      <h2 className="mb-2 text-xl font-semibold">Ready to order? Let go!</h2>

      <Form method="POST">
        <div className="mb-2 flex flex-col sm:flex-row">
          <label className="py-3 text-sm sm:w-40">Your Name</label>
          <input
            type="text"
            name="customer"
            className="input grow"
            autoComplete="off"
            placeholder="Enter Your Name"
            defaultValue={username}
            required
          />
        </div>

        <div className="mb-2 flex flex-col sm:flex-row">
          <label className="py-3 text-sm sm:w-40">Phone number</label>
          <div className="flex-grow">
            <input
              type="tel"
              name="phone"
              required
              className="input w-full rounded-full border px-4 py-2"
              autoComplete="off"
              placeholder="Enter Your Phone Number"
            />
            {formErrors?.phone && (
              <p className="px-2 text-sm text-red-500">{formErrors.phone}</p>
            )}
          </div>
        </div>

        <div className="mb-2 flex flex-col sm:flex-row">
          <label className="py-1 text-sm sm:w-40">Address</label>
          <div className="relative flex-grow">
            <input
              type="text"
              name="address"
              defaultValue={address}
              className="input w-full rounded-full border px-4 py-2"
              required
              placeholder="Enter Your Address Here"
              autoComplete="off"
              disabled={isLoadingAddress}
            />
            {addressStatus === 'error' && (
              <p className="mt-1 text-sm text-red-500">{errorAddress}</p>
            )}
            {!position.latitude && !position.longitude && (
              <span className="absolute right-1 top-1 z-50 items-center">
                <Button
                  type="small"
                  className="absolute right-2"
                  disabled={isLoadingAddress || isSubmitting}
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(fetchAddress());
                  }}
                >
                  Get Positions
                </Button>
              </span>
            )}
          </div>
        </div>

        <div className="justify-arounds mb-3 flex items-center gap-2">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-5 w-4 accent-yellow-400 focus:outline-none focus:ring-yellow-500"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" value={JSON.stringify(cart)} name="cart" />
          <input
            type="hidden"
            name="position"
            value={
              position.latitude && position.longitude
                ? `${position.latitude}, ${position.longitude}`
                : ''
            }
          />

          <Button disabled={isSubmitting} type={'primary'}>
            {isSubmitting
              ? 'Submitting..'
              : `Order Now From ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  };

  const errors = {};

  if (!isValidPhone(order.phone))
    errors.phone =
      'Enter your mobile original Mobile number, We might be contact you soon.';

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;

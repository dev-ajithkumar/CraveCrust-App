import { useSelector } from 'react-redux';
import CreateUser from '../features/user/CreateUser';
import Button from './Button';

function Home() {
  const userName = useSelector((state) => state.user.username);
  return (
    <div className="my-10 p-2 text-center sm:my-16">
      <h1 className="mb-4 mt-4 font-semibold text-stone-800 md:text-3xl">
        Welcome to The CraveCrust!
        <br />
        <span className="text-yellow-500 ">
          Enjoy pizza straight out of the oven, delivered to you
        </span>
      </h1>
      {userName === '' ? (
        <CreateUser />
      ) : (
        <Button type={'primary'} to="/menu">
          Countinue Ordering, {userName}
        </Button>
      )}
    </div>
  );
}

export default Home;

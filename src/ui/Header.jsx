import { Link } from 'react-router-dom';
import UserName from '../features/user/UserName';
import SearchOrder from './SearchOrder';

function Header() {
  return (
    <header className="flex items-center justify-between border-b border-stone-200 bg-yellow-500 px-2 py-3 uppercase">
      <Link to="/" className="px-3 font-semibold uppercase tracking-wide">
        CraveCrust
      </Link>
      <SearchOrder />
      <UserName />
    </header>
  );
}

export default Header;

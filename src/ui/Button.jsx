import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Button({ children, disabled, to, type, onClick }) {
  const base =
    'inline-block rounded-full bg-yellow-400 p-2 font-semibold uppercase hover:ring-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 active:bg-yellow-500';

  // sm:py-3 sm:px-3
  const style = {
    small: base + ' md:py-2.5 md:px-5 text-xs focus:ring-offset-2',
    primary: base + ' md:py-2 md:px-3 text-sm focus:ring-offset-2',
    round: base + ' md:py-2 md:px-3.5 text-sm px-4 py-2.5',
    secondary:
      'inline-block rounded-full text-sm uppercase font-semibold p-2 focus:outline-none focus:ring focus:ring-2 focus:ring-stone-300 focus:ring-offset-2 focus:bg-stone-200 border-2 focus:ring-offset-2',
  };

  if (to)
    return (
      <Link to={to} className={style[type]}>
        {children}
      </Link>
    );

  if (onClick) {
    return (
      <button disabled={disabled} className={style[type]} onClick={onClick}>
        {children}
      </button>
    );
  }

  return (
    <button disabled={disabled} className={style[type]}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  to: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;

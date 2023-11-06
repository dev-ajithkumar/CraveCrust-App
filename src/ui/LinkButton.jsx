import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';

function LinkButton({ children, to }) {
  const className = ' text-blue-600 underline';
  const navigate = useNavigate();
  if (to === '-1')
    return (
      <Link onClick={() => navigate(to)} className={className}>
        {children}
      </Link>
    );
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}

LinkButton.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
};

export default LinkButton;

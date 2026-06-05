import { NavLink } from 'react-router';
import styles from './Navbar.module.css';

const navLinkClass = ({ isActive }) =>
  isActive ? `${styles.navLink} ${styles.active}` : styles.navLink;

const Navbar = ({ cartCount = 0 }) => {
  return (
    <header className={styles.navbar}>
      <nav className={styles.nav} aria-label="Main navigation">
        <NavLink to="/" className={navLinkClass} end>
          Home
        </NavLink>
        <NavLink to="/shop" className={navLinkClass}>
          Shop
        </NavLink>
        <NavLink to="/cart" className={navLinkClass}>
          <span>Cart</span>
          <span className={styles.badge} aria-label={`${cartCount} cart items`}>
            {cartCount}
          </span>
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;

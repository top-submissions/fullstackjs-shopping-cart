import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import Navbar from './Navbar';
import styles from './Navbar.module.css';

const renderNavbar = ({ cartCount, initialRoute = '/' } = {}) => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Navbar cartCount={cartCount} />
    </MemoryRouter>
  );
};

describe('Navbar', () => {
  it('renders links for Home, Shop, and Cart', () => {
    renderNavbar();

    expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute(
      'href',
      '/'
    );
    expect(screen.getByRole('link', { name: /shop/i })).toHaveAttribute(
      'href',
      '/shop'
    );
    expect(screen.getByRole('link', { name: /cart/i })).toHaveAttribute(
      'href',
      '/cart'
    );
  });

  it('shows a default cart badge count of 0', () => {
    renderNavbar();

    expect(screen.getByLabelText('0 cart items')).toHaveTextContent('0');
  });

  it('shows the cart badge count from props', () => {
    renderNavbar({ cartCount: 5 });

    expect(screen.getByLabelText('5 cart items')).toHaveTextContent('5');
  });

  it('applies the active class to the current route link', () => {
    renderNavbar({ initialRoute: '/shop' });

    expect(screen.getByRole('link', { name: /shop/i })).toHaveClass(
      styles.active
    );
    expect(screen.getByRole('link', { name: /home/i })).not.toHaveClass(
      styles.active
    );
    expect(screen.getByRole('link', { name: /cart/i })).not.toHaveClass(
      styles.active
    );
  });
});

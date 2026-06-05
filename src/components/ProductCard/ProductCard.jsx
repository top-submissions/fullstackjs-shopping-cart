import { useState } from 'react';
import styles from './ProductCard.module.css';

const formatPrice = (price) => `$${price.toFixed(2)}`;

const ProductCard = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const { title, price, image, category } = product;

  const updateQuantity = (nextQuantity) => {
    setQuantity(Math.max(1, nextQuantity));
  };

  const handleQuantityChange = (event) => {
    const nextQuantity = Number.parseInt(event.target.value, 10);

    if (Number.isNaN(nextQuantity)) {
      updateQuantity(1);
      return;
    }

    updateQuantity(nextQuantity);
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setQuantity(1);
  };

  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        <img className={styles.image} src={image} alt={title} />
      </div>

      <div className={styles.content}>
        <span className={styles.category}>{category}</span>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.price}>{formatPrice(price)}</p>

        <div className={styles.actions}>
          <div className={styles.quantityControl}>
            <button
              type="button"
              className={styles.quantityButton}
              onClick={() => updateQuantity(quantity - 1)}
              disabled={quantity === 1}
              aria-label={`Decrease quantity for ${title}`}
            >
              -
            </button>
            <label className={styles.quantityLabel}>
              <span className={styles.srOnly}>Quantity for {title}</span>
              <input
                className={styles.quantityInput}
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
              />
            </label>
            <button
              type="button"
              className={styles.quantityButton}
              onClick={() => updateQuantity(quantity + 1)}
              aria-label={`Increase quantity for ${title}`}
            >
              +
            </button>
          </div>

          <button
            type="button"
            className={styles.addButton}
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;

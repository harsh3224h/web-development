import "./App.css";
import { useCart } from "./hooks/useCart";
import ProductCard from "./components/ProductCard";
import { products } from "./data/products";
import Cart from "./components/Cart";

function App() {
  const { cart, addToCart, removeFromCart, updateQuantity, total } = useCart();
  return (
    <>
      <div className="app">
        <header>
          <h1>Shopping Cart</h1>
        </header>

        <main>
          <section className="products">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </section>
          <section>
            <Cart
              cart={cart}
              total={total}
              onUpdateQuantity={updateQuantity}
              onRemove={removeFromCart}
            />
          </section>
        </main>
      </div>
    </>
  );
}

export default App;

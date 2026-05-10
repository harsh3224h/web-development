import { useCountStore } from "./store/countStore.js";
import Posts from "./components/Posts.jsx";

function App() {
  const { count, increase, decrease, reset } = useCountStore();
  return (
    <div>
      <h2>{count}</h2>
      <div>
        <button onClick={increase}>+</button>
        <button onClick={decrease}>-</button>
      </div>

      <button onClick={reset}>Reset</button>

      <Posts />
    </div>
  );
}

export default App;

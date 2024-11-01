import { useDispatch, useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import router from "./lib/router";
import { StoreProvider } from "./lib/store/provider";
import { increment, IState } from "./lib/store/slices/counterSlice";
import Button from "./Button";
import Amount from "./Amount";

const App = () => {
  const count = useSelector((state: IState)  => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <div>{count}</div>
      <div>
        <Button />
        <Amount />
        <button onClick={() => dispatch(increment())}>increment</button>
      </div>
    </div>
  );
};

const MainApp = () => {
  return (
    <StoreProvider>
      <App />
      <RouterProvider router={router} />
    </StoreProvider>
  );
};

export default MainApp;

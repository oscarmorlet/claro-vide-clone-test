import { Provider } from "react-redux";
import store from "./store";
import AppRouter from "./Router/AppRouter";

function App() {
  return (
    <Provider store={store}>
      <AppRouter/>
    </Provider>
  );
}

export default App;

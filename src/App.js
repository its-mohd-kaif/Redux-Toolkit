import LandingPage from "./Components/LandingPage";
import store from "./redux/store";
import { Provider } from "react-redux";

function App() {
  return (
    <div>
      <Provider store={store}>
        <LandingPage />
      </Provider>
    </div>
  );
}

export default App;

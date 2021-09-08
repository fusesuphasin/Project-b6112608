import "./App.css";
import Navbar from "./components/navbar/navbar";
import Signup from "./components/signup/signup";

import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

function App() {
  return (
    <div>
      <Navbar />
      <Signup />
    </div>
  );
}

export default App;

import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Pages
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";

import AdminDashboard from "./Pages/AdminDashboard"
import history from './history';
function App() {
  return (
    <Router history={history}>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LoginPage}/>
          <Route exact path="/signup" component={SignupPage} />
          <Route exact path="/dashboard" component={AdminDashboard} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

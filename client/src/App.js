import "./App.css";
import HomeLayout from "./layouts/HomeLayout";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Databases from "./layouts/Databases";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomeLayout />
        </Route>
        <Route exact path="/:sessionId">
          <HomeLayout
            component={() => <Databases data={window.location.pathname} />}
          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

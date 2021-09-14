  
import Form from "./components/Form";
import List from "./components/List";
import Spiner from "./components/Spiner";
import Alert from "./components/Alert";
import React, { useEffect } from "react";
import { pending, error } from "./URL";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { requestData } from './reducer/listSlice';

function App() {
  const status = useSelector((state) => state.list.status);
  const data = useSelector((state) => state.list.data);

  console.log(data)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestData())
  }, []);

  if (status === pending) return <Spiner />;
  if (status === error) return (
    <Router>
      <Alert />
    </Router>
  );
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path='/' exact render={(props) => <List {...props} />} />
          <Route path='/services/:id' render={(props) => <Form {...props} />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Test from './test/Test';
import TestState from './test/TestState';

const App = () => {
    
  return (
    <BrowserRouter>
      <TestState>
        <Switch>
            <Route exact path="/"> <Redirect to="test"/> </Route>
            <Route exact path="/test" component={Test} />
        </Switch>
      </TestState>
    </BrowserRouter>    
  );
}

export default App;
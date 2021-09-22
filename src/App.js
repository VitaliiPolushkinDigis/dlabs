import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from './components/Login';
import { PrivateRoute } from './components/PrivateRoute';
import Home from './components/Home';

const App = () => {
  return (
    <div className='App'>
      <Router>
        <div className='app__routers'>
          <PrivateRoute exact path='/' component={Home} />
          <Route path='/login' render={(props) => <Login {...props} />} />
        </div>
      </Router>
    </div>
  );
};

export default App;

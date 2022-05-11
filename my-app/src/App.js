import { BrowserRouter, Switch, Route } from 'react-router-dom';
import EmployeeList from './components/EmployeesList';
import NotFound from './components/NotFound';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddEmployeeFormStrap from './components/AddEmployeeFormStrap';

function App() {
  return (
    <BrowserRouter>
      <div>
        <div>
          <Switch>
            <Route exact path="/" component={EmployeeList} />
            <Route path="/add" component={AddEmployeeFormStrap} />
            <Route path="/employees/edit/:id" component={AddEmployeeFormStrap} />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}


export default App;

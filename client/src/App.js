import './App.css';
import{BrowserRouter, Route, Switch} from 'react-router-dom'
import LandingPage from './Components/LandingPage/LandingPage'
import Home from './Components/Home/Home'
import CreateDog from './Components/CreateDog/CreateDog'
import Detail from './Components/Detail/Detail';

function App() {
  return (
   <BrowserRouter>
    <div className="App">
      <Switch>  {/* el switch hace q matcheen los links q envuelve, si te equivocas de ruta te dirige al ultimo q pusiste */}
      <Route exact path='/' component= {LandingPage}/>
      <Route exact path='/home' component= {Home}/>
      <Route exact path='/breed' component= {CreateDog}/>
      <Route exact path='/home/:id' component={Detail} />
      </Switch>
    </div>
   </BrowserRouter>
  );
}

export default App;

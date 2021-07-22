import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/global/Header';
import { Home } from './components/Home';
import EditPost from './components/EditPost';
import ViewPost from './components/ViewPost';

function App() {
  return (
    <>

      <Router>

      <Header />
      <Switch>
         <Route exact path="/" component={Home} />
         <Route exact path="/posts/edit/:id" component={EditPost} />
         <Route exact path="/posts/view/:id" component={ViewPost} />
      </Switch>

      </Router>

    </>
  );
}

export default App;

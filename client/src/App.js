import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import 'semantic-ui-less/semantic.less'
import './App.css';

import { AuthProvider } from './context/auth';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MenuBar from './components/MenuBar'
import Profile from './pages/Profile';
import Posts from './pages/Posts';
import PostDetail from './pages/PostDetail';
import CreatePost from './pages/CreatePost';
import PublicProfile from './pages/PublicProfile';

function App() {
  return (
    <AuthProvider>
      <Router>
        <MenuBar />
        <div style={{
          height: 45
        }}></div>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/posts' component={Posts} />
        <Route exact path='/create-post' component={CreatePost} />

        <Route path='/post/:id' children={<PostDetail />} />
        <Route path='/profile/:username' children={<PublicProfile />} />
        <Route path='/posts/:pageNum' children={<Posts />} />
      </Router>
    </AuthProvider>
  );
}

export default App;

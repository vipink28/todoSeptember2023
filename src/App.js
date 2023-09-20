import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import TaskList from './pages/TaskList';
import CreateTask from './pages/CreateTask';
import PageNotFound from './pages/PageNotFound';
import Navigation from './components/Navigation';
import Login from './components/Login';
import Register from './components/Register';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './protected route/ProtectedRoute';

function App() {
  return (

    <BrowserRouter>
      <AuthProvider>
        <Navigation />
        <Routes>
          <Route path='/' element={<Navigate to="/login"/>}></Route>
          <Route path='/' element={<Home />}>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>
          </Route>

          <Route path='/about' element={<About />}></Route>
          <Route path='/task-list' element={<ProtectedRoute><TaskList /></ProtectedRoute>}></Route>
          <Route path='/create-task' element={<CreateTask />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
          <Route path='*' element={<PageNotFound />}></Route>
        </Routes>
        </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

import 'bootstrap/dist/css/bootstrap.min.css';

import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/authContext';


import Paths from './paths/Paths';

import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import Recipes from './components/Recipes';
import AddRecipe from './components/AddRecipe';
import Meal from './components/Meal';
import Edit from './components/Edit';


function App() {

  return (
    <>

      <AuthProvider>
        <Routes>
          {/* 
      Made an abstraction of the paths, because it looks better than using magic strings
      */}
          <Route path={Paths.Home} element={<Home />} />
          <Route path={Paths.Login} element={<Login  />} />
          <Route path={Paths.Register} element={<Register />} />
          <Route path={Paths.Recipes} element={<Recipes />} />
          <Route path={Paths.AddRecipe} element={<AddRecipe />} />
          <Route path='/recipes/:id' element={<Meal />} />
          <Route path='/recipes/:id/edit' element={<Edit />} />
          <Route path={Paths.Logout} element={<Logout />} />

        </Routes>
      </AuthProvider>
    </>
  )
}

export default App

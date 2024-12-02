import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { CachorroCreate } from '../views/cachorro/view/cachorro-create';
import { CachorroEdit } from '../views/cachorro/view/cachorro-edit';
import { CachorroList } from '../views/cachorro/view/cachorro-list';
import { Home } from '../views/home/home';
import { paths } from './paths';


export const AppRouters = () => {
    return (
        <Router>
            <Routes>
                <Route path={paths.home} element={<Home />} />
                <Route path={paths.formulario.list} element={<CachorroList />} />
                <Route path={paths.formulario.create} element={<CachorroCreate />} />
                <Route path={paths.formulario.edit()} element={<CachorroEdit />} />
            </Routes>
        </Router>
    )
}

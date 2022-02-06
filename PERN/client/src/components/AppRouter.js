import React, { useContext } from "react";
import {Routes, Route} from 'react-router-dom';
import { Context } from "../index";
import { authRoutes, publicRoutes } from "../routes";

const AppRouter = () => {
    const {user} = useContext(Context)
    return (
        <Routes>
            {user.isAuth && authRoutes.map(({path, Element}) =>
                <Route key={path} path={path} element={<Element />} exact/>
            )}
            {publicRoutes.map(({path, Element}) =>
                <Route key={path} path={path} element={<Element />} exact/>
            )}
        </Routes>
    );
};

export default AppRouter;
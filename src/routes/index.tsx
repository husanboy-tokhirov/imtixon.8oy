import { useRoutes } from "react-router-dom";
import { Suspense, lazy } from "react";
import Categorys from "./categorys/Categorys";

const Home = lazy(() => import("./home/Home"));
const Like = lazy(() => import("./like/Like"));
const Single = lazy(() => import("../components/single/Single"));
const Cart = lazy(() => import("./cart/Cart"));

const RoutesController = () => {
    const routes = useRoutes([
        {
            path: "/",
            element: (
                <Suspense fallback={<div>Loading...</div>}>
                    <Home />
                </Suspense>
            )
        },
        {
            path: "/category/:id",
            element: (
                <Suspense fallback={<div>Loading...</div>}>
                    <Categorys />
                </Suspense>
            )
        },
        {
            path: "/like",
            element: (
                <Suspense fallback={<div>Loading...</div>}>
                    <Like />
                </Suspense>
            )
        },
        {
            path: "/product/:id", 
            element: (
                <Suspense fallback={<div>Loading...</div>}>
                    <Single />
                </Suspense>
            )
        },
        {
            path: "/cart",
            element: (
                <Suspense fallback={<div>Loading...</div>}>
                    <Cart />
                </Suspense>
            )
        }
    ]);

    return routes; 
};

export default RoutesController;

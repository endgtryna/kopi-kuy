import { RouteObject } from "react-router-dom";
import Layout from "../layout";
import Home from "../pages/Home";
import Catalogue from "../pages/Catalogue";

const route: RouteObject[] = [
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "catalogue",
                element: <Catalogue />
            }
        ]
    }
];

export default route;
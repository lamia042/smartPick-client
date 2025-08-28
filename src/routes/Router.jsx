import React from "react";
import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import { PrivateRouter } from "./PrivateRouter";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AddQuery from "../pages/AddQuery";
import Recommendation from "../pages/Recommendation";
import MyRecommendations from "../pages/MyRecommendations";
import ShowQueries from "../component/ShowQueries";
import MyQueries from "../pages/MyQueries";
import RecommendationsForMe from "../pages/RecommendationsFoeMe";
import AboutUs from "../pages/AboutUs";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/addQuery",
        element: (
          <PrivateRouter>
            <AddQuery></AddQuery>
          </PrivateRouter>
        ),
      },
      {
        path: "/recommendation/:id",
        element: (
          <PrivateRouter>
            <Recommendation></Recommendation>
          </PrivateRouter>
        ),
      },
      {
        path: "/queries/:id",
        element: (
          <PrivateRouter>
            <Recommendation />
          </PrivateRouter>
        ),
      },
      {
        path: "/myRecommendations",
        element: (
          <PrivateRouter>
            <MyRecommendations></MyRecommendations>
          </PrivateRouter>
        ),
      },
      {
        path: "/queries",
        element: <ShowQueries></ShowQueries>,
      },
      {
        path: "/myQueries",
        element: (
          <PrivateRouter>
            <MyQueries></MyQueries>
          </PrivateRouter>
        ),
      },
      {
        path: "/recommendationsForMe",
        element: (
          <PrivateRouter>
            <RecommendationsForMe />
          </PrivateRouter>
        ),
      },
      {
        path: "/aboutUs",
        element: <AboutUs></AboutUs>
      }
    ],
  },
]);

export default Router;

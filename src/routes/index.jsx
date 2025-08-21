import { createBrowserRouter } from "react-router-dom";
import NavbarComponent from "../components/HomeComponent/Navbar";
import HomePage from "../pages/HomePage";
import DetailPage from "../pages/DetailsPage";
import RentalPage from "../pages/RentalPage";
import RentalDetailPage from "../pages/DetailRentalPage";
import ManagementPage from "@/pages/ManagementPage";
import RegisterPage from "@/pages/RegisterPage";
import LoginPage from "@/pages/LoginPage";
import Protected from "../components/Protected";
import ProtectedUser from "../components/ProtectedUser";
import AddCar from "@/components/CrudComponent.jsx/AddCar";
import EditCarComponent from "@/components/CrudComponent.jsx/EditCar";
import RentalManagementPage from "@/pages/RentalManagementPage";
import DaftarRentalPage from "@/pages/DaftarRentalPage";
import ManagementDetailPage from "@/pages/ManagementDetailRentalPage";
// import NotFoundPage from "@/pages/NotFoundPage"; // Make sure this component exists

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <NavbarComponent />
        <HomePage />
      </>
    ),
  },
  {
    path: "/register",
    element: (
      <ProtectedUser>
        <RegisterPage />
      </ProtectedUser>
    ),
  },
  {
    path: "/login",
    element: (
      <ProtectedUser>
        <LoginPage />
      </ProtectedUser>
    ),
  },
  {
    path: "/car/:id",
    element: (
      <Protected>
        <DetailPage />
      </Protected>
    ),
  },
  {
    path: "/rental/car/:id",
    element: (
      <Protected>
        <RentalPage />
      </Protected>
    ),
  },
  {
    path: "/detail-rental/:id",
    element: (
      <Protected>
        <RentalDetailPage />
      </Protected>
    ),
  },
  {
    path: "/daftar-rental",
    element: (
      <Protected>
        <DaftarRentalPage />
      </Protected>
    ),
  },

  //Management Router
  {
    path: "/management",
    element: (
      <Protected roles={["admin"]}>
        <ManagementPage />
      </Protected>
    ),
  },
  {
    path: "/management/add",
    element: (
      <Protected roles={["admin"]}>
        <AddCar />
      </Protected>
    ),
  },
  {
    path: "/management/edit/:id",
    element: (
      <Protected roles={["admin"]}>
        <EditCarComponent />
      </Protected>
    ),
  },
  {
    path: "/management/rentals",
    element: (
      <Protected>
        <RentalManagementPage />
      </Protected>
    ),
  },
  {
    path: "/management/detail-rental/:id", // Added :id parameter to match path pattern
    element: (
      <Protected>
        <ManagementDetailPage />
      </Protected>
    ),
  },
  {
    path: "/management/detail-rental", // Added :id parameter to match path pattern
    element: (
      <Protected>
        <ManagementDetailPage />
      </Protected>
    ),
  },
  // {
  //   path: "*",
  //   element: <NotFoundPage />, // Uncommented this route for handling unmatched routes
  // },
]);

export default router;

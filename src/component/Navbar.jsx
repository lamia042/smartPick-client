import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../context/AuthProvider";
import { CiUser } from "react-icons/ci";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const items = (
    <>
      <NavLink to="/" className="hover:text-white"><li>Home</li></NavLink>
      <NavLink to="/queries" className="hover:text-white"><li>Queries</li></NavLink>
      <NavLink to="/aboutUs" className="hover:text-white"><li>About Us</li></NavLink>
      {user && (
        <>
          <NavLink to="/recommendationsForMe" className="hover:text-white"><li>Recommendations For Me</li></NavLink>
          <NavLink to="/myQueries" className="hover:text-white"><li>My Queries</li></NavLink>
          <NavLink to="/myRecommendations" className="hover:text-white"><li>My Recommendations</li></NavLink>
        </>
      )}
    </>
  );

  const handleSignOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Logged out Successfully",
          showConfirmButton: false,
          timer: 1500
        });
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="bg-[#155ca2] sticky top-0 z-50">
      <div className="px-4 md:px-10 mx-auto flex justify-between items-center py-4 gap-4">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="https://i.ibb.co.com/nsRCHPFW/Purple-Modern-Virtual-Reality-Logo-Design-1.png"
            alt="Logo"
            className="w-10 h-10 md:w-16 md:h-16 rounded-full"
          />
          <span className="text-xl md:text-2xl font-bold text-white ml-2">SmartPick</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-6 text-white font-semibold">{items}</ul>
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-2">
          {user ? (
            <div className="flex items-center gap-2">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                />
              ) : (
                <CiUser className="h-10 w-10 text-white" />
              )}

              <button
                onClick={handleSignOut}
                className="btn btn-md bg-white text-[#0D233E] rounded-md flex items-center gap-2"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login">
              <button className="btn btn-md bg-white text-[#0D233E] rounded-md">Login</button>
            </Link>
          )}

          {/* Mobile Dropdown */}
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-white ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </label>
            <ul tabIndex={0} className="menu dropdown-content mt-3 p-2 shadow bg-[#212529] rounded-box w-52 text-white font-semibold">
              {items}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

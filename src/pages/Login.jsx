import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import loginLottie from "../assets/Lotties/loginLottie.json";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../context/AuthProvider";

const Login = () => {
  const { signIn, signInWithGoogle } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();
    setPasswordError("");

    const form = new FormData(e.target);
    const email = form.get("email");
    const password = form.get("password");

    signIn(email, password)
      .then((result) => {
        Swal.fire({
          icon: "success",
          title: "Logged in Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(location?.state?.from || "/");
      })
      .catch((error) => {
        setPasswordError(error.message);
      });
  };

  const handleGoogle = () => {
    signInWithGoogle()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Logged in Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(location?.state?.from || "/");
      })
      .catch((error) => {
        setPasswordError(error.message);
      });
  };

  return (
    <div className="flex flex-col md:flex-row w-11/12 lg:w-10/12 gap-2 items-center mx-auto mb-10">
      <div className="w-full lg:w-1/2">
        <Lottie className="w-full" animationData={loginLottie} />
      </div>

      <div className="w-full lg:w-1/2 mx-auto">
        <h3 className="text-3xl mb-4">Login to SmartPick</h3>
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Email</span>
            </label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Password */}
          <div className="form-control relative w-full">
            <label className="label">
              <span className="label-text font-semibold">Password</span>
            </label>
            <div className="relative w-full">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="input input-bordered w-full pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 flex items-center justify-center"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {passwordError && (
            <p className="text-red-600 text-sm mt-1">{passwordError}</p>
          )}

          {/* Login Button */}
          <button type="submit" className="btn btn-primary w-full">
            Login
          </button>
        </form>

        <div className="divider">OR</div>

        {/* Google Login */}
        <button
          onClick={handleGoogle}
          className="flex items-center justify-center gap-2 btn w-full bg-white border hover:bg-gray-100 text-black font-semibold"
        >
          <img
            className="w-6 h-6"
            src="https://i.ibb.co/6tyhjC2/google.png"
            alt="Google"
          />
          Continue With Google
        </button>

        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

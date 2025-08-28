import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Link, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import registerLottie from "../assets/Lotties/registerLottie.json";
import Lottie from "lottie-react";

const Register = () => {
  const { createUser, signInWithGoogle, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const { name, email, photo, password } = Object.fromEntries(formData.entries());

    // ✅ Password validation
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      return;
    }
    if (!uppercaseRegex.test(password)) {
      setPasswordError("Password must include at least one uppercase letter.");
      return;
    }
    if (!lowercaseRegex.test(password)) {
      setPasswordError("Password must include at least one lowercase letter.");
      return;
    }

    setPasswordError(""); // clear error

    createUser(email, password)
      .then((result) => {
        // ✅ Update profile in Firebase
        updateUserProfile(name, photo);

        const userProfile = {
          name,
          email,
          photo,
          creationTime: result.user?.metadata?.creationTime,
          lastSignInTime: result.user?.metadata?.lastSignInTime,
        };

        // ✅ Save user profile in DB
        fetch("https://recipe-book-server-theta-topaz.vercel.app/users", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(userProfile),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.insertedId) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your account has been created",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate("/"); // ✅ Redirect to Home
            }
          });
      })
      .catch((error) => {
        console.log("Full Firebase error object:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      });
  };

  // ✅ Google SignIn Handler
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        const userProfile = {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
          creationTime: user.metadata?.creationTime,
          lastSignInTime: user.metadata?.lastSignInTime,
        };

        // ✅ Save Google user to DB
        fetch("https://recipe-book-server-theta-topaz.vercel.app/users", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(userProfile),
        });

        navigate("/");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Google Sign In Failed",
          text: error.message,
        });
      });
  };

  return (
    <div className="md:flex justify-center mt-5 gap-2  bg-gray-50">
      <div>
        <Lottie className="w-xs flex justify-center items-center md:w-full" animationData={registerLottie}></Lottie>
      </div>
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-2xl">
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

        {/* ✅ Register Form */}
        <form onSubmit={handleSignUp} className="">
          {/* Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Full Name</span>
            </label>
            <input
              name="name"
              type="text"
              placeholder="Enter your name"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Photo URL */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Photo URL (Optional)</span>
            </label>
            <input
              name="photo"
              type="text"
              placeholder="Enter photo URL"
              className="input input-bordered w-full"
            />
          </div>

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
          <div className="form-control">
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
                className="absolute inset-y-0 right-2 flex items-center px-2 text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
          </div>

          {/* Register Button */}
          <button type="submit" className="btn btn-primary mt-2 w-full">
            Register
          </button>
        </form>

        {/* Divider */}
        <div className="divider">OR</div>

        {/* ✅ Google Register */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center gap-2 btn w-full bg-white border hover:bg-gray-100 text-black font-semibold"
        >
          <img
            className="w-6 h-6"
            src="https://i.ibb.co/6tyhjC2/google.png"
            alt="Google"
          />
          Continue With Google
        </button>

        {/* Already Account */}
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="link text-blue-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

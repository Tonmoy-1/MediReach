import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const { signIn, signInWithGoogle, setLoading, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  if (user) return <Navigate to={from} replace={true} />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await signIn(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const data = await signInWithGoogle();
      navigate(from, { replace: true });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
          Login to Your Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <input type="checkbox" className="mr-2" />
              Remember Me
            </label>
            <Link
              to="/forgot-password"
              className="text-sm text-teal-600 dark:text-teal-400 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-teal-600 rounded-lg hover:bg-teal-500 focus:ring-4 focus:ring-teal-300 dark:focus:ring-teal-700"
          >
            Login
          </button>
        </form>
        <div className="flex items-center justify-center space-x-2">
          <span className="block w-full h-px bg-gray-300 dark:bg-gray-600"></span>
          <span className="text-sm text-gray-500 dark:text-gray-400">OR</span>
          <span className="block w-full h-px bg-gray-300 dark:bg-gray-600"></span>
        </div>
        <button
          onClick={handleGoogleSignIn}
          className="w-full px-4 py-2 flex items-center justify-center space-x-2 text-black bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
        >
          <FcGoogle className="h-5 w-5" />
          <span>Continue with Google</span>
        </button>
        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-teal-600 dark:text-teal-400 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { imageUpload } from "../../Api/Utils";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const { createUser, updateUserProfile, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  // form submit handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const image = form.image.files[0];

    const photoURl = await imageUpload(image);

    try {
      //2. User Registration
      await createUser(email, password);

      //3. Save username & profile photo in firebse
      await updateUserProfile(name, photoURl);

      // Save user information in db if the user is new
      // await saveUserInformation({
      //   ...result?.user,
      //   displayName: name,
      //   photoURl,
      // });

      navigate("/");
      // toast.success("Signup Successful");
    } catch (err) {
      console.log(err);
      // toast.error(err?.message);
    }
  };

  // Handle Google Signin
  const handleGoogleSignIn = async () => {
    try {
      //User Registration using google
      await signInWithGoogle();
      // Save user information in db if the user is new
      // await saveUserInformation(data?.user);

      navigate("/");
      // toast.success("Signup Successful");
    } catch (err) {
      console.log(err);
      // toast.error(err?.message);
    }
  };
  return (
    <div className="min-h-screen py-10 flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className=" md:w-8/12 w-10/12 p-8 space-y-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
          Create an Account
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1 w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter your full name"
              required
            />
          </div>
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
              name="email"
              className="mt-1 w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter your email"
              required
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
              name="password"
              className="mt-1 w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Create a password"
              required
            />
          </div>
          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Profile Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              className="mt-1 w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-teal-600 rounded-lg hover:bg-teal-500 focus:ring-4 focus:ring-teal-300 dark:focus:ring-teal-700"
          >
            Register
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
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-teal-600 dark:text-teal-400 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

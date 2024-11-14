import { FaGoogle, FaArrowRight, FaUserPlus } from 'react-icons/fa';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const LoginForm: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(8, 'Password must be at least 8 characters').required('Required'),
    }),
    onSubmit: (values) => {
      // Handle login logic here
      console.log('Form data', values);
    },
  });

  return (
    <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
      <h1 className="text-4xl font-medium">Connectez-vous</h1>
      <p className="text-slate-500">Hi, Welcome back 👋</p>

      <div className="my-5">
        <button className="w-full text-center py-3 my-3 border flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150">
          <FaGoogle className="w-6 h-6" /> <span>Connectez-vous avec Google</span>
        </button>
      </div>

      <form onSubmit={formik.handleSubmit} className="my-10">
        <div className="flex flex-col space-y-5">
          <label htmlFor="email">
            <p className="font-medium text-slate-700 pb-2">Email address</p>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Entrer addresse email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            ) : null}
          </label>

          <label htmlFor="password">
            <p className="font-medium text-slate-700 pb-2">Password</p>
            <input
              id="password"
              name="password"
              type="password"
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Entrez votre mot de passe"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-sm">{formik.errors.password}</div>
            ) : null}
          </label>

          <div className="flex flex-row justify-between">
            <label htmlFor="rememberMe" className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={formik.values.rememberMe}
                onChange={formik.handleChange}
                className="w-4 h-4 border-slate-200 focus:bg-indigo-600"
              />
              <span className="ml-2">Rester connecter</span>
            </label>
            <a href="#" className="font-medium text-indigo-600">Mot de passe oublié?</a>
          </div>

          <button type="submit" className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow flex space-x-2 items-center justify-center">
            <FaArrowRight className="h-6 w-6" />
            <span>Connectez-vous</span>
          </button>

          <p className="text-center">
            Pas encore de compte?{' '}
            <a href="#" className="text-indigo-600 font-medium inline-flex space-x-1 items-center">
              <span>Créez un compte</span>
              <FaUserPlus className="h-4 w-4" />
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;

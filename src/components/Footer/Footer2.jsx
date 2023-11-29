import { Link, useLocation } from "react-router-dom";

const Footer2 = () => {
  const location = useLocation();
  const currentYear = new Date().getFullYear();

  const isHomePage = location.pathname === "/";

  if (isHomePage) {
    return null;
  }

  return (
    <footer className="text-gray-800 bottom-0 w-full bg-white">
      <hr />
      <div className="max-w-5xl mx-auto px-4 py-2">
        <div className="font-semibold text-center">
          <p className="text-sm">
            Assist Africa &copy; {currentYear}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer2;

{
  /*<div>
            <Link to="/privacy" className="text-sm mx-2 hover:text-gray-400">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm mx-2 hover:text-gray-400">
              Terms of Service
            </Link>
  </div>*/
}

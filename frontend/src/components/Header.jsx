import { PlusIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const Header = () => (
  <div className="container mx-auto px-4 py-6">
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold text-gray-800">
        Product Management System
      </h1>

      <Link
        to="/add"
        className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        title="Add a new product"
      >
        <PlusIcon className="w-5 h-5" />
        <span className="hidden sm:inline">Add Product</span>
      </Link>
    </div>
  </div>
);

export default Header;

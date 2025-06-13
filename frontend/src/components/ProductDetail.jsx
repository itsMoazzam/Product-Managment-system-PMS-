import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../redux/productsSlice";
import Spinner from "./Spinner";
import { AiOutlineArrowLeft } from "react-icons/ai";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { current, status } = useSelector((s) => s.products);

  useEffect(() => {
    dispatch(getProduct(id));
  }, [id, dispatch]);

  if (status === "loading" || !current) return <Spinner />;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg space-y-6">
      <h2 className="text-3xl font-bold text-blue-600">{current.name}</h2>

      <p className="text-gray-700">
        {current.description || "No description available."}
      </p>

      <div className="text-gray-800">
        <p>
          <strong className="font-semibold">Price:</strong>{" "}
          <span className="text-green-600">${current.price}</span>
        </p>
        <p>
          <strong className="font-semibold">Stock:</strong>{" "}
          <span className="text-blue-500">{current.stock}</span>
        </p>
      </div>

      <Link
        to="/"
        className="inline-flex items-center gap-2 text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        <AiOutlineArrowLeft className="text-lg" />
        Back to Product List
      </Link>
    </div>
  );
};

export default ProductDetail;

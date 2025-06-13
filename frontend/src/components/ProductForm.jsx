import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, editProduct, getProduct } from "../redux/productsSlice";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineTag, AiOutlineDollar, AiOutlineInbox } from "react-icons/ai";
import { MdDescription } from "react-icons/md";

const schema = yup.object({
  name: yup.string().required("Name is required"),
  price: yup.number().positive().required("Price must be positive"),
  stock: yup.number().integer().min(0).required("Stock must be 0 or more"),
  description: yup.string().nullable()
});

const ProductForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { current } = useSelector((s) => s.products);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    if (id) dispatch(getProduct(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (id && current) reset(current);
  }, [id, current, reset]);

  const onSubmit = (data) => {
    if (id) {
      dispatch(editProduct({ id, product: data })).then(() => navigate("/"));
    } else {
      dispatch(addProduct(data)).then(() => navigate("/"));
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {id ? "Edit Product" : "Add New Product"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Name Field */}
        <div>
          <label className="block font-medium mb-1">
            <AiOutlineTag className="inline-block mr-2" /> Product Name
          </label>
          <input
            placeholder="Enter product name"
            {...register("name")}
            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && (
            <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Price Field */}
        <div>
          <label className="block font-medium mb-1">
            <AiOutlineDollar className="inline-block mr-2" /> Price
          </label>
          <input
            type="number"
            step="0.01"
            placeholder="Enter price"
            {...register("price")}
            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.price && (
            <p className="text-red-600 text-sm mt-1">{errors.price.message}</p>
          )}
        </div>

        {/* Stock Field */}
        <div>
          <label className="block font-medium mb-1">
            <AiOutlineInbox className="inline-block mr-2" /> Stock Quantity
          </label>
          <input
            type="number"
            min="0"
            placeholder="Enter stock quantity"
            {...register("stock")}
            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.stock && (
            <p className="text-red-600 text-sm mt-1">{errors.stock.message}</p>
          )}
        </div>

        {/* Description Field */}
        <div>
          <label className="block font-medium mb-1">
            <MdDescription className="inline-block mr-2" /> Description
            (optional)
          </label>
          <textarea
            placeholder="Write a short description..."
            {...register("description")}
            className="w-full border rounded-md px-4 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between gap-4 pt-2">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-blue-700 transition"
          >
            {id ? "Update Product" : "Add Product"}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="w-full bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md shadow hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;

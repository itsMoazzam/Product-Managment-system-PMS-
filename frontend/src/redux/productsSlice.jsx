import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api/productsApi";

/* Thunks */
export const getProducts = createAsyncThunk("products/getAll", async () => {
  const { data } = await api.fetchProducts();
  return data;
});
export const getProduct = createAsyncThunk("products/getOne", async (id) => {
  const { data } = await api.fetchProduct(id);
  return data;
});
export const addProduct = createAsyncThunk("products/add", async (prod) => {
  const { data } = await api.createProduct(prod);
  return data;
});
export const editProduct = createAsyncThunk(
  "products/edit",
  async ({ id, product }) => {
    const { data } = await api.updateProduct(id, product);
    return data;
  }
);
export const removeProduct = createAsyncThunk("products/remove", async (id) => {
  await api.deleteProduct(id);
  return id;
});

/* Slice */
const slice = createSlice({
  name: "products",
  initialState: { list: [], current: null, status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (s) => {
        s.status = "loading";
      })
      .addCase(getProducts.fulfilled, (s, { payload }) => {
        s.status = "succeeded";
        s.list = payload;
      })
      .addCase(getProducts.rejected, (s, { error }) => {
        s.status = "failed";
        s.error = error.message;
      })
      .addCase(getProduct.fulfilled, (s, { payload }) => {
        s.current = payload;
      })
      .addCase(addProduct.fulfilled, (s, { payload }) => {
        s.list.unshift(payload);
      })
      .addCase(editProduct.fulfilled, (s, { payload }) => {
        const i = s.list.findIndex((p) => p._id === payload._id);
        if (i !== -1) s.list[i] = payload;
      })
      .addCase(removeProduct.fulfilled, (s, { payload }) => {
        s.list = s.list.filter((p) => p._id !== payload);
      });
  }
});

export default slice.reducer;

import {
  fetchAllProducts,
  fetchProductById,
  fetchProductBySearch,
  fetchProductsByFilter,
} from "@/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllProductsAsync = createAsyncThunk(
  "product/fetchAllProducts",
  async () => {
    const response = await fetchAllProducts();
    return response;
  }
);

export const fetchProductsByFilterAsync = createAsyncThunk(
  "product/fetchProductsByFilter",
  async (filter) => {
    const response = await fetchProductsByFilter(filter);
    return response;
  }
);

export const fetchProductByIdAsync = createAsyncThunk(
  "product/fetchProductById",
  async (id) => {
    const response = await fetchProductById(id);
    return response;
  }
);

export const fetchProductBySearchAsync = createAsyncThunk(
  "product/fetchProductBySearch",
  async (search) => {
    const response = await fetchProductBySearch(search);
    return response;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    status: "idle",
    productById: {},
  },
  reducers: {
    setFilteredProducts(state, action) {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      })
      .addCase(fetchProductsByFilterAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByFilterAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.productById = action.payload;
      })
      .addCase(fetchProductBySearchAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductBySearchAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.productById = action.payload;
      });
  },
});

export const { setFilteredProducts } = productSlice.actions;

export const selectAllProducts = (state) => state?.product?.products;

export const selectProductById = (state) => state.product.productById;

export default productSlice.reducer;
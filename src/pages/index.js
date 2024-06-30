import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";
import {
  selectAllProducts,
  fetchAllProductsAsync,
  setFilteredProducts,
  fetchProductsByFilterAsync,
} from "@/redux/slices/productSlice";
import Navbar from "@/components/Navbar";
import MobileFilter from "../components/product/MobileFilter";
import Pagination from "../components/Pagination";
import ProductList from "../components/product/ProductList";
import DesktopFilter from "../components/product/DesktopFilter";
import SortFilter from "../components/product/SortFilter";
import useDebounce from "../hook/useDebounce";
import { wrapper } from "../redux/store.js";

function Home({ initialProducts }) {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const [filter, setFilter] = useState({});
  const [page, setPage] = useState(1);
  const per_page = 10;

  useEffect(() => {
    if (initialProducts) {
      dispatch(setFilteredProducts(initialProducts));
    } else {
      dispatch(fetchAllProductsAsync());
    }
  }, [dispatch, initialProducts]);

  useEffect(() => {
    if (debouncedQuery) {
      const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(debouncedQuery.toLowerCase())
      );
      dispatch(setFilteredProducts(filteredProducts));
    } else {
      dispatch(fetchAllProductsAsync());
    }
    setPage(1);
  }, [debouncedQuery, dispatch]);

  const handleFilter = (event, section, option) => {
    const newFilter = { ...filter };
    if (newFilter[section.id]) {
      if (newFilter[section.id].includes(option.value)) {
        newFilter[section.id] = newFilter[section.id].filter(
          (value) => value !== option.value
        );
        if (newFilter[section.id].length === 0) {
          delete newFilter[section.id];
        }
      } else {
        newFilter[section.id] = [...newFilter[section.id], option.value];
      }
    } else {
      newFilter[section.id] = [option.value];
    }
    setFilter(newFilter);
    setPage(1);
    dispatch(fetchProductsByFilterAsync(newFilter));
  };

  const handleNext = () => {
    setPage((pre) => pre + 1);
  };

  const handlePrevious = () => {
    setPage((pre) => pre - 1);
  };

  const handleChangePage = (index) => {
    setPage(index);
  };

  return (
    <Navbar headerTitle='Products'>
      <Head>
        <title>Product Listing</title>
        <meta
          name="description"
          content="Products list."
        />
        <meta name="keywords" content="products, e-commerce, shop" />
      </Head>
      <div className="bg-white">
        <div>
          <MobileFilter
            setMobileFiltersOpen={setMobileFiltersOpen}
            mobileFiltersOpen={mobileFiltersOpen}
            handleFilter={handleFilter}
          />
          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
              <input
                type="text"
                name="search"
                id="search"
                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Search"
                onChange={(e) => setQuery(e.target.value)}
              />
              <SortFilter setMobileFiltersOpen={setMobileFiltersOpen} />
            </div>
            <section aria-labelledby="products-heading" className="pb-24 pt-6">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>
              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                <DesktopFilter handleFilter={handleFilter} />
                <div className="lg:col-span-3">
                  <ProductList
                    products={products}
                    page={page}
                    per_page={per_page}
                    dispatch={dispatch}
                  />
                </div>
              </div>
            </section>
            <Pagination
              products={products}
              page={page}
              per_page={per_page}
              handleChangePage={handleChangePage}
              handlePrevious={handlePrevious}
              handleNext={handleNext}
            />
          </main>
        </div>
      </div>
    </Navbar>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    await store.dispatch(fetchAllProductsAsync());
    const initialProducts = store.getState().product.products;
    return {
      props: { initialProducts },
    };
  }
);

export default React.memo(Home);
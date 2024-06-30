import React, { useMemo } from "react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { removeToCart, selectCart } from "@/redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";
import Image from "next/image";

function cart() {
  const router = useRouter();
  const dispatch = useDispatch();
  const cartDetails = useSelector(selectCart);

  // Memoize the totalPrice calculation to avoid re-computing on every render
  const totalPrice = useMemo(() => {
    return cartDetails.reduce((acc, curr) => {
      const discountedAcc = Math.round(acc);
      const discountedCurr = Math.round(
        curr.price * (1 - curr.discountPercentage / 100)
      );
      return discountedAcc + discountedCurr;
    }, 0);
  }, [cartDetails]);

  // Memoize the handleRemoveData function to avoid re-creating on every render
  const handleRemoveData = useMemo(() => {
    return (id) => {
      const newData = cartDetails.filter((item) => item.id !== id);
      dispatch(removeToCart(newData));
    };
  }, [cartDetails, dispatch]);

  return (
    <Navbar headerTitle="Cart">
      <Head>
        <title>Cart</title>
        <meta name="description" content="Cart." />
        <meta name="keywords" content="products, e-commerce, shop" />
      </Head>
      <div className="mx-auto bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {cartDetails.map((product) => (
                <li key={product.id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <Image
                      src={product.thumbnail}
                      alt={product.title}
                      width={250}
                      height={250}
                      loading='lazy'
                      unoptimized={true}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <span>{product.name}</span>
                        </h3>
                        <p className="ml-4">
                          {Math.round(
                            product.price *
                              (1 - product.discountPercentage / 100)
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="text-gray-500">
                        <label
                          htmlFor="quantity"
                          className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                        >
                          Qty
                        </label>
                        <select>
                          <option value="1">1</option>
                          <option value="1">1</option>
                        </select>
                      </div>

                      <div className="flex">
                        <button
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                          onClick={() => handleRemoveData(product.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>${totalPrice}</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
                onClick={() => router.push("/")}
              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </button>
            </p>
          </div>
        </div>
      </div>
    </Navbar>
  );
}

export default React.memo(cart);
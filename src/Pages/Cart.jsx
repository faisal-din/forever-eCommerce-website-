import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import Title from '../Components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../Components/CartTotal';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate, addOrder } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    let tempData = [];
    for (const item in cartItems) {
      for (const size in cartItems[item]) {
        if (cartItems[item][size] > 0) {
          tempData.push({
            _id: item,
            size: size,
            quantity: cartItems[item][size],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  return (
    <div className="pt-14 border-t">
      <div className="mb-3 text-2xl">
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      {/* Cart Items      */}

      <div>
        {cartData.map((item, index) => {
          const productsData = products.find(
            (product) => product._id === item._id
          );

          return (
            <div
              key={index}
              className="py-3 border-b border-t text-gray-700 grid  grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                <img
                  src={productsData.image[0]}
                  alt=""
                  className="w-16 sm:w-20"
                />
                <div>
                  <p className="text-sm sm:text-lg font-medium">
                    {productsData.name}
                  </p>

                  <div className="flex items-center gap-5 mt-2">
                    <p className=" ">
                      {currency}
                      {productsData.price}
                    </p>
                    <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50 ">
                      {item.size}
                    </p>
                  </div>
                </div>
              </div>

              <input
                onChange={(e) => {
                  e.target.value === '' || e.target.value < 0
                    ? null
                    : updateQuantity(
                        item._id,
                        item.size,
                        Number(e.target.value)
                      );
                }}
                className="border  max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 "
                type="number"
                min={1}
                defaultValue={item.quantity}
              />
              <img
                onClick={() => updateQuantity(item._id, item.size, 0)}
                src={assets.bin_icon}
                alt=""
                className="w-4 mr-4 sm:w-5 cursor-pointer"
              />
            </div>
          );
        })}
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />

          <div className="w-full text-end">
            <button
              onClick={() => {
                addOrder(); // Call addOrder to move items to orders state
                navigate('/place-order');
              }}
              className="my-8 px-8 py-3 bg-black text-white text-sm"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

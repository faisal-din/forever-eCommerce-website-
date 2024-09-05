import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../Components/Title';
import ProductItem from '../Components/ProductItem';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevent');

  const toggleCategory = (e) => {
    const value = e.target.value;

    category.includes(value)
      ? setCategory((prev) => prev.filter((item) => item !== value))
      : setCategory((prev) => [...prev, value]);
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;

    subCategory.includes(value)
      ? setSubCategory((prev) => prev.filter((item) => item !== value))
      : setSubCategory((prev) => [...prev, value]);
  };

  const applyFilter = () => {
    if (!products || products.length === 0) return; // Ensure products are available

    let productsCopy = products.slice(); // Create a shallow copy of products

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase().trim())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    setFilterProducts(productsCopy); // Update the filtered products state
  };

  const sortProducts = () => {
    if (filterProducts.length === 0) return; // Ensure there are products to sort

    let filteredProdCopy = [...filterProducts]; // Create a shallow copy of filtered products

    switch (sortType) {
      case 'low-high':
        setFilterProducts(filteredProdCopy.sort((a, b) => a.price - b.price));
        break;
      case 'high-low':
        setFilterProducts(filteredProdCopy.sort((a, b) => b.price - a.price));
        break;

      default:
        setFilterProducts(() => {
          applyFilter();
        });

        break;
    }

    setFilterProducts(filteredProdCopy); // Update the filtered products state
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProducts();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter Option */}

      <div className="min-w-52">
        <p
          onClick={() => {
            setShowFilter(!showFilter);
          }}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          {' '}
          Filters
          <img
            src={assets.dropdown_icon}
            alt=""
            className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`}
          />
        </p>

        {/* Category Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? '' : 'hidden'
          } 
            sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>

          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={'Men'}
                onChange={toggleCategory}
              />
              MEN
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={'Women'}
                onChange={toggleCategory}
              />
              WOMEN
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={'Kids'}
                onChange={toggleCategory}
              />
              KIDS
            </p>
          </div>
        </div>

        {/* Sub Catrgory Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showFilter ? '' : 'hidden'
          } 
            sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPES</p>

          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={'Topwear'}
                onChange={toggleSubCategory}
              />
              Topwear
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={'Bottomwear'}
                onChange={toggleSubCategory}
              />
              Bottomwear
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={'Winterwear'}
                onChange={toggleSubCategory}
              />
              Winterwear
            </p>
          </div>
        </div>
      </div>

      {/* Right Side --> Product List */}

      <div className="flex-1">
        {/* Title */}
        <div className="flex justify-between text-sm sm:text-xl lg:text-2xl mb-4">
          <Title text1={'ALL'} text2={'COLLECTIONS'} />

          {/* Product Sort */}
          <select
            onChange={(e) => {
              setSortType(e.target.value);
            }}
            value={sortType}
            className="border border-gray-300 text-sm px-2"
          >
            <option value="relevent">Sort by: Relevent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Product List */}

        <div className="grid grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((product) => (
            <ProductItem
              key={product._id}
              id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;

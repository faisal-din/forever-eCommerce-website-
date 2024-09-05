import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
  // Extract context values related to search and visibility from ShopContext
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);

  // Local state to control visibility and animation of the search bar
  const [visible, setVisible] = useState(showSearch);
  const [animate, setAnimate] = useState('');

  // Get current URL path
  const location = useLocation();

  // Effect to update the search bar visibility and animation based on URL path and showSearch

  useEffect(() => {
    if (location.pathname.includes('collection')) {
      // Show the search bar and apply the scale-up animation if it includes 'collection' page

      setVisible(true);
      setAnimate('animate-scale-up-center');
    } else {
      // Hide the search bar if doesn`t includes 'collection' page
      setVisible(false);
    }
  }, [location, showSearch]); // Update visibility when location and showSearch change

  const handleClose = () => {
    setAnimate('animate-scale-down-center');
    setTimeout(() => setShowSearch(false), 400); // Hide the search bar after a delay to match the duration of the scale-down animation
  };

  // Conditionally render the search bar based on visibility and showSearch state
  return visible && showSearch ? (
    <div className={`border-t border-b bg-gray-50 text-center ${animate} `}>
      <div className="w-[450px] inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-8 rounded-full ">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className=" flex-1 outline-none bg-inherit text-sm "
        ></input>
        <img src={assets.search_icon} alt="" className="w-4" />
      </div>
      <img
        src={assets.cross_icon}
        alt=""
        className="w-4 h-4 ml-3 inline  cursor-pointer"
        onClick={handleClose}
      />
    </div>
  ) : null; // Render nothing if visible or showSearch is false
};

export default SearchBar;

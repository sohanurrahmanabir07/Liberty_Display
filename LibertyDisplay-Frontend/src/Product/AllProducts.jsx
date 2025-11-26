import React, { useContext, useEffect, useState } from "react";

import AOS from "aos";
import "aos/dist/aos.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useOutletContext } from "react-router";
import { capitalizeWords } from "../Functions/functions";
import { ProductUpload } from "../Dashboard/FileUpload/ProductUpload";
import { ProductCard } from "../Product Card/ProductCard";
import Banner from "../assets/image/Banner Image/All Product Banner.jpg";
import { Searching } from "../Searching/Searching";
import { motion, AnimatePresence } from "framer-motion";

export const AllProducts = () => {
  const [limit, setLimit] = useState(6);
  const { products, categories } = useOutletContext();
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [subCategoryFilter, setSubCategoryFilter] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (products != null) {
      setFilterProducts(products); // Load products into filterProducts when available
    }
  }, [products]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 200);
    AOS.init({
      disable: "mobile",
    });
  }, []);

  useEffect(() => {
    if (products) {
      const filter = products.filter((item) => {
        const searchLower = search.toLowerCase();

        // Define the keys to search in from the category
        const searchableKeys = [
          "model",
          "category",
          "release_date",
          "name",
          "rating",
        ];

        // Check if any of the fields contain the search term
        return searchableKeys.some(
          (key) =>
            item[key] &&
            item[key].toString().toLowerCase().includes(searchLower)
        );
      });
      setFilterProducts(filter);
    }
  }, [search]);
  useEffect(() => {
    if (products) {
      let filtered = products;
      // If category filter applied
      if (categoryFilter.length > 0) {
        filtered = filtered.filter((item) =>
          categoryFilter.includes(String(item?.category).toLowerCase())
        );
      }

      // If subcategory filter applied
      if (subCategoryFilter.length > 0) {
        filtered = filtered.filter((item) =>
          subCategoryFilter.includes(String(item?.subCategory).toLowerCase())
        );
      }

      setFilterProducts(filtered);
    }
  }, [products, categoryFilter, subCategoryFilter]);

  const handleCategoryFilter = (e) => {
    e.target.checked
      ? setCategoryFilter((prev) => [...prev, e.target.value])
      : setCategoryFilter((prev) =>
          [...prev].filter((item) => item != e.target.value)
        );
  };

  const handleSubCategoryFilter = (e) => {
    e.target.checked
      ? setSubCategoryFilter((prev) => [...prev, e.target.value])
      : setSubCategoryFilter((prev) =>
          [...prev].filter((item) => item != e.target.value)
        );
  };

  return (
    <section
      {...(!location.pathname.startsWith("/dashboard")
        ? { "data-aos": "fade-up", "data-aos-duration": "1000" }
        : {})}
      className="w-full"
    >
      <div
        className={` md:h-[550px] w-full overflow-hidden ${
          location.pathname.startsWith("/dashboard") ? `mt-0` : `md:-mt-20`
        }    bg-[#2a337b] `}
      >
        <img
          loading="lazy"
          src={
            Banner ||
            `https://c4.wallpaperflare.com/wallpaper/416/765/276/facebook-cover-night-skyscrapers-city-wallpaper-preview.jpg`
          }
          className="h-[550px]  md:w-full max-sm:h-[220px] object-cover brightness-90 "
          alt=""
        />
      </div>
      <Searching search={search} setSearch={setSearch}></Searching>
      <div
        className={`max-w-[1340px] ${
          !location.pathname.startsWith("/dashboard") ? "mx-auto" : "px-3"
        }  space-y-5 bg- mb-20`}
      >
        <ProductUpload></ProductUpload>
        {location.pathname.startsWith("/dashboard") && (
          <div className="flex max-sm:justify-center max-sm:items-center ">
            <label
              htmlFor="my_modal_4"
              className="btn text-base font-semibold hover:bg-[#2a337b bg-[#2a337b] rounded-md text-white  "
            >
              Add Products <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
            </label>
          </div>
        )}

        <section
          className={`flex justify-center max-sm:items-center  max-sm:flex-col  max-sm:space-y-3 md:space-x-3  `}
        >
          <div className="max-sm:hidden">
            <section className="border-2 border-cyan-200 w-[220px] space-y-3 p-4 rounded-lg shadow-lg ">
              {categories &&
                categories.map((item, index) => (
                  <section key={index} className="space-y-3">
                    <div className="flex justify-between cursor-pointer">
                      <label className="font-semibold text-[#2a337b]">
                        {capitalizeWords(item?.name)}
                      </label>
                      <input
                        type="checkbox"
                        value={item?.name?.toLowerCase()}
                        onChange={(e) => {
                          setSubCategoryFilter([]);
                          handleCategoryFilter(e);
                        }}
                        className="toggle toggle-sm checked:text-[#2a337b] checked:border-[#2a337b] "
                      />
                    </div>

                    {categoryFilter.includes(item?.name.toLowerCase()) &&
                      item?.subCategories?.map((subCat, index) => (
                        <div
                          key={index}
                          className="flex transition-all duration-300  justify-between ml-3 cursor-pointer"
                        >
                          <label className="text-sm font-semibold text-[#2a337b]">
                            {capitalizeWords(subCat)}
                          </label>
                          <input
                            type="checkbox"
                            value={subCat?.toLowerCase()}
                            onChange={handleSubCategoryFilter}
                            checked={subCategoryFilter.includes(
                              subCat.toLowerCase()
                            )}
                            className="toggle toggle-xs checked:text-[#2a337b] checked:border-[#2a337b]"
                          />
                        </div>
                      ))}
                  </section>
                ))}
            </section>
          </div>

          <section className="space-y-2 md:w-4/5 w-full ">
            <div className="flex items-center flex-col md:hidden">
              <div
                onClick={() => setShowFilter(!showFilter)}
                className="dropdown dropdown-end transition-all duration-300"
              >
                <div
                  tabIndex={0}
                  role="button"
                  className="btn text-white bg-[#2a337b]  m-1 w-[150px] rounded-sm"
                >
                  Filter <FontAwesomeIcon icon={faFilter}></FontAwesomeIcon>
                </div>
              </div>
              {showFilter && (
                <section
                  className={`w-80/100 border-2 border-gray-200  transition-all duration-300 ease-in-out transform md:hidden  space-y-3 p-4 rounded-md shadow-lg my-5  ${
                    showFilter
                      ? `opacity-100 scale-100`
                      : `opacity-0 scale-95 hidden`
                  }`}
                >
                  {categories &&
                    categories.map((item, index) => (
                      <section key={index} className="space-y-3">
                        <div className="flex justify-between cursor-pointer">
                          <label className="font-semibold text-[#2a337b]">
                            {capitalizeWords(item?.name)}
                          </label>
                          <input
                            type="checkbox"
                            value={item?.name?.toLowerCase()}
                            onChange={(e) => {
                              setSubCategoryFilter([]);
                              handleCategoryFilter(e);
                            }}
                            className="toggle toggle-sm checked:text-[#2a337b] checked:border-[#2a337b] "
                          />
                        </div>

                        {categoryFilter.includes(item?.name.toLowerCase()) &&
                          item?.subCategories?.map((subCat, index) => (
                            <div
                              key={index}
                              className="flex transition-all duration-300  justify-between ml-3 cursor-pointer"
                            >
                              <label className="text-sm font-semibold text-[#2a337b]">
                                {capitalizeWords(subCat)}
                              </label>
                              <input
                                type="checkbox"
                                value={subCat?.toLowerCase()}
                                onChange={() => {
                                  handleSubCategoryFilter;
                                }}
                                className="toggle toggle-xs checked:text-[#2a337b] checked:border-[#2a337b]"
                              />
                            </div>
                          ))}
                      </section>
                    ))}
                </section>
              )}
            </div>

            {products ? (
              filterProducts.length > 0 ? (
                <section className=" min-h-[300px] space-y-5">
                  <section className="flex">
                    <motion.div
                      className={`grid grid-cols-1 md:grid-cols-3 md:gap-10  gap-5  max-sm:px-5 `}
                    >
                      <AnimatePresence>
                        {filterProducts.slice(0, limit).map((item, index) => (
                          <motion.div
                            key={item._id || index}
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ProductCard item={item} />
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </motion.div>
                  </section>

                  <div
                    className={`text-center ${
                      limit >= filterProducts.length ? "hidden" : ""
                    } `}
                  >
                    <button
                      disabled={limit >= filterProducts.length}
                      onClick={() => setLimit((prev) => prev + 6)}
                      className={`btn ${
                        limit >= filterProducts.length
                          ? `text-gray-400`
                          : `text-blue-700 hover:bg-blue-700 hover:text-white`
                      }   rounded-md`}
                    >
                      {" "}
                      Show More...
                    </button>
                  </div>
                </section>
              ) : (
                <div className="h-screen">
                  <AnimatePresence>
                    {filterProducts.length === 0 && (
                      <motion.div
                        key="no-products"
                        layout
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.3 }}
                        className="h-[300px] flex items-center justify-center"
                        style={{ minHeight: "200px" }} // set minHeight as you wish
                      >
                        <p className="font-bold text-center text-2xl">
                          No Product Available...
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((item, index) => (
                  <div
                    key={index}
                    className="skeleton h-[250px] w-[250px]"
                  ></div>
                ))}
              </div>
            )}
          </section>
        </section>
      </div>
    </section>
  );
};

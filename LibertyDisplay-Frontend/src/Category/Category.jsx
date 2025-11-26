import React, { useEffect, useMemo, useState } from "react";
import {
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import axios from "axios";
import { DynamicBanner } from "../Dynamic Banner/DynamicBanner";
import { capitalizeWords, urlReverter } from "../Functions/functions";
import { ProductCard } from "../Product Card/ProductCard";
import { Searching } from "../Searching/Searching";
export const Category = ({ url }) => {
  const { categoryName } = useParams();
  const [filterProducts, setFilterProducts] = useState(null);
  const category = urlReverter(categoryName);
  const [limit, setLimit] = useState(6);
  const [search, setSearch] = useState("");
  const [categoryItem, setCategoryItem] = useState(null);
  const [randomItem, setRandomItem] = useState(null);
  const { products, categories, setCategories } = useOutletContext();
  const admin = useSelector((state) => state.AirWheel.users);
  const [subCategoriesFilter, setSubCategoriesFilter] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const matchesSubCategory = (product, selectedSet) => {
    if (selectedSet.size === 0) return true; // nothing selected => allow all

    // Normalize product subcategory field: handle string or array or different key names
    let vals = product?.subCategory ?? product?.subCategories ?? null;
    if (!vals) return false;

    if (!Array.isArray(vals)) vals = [vals];

    return vals.some((v) => {
      if (!v) return false;
      const s = String(v).toLowerCase();
      return selectedSet.has(s);
    });
  };

  useEffect(() => {
    if (products && categories) {
      const filter_products = products.filter((item) =>
        item?.category?.toLowerCase().includes(category?.toLowerCase())
      );

      if (filter_products) {
        setFilterProducts(filter_products);
      } else {
        setFilterProducts([]);
      }

      const index = Math.floor(
        Math.random() * (filter_products.length - 1 - 0 + 1) + 0
      );
      setRandomItem(filter_products[index]);
      const filterCategoryItem = categories.find(
        (item) => item.name.toLowerCase() == category.toLowerCase()
      );
      setCategoryItem(filterCategoryItem);
    }
  }, [products, categories, categoryName]);

  useEffect(() => {
    if (location?.state?.subCategory) {
      setSubCategoriesFilter([location.state.subCategory.toLowerCase()]);
    }
  }, [location?.state?.subCategory]);

  const handleCheck = (e) => {
    e.target.checked
      ? setSubCategoriesFilter((prev) => [
          ...prev,
          e.target.value.toLowerCase(),
        ])
      : setSubCategoriesFilter((prev) =>
          [...prev].filter((item) => item != e.target.value.toLowerCase())
        );
  };

  const handleDelete = () => {
    if (categoryItem && categoryItem._id) {
      const data = {
        id: categoryItem._id,
      };
      Swal.fire({
        title: "Do you want to Delete this?",
        showDenyButton: true,
        confirmButtonText: "Confirm Delete?",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          axios
            .delete(`${import.meta.env.VITE_BACKEND_URL}/api/deleteCategory`, {
              data,
            })
            .then((res) => {
              if (res.status == 200) {
                setCategories(res.data.data);
                Swal.fire(res.data.message, "success");
                navigate("/dashboard/categories");
              }
            });
        } else if (result.isDenied) {
          Swal.fire("Ok keep this Product", "", "info");
        }
      });
    } else {
      Swal.fire({
        title: "Not Found",
        icon: "error",
      });
    }
  };

  const filteredProducts = useMemo(() => {
    if (!Array.isArray(filterProducts)) return [];

    const q = (search || "").trim().toLowerCase();
    const selected = new Set(
      (subCategoriesFilter || []).map((s) => s.toLowerCase())
    );

    return filterProducts
      .filter((item) => !q || item?.model?.toLowerCase()?.includes(q))
      .filter((item) => matchesSubCategory(item, selected));
  }, [filterProducts, search, subCategoriesFilter]);

  return (
    <div>
      <DynamicBanner item={categoryItem}></DynamicBanner>

      <Searching search={search} setSearch={setSearch}></Searching>

      <div className="max-w-[1340px] mx-auto space-y-5 max-sm:px-5">
        <section className="mx-auto my-5">
          <section className="flex justify-center items-center">
            <section className="flex md:gap-5">
              <div className="max-sm:hidden">
                {categoryItem?.subCategories?.length > 1 && (
                  <section className="border-2 border-cyan-200 w-[220px] space-y-3 p-4 rounded-lg shadow-lg ">
                    {categoryItem &&
                      categoryItem?.subCategories?.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between cursor-pointer"
                        >
                          <label className="font-semibold text-[#2a337b]">
                            {capitalizeWords(item)}
                          </label>
                          <input
                            type="checkbox"
                            value={item?.toLowerCase()}
                            checked={subCategoriesFilter.includes(
                              item?.toLowerCase()
                            )}
                            onChange={handleCheck}
                            className="toggle toggle-sm checked:text-[#2a337b] checked:border-[#2a337b]"
                          />
                        </div>
                      ))}
                  </section>
                )}
              </div>

              {(filterProducts && filterProducts.length == 0) ||
                (filteredProducts && filteredProducts.length == 0 && (
                  <div className="min-h-[500px]  min-w-[800px] text-center duration-300 transition-all ">
                    <p className="text-2xl font-bold text-gray-800">
                      No Products yet
                    </p>
                  </div>
                ))}
              <section className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-3 md:gap-10 gap-3 min-h-[500px]">
                  {filterProducts
                    ? filteredProducts
                        ?.slice(0, limit)
                        .map((item, index) => (
                          <ProductCard key={index} item={item}></ProductCard>
                        ))
                    : [1, 2, 3, 4, 5, 6].map((item, index) => (
                        <div
                          key={index}
                          className="skeleton h-[250px] w-[350px]"
                        ></div>
                      ))}
                </div>

                <div
                  className={`text-center ${
                    limit >= filteredProducts?.length ? "hidden" : ""
                  } `}
                >
                  <button
                    disabled={limit >= filteredProducts?.length}
                    onClick={() => setLimit((prev) => prev + 6)}
                    className={`btn ${
                      limit >= filteredProducts?.length
                        ? `text-gray-400`
                        : `text-[#2a337b] hover:bg-[#2a337b] hover:text-white`
                    }   rounded-md`}
                  >
                    {" "}
                    Show More...
                  </button>
                </div>
              </section>
            </section>
          </section>
        </section>
      </div>
      {/* {
        admin && location.pathname.startsWith('/dashboard') &&
        (
          <div className='flex flex-row-reverse'>
            <div onClick={handleDelete} >
              <button className='btn btn-error px-3 py-2 rounded-lg'>Delete Category</button>
            </div>
          </div>
        )
      } */}
    </div>
  );
};

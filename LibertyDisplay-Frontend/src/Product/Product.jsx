import React, { useEffect, useMemo, useState } from "react";
import { useOutletContext, useParams } from "react-router";

import { ProductImage } from "./ProductImage";
import { ProductDetails } from "./ProductDetails";
import { ProductInfo } from "./ProductInfo";
// import { DynamicBanner } from '../Dynamic Banner/DynamicBanner'
import ProductAccordion from "./ProductAccordion";
import AOS from "aos";
import "aos/dist/aos.css";
import ProductImages from "./Product Images/ProductImages";
import { DynamicBanner } from "../Dynamic Banner/DynamicBanner";

export const Product = () => {
  const { model } = useParams();
  const IMAGES = [
    "https://res.cloudinary.com/des05ruq7/video/upload/v1756637744/zvdavfluq9u8dsnc6yc7.mp4",
  ];

  // const [item, setItem] = useState(null)
  const products = useOutletContext().products;
  // const [categoryItem, setCategoryItem] = useState(null)
  const categories = useOutletContext().categories;

  const item = useMemo(() => {
    if (!products) return null;
    return products.find((product) => product?.model === model);
  }, [products, model]);

  const categoryItem = useMemo(() => {
    if (!categories || !item) return null;
    const category = categories.find(
      (cat) => cat?.name?.toLowerCase() === item.category?.toLowerCase()
    );
    return category || -1;
  }, [categories, item]);
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <section className="space-y-5">
      {item ? (
        <DynamicBanner item={categoryItem}></DynamicBanner>
      ) : (
        <div className="skeleton w-full h-[300px]"></div>
      )}
      <div className="max-w-[1340px] mx-auto px-5 space-y-10">
        <section className="flex justify-between max-sm:flex-col md:space-x-5 max-sm:space-y-5">
          {item ? (
            // <ProductImage item={item}></ProductImage>
            <div className="md:w-1/2">
              <ProductImages item={item}></ProductImages>
            </div>
          ) : (
            <div className="skeleton w-full md:w-1/2 h-[300px]"></div>
          )}

          {item ? (
            <div className="md:w-1/2">
              <ProductDetails item={item}></ProductDetails>
            </div>
          ) : (
            <div className="skeleton md:w-1/2 h-[300px]"></div>
          )}
        </section>

        {/* <video src={IMAGES[0]} className="rounded-lg w-full  " controls /> */}

        {item?.videoUrl?.length > 0 && (
          <video
            src={item?.videoUrl[0] || ""}
            className="rounded-lg w-full  "
            autoPlay
            loop
            controls
          />
        )}

        <section className="flex gap-5 max-sm:flex-col space-y-5">
          <div className="md:w-1/2">
            <ProductAccordion item={item}></ProductAccordion>
          </div>

          <div className="md:w-1/2   rounded-lg ">
            <ProductInfo item={item}></ProductInfo>
          </div>
        </section>
      </div>
    </section>
  );
};

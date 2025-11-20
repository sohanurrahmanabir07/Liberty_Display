import React, { useEffect } from "react";
import Slider from "react-slick";
import { FaUser, FaFolder } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useOutletContext } from "react-router-dom";
import { BlogCard } from "../Blog/Blog Card/BlogCard";
import AOS from "aos";
import "aos/dist/aos.css";
const blogPosts = [
  {
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
    date: "DECEMBER 12",
    title: "Eum ad dolor et. Autem aut fugiat debitis",
    author: "Julia Parker",
    category: "Politics",
  },
  {
    image:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80",
    date: "JULY 17",
    title: "Et repellendus molestiae qui est sed omnis",
    author: "Mario Douglas",
    category: "Sports",
  },
  {
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
    date: "SEPTEMBER 05",
    title: "Quia assumenda est et veritati tirana ploder",
    author: "Lisa Hunter",
    category: "Economics",
  },
  {
    image:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
    date: "MARCH 22",
    title: "Inventore voluptas iste. Sed quas alias",
    author: "Samuel Reed",
    category: "Business",
  },
  {
    image:
      "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=600&q=80",
    date: "AUGUST 14",
    title: "Impedit quo minima. Cupiditate voluptatem",
    author: "Emily Turner",
    category: "Technology",
  },
];

const settings = {
  dots: false,
  infinite: true,
  speed: 600,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: true,
  responsive: [
    {
      breakpoint: 1100,
      settings: { slidesToShow: 2 },
    },
    {
      breakpoint: 700,
      settings: { slidesToShow: 1 },
    },
  ],
};

const BlogSlider = () => {
  const { blogs } = useOutletContext();
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className="bg-gray-100">
      <div
        className="w-full max-w-[1300px] px-5 mx-auto py-10"
        data-aos="fade-up"
        data-aos-duration="1500"
      >
        {/* Section Title */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-4 mb-2">
            <span className="w-14 h-1 bg-[#2a337b] rounded"></span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-700">
              Recent Blog Posts
            </h2>
            <span className="w-14 h-1 bg-[#2a337b] rounded"></span>
          </div>
          <p className="text-gray-500 mt-2">
            Necessitatibus eius consequatur ex aliquid fuga eum quidem sint
            consectetur velit
          </p>
        </div>
        {/* Blog Slider */}

        {blogs.length == 1 ? (
          <div className=" md:w-30/100 ">
            <BlogCard post={blogs[0]}></BlogCard>
          </div>
        ) : (
          <Slider {...settings}>
            {blogs?.map((post, i) => (
              <BlogCard post={post} key={i}></BlogCard>
            ))}
          </Slider>
        )}
        {blogs && blogs.length == 0 && (
          <p className="text-xl font-semibold text-center">
            ... No Blogs Posted Yet 😓 ...
          </p>
        )}
      </div>
    </div>
  );
};

export default BlogSlider;

import React, { useEffect, useState } from "react";
// import banner from "../assets/img/page-title-bg.jpg"
import { FaFolder, FaUser } from "react-icons/fa6";
import { Description } from "../About/About Descrption/Description";
import { BlogCard } from "./Blog Card/BlogCard";
import { useLocation, useOutletContext, useParams } from "react-router-dom";
import { DescriptionModal } from "./Blog Description Modal/DescriptionModal";
export const Blog = () => {
  const location = useLocation();
  const { blogs, setBlogs } = useOutletContext();
  const [currentBlog, setCurrentBlog] = useState(null);

  useEffect(() => {
    if (location.state?.blogID && blogs) {
      const blog = blogs?.filter(
        (item, index) => item._id == location?.state?.blogID
      );

      if (blog.length == 1) {
        setCurrentBlog(blog[0]);
        setTimeout(() => {
          document.getElementById(blog[0]._id).checked = true;
        }, 500);
      }
    }
  }, [location.state, blogs]);
  // useEffect(() => {

  //     window.scroll(0, 0)
  // }, [])

  return (
    <div className="space-y-10 py-10 px-5 ">
      {!location.pathname.startsWith("/dashboard") && (
        // <div className="-mt-20 overflow-hidden h-[350px] relative">
        //     <img src={banner} className="brightness-50 h-[500px] bg-cover w-full" alt="" />

        //     <div className="text-center w-[650px] space-y-10 absolute top-1/2 left-1/2 transform -translate-x-1/2  -translate-y-1/2 text-5xl text-white font-semibold ">Blog</div>
        // </div>

        <div className="text-center space-y-5">
          <p className="text-3xl md:text-5xl font-semibold">
            {" "}
            <span className="text-[#2a337b]">Our</span> <span>Blogs</span>{" "}
          </p>
        </div>
      )}

      {blogs.length == 0 && (
        <div className="min-h-[330px]">
          <p className="font-semibold text-3xl text-center">No Blog Yet..</p>
        </div>
      )}

      <div>
        <section className="grid  grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-y-5 max-w-[1340px] mx-auto">
          {blogs.length > 0
            ? blogs?.map((post, i) => <BlogCard key={i} post={post}></BlogCard>)
            : ""}
        </section>
      </div>

      {currentBlog && (
        <DescriptionModal
          index={currentBlog._id}
          description={currentBlog.description}
          location={location}
        ></DescriptionModal>
      )}
    </div>
  );
};

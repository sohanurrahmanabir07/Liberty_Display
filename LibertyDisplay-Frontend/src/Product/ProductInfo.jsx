import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

export const ProductInfo = ({ item }) => {
  const handleDownload = async () => {
    if (item?.pdf) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/download/${item?.pdf}`,
          {
            responseType: "blob",
          }
        );

        const blob = new Blob([response.data], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "certificate.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "Download failed",
          text: error.response.data.message || error.message,
          icon: "error",
        });
      }
    }
  };

  return (
    <div className="space-y-3 mb-20">
      <div className="collapse collapse-plus border border-base-300">
        <input type="checkbox" />
        <div className="collapse-title font-semibold text-[#2a337b]  text-lg">
          Documents
        </div>
        {item?.pdf ? (
          Object.keys(item.pdf).map((ele, index) => {
            return (
              <div
                key={index}
                className="collapse-content text-sm  cursor-pointer group flex space-x-2"
              >
                <p
                  className="group-hover:underline text-blue-500 "
                  onClick={() => (window.location.href = item?.pdf[ele])}
                >
                  {ele.toUpperCase()}
                </p>
                <FontAwesomeIcon icon={faDownload} size="lg"></FontAwesomeIcon>
              </div>
            );
          })
        ) : (
          <div className="collapse-content text-sm  cursor-pointer group flex space-x-2">
            <p className=" text-blue-500 "> PDF Not Available 😞</p>
          </div>
        )}
      </div>
    </div>
  );
};

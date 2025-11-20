import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext } from "react-router";
import Swal from "sweetalert2";

export const UploadBanner = () => {
  const updateBanner = useRef(null);
  const { setBanners, setDashboardBanners } = useOutletContext();

  const admin = useSelector((state) => state.AirWheel.users);

  const [Files, setFiles] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [region, setRegion] = useState("");

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFiles(files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (admin) {
      let formData = new FormData();
      if (Files && title && description) {
        const info = {
          title,
          description,
          region,
        };
        for (let image of Files) {
          formData.append("images", image);
        }

        formData.append("info", JSON.stringify(info));

        setLoading(true);

        axios
          .post(
            `${import.meta.env.VITE_BACKEND_URL}/api/uploadBanner`,
            formData
          )
          .then((res) => {
            if (res.status == 200) {
              setBanners(res.data.data);
              setDashboardBanners(res.data.dashboardData);
              Swal.fire({
                icon: "success",
                title: res.data.message,
              });
            }
            setFiles([]);
            updateBanner.current.value = null;
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: err.response.data.message || err.message,
              text: "Something went wrong!",
            });
          })
          .finally(() => {
            setLoading(false); // move this here
          });
      } else {
        Swal.fire({
          icon: "error",
          title: " No",
        });
      }
    }
  };

  const handleClose = () => {
    setFiles([]);
    setTitle("");
    setDescription("");
    setRegion("");
    setLoading(false);
    updateBanner.current.value = null;
    document.getElementById("uploadBanner").checked = false;
  };

  return (
    <div>
      <input type="checkbox" id="uploadBanner" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box relative space-y-4">
          <div
            className="modal-action absolute right-2 -top-5"
            onClick={handleClose}
          >
            {/* <label htmlFor="uploadLogo" ><FontAwesomeIcon icon={faXmark} size='lg' className='cursor-pointer' ></FontAwesomeIcon></label> */}
            <FontAwesomeIcon
              icon={faXmark}
              size="lg"
              className="cursor-pointer"
            ></FontAwesomeIcon>
          </div>

          {/* ___________________________________________________form_______________________________ */}

          <div>
            <h1 className="text-center text-3xl text-gray-800">
              Banner Upload
            </h1>
          </div>

          <div className="w-full bg-base-200 rounded-lg p-5">
            <label className="label">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="input w-full"
              placeholder="My awesome page"
            />

            <select
              name="region"
              value={region}
              className="border-2 border-gray-500 p-2 my-5 w-full transition-all duration-300 cursor-pointer rounded-md "
              onChange={(e) => setRegion(e.target.value)}
              id=""
            >
              <option disabled value="">
                Choose Region
              </option>
              <option value="int">Global</option>
              <option value="us">United State America</option>
              <option value="uk">United Kingdom</option>
              <option value="it">Italy</option>
              <option value="ae">UAE</option>
            </select>
            <br />
            <label className="label">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="textarea w-full"
              placeholder="Bio"
            ></textarea>
            <label className="label">Image</label>
            <div className="border-1 cursor-pointer p-2 text-lg text-gray-500 rounded-lg">
              <input
                type="file"
                accept="image/*"
                className="cursor-pointer"
                onChange={handleFileChange}
                ref={updateBanner}
                name=""
                id=""
              />
            </div>
          </div>

          <div className="text-center">
            <button
              disabled={Files.length == 0 || Loading || !title || !description}
              onClick={handleSubmit}
              className="btn btn-secondary btn-dash"
            >
              {Loading ? <p>Uploading...</p> : <p>Upload</p>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

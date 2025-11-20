import { useNavigate, useOutletContext } from "react-router";
import { capitalizeWords, urlConverter } from "../../Functions/functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ModalImage from "react-modal-image";
import { ImageUpload } from "../FileUpload/ImageUpload";
import { ImageModal } from "../FileUpload/ImageModal";
import { UpdateCategory } from "../Update/CategoryUpdate";
import axios from "axios";
import Swal from "sweetalert2";
import { CertificateUpload } from "../FileUpload/CertificateUpload";

export const DashboardCertificate = () => {
  const { certificate, setCertificate } = useOutletContext();
  const navigate = useNavigate();

  const handleClick = (item) => {
    navigate(`/category/${urlConverter(item?.name)}`);
  };
  const handleDelete = (item) => {
    if (item) {
      const formData = {
        id: item._id,
      };

      Swal.fire({
        title: `Do you want Delete ${item.name} Category?`,
        showDenyButton: true,
        confirmButtonText: "Save",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(
              `${import.meta.env.VITE_BACKEND_URL}/api/deleteCertificate`,
              { data: { id: item._id } }
            )
            .then((res) => {
              Swal.fire({
                icon: "success",
                title: `${item.name} got deleted`,
                text: "Deletion successful!",
              });
              setCertificate(res.data.data);
            })
            .catch((error) => {
              Swal.fire({
                icon: "error",
                title: "Oops Image Couldnt Select...",
                text: error.response.data.message || error.message,
              });
            });
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    } else {
      Swal.fire("Changes are not saved", "", "info");
    }
  };

  return (
    <div className="md:mx-4 my-2 space-y-3 w-full px-5 ">
      <p className="md:text-5xl text-3xl text-center">Certificates</p>
      <br />
      <label
        htmlFor="certificate"
        className="btn text-base font-semibold hover:bg-[#2a337b bg-[#2a337b] rounded-md text-white  "
      >
        Add Certificate <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
      </label>

      <section className="flex md:flex-wrap items-center flex-col md:flex-row max-sm:items-center gap-4">
        {certificate &&
          certificate.map((item, index) => {
            return (
              <div className="relative group" key={index}>
                <div className="card cursor-pointer relative bg-base-100 border-[#2a337b] rounded-md shadow-sm">
                  <figure>
                    <ModalImage
                      small={
                        item?.imageUrl[0] ||
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png"
                      }
                      large={
                        item?.imageUrl[0] ||
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png"
                      }
                      alt={item?.name || "Certificate"}
                      className="md:w-[200px] hover:scale-105 duration-150 transition-all ease-in-out object-cover"
                      hideDownload={true}
                      hideZoom={true}
                    />
                  </figure>
                  <div>
                    <p className="absolute bottom-2 left-2 text-center font-semibold text-xl text-gray-500 ">
                      {capitalizeWords(item?.name)}
                    </p>
                  </div>
                </div>
                <div className="absolute md:group-hover:opacity-100 md:opacity-0 opacity-100  space-x-2 transition-all duration-150  ease-in-out -right-2 -top-5">
                  <button
                    className="btn btn-error btn-dash  rounded-full"
                    onClick={() => handleDelete(item)}
                  >
                    X
                  </button>
                </div>
              </div>
            );
          })}
      </section>
      <CertificateUpload></CertificateUpload>
    </div>
  );
};

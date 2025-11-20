import axios from "axios";
import React, { useRef, useState } from "react";
import { useOutletContext } from "react-router";
import Swal from "sweetalert2";

const uid = () => crypto?.randomUUID?.() || String(Date.now() + Math.random());

export const ImageModal = () => {
  const [imageFile, setImageFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);
  const [name, setName] = useState("");
  // ⬇️ sub-categories as objects with stable ids
  const [subCategories, setSubCategories] = useState([
    { id: uid(), value: "" },
  ]);
  const [loading, setLoading] = useState(false);

  const setCategories = useOutletContext().setCategories;
  const ImageFileInputRef = useRef();
  const BannerFileInputRef = useRef();

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (type === "image") setImageFile(file);
      else setBannerFile(file);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops Image Couldn’t Select...",
        text: "Something went wrong!",
      });
    }
  };

  // ---------- dynamic inputs ----------
  const addField = () =>
    setSubCategories((prev) => [...prev, { id: uid(), value: "" }]);

  const removeField = (id) =>
    setSubCategories((prev) => prev.filter((f) => f.id !== id));

  const updateField = (id, newVal) =>
    setSubCategories((prev) =>
      prev.map((f) => (f.id === id ? { ...f, value: newVal } : f))
    );
  // -----------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile || !bannerFile || !name) {
      Swal.fire({ icon: "error", title: "Missing File or Name" });
      return;
    }

    const cleanSubs = subCategories.map((s) => s.value.trim()).filter(Boolean);

    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("bannerImage", bannerFile);
    formData.append("name", name);
    // send as JSON array (or use formData.append('subCategory[]', v) in a loop)
    formData.append("subCategories", JSON.stringify(cleanSubs));

    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/addCategory`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      Swal.fire({ icon: "success", title: "Uploaded Successfully" });

      setImageFile(null);
      setBannerFile(null);
      setName("");
      setSubCategories([{ id: uid(), value: "" }]); // reset dynamic fields
      ImageFileInputRef.current.value = null;
      BannerFileInputRef.current.value = null;
      setCategories(res.data?.data);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error uploading",
        text: err?.response?.data?.message || err?.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    document.getElementById("my_modal_3").checked = false;
    ImageFileInputRef.current.value = null;
    BannerFileInputRef.current.value = null;
    setBannerFile(null);
    setImageFile(null);
    setSubCategories([{ id: uid(), value: "" }]);
    setName("");
  };

  return (
    <div>
      <input type="checkbox" id="my_modal_3" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <div
            onClick={handleClose}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </div>

          <section className="space-y-4">
            <div className="space-y-2">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-2 font-semibold border-gray-300 p-2 w-full rounded-lg"
                placeholder="Enter Category Name"
              />

              {/* Dynamic sub-category inputs */}
              <div className="space-y-2">
                {subCategories.map((sc, idx) => (
                  <div key={sc.id} className="flex gap-2">
                    <input
                      type="text"
                      value={sc.value}
                      onChange={(e) => updateField(sc.id, e.target.value)}
                      placeholder={`Sub-category ${idx + 1}`}
                      className="border-2 font-semibold border-gray-300 p-2 w-full rounded-lg"
                    />
                    {subCategories.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeField(sc.id)}
                        className="btn btn-error"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addField}
                  className="btn btn-success px-3"
                >
                  Add
                </button>
              </div>

              <div className="flex items-center gap-2 border-2 border-[#2a337b] p-2 rounded-lg cursor-pointer">
                <p className="font-semibold">Category Image :</p>
                <input
                  type="file"
                  ref={ImageFileInputRef}
                  onChange={(e) => handleFileChange(e, "image")}
                  accept="image/*"
                  className="border-1 border-gray-200"
                />
              </div>

              <div className="flex items-center gap-2 border-2 border-[#2a337b] p-2 rounded-lg cursor-pointer">
                <p className="font-semibold">Banner Image :</p>
                <input
                  type="file"
                  ref={BannerFileInputRef}
                  onChange={(e) => handleFileChange(e, "bannerImage")}
                  accept="image/*"
                  className="border-1 border-gray-200"
                />
              </div>
            </div>

            {/* Fixed: disable condition used a non-existent `File` variable */}
            <button
              disabled={!name || !imageFile || !bannerFile || loading}
              onClick={handleSubmit}
              className="btn btn-secondary"
            >
              Upload{" "}
              {loading && (
                <span className="loading loading-spinner loading-sm"></span>
              )}
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

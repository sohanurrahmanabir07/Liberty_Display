// CategoryUpdate.jsx
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router";
import Swal from "sweetalert2";

// Stable ID helper
const uid = () => crypto?.randomUUID?.() || String(Date.now() + Math.random());

// Normalize any incoming subcategory shape -> [{id, value}]
const toEditableSubs = (raw) => {
  if (!raw) return [{ id: uid(), value: "" }];

  // If backend returns array of strings/objects or a comma-separated string, handle all
  if (Array.isArray(raw)) {
    const list = raw.map((v) => {
      // string or object with .value or .name
      if (typeof v === "string") return v;
      if (v && typeof v === "object") return v.value ?? v.name ?? "";
      return "";
    });
    return list.length
      ? list.map((v) => ({ id: uid(), value: String(v ?? "") }))
      : [{ id: uid(), value: "" }];
  }

  if (typeof raw === "string") {
    const parts = raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    return parts.length
      ? parts.map((v) => ({ id: uid(), value: v }))
      : [{ id: uid(), value: "" }];
  }

  return [{ id: uid(), value: "" }];
};

export const UpdateCategory = ({ item }) => {
  const [imageFile, setImageFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);
  const [name, setName] = useState("");

  // Previews (existing or newly selected)
  const [imagePreview, setImagePreview] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);

  // 🔹 Dynamic sub-categories
  const [subCategories, setSubCategories] = useState([
    { id: uid(), value: "" },
  ]);

  const [loading, setLoading] = useState(false);
  const { setCategories } = useOutletContext();
  const ImageFileInputRef = useRef();
  const BannerFileInputRef = useRef();

  const handleFileChange = (e, type) => {
    const file = e.target.files?.[0];
    if (!file) {
      Swal.fire({
        icon: "error",
        title: "Oops Image Couldn’t Select...",
        text: "Something went wrong!",
      });
      return;
    }
    const path = URL.createObjectURL(file);
    if (type === "image") {
      setImageFile(file);
      setImagePreview(path);
    } else {
      setBannerFile(file);
      setBannerPreview(path);
    }
  };

  // 🔹 Add/Remove/Update sub-category fields
  const addField = () =>
    setSubCategories((prev) => [...prev, { id: uid(), value: "" }]);
  const removeField = (id) =>
    setSubCategories((prev) => prev.filter((f) => f.id !== id));
  const updateField = (id, newVal) =>
    setSubCategories((prev) =>
      prev.map((f) => (f.id === id ? { ...f, value: newVal } : f))
    );

  useEffect(() => {
    if (!item) return;

    setName(item.name || "");

    // image/banner can be string or array
    const img = Array.isArray(item.imageUrl)
      ? item.imageUrl[0]
      : item.imageUrl ?? null;
    const banner = Array.isArray(item.bannerImgUrl)
      ? item.bannerImgUrl[0]
      : item.bannerImgUrl ?? null;

    setImagePreview(img || null);
    setBannerPreview(banner || null);
    setImageFile(null);
    setBannerFile(null);

    // 🔹 Convert existing subs to editable shape
    const rawSubs = item.subCategory ?? item.subCategories ?? [];
    setSubCategories(toEditableSubs(rawSubs));
  }, [item]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      Swal.fire({ icon: "error", title: "Missing Name" });
      return;
    }

    const cleanSubs = subCategories.map((s) => s.value.trim()).filter(Boolean);

    const formData = new FormData();
    if (imageFile) formData.append("image", imageFile);
    if (bannerFile) formData.append("bannerImage", bannerFile);
    formData.append("name", name);
    // 🔹 Send subCategory array (adjust key to what your API expects)
    formData.append("subCategories", JSON.stringify(cleanSubs));
    // Alternatively:
    // cleanSubs.forEach(v => formData.append('subCategory[]', v));

    setLoading(true);

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/updateCategory/${item._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.status === 200) {
        Swal.fire({ icon: "success", title: "Updated Successfully" });
        setCategories(res.data.data);
        handleModalClose();
      } else {
        Swal.fire({ icon: "error", title: "Error updating" });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error updating",
        text: err?.response?.data?.message || err?.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setImageFile(null);
    setBannerFile(null);
    setName("");
    ImageFileInputRef.current && (ImageFileInputRef.current.value = null);
    BannerFileInputRef.current && (BannerFileInputRef.current.value = null);
    // Reset subs to current item's values for a fresh reopen
    const rawSubs = item?.subCategory ?? item?.subCategories ?? [];
    setSubCategories(toEditableSubs(rawSubs));
  };

  if (!item) return null;

  return (
    <div>
      <input
        type="checkbox"
        id={`updateCategory-${item.name}`}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor={`updateCategory-${item.name}`}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={handleModalClose}
          >
            ✕
          </label>

          <section className="space-y-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-2 border-gray-300 rounded-lg p-2 w-full"
              placeholder="Enter Category Name"
            />

            {/* Previews */}
            <section className="flex gap-10">
              <div>
                <p className="font-semibold">Category Image</p>
                {imagePreview && (
                  <div className="w-32 h-32 border rounded overflow-hidden">
                    <img
                      loading="lazy"
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
              <div>
                <p className="font-semibold">Category Banner</p>
                {bannerPreview && (
                  <div className="w-32 h-32 border rounded overflow-hidden">
                    <img
                      loading="lazy"
                      src={bannerPreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </section>

            {/* Dynamic sub-categories */}
            <div className="space-y-2">
              <p className="font-semibold">Sub-categories</p>
              {subCategories.map((sc, idx) => (
                <div key={sc.id} className="flex gap-2">
                  <input
                    type="text"
                    value={sc.value}
                    onChange={(e) => updateField(sc.id, e.target.value)}
                    placeholder={`Sub-category ${idx + 1}`}
                    className="border-2 font-semibold border-gray-300 p-2 w-full rounded-lg"
                  />

                  <button
                    type="button"
                    onClick={() => {
                      idx == 0 ? updateField(sc.id, "") : removeField(sc.id);
                    }}
                    className="btn btn-error  btn-soft rounded-sm"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addField}
                className="btn btn-primary btn-soft rounded-sm px-3"
              >
                Add
              </button>
            </div>

            {/* File pickers */}
            <section className="space-y-4">
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
            </section>

            <button
              onClick={handleSubmit}
              className="btn btn-secondary w-full"
              disabled={loading || !name}
            >
              Update{" "}
              {loading && (
                <span className="loading loading-spinner loading-sm ml-2"></span>
              )}
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

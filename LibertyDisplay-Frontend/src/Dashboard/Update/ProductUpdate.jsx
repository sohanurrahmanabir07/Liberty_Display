import axios from "axios";
import React, { useRef, useState, useEffect, useMemo } from "react";
import { useOutletContext } from "react-router";
import Swal from "sweetalert2";
import { capitalizeWords } from "../../Functions/functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faXmark } from "@fortawesome/free-solid-svg-icons";

export const ProductUpdate = ({ item }) => {
  const [images, setImages] = useState([]);
  const [pdfs, setPdfs] = useState([{ key: "", file: null }]);
  const [existingPdfs, setExistingPdfs] = useState([]); // [{ key, url }]
  const [name, setName] = useState("");
  const [model, setModel] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [parameter, setParameter] = useState([{ key: "", value: "" }]);
  const [packingData, setPackingData] = useState([{ key: "", value: "" }]);
  const [loading, setLoading] = useState(false);
  const [subCategory, setSubCategory] = useState("");
  const { setCategories, categories, products, setProducts } =
    useOutletContext();
  const fileInputRef = useRef();
  const pdfInputRefs = useRef([]);
  const [videos, setVideos] = useState([]); // new video files to upload
  const [existingVideos, setExistingVideos] = useState([]); // [{ url }]
  const videoInputRef = useRef();

  useEffect(() => {
    if (item && item._id) {
      setImages(item.imageUrl || []);
      setName(item.name || "");
      setModel(item.model || "");
      setDescription(item.description || "");
      setCategory(item.category || "");
      setSubCategory(item.subCategory || "");
      // Parameter format: [{ key: '', value: '' }]
      const formattedParameter =
        Array.isArray(item.parameter) && item.parameter.length > 0
          ? item.parameter.map((obj) => {
              const key = Object.keys(obj)[0];
              return { key, value: obj[key] };
            })
          : [{ key: "", value: "" }];
      setParameter(formattedParameter);

      // PackingData format: [{ key: '', value: '' }]
      const formattedPackingData =
        Array.isArray(item.packingData) && item.packingData.length > 0
          ? item.packingData.map((obj) => {
              const key = Object.keys(obj)[0];
              return { key, value: obj[key] };
            })
          : [{ key: "", value: "" }];
      setPackingData(formattedPackingData);

      // PDFs from db: { dataSheet: "url", userManual: "url" }
      const dbPdfs =
        item.pdf && typeof item.pdf === "object" && !Array.isArray(item.pdf)
          ? Object.entries(item.pdf).map(([key, url]) => ({ key, url }))
          : [];
      setExistingPdfs(dbPdfs.length ? dbPdfs : []);
      setPdfs([{ key: "", file: null }]);
      setVideos([]); // new files
      setExistingVideos(
        item.videoUrl && Array.isArray(item.videoUrl)
          ? item.videoUrl.map((url) => ({ url }))
          : []
      );
      if (videoInputRef.current) videoInputRef.current.value = null;
    }
  }, [item]);

  const allSubCategory = useMemo(() => {
    return (
      (categories &&
        categories.filter((item) => item.name == category)[0]?.subCategories) ||
      []
    );
  }, [category, categories]);

  // ----------- Images -----------
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  };
  const removeImage = (index) =>
    setImages((prev) => prev.filter((_, i) => i !== index));

  //---------Videos-------------

  const handleVideoChange = (e) => {
    const files = Array.from(e.target.files);
    setVideos((prev) => [...prev, ...files]);
  };
  const removeVideo = (index) =>
    setVideos((prev) => prev.filter((_, i) => i !== index));
  const removeExistingVideo = (idx) => {
    Swal.fire({
      title: "Do You Want to Delete?!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setExistingVideos((prev) => prev.filter((_, i) => i !== idx));
      }
    });
  };

  // ----------- Parameter -----------
  const handleParameter = (index, field, value) => {
    const newParameter = [...parameter];
    newParameter[index][field] = value;
    setParameter(newParameter);
  };
  const addParameterField = () =>
    setParameter((prev) => [...prev, { key: "", value: "" }]);
  const removeParameterField = (index) =>
    setParameter((prev) => prev.filter((_, i) => i !== index));

  // ----------- Packing Data -----------
  const handlePackingData = (index, field, value) => {
    const newPackingData = [...packingData];
    newPackingData[index][field] = value;
    setPackingData(newPackingData);
  };
  const addPackingDataField = () =>
    setPackingData((prev) => [...prev, { key: "", value: "" }]);
  const removePackingDataField = (index) =>
    setPackingData((prev) => prev.filter((_, i) => i !== index));

  // ----------- PDFs -----------
  const handlePdfFieldChange = (idx, field, value) => {
    const updated = [...pdfs];
    updated[idx][field] = value;
    setPdfs(updated);
  };
  const addPdfField = () =>
    setPdfs((prev) => [...prev, { key: "", file: null }]);
  const removePdfField = (idx) =>
    setPdfs((prev) => prev.filter((_, i) => i !== idx));

  // Remove an existing PDF (will not be sent to backend)
  const removeExistingPdf = (key) =>
    setExistingPdfs((prev) => prev.filter((pdf) => pdf.key !== key));

  const checkInput = () => {
    for (let index = 0; index < pdfInputRefs.current.length; index++) {
      if (pdfInputRefs.current[index].value) {
        return false;
      }
      return true;
    }
  };

  // ----------- Submit -----------
  const handleSubmit = async (e) => {
    if (
      !images.length ||
      !name ||
      !model ||
      !description ||
      !category
      // || (!existingPdfs.length && checkInput())
    ) {
      Swal.fire({ icon: "error", title: "Missing required fields" });
      return;
    }
    const formData = new FormData();

    // Images: distinguish existing (URL string) vs new (File object)
    images.forEach((img) => {
      if (typeof img === "string") {
        formData.append("existingImages", img);
      } else {
        formData.append("images", img);
      }
    });

    // --- VIDEOS ---
    videos.forEach((video) => formData.append("videos", video)); // new files
    if (existingVideos.length) {
      // Only include URLs for videos that should be kept
      formData.append(
        "existingVideos",
        JSON.stringify(existingVideos.map((v) => v.url))
      );
    }

    // PDFs: new uploads
    pdfs.forEach((pdf) => {
      if (pdf.key && pdf.file) {
        formData.append(`pdf_${pdf.key}`, pdf.file);
      }
    });

    // PDFs: existing (to keep)
    if (existingPdfs.length) {
      formData.append("existingPdfs", JSON.stringify(existingPdfs));
    }

    // Parameter and PackingData
    const transformedParameter = parameter
      .filter(({ key, value }) => key && value)
      .map(({ key, value }) => ({ [key]: value }));

    const transformedPackingData = packingData
      .filter(({ key, value }) => key && value)
      .map(({ key, value }) => ({ [key]: value }));

    // PDFs for info
    const pdfInfo = [
      ...existingPdfs.map((pdf) => ({ [pdf.key]: pdf.url })),
      ...pdfs.filter((pdf) => pdf.key).map((pdf) => ({ [pdf.key]: "" })),
    ];

    const info = {
      name,
      model,
      description,
      category,
      subCategory,
      parameter: transformedParameter,
      packingData: transformedPackingData,
      pdf: Object.assign({}, ...pdfInfo),
    };

    formData.append("info", JSON.stringify(info));
    setLoading(true);

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/updateProduct/${item._id}`,
        formData
      );
      if (res.status === 200) {
        setProducts(res.data.data);
        nullifyPdfInput();
        if (videoInputRef.current) videoInputRef.current.value = null;
        document.getElementById(`ProductUpdate-${item?._id}`).checked = false;
        Swal.fire({ icon: "success", title: "Updated Successfully" });
      } else {
        Swal.fire({ icon: "failed", title: res.data.message });
      }
    } catch (err) {
      console.log("error", err);

      Swal.fire({
        icon: "error",
        title: "Error updating",
        text: err.response.data.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const nullifyPdfInput = () => {
    (fileInputRef.current.value = null),
      pdfInputRefs.current.forEach((ref) => {
        if (ref) {
          ref.value = null;
        }
      });
  };

  const hanldeClose = () => {
    setImages(item.imageUrl || []);
    setName(item.name || "");
    setModel(item.model || "");
    setDescription(item.description || "");
    setCategory(item.category || "");

    // Restore parameter and packingData
    const formattedParameter =
      Array.isArray(item.parameter) && item.parameter.length > 0
        ? item.parameter.map((obj) => {
            const key = Object.keys(obj)[0];
            return { key, value: obj[key] };
          })
        : [{ key: "", value: "" }];
    setParameter(formattedParameter);

    const formattedPackingData =
      Array.isArray(item.packingData) && item.packingData.length > 0
        ? item.packingData.map((obj) => {
            const key = Object.keys(obj)[0];
            return { key, value: obj[key] };
          })
        : [{ key: "", value: "" }];
    setPackingData(formattedPackingData);

    // Restore existing PDFs
    const dbPdfs =
      item.pdf && typeof item.pdf === "object" && !Array.isArray(item.pdf)
        ? Object.entries(item.pdf).map(([key, url]) => ({ key, url }))
        : [];
    setExistingPdfs(dbPdfs.length ? dbPdfs : []);
    setPdfs([{ key: "", file: null }]);
    setExistingVideos(item?.videoUrl || []);
    nullifyPdfInput();
    if (videoInputRef.current) videoInputRef.current.value = null;
    document.getElementById(`ProductUpdate-${item?._id}`).checked = false;
  };

  return (
    <div>
      <input
        type="checkbox"
        id={`ProductUpdate-${item?._id}`}
        className="modal-toggle"
      />
      <div className="modal" role="dialog">
        <div className="modal-box md:max-w-[700px] md:h-auto overflow-y-auto  relative">
          <div
            className="modal-action absolute -top-6 right-4 cursor-pointer"
            onClick={hanldeClose}
          >
            <FontAwesomeIcon icon={faXmark} size="lg" />
          </div>
          <section className="space-y-4">
            <input
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="border p-2 w-full"
              placeholder="Model Name"
            />
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 w-full"
              placeholder="Product Name"
            />
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-2 w-full"
              placeholder="Description"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border p-2 w-full"
            >
              <option disabled value="">
                Select Category
              </option>
              {categories &&
                categories.map((cat, i) => (
                  <option key={i} value={cat.name}>
                    {capitalizeWords(cat.name)}
                  </option>
                ))}
            </select>

            <select
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              className="border-2 border-gray-300 p-2 w-full"
            >
              <option disabled value="">
                Select Sub-Category
              </option>
              {allSubCategory &&
                allSubCategory.map((item, index) => (
                  <option key={index} value={item}>
                    {capitalizeWords(item)}
                  </option>
                ))}
            </select>

            {/* Parameter */}
            <div className="space-y-2">
              <p>
                Add <span className="font-semibold">Parameter</span> Info:
              </p>
              {parameter.map((spec, index) => (
                <div key={index} className="flex space-x-3 items-center">
                  <input
                    type="text"
                    value={spec.key}
                    onChange={(e) =>
                      handleParameter(index, "key", e.target.value)
                    }
                    className="border-2 w-1/2 border-gray-300 p-2"
                    placeholder="Spec name"
                  />
                  <input
                    type="text"
                    value={spec.value}
                    onChange={(e) =>
                      handleParameter(index, "value", e.target.value)
                    }
                    className="border-2 w-1/2 border-gray-300 p-2"
                    placeholder="Spec value"
                  />
                  <button
                    type="button"
                    className="btn btn-sm btn-primary"
                    onClick={addParameterField}
                  >
                    +
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-error"
                    onClick={() => removeParameterField(index)}
                  >
                    −
                  </button>
                </div>
              ))}
            </div>

            {/* Packing Data */}
            {/* <div className='space-y-2'>
                            <p>Add <span className='font-semibold'>Packing Data</span> Info:</p>
                            {packingData.map((spec, index) => (
                                <div key={index} className='flex space-x-3 items-center'>
                                    <input
                                        type="text"
                                        value={spec.key}
                                        onChange={(e) => handlePackingData(index, 'key', e.target.value)}
                                        className='border-2 w-1/2 border-gray-300 p-2'
                                        placeholder='Packing data name'
                                    />
                                    <input
                                        type="text"
                                        value={spec.value}
                                        onChange={(e) => handlePackingData(index, 'value', e.target.value)}
                                        className='border-2 w-1/2 border-gray-300 p-2'
                                        placeholder='Packing data value'
                                    />
                                    <button type='button' className='btn btn-sm btn-primary' onClick={addPackingDataField}>+</button>
                                    <button type='button' className='btn btn-sm btn-error' onClick={() => removePackingDataField(index)}>−</button>
                                </div>
                            ))}
                        </div> */}

            {/* Image Previews */}
            <div className="flex flex-wrap gap-2">
              {images.map((img, i) => (
                <div key={i} className="relative">
                  <img
                    loading="lazy"
                    src={
                      typeof img === "string" ? img : URL.createObjectURL(img)
                    }
                    className="w-24 h-24 object-cover rounded-md shadow"
                  />
                  <button
                    type="button"
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                    onClick={() => removeImage(i)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <span>Image</span>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="border p-2 w-full text-sm  font-light"
              accept="image/*"
              multiple
            />

            {/*  Existing Videos */}

            {existingVideos.length > 0 && (
              <div>
                <p className="font-semibold">Existing Videos:</p>
                <div className="flex gap-2 flex-wrap">
                  {existingVideos.map((vid, idx) => (
                    <div key={vid.url || idx} className="relative">
                      <video
                        src={vid.url}
                        controls
                        className="rounded-md w-full"
                      />
                      <button
                        type="button"
                        className="absolute cursor-pointer hover:bg-red-700 top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center"
                        title="Remove Video"
                        onClick={() => removeExistingVideo(idx)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Video Upload  */}

            <span>Upload Videos</span>
            <input
              type="file"
              ref={videoInputRef}
              onChange={handleVideoChange}
              className="border p-2 w-full text-sm font-light"
              accept="video/*"
              multiple
            />
            {videos.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {videos.map((file, i) => (
                  <div key={i}>
                    <video
                      src={URL.createObjectURL(file)}
                      controls
                      className="rounded-md w-full"
                    />
                    <button
                      type="button"
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center"
                      title="Remove"
                      onClick={() => removeVideo(i)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Existing PDFs */}
            {existingPdfs.length > 0 && (
              <div>
                <p className="font-semibold">Existing PDFs:</p>
                {existingPdfs.map((pdf, idx) => (
                  <div className="flex items-center gap-2 mb-1" key={pdf.key}>
                    <div
                      className="px-4 py-2 rounded-md text-white bg-red-400 cursor-pointer"
                      onClick={() => window.open(pdf.url, "_blank")}
                    >
                      <FontAwesomeIcon icon={faFilePdf} size="sm" />
                      <span className="ml-2">{pdf.key}</span>
                    </div>
                    <button
                      type="button"
                      className="hover:text-red-500 text-white rounded-full p-1"
                      onClick={() => removeExistingPdf(pdf.key)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Dynamic PDF upload fields */}
            <div>
              <p className="font-semibold mt-2 mb-1">Add/Replace PDFs:</p>
              {pdfs.map((pdf, idx) => (
                <div key={idx} className="flex items-center gap-2 mb-1">
                  <input
                    type="text"
                    placeholder="PDF Key (e.g. dataSheet)"
                    value={pdf.key}
                    onChange={(e) =>
                      handlePdfFieldChange(idx, "key", e.target.value)
                    }
                    className="border-2 w-[170px] border-gray-300 p-2"
                  />
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) =>
                      handlePdfFieldChange(idx, "file", e.target.files[0])
                    }
                    ref={(ref) => (pdfInputRefs.current[idx] = ref)}
                    className="border-2 border-gray-300 p-2"
                  />
                  <button
                    type="button"
                    className="btn btn-sm btn-primary"
                    onClick={addPdfField}
                  >
                    +
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-error"
                    onClick={() => removePdfField(idx)}
                  >
                    -
                  </button>
                </div>
              ))}
            </div>

            <button onClick={handleSubmit} className="btn btn-secondary w-full">
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

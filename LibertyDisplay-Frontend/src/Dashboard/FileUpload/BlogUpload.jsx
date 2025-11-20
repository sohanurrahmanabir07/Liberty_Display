import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useOutletContext } from 'react-router';
import Swal from 'sweetalert2';

export const BlogUpload = () => {
    const [imageFile, setImageFile] = useState(null)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [loading, setLoading] = useState(false)

    const ImageFileInputRef = useRef();
    const { blogs, setBlogs } = useOutletContext()
    const handleFileChange = (e, v) => {
        const file = e.target.files[0];
        if (file) {

            const path = URL.createObjectURL(file)
            setImageFile(file)
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops Image Couldnt Select...",
                text: "Something went wrong!",

            });
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();



        if (!imageFile || !title || !description) {
            Swal.fire({
                icon: "error",
                title: "Missing File or Name",
            });
            return;
        }

        const formData = new FormData();
        formData.append('images', imageFile);
        formData.append('Info', JSON.stringify({
            title,
            description
        }))

        // Log form data to debug
        setLoading(true);

        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/addBlog`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            if (res.status == 200) {

                Swal.fire({
                    icon: "success",
                    title: "Uploaded Successfully",
                });
                setBlogs(res.data.data)
                setImageFile(null);

                setTitle('');
                setDescription('')
                ImageFileInputRef.current.value = null
                handleClose()
            }



            // reset file input

        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Error uploading",
                text: err.response.data.message|| err.response.data.message|| err.message
            });
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        document.getElementById('BlogUpload').checked = false
        ImageFileInputRef.current.value = null
        setImageFile(null)
        setTitle('')
        setDescription('')
        setLoading(false)



    }


    return (
        <div>
            <input type="checkbox" id="BlogUpload" className="modal-toggle" />

            {/* Modal Box */}
            <div className="modal">
                <div className="modal-box md:max-w-[700px] md:h-auto overflow-y-auto  relative">
                    {/* Close Button */}
                    <div onClick={handleClose} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                    </div>

                    <section className='space-y-4 '>
                        <div className='space-y-2'>

                            <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className='border-2 font-semibold border-gray-300 p-2  w-full rounded-lg' placeholder='Enter Blog Title *' id="" />

                            <textarea
                                placeholder="Description*"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                name='description'
                                rows="5"
                                className="w-full font-semibold p-2 border h-[250px] border-gray-300 rounded"
                                required
                            ></textarea>

                            <div className='flex w-full space-x-2 border-2 border-gray-300 p-2 rounded-lg cursor-pointer'>
                                <p className='font-semibold'>Blog Image : </p>
                                <input type="file" ref={ImageFileInputRef} id="img" name="img" onChange={(e) => handleFileChange(e)} className='borer-1  border-gray-200' accept="image/*" />
                            </div>
                        </div>

                        <button disabled={(!title || !imageFile || loading)} onClick={handleSubmit} className='btn btn-secondary'>Upload  {loading && <span className="loading loading-spinner loading-sm"></span>}  </button>

                    </section>




                </div>
            </div>
        </div>
    );
};

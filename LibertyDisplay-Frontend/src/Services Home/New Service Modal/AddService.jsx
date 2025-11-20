import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useOutletContext } from 'react-router';
import Swal from 'sweetalert2';
import { capitalizeWords } from '../../Functions/functions';

export const AddService = () => {
    const [serviceData, setServiceData] = useState({
        'serviceName': '',
        'description': '',
        'svgCode': ''
    })
    const [loading, setLoading] = useState(false);

    const { setCategories, categories, products, setProducts,setServices } = useOutletContext();

    const hanldeChange = (e) => {
        setServiceData({ ...serviceData, [e.target.name]: e.target.value })


    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!serviceData.serviceName || !serviceData.description || !serviceData.svgCode) {
            Swal.fire({ icon: "error", title: "Missing required fields" });
            return;
        }


        setLoading(true);

        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/addService`, serviceData);

            if (res.status === 200) {

                Swal.fire({ icon: "success", title: "Uploaded Successfully" });

                setServices(res.data.data)
            }

            // Reset



        } catch (err) {
            Swal.fire({ icon: "error", title: "Error uploading", text: err.response.data.message|| err.message });
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setServiceData({
            'serviceName': '',
            'description': '',
            'svgCode': ''
        })
        document.getElementById('AddService').checked=false
    }

    return (
        <div>
            <input type="checkbox" id="AddService" className="modal-toggle" />
            <div className="modal items-center justify-center" >
                <div className="modal-box relative">
                    <div onClick={handleClose} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</div>

                    

                    <section className='space-y-4'>
                        <div className='space-y-4'>
                            <input type="text" value={serviceData.serviceName} name='serviceName' onChange={hanldeChange} className='border-2 border-gray-300 p-2 w-full' placeholder='Service Name*' />
                            <textarea type="text" value={serviceData.description} name='description' onChange={hanldeChange} className='border-2 border-gray-300 p-2 w-full' placeholder='Service Description within 50 Words*'></textarea>
                            <textarea type="text" name='svgCode' value={serviceData.svgCode} onChange={hanldeChange} className='border-2 border-gray-300 p-2 w-full' placeholder='SVG Code only *'></textarea>


                        </div>
                        <button
                            disabled={(!serviceData.serviceName || !serviceData.description || !serviceData.svgCode || loading)}
                            onClick={handleSubmit}
                            className='btn btn-secondary w-full'>
                            Upload {loading && <span className="loading loading-spinner loading-sm"></span>}
                        </button>
                    </section>
                </div>
            </div>
        </div>
    );
};

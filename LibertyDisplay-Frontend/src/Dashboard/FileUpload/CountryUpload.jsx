import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { addLogo } from '../../Redux/airwheel'
import { useOutletContext } from 'react-router-dom'



export const CountryUpload = () => {
    const updatelogo = useRef(null)
    const PhotoInputRef = useRef();

    const admin = useSelector((state) => state.AirWheel.users)
    const [imagePath, setImagePath] = useState(null)
    const [File, setFile] = useState(null)
    const [Loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const { setCountry } = useOutletContext()
    const [data, setData] = useState({
        name: '',
        region:'',
        subDomain: '',
        imageUrl: ''
    })


    const handleClick = (v) => {

        if (v == 'photo') {
            PhotoInputRef.current.click()
        } else {
            VideoInputRef.current.click()
        }

    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {

            const path = URL.createObjectURL(file)
            setImagePath(path)
            setFile(file)

        } else {
            Swal.fire({
                icon: "error",
                title: "Oops Image Couldnt Select...",
                text: "Something went wrong!",

            });
        }
    };

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        if (admin) {
            let formData = new FormData()
            if (File && data.name && data.subDomain) {


                formData.append('images', File)
                formData.append('info', JSON.stringify(data))

    
                
                setLoading(true)
                axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/addCountry`, formData)
                    .then((res) => {

                        if (res.status == 200) {

                            Swal.fire({
                                icon: "success",
                                title: 'Country Successfully Added',
                            });



                            setCountry(res.data.data)






                        }
                        setImagePath(null)
                        setFile(null)
                        setData({
                            name: '',
                            region:'',
                            subDomain: '',
                            imageUrl: ''
                        })
                        updatelogo.current.value = null




                    })
                    .catch((err) => {
                        Swal.fire({
                            icon: "error",
                            title: err.response.data.message || err.message,
                            text: "Something went wrong!",

                        });
                    })
                    .finally(() => {
                        setLoading(false)  // move this here
                    })



            } else {
                Swal.fire({
                    icon: "error",
                    title: ' No',


                });
            }

        }

    }


    const handleClose = () => {
        setFile(null)
        setImagePath(null)
        setData({
            name: '',
            region: '',
            subDomain: '',
            imageUrl: ''
        })
        document.getElementById('uploadCountry').checked = false

    }






    return (
        <div>
            <input type="checkbox" id="uploadCountry" className="modal-toggle" />
            <div className="modal " role="dialog">
                <div className="modal-box bg-white relative space-y-4 z-20  md:max-w-[40%]  max-w-[90%] ">
                    <div className="modal-action p-2 absolute right-2 -top-7" onClick={handleClose}>
                        {/* <label htmlFor="uploadLogo" ><FontAwesomeIcon icon={faXmark} size='lg' className='cursor-pointer' ></FontAwesomeIcon></label> */}
                        <FontAwesomeIcon icon={faXmark} size='xl' className='cursor-pointer' ></FontAwesomeIcon>
                    </div>
                    <section className='flex flex-col space-x-3  items-center space-y-5 '>
                        <p className='text-3xl text-center'>Upload Country </p>
                        <div className='border-1  p-2 text-lg text-gray-500 rounded-lg  '>
                            <input type="text" className='focus:outline-none  w-full ' placeholder='Enter Country Name' onChange={handleChange} value={data.name} name="name" />
                        </div>
                        <select name="region"  value={data.region} onChange={(e)=>setData({...data,['region']:e.target.value})} id="">
                            <option disabled value="">Choose Region</option>
                            <option value="america">America</option>
                            <option value="europe">Europe</option>
                            <option value="africa">Africa</option>
                            <option value="oceania">Oceania</option>
                            <option value="asia">Asia</option>
                        </select>
                        <div className='border-1  p-2 text-lg text-gray-500 rounded-lg  '>
                            <input type="text" className='focus:outline-none' placeholder='Enter Sub Domain' onChange={handleChange} value={data.subDomain} name="subDomain" />
                        </div>
                        <div className='border-1  p-2 text-lg text-gray-500 rounded-lg  '>
                            <input type="file" accept='image/*' onChange={handleFileChange} ref={updatelogo} name="" id="" />
                        </div>

                    </section>

                    <div className='text-center'>
                        <button disabled={!File || !data.name || !data.subDomain || Loading} onClick={handleSubmit} className='btn btn-secondary btn-dash'>{Loading ? (<p>Uploading...</p>) : (<p>Upload</p>)}</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

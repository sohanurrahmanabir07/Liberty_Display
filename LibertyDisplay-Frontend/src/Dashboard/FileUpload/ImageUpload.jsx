import { faCalendar, faCircleXmark, faImage, faSmile } from "@fortawesome/free-regular-svg-icons"
import { faVideo } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import { useRef, useState } from "react"
import { useSelector } from "react-redux"
import Swal from "sweetalert2"
import React from 'react'




export const ImageUpload = () => {
    const PhotoInputRef = useRef();

    const [imagePath, setImagePath] = useState(null)
    const [File, setFile] = useState(null)
    const [Loading, setLoading] = useState(false)
    const user = useSelector((state) => state.LibertyTools.users)
    const [newPost, setNewPost] = useState({
        name:'',
        imageUrl: '',
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


    const handleSubmit = (e) => {
        e.preventDefault()
       
        let formData = new FormData()
        if (File) {


            if (newPost.info != '') {
                const data = { ...newPost }
                data.info = ''
                setNewPost(data)
                formData.append('image', File)
                formData.append('data', JSON.stringify(data))


            }


        } else {
           
            formData = newPost

            
        }

      
           
            setLoading(true)
            axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/newsPost`, formData, {
                withCredentials: true
            })
                .then((res) => {

                    if (res.status == 201) {
                        Swal.fire({
                            icon: "success",
                            title: 'You have Posted Successfully',


                        });

                        const data = {
                            friends: user.friends,
                            post: res.data
                        }



                        socket.emit('UpdateFeed', data)
     




                    }
                    setNewPost({
                        userID: user._id,
                        type: 'status',
                        info: '',
                        caption: '',
                        imageUrl: '',
                        shareMap: {},
                        TimeStamp: new Date()
                    })
                    setFile(null)
                    setImagePath(null)




                })
                .catch((err) => {
                    Swal.fire({
                        icon: "error",
                        title: err.response.data.message|| err.message,
                        text: "Something went wrong!",

                    });
                })
                .finally(() => {
                    setLoading(false)  // move this here
                })
       








    }


    return (
        <div className="space-y-2 p-2 md:p-5  dark:text-gray-300 border-1 border-slate-500 rounded-md w-90/100 max-sm:w-full">

            <section>
                {
                    imagePath && (

                        <div className="w-[150px] relative">
                            <img loading="lazy" src={imagePath} className="rounded-lg" alt="" />

                            <div className="absolute -top-4 -right-2 cursor-pointer" onClick={() => { setImagePath(null); PhotoInputRef.current.value = null; setFile(null) }}>
                                <FontAwesomeIcon icon={faCircleXmark} className="text-orange-400" size="xs" ></FontAwesomeIcon>
                            </div>

                        </div>
                    )
                }


            </section>



            <section className="space-x-4 flex flex-wrap space-y-2">

  

                <div>
                    <input type="file" accept="image/*" ref={PhotoInputRef} onChange={handleFileChange} style={{ display: 'none' }} />
                    <button className="btn " type="button" onClick={() => handleClick('photo')} > <span><FontAwesomeIcon className="text-green-600" icon={faImage} size="md"></FontAwesomeIcon></span> Photo</button>
                </div>

            

            </section>

            {
                Loading ? (
                    <section className="text-center">
                        <span className="loading loading-dots w-[70px]"></span>
                    </section>

                ) :
                    ''
            }









        </div>
    )
}

import { useEffect } from "react"
import { Navigate, replace, useLocation, useNavigate } from "react-router-dom";

export const DescriptionModal = ({ description,index}) => {

     const location=useLocation()
     const navigate=useNavigate()

    return (
        <>
            <input type="checkbox" id={index} className="modal-toggle" />
            <div className="modal" role="dialog" id="my_modal_8">
                <div className="modal-box">
                    <p className="font-semibold text-3xl text-center">Description</p>
                    <br />
                    <div>

                        <p>
                            {description}
                        </p>
                    </div>


                    <div className="modal-action">
                        <div  onClick={()=>{  
                            
                           navigate(location.pathname,{replace:true})
                            
                            document.getElementById(index).checked=false   }} className="btn">Close</div>
                    </div>
                </div>
            </div>
        </>

    )
}

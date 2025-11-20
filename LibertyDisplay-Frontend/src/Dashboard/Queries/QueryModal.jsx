import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export const QueryModal = ({ description }) => {

    const handleClose = () => {

        document.getElementById('queryDetails').checked = false

    }
    return (
        <div>
            <input type="checkbox" id="queryDetails" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box relative space-y-4">
                    <div className="modal-action absolute right-4 -top-5" onClick={handleClose}>
                        {/* <label htmlFor="uploadLogo" ><FontAwesomeIcon icon={faXmark} size='lg' className='cursor-pointer' ></FontAwesomeIcon></label> */}
                        <FontAwesomeIcon icon={faXmark} size='lg' className='cursor-pointer' ></FontAwesomeIcon>
                    </div>


                    <section>
                        <p className='font-bold text-3xl text-center text-gray-700'>Clients Problem Description</p>
                    </section>
                    <section className='flex space-x-3 text-center p-4 border-2 border-gray-700 rounded-lg '>

                        {description ? (description) : ''}
                    </section>


                </div>
            </div>

        </div>
    )
}

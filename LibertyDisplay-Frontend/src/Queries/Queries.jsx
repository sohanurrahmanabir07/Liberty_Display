import React, { useEffect, useState } from 'react'
import { QueryModal } from './QueryModal'
import { useOutletContext } from 'react-router'

import {DateTime} from "../Date Time Formate/DateTime.jsx"
import { capitalizeWords } from '../Functions/functions'

export const Queries = () => {
    const { queries } = useOutletContext()
    const [description, setDescription] = useState(null)


    return (
        <div className=' w-full'>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            {
                                queries.length > 0 && Object.keys(queries[0]).map((item, index) => {
                                    if (item != '__v' && item != 'updatedAt' && item != '_id' && item != 'description') {


                                        return (
                                            <th key={index}>{
                                                item == 'createdAt' ?

                                                    ('Time')
                                                    :

                                                    capitalizeWords(item)


                                            }</th>
                                        )
                                    }

                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}

                        {
                            queries && queries.map((item, index) => {
                                return (
                                    <tr key={index} onClick={() => { setDescription(item.description); document.getElementById('queryDetails').checked = true }} className='hover:bg-blue-400 hover:text-white cursor-pointer transition-all duration-110 ease-in-out  ' >
                                        <th>{index + 1}</th>

                                        <td>{item.name}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.type}</td>
                                        <td>{item.email}</td>
                                        <td>

                                            {
                                                item.subject.length > 15 ?

                                                    <div className="tooltip" data-tip={item.subject}>
                                                        <p >{item.subject.slice(0,15)}...</p>
                                                    </div>

                                                    :


                                                    item.subject

                                            }


                                        </td>

                                        <td><DateTime item={item.createdAt} ></DateTime></td>

                                    </tr>
                                )
                            })
                        }



                    </tbody>
                </table>
            </div>

            <QueryModal description={description} ></QueryModal>


        </div>
    )
}

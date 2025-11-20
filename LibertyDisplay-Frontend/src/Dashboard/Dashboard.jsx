import React from 'react'
import { Sidebar } from './SideBar/Sidebar'
import { Outlet, useOutletContext } from 'react-router'

export const Dashboard = () => {

    const data=useOutletContext()
  return (
    <div className={`flex max-w-[1340px] mx-auto  `}>

        <Sidebar></Sidebar>
        <Outlet context={data} ></Outlet>
    </div>
  )
}

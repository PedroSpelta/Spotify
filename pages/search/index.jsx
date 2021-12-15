import React from 'react'
import SearchCenter from '../../components/SearchCenter'
import Sidebar from '../../components/Sidebar'

function index() {
  return (
    <div className="bg-[#121212] h-screen">
      <main className="flex">
        <Sidebar />
        <SearchCenter />
      </main>
    </div>
  )
}

export default index

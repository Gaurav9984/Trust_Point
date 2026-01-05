import React from 'react'
import Blog from '../components/Blog'
const Blogs = () => {
  return (
    <div className='bg-[#F9F0D3]'>
      {/* Hero Section */}
      <div className="w-full flex h-[170px] bg-[#111C2E] items-center justify-center">
        <h1 className="text-[#E5D7C9] text-5xl mt-15 md:text-6xl font-bold">POST AND BLOGS</h1>
      </div>

      <Blog />
    </div>
  )
}

export default Blogs
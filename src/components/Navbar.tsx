import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import './navbar.css'

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems =[
    {name : 'Home',path : '/'},
    {name : 'Books',path : '/books'},
    {name : 'Add Books',path : '/create-book'},
    {name : 'Borrowed Summary',path : '/borrow-summary'}
  ]
  return (
    <nav className="navbar_section fixed w-[100%] z-50 bg-neutral-900
     text-white shadow-md">
      <div className="container mx-auto p-4 
      flex items-center justify-between">
        {/* Logo */}
        <Link to='/' className="text-2xl font-bold">
          Book<span className="text-blue-600">Store</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8">
          
          {navItems.map((item,index)=>(
            <NavLink key={index} to={item.path} className="">
            <button className="hover:text-blue-500 transition cursor-pointer">
              {item.name}
            </button>
          </NavLink>
          ))}
          
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
       <div className="fixed w-full z-50 bg-neutral-900">
            <ul className=" md:hidden px-4 
                pb-4 space-y-3 text-white flex flex-col ">
                {navItems.map((item,index)=>(
            <NavLink key={index} to={item.path} className="">
            <button onClick={()=>setIsOpen(!isOpen)}
            className="hover:text-blue-500 transition cursor-pointer">
              {item.name}
            </button>
          </NavLink>
          ))}
                </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

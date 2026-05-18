import React, { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="relative z-50">
      <div className="flex items-center justify-between px-6 lg:px-10">
        {/* Left Section */}
        <div className="flex items-center gap-6">
          <Link to="/">
            <img className="h-16 w-40 object-contain" src={Logo} alt="logo" />
          </Link>
        </div>
        {/* Right Section */}
        <div>
          <ul className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#6b2d2d]">
            <li>
              <Link to="/allproducts" className="hover:underline">
                HOME
              </Link>
            </li>
            <li>
              <Link to="/allproducts" className="hover:underline">
                ADMISSION
              </Link>
            </li>
            <li>
              <Link to="/allproducts" className="hover:underline">
                EVENTS
              </Link>
            </li>
            <li>
              <Link to="/allproducts" className="hover:underline">
                ALUMNI
              </Link>
            </li>
            <li>
              <Link to="/allproducts" className="hover:underline">
                CONTACT US
              </Link>
            </li>
          </ul>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-2 font-medium text-[#6b2d2d]">
          <span className="cursor-pointer ">Cart</span>
          {menuOpen ? (
            <HiX
              size={28}
              onClick={() => setMenuOpen(false)}
              className="cursor-pointer text-[#6b2d2d]"
            />
          ) : (
            <HiMenu
              size={28}
              onClick={() => setMenuOpen(true)}
              className="cursor-pointer text-[#6b2d2d]"
            />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#F5F4EF] flex flex-col items-center gap-6 py-8 text-[#6b2d2d] shadow-md">
          <Link to="/allproducts" onClick={() => setMenuOpen(false)}>
            All Products
          </Link>
          <Link to="/allproducts" onClick={() => setMenuOpen(false)}>
            Women
          </Link>
          <Link to="/allproducts" onClick={() => setMenuOpen(false)}>
            Men
          </Link>
          <Link to="/allproducts" onClick={() => setMenuOpen(false)}>
            Accessories
          </Link>
          <Link to="/login" onClick={() => setMenuOpen(false)}>
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

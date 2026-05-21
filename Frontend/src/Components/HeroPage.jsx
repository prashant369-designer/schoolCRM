import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function HeroPage() {
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const base_url = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    registration_no: "",
    passwords: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiUrl =
        step === 2
          ? `${base_url}/auth/teachers/login`
          : `${base_url}/auth/students/login`;

      const res = await axios.post(apiUrl, formData);

      const { token, role, id, registration_no, mailid } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("id", id);

      localStorage.setItem(
        "user",
        JSON.stringify({
          id,
          registration_no,
          mailid,
          role,
        }),
      );

      alert("Login successful");
      setOpen(false);

      if (role === "teacher") {
        navigate("/teacher");
      } else if (role === "student") {
        navigate("/student");
      } else if (role === "admin") {
        navigate("/admin");
      } else if (role === "staff") {
        navigate("/staff");
       }   
      else {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Login failed");
    }
  };
  return (
    <>
      <div className="bg-[#EAE1D6]">
        <div className="relative">
          <div className='relative bg-[url("https://c1.wallpaperflare.com/preview/968/730/441/building-cheyenne-photos-high-school.jpg")] bg-cover bg-no-repeat bg-center w-full h-130'>
            <div className="absolute inset-0 bg-black/40 md:bg-linear-to-r md:from-black/50 md:via-transparent md:to-transparent" />

            <div
              className="absolute z-10 flex flex-col w-sm lg:w-md h-44 justify-center items-center text-center 
            top-1/3 left-1/2 -translate-x-1/2  
            space-y-2 lg:text-white p-4 bg-white rounded-xl bg-opacity-80 md:bg-opacity-60 px-10 shadow-lg"
            >
              <h1 className="text-2xl font-semibold text-[#6b2d2d]">
                Existing Students/Teachers
              </h1>
              <p className="text-sm text-[#6b2d2d]">Please login to continue</p>

              <button
                onClick={() => setOpen(true)}
                className="bg-white text-[#6b2d2d] border border-[#6b2d2d] transition-all duration-700 hover:bg-[#6b2d2d] hover:text-white px-4 py-2 w-full mt-2 rounded cursor-pointer"
              >
                Click to login
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-xl p-4 ">
          <div className="bg-white p-10 shadow-md w-full max-w-2xl relative rounded-2xl">
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-2  cursor-pointer text-2xl text-[#6b2d2d]"
            >
              <IoMdCloseCircleOutline />
            </button>

            <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* Left Section */}
              <div className="w-1/2">
                <h1 className="text-3xl font-semibold mb-2 text-[#6b2d2d]">
                  Hello...
                </h1>
                <p className="text-sm  text-[#6b2d2d]">
                  Don't have an account? Create your account. It takes less than
                  a minute
                </p>

                <hr className="my-4 text-[#6b2d2d]" />

                <h2 className="text-sm mb-2 text-[#6b2d2d]">
                  Login with social media (soon)
                </h2>

                <button className="bg-white text-[#6b2d2d] border border-[#6b2d2d] transition-all duration-700 hover:bg-[#6b2d2d] hover:text-white px-4 py-2 w-full mt-2 rounded cursor-pointer">
                  Facebook
                </button>

                <button className=" bg-white text-[#6b2d2d] border border-[#6b2d2d] transition-all duration-700 hover:bg-[#6b2d2d] hover:text-white px-4 py-2 w-full mt-2 rounded cursor-pointer">
                  Google
                </button>

                <button className="bg-white text-[#6b2d2d] border border-[#6b2d2d] transition-all duration-700 hover:bg-[#6b2d2d] hover:text-white px-4 py-2 w-full mt-2 rounded cursor-pointer">
                  Twitter
                </button>
              </div>

              {/* Right Section (Form) */}
              <form onSubmit={handleSubmit} className="md:w-2/3 space-y-2">
                <span
                  onClick={() => setStep(step === 1 ? 2 : 1)}
                  className="text-sm text-[#6b2d2d] cursor-pointer flex justify-end"
                >
                  {step === 1 ? "Are u a teacher...?" : "Are u a student...?"}
                </span>
                <div>
                  <label className="text-sm text-[#6b2d2d]">
                    {step === 2 ? "Teacher ID*" : "Registration No*"}
                  </label>
                  <input
                    type="text"
                    name="registration_no"
                    value={formData.registration_no}
                    onChange={handleChange}
                    className="border border-[#6b2d2d] p-2 rounded w-full mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm text-[#6b2d2d]">Password*</label>

                  <div className="relative mt-1">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="passwords"
                      value={formData.passwords}
                      onChange={handleChange}
                      className="border border-[#6b2d2d] p-2 rounded w-full pr-10"
                    />

                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                    >
                      {showPassword ? (
                        <FaRegEyeSlash className="text-[#6b2d2d]" />
                      ) : (
                        <FaRegEye className="text-[#6b2d2d]" />
                      )}
                    </span>
                  </div>
                </div>

                <span className="text-sm items-end text-[#6b2d2d] text-right">
                  Forgot password?
                </span>

                <button
                  type="submit"
                  className="bg-white text-[#6b2d2d] border border-[#6b2d2d] transition-all duration-700 hover:bg-[#6b2d2d] hover:text-white px-4 py-2 w-full mt-4 rounded cursor-pointer"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default HeroPage;

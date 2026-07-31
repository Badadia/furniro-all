import { useState } from "react";
import toast from "react-hot-toast";

const Footer = () => {
  const [email, setEmail] = useState("");

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <footer className="py-25 pt-12 pb-9.5 px-4 font-poppins">
      <div className="flex flex-wrap gap-10 justify-between border-b border-b-[rgba(0,0,0,0.17)] pb-12">
        <div className="flex flex-col gap-12.5">
          <h1 className="text-[24px] font-bold">Funiro.</h1>
          <p className="text-[#9F9F9F] text-[16px] max-w-75">
            400 University Drive Suite 200 Coral Gables,
            <br />
            FL 33134 USA
          </p>
          <div className="flex gap-4 py-3.75">
            <a
              className="h-8.5 w-8.5 rounded-full flex justify-center items-center shadow-[0px_4px_14px_rgba(0,0,0,0.15)] cursor-pointer hover:scale-110 transition"
              href="https://www.facebook.com/compass.uol/?locale=pt_BR"
              target="_blank"
            >
              <img src="/Icons/facebook.png" alt="" />
            </a>
            <a
              className="h-8.5 w-8.5 rounded-full flex justify-center items-center shadow-[0px_4px_14px_rgba(0,0,0,0.15)] cursor-pointer hover:scale-110 transition"
              href="https://www.instagram.com/compass.uol/"
              target="_blank"
            >
              <img src="/Icons/instagram.png" alt="" />
            </a>
            <a
              className="h-8.5 w-8.5 rounded-full flex justify-center items-center shadow-[0px_4px_14px_rgba(0,0,0,0.15)] cursor-pointer hover:scale-110 transition"
              href="https://x.com/compassuol"
              target="_blank"
            >
              <img src="/Icons/twitter.png" alt="" />
            </a>
            <a
              className="h-8.5 w-8.5 rounded-full flex justify-center items-center shadow-[0px_4px_14px_rgba(0,0,0,0.15)] cursor-pointer hover:scale-110 transition"
              href="https://www.linkedin.com/company/compass-uol/posts/?feedView=all"
              target="_blank"
            >
              <img src="/Icons/linkedin.png" alt="" />
            </a>
          </div>
        </div>
        <div>
          <h1 className="text-[#9F9F9F] text-[16px] font-medium mb-13.75">
            Links
          </h1>
          <div className="text-[16px] font-medium flex flex-col gap-11.5">
            <a>Home</a>
            <a>Shop</a>
            <a>About</a>
            <a>Contact</a>
          </div>
        </div>
        <div>
          <h1 className="text-[#9F9F9F] text-[16px] font-medium mb-13.75">
            Help
          </h1>
          <div className="text-[16px] font-medium flex flex-col gap-11.5">
            <a>Payment Options</a>
            <a>Returns</a>
            <a>Privacy Policies</a>
          </div>
        </div>
        <div>
          <h1 className="text-[#9F9F9F] text-[16px] font-medium mb-13.75">
            Newsletter
          </h1>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="text-[16px] font-medium flex gap-2.75"
          >
            <input
              type="text"
              placeholder="Enter Your Email Address"
              className="placeholder:text-[#9F9F9F] placeholder:text-[14px] focus:outline-none py-0.75 w-50 border-b border-b-black"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>

            <button
            className="border-b border-b-black cursor-pointer hover:opacity-70"
            onClick={() => {
                if (validateEmail(email)) {
                toast.success("You are subscribed.");
                } else {
                toast.error("Invalid email.");
                }
            }}
            >
            SUBSCRIBE
            </button>
          </form>
        </div>
      </div>
      <p className="mt-8.75 text-[16px]">2023 furino. All rights reverved</p>
    </footer>
  );
};
export default Footer;
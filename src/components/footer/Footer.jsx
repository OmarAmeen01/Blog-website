import React from "react";
import { Logo } from "../bridge";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <div className="flex felx-row justify-between bg-black p-5 ">
      <div className="flex flex-col" id="logo">
        <Logo className="text-white" />
        <p className="text-[#a7a8ac] ">&copy; 2024 Giga Blog </p>
        <div className="flex flex-row gap-2">
          <Link>
            <button className="text-[#a7a8ac] hover:text-white">
              Terms of service
            </button>
          </Link>
          <Link>
            <button className="text-[#a7a8ac] hover:text-white">
              Privacy Policy
            </button>
          </Link>
        </div>
      </div>
      <div id="links" className="flex flex-col gap-2">
        <ul id="social" className="flex flex-row gap-2">
          <p className="text-white text-md font-bold">Social</p>
          <li className="text-[#a7a8ac] hover:text-white">
            <a className=" decoration-none " href="youtube.com">
              Youtube
            </a>
          </li>
          <li className="text-[#a7a8ac] hover:text-white">
            <a className=" decoration-none" href="twitter.com">
              Twitter
            </a>
          </li>
          <li className="text-[#a7a8ac] hover:text-white">
            <a className=" decoration-none" href="facebook.com">
              Facebook
            </a>
          </li>
          <li className="text-[#a7a8ac] hover:text-white">
            <a className=" decoration-none" href="instagram.com">
              Instagram
            </a>
          </li>
        </ul>
        <ul id="pages" className="flex flex-row gap-2">
          <p className="text-white text-md font-bold">Navigation</p>
          <li className="text-[#a7a8ac] hover:text-white">
            <Link to="/">Home</Link>
          </li>
          <li className="text-[#a7a8ac] hover:text-white">
            <Link>About us</Link>
          </li>
          <li className="text-[#a7a8ac] hover:text-white">
            <Link>Contact us</Link>
          </li>
          <li className="text-[#a7a8ac] hover:text-white">
            <Link to="/login">Login</Link>
          </li>
          <li className="text-[#a7a8ac] hover:text-white">
            <Link to="/signup">Create an account</Link>
          </li>
        </ul>
        <ul id="community" className="text-white flex flex-row gap-2">
          <p className="text-md font-bold">Community</p>
          <li className="text-[#a7a8ac] hover:text-white">
            <a className=" decoration-none" href="discord.com">
              Discord
            </a>
          </li>
          <li className="text-[#a7a8ac] hover:text-white">
            <a className=" decoration-none" href="Slack">
              Slack
            </a>
          </li>
          <li className="text-[#a7a8ac] hover:text-white">
            <a className=" decoration-none" href="telgram.com">
              Telegram
            </a>
          </li>
          <li className="text-[#a7a8ac] hover:text-white">
            <a className=" decoration-none" href="#">
              Code of conduct
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;

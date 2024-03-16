import React, { useState } from "react";
import { Logout, Logo } from "../bridge";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Header() {
  const [clicked, setClicked] = useState(false);
  const authStatus = useSelector((state) => state.status);

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    { name: "Sign up", slug: "/signup", active: !authStatus },

    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="sticky top-0 z-10">
      <nav className="h-[63px]  p-4  flex justify-between bg-white">
        <div>
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <div
          className="text-4xl min-[500px]:hidden  transition-all duration-500"
          onClick={() => setClicked(!clicked)}
        >
          <ion-icon name={clicked ? "close" : "menu"}></ion-icon>
        </div>

        <ul
          className={`flex flex-row gap-3 max-[500px]:flex-col  max-[500px]:bg-white   max-[500px]:p-5 max-[500px]:shadow-xl max-[500px]:mt-12 max-[500px]:absolute left-0 max-[500px]:w-full transition-all  duration-500 ease-in-out ${
            clicked
              ? "top-2 opacity-100"
              : "max-[500px]:top-[-400px] max-[500px]:opacity-0"
          }`}
        >
          {navItems.map((item) => {
            return item.active ? (
              <Link key={item.slug} to={item.slug}>
                <li
                  key={item.slug}
                  className="p-1 text-[20px]   hover:border-b-2  border-black active:border-b-2"
                >
                  {item.name}
                </li>
              </Link>
            ) : null;
          })}
          {authStatus && (
            <li>
              <Logout />
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;

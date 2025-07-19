import React from "react";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const App = () => {
  const [loginPopup, setloginPopup] = useState(false);
  const [signInPopup, setsignInPopup] = useState(false);
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const loginUser = () => {
    setloginPopup(true);
  };
  const signInUser = () => {
    setsignInPopup(true);
  };

  const signIn = async ({ username, email, password }) => {

const apiBaseUrl = import.meta.env.VITE_BACKEND_URL;


    try {
      const response = await axios.post(
        `${apiBaseUrl}/auth/api/signin`,
        {
          username,
          email,
          password,
        }
      );

      const data = response.data;
      console.log(data);
      if (data.success) {
        toast.success(data.message || "account created successfully");
        alert("user registered!!");
        setusername("");
        setemail("");
        setpassword("");
        setsignInPopup("");
      } else {
        toast.error(data.message || "smth wentt wrong");
      }
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  const logIn = async ({ email, password }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/api/login",
        {
          email,
          password,
        }
      );
      const data = response.data;
      console.log(data);
      if (data.success) {
        alert("user logged in!!");
        setemail("");
        setpassword("");
        setloginPopup("");
      } else {
        alert("smth went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div onClick={() => {}} className={`    w-full min-h-screen relative `}>
      <div
        className={`${
          loginPopup || signInPopup
            ? "blur-sm pointer-events-none"
            : "blur-none"
        }`}
      >
        <nav className="flex justify-center items-center my-2">
          <button
            onClick={loginUser}
            className="bg-red-300 cursor-pointer rounded-md py-2 px-4 "
          >
            Login
          </button>
        </nav>

        <h1 className="text-5xl text-center my-10 ">Todo List </h1>

        <div className="w-[90%] relative max-w-[500px]  m-auto  ">
          <input
            type="text"
            className="rounded w-full py-2 border-2 focus:outline-none border-gray-400 "
          />
          <div>
            <button className="bg-red-400 cursor-pointer absolute top-0 translate-y-1.5 drop-shadow-xl drop-shadow-gray-500  rounded  p-1  -translate-x-2 right-0">
              Add
            </button>
          </div>
          <div className="mt-10">
            <div className="text-center my-5 py-2 border-red-500 border-2 rounded ">
              TODO
            </div>
            <div className="text-center  mt-5 border-red-500 border-2 py-2 rounded ">
              TODO
            </div>
          </div>
        </div>
      </div>

      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={`bg-gray-400 ${
          loginPopup ? "block" : "hidden"
        } absolute rounded-md  scale-150 p-3 z-999  top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2`}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            logIn({ email, password });
          }}
          className="flex flex-col "
        >
          <span
            onClick={() => {
              setloginPopup(!loginPopup);
            }}
            className="text-xl   self-end cursor-pointer"
          >
            &times;
          </span>
          <label htmlFor="email" className="text-xl">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            placeholder="Email..."
            className="border-red-400 border-2 rounded focus:outline-none my-2 py-2 px-5"
          />
          <label htmlFor="password" className="text-xl mt-2">
            password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            placeholder="password..."
            className="border-red-400 border-2 rounded focus:outline-none my-2 py-2 px-5"
          />

          <button type="submit" className="py-2   px-4 bg-blue-500 rounded-sm">
            Login
          </button>
          <h6 className="text-sm mt-2 text-center">
            create an account?{" "}
            <a
              href=""
              onClick={(e) => {
                e.preventDefault();
                setloginPopup(!loginPopup);
                signInUser();
              }}
              className="text-blue-700 underline"
            >
              {" "}
              Sign up
            </a>
          </h6>
        </form>
      </div>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={`bg-gray-400 ${
          signInPopup ? "block" : "hidden"
        } absolute rounded-md  scale-150 p-3 z-999  top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2`}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            signIn({ username, email, password });
          }}
          action=""
          className="flex flex-col  "
        >
          <span
            onClick={() => {
              setsignInPopup(!signInPopup);
            }}
            className="text-xl   self-end cursor-pointer"
          >
            &times;
          </span>
          <label htmlFor="username" className="text-xl">
            username
          </label>
          <input
            type="username"
            value={username}
            onChange={(e) => setusername(e.target.value)}
            placeholder="username..."
            className="border-red-400 border-2 rounded focus:outline-none my-2 py-2 px-5"
          />
          <label htmlFor="email" className="text-xl">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            placeholder="Email..."
            className="border-red-400 border-2 rounded focus:outline-none my-2 py-2 px-5"
          />
          <label htmlFor="password" className="text-xl mt-2">
            password
          </label>
          <input
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            type="password"
            placeholder="password..."
            className="border-red-400 border-2 rounded focus:outline-none my-2 py-2 px-5"
          />

          <button
            type="submit"
            className="py-2 cursor-pointer  px-4 bg-blue-500 rounded-sm"
          >
            Sign In
          </button>
          <h6 className="text-sm mt-2 text-center">
            Already an user?{" "}
            <a
              href=""
              onClick={(e) => {
                e.preventDefault();
                setsignInPopup(!signInPopup);
                loginUser();
              }}
              className="text-blue-700 underline"
            >
              {" "}
              Login
            </a>
          </h6>
        </form>
      </div>
    </div>
  );
};

export default App;

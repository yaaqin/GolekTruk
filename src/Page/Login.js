import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import qs from "qs";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Loading, setLoading] = useState(false);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const response = await fetch("https://recruitment-test.gltkdev.com/login", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ email, password }),
  //   });

  //   const data = await response.json();

  //   if (response.ok) {
  //     // handle successful login here
  //     console.log("Login successful:", data);
  //   } else {
  //     setError(data.message);
  //   }
  // };
  //
  const history = useNavigate()

  const handleLogin = async () => {
    // setLoading(true);
    console.log("tersubmit");

    axios
      .post(
        "https://recruitment-test.gltkdev.com/login",
        qs.stringify({
          username: email,
          password: password,
        })
      )
      .then((respon) => {
        const token = respon?.data?.access_token;

        localStorage.setItem("token", token);

        history('/')

        console.log("berhasil");
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
      <Link to={"/"}>
        <div className="absolute hover:font-bold p-[50px]">
          <h1 className="text-[30px]">GLTK</h1>
        </div>
      </Link>
      <section className="py-[130px] h-[100vh] shadow-stone-700 flex items-center justify-center">
        <div className="w-[30%] bg-[white] px-[30px] py-[20px] h-[80%] shadow-lg shadow-stone-700 rounded-[30px]">
          <h1 className="text-[30px] mt-[20px] text-center">Login</h1>
          {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
          <div className="flex flex-col">
            <label>Email:</label>
            <input
              className="mt-[5px] border-[2px] rounded-[5px] border-[black] py-[5px] px-[10px]"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="mt-[30px]">Password:</label>
            <input
              className="mt-[5px] border-[2px] rounded-[5px] border-[black] py-[5px] px-[10px]"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="mx-auto">
              <button
                onClick={handleLogin}
                type="submit"
                className="py-[5px] px-[15px] mt-[20px] bg-[#fff] hover:text-[white] border-[black] hover:border-none hover:bg-[grey] border-[2px] rounded-[15px]"
              >
                {Loading ? "Loading..." : "Login"}
              </button>
            </div>
            <p className="mt-[15px] text-center">
              Not have account ?{" "}
              <Link to={"/register"}>
                <span className="text-[blue]">Sign up here</span>
              </Link>{" "}
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;

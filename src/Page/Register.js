import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {  } from "react-router-dom/dist";
const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [Error, setError] = useState("");
  const [photo, setPhoto] = useState();

  const Direct = useNavigate()
  const [iscompleted, setiscompleted] = useState(false);

  const handleFoto = () => {
    if (
      email === "" ||
      name === "" ||
      phone === "" ||
      password === "" ||
      age === ""
    ) {
      alert("pastikan isi semua kolom");
    } else {
      setiscompleted(true);
    }
  };

  const handleSingup = async () => {
    const response = await axios
      .post("https://recruitment-test.gltkdev.com/user", {email, name, phone, password, age, photos : ['test']})
      .then((respon) => {
        console.log(respon);
        console.log('data teregistrasi');
        Direct('/login')
      })
      .catch((err) => {
        console.log(err);
        console.log('err');
      });

 
  };

  return (
    <>
      <Link to={"/"}>
        <div className="absolute hover:font-bold p-[50px]">
          <h1 className="text-[30px]">GLTK</h1>
        </div>
      </Link>
      <section className="py-[50px] shadow-stone-700 flex justify-center">
        <div className="w-[35%] py-[20px] bg-[white] px-[30px] shadow-lg shadow-stone-700 rounded-[30px]">
          <h1 className="text-[30px] mt-[20px] text-center">Register</h1>
          {iscompleted == true ? (
            <div className="flex flex-col">
              <label>Foto</label>
              <input
                className="mt-[5px] border-[2px] rounded-[5px] border-[black] py-[5px] px-[10px]"
                type="file"
                value={photo}
                onChange={(e) => setPhoto(e.target.result)}
              />
            </div>
          ) : (
            <div className="flex flex-col">
              <label>Email:</label>
              <input
                className="mt-[5px] border-[2px] rounded-[5px] border-[black] py-[5px] px-[10px]"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="mt-[20px]">Name :</label>
              <input
                className="mt-[5px] border-[2px] rounded-[5px] border-[black] py-[5px] px-[10px]"
                type="Name "
                placeholder="Name "
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label className="mt-[20px]">Phone :</label>
              <input
                className="mt-[5px] border-[2px] rounded-[5px] border-[black] py-[5px] px-[10px]"
                type="Phone "
                placeholder="Phone "
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <label className="mt-[20px]">Password:</label>
              <input
                className="mt-[5px] border-[2px] rounded-[5px] border-[black] py-[5px] px-[10px]"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="mt-[20px]">Age :</label>
              <input
                className="mt-[5px] border-[2px] rounded-[5px] border-[black] py-[5px] px-[10px]"
                type="Age"
                placeholder="Age "
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
          )}
          <div className="flex flex-col">
            <div className="mx-auto">
              {iscompleted ? (
                <button
                  onClick={handleSingup}
                  type="submit"
                  className="py-[5px] px-[15px] mt-[30px] bg-[#fff] hover:text-[white] border-[black] hover:border-none hover:bg-[grey] border-[2px] rounded-[15px]"
                >
                  Sign Up
                </button>
              ) : (
                <button
                  onClick={handleFoto}
                  type="submit"
                  className="py-[5px] px-[15px] mt-[30px] bg-[#fff] hover:text-[white] border-[black] hover:border-none hover:bg-[grey] border-[2px] rounded-[15px]"
                >
                  Next
                </button>
              )}
            </div>
            <p className="text-center mt-[15px]">
              Have account ?{" "}
              <Link to={"/login"}>
                <span className="text-[blue]">Login here</span>
              </Link>{" "}
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;

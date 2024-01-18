import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

export default function Home() {
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [arrTgl, setTgl] = useState([]);
  const [colDate, setColDate] = useState("");
  const [Scope, setScope] = useState([]);

//   console.log(arrTgl);

  const isStatus = localStorage.getItem("token");

  // logout start
  const handleLogout = () => {
    // const token = localStorage.getItem("token");
    // axios
    //   .post("https://recruitment-test.gltkdev.com/user/logout/all", {headers: {Authorization: `Bearer ${token}`}})
    //   .then((respon) => {
    localStorage.removeItem("token");
    navigate("/login");
    //   })
    //   .catch((error) => console.log(error));
  };

  // logout end

  //cari data triger start
  const cariData = async () => {
    const spld = moment(startDate).format("DD MM YYYY").split(" ");
    const startDay = moment(startDate).format("DD MM YYYY").split(" ")[0];
    const endDay = moment(endDate).format("DD MM YYYY").split(" ")[0];
    const arrayDate = [];

console.log(spld);

    const antara = parseInt(endDay) - parseInt(startDay);
    setColDate(antara);

    for (let i = 0; i <= antara; i++) {
      const tgl = `${spld[2]}-${spld[1]}-${parseInt(spld[0]) + i}`;
      arrayDate.push(tgl);
    }
    setTgl(arrayDate);

    const token = localStorage.getItem("token");
    const arrData = [];
    const arrScope = [];

    for (let i = 0; i < arrayDate.length; i++) {
      const element = arrayDate[i];

      await axios
        .get(
          `https://recruitment-test.gltkdev.com/analytic/click?listing_date=${element}`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((respon) => {
          console.log(respon);
          arrData.push(respon.data);
        //   console.log(arrData.length);
        })
        .catch((error) => console.log(error));
    }
    for (let i = 0; i < arrData.length; i++) {
      const dataa = arrData[i];
      for (let j = 0; j < dataa.length; j++) {
        if (arrScope.find((item) => item === dataa[j].scope) === undefined) {
          arrScope.push(dataa[j].scope);
        }
      }
    }
    // const dataScope = [];
    // for (const prop in arrScope) {
    //   if (arrScope[prop] >= 2) {
    //     dataScope.push(prop);
    //   } else {
    //     dataScope.push(prop);
    //   }
    // }
    setScope(arrScope);
    // console.log(dataScope);
  };
  //cari data triger end

  //login first triger start
  const loginDirect = () => {
    if (isStatus == null || undefined) {
      navigate("/login");
    } else if (isStatus) {
      cariData();
    }
  };
  //login first triger end

  //dummy array
  const dummyarr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]

  return (
    <>
      <nav className="fix shadow-lg shadow-stone-400 h-[50px] flex items-center justify-end px-[50px]">
        <div className="flex">
          {isStatus == null || undefined ? (
            <Link to={"/login"}>
              <button className="border-[2px] rounded-[10px] px-[20px] py-[5px] border-[black]">
                Login
              </button>
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="border-[2px] rounded-[10px] px-[20px] py-[5px] border-[black]"
            >
              Logout
            </button>
          )}
        </div>
      </nav>
      <section className="h-[100vh] w-full pt-[100px] px-[70px]">
        {/* date start */}
        <div className="flex gap-[20px]">
          <div className="flex items-center">
            <p>Filter : </p>
          </div>
          <div className="flex flex-col border-[2px] border-[black] rounded-[10px] p-[10px]">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="Start date"
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              placeholderText="End date"
            />
          </div>
        </div>
        {/* button triger start */}
        <div className="mt-[20px]">
          <button
            onClick={loginDirect}
            className="bg-[white] border-[2px] border-[black] hover:bg-[grey] hover:text-[white] rounded-[10px] py-[5px] px-[15px]"
          >
            Cari
          </button>
        </div>
        {/* button triger end */}
        {/* date end */}
        {/* table start */}
        <section id="table" className="mt-[20px]">
          <table
            border="1"
            className="border-[2px] border-[black] w-full overflow-x-auto"
          >
            <tr>
              <th
                className="border-[2px] border-[black]"
                colspan="4"
                rowSpan={2}
              >
                Item
              </th>
              <th
                className="border-[2px] border-[black]"
                colspan='16'
                rowSpan={1}
              >
                {" "}
                {"Date"}
              </th>
            </tr>
            <tr>
              <th className="border-[2px] border-[black]">Total</th>
              {dummyarr.map((date, key) => (
                <th key={key} className="border-[2px] border-[black]">
                  {date}
                </th>
              ))}
            </tr>
              {Scope.map((scope, key) => {})}
            <tr>
              <td
                className="border-[2px] border-[black] py-[5px] px-[15px]"
                colSpan={4}
              >
                Apa itu Golek (akun)
              </td>
              <td className="border-[2px] border-[black] text-center">3</td>
              <td className="border-[2px] border-[black] text-center">6</td>
              <td className="border-[2px] border-[black] text-center">1</td>
              <td className="border-[2px] border-[black] text-center">1</td>
              <td className="border-[2px] border-[black] text-center">0</td>
              <td className="border-[2px] border-[black] text-center">6</td>
              <td className="border-[2px] border-[black] text-center">1</td>
              <td className="border-[2px] border-[black] text-center">1</td>
              <td className="border-[2px] border-[black] text-center">0</td>
              <td className="border-[2px] border-[black] text-center">6</td>
              <td className="border-[2px] border-[black] text-center">1</td>
              <td className="border-[2px] border-[black] text-center">0</td>
              <td className="border-[2px] border-[black] text-center">6</td>
              <td className="border-[2px] border-[black] text-center">1</td>
              <td className="border-[2px] border-[black] text-center">6</td>
              <td className="border-[2px] border-[black] text-center">1</td>
            </tr>
            <tr>
              <td
                className="border-[2px] border-[black] py-[5px] px-[15px]"
                colSpan={4}
              >
                Apa itu Golek (akun)
              </td>
              <td className="border-[2px] border-[black] text-center">3</td>
              <td className="border-[2px] border-[black] text-center">6</td>
              <td className="border-[2px] border-[black] text-center">1</td>
              <td className="border-[2px] border-[black] text-center">1</td>
              <td className="border-[2px] border-[black] text-center">0</td>
              <td className="border-[2px] border-[black] text-center">6</td>
              <td className="border-[2px] border-[black] text-center">1</td>
              <td className="border-[2px] border-[black] text-center">1</td>
              <td className="border-[2px] border-[black] text-center">0</td>
              <td className="border-[2px] border-[black] text-center">6</td>
              <td className="border-[2px] border-[black] text-center">1</td>
              <td className="border-[2px] border-[black] text-center">0</td>
              <td className="border-[2px] border-[black] text-center">6</td>
              <td className="border-[2px] border-[black] text-center">1</td>
              <td className="border-[2px] border-[black] text-center">6</td>
              <td className="border-[2px] border-[black] text-center">1</td>
            </tr>
            <tr>
              <td
                className="border-[2px] border-[black] py-[5px] px-[15px]"
                colSpan={4}
              >
                Apa itu Golek (akun)
              </td>
              <td className="border-[2px] border-[black] text-center">3</td>
              <td className="border-[2px] border-[black] text-center">6</td>
              <td className="border-[2px] border-[black] text-center">1</td>
              <td className="border-[2px] border-[black] text-center">1</td>
              <td className="border-[2px] border-[black] text-center">0</td>
              <td className="border-[2px] border-[black] text-center">6</td>
              <td className="border-[2px] border-[black] text-center">1</td>
              <td className="border-[2px] border-[black] text-center">1</td>
              <td className="border-[2px] border-[black] text-center">0</td>
              <td className="border-[2px] border-[black] text-center">6</td>
              <td className="border-[2px] border-[black] text-center">1</td>
              <td className="border-[2px] border-[black] text-center">0</td>
              <td className="border-[2px] border-[black] text-center">6</td>
              <td className="border-[2px] border-[black] text-center">1</td>
              <td className="border-[2px] border-[black] text-center">6</td>
              <td className="border-[2px] border-[black] text-center">1</td>
            </tr>
            <tr>
              <td
                className="border-[2px] border-[black] py-[5px] px-[15px]"
                colSpan={4}
              >
                Apa itu Golek (akun)
              </td>
              <td className="border-[2px] border-[black] text-center">3</td>
              <td className="border-[2px] border-[black] text-center">6</td>
              <td className="border-[2px] border-[black] text-center">1</td>
              <td className="border-[2px] border-[black] text-center">1</td>
              <td className="border-[2px] border-[black] text-center">0</td>
              <td className="border-[2px] border-[black] text-center">6</td>
              <td className="border-[2px] border-[black] text-center">1</td>
              <td className="border-[2px] border-[black] text-center">1</td>
              <td className="border-[2px] border-[black] text-center">0</td>
              <td className="border-[2px] border-[black] text-center">6</td>
              <td className="border-[2px] border-[black] text-center">1</td>
              <td className="border-[2px] border-[black] text-center">0</td>
              <td className="border-[2px] border-[black] text-center">6</td>
              <td className="border-[2px] border-[black] text-center">1</td>
              <td className="border-[2px] border-[black] text-center">6</td>
              <td className="border-[2px] border-[black] text-center">1</td>
            </tr>
            <tr>
              <td
                className="border-[2px] border-[black] py-[5px] px-[15px]"
                colSpan={4}
              >
                Apa itu Golek (akun)
              </td>
              <td className="border-[2px] border-[black] text-center">3</td>
              <td className="border-[2px] border-[black] text-center">6</td>
              <td className="border-[2px] border-[black] text-center">1</td>
              <td className="border-[2px] border-[black] text-center">1</td>
              <td className="border-[2px] border-[black] text-center">0</td>
              <td className="border-[2px] border-[black] text-center">6</td>
              <td className="border-[2px] border-[black] text-center">1</td>
              <td className="border-[2px] border-[black] text-center">1</td>
              <td className="border-[2px] border-[black] text-center">0</td>
              <td className="border-[2px] border-[black] text-center">6</td>
              <td className="border-[2px] border-[black] text-center">1</td>
              <td className="border-[2px] border-[black] text-center">0</td>
              <td className="border-[2px] border-[black] text-center">6</td>
              <td className="border-[2px] border-[black] text-center">1</td>
              <td className="border-[2px] border-[black] text-center">6</td>
              <td className="border-[2px] border-[black] text-center">1</td>
            </tr>
            <tr>
              <td
                className="border-[2px] border-[black] py-[5px] px-[15px]"
                colSpan={4}
              >
                Apa itu Golek (akun)
              </td>
              <td className="border-[2px] border-[black] text-center">3</td>
              <td className="border-[2px] border-[black] text-center">6</td>
              <td className="border-[2px] border-[black] text-center">1</td>
              <td className="border-[2px] border-[black] text-center">1</td>
              <td className="border-[2px] border-[black] text-center">0</td>
              <td className="border-[2px] border-[black] text-center">6</td>
              <td className="border-[2px] border-[black] text-center">1</td>
              <td className="border-[2px] border-[black] text-center">1</td>
              <td className="border-[2px] border-[black] text-center">0</td>
              <td className="border-[2px] border-[black] text-center">6</td>
              <td className="border-[2px] border-[black] text-center">1</td>
              <td className="border-[2px] border-[black] text-center">0</td>
              <td className="border-[2px] border-[black] text-center">6</td>
              <td className="border-[2px] border-[black] text-center">1</td>
              <td className="border-[2px] border-[black] text-center">6</td>
              <td className="border-[2px] border-[black] text-center">1</td>
            </tr>
          </table>
        </section>
        {/* table end */}
      </section>
    </>
  );
}

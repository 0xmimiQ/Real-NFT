import { useState } from "react";

const InputModal = () => {
  const [activateSelectBtn, setActivateSelectBtn] = useState(false);

  return (
    <div className="relative py-4 sm:w-[60vh] bg-gray-800 rounded-lg border border-gray-700 shadow-md sm:p-6 md:p-8">
      <form className="px-6 py-3 space-y-6" action="#">
        <h5 className="flex flex-row justify-center md:justify-start md:px-0 text-3xl font-medium text-white">
          Search Real NFT
        </h5>
        <div>
          <label
            htmlFor="chains"
            className="block mb-2 text-sm font-medium font-mono text-gray-300"
          >
            Choose network
          </label>

          <button
            onClick={() => {
              setActivateSelectBtn(!activateSelectBtn);
            }}
            className="p-4 w-full border border-gray-500 bg-gray-600 text-md rounded-lg hover:bg-cyan-600 focus:ring-4 focus:ring-cyan-300 font-medium text-gray-300 text-center inline-flex justify-between items-center"
            type="button"
            data-dropdown-toggle="dropdown"
            aria-haspopup="true"
          >
            Choose network{" "}
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>

          <div
            className={`${
              activateSelectBtn ? "hidden" : ""
            } text-base z-50 list-none divide-y divide-gray-100 rounded shadow my-4`}
          >
            <ul
              className="absolute p-2 w-[80%] py-1 bg-stone-900 rounded-lg"
              aria-labelledby="dropdown"
            >
              <li>
                <a
                  href="#"
                  className="text-md text-gray-300 hover:bg-cyan-400 hover:text-black block px-4 py-2"
                >
                  Ethereum
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-md text-gray-300 hover:bg-cyan-400 hover:text-black block px-4 py-2"
                >
                  Polygon
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-md text-gray-300 hover:bg-cyan-400 hover:text-black block px-4 py-2"
                >
                  BNB Chain
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-md text-gray-300 hover:bg-cyan-400 hover:text-black block px-4 py-2"
                >
                  Avalanche
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-md text-gray-300 hover:bg-cyan-400 hover:text-black block px-4 py-2"
                >
                  Fantom
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-md text-gray-300 hover:bg-cyan-400 hover:text-black block px-4 py-2"
                >
                  Cronos
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <label
            htmlFor="contractAddress"
            className="block mb-2 text-sm font-medium font-mono text-gray-300"
          >
            Contract Address
          </label>
          <input
            type="contractAddress"
            name="contractAddress"
            id="contractAddress"
            className="p-3.5 text-md rounded-lg outline outline-none focus:ring-4 focus:ring-offset-0 focus:ring-cyan-300 block w-full bg-gray-600 border border-gray-500 placeholder-gray-300 text-white"
            placeholder="0x"
            required
          ></input>
        </div>
        <div>
          <label
            htmlFor="tokenID"
            className="block mb-2 text-sm font-medium font-mono text-gray-300"
          >
            Token ID
          </label>
          <input
            type="tokenID"
            name="tokenID"
            id="tokenID"
            placeholder="1000"
            className="p-3.5 text-md rounded-lg outline outline-none focus:ring-4 focus:ring-offset-0 focus:ring-cyan-300 block w-full bg-gray-600 border border-gray-500 placeholder-gray-300 text-white"
            required
          ></input>
        </div>
        <div className="flex flex-row justify-center pt-10 pb-2">
          <button
            type="submit"
            className="p-4 w-[40%] text-white text-lg font-bold font-mono rounded-lg text-md text-center bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-700 shadow-cyan-500/50 hover:bg-gradient-to-br hover:text-xl focus:ring-4 focus:outline-none focus:ring-blue-800"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputModal;

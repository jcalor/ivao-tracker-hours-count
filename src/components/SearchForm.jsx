import useStore from "../store";
import { useState } from "react";
import Http from "../modules/utils/Http";

const SearchForm = () => {
  const {
    setVid,
    setAtcPosition,
    setData,
    setTotalTime,
  } = useStore((state) => ({
    vid: state.vid,
    setVid: state.setVid,
    atcPosition: state.atcPosition,
    setAtcPosition: state.setAtcPosition,
    setData: state.setData,
    setTotalTime: state.setTotalTime,
  }));

  const [error, setError] = useState("");
  const [tempVid, setTempVid] = useState("");
  const [tempAtcPosition, setTempAtcPosition] = useState(""); // Se crea este estado para evitar que VID y ATC se modifiquen en los resultados al modificar el input

  const handleSubmit = async () => {
    if (!tempVid || !tempAtcPosition) {
      setError("Por favor, rellena todos los campos");
      return;
    }
    
    let allData = [];
    let currentPage = 1;
    let totalPages;
    const now = new Date();
    const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
  
    do {
      const res = await Http.get(
        `https://api.ivao.aero/v2/tracker/sessions?userId=${tempVid}&callsign=${tempAtcPosition}&from=&to=&connectionType=ATC&page=${currentPage}&perPage=10&from=${threeMonthsAgo}`
      );
  
      if (!totalPages) {
        totalPages = res.pages;
      }
  
      allData = allData.concat(res.items);
      currentPage++;
  
    } while (currentPage <= totalPages);

    if (allData.length === 0) {
      setError("No existen datos");
      return;
    }
  
    const hasPosition = allData.some(item => item.callsign === tempAtcPosition);
  
    if (!hasPosition) {
      setError(`La posición ${tempAtcPosition} no existe`);
      return;
    }

    const filteredData = allData.filter((item) => item.time >= 1800);
  
    setData(allData);
  
    const timeInSeconds = filteredData.reduce((total, item) => total + item.time, 0);
  
    setTotalTime(timeInSeconds);
    setVid(tempVid);
    setAtcPosition(tempAtcPosition);
    setError("");
  };
  

  const handleReset = () => {
    setVid("");
    setTempVid("");
    setAtcPosition("");
    setTempAtcPosition("");
    setError("");
    setData([]);
    setTotalTime(0);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-semibold mb-8 text-center">
        IVAO Tracker Hours Count
      </h1>
      {error && <div className="text-red-500 mb-3">{error}</div>}
      <div className="flex flex-col gap-2 md:flex-row">
        <input
          type="text"
          placeholder="User VID"
          value={tempVid}
          onChange={(e) => setTempVid(e.target.value)}
          className="bg-zinc-600 hover:bg-zinc-700 outline-none transition duration-200 py-2 px-2 rounded-md text-center"
        ></input>
        <input
          type="text"
          placeholder="ATC Position"
          value={tempAtcPosition}
          onChange={(e) => setTempAtcPosition(e.target.value.toUpperCase())}
          className="bg-zinc-600 hover:bg-zinc-700 outline-none transition duration-200 py-2 px-2 rounded-md text-center"
        ></input>
      </div>
      <div className="flex flex-col md:flex-row md:gap-2">
        <button
          onClick={handleSubmit}
          className="bg-neutral-600 hover:bg-neutral-700 transition duration-200 py-2 px-4 rounded-lg mt-4"
        >
          Check
        </button>
        <button
          onClick={handleReset}
          className="bg-neutral-600 hover:bg-neutral-700 transition duration-200 py-2 px-4 rounded-lg mt-4"
        >
          Reiniciar
        </button>
      </div>
      <div></div>
    </div>
  );
};

export default SearchForm;

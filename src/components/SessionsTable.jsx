import useStore from "../store";

const SessionsTable = () => {
  const { data, atcPosition } = useStore((state) => ({
    data: state.data,
    atcPosition: state.atcPosition,
  }));

  const convertSeconds = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const remainingSeconds = seconds % 3600;
    const minutes = Math.floor(remainingSeconds / 60);
    const hoursDisplay = hours < 10 ? `0${hours}` : hours;
    const minutesDisplay = minutes < 10 ? `0${minutes}` : minutes;

    return `${hoursDisplay}:${minutesDisplay}`;
  };

  const getDate = (date) => {
    const newDate = new Date(date);

    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    const formatedDate = newDate.toLocaleDateString("es-ES", options);
    return formatedDate;
  };

  return (
    <div className="flex flex-col justify-center align-center mt-8">
      <h1 className="text-xl font-semibold text-center mb-1">
        Lista de conexiones en {atcPosition}
      </h1>
      <p className="text-center font-light text-sm mb-5">
        Las conexiones con duración inferior a 30 minutos no se cuentan pero se muestran aquí.
      </p>
      <div className="flex justify-center">
        <table className="w-2/3 rounded-lg text-center">
          <thead>
            <tr className="bg-zinc-800">
              <th className="px-2 py-2">Inicio</th>
              <th className="px-2 py-2">Fin</th>
              <th className="px-2 py-2">Duración</th>
            </tr>
          </thead>
          <tbody>
            {data.map((session, index) => {
              return (
                <tr key={session.id} className={index % 2 === 0 ? "bg-zinc-700" : "bg-zinc-600"}>
                  <td className="px-2 py-2">{getDate(session.createdAt)}</td>
                  <td className="px-2 py-2">{getDate(session.completedAt)}</td>
                  <td className="px-2 py-2">{convertSeconds(session.time)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SessionsTable;

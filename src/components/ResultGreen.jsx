import useStore from "../store";

const ResultGreen = () => {
  const { totalTime, vid, atcPosition } = useStore((state) => ({
    totalTime: state.totalTime,
    vid: state.vid,
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

  return (
    <div className="flex justify-center items-center">
      <div className="text-center mt-8 bg-green-600 md:w-2/3 mx-auto p-4 rounded-lg">
        <p className="mb-3">
          El usuario <strong>{vid}</strong> tiene al menos 15 horas conectado en{" "}
          <strong>{atcPosition}</strong> en los últimos 3 meses.
        </p>
        <p>
          Horas totales: <strong>{convertSeconds(totalTime)}</strong>
        </p>
      </div>
    </div>
  );
};

export default ResultGreen;

import Navbar from "../components/Navbar";
import ResultGreen from "../components/ResultGreen";
import ResultRed from "../components/ResultRed";
import SearchForm from "../components/SearchForm";
import SessionsTable from "../components/SessionsTable";
import { useAuth, useUser } from "../modules/auth";
import useStore from "../store";

const MainPage = () => {
  const { data, totalTime } = useStore((state) => ({
    totalTime: state.totalTime,
    data: state.data,
  }));
  const auth = useAuth();
  const { user, isLoading: isLoadingUserData } = useUser();

  if (auth.isAuthenticated && user && user.isStaff) {
    return (
      <div className="p-3 flex flex-col justify-center">
        <Navbar />
        <SearchForm />
        {data && data.length > 0 ? (
          totalTime > 54000 ? (
            <>
              <ResultGreen />
              <SessionsTable />
            </>
          ) : (
            <>
              <ResultRed />
              <SessionsTable />
            </>
          )
        ) : (
          ""
        )}
      </div>
    );
  } else if (auth.isLoading || isLoadingUserData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-4xl font-semibold">Loading...</h1>
      </div>
    );
  } else {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-semibold mb-5">
            IVAO Tracker Hours Count
          </h1>
          <button
            className="bg-neutral-600 hover:bg-neutral-700 transition duration-200 py-2 px-2 rounded-md"
            onClick={() => auth.signinRedirect()}
          >
            Click here to login
          </button>
        </div>
      </div>
    );
  }
};

export default MainPage;

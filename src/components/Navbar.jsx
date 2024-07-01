import { publicName } from "../modules/utils/utils";
import { useAuth, useUser } from "../modules/auth";

const Navbar = () => {
  const auth = useAuth();
  const { user } = useUser();
  return (
    <div className="bg-zinc-700 my-5 rounded-xl flex justify-between align-center py-5 px-5">
      <p>Sesión iniciada como <a className="font-semibold" target="_blank" href={`https://ivao.aero/Member.aspx?ID=${user.id}`}>{publicName(user)}</a></p>
      <button className="bg-zinc-800 hover:text-zinc-800 hover:bg-zinc-300 transition-colors duration-300 py-1 px-2 rounded-md" onClick={() => auth.signoutRedirect()}>
        Logout
      </button>
    </div>
  );
};

export default Navbar;

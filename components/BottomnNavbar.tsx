import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMessage,
  faHome,
  faBell,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
// Bottom nav
const BottomNavbar = () => {
  return (
    <>
      <nav aria-label="bottom navbar" className="flex justify-center min-h-max">
        <div className="flex fixed bottom-8">
          <div className="px-10 text-2xl">
            <FontAwesomeIcon className="p-5 text-white" icon={faHome} />
          </div>
          <div className="px-10 text-2xl">
            <FontAwesomeIcon className="p-5 text-white" icon={faMessage} />
          </div>
          <div className="px-10 text-2xl">
            <div className="w-full border rounded-full bg-gradient-to-br from-purple to-pink">
            <FontAwesomeIcon
              className="p-5 text-white bg-fuchsia-500 rounded-full min-h-fit"
              icon={faPlus}
            />
            </div>
          </div>
          <div className="px-10 text-2xl">
            <FontAwesomeIcon className="p-5 text-white" icon={faBell} />
          </div>
          <div className="px-10 text-2xl">
            <FontAwesomeIcon className="p-5 text-white" icon={faUser} />
          </div>
        </div>
      </nav>
    </>
  );
};
export default BottomNavbar;

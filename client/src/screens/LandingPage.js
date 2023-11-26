import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { User } from "../utils/User";
import { UserService } from "../api/UserService";
import ShowParticles from "./particles";
import AddPersonForm from "./AddPersonForm";

const LandingPage = () => {
  const addPersonFormRef = useRef();
  const [userDetails, setUserDetails] = React.useState({});
  const isLoggedIn = !!User.getToken();

  React.useEffect(() => {
    if (isLoggedIn) {
      fetchUserDetails();
    }
  }, []);

  const fetchUserDetails = async () => {
    const response = await UserService.getUserDetails();
    setUserDetails(response.user);
  };

  const logoutUser = () => {
    User.clearToken();
    window.location.reload();
  };

  const scrollToForm = () => {
    addPersonFormRef.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* ... (existing code) ... */}
      <button
        className="p-4 mt-20 font-bold tracking-widest uppercase border-2 border-theme-secondary-500 text-theme-secondary-500 hover:bg-theme-secondary-500 hover:text-theme-primary-500"
        onClick={scrollToForm}
      >
        Hear about yourself
      </button>
      <div
        ref={addPersonFormRef}
        className="w-full gap-6 flex flex-col z-10 p-4 h-[75vh] justify-center items-center"
      >
        <AddPersonForm
          persons={userDetails.persons}
          type="add"
          onSuccess={(newPerson) =>
            setUserDetails((prev) => ({
              ...prev,
              persons: [...prev.persons, newPerson],
            }))
          }
        />
      </div>
    </>
  );
};

export default LandingPage;

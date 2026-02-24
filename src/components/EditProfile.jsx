import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { API_BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [fisrtName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState("");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [successToast, setSuccessToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        API_BASE_URL + "/profile/edit",
        {
          firstName: fisrtName,
          lastName: lastName,
          age: age,
          gender: gender,
          about: about,
          photoUrl: photoUrl,
        },
        {
          withCredentials: true,
        },
      );
      dispatch(addUser(res?.data?.data));
      setSuccessToast(true);
      // Handle success (e.g., show a success message or update the user state)
      setTimeout(() => {
        setSuccessToast(false);
      }, 3000);
    } catch (err) {
      setError(
        err?.response?.message || "Failed to update profile. Please try again.",
      );
    }
  };
  return (
    <>
      <div className="flex justify-center my-10">
        <div className="flex justify-center mx-10">
          <div className="card bg-base-300 w-96 shadow-sm">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <div>
                <label className="form-control w-full max-w-xs ">
                  <div className="label my-2">
                    <span className="label-text">First Name</span>
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                    value={fisrtName}
                    onChange={(e) => setFirstName(e.target.value)}
                  ></input>
                </label>
              </div>
              <div>
                <label className="form-control w-full max-w-xs ">
                  <div className="label my-2">
                    <span className="label-text">Last Name</span>
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  ></input>
                </label>
              </div>
              <div>
                <label className="form-control w-full max-w-xs ">
                  <div className="label my-2">
                    <span className="label-text">Age</span>
                  </div>
                  <input
                    type="number"
                    className="input input-bordered w-full max-w-xs"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  ></input>
                </label>
              </div>
              <div>
                <label className="form-control w-full max-w-xs ">
                  <div className="label my-2">
                    <span className="label-text">Gender</span>
                  </div>
                  <select
                    className="select select-bordered w-full max-w-xs"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </label>
              </div>

              <div>
                <label className="form-control w-full max-w-xs ">
                  <div className="label my-2">
                    <span className="label-text">About</span>
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                  ></input>
                </label>
              </div>

              <div>
                <label className="form-control w-full max-w-xs ">
                  <div className="label my-2">
                    <span className="label-text">Photo URL</span>
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  ></input>
                </label>
              </div>

              {error && <p className="text-red-500">{error}</p>}
              <div className="card-actions justify-center m-2">
                <button className="btn btn-primary" onClick={saveProfile}>
                  Update Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, photoUrl, age, gender, about }}
        />
      </div>

      {successToast && (
        <div className="toast">
          <div className="alert alert-info">
            <span>Profile updated successfully!</span>
          </div>
        </div>
      )}
    </>
  );
};
export default EditProfile;

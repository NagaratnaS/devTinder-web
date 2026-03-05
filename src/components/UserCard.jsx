import axios from "axios";
import { API_BASE_URL } from "../utils/constants";
import { removeUserFromFeed } from "../utils/feedSlice";
import { useDispatch } from "react-redux";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();

  const handleSendRequet = async (status, userId) => {
    try {
      const res = await axios.post(
        API_BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true },
      );
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };

  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img
          src={photoUrl || "https://placeimg.com/400/225/people"}
          alt="user photo"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {firstName} {lastName}
        </h2>
        {age && gender && (
          <p>
            {age} years old, {gender}
          </p>
        )}
        <p>{about}</p>
        <div className="card-actions justify-center my-4">
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequet("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleSendRequet("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;

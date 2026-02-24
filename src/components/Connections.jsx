import axios from "axios";
import { API_BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((state) => state.connections);
  const fetchConnections = async () => {
    try {
      const response = await axios.get(API_BASE_URL + "/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(response.data.data));
      console.log(response.data.data);
    } catch (err) {}
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) {
    return <h1 className="text-bold text-2xl">No Connections Found!!!!</h1>;
  }

  return (
    <div className="flex justify-center my-10 text-center">
      <h1 className="text-bold text-white text-3xl">Connections</h1>
      {connections.map((connection) => {
        const { firstName, lastName, photoUrl, age, gender, about } =
          connection;
        return (
          <div className=" flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto">
            <div>
              <img
                src={photoUrl}
                alt="photo"
                className="w-20 h-20 rounded-full"
              ></img>
            </div>
            <div className="text-left mx-4">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && (
                <p>
                  {age} years old, {gender}
                </p>
              )}
              <p>{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;

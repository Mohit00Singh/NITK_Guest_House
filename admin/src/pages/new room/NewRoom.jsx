import "./newRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import { useState } from "react";
import { roomInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NewRoom = () => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const { data, loading, error } = useFetch("/guesthouses"); //we need gh id first to fetch room
  const navigate = useNavigate();
  const [guesthouseId, setGuesthouseId] = useState("");
  useEffect(() => {
    if (data && data.length > 0) {
      setGuesthouseId(data[0]._id); // Set to the first guesthouse ID, change this logic based on your requirement
    }
  }, [data]);
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  console.log(data);
  const handleClick = async (e) => {
    e.preventDefault();
    const roomNumbers = rooms.split(",").map((room) => ({ number: room }));

    console.log("Guesthouse ID:", guesthouseId); // Log the guesthouseId

    try {
      setShowPopup(true);
      await axios.post(`/rooms/${guesthouseId}`, { ...info, roomNumbers });
      console.log(info);
      setShowPopup(false);
      navigate("/rooms");
    } catch (err) {
      console.log(err);
      setShowPopup(false);
    }

    console.log("Room Numbers:", roomNumbers); // Log room numbers
  };
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <div className="top">
          <h1>Add New Room</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {roomInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Rooms</label>
                <textarea
                  onChange={(e) => setRooms(e.target.value)}
                  placeholder="give comma between room numbers"
                ></textarea>
              </div>
              <div className="formInput">
                <label>Choose a Guest House</label>
                <select
                  name=""
                  id="guesthouseId"
                  onChange={(e) => {
                    setGuesthouseId(e.target.value);
                  }}
                >
                  {loading
                    ? "Loading Please Wait"
                    : data &&
                      data.map((guesthouse) => (
                        <option key={guesthouse._id} value={guesthouse._id}>
                          {guesthouse.name}
                        </option>
                      ))}
                </select>
              </div>

              <button onClick={handleClick}>Send</button>
            </form>
            {showPopup && (
              <div className="popup">
                <h3>Updating rooms...</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;

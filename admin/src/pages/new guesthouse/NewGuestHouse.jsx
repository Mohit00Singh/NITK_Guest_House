import "./newgh.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { GHInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const NewGuesthouse = () => {
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);
  const { data, loading, error } = useFetch("/rooms");
  const [showPopup, setShowPopup] = useState(false);
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const navigate = useNavigate();
  const handleSelect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRooms(value);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    let imageUrls = [];

    try {
      // Upload images
      setShowPopup(true);
      imageUrls = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");

          try {
            const uploadRes = await axios.post(
              "https://api.cloudinary.com/v1_1/dc3cwingo/image/upload",
              data
            );

            const { url } = uploadRes?.data;
            return url;
          } catch (uploadError) {
            console.error("Error uploading image:", uploadError);
            return null;
          }
        })
      );

      console.log("List of image URLs:", imageUrls);
      const newGH = {
        ...info,
        photo: imageUrls.filter((url) => url !== null), // Remove null entries
      };

      await axios.post("/guesthouses", newGH);
      setShowPopup(false);
      console.log("Guesthouse created successfully!");
      navigate("/guesthouses");
    } catch (err) {
      console.error("Error creating guesthouse:", err);
      setShowPopup(false);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <div className="top">
          <h1>Add new Guesthouse</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>

              {GHInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Featured</label>
                <select id="featured" onChange={handleChange}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
              <div className="formRooms">
                <label>Rooms</label>
                <select id="rooms" onChange={handleSelect}>
                  {loading ? (
                    <option value="" disabled>
                      Loading...
                    </option>
                  ) : (
                    <>
                      <option value="king">King Room</option>
                      <option value="normal">Normal Room</option>
                    </>
                  )}
                </select>
              </div>
              <button onClick={handleClick}>Send</button>
            </form>
            {showPopup && (
              <div className="popup">
                <h3>Updating data...</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewGuesthouse;

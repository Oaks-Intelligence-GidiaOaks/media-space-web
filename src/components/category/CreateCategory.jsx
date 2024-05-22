import React from "react";
import upload from "../../assets/upload.png";

const CreateCategory = () => {
  return (
    <div>
      <div className="flex items-center flex-col">
        <div>
          <h2>Create Category</h2>
        </div>
        <div>
          <img src={upload} alt="" />
        </div>
        <div>
          <label>Uploading file</label>
          <input type="file" />
        </div>
        <div>
          <label>Title</label>
          <input type="text" />
        </div>
        <div>
          <label>Visibility</label>
          <select>
            <option value="Private">Public</option>
            <option value="Public">Private</option>
          </select>
        </div>
        <div>
          <label>Category page link</label>
          <input type="text" />
        </div>
      </div>
      <div className="bg-gray-300 h-[100px] w-full"></div>
    </div>
  );
};

export default CreateCategory;

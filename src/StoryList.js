import React from "react";
import "./StoryList.css";
import Avatar from "@material-ui/core/Avatar";

function StoryList() {
  return (
    <div className="storyList">
      <div className="storyList__item">
        <div className="storyList__itemAvatar">
          <Avatar />
        </div>
      </div>

      <div className="storyList__item">
        <div className="storyList__itemAvatar">
          <Avatar />
        </div>
      </div>

      {/* <div className="storyList__item">
        <div className="storyList__itemAvatar">
          <Avatar />
        </div>
      </div> */}
    </div>
  );
}

export default StoryList;

import React from "react";
import "./StoryReel.css";
import Story from "./Story";

function StoryReel() {
  return (
    <div className="storyReel">
      <Story
        title="Sonny Sangha"
        image="https://source.unsplash.com/random"
        profileSrc="https://source.unsplash.com/X2YO8KFxgEM"
      />
      <Story
        title="Alvaro marota"
        image="https://source.unsplash.com/collection/190727"
        profileSrc="https://source.unsplash.com/u6E5q4gEq78"
      />

      <Story
        title="amin bmn"
        image="https://source.unsplash.com/user/jackie"
        profileSrc="https://source.unsplash.com/VVEwJJRRHgk"
      />

      <Story
        title="ebrahim kbn"
        image="https://source.unsplash.com/user/erondu"
        profileSrc="https://source.unsplash.com/wmbbbU0LUG8"
      />

      <Story
        title="Frankie"
        image="https://source.unsplash.com/6Lqs3YqNpPM"
        profileSrc="https://source.unsplash.com/XHVpWcr5grQ"
      />
    </div>
  );
}

export default StoryReel;

import React, { useState, useEffect } from "react";
import "./App.css";
import { useStateValue } from "./StateProvider";
import Post from "./Post";
import db, { auth } from "./firebase";
import SignInDialog from "./SignInDialog";
import Button from "@material-ui/core/Button";
import ImageUpload from "./ImageUpload";
import InstagramEmbed from "react-instagram-embed";
import SwipeableMobileStepper from "./SwipeableMobileStepper";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";

import TelegramIcon from "@material-ui/icons/Telegram";
import ExploreOutlinedIcon from "@material-ui/icons/ExploreOutlined";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import Avatar from "@material-ui/core/Avatar";
import StoryReel from "./StoryReel";
import StoryList from "./StoryList";
import SignOutDialog from "./SignOutDialog";
import AddPostDialog from "./AddPostDialog";

function App() {
  // const [{ user }, dispatch] = useStateValue();
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
    return () => {};
  }, []);
  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        //console.log(snapshot);
        setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      });
    return () => {};
  }, [user]);
  return (
    <div className="app">
      <div className="app__header">
        <div className="app__headerLeft">
          <img
            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
            alt=""
            className="app__headerImage"
          />
        </div>
        <div className="app__headerSearch">
          <SearchIcon />
          <input type="text" placeholder="Search" />
        </div>
        <div className="app__headerRight">
          {user ? (
            <>
              <HomeIcon />
              {user.displayName && (
                <AddPostDialog username={user.displayName} />
              )}
              <ExploreOutlinedIcon />
              <FavoriteBorderOutlinedIcon />
              <SignOutDialog user={user} />
              {/* <Avatar /> */}
            </>
          ) : (
            <SignInDialog />
          )}
        </div>
      </div>
      {/* 
      {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ) : (
        <h3>Sorry, you need login to upload</h3>
      )} */}

      <div className="app__posts">
        <div className="app__postsLeft">
          <StoryList />
          {posts?.map((post) => (
            <Post
              key={post.id}
              postId={post.id}
              avatar={post.avatar}
              user={user}
              username={post.username}
              imageUrl={post.imageUrl}
              caption={post.caption}
            />
          ))}
          {/* <Post
            avatar={prof}
            username={"cleverqazi"}
            imageUrl={bgImage}
            caption="let's build instagram clone, guys..."
          />
          <Post
            avatar={prof}
            username={"ebrahim.kbn"}
            imageUrl={"https://source.unsplash.com/random"}
            caption="let's build youtube clone, guys..."
          />

          <Post
            avatar={"https://source.unsplash.com/BmufR4r8pQ0"}
            username={"amin-bmn"}
            imageUrl={"https://source.unsplash.com/KBZDNWwupEc"}
            caption="let's build youtube clone, guys..."
          /> */}
        </div>
        <div className="app__postsRight">
          <InstagramEmbed
            url="https://instagram.com/p/B_uf9dmAGPw/"
            maxWidth={320}
            hideCaption={false}
            containerTagName="div"
            protocol=""
            injectScript
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
          />
        </div>
      </div>
      {/* <SwipeableMobileStepper tutorialSteps={tutorialSteps} /> */}
    </div>
  );
}

export default App;

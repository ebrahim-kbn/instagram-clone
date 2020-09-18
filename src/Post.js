import React, { forwardRef, useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import TelegramIcon from "@material-ui/icons/Telegram";

import FavoriteIcon from "@material-ui/icons/Favorite";
import PublishIcon from "@material-ui/icons/Publish";

import firebase from "firebase";

import "./Post.css";
import db from "./firebase";
import SwipeableMobileStepper from "./SwipeableMobileStepper";

const Post = ({ postId, avatar, username, imageUrl, caption, user }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    let unsubscribe;

    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(
            snapshot.docs.map((docComm) => ({
              id: docComm.id,
              ...docComm.data(),
            }))
          );
        });
    }

    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (e) => {
    e.preventDefault();
    db.collection("posts")
      .doc(postId)
      .collection("comments")
      .add({
        text: comment,
        username: user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((res) => {
        setComment("");
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <div className="post">
      <div className="post__header">
        <Avatar className="post__avatar" src={avatar} alt={username} />
        <h4>{username}</h4>
      </div>
      <SwipeableMobileStepper tutorialSteps={imageUrl} />
      {/* <img className="post__image" src={imageUrl} alt="" /> */}

      {/* <div className="post__footer">
        <div className="post__footerLeft">
          <FavoriteBorderIcon />
          <ChatBubbleOutlineOutlinedIcon />

          <TelegramIcon />
        </div>
        <div className="post__footerCenter">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot active"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
        <div className="post__footerRight">
          <BookmarkBorderIcon />
        </div>
      </div> */}

      <h4 className="post__text">
        <strong>{username}</strong> {caption}
      </h4>

      <div className="post__comments">
        {comments?.map((com) => (
          <p key={com.id}>
            <b>{com.username}</b> {com.text}
          </p>
        ))}
      </div>

      {user && (
        <form onSubmit={postComment} className="post__commentBox">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="post__input"
          />
          <button type="submit" className="post__button" disabled={!comment}>
            Post
          </button>
        </form>
      )}
    </div>
  );
};

export default Post;

import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { auth } from "./firebase";
import AddIcon from "@material-ui/icons/Add";
import { Input } from "@material-ui/core";
import db, { storage } from "./firebase";
import firebase from "firebase";

function AddPostDialog({ username }) {
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const changeHandler = (e) => {
    // if (e.target.files[0]) {
    //   setImage(e.target.files[0]);
    // }

    if (e.target.files.length > 0) {
      for (let i = 0; i < e.target.files.length; i++) {
        const newFile = e.target.files[i];
        // newFile["id"] = Math.random();
        // add an "id" property to each File object
        setFiles((prevState) => [...prevState, newFile]);
      }
    }
  };
  //   const submitHandler = (e) => {
  //     e.preventDefault();

  //     let promises = [];

  //     let urls = [];

  //     files.forEach((file) => {
  //       const uploadTask = storage.ref(`images/${file.name}`).put(file);
  //       promises.push(uploadTask);
  //       uploadTask.on(
  //         "state_changed",
  //         (snapshot) => {
  //           const percentage = Math.round(
  //             (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //           );
  //           setProgress(percentage);
  //         },
  //         (error) => {
  //           console.log(error);
  //           alert(error.message);
  //         },
  //         async (complete) => {
  //           const downloadURL = await storage
  //             .ref("images")
  //             .child(file.name)
  //             .getDownloadURL();
  //           urls.push(downloadURL);
  //         }
  //       );
  //     });

  //     Promise.all(promises)
  //       .then(() => {
  //         alert("All files uploaded");
  //         console.log("urls", urls);
  //         db.collection("posts")
  //           .add({
  //             timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  //             imageUrl: [...urls],
  //             caption,
  //             username,
  //           })
  //           .then(() => {
  //             setCaption("");
  //             setFiles([]);
  //             setProgress(0);
  //             handleClose();
  //           })
  //           .catch((err) => {
  //             alert(err.message);
  //           });
  //       })
  //       .catch((err) => console.log(err.code));
  //   };

  const submitHandler = async (e) => {
    e.preventDefault();

    const promises = files.map(async (file) => {
      const uploadTask = await storage.ref(`images/${file.name}`).put(file);

      return uploadTask.ref.getDownloadURL();
      // return uploadTask.ref("images").child(file.name).getDownloadURL();
    });
    const results = await Promise.all(promises);
    console.log("urls", results);
    db.collection("posts")
      .add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        imageUrl: results,
        username,
        caption,
      })
      .then(() => {
        //alert("post added successfully!!");
        setCaption("");
        setFiles([]);
        setProgress(0);
        handleClose();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <>
      <AddIcon onClick={handleClickOpen} />

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          <center>
            <img
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt=""
              className="app__headerImage"
            />
            <br />
            Add New Post
          </center>
        </DialogTitle>
        <form onSubmit={submitHandler}>
          <DialogContent>
            <DialogContentText>
              To add a new post, please select your images and enter a caption.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="caption"
              label="Caption"
              type="text"
              fullWidth
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
            <br />
            <br />

            <input
              type="file"
              name=""
              id=""
              onChange={changeHandler}
              multiple
            />
            <br />
            <br />

            <progress
              className="imageUpload__progress"
              value={progress}
              max="100"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Post
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default AddPostDialog;

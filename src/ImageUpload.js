import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import firebase from "firebase";

import "./ImageUpload.css";
import db, { storage } from "./firebase";

function ImageUpload({ username }) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);

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

  const handleUpload = (e) => {
    let promises = [];
    let urls = [];
    files.forEach((file) => {
      const uploadTask = storage.ref(`images/${file.name}`).put(file);
      promises.push(uploadTask);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percentage = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(percentage);
        },
        (error) => {
          console.log(error);
          alert(error.message);
        },
        async (complete) => {
          const downloadURL = await storage
            .ref("images")
            .child(file.name)
            .getDownloadURL();
          urls.push(downloadURL);
        }
      );
    });

    Promise.all(promises)
      .then(() => {
        alert("All files uploaded");
        db.collection("likes")
          .add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            imageUrls: urls,
            caption,
            username,
          })
          .then(() => {
            setCaption("");
            setImage(null);
            setProgress(0);
          })
          .catch((err) => {
            alert(err.message);
          });
      })
      .catch((err) => console.log(err.code));
  };

  // uploading multifile using async/await map

  // const handleUpload = async (e) => {
  //   const promises = files.map(async (file) => {
  //     const uploadTask = await storage.ref(`images/${file.name}`).put(file);

  //     return uploadTask.ref.getDownloadURL();
  //     // return uploadTask.ref("images").child(file.name).getDownloadURL();
  //   });
  //   const results = await Promise.all(promises);
  //   console.log("urls", results);
  //   db.collection("likes")
  //     .add({
  //       imageUrls: results,
  //     })
  //     .then(() => {
  //       alert("post added successfully!!");
  //     })
  //     .catch((err) => {
  //       alert(err.message);
  //     });
  // };

  // uploading single file
  // const handleUpload = (e) => {
  //   const uploadTask = storage.ref(`images/${image.name}`).put(image);
  //   uploadTask.on(
  //     "state_changed",
  //     (snapshot) => {
  //       const percentage = Math.round(
  //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //       );
  //       setProgress(percentage);
  //     },
  //     (error) => {
  //       console.log(error);
  //       alert(error.message);
  //     },
  //     (complete) => {
  //       storage
  //         .ref("images")
  //         .child(image.name)
  //         .getDownloadURL()
  //         .then((url) => {
  //           db.collection("posts")
  //             .add({
  //               timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  //               imageUrl: url,
  //               caption,
  //               username,
  //             })
  //             .then(() => {
  //               setCaption("");
  //               setImage(null);
  //               setProgress(0);
  //             })
  //             .catch((err) => {
  //               alert(err.message);
  //             });
  //         });
  //     }
  //   );
  // };

  return (
    <div className="imageUpload">
      ImageUpload
      <input
        type="text"
        name="caption"
        placeholder="Enter a caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <input type="file" name="" id="" onChange={changeHandler} multiple />
      <br />
      <progress className="imageUpload__progress" value={progress} max="100" />
      <br />
      <Button onClick={handleUpload} color="primary" variant="outlined">
        upload
      </Button>
    </div>
  );
}

export default ImageUpload;

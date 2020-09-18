import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import InboxIcon from "@material-ui/icons/Inbox";
import db, { auth, storage } from "./firebase";
import { useDropzone } from "react-dropzone";
import RootRef from "@material-ui/core/RootRef";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";

const MenuItemDropzone = React.forwardRef((props, ref) => {
  const onDropHandler = (files) => {
    console.log(files[0]);
    let image = files[0];
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      () => {},
      (error) => {
        console.log(error);
        alert(error.message);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            let currUser = auth.currentUser;
            currUser
              .updateProfile({ photoURL: url })

              .then(() => {
                console.log("profile updated");
              })
              .catch((err) => {
                alert(err.message);
              });
          });
      }
    );
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onDropHandler,
    accept: "image/*",
  });
  //const { ref, ...rootProps } = getRootProps();

  return (
    <RootRef rootRef={ref}>
      <MenuItem {...getRootProps()} style={{ paddingRight: "4rem" }}>
        <input {...getInputProps()} />
        <AddAPhotoIcon style={{ marginRight: "1rem" }} />
        Profile
      </MenuItem>
    </RootRef>
  );
});

function SignOutDialog({ user }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Avatar
        onClick={handleClick}
        aria-controls="simple-menu"
        aria-haspopup="true"
        src={user.photoURL}
      />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {/* <MenuItem onClick={handleClose} style={{ paddingRight: "4rem" }}>
          <InboxIcon style={{ marginRight: "1rem" }} /> Profile
        </MenuItem> */}
        <MenuItemDropzone />

        <MenuItem onClick={handleClose}>
          <InboxIcon style={{ marginRight: "1rem" }} /> Saved
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <InboxIcon style={{ marginRight: "1rem" }} /> Settings
        </MenuItem>
        <hr />
        <MenuItem onClick={() => auth.signOut()}> Logout</MenuItem>
      </Menu>
    </>
  );
}

export default SignOutDialog;

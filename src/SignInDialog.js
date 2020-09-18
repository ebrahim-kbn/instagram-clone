import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { auth } from "./firebase";

function SignInDialog() {
  const [open, setOpen] = useState(false);
  const [openIn, setOpenIn] = useState(false);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenIn = () => {
    setOpenIn(true);
  };

  const handleCloseIn = () => {
    setOpenIn(false);
  };

  const handleClickUp = () => {
    handleCloseIn();
    handleClickOpen();
  };
  const handleClickIn = () => {
    handleClose();
    handleClickOpenIn();
  };
  const submitHandler = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        res.user
          .updateProfile({ displayName: username })
          .then((result) => {
            console.log("result", result);
            setEmail("");
            setUsername("");
            setPassword("");
            handleClose();
          })
          .catch((error) => {
            alert(error.message);
          });
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log("signin", res);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpenIn}>
        SignIn
      </Button>

      <Dialog
        open={openIn}
        onClose={handleCloseIn}
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
            Sign In
          </center>
        </DialogTitle>
        <form onSubmit={signIn}>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClickUp} color="primary">
              Create Account
            </Button>
            <Button onClick={handleCloseIn} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Sign In
            </Button>
          </DialogActions>
        </form>
      </Dialog>

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
            Sign Up
          </center>
        </DialogTitle>
        <form onSubmit={submitHandler}>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="username"
              label="Username"
              type="text"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClickIn} color="primary">
              have an account?
            </Button>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Sign Up
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default SignInDialog;

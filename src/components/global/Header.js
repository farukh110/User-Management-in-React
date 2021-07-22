import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Backdrop from '@material-ui/core/Backdrop';
import { Fade, Modal } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      borderRadius: '5px',
      padding: theme.spacing(2, 4, 3),
      width: "400px"
    },
  }));

   const Header = () => {
    
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
      setOpen(true);
    };

      const handleClose = () => {
        setOpen(false);
      };

    let history = useHistory();  

    const [posts, setPosts] = useState({

      id: "",
      title: "",
      body: ""

    })  

    const { title, body } = posts;

    const onSubmit = async e => {

       e.preventDefault();
       await axios.post("http://localhost:3005/posts",posts);
      //  setPosts(posts.data);
      history.push("/");
    }

    const onInputChange = e => {

        setPosts({...posts, [e.target.name] : e.target.value});
    }

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Link to="/">
            <Typography variant="h6" className={classes.title}>
              Home
            </Typography> 
            </Link>
            <Button color="inherit" onClick={handleOpen}> Add Post </Button>
          </Toolbar>
        </AppBar>

        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            
            <form onSubmit={ e => onSubmit(e) }>

            <h2> Please Add Post </h2>

            <br />   

            <TextField
              id="title"
              label="Post Title"
              variant="outlined"
              name="title"
              value={title}
              fullWidth
              color="secondary"
              onChange={ e => onInputChange(e) }
            />

             <br /> <br /> 

            <TextField
              id="body"
              label="Post Description"
              variant="outlined"
              fullWidth
              multiline
              name="body"
              value={body}
              rows={5}
              color="secondary"
              onChange={ e => onInputChange(e) }
            /> 

            <br /> <br />

            <Button type="submit" variant="contained" color="primary">
              Add Post
            </Button>  

            </form>

          </div>
        </Fade>
      </Modal>
      </div>
    );
  }
  
  export default Header;
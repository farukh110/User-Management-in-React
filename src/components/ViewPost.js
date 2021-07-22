import React, { useState } from 'react';
import { Button, Container, Grid, makeStyles, Paper, TextField } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

const ViewPost = () => {

    const classes = useStyles();

    let history = useHistory();  

    const [posts, setPosts] = useState({

      id: "",
      title: "",
      body: ""

    })

    const { title, body } = posts;

    const { id } = useParams();

    useEffect(() => {
        
        loadPosts();

    }, []);

    const loadPosts = async () => {

        const result = await axios.get(`http://localhost:3005/posts/${id}`);
        // console.log(result.data);
        setPosts(result.data);
    }

    return (
        <div>
            <Container>
            <br /> <br />       
            <Grid container spacing={3}>
                <Grid item xs>
                
                </Grid>
                <Grid item xs={6}>
                <Paper className={classes.paper}>

                <form>

                    <h2> View Post </h2>

                    <br />   

                    <TextField
                    id="title"
                    label="Post Title"
                    variant="outlined"
                    name="title"
                    value={title}
                    fullWidth
                    disabled
                    color="secondary"
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
                    disabled
                    color="secondary"
                    /> 
                    </form>    

                </Paper>
                </Grid>
                <Grid item xs>
                
                </Grid>
            </Grid>

            </Container>
        </div>
    )
}

export default ViewPost;

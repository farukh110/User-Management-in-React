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

const EditPost = () => {

    const classes = useStyles();

    let history = useHistory();  

    const [posts, setPosts] = useState({

      id: "",
      title: "",
      body: ""

    })

    const { title, body } = posts;

    const { id } = useParams();

    const onSubmit = async e => {

       e.preventDefault();
       await axios.put(`http://localhost:3005/posts/${id}`,posts);
      //  setPosts(posts.data);
      history.push("/");
    }

    const onInputChange = e => {

        setPosts({...posts, [e.target.name] : e.target.value});
    }

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

                <form onSubmit={ e => onSubmit(e) }>

                    <h2> Edit Post </h2>

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
                    Update Post
                    </Button>  

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

export default EditPost;

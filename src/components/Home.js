import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
// import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Button, ButtonGroup, Container } from '@material-ui/core';
import axios from 'axios';
import { Link } from 'react-router-dom';

  const useStyles = makeStyles({
    root: {
      width: '100%',
      marginTop: '50px'
    },
    container: {
      maxHeight: 440,
    },
  });

export const Home = () => {

    const classes = useStyles();

    const [posts, setPosts] = useState([]);

    useEffect(() => {
  
        loadPosts();
        
    }, []);

    const loadPosts = async () => {

        const result = await axios.get("http://localhost:3005/posts");
        // console.log(result.data);
        setPosts(result.data);
    }

    const deletePost = async id => {
        
      await axios.delete(`http://localhost:3005/posts/${id}`);
        loadPosts();
    }
  
  return (

    <Container className="mt-md-5">

    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
                <TableCell>
                  User Id 
                </TableCell>

                <TableCell>
                  Id 
                </TableCell>

                <TableCell>
                  Post Title 
                </TableCell>

                <TableCell>
                  Post Description 
                </TableCell>

                <TableCell>
                  Actions 
                </TableCell>
            
            </TableRow>
          </TableHead>
          <TableBody>

                {
                    posts.map((post, index) => (

                        <TableRow hover role="checkbox" key={post.id} tabIndex={-1}>
                  
                        <TableCell>
                        { post.userId + index } 
                        </TableCell>

                        <TableCell>
                        { post.id } 
                        </TableCell>

                        <TableCell>
                        { post.title } 
                        </TableCell>

                        <TableCell>
                        { post.body } 
                        </TableCell>
                    
                        <TableCell>

                        <ButtonGroup>

                        <Link to={`/posts/view/${post.id}`}>
                        <Button variant="contained"> View </Button>
                        </Link>
                        <Link to={`/posts/edit/${post.id}`}>
                        <Button variant="contained" color="primary">
                        Edit   
                        </Button>
                        </Link>

                        <Button onClick={()=> deletePost(post.id)} variant="contained" color="primary">
                        Remove
                        </Button>

                        </ButtonGroup>
                        </TableCell>

                        </TableRow>                                
                    ))
                }

 
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        // count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </Paper>
    </Container>
  );
}

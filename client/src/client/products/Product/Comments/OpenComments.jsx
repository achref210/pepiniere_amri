import React, { useState } from 'react'
import { Grid, Divider, TextField, List, ListItemAvatar, ListItemText, Avatar, Rating, Card, CardContent, CardActions, Typography, IconButton, Link, Checkbox, FormGroup, FormControlLabel, AccordionActions, Button, ListItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import AnimatedText from 'react-animated-text-content';
import petal from "../../../../assets/icons/flower/iconflower_50x50.png";
import petal1 from "../../../../assets/icons/flower/iconflowertwo_50x50.png";
import onelove from "../../../../assets/icons/flower/onelove.png";
import twolove from "../../../../assets/icons/flower/twolove.png";
import threelove from "../../../../assets/icons/flower/threelove.png";
import fourlove from "../../../../assets/icons/flower/fourlove.png";
import fivelove from "../../../../assets/icons/flower/fivelove.png";

import { useDispatch } from "react-redux";
import { FcExpand } from "react-icons/fc";
import { FaCanadianMapleLeaf } from "react-icons/fa";

import ReactPaginate from "react-paginate";

import { addComment } from '../../../../actions/products';

const OpenComments = ({ product }) => {
    const StyledRating = styled(Rating)({
        '& .MuiRating-iconFilled': {
            color: '#4caf50',
        },
        '& .MuiRating-iconHover': {
            color: '#357a38',
        },
    });
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
    const dispatch = useDispatch();
    const [comment, setComment] = useState({
        client: `${user?.result.firstName} ${user?.result.lastName}`,
        email: `${user?.result.email}`,
        rating: 2.5,
        comment: ""
    })

    return (
        <div style={{marginTop: 40}}>
            <Divider ><Typography variant='h7'>Comments({product?.comments?.length})<br /></Typography></Divider>
            <Divider orientation="vertical" flexItem/>
            <StyledRating name="half-rating-read" onChange={(e) => setComment({ ...comment, rating: e.target.value })} defaultValue={comment.rating} size="small" icon={<Avatar sx={{ width: 24, height: 24 }} sizes='' src={petal} />} emptyIcon={<Avatar sx={{ width: 25, height: 25 }} sizes='' src={petal1} />} />
            <TextField
                fullWidth
                id="comment"
                label="Leave your comment..."
                multiline
                maxRows={4}
                variant="standard"
                value={comment.comment}
                onChange={(e) => setComment({ ...comment, comment: e.target.value })}
            /><Button onClick={() => dispatch(addComment(product._id, comment))}>submit</Button>
            <List
                sx={{
                    width: '100%',
                    maxWidth: 1000,
                    bgcolor: 'background.paper',
                    position: 'relative',
                    overflow: 'auto',
                    maxHeight: 130,
                    display: { selectedId: "none"},
                    '& ul': { padding: 0 },
                }}>
                 {product.comments.map((item)=>
                    <ListItem>
                    <ListItemAvatar>
                        {item.rating===1 && <Avatar alt="Profile Picture" src={onelove} />}
                        {item.rating===2 && <Avatar alt="Profile Picture" src={twolove} />}
                        {item.rating===3 && <Avatar alt="Profile Picture" src={threelove} />}
                        {item.rating===4 && <Avatar alt="Profile Picture" src={fourlove} />}
                        {item.rating===5 && <Avatar alt="Profile Picture" src={fivelove} />}
                    </ListItemAvatar>
                    <ListItemText primary={<><Typography noWrap> {item.client} </Typography></>} secondary={<Typography noWrap> {item.comment} </Typography>}/>
                    </ListItem>)}
                </List>
        </div>
    )
}

export default OpenComments
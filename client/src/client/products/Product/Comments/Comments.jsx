import React, { useEffect, useState } from 'react'
import { Grid, Divider, TextField, Accordion, AccordionSummary, AccordionDetails,Rating, Card, CardContent, CardActions, Typography, IconButton, Link, Checkbox, FormGroup, FormControlLabel, AccordionActions, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import AnimatedText from 'react-animated-text-content';

import { useDispatch} from "react-redux";
import { FcExpand } from "react-icons/fc";
import { FaCanadianMapleLeaf } from "react-icons/fa";

import ReactPaginate from "react-paginate";

import { addComment } from '../../../../actions/products';

const Comments = ({product}) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch(); 
  const [comment,setComment]=useState({
       client:`${user?.result.firstName} ${user?.result.lastName}`,
       email:`${user?.result.email}`,
        rating:2.5,
       comment:""
   })

   const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: '#4caf50',
    },
    '& .MuiRating-iconHover': {
      color: '#357a38',
    },
  });

   ///pagination
   const [pageNumber,setPageNumber] = useState(0);
   const articlesPerPage = 1
   const pagesVisited = pageNumber * articlesPerPage
   let displayArticles =null;
   displayArticles=product.comments?.slice(pagesVisited,pagesVisited+articlesPerPage).map(item => {
      return(
      <AccordionDetails>
      <h5>{item.client} <StyledRating name="half-rating-read" value={item.rating} defaultValue={""} size="small" icon={<FaCanadianMapleLeaf/>} emptyIcon={<FaCanadianMapleLeaf fontSize="inherit" /> } readOnly/></h5>
       <Typography>
       {item.comment}
       </Typography>
      </AccordionDetails>)
   })
   let pageCount = 0
   if(product.comments)
    pageCount = Math.ceil(product.comments.length/articlesPerPage)
   const changePage = ({selected}) => {
     setPageNumber(selected)
   }
   ///
   
  return (
    <Accordion>
        <AccordionSummary
          expandIcon={<FcExpand />}
          aria-controls="comments-content"
          id="comments-header"
        >
          <Typography>Comments({product?.comments?.length})</Typography>
        </AccordionSummary>
        {user && <>
        <AccordionActions>
            <StyledRating name="half-rating-read" onChange={(e)=>setComment({...comment,rating:e.target.value})} defaultValue={comment.rating} size="small" icon={<FaCanadianMapleLeaf/>} emptyIcon={<FaCanadianMapleLeaf fontSize="inherit" /> }/>
        </AccordionActions>
        <AccordionActions>
        <TextField
          fullWidth
          id="comment"
          label="comment"
          multiline
          maxRows={4}
          variant="standard"
          value={comment.comment}
          onChange={(e)=>setComment({...comment,comment:e.target.value})}
        /><Button onClick={()=>dispatch(addComment(product._id,comment))}>submit</Button>
        </AccordionActions></>}
        <Divider/>
        {product?.comments?.length ?
          (<Grid container>
          {displayArticles}
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            pageCount={pageCount}
            onPageChange={changePage}
            marginPagesDisplayed={0}
            pageRangeDisplayed={0}
            containerClassName={"paginationBttns1"}
            previousLinkClassName={"previousBttn"}
            nextLinkClassName={"nextLink"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive1"}
          />
        </Grid>):
                                <AnimatedText
                                type="words" // animate words or chars
                                animation={{
                                    x: '200px',
                                    y: '-20px',
                                    scale: 1.1,
                                    ease: 'ease-in-out',
                                }}
                                animationType="float"
                                interval={0.06}
                                duration={1}
                                tag="p"
                                className="animated-paragraph"
                                includeWhiteSpaces
                                threshold={0.1}
                                rootMargin="20%"
                            >
                                No Comments!
                            </AnimatedText>
        }
      </Accordion>
      
  )
}

export default Comments;


/*{product.comments.map((comment)=>{
          <AccordionDetails>
            <h5>achref smida<StyledRating name="half-rating-read" onChange={(e)=>setComment({...comment,rating:e.target.value})} defaultValue={comment.rating} size="small" icon={<FaCanadianMapleLeaf/>} emptyIcon={<FaCanadianMapleLeaf fontSize="inherit" /> } readOnly/></h5>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
        })}*/
import React, { useState, useEffect } from "react";
import {
  Pagination,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  AlertTitle,
  Snackbar,
  InputAdornment,
  Grid,
  Box,
  Link,
  IconButton,
  Skeleton,
  Container,
  CircularProgress,
  Tooltip
} from "@mui/material";
import demlogo from '../../../../../../assets/demlogo.png'
import { useTable, usePagination } from "react-table"
import { MdDeleteForever } from "react-icons/md";
import useStyles from "./styles";
import { createSaplingArticle, createSeedArticle, createMaterialArticle, updateSaplingArticle, updateSeedArticle, updateMaterialArticle, deleteSaplingArticle, deleteSeedArticle, deleteMaterialArticle } from "../../../../../../actions/suppliers.js"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Divider } from "@material-ui/core";
import { Navigate, useNavigate } from "react-router-dom";
import FileBase from "react-file-base64";

import { createIngineerRequest } from "../../../../../../actions/ingineerRequest";
import Stack from "@mui/material/Stack";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import ReactPaginate from "react-paginate";

//G
const SaplingsArticle = ({ supplier, alignment }) => {
  let data = null
  switch (alignment) {
    case "saplings":
      data = supplier.saplings;
      break;
    case "seeds":
      data = supplier.seeds;
      break;
    default:
      data = supplier.materials;
  }
  const classes = useStyles();
  const [create, setCreate] = useState(false);
  const [update, setUpdate] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [request, setRequest] = useState(false);
  const [validateRequest, setValidateRequest] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);

  function format(temp) {
    const date = new Date(temp);

    let day = String(date.getDate());
    let month = String(date.getMonth() + 1);
    let year = String(date.getFullYear());

    if (day < 10)
      day = "0" + day;
    if (month < 10)
      month = "0" + month;
    return (String(day + "-" + month + "-" + year))
  }

  useEffect(() => {
    setCurrentId(null)
    clear()
  }, [alignment])
  //pagination
  const articlesPerPage = 6
  const pagesVisited = pageNumber * articlesPerPage
  let displayArticles = null;
  if (data)
    displayArticles = data.slice(pagesVisited, pagesVisited + articlesPerPage).map(item => {
      return <>
        <Box sx={{ width: 210, marginRight: 0.5, my: 5 }}>
          {item.selectedFile ? (<>
            <Link underline="none" className={classes.link} onClick={() => { setArticleData(item); setRequest(false); setCurrentId(item._id) }} >

              <img
                style={{ width: 210, height: 120 }}
                alt={item.name}
                src={item.selectedFile}
              />
            </Link>
          </>
          ) : (
            <Skeleton variant="rectangular" width={210} height={118} />
          )}

          {item ? (
            <Box sx={{ pr: 2 }}>
              <Link underline="none" className={classes.link} onClick={() => { setArticleData(item); setRequest(false); setCurrentId(item._id) }} >
                <Typography gutterBottom variant="h7">
                  {item.name}
                </Typography>
                {(alignment==="seeds"||alignment==="saplings") && <Typography display="block" variant="body2" color="text.secondary">
                  from {item.origin}
                </Typography>}
                <Typography display="block" variant="body2" color="text.secondary">
                  by {item.price}dt
                </Typography>
                {(alignment==="seeds"||alignment==="saplings") && <Typography variant="body2" color="text.secondary">
                  {`•${format(item.releaseDate)}•`}
                </Typography>}
              </Link>
              <Tooltip title="request"><IconButton size='20px' onClick={() => { setArticleData(item); setRequest(true); setCurrentId(item._id) }} children={<img src={demlogo} alt="logo" />} /></Tooltip>
              <Tooltip title="remove"><IconButton onClick={() => {


                switch (alignment) {
                  case "saplings":
                    dispatch(deleteSaplingArticle(supplier._id, item._id))
                    break;
                  case "seeds":
                    dispatch(deleteSeedArticle(supplier._id, item._id))
                    break;
                  default:
                    dispatch(deleteMaterialArticle(supplier._id, item._id))
                }



                setDeleted(true)
              }} aria-label="close" color="primary">
                <MdDeleteForever size="20px" />
              </IconButton></Tooltip>
            </Box>
          ) : (
            <Link underline="none" className={classes.link} onClick={() => { setArticleData(item); setRequest(false); setCurrentId(item._id) }} >
              <Box sx={{ pt: 0.5 }}>
                <Skeleton /><Skeleton />
                <Skeleton width="60%" />
              </Box>
            </Link>
          )}
        </Box>
      </>
    })
  let pageCount = 0
  if (data)
    pageCount = Math.ceil(data.length / articlesPerPage)
  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }

  const navigate = useNavigate();

  const [articleData, setArticleData] = useState({
    name: "",
    origin: "",
    price: "",
    releaseDate: "",
    selectedFile: "",
    quantity: "",
    totalPrice: "",
    discount: "",
    netPrice: "",
  });

  const dispatch = useDispatch();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const { articleLoading } = useSelector((state) => state.suppliers);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId&&request) {
          dispatch(createIngineerRequest({name:articleData.name,origin:articleData.origin,price:articleData.price,releaseDate:articleData.releaseDate,totalPrice:articleData.totalPrice,netPrice:articleData.netPrice,discount:articleData.discount,quantity:articleData.quantity,selectedFile:articleData.selectedFile,ingineerName:`${user.result.firstName} ${user.result.lastName}`,supplier:supplier.name,supplierAdress:supplier.adress,supplierNumber:supplier.phoneNumber}));
          setValidateRequest(true);
      }
    else if (currentId) {
      switch (alignment) {
        case "saplings":
          dispatch(updateSaplingArticle(supplier._id, articleData));
          setUpdate(true);
          break;
        case "seeds":
          dispatch(updateSeedArticle(supplier._id, articleData));
          setUpdate(true);
          break;
        default:
          dispatch(updateMaterialArticle(supplier._id, articleData));
          setUpdate(true);
      }
    } else {
      switch (alignment) {
        case "saplings":
          dispatch(createSaplingArticle(supplier._id, articleData));
          setCreate(true);
          break;
        case "seeds":
          dispatch(createSeedArticle(supplier._id, articleData));
          setCreate(true);
          break;
        default:
          dispatch(createMaterialArticle(supplier._id, articleData));
          setCreate(true);
      }
    }
    clear();

  };
  const clear = () => {
    setCurrentId(null);
    setRequest(false);
    setArticleData({
      name: "",
      origin: "",
      price: "",
      releaseDate: "",
      quantity: "",
      totalPrice: "",
      discount: "",
      netPrice: "",
    });
  };

  const [releaseValue, setReleaseValue] = React.useState(
    new Date()
  );

  const handleReleaseChange = async (newValue) => {
    if (!request) {
      setReleaseValue(newValue);
      setArticleData({ ...articleData, releaseDate: newValue });
    }
  };
  console.log(alignment)

  return !articleLoading? (
    <>
      <Paper className={classes.paper}>
        <form
          autoComplete="off"
          noValidate
          className={`${classes.root} ${classes.form}`}
          onSubmit={handleSubmit}
        >
          <TextField
            name="name"
            variant="outlined"
            label="name"
            fullWidth
            value={articleData.name}
            onChange={(e) =>
            // to avoid overriding when we set next data we use ...SaplingData
            {
              if (!request)
                setArticleData({ ...articleData, name: e.target.value })
            }
            }
          />
          {(alignment==="seeds"||alignment==="saplings") && <TextField
            name="origin"
            variant="outlined"
            label="origin"
            fullWidth
            value={articleData.origin}
            onChange={(e) =>
            // to avoid overriding when we set next data we use ...SaplingData
            {
              if (!request)
                setArticleData({ ...articleData, origin: e.target.value })
            }
            }
          /> }
          <TextField
            name="price"
            variant="outlined"
            label="price"
            fullWidth
            value={articleData.price}
            onChange={(e) =>
            // to avoid overriding when we set next data we use ...SaplingData
            {
              if (!request)
                setArticleData({ ...articleData, price: e.target.value })
            }
            }
          />
          <div className={classes.fileInput}>
            <FileBase
              type="file"
              multiple={false}

              onDone={({ base64 }) => {
                if (!request)
                  setArticleData({ ...articleData, selectedFile: base64 })
              }
              }
            />
          </div>
          {(alignment==="seeds"||alignment==="saplings") &&<LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack className={classes.date}>
              <DesktopDatePicker

                label="Expiration Date"
                inputFormat="MM/dd/yyyy"
                value={releaseValue}
                onChange={handleReleaseChange}
                // to avoid overriding when we set next data we use ...plantationData
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>}

          {request && <Stack spacing={1}><TextField
            style={{ width: 100 }}
            name="quantity"
            variant="outlined"
            label="Quantity"
            fullWidth
            value={articleData.quantity}
            onChange={(e) =>
              // to avoid overriding when we set next data we use ...SaplingData
              setArticleData({ ...articleData, quantity: e.target.value, totalPrice: articleData.price * e.target.value })
            }
          />
            <TextField
              style={{ width: 100 }}
              name="totalPrice"
              variant="standard"
              label="Total Price"
              fullWidth
              value={articleData.totalPrice}
              InputProps={{
                readOnly: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <Typography color="primary"> dt</Typography>
                  </InputAdornment>
                ),
              }}
            /></Stack>
          }
          {request && <Stack spacing={1}><TextField
            style={{ width: 100 }}
            name="discount"
            variant="outlined"
            label="discount"
            fullWidth
            value={articleData.discount}
            onChange={(e) => {
              // to avoid overriding when we set next data we use ...SaplingData
              console.log(articleData.quantity !== undefined)
              if (articleData.quantity === undefined)
                setArticleData({ ...articleData, discount: "" })
              else if (articleData.quantity * articleData.price > e.target.value)
                setArticleData({ ...articleData, discount: e.target.value, netPrice: articleData.totalPrice - e.target.value })
              else setArticleData({ ...articleData, discount: articleData.quantity * articleData.price - 1, netPrice: 1 })
            }}
          />
            <TextField
              style={{ width: 100 }}
              name="netPrice"
              variant="standard"
              label="Net Price"
              fullWidth
              value={articleData.netPrice}
              InputProps={{
                readOnly: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <Typography color="primary">dt</Typography>
                  </InputAdornment>
                ),
              }}
            /></Stack>
          }

          <Stack spacing={1} className={classes.date}>

            <Button
              variant="contained"
              className={classes.buttonSubmit}
              color="primary"
              size="small"
              type="submit"
              fullWidth
            >
              <Typography variant="h7">
                {currentId ? request? "request": "EDIT" :"Add"} {alignment} Article
              </Typography>
            </Button>
            <Divider variant="middle" />
            <Button
              variant="contained"
              className={classes.buttonSubmit}
              color="secondary"
              size="small"
              onClick={clear}
              fullWidth
            >
              clear
            </Button></Stack>
          {create && (
            <Snackbar
              open={create}
              autoHideDuration={2000}
              onClose={() => setCreate(false)}
            >
              <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                The {alignment} Article was added — <strong>check it out!</strong>
              </Alert>
            </Snackbar>
          )}
          {validateRequest && (
            <Snackbar
              open={validateRequest}
              autoHideDuration={2000}
              onClose={() => setValidateRequest(false)}
            >
              <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                The {alignment} Request was added — <strong>check it out!</strong>
              </Alert>
            </Snackbar>
          )}
          {update && (
            <Snackbar
              open={update}
              autoHideDuration={5000}
              onClose={() => setUpdate(false)}
            >
              <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                The {alignment} Article was updated — <strong>check it out!</strong>
              </Alert>
            </Snackbar>
          )}
        </form>
      </Paper>
      {!data?.length ? (
        <Typography variant="h6" color="secondary">No Articles</Typography>)
        : (
          <Grid container>
            <ReactPaginate
              previousLabel={"prev"}
              nextLabel={"next"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"paginationBttns"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextLink"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
            />
            {displayArticles}

          </Grid>
        )}

      {deleted && (
        <Snackbar
          open={deleted}
          autoHideDuration={1000}
          onClose={() => setDeleted(false)}
        >
          <Alert severity="success">
            <AlertTitle></AlertTitle>
            Your {alignment} Article was deleted — <strong>check it out!</strong>
          </Alert>
        </Snackbar>
      )}
    </>
  ):(
    <Container maxwidth="lg">
      <br></br>
      <CircularProgress />
    </Container>
  ) ;
}
export default SaplingsArticle;
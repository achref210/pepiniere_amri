import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  AlertTitle,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Backdrop,
  Link,
  Autocomplete,
  Zoom
} from "@mui/material";
import useStyles from "./styles";
import { createPlan, updatePlan } from "../../../../actions/plans.js";
import FileBase from "react-file-base64";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteRow, updateCol, getRefBySearch, getSeedsBySearch } from "../../../../actions/seeds";
import { getMaterialsByFamily } from "../../../../actions/materials";
import { createSapling } from "../../../../actions/saplings";
import { useDispatch, connect } from "react-redux";
import { Divider } from "@material-ui/core";

const Form = ({ currentId, setCurrentId, seeds, materials }) => {
  //get user signed in
  const user = JSON.parse(localStorage.getItem("profile"));
  const navigate = useNavigate();
  const classes = useStyles();
  const [limit, setLimit] = useState();
  const [create, setCreate] = useState(false);
  const [update, setUpdate] = useState(false);
  const [found, setFound] = useState(true);
  const [quantity, setQuantity] = useState(0);
  const [max, setMax] = useState(0);
  const [reqs, setReqs] = useState([])
  let [result, setResult] = useState([])
  let requirements = []

  const [open, setOpen] = React.useState(false);
  const [passLimit, setPassLimit] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const [planData, setPlanData] = useState({
    creator: "",
    productToPlant: "",
    type: "",
    quantity: "",
    weight: "",
    employersNumber: "",
    description: "",
    requirements: "",
    details: "",
    disabled: "false",
  });

  const plan = useSelector((state) =>
    currentId ? state.plan.find((p) => p._id === currentId) : null
  );

  useEffect(() => {
    if (plan) {
      setPlanData(plan);
    }
  }, [plan]);

  const dispatch = useDispatch();



  /*const handleQuantity = (data) => {
    setQuantity(data)
    if(quantity)
    {
      setPlanData({...planData,quantity})
    }
  }
  */

  const handleChange = async (search) => {
    setFound(false)
    if (search.trim()) {
      dispatch(
        getSeedsBySearch({
          search,
          //details: details.join(',')}));
        }))
      let table = []
      for (let item in seeds.seeds)
        table.push({ label: seeds.seeds[item].name })
      setLabeledSeeds(table)
    }

    if (seeds.seeds[0].name === search) {
      setFound(true)
      search = seeds.seeds[0].name
      dispatch(getRefBySearch(search))
      setMax(seeds.seeds[0].stock[0].weight)
      setPlanData({ ...planData, type: seeds.seeds[0].type })
      if (seeds?.seeds[0]?.type !== "")
        dispatch(getMaterialsByFamily({ family: seeds.seeds[0].type }))
    }
    else {
      setUniqueLabeledSeeds([{ label: 'Enter name of your plantation' }])
    }
  }

  const [labeledSeeds, setLabeledSeeds] = useState([])
  const [uniqueLabeledSeeds, setUniqueLabeledSeeds] = useState([])

  const handleQuantity = (table, row, index, quantity) => {
    Object.assign(row, quantity)
    let somme = 0
    table?.map((item) => {
      if (item.name === row.name && item.dimention === row.dimention)
        somme += parseInt(item.quantity)
    })
    console.log(somme)
    let invSomme = 0
    table?.map((item, i) => {
      if (item.name === row.name && item.dimention === row.dimention && i !== index)
        invSomme += parseInt(item.quantity)
    })

    materials?.materials?.map((material) => {
      if (material.name === row.name)
        material?.stock?.map((item) => {

          if (somme > item.quantity && row.dimention === `${item.dimentionX}X${item.dimentionY}`) {
            if (item.quantity - invSomme >= 0) {
              Object.assign(row, { quantity: item.quantity - invSomme })
              setLimit(item.quantity)
              handleToggle()
            }
          }
        }
        )
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if ((seeds.seeds[0].category === "saplings"))
      dispatch(createSapling({ name: seeds.seeds[0].name, description: seeds.seeds[0].descriptions, selectedFile: seeds.seeds[0].selectedFile, type: seeds.seeds[0].type }, { supplier: seeds.seeds[0].stock[0].supplier, age: 0, length: 0, quantity: planData.quantity, price: planData.initialPrice }));
    else dispatch(createSapling({ name: seeds.seeds[0].name, description: seeds.seeds[0].descriptions, selectedFile: seeds.seeds[0].selectedFile, type: seeds.seeds[0].type }, { age: 0, length: 0, quantity, price: planData.initialPrice }));
    if (planData.quantity < seeds.seeds[0].quantity)
      dispatch(updateCol(seeds.seeds[0]._id, seeds.seeds[0].id, { key: "quantity", value: seeds.seeds[0].quantity - parseInt(planData.quantity) }));
    else dispatch(deleteRow(seeds.seeds[0]._id, seeds.seeds[0].id));

    if (currentId) {
      dispatch(
        updatePlan(currentId, {
          ...planData,
          creator: `${user?.result?.firstName} ${user?.result?.lastName}`,
        })
      );
      setUpdate(true);
    } else if (found) {
      dispatch(
        createPlan({
          ...planData,
          creator: `${user?.result?.firstName} ${user?.result?.lastName}`,
        })
      );
      setCreate(true);
    }
    clear();
    setTimeout(function () {
      setCurrentId(null);
    }, 1000);
  };

  if (!user?.result?.firstName) {
    return <div></div>;
  }

  const clear = () => {
    setCurrentId(null);
    setResult([])
    setReqs([])
    setPlanData({
      productToPlant: "",
      type: "",
      quantity: "",
      weight: "",
      employersNumber: "",
      description: "",
      requirements: "",
      details: "",
      disabled: "false",
    });
  };

  const mm = [{ name: "achref" }]

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">{currentId ? "EDIT" : "Add"} plan</Typography>
        <Autocomplete
          onChange={(e) => {
            handleChange(e.target.innerText)
          }}
          disablePortal
          getOptionLabel={(option) => option.label || ""}
          id="product-to-plant"
          options={labeledSeeds}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField
            name="productToPlant"
            label="Product To Plant"
            variant="outlined"
            value={planData.productToPlant}
            color={found ? "" : "warning"}
            {...params}
            fullWidth
            onChange={(e) => {
              setPlanData({ ...planData, productToPlant: e.target.value });
              handleChange(e.target.value);
            }}
          />}
        />
        <TextField
          name="type"
          variant="outlined"
          label="Type"
          fullWidth
          value={planData.type}
          onChange={(e) =>
            setPlanData({ ...planData, type: e.target.value })
          }
        />

        <TextField
          name="quantity"
          variant="outlined"
          label="Quantity"
          fullWidth
          value={planData.quantity}
          onChange={(e) => {
            if ((e.target.value / seeds?.refs[0].quantity) * seeds?.refs[0].weight > max) {
              alert("You reached the max")
              setPlanData({ ...planData, weight: max, quantity: (max / seeds?.refs[0].weight) * seeds?.refs[0].quantity })
            }
            else setPlanData({ ...planData, quantity: e.target.value, weight: (e.target.value / seeds?.refs[0].quantity) * seeds?.refs[0].weight })
          }
          }
        />
        <TextField
          name="weight"
          variant="outlined"
          label="Weight"
          fullWidth
          value={planData.weight}
          onChange={(e) => {
            if (e.target.value > max) {
              alert("You reached the max")
              setPlanData({ ...planData, weight: max, quantity: (max / seeds?.refs[0].weight) * seeds?.refs[0].quantity })
            }
            else setPlanData({ ...planData, weight: e.target.value, quantity: (e.target.value / seeds?.refs[0].weight) * seeds?.refs[0].quantity })
          }
          }
        />
        <Stack spacing={1} width="300px">
          <br></br>
          <FormControl fullWidth>
            <>
              <InputLabel id="label">Requirements</InputLabel>
              <Select
                labelId="select-label"
                id="simple-select"
                value={planData.requirements}
                label="requirements"
                onChange={(e) => {
                  requirements.push(e.target.value)
                  setReqs(reqs.concat(requirements))
                  setPlanData({
                    ...planData,
                    requirements: "",
                  })
                  /*onChange={(e) =>{
                    let inds=false
                    requirements.push(e.target.value)
                    reqs.forEach((subject)=>{if(e.target.value===subject) inds=true})
                    if(!inds)setReqs(reqs.concat(requirements))*/
                }}
              >
                <MenuItem value=""> <em>None</em> </MenuItem>
                {materials?.materials?.map((material) => (
                  <MenuItem value={material.name}>{material.name}</MenuItem>
                ))}
              </Select>
            </>
          </FormControl>
          {
            reqs?.map((item, index) => (
              <>
                <InputLabel id="label">{item}</InputLabel>
                <FormControl fullWidth>
                  <Stack direction="row" width="300px">
                    <select
                      className={classes.sel}
                      labelId="select-label"
                      id="simple-select"
                      label={item}
                      onChange={(e) => {
                        result[index] = { name: item, dimention: e.target.value }
                        setResult(result)
                      }}
                    >
                      {materials?.materials?.map((material) =>
                        material.name === item ? [
                          <option value="" />,
                          material?.stock?.map(choice => (
                            <option
                              key={`${choice.dimentionX}X${choice.dimentionY}`}
                              value={`${choice.dimentionX}X${choice.dimentionY}`}
                            >
                              {`${choice.dimentionX}X${choice.dimentionY}`}
                            </option>
                          )),
                        ] : [
                          <MenuItem value=""> <em>None</em> </MenuItem>,
                          material?.stock?.map((choice) => {
                            <MenuItem key={`${choice.dimentionX}X${choice.dimentionY}`}
                              value={`${choice.dimentionX}X${choice.dimentionY}`}>{`${choice.dimentionX}X${choice.dimentionY}`}</MenuItem>
                          })])}

                    </select>
                    <input
                      value={result[index]?.quantity}
                      onChange={(e) => {
                        if (result[index]?.name == item && result[index]?.dimention != "") {
                          handleQuantity(result, result[index], index, { quantity: e.target.value })
                        }
                        console.log(result[index])
                      }}></input></Stack>
                </FormControl>
              </>))
          }
          <br></br>
        </Stack>
        <TextField
          name="description"
          variant="outlined"
          label="Description"
          fullWidth
          value={planData.description}
          onChange={(e) =>
            // to avoid overriding when we set next data we use ...SaplingData
            setPlanData({ ...planData, description: e.target.value })
          }
        />
        <TextField
          name="details"
          variant="outlined"
          label="Details"
          fullWidth
          value={planData.details}
          onChange={(e) =>

            // to avoid overriding when we set next data we use ...SaplingData
            setPlanData({
              ...planData,
              details: e.target.value.split(","),
            })
          }
        />
        <Button
          variant="contained"
          className={classes.buttonSubmit}
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          submit
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
        </Button>

          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={handleClose}
          >
          </Backdrop>

          <Snackbar
            open={open}
          >
            <Alert severity="warning">
              <AlertTitle>your have only { limit } in your stock do you want to <Link onClick={()=>navigate("/")}>demande more</Link></AlertTitle>

            </Alert>
          </Snackbar>

          {create && (
            <Snackbar
              open={create}
              autoHideDuration={2000}
              onClose={() => setCreate(false)}
            >
              <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                The plan was added — <strong>check it out!</strong>
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
                The plan was updated — <strong>check it out!</strong>
              </Alert>
            </Snackbar>
          )}
      </form>
    </Paper>
  );
};

const mapStateToProps = (state) => {
  return {
    seeds: state.seeds,
    materials: state.materials
  }
}

export default connect(mapStateToProps)(Form);

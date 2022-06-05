import * as React from "react";
import { useEffect ,useState } from "react";
import { Button, Stack, Container, CircularProgress } from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  selectedIdsLookupSelector,
} from "@mui/x-data-grid";
import { deleteFertilizationRow, addFertilizationRow, updateFertilizationCol, getDefaultFertilizationPlan, updateDefaultFertilizationPlan, setDefaultFertilizationPlan, createDefaultFertilizationProduct, deleteDefaultFertilizationProduct } from "../../../actions/saplings";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import { color } from "@mui/system";
import { FcAddRow, FcDeleteRow } from "react-icons/fc";

const FertilizationGrid = ({sapling,fertilizationPlanIndex,defaultPlan,isLoading}) => {
  console.log("p",defaultPlan)
  const date = new Date();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showDefaultPlan, setShowDefaultPlan] = useState(false)
  const [selectedRowsId, setSelectedRowsId] = useState();
  const [selectedDefaultRowsId, setSelectedDefaultRowsId] = useState();

  let indexedDefaultPlan=[]

  let id=1
  defaultPlan.forEach((product)=>{
      id++
      indexedDefaultPlan.push({_id:product?._id,product:product?.product,addedAt:product?.addedAt,voieApplication:product?.voieApplication,dosesParApplication:product?.dosesParApplication,nombreApplication:product?.nombreApplication,periodeApplication:product?.periodeApplication,id})
  })

  const defaultRows = indexedDefaultPlan;

  let rows = []
  sapling.stock.forEach((obj) => {
    if (obj.id == fertilizationPlanIndex) {
      rows = obj.fertilizationPlan
    }


  });
  const handleRowEditCommit = React.useCallback((params) => {
    const id = params.id;
    const key = params.field;
    const value = params.value;
    dispatch(updateFertilizationCol(sapling._id, fertilizationPlanIndex, id, { key, value }));
  }, []);

  const handleDefaultRowEditCommit = React.useCallback((params) => {
    const id = params.id;
    const key = params.field;
    const value = params.value;
    dispatch(updateDefaultFertilizationPlan(defaultRows.filter(row=>row.id===id)[0]._id, { key, value }));
  }, []);

  let stock = null
  sapling.stock.forEach((obj) => {
    if (obj.id == fertilizationPlanIndex) {
      stock = obj;
    }
  })
    
  return isLoading ? (
    <Container maxwidth="lg">
      <br></br>
      <CircularProgress />
    </Container>
  ) : (
    !showDefaultPlan ?
      <div style={{ height: 100 + 52.5 * defaultRows.length, width: "100%" }}>
      <Stack
      direction="row"
      justifyContent="space-between"
    >
      <div>
        <Button
          onClick={() => {
            dispatch(createDefaultFertilizationProduct());
          }}
        >
          <FcAddRow />
          Add Row
        </Button>
        <Button
          onClick={() => {
            //console.log(selectedDefaultRowsId[0])
            //console.log(defaultRows.filter(row=>row.id===selectedDefaultRowsId[0])[0]._id)
            dispatch(deleteDefaultFertilizationProduct(defaultRows.filter(row=>row.id===selectedDefaultRowsId[0])[0]._id));
          }}
        >
          <FcDeleteRow />
          Delete Selected Row
        </Button>
      </div>
      <div>
        <Button
          onClick={() => {
            setShowDefaultPlan(!showDefaultPlan)
          }}
        >
          unshow default
        </Button>
      </div>
    </Stack>
        <DataGrid
          columns={[
            { field: "product", headerName: "Product", editable: true },
            {
              field: "voieApplication",
              headerName: "Voie d'Application",
              editable: true,
              type: "string",
              width: 150
            },
            {
              field: "dosesParApplication",
              headerName: "Doses par Application",
              valueFormatter: (params) => {
                const valueFormatted = Number(params.value||0).toLocaleString();
                return `${valueFormatted} doses`;
              },
              editable: true,
              width: 170
            },
            {
              field: "nombreApplication",
              headerName: "Nombre d'Application",
              valueFormatter: (params) => {
                const valueFormatted = Number(params.value||0).toLocaleString();
                return `${valueFormatted} applications`;
              },
              editable: true,
              width: 170
            },
            {
              field: "periodeApplication",
              headerName: "Periode d'Application",
              valueFormatter: (params) => {
                const valueFormatted = Number(params.value||0).toLocaleString();
                return `${valueFormatted} jours`;
              },
              editable: true,
              width: 200
            },
            {
              field: "addedAt",
              headerName: "Added At",
              editable: true,
              type: "date",
              height: 100,
              width: 170
            },

          ]}
          rows={defaultRows}
          onSelectionModelChange={(id) => {
            setSelectedDefaultRowsId(id);
          }}
          onCellEditCommit={handleDefaultRowEditCommit}
          autoHeight
        />
      </div>:
      <div style={{ height: 100 + 52.5 * rows.length, width: "100%" }}>
      <Stack
        direction="row"
        justifyContent="space-between"
      >
        <div>
          <Button
            onClick={() => {
              dispatch(addFertilizationRow(sapling._id, fertilizationPlanIndex));
            }}
          >
            <FcAddRow />
            Add Row
          </Button>
          <Button
            onClick={() => {
              dispatch(deleteFertilizationRow(sapling._id, fertilizationPlanIndex, selectedRowsId[0]));
            }}
          >
            <FcDeleteRow />
            Delete Selected Row
          </Button>
        </div>
        <div>
        <Button
          onClick={() => {
            dispatch(setDefaultFertilizationPlan(sapling._id, fertilizationPlanIndex))
          }}
        >
          set default
        </Button>
          <Button
            onClick={() => {
              dispatch(getDefaultFertilizationPlan());
              setShowDefaultPlan(!showDefaultPlan)
            }}
          >
            show default
          </Button>
        </div>
      </Stack>
      <DataGrid
        columns={[
          { field: "product", headerName: "Product", editable: true },
          {
            field: "voieApplication",
            headerName: "Voie d'Application",
            editable: true,
            type: "string",
            width: 150
          },
          {
            field: "dosesParApplication",
            headerName: "Doses par Application",
            valueFormatter: (params) => {
              const valueFormatted = Number(params.value).toLocaleString();
              return `${valueFormatted} doses`;
            },
            editable: true,
            width: 170
          },
          {
            field: "nombreApplication",
            headerName: "Nombre d'Application",
            valueFormatter: (params) => {
              const valueFormatted = Number(params.value).toLocaleString();
              return `${valueFormatted} applications`;
            },
            editable: true,
            width: 170
          },
          {
            field: "periodeApplication",
            headerName: "Periode d'Application",
            valueFormatter: (params) => {
              const valueFormatted = Number(params.value).toLocaleString();
              return `${valueFormatted} jours`;
            },
            editable: true,
            width: 200
          },
          {
            field: "addedAt",
            headerName: "Added At",
            editable: true,
            type: "date",
            height: 100,
            width: 170
          },

        ]}
        rows={rows}
        onSelectionModelChange={(id) => {
          setSelectedRowsId(id);
        }}
        onCellEditCommit={handleRowEditCommit}
        autoHeight
      />
    </div>

  );
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    defaultPlan: state.saplings.defaultPlan,
    isLoading: state.saplings.isLoading
  }
}

export default connect(mapStateToProps)(FertilizationGrid);
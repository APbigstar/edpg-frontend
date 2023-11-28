import * as React from 'react';
import { Box, useTheme } from "@mui/material";
import {
  DataGrid,
} from '@mui/x-data-grid';
import { useGetUsersQuery, useGetScoresQuery } from "state/api";
import { Header } from "components";
export default function Dashboard() {
  const theme = useTheme();
  const { data } = useGetScoresQuery();
  const [emptyRows, setEmptyRows] = React.useState([]);
  const [sigleRows, setSingleRows] = React.useState([]);
  const [multiRows, setMultiRows] = React.useState([]);
  const [transactionRows, setTransactionRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});

  React.useEffect(() => {
    let emptyData = []
    let singleData = []
    let multiData = []
    if (data) {
      data.map(item => {
        const rowData = {
          _id: item._id,
          name: item.user_id.name,
          type: item.type,
          category: item.category,
          score: item.score,
        };
        if (item.type === 'empty') {
          emptyData.push(rowData)
        } else if (item.type === 'single') {
          singleData.push(rowData)
        } else {
          multiData.push(rowData)
        }
      })
      setEmptyRows(emptyData);
      setSingleRows(singleData);
      setMultiRows(multiData);
    }
  }, [data]);

  const columns = [
    { field: 'name', headerName: 'Name', flex: 1 },
    {
      field: 'type',
      headerName: 'Type',
      flex: 1,
      align: 'left',
      headerAlign: 'left',
    },
    {
      field: 'category',
      headerName: 'Category',
      flex: 1,
      align: 'left',
      headerAlign: 'left',
    },
    {
      field: 'score',
      headerName: 'Score',
      flex: 1,
      align: 'right',
      headerAlign: 'right',
    },
  ];

  return (
    <Box sx={{ padding: "30px" }}>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "30px" }}>
        <Box sx={{ width: "49%" }}>
          <Header title="Testing Result" subtitle="Empty Filling" />
          <Box
            mt="40px"
            height="40vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme.palette.background.alt,
                color: theme.palette.secondary[100],
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme.palette.primary.light,
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: theme.palette.primary.light,
                color: theme.palette.secondary[100],
                borderTop: "none",
              },
              "& .MuiDataGrid-toolbarContainer .MuiButtom-text": {
                color: `${theme.palette.secondary[200]} !important`,
              },
            }}
          >
            <DataGrid
              getRowId={(row) => row._id}
              rows={emptyRows}
              columns={columns}
              editMode="row"
              rowModesModel={rowModesModel}
              onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
              onProcessRowUpdateError={(error) => {
              }}
              componentsProps={{
                toolbar: { setEmptyRows, setRowModesModel },
              }}
              experimentalFeatures={{ newEditingApi: true }}
            />
          </Box>
        </Box>
        <Box sx={{ width: "49%" }}>
          <Header title="Testing Result" subtitle="Single Choice" />
          <Box
            mt="40px"
            height="40vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme.palette.background.alt,
                color: theme.palette.secondary[100],
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme.palette.primary.light,
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: theme.palette.primary.light,
                color: theme.palette.secondary[100],
                borderTop: "none",
              },
              "& .MuiDataGrid-toolbarContainer .MuiButtom-text": {
                color: `${theme.palette.secondary[200]} !important`,
              },
            }}
          >
            <DataGrid
              getRowId={(row) => row._id}
              rows={sigleRows}
              columns={columns}
              editMode="row"
              rowModesModel={rowModesModel}
              onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
              onProcessRowUpdateError={(error) => {
              }}
              componentsProps={{
                toolbar: { setSingleRows, setRowModesModel },
              }}
              experimentalFeatures={{ newEditingApi: true }}
            />
          </Box>
        </Box>
      </Box>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ width: "49%" }}>
          <Header title="Testing Result" subtitle="Multi Choice" />
          <Box
            mt="40px"
            height="40vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme.palette.background.alt,
                color: theme.palette.secondary[100],
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme.palette.primary.light,
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: theme.palette.primary.light,
                color: theme.palette.secondary[100],
                borderTop: "none",
              },
              "& .MuiDataGrid-toolbarContainer .MuiButtom-text": {
                color: `${theme.palette.secondary[200]} !important`,
              },
            }}
          >
            <DataGrid
              getRowId={(row) => row._id}
              rows={multiRows}
              columns={columns}
              editMode="row"
              rowModesModel={rowModesModel}
              onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
              onProcessRowUpdateError={(error) => {
              }}
              componentsProps={{
                toolbar: { setMultiRows, setRowModesModel },
              }}
              experimentalFeatures={{ newEditingApi: true }}
            />
          </Box>
        </Box>
        <Box sx={{ width: "49%" }}>
          <Header title="Transactions" subtitle="List of Transactions" />
          <Box
            mt="40px"
            height="40vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme.palette.background.alt,
                color: theme.palette.secondary[100],
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme.palette.primary.light,
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: theme.palette.primary.light,
                color: theme.palette.secondary[100],
                borderTop: "none",
              },
              "& .MuiDataGrid-toolbarContainer .MuiButtom-text": {
                color: `${theme.palette.secondary[200]} !important`,
              },
            }}
          >
            <DataGrid
              getRowId={(row) => row._id}
              rows={transactionRows}
              columns={columns}
              editMode="row"
              rowModesModel={rowModesModel}
              onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
              onProcessRowUpdateError={(error) => {
              }}
              componentsProps={{
                toolbar: { setTransactionRows, setRowModesModel },
              }}
              experimentalFeatures={{ newEditingApi: true }}
            />
          </Box>
        </Box>
      </Box>
    </Box>

  );
}

import * as React from 'react';
import PropTypes from 'prop-types';
import { Box, useTheme } from "@mui/material";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
} from '@mui/x-data-grid';
import {
  randomId,
} from '@mui/x-data-grid-generator';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { useGetQuestionsQuery, useDeleteQuestionMutation, useUpdateQuestionMutation } from "state/api";

import { Header } from "components";

const types = { 'empty': 'Fill Empty', 'single': "Single Choice", 'multi': "Multi Choice" }
const categorys = {
  'html': 'HTML', 'css': "CSS", 'javascript': 'JavaScript'
}

function EditToolbar(props) {

  const { setRows, setRowModesModel, setType, setCategory } = props;

  const handleClick = () => {
    const _id = randomId();
    setRows((oldRows) => {
      return [...oldRows, { _id, question: '', answers: [], cases: [], isNew: true }];
    });
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [_id]: { mode: GridRowModes.Edit, fieldToFocus: 'question' },
    }));
  };

  const handleCategoryChange = (value) => {
    setCategory(value)
  }

  const handleTypeChange = (value) => {
    setType(value)
  }

  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "start", gap: "30px", marginBottom: "17px", }}>
      <Button variant="contained" color="primary" sx={{ color: "white", height: "50px" }} startIcon={<AddIcon />} onClick={handleClick}>
        Add Question
      </Button>
      <FormControl sx={{ width: "130px" }}>
        <InputLabel
          id="category-select-label"
          sx={{
            color: "white",
          }}
        >
          Category
        </InputLabel>
        <Select
          labelId="category-select-label"
          id="category-select"
          label="category"
          defaultValue={Object.keys(categorys)[0]}
          onChange={(event) => handleCategoryChange(event.target.value)}
          sx={{
            "&:before": {
              borderColor: "white",
            },
            "&:after": {
              borderColor: "white",
            },
            "&:not(.Mui-disabled):hover::before": {
              borderColor: "white",
            },
          }}
        >
          {Object.keys(categorys).map((value, index) => (
            <MenuItem key={index} value={value}>{categorys[value]}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ width: "130px" }}>
        <InputLabel
          id="type-select-label"
          sx={{
            color: "white",
          }}
        >
          Type
        </InputLabel>
        <Select
          labelId="type-select-label"
          id="type-select"
          label="type"
          onChange={(event) => handleTypeChange(event.target.value)}
          defaultValue={Object.keys(types)[0]}
          sx={{
            "&:before": {
              borderColor: "white",
            },
            "&:after": {
              borderColor: "white",
            },
            "&:not(.Mui-disabled):hover::before": {
              borderColor: "white",
            },
          }}
        >
          {Object.keys(types).map((value, index) => (
            <MenuItem key={index} value={value}>{types[value]}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

EditToolbar.propTypes = {
  setRowModesModel: PropTypes.func.isRequired,
  setRows: PropTypes.func.isRequired,
  setType: PropTypes.func.isRequired,
  setCategory: PropTypes.func.isRequired,
};


export default function Questions() {
  const theme = useTheme();
  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [category, setCategory] = React.useState('html');
  const [type, setType] = React.useState('empty');
  const { data, refetch } = useGetQuestionsQuery({ type, category });

  const [updateQuestionData] = useUpdateQuestionMutation();
  const [deleteQuestionData] = useDeleteQuestionMutation();

  React.useEffect(() => {
    refetch({ type, category });
  }, [type, category, refetch]);

  React.useEffect(() => {
    if (data) {
      setRows(data);
    }
  }, [data]);


  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => async () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => async () => {
    try {
      const { data } = await deleteQuestionData(id);
      if (data) {
        setRows((prevRows) => prevRows.filter((row) => row._id !== id));
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row._id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row._id !== id));
    }
  };

  const processRowUpdate = async (newRow) => {
    if (!newRow.question || !newRow.answers) {
      alert('Please fill in all fields.');
      return null;
    }

    // Check for words in answers that are not included in the question
    const invalidWords = newRow.answers.trim().split(",").filter(element => !newRow.question.includes(element.trim()));

    if (invalidWords.length > 0) {
      const beVerb = invalidWords.length === 1 ? 'is' : 'are';
      alert(invalidWords.join(", ") + " " + beVerb + ' invalid!');
      return null;
    }

    if (type === 'single') {
      if (newRow.answers.trim().split(",").length > 1) {
        alert('Please input only one valid word into Answers field')
        return null;
      }
    }

    let updatedRow;
    if (newRow.isNew === true) {
      updatedRow = { ...newRow, category, type };
    } else {
      updatedRow = { ...newRow, category, type, isNew: false };
    }

    const { data } = await updateQuestionData(updatedRow);
    if (data.data._id) {
      setRows(rows.map((row) => (row._id === newRow._id ? updatedRow : row)));
    }

    return updatedRow;
  };

  const columns = [
    { field: 'question', headerName: 'Question', flex: 1, editable: true },
    {
      field: 'answers',
      headerName: type === 'single' ? 'Answer' : type === 'empty' ? "Empty Words" : 'Answers',
      flex: 1,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 250,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  if (type !== 'empty') {
    columns.splice(2, 0, {
      field: 'cases',
      headerName: 'Cases',
      flex: 1,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    });
  }

  return (
    <Box m="1.5rem 2.5rem">
      {/* Header */}
      <Header title="Questions" subtitle="List of Questions" />

      {/* Content */}
      <Box
        mt="40px"
        height="75vh"
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
          rows={rows}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
          onRowEditStart={handleRowEditStart}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          onProcessRowUpdateError={(error) => {
            console.error('Error during row update:', error);
          }}
          components={{
            Toolbar: EditToolbar,
          }}
          componentsProps={{
            toolbar: { setRows, setRowModesModel, setCategory, setType },
          }}
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    </Box>
  );
}
import "./datatable.scss";

import axios from "axios";
import IconButton from "@mui/material/IconButton";
import {useContext, useEffect, useMemo, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import {Box} from "@mui/material";
import { useTheme } from "@emotion/react";

import { ColorModeContext, tokens } from "../../theme";
import { InputBase } from "@mui/material";
import {
  DataGrid,GridToolbar,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridActionsCell,
  GridActionsCellItem,
  GridRowModes,
  gridClasses,
} from "@mui/x-data-grid";

import {
  CancelOutlined,
  DeleteOutline,
  Delete,
  Edit,
  EditOutlined,
  Save,
} from "@mui/icons-material";
import Header from "../Header/Header";
import SearchBar from '@mkyy/mui-search-bar';

const Datatable = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext); 

    const [details, setDetails] = useState([]);
    const [value, setValue] =useState('');
    const [dataSource,setDataSource]=useState([])
    const [tableFilter,setTableFilter]=useState([])
    const [searchText, setSearchText] = useState("");

    const CustomToolbar = (props) => (
        <div>
          <GridToolbarContainer>
            <GridToolbarColumnsButton />
          </GridToolbarContainer>
          <SearchBar {...props} />
        </div>
      );

  useEffect(() => {
    axios
      .get("http://localhost:3000/orders")
      .then((response) => {
        setDetails(response.data);
        setDataSource(response.data)
      })

      .catch((error) => {
        console.log(error);
      });
  }, []);


  const requestSearch=(searchValue) => {
    const searchRegex = new RegExp(`.*${searchValue}.*`, "ig");
    const filteredRows=initialRows.filter((o) => {
        return Object.keys(o).some((k) => {
            return searchRegex.test(0[k].toLowerCase())
        })
    })
    setDetails(filteredRows)
  }

//   const filterData = (e) => {
//     const searchValue = e.target.value.toLowerCase().trim();

//     if (searchValue) {
//         const filteredData = dataSource.filter((row) =>
//             Object.values(row).some((fieldValue) =>
//                 fieldValue.toString().toLowerCase().includes(searchValue)
//             )
//         );
//         setTableFilter(filteredData);
//     } else {
//         setTableFilter([]);
//     }

//     setValue(searchValue);
// };



  // const handleEdit = (id) => {
  //     setEditId(id)
  //     console.log(editId)
  // }

  // const handleRowEditStart = (params, event) => {
  //     event.defaultMuiPrevented = true;
  //   };

  //   const handleRowEditStop = (params, event) => {
  //     event.defaultMuiPrevented = true;
  //   };

  //   const handleEditClick = (id) => {
  //     setEditId(id)
  //     console.log(id)
  //     setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  //   };

  //   const handleSaveClick = (id) => {
  //     setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  //   };

  //   const processRowUpdate = (newRow) => {
  //     const updatedRow = {...newRow, isNew:false};
  //     setDatas(datas.map((data) => (data.id === newRow.id ? updatedRow:data)))
  //     return updatedRow
  //   }

  //   const handleRowModesModelChange = (newRowModesModel) => {
  //     setRowModesModel(newRowModesModel);
  //   };

  const initialRows = useMemo(() => {
    const uniqueUsers = [];
    details.forEach((order) => {
        const user_details = JSON.parse(order.user_details); // Parse the user details string
        if (user_details != null) {
            const user = user_details[0]; // Assume there is only one user per order for simplicity
            const isDuplicate = uniqueUsers.some((u) => u.phone_no === user.mob); // Check if user already exists in the unique users array
            if (!isDuplicate) {
                uniqueUsers.push({
                    phone_no: user.mob,
                    full_name: user.fullName,
                    registration_num: user.registrationNum,
                    email: user.email,
                    course_name: user.courseName,
                    department_name: user.departmentName,
                    hostel_name: user.hostelName,
                    insta_id: user.instaId,
                    img: user.profilePic,
                });
            }
      }
    });
    return uniqueUsers.map((user, index) => ({ ...user, id: index + 1 })); // Add unique ID to each row
  }, [details]);

  const VISIBLE_FIELDS=['phone_no','full_name','registration_num','course_name','email','department_name','hostel_name']
  const columns = useMemo(
    () => [
        // details.columns.filter((column) => VISIBLE_FIELDS.includes(column.field)),[details.columns],
      { field: "phone_no", headerName: "PHONE NO", width: 150 },
      {
        field: "full_name",
        headerName: "FULL NAME",
        width: 230,
        editable: true,
        //   headerAlign: 'center',
        // align: 'center'
        renderCell: (params) => {
          return (
            <div className="cellWithImg">
              <img className="cellImg" src={params.row.img} alt="avatar" />
              {params.row.full_name}
            </div>
          );
        },
      },
      {
        field: "registration_num",
        headerName: "REGISTRATION NUMBER",
        width: 250,
        editable: true,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "email",
        headerName: "EMAIL",
        width: 250,
        editable: true,
        headerAlign: "center",
        align: "auto",
      },
      {
        field: "course_name",
        headerName: "COURSE NAME",
        width: 200,
        editable: true,
        align: "center",
        eaderAlign: "center",
      },
      {
        field: "department_name",
        headerName: "DEPARTMENT NAME",
        width: 200,
        editable: true,
      },
      {
        field: "hostel_name",
        headerName: "HOSTEL NAME",
        width: 200,
        editable: true,
      },
      {
        field: "insta_id",
        headerName: "INSTAGRAM ID",
        width: 200,
        editable: true,
      },
      // {
      //     field:"action", type:'actions', cellClassName: 'actions', headerName:"ACTIONS", width:200,disableColumnMenu: true,
      //     renderCell:(params) => {
      //         const isInEditMode=rowModesModel[params.row.id]?.mode === GridRowModes.Edit

      //         return(

      //             // (params.row.id)===editId?
      //             isInEditMode?

      //                     <div>
      //                         <IconButton className='saveButton'>savw</IconButton>
      //                     <IconButton className='cancelButton'>cancel</IconButton>
      //                     </div>

      //             :

      //             <div className='cellAction'>
      //                 <IconButton className='editButton' onClick={() => handleEditClick(params.row.id)}><Edit /></IconButton>
      //                 <IconButton className='deleteButton'
      //                 >
      //                     <Delete /></IconButton>
      //             </div>
      //         )
      //     }

      // },
    ],
    []
  );
  const cancelSearch = () => {
    setSearchText("");
    requestSearch(searchText);
  };

  return (
    <div>
      <div className="search">
        <Box
          display="flex"
          mb="10px"
         
          type="text"
          width="250px"
          
        //   value={value}
        //   onChange={filterData}
          ml="20px"
          justifyContent="end"
          backgroundColor={colors.lightgreen[100]}
          borderRadius="10px"
        >
          <InputBase
            sx={{ ml: 2, flex: 1, color: "black" }}
            placeholder="Search"
          />
          <IconButton type="button" sx={{ p: 1, color: "grey" }}>
            <SearchIcon />
          </IconButton>
        </Box>
      </div>
      <div className="datatable" style={{ height: 580, width: "100%" }}>
        <DataGrid

          sx={{
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "black",
              color: "white",
              fontSize: 16,
            },
          }}
          rows={initialRows}
          editMode="row"
          columns={columns}
        //   components={{ Toolbar: CustomToolbar }}
        //   componentsProps={{
        //     toolbar: {
        //       value: searchText,
        //       onChange: (searchVal) => requestSearch(searchVal),
        //       onCancelSearch: () => cancelSearch()
        //     }
        //   }}
          
          // onRowEditStart={handleRowEditStart}
          // onRowEditStop={handleRowEditStop}
          // onRowModesModelChange={handleRowModesModelChange}
          // processRowUpdate={processRowUpdate}
          // rowModesModel={rowModesModel}
          style={{ fontSize: "15px" }}
          rowHeight={80}
          headerHeight={80}
        //   initialState={{
        //     filter: {
        //       filterModel: {
        //         items: [],
        //         quickFilterValues: ['quick', 'filter'],
        //       },
        //     },
        //   }}
        />
      </div>
    </div>
  );
};

export default Datatable;

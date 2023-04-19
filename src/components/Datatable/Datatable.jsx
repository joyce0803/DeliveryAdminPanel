import "./datatable.scss";

import axios from "axios";
import IconButton from "@mui/material/IconButton";
import {useEffect, useMemo, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import {Box} from "@mui/material";
import { useTheme } from "@emotion/react";

import {tokens } from "../../theme";
import { InputBase } from "@mui/material";
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  
} from "@mui/x-data-grid";

import SearchBar from '@mkyy/mui-search-bar';

const Datatable = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [details, setDetails] = useState([]);
    const [searchText, setSearchText] = useState("");

 

  useEffect(() => {
    axios
      .get("https://caalm.shop/orders")
      .then((response) => {
        setDetails(response.data);
        
      })

      .catch((error) => {
        console.log(error);
      });
  }, []);





  const initialRows = useMemo(() => {
    const uniqueUsers = [];
    details.forEach((order) => {
        const user_details = JSON.parse(order.user_details); 
        if (user_details != null) {
            const user = user_details[0];
            const isDuplicate = uniqueUsers.some((u) => u.phone_no === user.mob); 
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
    return uniqueUsers.map((user, index) => ({ ...user, id: index + 1 }));
  }, [details]);

  const columns = useMemo(
    () => [
      { field: "phone_no", headerName: "PHONE NO", width: 150 },
      {
        field: "full_name",
        headerName: "FULL NAME",
        width: 230,
        editable: true,
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
  

  return (
    <div>
      <div className="search">
        <Box
          display="flex"
          mb="10px"
         
          type="text"
          width="250px"
 
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
     
          style={{ fontSize: "15px" }}
          rowHeight={80}
          headerHeight={80}
     
        />
      </div>
    </div>
  );
};

export default Datatable;

import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const Datatable = ({ columns }) => {
  const [list, setList] = useState();
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  //console.log(path)
  const { data, loading, error, reFetch } = useFetch(`/${path}`);
  console.log(data);
  // when list updates change the data
  useEffect(() => {
    setList(data);
  }, [data]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/${path}/${id}`);
      setList(list.filter((item) => item._id !== id));
    } catch (err) {
      // handle error
    }
  };

  const handleMakeAdmin = async (userId) => {
    try {
      await axios.put(`/users/${userId}/make-admin`);
      // You might want to refresh the user list after making the user an admin
      reFetch(); // Assuming you have a reFetch function to refetch the data
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveAdmin = async (userId) => {
    try {
      await axios.put(`/users/${userId}/remove-admin`);
      // You might want to refresh the user list after making the user an admin
      reFetch(); // Assuming you have a reFetch function to refetch the data
    } catch (error) {
      console.error(error);
    }
  };
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <button
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </button>
            {params.row.username !== undefined && !params.row.isAdmin ? (
              <button
                className="viewButton"
                onClick={() => handleMakeAdmin(params.row._id)}
              >
                Make Admin
              </button>
            ) : null}
            {params.row.username !== undefined && params.row.isAdmin ? (
              <button
                className="viewButton"
                onClick={() => handleRemoveAdmin(params.row._id)}
              >
                Remove Admin
              </button>
            ) : null}
          </div>
        );
      },
    },
  ];

  const columnsWithActionColumn = columns?.concat(actionColumn);

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New {path}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={columnsWithActionColumn}
        pageSize={9}
        rowsPerPageOptions={[9]}
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default Datatable;

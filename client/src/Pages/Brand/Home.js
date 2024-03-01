import React, { useEffect, useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import EditIcon from '@mui/icons-material/Edit';
import Table from 'react-bootstrap/Table';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import AdminHeader from '../AdminHeader';

const Home = () => {

  const navigate = useNavigate()
  const [list, setList] = useState([])
  const [search,setSearch] = useState("")
  const [anchorEl, setAnchorEl] = React.useState(null);


  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const addbrand = () => {
    navigate("/brand/add")
  }

  const getbrand = async () => {
    const res = await fetch(`/getbrand/?search=${search}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })

    const data = await res.json();
    if (res.status === 422 || !data) {
      console.log("error");
    } else {
      setList(data)
      //console.log(data);
    }
  }
  const deletebrand = async (id) => {

    console.log(id);
    const res2 = await fetch(`/deletebrand/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
    console.log("sohil",res2);

    const deletedata = await res2.json();
    console.log(deletedata);

    if (res2.status === 422 || !deletedata) {
      console.log("error");
    } else {
      console.log("brand deleted");
      getbrand();
    }

  }

  useEffect(() => {
    getbrand()
  },[search])
  return (
    
    <>
      <AdminHeader></AdminHeader> 
      <button style={{borderRadius: "5px", marginTop: "10px", padding: "5px", position: "absolute", right: "70px", border: "3px solid green"}} className='btn-success' onClick={addbrand}>Add Brand</button>
      <input type="search" class="form-control" id="datatable-search-input" placeholder='Search Brand' onChange={(e)=>setSearch(e.target.value)} style={{marginBottom:"2rem",maxWidth:"30rem",marginTop:"1rem"}}/>
      <div style={{ width: "80rem"}}>
       {

        list.length === 0 ?<>
          No Data Found
        </>:
        <>
           <Table striped bordered hover size="sm">
          <thead style={{textAlign: "center"}}>
            <tr>
              <th>#</th>
              <th>Brand Icon</th>
              <th>Brand Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>

            {
              list.map((item, index) => {
                return (
                  <tr style={{ textAlign: "center" }}>
                    <td>{index + 1}</td>
                    <td><img variant="top" style={{ width: "100px", textAlign: "center", margin: "auto", height: "100px" }} src={`/uploads/${item.imgpath}`} className='mt-2' /></td>
                    <td ><div style={{ marginTop: "2rem" }}>{item.brandName}</div></td>
                    <td>


                      <div style={{marginTop:"2rem"}}>
                      <DropdownButton id="dropdown" title={<MoreHorizIcon />}>
                        
                        <Dropdown.Item as="button"><NavLink to={`/editbrand/${item._id}`}>Edit</NavLink></Dropdown.Item>
                        <Dropdown.Item as="button"><NavLink onClick={() => deletebrand(item._id)} >Delete</NavLink></Dropdown.Item>
                        
                      </DropdownButton>
                      </div>
                    </td>

                  </tr>
                )
              })


            }
          </tbody>
        </Table>
        </>
       }

      </div>
    </>
  )
}

export default Home
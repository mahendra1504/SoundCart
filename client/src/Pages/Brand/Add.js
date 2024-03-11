import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import AdminHeader from '../AdminHeader';
import Button from 'react-bootstrap/Button';
import {useNavigate} from "react-router-dom";
import axios from "axios"
const Add = () => {

  const navigate = useNavigate();
  const [brandName, setBrandName] = useState("")
  const [brandNameError, setBrandNameError] = useState("")
  const [bimage, setBrandImage] = useState("")
  const [selectedIndex, setSelectedIndex] = useState("")
  const [bimageError, setBrandImageError] = useState("")
  const addInputData = async(e) => {
    e.preventDefault();

    console.log(brandName,bimage);
    let submit = true
        if (selectedIndex === "") {
            if (brandName === '') {
                setBrandNameError("Please Enter Brand Name")
                submit = false
            } else {
                setBrandNameError("")
                submit= true;
            }
            if(submit==true){
              var formData = new FormData();
              formData.append("photo",bimage);
              formData.append("brandName",brandName)
              console.log(formData);
              
                          const config = {
                            headers :{
                              "Content-Type" :"multipart/form-data"
                            }
                          }

              const api_call = await axios.post("/addbrand",formData,config);

              // console.log(api_call.status);
              if(api_call.status==422 || !api_call){
                  console.log("error");
              }else{
                setBrandName("")
                alert("done")
                navigate("/admin");
              }
            }
        }


  }
  return (

    <>
      <AdminHeader></AdminHeader>
      <form>

      <div style={{ width: "80%" }}>
        <Form style={{ marginLeft: "24rem", marginTop: "4rem", marginRight: "10rem" }}>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Brand Icon</Form.Label>
            <Form.Control type="file" onChange={(e) => setBrandImage(e.target.files[0])} placeholder="" name='photo'/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Brand Name</Form.Label>
            <Form.Control type="text" class="form-control" id="exampleInputUsername1" value={brandName} onChange={(e) => setBrandName(e.target.value)} placeholder="Enter Brand Name" name='brandName'/>
          </Form.Group>

          <Button variant="primary" style={{ width: "17rem", marginLeft: "8rem" }} onClick={addInputData}>Add</Button>{' '}

        </Form>

      </div>
  
      </form>
      
    </>

  )
}

export default Add
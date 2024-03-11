import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import AdminHeader from '../AdminHeader';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from "react-router-dom";
const Edit = () => {

  const navigate = useNavigate()
  const [brandName, setBrandName] = useState("")
  const [brandNameError, setBrandNameError] = useState("")
  const [selectedIndex, setSelectedIndex] = useState("")

  const { id } = useParams("");

  const getData = async () => {

    const res = await fetch(`/getbrand/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })

    const data = await res.json()
    console.log(data);
    if (res.status === 422 || !data) {
      console.log("error")
    } else {
      setBrandName(data.brandName)
    }
  }
  useEffect(() => {
    getData();
  }, [])

  const updatebrand = async (e) => {
    e.preventDefault();

    let submit = false;

    if (selectedIndex === "") {

      if (brandName == "") {
        submit = false;
        setBrandNameError("Enter Brand Name")
      } else {
        submit = true
        setBrandNameError("")
      }
    }
    if (submit == true) {
      console.log("Update Brand Submitted");
      const api = await fetch(`/updatebrand/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          brandName
        })
      })

      const datares = await api.json();
      console.log(datares);

      if (api.status == 422 || !datares) {
        alert("fill the data");
      } else {
        navigate("/brand")
        console.log("data added");
      }

    }
  }

  return (
    <>
      <AdminHeader></AdminHeader>
      <form>

        <div style={{ width: "80%" }}>
          <Form style={{ marginLeft: "24rem", marginTop: "4rem", marginRight: "10rem" }}>
            {/* <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Category Icon</Form.Label>
              <Form.Control type="file" onChange={(e) => setCategoryImage(e.target.files[0])} placeholder="" name='photo' />
            </Form.Group> */}
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Brand Name</Form.Label>
              <Form.Control type="text" class="form-control" value={brandName} onChange={(e) => setBrandName(e.target.value)} placeholder="Enter Brand Name" name='brandName' />
            </Form.Group>

            <Button variant="primary" style={{ width: "17rem", marginLeft: "8rem" }} onClick={updatebrand}>Update</Button>{' '}

          </Form>

        </div>

      </form>
    </>
  )
}

export default Edit
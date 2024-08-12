import axios from 'axios'
import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Field } from 'formik'
import { Form } from 'formik'

const Apidataget = () => {
    const [data, setdata] = useState([])
    let token = "l1720603152981xyj548886554es"
    const [editid, seteditid] = useState(null)
    const [initialValues, setInitialValues] = useState({
        title: '',
        date: '',
        description: ''
    })
    useEffect(() => {
        DataFetch()
    }, [])

    const handleData = (values, { resetForm }) => {

        if (editid != null) {
            axios.patch("https://service.apikeeda.com/api/v1/notes/" + editid, values, {
                headers: {
                    "x-apikeeda-key": token
                }
            })
                .then((res) => {
                    setdata(res.data.data)
                    DataFetch()
                    seteditid(null)
                    setInitialValues({
                        title: '',
                        date: '',
                        description: ''
                    })
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        else {
            axios.post("https://service.apikeeda.com/api/v1/notes", values, {
                headers: {
                    "x-apikeeda-key": token
                }
            })
                .then((res) => {
                    console.log("success")
                    DataFetch()
                    resetForm()
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }
    const editData = (values, id) => {
        setInitialValues({
            title: values.title,
            date: values.date,
            description: values.description
        })
        seteditid(id)
    }
    function DataFetch() {
        axios.get("https://service.apikeeda.com/api/v1/notes", {
            headers: {
                "x-apikeeda-key": token
            }
        })
            .then((res) => {
                setdata(res.data.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }
    const deletedata = (did) => {
        console.log(did)
        axios.delete("https://service.apikeeda.com/api/v1/notes/" + did, {
            headers: {
                "x-apikeeda-key": token
            }
        })
            .then((res) => {
                console.log('success')
                DataFetch()
            })
            .catch((error) => {
                console.log(error);
            })
    }
    return (
        <>
            <Formik
                initialValues={initialValues}
                onSubmit={handleData}>
                <Form>
                    <label htmlFor="">Title</label>
                    <Field type="text" name='title'></Field>
                    <label htmlFor="">Date</label>
                    <Field type="date" name='date'></Field>
                    <label htmlFor="">Description</label>
                    <Field type="text" name='description'></Field>
                    <button type="submit">Submit</button>
                </Form>
            </Formik>

            <table border={1}>
                <tr>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Description</th>
                    <th colSpan={2}>Operations</th>
                </tr>
                {
                    data.map((el, i) => (
                        <tr>
                            <td>{el.title}</td>
                            <td>{el.date}</td>
                            <td>{el.description}</td>
                            <td><button onClick={() => editData(el, el._id)}>Edit</button></td>
                            <td><button onClick={() => deletedata(el._id)}>Delete</button></td>
                        </tr>
                    ))
                }
            </table>
        </>
    )
}

export default Apidataget

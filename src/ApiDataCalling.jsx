import axios from 'axios'
import { Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'

const ApiDataCalling = () => {
    const [data, setdata] = useState([])
    const token = "c1720437947051ljm187013990bw"
    const [editID, seteditID] = useState(null)
    const [initialValues, setInitialValues] = useState({
        firstName: '',
        lastName: '',
        mobileNo: '',
        email: '',
        nickName: ''
    })

    useEffect(() => {
        DataFetch()
    }, [])

    const edit = (el, id) => {
        setInitialValues({
            firstName: el.firstName,
            lastName: el.lastName,
            mobileNo: el.mobileNo,
            email: el.email,
            nickName: el.nickName,
        })
        seteditID(id)
    }

    function DataFetch() {
        axios.get("https://service.apikeeda.com/api/v1/contact-book/", {
            headers: {
                "x-apikeeda-key": token,
            }
        })
            .then((res) => {
                // console.log(res)
                setdata(res.data.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }
    const handleData = (values, { resetForm }) => {
        if (editID != null) {
            console.log(values)
            axios.patch(`https://service.apikeeda.com/api/v1/contact-book/${editID}`, values, {
                headers: {
                    "x-apikeeda-key": token,
                }
            })
                .then((res) => {
                    console.log("success");
                    DataFetch()
                    seteditID(null)
                    setInitialValues({
                        firstName: '',
                        lastName: '',
                        mobileNo: '',
                        email: '',
                        nickName: ''
                    })
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        else {
            axios.post("https://service.apikeeda.com/api/v1/contact-book", values, {
                headers: {
                    "x-apikeeda-key": token,
                }
            })
                .then((res) => {
                    console.log("success");
                    DataFetch()
                    resetForm()
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }
    const deleted = (delid) => {
        console.log(delid);
        axios.delete("https://service.apikeeda.com/api/v1/contact-book/" + delid, {
            headers: {
                "x-apikeeda-key": token,
            }
        })
            .then((res) => {
                console.log("success");
                DataFetch()
            })
            .catch((error) => {
                console.log(error);
            })
    };
    return (
        <>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                onSubmit={handleData}
            >
                <Form>
                    <label>firstName</label>
                    <Field type="text" name='firstName'></Field>
                    <label>lastName</label>
                    <Field type="text" name='lastName'></Field>
                    <label>mobileNo</label>
                    <Field type="text" name='mobileNo'></Field>
                    <label>email</label>
                    <Field type="text" name='email'></Field>
                    <label>nickName</label>
                    <Field type="text" name='nickName'></Field>
                    <button type='submit'>Submit</button>
                </Form>
            </Formik>
            <table border={1}>
                <tr>
                    <th>FirstName</th>
                    <th>LastName</th>
                    <th>MobileNo</th>
                    <th>Email</th>
                    <th>NickName</th>
                    <th colSpan={2}>Operations</th>
                </tr>
                {
                    data.map((el, i) => (
                        <tr>
                            <td>{el.firstName}</td>
                            <td>{el.lastName}</td>
                            <td>{el.mobileNo}</td>
                            <td>{el.email}</td>
                            <td>{el.nickName}</td>
                            <td><button onClick={() => { edit(el, el._id) }}>Edit</button></td>
                            <td><button onClick={() => { deleted(el._id) }}>Delete</button></td>
                        </tr>
                    ))
                }
            </table>
        </>
    )
}
export default ApiDataCalling

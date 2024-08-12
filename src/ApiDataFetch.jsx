import axios from 'axios'
import { Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
const ApiDataFetch = () => {
    const [data, setdata] = useState([])
    const token = "c1720437947051ljm187013990bw"
    const [editID, seteditID] = useState(null)
    const [initialValues, setInitialValues] = useState({
        productName: '',
        weight: '',
        energy: '',
        protine: '',
        carbohydrate: '',
        fat: ''
    })

    useEffect(() => {
        DataFetch()
    }, [])

    const editdata = (values, id) => {
        setInitialValues({
            productName: values.productName,
            weight: values.weight,
            energy: values.energy,
            protine: values.protine,
            carbohydrate: values.carbohydrate,
            fat: values.fat
        })
        seteditID(id)
    }

    function DataFetch() {
        axios.get("https://service.apikeeda.com/api/v1/nutri-food", {
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
            axios.patch(`https://service.apikeeda.com/api/v1/nutri-food/${editID}`, values, {
                headers: {
                    "x-apikeeda-key": token,
                }
            })
                .then((res) => {
                    console.log("success");
                    DataFetch()
                    seteditID(null)
                    setInitialValues({
                        productName: '',
                        weight: '',
                        energy: '',
                        protine: '',
                        carbohydrate: '',
                        fat: ''
                    })
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        else {
            axios.post("https://service.apikeeda.com/api/v1/nutri-food", values, {
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
    const deletedata = (did) => {
        console.log(did);
        axios.delete("https://service.apikeeda.com/api/v1/nutri-food/" + did, {
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
                    <label htmlFor="productName">productName</label>
                    <Field type="text" name='productName'></Field>
                    <label htmlFor="weight">weight</label>
                    <Field type="text" name='weight'></Field>
                    <label htmlFor="energy">energy</label>
                    <Field type="text" name='energy'></Field>
                    <label htmlFor="protine">protein</label>
                    <Field type="text" name='protine'></Field>
                    <label htmlFor="carbohydrate">carbohydrate</label>
                    <Field type="text" name='carbohydrate'></Field>
                    <label htmlFor="fat">fat</label>
                    <Field type="text" name='fat' ></Field>
                    <button type='submit'>Submit</button>
                </Form>
            </Formik>
            <table border={1}>
                <tr>
                    <th>Id</th>
                    <th>productName</th>
                    <th>weight</th>
                    <th>energy</th>
                    <th>Protein</th>
                    <th>carbohydrate</th>
                    <th>fat</th>
                    <th colSpan={2}>Operations</th>
                </tr>
                {
                    data.map((el, i) => (
                        <tr>
                            <td>{el._id}</td>
                            <td>{el.productName}</td>
                            <td>{el.weight}</td>
                            <td>{el.energy}</td>
                            <td>{el.protine}</td>
                            <td>{el.carbohydrate}</td>
                            <td>{el.fat}</td>
                            <td><button onClick={() => { editdata(el, el._id) }}>Edit</button></td>
                            <td><button onClick={() => { deletedata(el._id) }}>Delete</button></td>
                        </tr>
                    ))
                }
            </table>
        </>
    )
}
export default ApiDataFetch

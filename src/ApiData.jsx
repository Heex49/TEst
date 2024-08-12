import axios from 'axios'
import { Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'

const ApiData = () => {
    const [data, setdata] = useState([])
    const token = "x1720436554242rge703524787fu"
    useEffect(() => {
        Demo()
    },[])
    function Demo () {
        axios.get('https://service.apikeeda.com/api/v1/notes',{
            headers : {
                "x-apikeeda-key" : token,
            }
        })
            .then((res) => {
                console.log(res)
                setdata(res.data.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleData = (values) => {
        axios.post('https://service.apikeeda.com/api/v1/notes',values,{
            headers : {
                "x-apikeeda-key" : token,
            }
        })
        .then((res) => {
            console.log("success");
            Demo()
        })
        .catch((error) => {
            console.log(error);
        })
    }  
    

    return (
        <>

        <Formik
            initialValues={{
                title : '',
                date : '',
                description : ''
            }}
            onSubmit={handleData}
        >
            <Form>
                Title<Field type="text" name="title"></Field> <br /><br />
                Date<Field type="date" name="date"></Field><br /><br />
                Descr<Field type="text" name="description"></Field><br /><br />
                <button type='submit'>Submit</button>
            </Form>
        </Formik>

            <table border={1}>
                <tr>
                    <th>Id</th>
                    <th>title</th>
                    <th>date</th>
                    <th>body</th>
                </tr>
                {
                    data.map((el,i)=>(
                        <tr>
                            <td>{el._id}</td>
                            <td>{el.title}</td>
                            <td>{el.date}</td>
                            <td>{el.description}</td>
                        </tr>
                    ))
                }
            </table>
        </>
    )
}

export default ApiData

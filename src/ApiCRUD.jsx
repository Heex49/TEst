import axios from 'axios'
import { Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { useEffect } from 'react'

const ApiCRUD = () => {

  const [data, setdata] = useState([])
  let token = "c1720690670586ght563125894uh"
  const [editID, seteditID] = useState(null)
  const [initialValues, setInitialValues] = useState({
    posterURL: '',
    movieName: '',
    runningTime: '',
    availableOn: '',
    movieType: '',
    imdbReview: ''
  })

  useEffect(() => {
    DataFetch()
  }, [])

  const handleData = (values, { resetForm }) => {
    if (editID != null) {
      axios.patch("https://service.apikeeda.com/api/v1/movie/" + editID, values, {
        headers: {
          "x-apikeeda-key": token
        }
      })
        .then((res) => {
          console.log("Success");
          DataFetch()
          seteditID(null)
          setInitialValues({
            posterURL: '',
            movieName: '',
            runningTime: '',
            availableOn: '',
            movieType: '',
            imdbReview: ''
          })
        })
        .catch((error) => {
          console.log(error);
        })
    } else {
      axios.post("https://service.apikeeda.com/api/v1/movie", values, {
        headers: {
          "x-apikeeda-key": token
        }
      })
        .then((res) => {
          console.log(values)
          DataFetch()
          resetForm()
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }

  function DataFetch() {
    axios.get("https://service.apikeeda.com/api/v1/movie", {
      headers: {
        "x-apikeeda-key": token
      }
    })
      .then((res) => {
        setdata(res.data.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const editdata = (el, index) => {
    console.log(initialValues);
    setInitialValues({
      posterURL: el.posterURL,
      movieName: el.movieName,
      runningTime: el.runningTime,
      availableOn: el.availableOn,
      movieType: el.movieType,
      imdbReview: el.imdbReview
    })
    seteditID(index)
  }

  const deletedata = (did) => {
    console.log(did);
    axios.delete("https://service.apikeeda.com/api/v1/movie/" + did, {
      headers: {
        "x-apikeeda-key": token
      }
    })
      .then((res) => {
        DataFetch()
      })
      .catch((error) => {
        console.log(error)
      })
  }
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={ initialValues } 
        onSubmit={handleData}
      >
        <Form>
          <label>PosterURL</label>
          <Field type="text" name="posterURL"></Field>
          <label>Movie Name</label>
          <Field type="text" name="movieName"></Field>
          <label>RunningTime</label>
          <Field type="text" name="runningTime"></Field>
          <label>AvailableOn</label>
          <Field type="text" name="availableOn"></Field>
          <label>MovieType</label>
          <Field type="text" name="movieType"></Field>
          <label>IMDB Review</label>
          <Field type="text" name="imdbReview"></Field>
          <button type='submit'>Submit</button>
        </Form>
      </Formik>

      <table border={1} style={{ marginTop: '50px' }}>
        <tr>
          <th>PosterURL</th>
          <th>Movie Name</th>
          <th>Running Time</th>
          <th>Avaible On</th>
          <th>Movie Type</th>
          <th>IMDB Review</th>
          <th colSpan={2}>Operartions</th>
        </tr>
        {
          data.map((el, i) => (
            <tr>
              <td>{el.posterURL}</td>
              <td>{el.movieName}</td>
              <td>{el.runningTime}</td>
              <td>{el.availableOn}</td>
              <td>{el.movieType}</td>
              <td>{el.imdbReview}</td>
              <td><button onClick={() => editdata(el, el._id)}>Edit</button></td>
              <td><button onClick={() => deletedata(el._id)}>Delete</button></td>
            </tr>
          ))
        }
      </table>
    </>
  )
}

export default ApiCRUD

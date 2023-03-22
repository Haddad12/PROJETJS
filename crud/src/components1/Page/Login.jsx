import React from 'react'
import { Formik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate();
    return (
        <div className='container mt-5 card'>
            <h1 className='text-success'>Login</h1>
            <div className='row  d-flex justify-content-center card-body'>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validate={values => {
                        const errors = {};
                        if (!values.email) {
                            errors.email = 'Email est obligatoire';
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = 'Votre Email Invalid';
                        }
                        if (!values.password) {
                            errors.password = 'Password est obligatoire';
                        } else if (
                            (values.password.length < 6)
                        ) {
                            errors.password = 'Votre Password Invalid';
                        }
                        return errors;
                    }}
                    onSubmit={async (values, { setSubmitting }) => {
                        const response = await axios.get("http://localhost:3000/users")
                        console.log(response)
                        const found = response.data.find((user) => values.email === user.email && values.password === user.password)
                        console.log(found)
                        if (found) {
                            navigate('/ajout')
                        } else {
                            alert('E-mail or password incorrect')
                        }
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        /* and other goodies */
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <label className='form-label'>Email :</label>
                            <input
                                type="email"
                                name="email"
                                className='form-control'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                            />
                            <p className='text-danger'>{errors.email && touched.email && errors.email}</p>

                            <label className='form-label'>Password :</label>
                            <input
                                type="password"
                                name="password"
                                className='form-control'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                            />
                            <p className='text-danger'>{errors.password && touched.password && errors.password}</p>

                            <button type="submit" className='btn btn-success w-100' disabled={isSubmitting}>
                                Login
                            </button>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default Login
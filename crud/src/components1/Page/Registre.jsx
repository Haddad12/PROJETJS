import React from 'react'
import { Formik } from 'formik'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Registre = () => {
    const navigate = useNavigate();
    return (
        <div className='container mt-5 card'>
            <h1 className='text-success'>Registre</h1>
            <div className='row  d-flex justify-content-center card-body'>
                <Formik
                    initialValues={{ nom: '', prenom: '', email: '', password: '' }}
                    validate={values => {
                        const errors = {};
                        if (!values.nom) {
                            errors.nom = 'Nom est obligatoire';
                        }
                        if (!values.prenom) {
                            errors.prenom = 'Prenom est obligatoire';
                        }
                        if (!values.email) {
                            errors.email = 'Email est obligatoire';
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = 'Votre Email est Invalid';
                        }
                        if (!values.password) {
                            errors.password = 'Password est obligatoire';
                        } else if (
                            (values.password.length < 6)
                        ) {
                            errors.password = 'Votre Password est Invalid';
                        }
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        axios.post("http://localhost:3000/users", values)
                        navigate("/login")
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
                            <label className='form-label'>Nom :</label>
                            <input
                                type="text"
                                name="nom"
                                className='form-control'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.nom} id="nom"
                            />
                            <p className='text-danger'>{errors.nom && touched.nom && errors.nom}</p>

                            <label className='form-label'>Prenom :</label>
                            <input
                                type="text"
                                name="prenom"
                                className='form-control'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.prenom} id="prenom"
                            />
                            <p className='text-danger'>{errors.prenom && touched.prenom && errors.prenom}</p>

                            <label className='form-label'>Email :</label>
                            <input
                                type="email"
                                name="email"
                                className='form-control'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email} id="email"
                            />
                            <p className='text-danger'>{errors.email && touched.email && errors.email}</p>

                            <label className='form-label'>Password :</label>
                            <input
                                type="password"
                                name="password"
                                className='form-control'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password} id="password"
                            />
                            <p className='text-danger'>{errors.password && touched.password && errors.password}</p>

                            <button type="submit" className='btn btn-success w-100' disabled={isSubmitting}>
                                Submit
                            </button>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default Registre
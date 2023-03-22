import React from 'react'
import { Formik } from 'formik'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Ajout = () => {
    const navigate = useNavigate();
    return (
        <div className='container mt-5 card'>
            <h1 className='text-success'>Ajout Product</h1>
            <div className='row  d-flex justify-content-center card-body'>
                <Formik
                    initialValues={{ nom: '', description: '', prix: '', quantite: '' }}
                    validate={values => {
                        const errors = {};
                        if (!values.nom) {
                            errors.nom = 'Ce champs est obligatoire';
                        }

                        if (!values.description) {
                            errors.description = 'Ce champs est obligatoire';
                        }

                        if (!values.prix) {
                            errors.prix = 'Ce champs est obligatoire';
                        } else if (values.prix <= 0) {
                            errors.prix = 'Le prix doit etre positive'
                        }

                        if (!values.quantite) {
                            errors.quantite = 'Ce champs est obligatoire';
                        } else if (values.quantite <= 0) {
                            errors.quantite = 'Le quantite doit etre positive'
                        }

                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        axios.post("http://localhost:3000/products", values)
                        navigate("/liste")

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

                            <label className='form-label'>Description :</label>
                            <textarea
                                type="text"
                                name="description"
                                className='form-control'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.description} id="description"
                            />
                            <p className='text-danger'>{errors.description && touched.description && errors.description}</p>

                            <label className='form-label'>Prix :</label>
                            <input
                                type="number"
                                name="prix"
                                className='form-control'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.prix} id="prix"
                            />
                            <p className='text-danger'>{errors.prix && touched.prix && errors.prix}</p>

                            <label className='form-label'>Quantite :</label>
                            <input
                                type="number"
                                name="quantite"
                                className='form-control'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.quantite} id="quantite"
                            />
                            <p className='text-danger'>{errors.quantite && touched.quantite && errors.quantite}</p>

                            <button type="submit" className='btn btn-success w-100' disabled={isSubmitting}>
                                Ajout
                            </button>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default Ajout;
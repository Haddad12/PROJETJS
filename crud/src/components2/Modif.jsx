import axios from 'axios';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'

function Modif() {
    const [product, setProduct] = useState({})
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get(`http://localhost:3000/products/${params.id}`)
            setProduct(response.data)
        }
        fetch()
    }, [params.id])

    return (
        <div className='container mt-5 card'>
            <h1 className='text-center text-success'>Update</h1>
            <div className="row  d-flex justify-content-center card-body">
                <Formik
                    initialValues={product || { nom: '', description: '', prix: '', quantite: '', }}
                    validate={values => {
                        const errors = {};
                        if (!values.nom) {
                            errors.nom = "Ce champs est obligatoire."
                        }
                        if (!values.description) {
                            errors.description = 'Ce champs est obligatoire.'
                        }
                        if (!values.prix) {
                            errors.prix = 'Ce champs est obligatoire.'
                        }
                        else if (values.prix <= 0) {
                            errors.prix = 'Le prix doit etre positive'
                        }
                        if (!values.quantite) {
                            errors.quantite = 'Ce champs est obligatoire.'
                        }
                        else if (values.quantite <= 0) {
                            errors.quantite = 'La quantite doit etre positif'
                        }
                        return errors;
                    }}

                    onSubmit={async (values, { setSubmitting }) => {

                        await axios.put(`http://localhost:3000/products/${params.id}`, values)
                        navigate('/liste')
                    }}
                    enableReinitialize
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                    }) => (
                        <form className='col-6' onSubmit={handleSubmit}>
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

                            <button className="btn btn-success w-100" type="submit" >
                                Submit
                            </button>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default Modif
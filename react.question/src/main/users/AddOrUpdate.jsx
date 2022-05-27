import React, { useEffect } from 'react';
import { Link, Navigate, useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { userService } from "../../_services/users/user.service";

function AddOrUpdate() {
    const { id } = useParams();
    const navigate = useNavigate();

    const isAddMode = !id;

    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .required('First Name is required'),
        lastName: Yup.string()
            .required('Last Name is required')
    });

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, reset, setValue, errors, formState } = useForm({
        resolver: yupResolver(validationSchema)
    });

    function onSubmit(data) {
        createUser(data);
    }

    function createUser(data) {
        data.userId = 0;
        userService.create(data);
        navigate('/users')
    }

    useEffect(() => {
        if (!isAddMode) {
            const fectchById = async () => {
                try {
                    const responseUser = await userService.getById(id);
                    const fields = ['userId', 'firstName', 'lastName'];
                    fields.forEach(field => setValue(field, responseUser[field]));
                } catch { }
            };
            fectchById();
        }
    });

    return (
        <div className="container">
            <div className="row mt-12">
                <div className="col-md-12">
                    <div className="title-header text-center">
                        <h4>{isAddMode ? 'Add User' : 'Edit User'}</h4>
                    </div>
                </div>
                <div className='col-md-12'>
                    <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
                        <input {...register("userId")} hidden />
                        <div className="form-row">
                            <div className="form-group col-12">
                                <label>First Name</label>
                                <input {...register("firstName")} name="firstName" type="text" className='form-control' />
                                <div className="invalid-feedback"></div>
                            </div>
                            <div className="form-group col-12">
                                <label>Last Name</label>
                                <input  {...register("lastName")} name="lastName" type="text" className='form-control' />
                                <div className="invalid-feedback"></div>
                            </div>
                        </div>
                        <div className="form-group text-right">
                            <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary">
                                {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                Save
                            </button>
                            <Link to={'/users'} className="btn btn-link">Cancel</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export { AddOrUpdate };

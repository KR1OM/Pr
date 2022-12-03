import React, { useState } from 'react'
import { useFormik } from "formik";
// import formImage from "../public/form.png";
import * as Yup from "yup";
import { useRouter } from 'next/router';
import { motion as m } from "framer-motion";
import axios from 'axios'
import { api } from '../../util/constant'
import Loader from '../components/loader'

export default function Form() {


    //Router
    const router = useRouter();


    //file data 
    const [isEng, setisEng] = useState(true)
    const [file, setFile] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [documentionType, setDocumentionType] = useState(false)

    const UplodeFiles = (json) => {
        const formData = new FormData();
        for (let i = 0; i < file.length; i++) { formData.append('files', file[i]) }
        formData.append('data', JSON.stringify(json))
        setIsLoading(true)
        axios.post(`${api}/form`, formData)
            .then(res => {
                setIsLoading(false)
                router.push({ pathname: `/form/success`, query: { isEng } })
            })
            .catch(e => {
                console.log(e);
                setIsLoading(false)
            })
    }

    //Formik logics
    const formik = useFormik({
        initialValues: {
            companyName: "",
            name: "",
            email: "",
            phoneNumber: "",
            telephoneNumber: "",
            formType: "Application form for obtaining a desalination license of a special nature",
        },

        //validate form

        validationSchema: Yup.object({
            companyName: Yup.string().max(30, `${isEng ? "Company Name must be  30 charracters or less" : "يجب ان يكون اسم الشركة ٣٠ حرف او أقل"}`).required(`${isEng ? "Company Name is required" : "يجب إدخال اسم الشركة"}`),
            name: Yup.string().max(40, `${isEng ? "Name must be  40 charracters or less" : "يجب ان يكون االإسم ٤٠ حرف او أقل"}`).required(`${isEng ? "Name is required" : "يجب إدخال الإسم"}`),
            email: Yup.string().email(`${isEng ? "Invalid ss email address" : "البريد الإلكتروني غير صحيح"}`).required(`${isEng ? "Email is required" : "يجب إدخال البريد الإلكتروني"}`),
            phoneNumber: Yup.string().max(8, `${isEng ? "Phone number must be 8 numbers" : "يجب أن يكون ٨ ارقام"}`).required(`${isEng ? "Phone number is required" : "يجب إدخال رقم الهاتف"}`),
            telephoneNumber: Yup.string().max(8, `${isEng ? "Phone number must be 8 numbers" : "يجب أن يكون ٨ ارقام"}`).required(`${isEng ? "office Number is required" : "يجب إدخال رقم هاتف المكتب"}`),

        }),

        //submit form
        onSubmit: (values) => {
            UplodeFiles(values)

        },
    });


    return (
        <>
            <Loader isLoading={isLoading} />
            <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bgcolors1"
            >
                <butten className="btn btn-info" onClick={() => { setisEng(prev => !prev) }}>{isEng ? 'عربي' : 'English'}</butten>
                <p className="h1 text-center p-3 fw-bold mt-3 mb-3"> {isEng ? "Application Forms" : "استمارة شكاوي"}</p>
                <div className="container col-md-6 p-3 p-3 form-container border shadow  rounded  position-relative  bg-light ">

                    <form onSubmit={formik.handleSubmit} className="">






                        {/*  Company Name input field */}
                        <div className="col-md-12 p-3">

                            <label
                                className={isEng ? `form-label fw-bold ${formik.touched.name && formik.errors.companyName ? "text-danger" : ""}`
                                    :
                                    `form-label fw-bold d-flex flex-row-reverse ${formik.touched.name && formik.errors.companyName ? "text-danger" : ""}`
                                }
                                htmlFor="Company Name">
                                {isEng ?
                                    (formik.touched.name && formik.errors.companyName ? formik.errors.companyName : "Company Name")
                                    :
                                    (formik.touched.name && formik.errors.companyName ? formik.errors.companyName : "اسم الشركة")
                                }

                            </label>
                            <input
                                className={isEng ? "form-control border border-success" : "form-control border border-success text-end"}
                                type="text"
                                name="companyName"
                                value={formik.values.companyName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}

                                placeholder={isEng ? " Enter your company name" : "أدخل اسم الشركة"} />
                        </div>



                        {/* Applier full Name input field */}
                        <div className="col-md-12 p-3">

                            <label

                                className={isEng ? `form-label fw-bold ${formik.touched.name && formik.errors.name ? "text-danger" : ""}`
                                    :
                                    `form-label fw-bold d-flex flex-row-reverse ${formik.touched.name && formik.errors.name ? "text-danger" : ""}`
                                }
                                htmlFor="Applier full name"
                            >
                                {isEng ?
                                    (formik.touched.name && formik.errors.name ? formik.errors.name : "Applier full name")
                                    :
                                    (formik.touched.name && formik.errors.name ? formik.errors.name : " اسم مقدم الطلب الكامل")
                                }
                            </label>
                            <input
                                className={isEng ? "form-control border border-success" : "form-control border border-success text-end"}
                                type="text"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder={isEng ? "  Enter full name" : "أدخل الإسم الكامل"} />
                        </div>



                        {/* Email input field */}
                        <div className="col-md-12 p-3 ">

                            <label className={isEng ? `form-label fw-bold ${formik.touched.email && formik.errors.email ? "text-danger" : ""}`
                                :
                                `form-label fw-bold d-flex flex-row-reverse ${formik.touched.email && formik.errors.email ? "text-danger" : ""}`}
                                htmlFor="Email">
                                {isEng ?
                                    (formik.touched.email && formik.errors.email ? formik.errors.email : "Email")
                                    :
                                    (formik.touched.email && formik.errors.email ? formik.errors.email : "البريد الإلكتروني")
                                }
                            </label>
                            <input
                                className={isEng ? "form-control border border-success" : "form-control border border-success text-end"}
                                type="email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder={isEng ? " Enter your email" : "أدخل البريد الالكتروني"} />

                        </div>
                        {/* number input field */}
                        <div className="col-md-12 p-3 ">

                            <label
                                className={isEng ? `form-label fw-bold ${formik.touched.phoneNumber && formik.errors.phoneNumber ? "text-danger" : ""}`
                                    :
                                    `form-label fw-bold d-flex flex-row-reverse ${formik.touched.phoneNumber && formik.errors.phoneNumber ? "text-danger" : ""}`}
                                htmlFor="phone number">


                                {isEng ?
                                    (formik.touched.phoneNumber && formik.errors.phoneNumber ? formik.errors.phoneNumber : "Phone number")
                                    :
                                    (formik.touched.phoneNumber && formik.errors.phoneNumber ? formik.errors.phoneNumber : "رقم الهاتف")
                                }


                            </label>
                            <input
                                className={isEng ? "form-control border border-success" : "form-control border border-success text-end"}
                                type="phonenumber"
                                name="phoneNumber"
                                value={formik.values.phoneNumber}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder={isEng ? "  Enter your phone number" : " أدخل رقم الهاتف"} />

                        </div>
                        {/* office number input field */}
                        <div className="col-md-12 p-3 ">

                            <label className={isEng ? `form-label fw-bold ${formik.touched.telephoneNumber && formik.errors.telephoneNumber ? "text-danger" : ""}`
                                :
                                `form-label fw-bold d-flex flex-row-reverse ${formik.touched.telephoneNumber && formik.errors.telephoneNumber ? "text-danger" : ""}`
                            }
                                htmlFor="office Number">

                                {isEng ?
                                    (formik.touched.telephoneNumber && formik.errors.telephoneNumber ? formik.errors.telephoneNumber : "office Number")
                                    :
                                    (formik.touched.telephoneNumber && formik.errors.telephoneNumber ? formik.errors.telephoneNumber : "رقم هاتف المكتب")
                                }


                            </label>
                            <input
                                className={isEng ? "form-control border border-success" : "form-control border border-success text-end"}
                                type="phonenumber"
                                name="telephoneNumber"
                                value={formik.values.telephoneNumber}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder={isEng ? "  Enter your Contact office Number" : "أدخل رقم هاتف المكتب"} />

                        </div>



                        {/* Form Type select field */}
                        <div className="col-md-12 p-3  ">



                            <label className={isEng ? `form-label fw-bold`
                                :
                                `form-label fw-bold d-flex flex-row-reverse`
                            } htmlFor="formType">
                                {isEng ? "Application Form Type" : "نوع الاستمارة"}

                            </label>
                            <select
                                name="formType"
                                value={formik.values.formType}
                                onChange={formik.handleChange}
                                className={isEng ? "form-select border border-success" : "form-select border border-success text-end"}>

                                <option selected value="0"> {isEng ? "select Application form" : ""} </option>
                                <option value="Application form for obtaining a desalination license of a special nature"> {isEng ? "Application form for obtaining a desalination license of a special nature" : "إستمارة طلب الحصول على رخصة تحلية مياه ذات طبيعة خاصة"}</option>
                                <option value="Application Form for Exemption Order"> {isEng ? "Application Form for Exemption Order" : "إستمارة طلب الحصول على الاعفاء"}</option>
                                <option value="Application Form for Generation and Desalination Licence"> {isEng ? "Application Form for Generation and Desalination Licence" : "استمارة طلب الحصول على رخصة توليد الكهرباء"}</option>
                                <option value="Application Form for Transmission and Dispatch, Distribution and Supply, Import and Export, International Interconnection">  {isEng ? "Application Form for Transmission and Dispatch, Distribution and Supply, Import and Export, International Interconnection" : "استمارة طلب الحصول على رخصة طلب النقل وتشغيل نظام تحكم المركزي"}</option>
                                <option value="Application Form for Generation Licence">  {isEng ? "Application Form for Generation Licence" : "استمارة طلب الحصول على رخصة توليد الكهرباء وتحلية المياه المرتبطة بها"}</option>
                                <option value="Application Form for Temporary Generation Licence Exemption"> {isEng ? "Application Form for Temporary Generation Licence Exemption" : "استمارة طلب الحصول على رخصة التوزيع والتزويد بالكهرباء"}</option>
                                <option value="Application Form for Approval for Change of Control"> {isEng ? "Application Form for Approval for Change of Control" : "استمارة طلب الحصول على الموافقة بتغيير السيطرة في أسهم الشركة المرخص لها"}</option>
                                <option value="Application Form for Article (106) Consent"> {isEng ? "Application Form for Article (106) Consent" : "استمارة طلب موافقة الهيئة (106)"}</option>

                            </select>
                        </div>






                        {formik.values.formType != 0 ?
                            <a href={`${api}/form/public/${formik.values.formType}.pdf`} target="_blank" rel="noopener">
                                {isEng ? "Download Documentation" : "تنزيل ملف متطلبات الاستمار"}
                            </a>
                            : null}





                        {/* files input field */}
                        <div className="col-md-12  p-3">
                            <label className={isEng ? `form-label fw-bold `
                                :
                                `form-label fw-bold d-flex flex-row-reverse `
                            } htmlFor="formType">
                                {isEng ? "   Uplode your application form files here" : "حمل متطلبات الاستمار هنا"}
                            </label>
                            <input
                                className="form-control border border-success"
                                type="file"
                                name="file"
                                onChange={(e) => { setFile(e.target.files) }}
                                onBlur={formik.handleBlur}
                                multiple />
                        </div>



                        {/* Terms input field */}
                        <div className="col-md-6 p-3 ">


                        </div>

                        {/* Submit */}

                        <div className="col-md-12 text-center ">

                            <button
                                type="submit"
                                className="col-md-5 shadow btn-lg btn btn-info fw-bold rounded">
                                {isEng ? "Submit" : "إرسال"}

                            </button>
                        </div>




                    </form>
                </div >
            </m.div >
        </>
    )
}

import React, { useState, useEffect } from "react";
import {
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
    Card,
    Button,
    CardTitle,
    CardText,
    Container,
    Row,
    Input,
    Form,
    Col
} from "reactstrap";
import { Translate } from "react-localize-redux";
import { getTranslate } from "react-localize-redux";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import { getCompanies } from "../../store/actions/companyActions";
import { getCategories } from "../../store/actions/categoryActions";
import { getUnits } from "../../store/actions/unitActions";
import { setProduct, getAllProducts } from "../../store/actions/productsAction";
import { getForms } from "../../store/actions/formActions";

import * as Yup from "yup";
import { useFormik } from "formik";

export default function ParentMedicineForm(props) {
    const [searchMedicine, setSearchMedicine] = useState("");
    const [selectedMedicine, setMedicineSelected] = useState('');
    const translate = useSelector((state) => getTranslate(state.localize));
    const [addingType, setAddingType] = useState("existing");
    const [parentSavedSuccessfully, setParentSaved] = useState(false)
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products) || [];
    const productIsLoading = useSelector((state) => state.products.isLoading);

    const forms = useSelector((state) => state.forms.forms) || [];

    useEffect(() => {
        dispatch(getCompanies());
        dispatch(getUnits());
        dispatch(getCategories());
        dispatch(getForms());


    }, []);

    useEffect(() => {
        dispatch(getAllProducts({ s: searchMedicine }));
    }, [searchMedicine]);


    function addProduct(data) {
        dispatch(setProduct(data));
        //setParentSaved(true)
    }
    function categoryHandleChange(value) {
        //console.log(value)
        setFieldValue('categories', value.map(cat => cat.id))
    }
    function companyHandleChange(value) {
        //console.log(value)
        setFieldValue('company', value.id)
    }
    function handleInputChange(e) {
        if (e != "") {
            setSearchMedicine(e)
        }
    }
    function handleMedicineParentChange(value) {
        setMedicineSelected(value);
    }

    const companies = useSelector(state => state.companies.companies);
    const categories = useSelector(state => state.categories.categories);
    const units = useSelector(state => state.units.units);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Field is required"),
        name_ar: Yup.string().required("Field is required"),
        company: Yup.number(),
        category: Yup.array()
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            name_ar: "",
            company: "",
            categories: ""
        },
        validationSchema,
        onSubmit(values) {
            console.log(values)
            let payload = values;
            payload.name_localized = JSON.stringify({ "ar": values.name_ar, "en": values.name });
            dispatch(setProduct(payload));
            props.setParentSaved(true);
            console.log('submitted');
            dispatch(getAllProducts());
        },
    });

    const { handleSubmit, handleChange, values, errors, touched, setFieldValue } = formik;

    //console.log(forms)

    return (


        <Row>

           
            <form
                onSubmit={formik.handleSubmit}
                noValidate
                className="w-100"
            >
                <div className="w-100">
                    <Col sm="12 mb-3 mt-3">
                        <div>{translate("general.parent_medicine_info")}</div>
                    </Col>
                    <Col md="12">
                        <Input
                            name="name"
                            placeholder={translate('general.product_name_english')}
                            className="bg-white border rounded mt-3"
                            onChange={handleChange}
                        />
                        {
                            errors.name && touched.name ? (
                                <div className="text-danger">{errors.name}</div>
                            ) : null
                        }

                    </Col>
                    <Col md="12">
                        <Input
                            name="name_ar"
                            placeholder={translate('general.product_name_arabic')}
                            className="bg-white border rounded mt-3"
                            onChange={handleChange}
                        />
                        {
                            errors.name_ar && touched.name_ar ? (
                                <div className="text-danger">{errors.name_ar}</div>
                            ) : null
                        }
                    </Col>
                    <Col md="12">
                        <Select
                            placeholder={translate("general.select_company")}
                            className="mt-2 select-2-wrapper"
                            name="company"
                            options={companies}
                            getOptionValue={(value) => value.id}
                            getOptionLabel={(opt) => opt.name}
                            isRtl={true}
                            onChange={(value) => companyHandleChange(value)}
                        />
                    </Col>
                    <Col md="12">
                        <Select
                            placeholder={translate("general.select_category")}
                            className="mt-2 select-2-wrapper"
                            options={categories}
                            getOptionValue={(value) => value.id}
                            getOptionLabel={(opt) => opt.name}
                            name="categories"
                            onChange={(value) => categoryHandleChange(value)}
                            isMulti

                        />
                    </Col>
                    <Col md="12">
                        <button type="submit" className="primary-button-bordered mt-3">
                            <Translate id="general.save" />
                                </button>
                    </Col>
                    <hr />
                </div> 
            </form>

        </Row>



    )
}

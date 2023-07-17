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
import { getCompanies } from "../store/actions/companyActions";
import { getCategories } from "../store/actions/categoryActions";
import { getUnits } from "../store/actions/unitActions";
import { setProduct, getAllProducts } from "../store/actions/productsAction";
import { getForms } from "../store/actions/formActions";
import ParentMedicineForm from '../components/forms/ParentMedicineForm'
import ExisitingMedicineForm from '../components/forms/ExisitingMedicineForm'

import * as Yup from "yup";
import { useFormik } from "formik";

export default function AddingMedicine() {


    const translate = useSelector((state) => getTranslate(state.localize));
    const [addingType, setAddingType] = useState("existing");
    const [parentSavedSuccessfully, setParentSaved] = useState(false)
    const dispatch = useDispatch();

    return (
        <Container>

            <Row>
                <Col className="mt-3" md="12">

                    <form>
                        <input type="radio" onChange={() => setAddingType('newProduct')} checked={addingType == 'newProduct' ? true : false} value="newProduct" name="newMedicine" id="newProduct" />
                        <label for="newProduct" className="ml-1 mr-1 font-size-1">{translate('general.new_product')}</label>
                        <input type="radio" onChange={() => setAddingType('existing')} checked={addingType == 'existing' ? true : false} value="existing" name="newMedicine" id="existing" />
                        <label for="existing" className="ml-1 mr-1 font-size-1">{translate('general.existing_product')}</label>
                    </form>
                </Col>
            </Row>

            {
                addingType == 'newProduct' &&
                <ParentMedicineForm
                setParentSaved = {setParentSaved}
                />
            }



            {
                (addingType == 'existing' || parentSavedSuccessfully) &&

                <ExisitingMedicineForm />
            }

        </Container>
    )
}

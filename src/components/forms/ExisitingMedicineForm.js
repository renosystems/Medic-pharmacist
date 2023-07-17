import React, { useState, useEffect } from "react";
import { Row, Input, Col } from "reactstrap";
import { Translate } from "react-localize-redux";
import { getTranslate } from "react-localize-redux";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import { getCompanies } from "../../store/actions/companyActions";
import { getCategories } from "../../store/actions/categoryActions";
import { getUnits } from "../../store/actions/unitActions";
import {
  getAllMainProducts,
  setProductForm,
} from "../../store/actions/productsAction";
import { getForms } from "../../store/actions/formActions";
// import imageToBase64 from 'image-to-base64';
import FileBase64 from "react-file-base64";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useFormik } from "formik";

export default function ExisitingMedicineForm() {
  const [searchMedicine, setSearchMedicine] = useState("");
  const [failedPopup, setFailedPopup] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);
  const [selectedMedicine, setMedicineSelected] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(true);
  const translate = useSelector((state) => getTranslate(state.localize));
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products) || [];
  const productError = useSelector((state) => state.products.error) || [];
  const productIsLoading = useSelector((state) => state.products.isLoading);
  const success = useSelector((state) => state.products.success);

  const forms = useSelector((state) => state.forms.forms) || [];
  const units = useSelector((state) => state.units.units);
  useEffect(() => {
    dispatch(getUnits());
    dispatch(getForms());
  }, []);

  useEffect(() => {
    dispatch(getAllMainProducts({ s: searchMedicine }));
  }, [searchMedicine]);

  function handleInputChange(e) {
    if (e != "") {
      setSearchMedicine(e);
    }
  }
  function handleMedicineParentChange(value) {
    console.log(value.id);
    setMedicineSelected(value);
    setFieldValue("product", value.id);
  }
  function formHandleChange(value) {
    setFieldValue("form", value.id);
  }
  function unitHandleChange(value) {
    setFieldValue("unit", value.id);
  }
  function statusHandleChange(value) {
    console.log("status", value);
    setSelectedStatus(value);
    setFieldValue("status", value);
  }
  function handlePictureChange(value) {
    console.log("image ", value);
    setFieldValue("pictures", value.base64);
  }

  const validationSchema = Yup.object().shape({
    concentration: Yup.string().required("Field is required"),
    form: Yup.number().required("Field is required"),
    max_per_order: Yup.number(),
    price: Yup.number().required("Field is required"),
    product: Yup.string().required("Field is required"),
    size: Yup.number().required("Field is required"),
    status: Yup.bool(),
    unit: Yup.number(),
  });

  const formik = useFormik({
    initialValues: {
      concentration: "",
      form: "",
      max_per_order: "",
      price: "",
      product: "",
      size: "",
      status: true,
      unit: "",
      pictures: "",
    },
    validationSchema,
    onSubmit(values) {
      console.log(values);

      dispatch(setProductForm(values));
      setSuccessPopup(true);
      //setParentSaved(true);
      // console.log('submitted');
      //dispatch(getAllProducts());
    },
  });

  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    touched,
    setFieldValue,
  } = formik;

  //console.log(formik.initialValues)

  return (
    <div>
      {success === "valid" && successPopup && (
        <div
          style={{
            background: "rgb(0 0 0 / 0.7)",
            position: "fixed",
            top: 0,
            right: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
          }}
        >
          <div style={{ color: "white", top: "50%", position: "relative" }}>
            <span>success</span>
            <Link onClick={() => setSuccessPopup(false)} to="/summary">
              <button>Continue</button>
            </Link>
          </div>
        </div>
      )}
      {success === "invalid" && failedPopup && (
        <div
          style={{
            background: "rgb(0 0 0 / 0.7)",
            position: "fixed",
            top: 0,
            right: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
          }}
        >
          <div style={{ color: "white", top: "50%", position: "relative" }}>
            Failed
          </div>
          <button onClick={() => setFailedPopup(false)}>Continue</button>
        </div>
      )}
      {productIsLoading && (
        <div
          style={{
            background: "rgb(0 0 0 / 0.7)",
            position: "fixed",
            top: 0,
            right: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
          }}
        >
          <div style={{ color: "white", top: "50%", position: "relative" }}>
            Loading
          </div>
        </div>
      )}
      <form onSubmit={formik.handleSubmit} noValidate className="w-100">
        <Row>
          <Col sm="12 mb-3 mt-3">
            <div>{translate("general.medicine_info")}</div>
          </Col>
          <Col md="12">
            {
              <Select
                placeholder={translate("general.select_product_name")}
                className="mt-2 select-2-wrapper"
                name="product"
                options={products}
                isLoading={productIsLoading}
                getOptionValue={(value) => value.id}
                getOptionLabel={(opt) => `${opt.name} ${opt.name_ar}`}
                onInputChange={handleInputChange}
                onChange={handleMedicineParentChange}
                value={selectedMedicine}
              />
            }
          </Col>
          <Col md="12" className="mt-3 mb-3">
            {/*<input type="file"   id="imageFile" />*/}
            <FileBase64
              multiple={false}
              onDone={handlePictureChange}
              name="pictures"
            />
          </Col>
          <Col md="12">
            <Select
              placeholder={translate("general.select_form")}
              className="mt-2 select-2-wrapper"
              name="form"
              options={forms}
              getOptionValue={(value) => value.id}
              getOptionLabel={(opt) => opt.name}
              onChange={(value) => formHandleChange(value)}
            />
          </Col>
          <Col md="12">
            <Select
              placeholder={translate("general.select_unit")}
              className="mt-2 select-2-wrapper"
              options={units}
              name="unit"
              getOptionValue={(value) => value.id}
              getOptionLabel={(opt) => opt.name}
              onChange={(value) => unitHandleChange(value)}
            />
          </Col>
          <Col md="12">
            <Input
              name="concentration"
              placeholder={translate("general.concentration")}
              className="bg-white border rounded mt-3"
              onChange={handleChange}
            />
          </Col>
          <Col md="12">
            <Input
              name="price"
              placeholder={translate("general.medicine_price")}
              className="bg-white border rounded mt-3"
              onChange={handleChange}
            />
          </Col>
          <Col md="12">
            <Input
              name="max_per_order"
              type="number"
              placeholder={translate("general.max_per_order")}
              className="bg-white border rounded mt-3"
              onChange={handleChange}
            />
          </Col>
          <Col md="12">
            <Input
              name="size"
              type="number"
              placeholder={translate("general.size")}
              className="bg-white border rounded mt-3"
              onChange={handleChange}
            />
          </Col>
          <Col className="mt-3" md="12">
            <input
              type="radio"
              onClick={() => statusHandleChange(true)}
              checked={selectedStatus == true ? true : false}
              id="yes"
            />
            <label for="yes" className="ml-1 mr-1">
              {translate("general.active")}
            </label>
            <input
              type="radio"
              onClick={() => statusHandleChange(false)}
              id="no"
              checked={selectedStatus == false ? true : false}
            />
            <label for="no" className="ml-1 mr-1">
              {translate("general.inActive")}
            </label>
          </Col>

          <Col md="12">
            <button type="submit" className="primary-button-bordered mt-3">
              <Translate id="general.save" />
            </button>
          </Col>
        </Row>
      </form>
    </div>
  );
}

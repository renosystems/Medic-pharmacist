import React, { useState, useEffect } from "react";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faMinusCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import MedicineCard from "./cards/MedicineCard";
import { Translate } from "react-localize-redux";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "./../store/actions/productsAction";
import {
  addMedicinesToAttachments,
  addMedicinesToUserCart,
} from "./../store/actions/ordersActions";
import { getLocalizedName } from "./../utils/helper";
import { getActiveLanguage } from "react-localize-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import AsyncSelect from "react-select/async";

export default function PrepareMedicineModal(props) {
  const [searchMedicine, setSearchMedicine] = useState("");
  let [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState(null);
  const [medicinesList, setMedicinesList] = useState([]);
  const [selectedMedicine, setMedicineSelected] = useState({});
  const [selectedForm, setSelectedForm] = useState(0);
  const [selectedConcentrationAndSize, setSelectedConcentrationAndSize] =
    useState("");
  // const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  let { item, isAttachment } = props;
  const [isAlternative, setIsAlternative] = useState(
    !isAttachment ? true : false
  );

  useEffect(() => {
    dispatch(getAllProducts({ s: searchMedicine }));
  }, [searchMedicine]);

  const products = useSelector((state) => state.products.products) || [];
  const isLoading = useSelector((state) => state.products.isLoading);
  const activeLanguage = useSelector((state) =>
    getActiveLanguage(state.localize)
  );
  const addedMedicines = useSelector((state) => state.orders.medicinesList);
  let medicineName = [];
  let medicineNameExist = [];
  const [medicineForm, setMedicineForm] = useState([]);
  const [medicineConcentrationAndSize, setMedicineConcentrationAndSize] =
    useState([]);

  products.map((product, index) => {
    const form = getLocalizedName(product.form, activeLanguage);
    const unit = getLocalizedName(product.unit, activeLanguage);
    let addOption = true;
    let index_exists = addedMedicines.findIndex(
      (item) => item.productform && item.productform.id == product.id
    );
    if (
      medicinesList.length > 0 &&
      medicinesList[0].hasOwnProperty("related_alternative_item") &&
      medicinesList[0].related_alternative_item.productform.id ==
        item.productform.id &&
      product.id == item.productform.id
    ) {
      addOption = false;
    }
    if ((isAttachment && index_exists == -1) || (!isAttachment && addOption)) {
      let product_name = product.product_name;
      let exists = medicineNameExist.some(function (el) {
        return el.product_name === product_name;
      });
      if (!exists) {
        medicineNameExist.push({
          product_name,
        });
        medicineName.push({
          value: product,
          label: ` ${product.product_name} ${product.product_name_ar} `,
          medicine: product,
        });
      }
    }
  });

  function handleChange(value) {
    setMedicineSelected(value);
    let concentrations_and_sizes = [];
    let forms = [];
    products.map((item, index) => {
      if (item.product === value.medicine.product) {
        const form = getLocalizedName(item.form, activeLanguage);
        const unit = getLocalizedName(item.unit, activeLanguage);
        concentrations_and_sizes.push({
          value: item,
          label: ` ${item.concentration}  [${item.size} * ${unit}]`,
          medicine: item,
          unit: item.unit.id,
          concentration: item.concentration,
          size: item.size,
        });
        let medicineFormExists = forms.some(function (el) {
          return el.medicine.form.id === item.form.id;
        });
        if (!medicineFormExists) {
          forms.push({
            value: item,
            label: `(${form})`,
            medicine: item,
            form: item.form.id,
          });
        }
      }
      setMedicineConcentrationAndSize(concentrations_and_sizes);
      setMedicineForm(forms);
    });
  }

  function onChangeConcentration(value) {
    setSelectedConcentrationAndSize(value);
    let forms = [];
    products.map((item, index) => {
      if (item.id === value.value.id) {
        const form = getLocalizedName(item.form, activeLanguage);
        forms.push({
          value: item,
          label: `(${form})`,
          medicine: item,
          form: item.form.id,
        });
      }
    });
    setMedicineForm(forms);
  }

  function IncrementItem() {
    setQuantity(quantity + 1);
  }

  function DecrementItem() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  let disableAddProduct =
    !isAttachment &&
    medicinesList.findIndex(
      (i) =>
        (i.productform && item.productform.id == i.productform.id) ||
        (!i.productform && item.productform.id == i.id)
    ) != -1
      ? true
      : false;

  function handleSubmit(medicine_selected, form, product_form_details) {
    console.log("medicine_selected", medicine_selected);
    let unit = product_form_details.unit;
    form = form.form;
    let product_id =
      medicine_selected &&
      medicine_selected.medicine &&
      medicine_selected.medicine.product;
    let concentration = product_form_details.concentration;

    let medicineIndex = products.findIndex((obj) => {
      return (
        obj.product === product_id &&
        obj.form.id === form &&
        obj.unit.id === unit &&
        obj.concentration === concentration
      );
    });
    medicine_selected = products[medicineIndex];

    if (medicine_selected) {
      medicine_selected.available = true;
      medicine_selected.note = note;
      if (isAttachment) {
        medicine_selected.user_attachment = item;
        medicine_selected.isAlternative = isAlternative;
      } else if (!isAttachment && isAlternative) {
        medicine_selected.isAlternative =
          item.productform &&
          medicine_selected &&
          medicine_selected.medicine &&
          item.productform.id == medicine_selected.medicine.id
            ? false
            : true;
        medicine_selected.related_alternative_item = item;
      }
      let exists = false;
      medicinesList.map((product, index) => {
        if (product.id == medicine_selected.id) {
          medicinesList[index].quantity += quantity;
          quantity = medicinesList[index].quantity;
          exists = true;
        }
      });
      if (
        item &&
        !isAttachment &&
        medicine_selected.id == item.productform.id
      ) {
        item.note = note;
        medicine_selected = item;
        exists = false;
      }

      if (!exists) {
        medicine_selected.quantity = quantity;
        setMedicinesList((medicinesList) => [
          ...medicinesList,
          medicine_selected,
        ]);
      }
      setQuantity(1);
      if (isAttachment) {
        setIsAlternative(false);
      }
      setNote("");
      setSelectedForm(0);
      setSelectedConcentrationAndSize("");
      setMedicineSelected({});
    } else {
      alert("should add error message here that product not found");
    }
  }
  function handleIsAlternativeChange() {
    setIsAlternative(!isAlternative);
  }

  function closeWindow() {
    props.handleClose(false);
  }
  function handleCloseModal() {
    dispatch(addMedicinesToAttachments(medicinesList));
    props.handleCloseImagesModal();
  }

  const [prepareMedicineModalState, setImagesModalState] = useState(props);
  useEffect(() => {
    setImagesModalState(props);
  }, [props]);
  let total =
    medicinesList && medicinesList.length > 0
      ? medicinesList.reduce(
          (a, b) =>
            a +
            (b.productform
              ? b.productform.price * b.quantity
              : b.price * b.quantity),
          0
        )
      : 0;

  function handleDeleteItem(itemIndex) {
    let productsList = [...medicinesList];

    if (itemIndex > -1) {
      productsList.splice(itemIndex, 1);
      console.log("productsList", productsList);
      setMedicinesList(productsList);
    }
  }
  function handleInputChange(e) {
    if (e != "") {
      setSearchMedicine(e);
    }
  }
  return (
    <div>
      {
        <div
          style={{ top: "0px", left: "0px", overflowY: "scroll" }}
          class="position-absolute bg-white h-100 w-100 rtl pl-3 pr-3"
        >
          <div className="d-flex flex-row align-items-center justify-content-between">
            <div>
              <Translate id="general.orderPreparation" />
            </div>
            {props.orderType != "ready" && (
              <button className="primary-button-bordered" onClick={closeWindow}>
                <Translate id="general.backToAttachements" />
              </button>
            )}
          </div>
          <Translate>
            {({ translate }) => (
              <Select
                placeholder={translate("general.selectMedicine")}
                className="mt-2 select-2-wrapper"
                options={medicineName}
                isRtl={true}
                isLoading={isLoading}
                onChange={handleChange}
                value={selectedMedicine}
                onInputChange={handleInputChange}
              />
            )}
          </Translate>

          <Translate>
            {({ translate }) => (
              <Select
                placeholder={translate("general.selectConcentrationAndSize")}
                className="mt-2 select-2-wrapper"
                options={medicineConcentrationAndSize}
                isRtl={true}
                isLoading={isLoading}
                onChange={onChangeConcentration}
                value={selectedConcentrationAndSize}
              />
            )}
          </Translate>
          <Translate>
            {({ translate }) => (
              <Select
                placeholder={translate("general.selectForm")}
                className="mt-2 select-2-wrapper"
                options={medicineForm}
                isRtl={true}
                isLoading={isLoading}
                onChange={setSelectedForm}
                value={selectedForm}
                // onInputChange={}
              />
            )}
          </Translate>

          <div className=" mt-3">
            <div className="d-flex justify-content-start align-items-center">
              <div className="d-flex justify-content-start flex-row w-100 align-items-center">
                <input
                  type="checkbox"
                  className="ml-2"
                  disabled={!isAttachment ? true : false}
                  onChange={handleIsAlternativeChange}
                />
                <span>
                  <Translate id="general.alternative" />
                </span>
              </div>
              <div className="medicine-count-wrapper d-flex justify-content-end">
                <button className="bg-white border-0" onClick={IncrementItem}>
                  <FontAwesomeIcon
                    className="ml-1 mr-1"
                    color="#99C826"
                    size="2x"
                    icon={faPlusCircle}
                  ></FontAwesomeIcon>
                </button>
                <input
                  className="border rounded text-center"
                  value={quantity}
                  type="number"
                  style={{ width: "60px" }}
                />
                <button className="bg-white border-0" onClick={DecrementItem}>
                  <FontAwesomeIcon
                    className="ml-1 mr-1"
                    color="#99C826"
                    size="2x"
                    icon={faMinusCircle}
                  />
                </button>
              </div>
            </div>
            <Translate>
              {({ translate }) => (
                <input
                  className="w-100 border rounded mt-3 pl-2 pr-2"
                  type="text"
                  onChange={(e) => setNote(e.target.value)}
                  value={note}
                  placeholder={translate("general.addingNote")}
                />
              )}
            </Translate>
          </div>
          <button
            onClick={() =>
              handleSubmit(
                selectedMedicine,
                selectedForm,
                selectedConcentrationAndSize
              )
            }
            disabled={
              disableAddProduct || (!isAttachment && medicinesList.length === 1)
            }
            className="button-primary w-100 rounded shadow-sm mt-3"
          >
            <Translate id="general.addingProduct" />
          </button>

          {medicinesList.map((medicine, index) => (
            <div className="selected-medicines-wrapper d-flex">
              <MedicineCard
                itemIndex={index}
                handleDeleteItem={handleDeleteItem}
                orderType="prepared"
                medicine={medicine}
              />
            </div>
          ))}
          {medicinesList.length == 0 ? (
            <button disabled className="w-100 mt-3 secondary-bg text-light">
              <Translate id="general.backAndSendOrder" />
            </button>
          ) : (
            <div>
              <span className="w-100 d-block text-left mt-3">
                <Translate id="general.total" />
                <span className="ml-2 mr-2">
                  {Math.round(total * 10) / 10} ج.م
                </span>
              </span>
              <button
                onClick={handleCloseModal}
                className="w-100 mt-3 secondary-bg text-light border-0 shadow-sm rounded"
              >
                <Translate id="general.backAndSendOrder" />
              </button>
            </div>
          )}
        </div>
      }
    </div>
  );
}

import React from "react";
import logo from "./logo.svg";
import "./App.css";

import Error from "./components/Error";
import Home from "./pages/Home";
import OrdersReadyPreparation from "./pages/OrdersReadyPreparation";
import OrdersUnderReview from "./pages/OrdersUnderReview";
import Summary from "./pages/Summary";
import Login from "./pages/Login";
import PreviousOrders from "./pages/PreviousOrders";
import ActiveOrders from "./pages/ActiveOrders";
import ReadyOrderDetails from "./pages/ReadyOrderDetails";
import AttachementOrderDetails from "./pages/AttachementOrderDetails";
import AddingMedicine from "./pages/AddingMedicine";
import EmptyLayout from "./layouts/EmptyLayout";
import ResponsiveLayout from "./layouts/ResponsiveLayout";
import { BrowserRouter, Switch } from "react-router-dom";
import { LocalizeProvider } from "react-localize-redux";
import Route from "./routes/Route";
import { useSelector, useDispatch } from "react-redux";
import { getTranslate } from "react-localize-redux";

function App(props) {
  const translate = useSelector((state) => getTranslate(state.localize));
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Login} />
        <Route
          isPrivate
          exact
          path="/dashboard"
          component={Home}
          title={translate("general.home")}
        />
        <Route
          isPrivate
          exact
          path="/summary"
          component={Summary}
          title={translate("general.home")}
        />
        <Route
          isPrivate
          exact
          path="/orders-under-review"
          component={OrdersUnderReview}
          title={translate("general.ordersWithAttachement")}
        />
        <Route
          isPrivate
          exact
          path="/orders-ready-preparation"
          component={OrdersReadyPreparation}
          title={translate("general.orderReadyToReview")}
        />
        <Route
          isPrivate
          exact
          path="/previous-orders"
          title={translate("general.previousOrders")}
          component={PreviousOrders}
        />
        <Route
          isPrivate
          exact
          path="/active-orders"
          component={ActiveOrders}
          title={translate("general.activeOrders")}
        />
        <Route
          isPrivate
          exact
          path="/order-details/:id"
          component={ReadyOrderDetails}
          title={translate("general.details")}
        />

        <Route
          isPrivate
          exact
          path="/attachement-order-details/:id"
          component={AttachementOrderDetails}
          title={translate("general.details")}
        />
        <Route
          isPrivate
          exact
          path="/adding-medicine/"
          component={AddingMedicine}
          title={translate("general.adding_medicine")}
        />

        <Route component={Error} />
      </Switch>
    </div>
  );
}

export default App;

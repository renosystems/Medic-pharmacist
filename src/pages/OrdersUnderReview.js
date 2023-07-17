import React, { useState, useEffect } from "react";
import { Translate } from "react-localize-redux";
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
    Row,
    Col,
    Container,
    Spinner,
} from "reactstrap";
import classnames from "classnames";
import { getAllOrders, getOrdersReset } from "../store/actions/ordersActions";
import OrderCard from "../components/cards/AttachementOrderCard";
import ReadyOrders from "../components/cards/ReadyOrders";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../store/actions/productsAction";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBicycle,
    faUserNurse,
    faPrescriptionBottleAlt,
    faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";
import InfiniteScroll from "react-infinite-scroll-component";
import * as CONSTANTS from "../constants";

export default function OrdersUnderReview() {
    const [activeTab, setActiveTab] = useState("1");
    const toggle = (tab) => {
        if (activeTab !== tab) setActiveTab(tab);
    };

    const dispatch = useDispatch();
    const changed = useSelector((state) => state.orders.changed);

  useEffect(() => {
      dispatch(getOrdersReset(CONSTANTS.ORDERS_STATUS_PENDING)); // for reloading the orders when the user navigates to the page
      dispatch(
          getAllOrders({
              page: 1,
              limit: CONSTANTS.PAGINATION_LIMIT,
              status: CONSTANTS.ORDERS_STATUS_PENDING,
          })
      );
  }, []);



    let pendingOrders =
        useSelector((state) => state.orders.pendingOrdersList) || [];
    const getNext = () => {
        dispatch(
            getAllOrders({
                page: pendingOrders.page + 1,
                limit: pendingOrders.limit,
                status: CONSTANTS.ORDERS_STATUS_PENDING,
            })
        );
    };

    const buildOrders = () => {
        return (
            <InfiniteScroll
                dataLength={pendingOrders.orders.length}
                next={getNext}
                hasMore={!pendingOrders.ended}
                loader={<Spinner />}
                style={{ overflow: "hidden" }}
            >
                {pendingOrders.orders.map((order, index) => (
                    <Card body className="p-2 mt-4 shadow-sm" key={index}>
                        <OrderCard data={order} />
                    </Card>
                ))}
            </InfiniteScroll>
        );
    };

    return (
        <div className="homepage-tabs mt-3">
            <Container>
                <Row className="justify-content-center">
                    <Col xs="12" md="3" className="mb-4">
                        <Link to="orders-under-review">
                            <Card className="bg-danger">
                                <div className=" summary-card d-flex flex-row align-items-center justify-content-around ">
                                    <div className="d-flex flex-column justify-content-center">
                                        <Translate id="general.ordersWithAttachement" />
                                        <span style={{ fontSize: "1.2rem" }}>
                                            {pendingOrders.count}
                                        </span>
                                    </div>
                                    <FontAwesomeIcon
                                        className=""
                                        icon={faUserNurse}
                                        size="3x"
                                    />
                                </div>
                                <div
                                    className="mb-3"
                                    style={{ color: "#fff", fontSize: "11px" }}
                                >
                                    <Translate id="general.underReviewMsg" />
                                </div>
                            </Card>
                        </Link>
                    </Col>
                </Row>
            </Container>

            <TabContent
                activeTab={activeTab}
                className="pl-3 pr-3 pb-0 pt-0 mr-3 ml-3"
            >
                <TabPane tabId="1">
                    <Row className="bg-white">
                        <Col sm="12" className="mb-4 ">
                            {pendingOrders.orders &&
                            pendingOrders.orders.length > 0 ? (
                                buildOrders()
                            ) : (
                                <div className="mt-4">
                                    <Translate id="general.noItems" />
                                </div>
                            )}
                        </Col>
                    </Row>
                </TabPane>
            </TabContent>
            {
                <div className="ml-3 mr-3">
                    <Link className="w-100 d-block" to="/summary">
                        <button className="button-primary w-100 mt-3 rounded shadow-sm">
                            <Translate id="general.back_to_home_page" />
                        </button>
                    </Link>
                </div>
            }

            {changed && <Link className="w-100 d-block" to="/" />}
        </div>
    );
}

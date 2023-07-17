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
    Spinner,
    Container,
} from "reactstrap";
import classnames from "classnames";
import {
    getPreviousOrders,
    getAllOrders,
    getOrdersReset,
} from "../store/actions/ordersActions";
import OrderCard from "./../components/cards/AttachementOrderCard";
import ReadyOrders from "./../components/cards/ReadyOrders";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBicycle,
    faUserNurse,
    faPrescriptionBottleAlt,
    faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import * as CONSTANTS from "../constants";

export default function PreviousOrders() {
    const [activeTab, setActiveTab] = useState("1");
    const toggle = (tab) => {
        if (activeTab !== tab) setActiveTab(tab);
    };

    const dispatch = useDispatch();

  useEffect(() => {
      dispatch(getOrdersReset(CONSTANTS.ORDERS_STATUS_PREVIOUS)); // for reloading the orders when the user navigates to the page
      dispatch(
          getAllOrders({
              page: 1,
              limit: CONSTANTS.PAGINATION_LIMIT,
              status: CONSTANTS.ORDERS_STATUS_PREVIOUS,
          })
      );
  }, []);

    const previousOrders =useSelector((state) => state.orders.previousOrdersList) || [];
    
    const getNext = () => {
        dispatch(
            getAllOrders({
                page: previousOrders.page + 1,
                limit: previousOrders.limit,
                status: CONSTANTS.ORDERS_STATUS_PREVIOUS,
            })
        );
    };

    return (
        <div className="homepage-tabs mt-3">
            <Container>
                <Row className="justify-content-center">
                    <Col xs="12" md="3" className="mb-4">
                        <Link to="previous-orders">
                            <Card>
                                <div className=" summary-card d-flex flex-row align-items-center justify-content-around text-dark ">
                                    <div className="d-flex flex-column justify-content-center">
                                        <Translate id="general.previousOrders" />
                                        <span style={{ fontSize: "1.2rem" }}>
                                            {previousOrders.count}
                                        </span>
                                    </div>
                                    <FontAwesomeIcon
                                        className=""
                                        icon={faLayerGroup}
                                        size="3x"
                                    />
                                </div>
                                <div
                                    className="mb-3"
                                    style={{
                                        color: "#636060",
                                        fontSize: "11px",
                                    }}
                                >
                                    <Translate id="general.prevOrdersMsg" />
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
                        <Col sm="12" className="mb-4">
                            <InfiniteScroll
                                dataLength={previousOrders.orders.length}
                                next={getNext}
                                hasMore={!previousOrders.ended}
                                loader={<Spinner />}
                                style={{ overflow: "hidden" }}
                            >
                                {previousOrders.orders.map((order) => (
                                    <Card body className="p-2 mt-4 shadow-sm">
                                        <ReadyOrders
                                            reference="previous"
                                            data={order}
                                        />
                                    </Card>
                                ))}
                            </InfiniteScroll>

                            {previousOrders.count == 0 && (
                                <div className="mt-5">
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
        </div>
    );
}

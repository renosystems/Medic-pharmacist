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
} from "reactstrap";
import classnames from "classnames";
import { getAllOrders } from "../store/actions/ordersActions";
import OrderCard from "./../components/cards/AttachementOrderCard";
import ReadyOrders from "./../components/cards/ReadyOrders";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "./../store/actions/productsAction";
import { Link } from "react-router-dom";

export default function Home() {
  const [activeTab, setActiveTab] = useState("1");
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const dispatch = useDispatch();
  const changed = useSelector((state) => state.orders.changed);

  useEffect(() => {
    dispatch(getAllOrders({ page: 1, limit: 10, status: 3 }));
    dispatch(getAllOrders({ page: 1, limit: 10, status: 2 }));
    dispatch(getAllOrders({page:1,limit:10,status:5}));

  }, []);
  let readyOrders = useSelector((state) => state.orders.readyOrdersList) || [];
  let pendingOrders =
    useSelector((state) => state.orders.pendingOrdersList) || [];
  // if(readyOrders && !readyOrders.ended){
  //   dispatch(getAllOrders({ page:readyOrders.page,limit:10,status: 3 }));
  // }
  // if(pendingOrders && !pendingOrders.ended){
  //   dispatch(getAllOrders({ page:pendingOrders.page,limit:10,status: 2 }));
  // }

  return (
    <div className="homepage-tabs mt-3">
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "1" })}
            onClick={() => {
              toggle("1");
            }}
          >
            <div className="d-flex flex-column position-relative">
              {pendingOrders.orders &&
                pendingOrders.orders.length > 0 &&
                pendingOrders.orders.filter((item) => item.read_at).length >
                  0 && (
                  <div className="position-absolute unread-mark text-light text-center">
                    {pendingOrders.orders.filter((item) => item.read_at).length}
                  </div>
                )}

              <span className="h6">
                <Translate id="general.ordersWithAttachement" />
              </span>
              <span>
                <Translate id="general.newOrders" />
              </span>
            </div>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggle("2");
            }}
          >
            <div className="d-flex flex-column position-relative">
              {readyOrders.orders &&
                readyOrders.orders.length > 0 &&
                readyOrders.orders.filter((item) => item.read_at != null)
                  .length > 0 && (
                  <div className="position-absolute unread-mark text-light text-center">
                    {
                      readyOrders.orders.filter((item) => item.read_at != null)
                        .length
                    }
                  </div>
                )}
              <span className="h6">
                <Translate id="general.orderReadyToReview" />
              </span>
              <span>
                <Translate id="general.newOrders" />
              </span>
            </div>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab} className="pl-3 pr-3 pb-0 pt-0">
        <TabPane tabId="1">
          <Row className="bg-white">
            <Col sm="12" className="mb-4 ">
              {pendingOrders.orders &&
                pendingOrders.orders.length > 0 ?
                pendingOrders.orders.map((order, index) => (
                  <Card body className="p-2 mt-4 shadow-sm" key={index}>
                    <OrderCard data={order} />
                  </Card>
                ))
                :<div className="mt-5"><Translate id="general.noItems"/></div>
              }
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row className="bg-white">
            <Col sm="12" className="mb-4">
              {readyOrders.orders &&
                readyOrders.orders.length > 0 ?
                readyOrders.orders.map((order, index) => (
                  <Card body className="p-2 mt-4 shadow-sm" key={index}>
                    <ReadyOrders data={order} />
                  </Card>
                ))
                :<div className="mt-5"><Translate id="general.noItems"/></div>
              }
            </Col>
          </Row>
        </TabPane>
      </TabContent>
      {changed && <Link className="w-100 d-block" to="/" />}
    </div>
  );
}

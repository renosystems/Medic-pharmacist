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
  Container
} from "reactstrap";

import { getAllOrders } from "../store/actions/ordersActions";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBicycle, faUserNurse, faPrescriptionBottleAlt, faLayerGroup } from "@fortawesome/free-solid-svg-icons";

export default function Summary() {
  const [activeTab, setActiveTab] = useState("1");
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const dispatch = useDispatch();
  const changed = useSelector((state) => state.orders.changed);

  useEffect(() => {
    dispatch(getAllOrders({ page: 1, limit: 1, status: 3 }));
    dispatch(getAllOrders({ page: 1, limit: 1, status: 2 }));
    dispatch(getAllOrders({ page: 1, limit: 1, status: 5 }));
    dispatch(getAllOrders({ page: 1, limit: 1, status: 8 }));

  }, []);

  let readyOrdersCount = useSelector((state) => state.orders.readyOrdersList.count) || 0;
  let pendingOrdersCount = useSelector((state) => state.orders.pendingOrdersList.count) || 0;
  const activeOrdersCount = useSelector(state => state.orders.activeOrdersList.count) || 0;
  const previousOrdersCount = useSelector(state => state.orders.previousOrdersList.count) || 0;

  // if(readyOrders && !readyOrders.ended){
  //   dispatch(getAllOrders({ page:readyOrders.page,limit:10,status: 3 }));
  // }
  // if(pendingOrders && !pendingOrders.ended){
  //   dispatch(getAllOrders({ page:pendingOrders.page,limit:10,status: 2 }));
  // }

  return (
    <>

      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Container>
          <Row>
            <Col xs="12" md="3" className="mb-4">
              <Link to="orders-under-review">
                <Card className="bg-danger">
                  <div className=" summary-card d-flex flex-row align-items-center justify-content-around  ">
                    <div className="d-flex flex-column justify-content-center">
                      <Translate id="general.ordersWithAttachement" />
                      <span style={{ fontSize: '1.2rem' }}>{pendingOrdersCount}</span>
                    </div>
                    <FontAwesomeIcon className="" icon={faUserNurse} size="3x" />                    
                  </div>
                    <div className="mb-3" style={{color:'#fff',fontSize:'11px'}}><Translate id="general.underReviewMsg" /></div>
                </Card>
              </Link>
            </Col>
            <Col xs="12" md="3" className="mb-4">
              <Link to="orders-ready-preparation">
                <Card className="bg-warning">
                <div className=" summary-card d-flex flex-row align-items-center justify-content-around ">
                  <div className="d-flex flex-column justify-content-center">
                    <Translate id="general.orderReadyToReview" />
                    <span style={{ fontSize: '1.2rem' }}>{readyOrdersCount}</span>
                  </div>
                  <FontAwesomeIcon className="" icon={faPrescriptionBottleAlt} size="3x" />
                </div>
                <div className="mb-3" style={{color:'#fff',fontSize:'11px'}}><Translate id="general.readyToPrepareMsg" /></div>

                </Card>
              </Link>
            </Col>
            <Col xs="12" md="3" className="mb-4">
              <Link to="active-orders">
                <Card className="bg-success">
                <div className=" summary-card d-flex flex-row align-items-center justify-content-around  ">
                  <div className="d-flex flex-column justify-content-center">
                    <Translate id="general.activeOrders" />
                    <span style={{ fontSize: '1.2rem' }}>{activeOrdersCount}</span>
                  </div>
                  <FontAwesomeIcon className="" icon={faBicycle} size="3x" />
                </div>
                <div className="mb-3" style={{color:'#fff',fontSize:'11px'}}><Translate id="general.activeOrdersMsg" /></div>

                </Card>
              </Link>
            </Col>


            <Col xs="12" md="3" className="mb-4">
              <Link to="previous-orders">
                <Card>
                <div className=" summary-card d-flex flex-row align-items-center justify-content-around text-dark ">
                  <div className="d-flex flex-column justify-content-center">
                    <Translate id="general.previousOrders" />
                    <span style={{ fontSize: '1.2rem' }}>{previousOrdersCount}</span>
                  </div>
                  <FontAwesomeIcon className="" icon={faLayerGroup} size="3x" />
                </div>
                <div className="mb-3" style={{color:'#333',fontSize:'11px'}}><Translate id="general.prevOrdersMsg" /></div>

                </Card>
              </Link>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

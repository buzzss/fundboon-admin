import React, {useState,useEffect} from 'react';
import {Row, Col, Card, Table, Tabs, Tab} from 'react-bootstrap';
import { GET_VISITORS, GET_APPLICATIONS_TODAY, GET_ACCOUNTS_TODAY, GET_ENQUIRIES_TODAY, GET_APPLICATION_SERVICE_LOG } from '../../graphql/queries'
import { useClient } from '../../client'

const Dashboard = () => {

    const client = useClient()
    const [visitors,setVisitors] = useState(0)
    const [applicationCount, setApplicationCount] = useState(0)
    const [accountsCount, setAccountsCount] = useState(0)
    const [enquiriesCount, setEnquiriesCount] = useState(0)
    const [asl, setASL] = useState(0)

    useEffect(() => {
        client.request(GET_VISITORS).then((vis) => {
            setVisitors(vis.getVisitors)

            client.request(GET_APPLICATIONS_TODAY).then((app) => {
                setApplicationCount(app.getApplicationsToday)

                client.request(GET_ACCOUNTS_TODAY).then((acc) => {
                    setAccountsCount(acc.getAccountsToday)

                    client.request(GET_ENQUIRIES_TODAY).then((enq) => {
                        setEnquiriesCount(enq.getEnquiriesToday)

                        client.request(GET_APPLICATION_SERVICE_LOG).then((asl) => {
                            setASL(asl.getApplicationServiceLog)
                        }).catch(() => {})

                    }).catch(() => {})

                }).catch(() => {})  

            }).catch(() => {})

        }).catch(() => {})

    }, [])

    return (
        <>
            <Row>
                <Col md={6} xl={3}>
                    <Card>
                        <Card.Body>
                            <h6 className='mb-4'>Today's Visitors</h6>
                            <div className="row d-flex align-items-center">
                                <div className="col-9">
                                    <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-arrow-up text-c-green f-30 m-r-5"/>{visitors} visitors</h3>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} xl={3}>
                    <Card>
                        <Card.Body>
                            <h6 className='mb-4'>Today's Applications</h6>
                            <div className="row d-flex align-items-center">
                                <div className="col-9">
                                    <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-arrow-up text-c-green f-30 m-r-5"/>{applicationCount} applications</h3>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={3}>
                    <Card>
                        <Card.Body>
                            <h6 className='mb-4'>Today's Accounts</h6>
                            <div className="row d-flex align-items-center">
                                <div className="col-9">
                                    <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-arrow-up text-c-green f-30 m-r-5"/>{accountsCount} accounts</h3>
                                </div>
                            </div>

                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={3}>
                    <Card>
                        <Card.Body>
                            <h6 className='mb-4'>Today's Enquiries</h6>
                            <div className="row d-flex align-items-center">
                                <div className="col-9">
                                    <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-arrow-up text-c-green f-30 m-r-5"/>{enquiriesCount} enquiries</h3>
                                </div>
                            </div>

                        </Card.Body>
                    </Card>
                </Col>
                
            </Row>
            <Row className="mt-5">
                <Col md={6} xl={6}>
                    <Card>
                        <Card.Body>
                            <h2 className='mb-4'>Application Service Log</h2>
                            <div className="row d-flex align-items-center p-3">
                                <Table hover>
                                  <thead>
                                    <tr>
                                      <th className="font-weight-bold">Loan Type</th>
                                      <th className="font-weight-bold">Today</th>
                                      <th className="font-weight-bold">Monthly</th>
                                      <th className="font-weight-bold">Yearly</th>
                                      <th className="font-weight-bold">All</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>Home Loan</td>
                                      <td>{asl.homeLoan?.today}</td>
                                      <td>{asl.homeLoan?.monthly}</td>
                                      <td>{asl.homeLoan?.yearly}</td>
                                      <td>{asl.homeLoan?.all}</td>
                                    </tr>
                                    <tr>
                                      <td>Personal Loan</td>
                                      <td>{asl.personalLoan?.today}</td>
                                      <td>{asl.personalLoan?.monthly}</td>
                                      <td>{asl.personalLoan?.yearly}</td>
                                      <td>{asl.personalLoan?.all}</td>
                                    </tr>
                                    <tr>
                                      <td>Buisness Loan</td>
                                      <td>{asl.buisnessLoan?.today}</td>
                                      <td>{asl.buisnessLoan?.monthly}</td>
                                      <td>{asl.buisnessLoan?.yearly}</td>
                                      <td>{asl.buisnessLoan?.all}</td>
                                    </tr>
                                    <tr>
                                      <td>Mortgage</td>
                                      <td>{asl.mortgage?.today}</td>
                                      <td>{asl.mortgage?.monthly}</td>
                                      <td>{asl.mortgage?.yearly}</td>
                                      <td>{asl.mortgage?.all}</td>
                                    </tr>
                                    <tr>
                                      <td>Overdraft</td>
                                      <td>{asl.overdraft?.today}</td>
                                      <td>{asl.overdraft?.monthly}</td>
                                      <td>{asl.overdraft?.yearly}</td>
                                      <td>{asl.overdraft?.all}</td>
                                    </tr>
                                  </tbody>
                                </Table>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} xl={6}>
                    <Card>
                        <Card.Body>
                            <h6 className='mb-4'>Today's Visitors</h6>
                            <div className="row d-flex align-items-center">
                                <div className="col-9">
                                    <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-arrow-up text-c-green f-30 m-r-5"/>{visitors} visitors</h3>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>            
            </Row>
        </>
    );
}

export default Dashboard;
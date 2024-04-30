import { Sidenav, Nav, Toggle } from 'rsuite';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import UserInfoIcon from '@rsuite/icons/UserInfo';
import ListIcon from '@rsuite/icons/List';
import PeopleFliterIcon from '@rsuite/icons/PeopleFliter';
import AdminIcon from '@rsuite/icons/Admin';
import PeopleSpeakerIcon from '@rsuite/icons/PeopleSpeaker';
import 'rsuite/dist/rsuite.min.css';
import React from 'react';
import { Link } from 'react-router-dom';

const AdminNav = () => {

    const [expanded, setExpanded] = React.useState(true);
    const [activeKey, setActiveKey] = React.useState('1');

    return (
        <>
            <div style={{ width: 240 }}>
                <Sidenav expanded={expanded} style={{ height: "100vh" }} >
                    <Sidenav.Header style={{ margin: "70px 0 90px" }}>
                        <Nav className='d-flex align-item-center justify-content-center '>
                            <AdminIcon style={{ fontSize: '2em', position: 'fixed', zIndex: 99 }} />
                        </Nav>
                    </Sidenav.Header>
                    <Sidenav.Body>
                        <Nav activeKey={activeKey} onSelect={setActiveKey}>
                            <Nav.Item eventKey="1" icon={<DashboardIcon />}>
                                <Link to={"/dashboard"} style={{ textDecoration: 'none', color: "#808080" }}>Dashboard</Link>
                            </Nav.Item>
                            <Nav.Item eventKey="2" icon={<PeopleFliterIcon />}>
                              <Link to={"/party"} style={{ textDecoration: 'none', color: "#808080" }}>Party</Link>
                            </Nav.Item>     
                            <Nav.Item eventKey="3" icon={<ListIcon />}>
                                <Link to={"/list"} style={{ textDecoration: 'none', color: "#808080" }}>List</Link>
                            </Nav.Item>
                            <Nav.Item eventKey="4" icon={<PeopleSpeakerIcon />}>
                                <Link to={"/election"} style={{ textDecoration: 'none', color: "#808080" }}>Election</Link>
                            </Nav.Item>
                            <Nav.Item eventKey="5" icon={<UserInfoIcon />}>
                                <Link to={"/user"} style={{ textDecoration: 'none', color: "#808080" }}>User</Link>
                            </Nav.Item>
                        </Nav>
                    </Sidenav.Body>
                    <Sidenav.Toggle onToggle={expanded => setExpanded(expanded)} />
                </Sidenav>
            </div>
        </>
    )
}
export default AdminNav;
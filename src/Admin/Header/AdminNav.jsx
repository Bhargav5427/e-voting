import "../../index.css";
import React, { useState } from "react";
import { HiArrowsPointingIn, HiArrowsPointingOut } from "react-icons/hi2";
import { MdDashboard } from "react-icons/md";
import { FaUser, FaPeopleGroup } from "react-icons/fa6";
import { SiGitconnected } from "react-icons/si";
import { BsInboxesFill } from "react-icons/bs";
import {
    Sidebar,
    Menu,
    MenuItem
} from "react-pro-sidebar";
import { Link } from "react-router-dom";

const AdminNav = () => {
    const [collapsed, setCollapsed] = useState(false);

    const handleCollapsedChange = () => {
        setCollapsed(!collapsed);
    };


    return (
        <div>
            <Sidebar
                style={{ height: "100%", position: "absolute", }}
                collapsed={collapsed}
                
            >
                <main>
                    <Menu className="mb-5">
                        {collapsed ? (
                            <MenuItem
                                icon={<HiArrowsPointingOut />}
                                onClick={handleCollapsedChange}
                            ></MenuItem>
                        ) : (
                            <MenuItem
                                suffix={<HiArrowsPointingIn />}
                                onClick={handleCollapsedChange}
                            >
                                <div
                                    style={{
                                        padding: "9px",
                                        color: "gray",
                                        fontWeight: "bolder",
                                        fontSize: 14,
                                        letterSpacing: "1px"
                                    }}
                                >
                                    ADMiN
                                </div>
                            </MenuItem>
                        )}
                    </Menu>

                    <Menu>
                        <Link
                            to="/dashboard"
                            style={{ textDecoration: "none" }}
                        >
                            <MenuItem
                                icon={<MdDashboard />}
                                className={window.location.pathname.includes("dashboard") ? "active" : ""}
                               
                            >
                                Dashboard
                            </MenuItem>
                        </Link>
                    </Menu>
                    <Menu>
                        <Link
                            to="/party"
                            style={{ textDecoration: "none" }}
                        >
                            <MenuItem
                                icon={<FaPeopleGroup />}
                                className={window.location.pathname.includes("party") ? "active" : ""}
                               
                            >
                                Party
                            </MenuItem>
                        </Link>
                    </Menu>
                    <Menu>
                        <Link
                            to="/election"
                            style={{ textDecoration: "none" }}
                        >
                            <MenuItem
                                icon={<BsInboxesFill />}
                                className={window.location.pathname.includes("election") ? "active" : ""}
                               
                            >
                                Election
                            </MenuItem>
                        </Link>
                    </Menu>
                    <Menu>
                        <Link
                            to="/connection"
                            style={{ textDecoration: "none" }}
                        >
                            <MenuItem
                                icon={<SiGitconnected />}
                                className={window.location.pathname.includes("connection") ? "active" : ""}
                               
                            >
                                Connection
                            </MenuItem>
                        </Link>
                    </Menu>
                    <Menu>
                        <Link
                            to="/user"
                            style={{ textDecoration: "none" }}
                        >
                            <MenuItem
                                icon={<FaUser />}
                                className={window.location.pathname.includes("user") ? "active" : ""}
                               
                            >
                                User
                            </MenuItem>
                        </Link>
                    </Menu>
                </main>
            </Sidebar>
        </div>
    );
};

export default AdminNav;

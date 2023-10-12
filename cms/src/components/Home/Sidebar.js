import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { motion } from "framer-motion";

const Nav = styled.div`
  background: #06beb6;
  background: -webkit-linear-gradient(to right, #06beb6, #48b1bf);
  background: linear-gradient(to right, #06beb6, #48b1bf);
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #06beb6;
  background: -webkit-linear-gradient(to right, #06beb6, #48b1bf);
  background: linear-gradient(to right, #06beb6, #48b1bf);
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);
  let navigate = useNavigate();

  function LogOut() {
    localStorage.removeItem("email");
    navigate("/");
  }

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.2 },
    tap: { scale: 0.9 },
  };

  const showSidebar = () => setSidebar(!sidebar);
  if (localStorage.getItem("email") != "aayushikukreja21@gmail.com") {
    const facultyIndex = SidebarData.findIndex(
      (item) => item.title === "Faculty"
    );
    if (facultyIndex !== -1) {
      SidebarData.splice(facultyIndex, 1);
    }
  }
  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <Nav>
          <NavIcon to="#">
            <FaIcons.FaBars onClick={showSidebar} />
          </NavIcon>
          <motion.button
            className="Logout bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => LogOut()}
          >
            Logout
          </motion.button>
        </Nav>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to="#">
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon>
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;

import { useState, createContext,useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Sidebar from './Sidebar/index';
import Footer from "./Footer/index";
import { Outlet, useLocation } from "react-router-dom";

export const SideNavContext = createContext();

const Layout = () =>{
    const [open, setOpen] = useState(false);
	const [openCart, setOpenCart] = useState(false);
	const [onPage, setOnPage] = useState(useLocation().pathname)

	useEffect(() => {
		setOnPage(window.location.pathname)
        window.scrollTo(0,0);
    },[window.location.pathname]);

    return(
        <Container fluid>
			<Row>
				<SideNavContext.Provider value={{ sideNavContx:[open, setOpen], asideCartContx:[openCart,setOpenCart], onPageContx:[onPage, setOnPage] }}>
					<Sidebar/>
					<Outlet />
					<Footer/>
				</SideNavContext.Provider>
			</Row>
		</Container>
    )
}

export default Layout
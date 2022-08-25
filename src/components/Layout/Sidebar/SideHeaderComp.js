import { useContext } from "react";
import logo from '../../../asset/logo_sm.png';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { SideNavContext } from '../Layout'
import { IoMenu, IoBasketOutline } from "react-icons/io5";
import { useLocation } from "react-router-dom";

const SideHeaderComp = () =>{

    const { sideNavContx, asideCartContx, onPageContx  } = useContext(SideNavContext);
    const [open, setOpen] = sideNavContx;
    const [openCart, setOpenCart] = asideCartContx;
    const onPage = onPageContx[0]

    const isMenuPage = onPage === "/"

    return(
        <Row>
            <Col xs={4} className='d-flex justify-content-start d-xl-none'>
                <Button
                    onClick={() => setOpen(!open)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                    className='h-100 d-flex justify-content-center align-items-center ms-3'
                    style={{ width:'48px' }}
                >
                    <IoMenu size={32}/>
                </Button>
            </Col>
            <Col xs={4} xl={12} className='mt-xl-5 text-center'>
                <img src={logo} alt="Logo" style={{ width: '48px' }}/>
            </Col>
            <Col xs={4} className='d-flex justify-content-end d-lg-none'>
                {
                    isMenuPage ?  
                        <Button
                            onClick={() => setOpenCart(!openCart)}
                            aria-controls="example-collapse-text"
                            aria-expanded={open}
                            className='h-100 d-flex justify-content-center align-items-center me-3'
                            style={{ width:'48px' }}
                        >
                            <IoBasketOutline size={32}/>
                        </Button>
                    :
                        null
                }
               
            </Col>
        </Row>
    )
}

export default SideHeaderComp;
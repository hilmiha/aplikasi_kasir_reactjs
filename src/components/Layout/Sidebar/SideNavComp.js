import { useContext } from "react";
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import { IoAppsOutline, IoTimeOutline, IoSettingsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

import { SideNavContext } from '../Layout'

const SideNavComp = () =>{
    // const { sideNavContx, asideCartContx } = useContext(SideNavContext);
    const navigate = useNavigate();
    const [open, setOpen] = useContext(SideNavContext).sideNavContx;
    const setOpenCart = useContext(SideNavContext).asideCartContx[1];
    const onPage = useContext(SideNavContext).onPageContx[0];

    const navButtonClicked = (to) =>{
        setOpen(false)
        setOpenCart(false)
        navigate(to);
    }

    return(
        <Collapse in={open}>
            <div className='flex-grow-1'>
                <div className='h-100 d-flex flex-column mt-4 mt-xl-0'>
                    <div className='flex-grow-1 d-flex flex-column align-items-center justify-content-center'>
                        <div className='my-4 my-xl-4 text-center w-100'>
                            <Button variant="outline-primary" className={onPage === '/' ? 'navItem w-100 border-0 text-center p-3 active' : 'navItem w-100 border-0 text-center p-3'} onClick={()=>navButtonClicked("/")}>
                                <IoAppsOutline color='black' size={32} className='mb-xl-3'/>
                                <span className='ms-3 ms-xl-0 d-xl-block'><b>Menu</b></span>
                            </Button>
                        </div>
                        <div className='my-4 my-xl-4 text-center  w-100'>
                            <Button variant="outline-primary" className={onPage === '/history' ? 'navItem w-100 border-0 text-center p-3 active' : 'navItem w-100 border-0 text-center p-3'} onClick={()=>navButtonClicked("/history")}>
                                <IoTimeOutline color='black' size={32} className='mb-xl-3'/>
                                <span className='ms-3 ms-xl-0 d-xl-block'><b>History</b></span>
                            </Button>
                        </div>
                    </div>
                    <div className='mt-5 mb-3 mb-xl-5'>
                        <div className='text-center'>
                            <Button variant="outline-primary" className='navItem w-100 p-2'>
                                <div className='d-flex justify-content-center align-items-center'>
                                    <IoSettingsOutline size={32}/>
                                    <span className='ms-3'><b>Setting</b></span>
                                </div>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Collapse>
    )
}

export default SideNavComp;
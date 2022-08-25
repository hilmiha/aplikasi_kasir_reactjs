import { useContext } from "react";
import './style.css';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import { commify } from "../../../../util/comify";

import { IoBasketOutline } from "react-icons/io5";

import ItmKeranjangComp from './ItmKeranjangComp';
import { SideNavContext } from '../../../Layout/Layout'
import { FoodNDrinkContext } from '../MenuPage'

const Aside = () => {
    const openCart = useContext(SideNavContext).asideCartContx[0];
    const keranjang = useContext(FoodNDrinkContext).keranjangContx[0];
    const totKerajang = useContext(FoodNDrinkContext).totKerajangContx[0]
    const beliFoodNDrink =useContext(FoodNDrinkContext).beliFoodNDrink
    const problemKerajang = useContext(FoodNDrinkContext).problemKerajangContx[0]

    return (
        <Collapse in={openCart} dimension="width">
            <Col xs={12} lg={4} xl={3} className='aside-container bg-white'>
                <div className='aside  p-3 d-flex flex-column'>
                    <Row className='my-5 pt-5 pt-xl-0' style={{ height: '48px' }}>
                        <Col className='d-flex align-items-center'>
                            <IoBasketOutline size={32}/>
                            <h3 className='ms-3 mb-0'><b>Keranjang</b></h3>
                        </Col>
                    </Row>
                    
                    <Row className='flex-grow-1'>
                        <Col xs={12} className='d-flex flex-column px-4 py-3 listKeranjang rounded-3 bg-light mb-5'>
                            {
                                keranjang.map((props)=> <ItmKeranjangComp  props={props} key={props.id}/>)
                            }
                        </Col>
                        <Col xs={12} className='mb-3 p-0'>
                            <div className='totalBox p-3 mb-2 rounded'>
                                <div className='d-flex justify-content-between mb-3'>
                                    <span>Sub Total</span><span>Rp{commify(totKerajang.subtotal)}</span>
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <span>Pajak</span><span>Rp{commify(totKerajang.tax)}</span>
                                </div>
                            </div>
                            <div className='totalBox p-3 rounded'>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <h6 className='m-0'>Total</h6><h4 className='m-0'><b>Rp{commify(totKerajang.total)}</b></h4>
                                </div>
                            </div>
                        </Col>
                        <Col xs={12} className=' mb-4 p-0'>
                            {
                                problemKerajang===false ? 
                                    <Button className='w-100 bayarBtn active' variant='outline-primary' onClick={()=>beliFoodNDrink()}><b>Bayar</b></Button>
                                    
                                :
                                    <Button className='w-100 disabled border-1 border-dark' variant='light' style={{ minHeight:"48px" }}><b>Bayar</b></Button>
                                    
                            }   
                            
                        </Col>
                    </Row>
                </div>
            </Col>
        </Collapse>
            
			

    );
}

export default Aside;

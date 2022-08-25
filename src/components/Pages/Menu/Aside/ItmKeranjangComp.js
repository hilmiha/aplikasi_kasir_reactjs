import { useContext } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { commify } from "../../../../util/comify";

import { IoTrash, IoAlertCircleOutline } from "react-icons/io5";
import { FoodNDrinkContext } from '../MenuPage'

const ItmKeranjangComp = ({props}) =>{
    const harga = commify(props.harga);
    const addKeranjang = useContext(FoodNDrinkContext).addKeranjang
    const removeFromKeranjang = useContext(FoodNDrinkContext).removeFromKeranjang
    const lessKeranjang = useContext(FoodNDrinkContext).lessKeranjang
    const problemKerajang = useContext(FoodNDrinkContext).problemKerajangContx[0]
    
    
    return(
        <Row className={props.is_ready ? 'rounded-3 bg-white p-3 mb-3' : 'rounded-3 bg-white border border-warning  p-3 mb-3'}>
            {
                props.is_ready ? 
                    null
                :
                    <Col xs={12} className='mb-4'>
                        <div className="d-flex align-items-center m-0 p-0">
                            <span className="text-warning"><IoAlertCircleOutline size={32}/></span>
                            <span className="ms-3 text-warning"><b>Update:</b></span>
                            <span className="ms-2">Item menu sudah tidak tersedia</span>
                        </div>
                    </Col>
            }
            <Col xs={3} className='ps-0 bg-white rounded-3 d-flex align-items-center'>
                <img src={'/asset/foodndrink/'+props.gambar} alt={props.gambar} className={props.is_ready ? 'img-fluid' : 'img-fluid notAvilable'}  />
            </Col>
            <Col className='d-flex flex-column justify-content-between'>
                <Row>
                    <Col xs={9}>
                        <h6 className='mb-3'><b>{props.nama}</b></h6>
                    </Col>
                    <Col className='pe-0 text-end'>
                        <Button variant='danger' size="sm" onClick={()=>removeFromKeranjang(props.id)}>
                            <div className='d-flex align-items-center'>
                                <IoTrash color='white'/>
                            </div>
                        </Button>
                    </Col>
                </Row>
                
                <Row>
                    <Col className='d-flex justify-content-start align-items-end'>
                        <span className='text-secondary m-0'>Rp{harga}</span><span className='text-dark'>/porsi</span>
                    </Col>
                    {
                        props.is_ready ? 
                            <Col className='pe-0 d-flex justify-content-end align-items-center'>
                                <Button size="sm" onClick={()=>addKeranjang(props.id)}>+</Button>
                                <span className='mx-3'><b>{props.jum}</b></span>
                                <Button size="sm" onClick={()=>lessKeranjang(props.id)}>-</Button>
                            </Col>
                        :
                            <Col className='pe-0 d-flex justify-content-end align-items-center'>
                                <span className='mx-3'><b>{props.jum}</b></span>
                            </Col>
                    }
                    
                </Row>
            </Col>
        </Row>
    )
}

export default ItmKeranjangComp;
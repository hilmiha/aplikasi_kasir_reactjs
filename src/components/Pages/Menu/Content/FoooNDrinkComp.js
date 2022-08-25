import { useContext } from "react";
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import { IoAddOutline, IoBasket } from "react-icons/io5";
import { FoodNDrinkContext } from '../MenuPage'

import { commify } from "../../../../util/comify";

const FoooNDrinkComp = ({props}) => {
    const addKeranjang = useContext(FoodNDrinkContext).addKeranjang
    const setRef = useContext(FoodNDrinkContext).refContx[1]

    const harga = commify(props.harga);
    return (
        <Col xs={12} sm={6} md={4} xl={3} className='mb-4'>
            <div className='d-flex flex-column justify-content-between bg-white border rounded-3 px-3 pb-3 h-100 foodndrinkItm'>
                <div>
                    <p className='addedNotifOff mt-3 mb-0 text-end' ref={setRef(props.id)}><IoBasket size={32} style={{ color:'inherit' }}/></p>
                    <img 
                        src={'/asset/foodndrink/'+props.gambar} 
                        alt={props.gambar} 
                        className={props.is_ready ? 'img-fluid' : 'img-fluid notAvilable'} 
                        onClick={()=>addKeranjang(props.id)}
                        id={props.id}
                    />
                    <div className='px-3 pb-3'>
                        {props.is_ready ?
                            <Badge bg="success px-3 py-2">Ready</Badge>
                            :
                            <Badge bg="danger px-3 py-2">Not Ready</Badge>
                        }
                        <h6 className='mt-3'><b>{props.nama}</b></h6>
                    </div>
                </div>

                <div className='px-3 pb-3'>
                    <div className='d-flex'>
                        <h5 className='text-secondary'>Rp{harga}</h5><span className='text-dark'>/porsi</span>
                    </div>
                    {props.is_ready ? 
                        <Button variant='primary' className='mt-3 w-100 addKeranjangBtn' style={{ minHeight: "48px" }} onClick={()=>addKeranjang(props.id)} >
                            <div className='d-flex justify-content-center align-items-center'>
                                <IoAddOutline />
                                <span className='ms-2'><b>Add to Cart</b></span>
                            </div>
                        </Button>
                    :
                        <Button variant='light' className='mt-3 w-100' disabled style={{ minHeight: "48px" }}>
                            <div className='d-flex justify-content-center align-items-center'>
                                <IoAddOutline />
                                <span className='ms-2'><b>Add to Cart</b></span>
                            </div>
                        </Button>
                    }
                </div>
            </div>
        </Col>
    )
}

export default FoooNDrinkComp;
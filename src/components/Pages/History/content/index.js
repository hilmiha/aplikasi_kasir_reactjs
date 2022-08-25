import './style.css'
import { useContext } from "react";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import TableHistoryComp from './TableHistoryComp';
import { IoSearch } from "react-icons/io5";
import { PesananHistoryContext } from '../HistoryPage'

const Content = () => {

    const [filterWord, setFilterWord]  = useContext(PesananHistoryContext).filterWordContx
    const filterDtbyWord = useContext(PesananHistoryContext).filterDtbyWord

    return(
        <Col xs={12} xl={11} className='bg-light mt-5 mt-xl-0 d-flex justify-content-center' style={{ minHeight: '100vh' }}>
            <Col xs={12} xl={9}  className='d-flex flex-column p-3'>
                <Row className='my-5' style={{ minHeight: '48px' }}>
                    <Col xs={12} lg={4} className='d-flex align-items-center order-lg-last mb-4 mb-lg-0'>
                        <IoSearch/>
                        <Form.Control type="text" placeholder="Cari Id Transaksi" className='ms-3' onChange={(event)=>filterDtbyWord(event)}/>                      
                    </Col>
                    <Col className='d-flex align-items-center order-lg-first'>
                        <h3 className='m-0'><b>History</b></h3>
                    </Col>
                </Row>
                {
                    filterWord!=='' && <p className="mb-4 text-dark">Hasil pencarian untuk Id Transaksi "{filterWord}"</p> 
                }
                <Row className='justify-content-center mb-5'>
                    <TableHistoryComp/>
                </Row>
            </Col>
            
        </Col>
    )
}

export default Content
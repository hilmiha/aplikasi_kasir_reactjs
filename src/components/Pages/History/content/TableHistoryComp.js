import { useContext } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { PesananHistoryContext } from '../HistoryPage'

import { TbSortDescendingNumbers, TbSortAscendingNumbers } from "react-icons/tb";

import { commify } from "../../../../util/comify";

const RowTable = ({props}) =>{
    return(
        <tr>
            <td>{props.id}</td>
            <td>{props.tanggal_transaksi}</td>
            <td>
                <table className='w-100' style={{ minWidth:'340px' }}>
                    <tbody>
                        {props.keranjang.map((detail)=>{
                            return(
                                <tr key={detail.id}>
                                    <td className='iner text-start' style={{ width:'65%' }}>
                                        {detail.nama}
                                    </td>
                                    <td className='iner text-center'>
                                        {detail.harga}
                                    </td>
                                    <td className='iner text-end'>
                                        x {detail.jum}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                    
                </table>
            </td>
            <td>
                <table className='w-100' style={{ minWidth:'200px' }}>
                    <tbody>
                        <tr>
                            <td className='iner text-start'>
                                Sub-Total
                            </td>
                            <td className='iner text-end'>
                                Rp{commify(props.detail.subtotal)}
                            </td>
                        </tr>
                        <tr>
                            <td className='iner text-start'>
                                Pajak
                            </td>
                            <td className='iner text-end'>
                                Rp{commify(props.detail.tax)}
                            </td>
                        </tr>
                        <tr>
                            <td className='iner total text-start'>
                                <span className="txTotal"><b>Total</b></span>
                            </td>
                            <td className='iner total text-end'>
                                <span className="txTotal"><b>Rp{commify(props.total)}</b></span>
                            </td>
                        </tr>
                    </tbody>
                    
                </table>
            </td>
        </tr>
    )
}

const TableHistoryComp = () => {
    const dtPesanan = useContext(PesananHistoryContext).dtPesananContx[0]
    const [shortBy, setShortBy] = useContext(PesananHistoryContext).shortByContx
    const [shortDesc, setshortDesc] = useContext(PesananHistoryContext).shortDescContx

    const shortHandler = (by) =>{
        if(shortBy === by){
            setshortDesc(!shortDesc)
        } else {
            setshortDesc(true)
        }
        setShortBy(by)
        
    }
    const ButtonIconSetter = ({itmShort})=>{
        if (shortBy===itmShort&&shortDesc===true) {
            return (<TbSortDescendingNumbers size={24}/>)
        } else if(shortBy===itmShort&&shortDesc===false){
            return (<TbSortAscendingNumbers size={24}/>)
        } else if(shortBy!==itmShort) {
            return (<TbSortDescendingNumbers size={24}/>)
        }
            
    }

    return (
        <Table bordered hover responsive='xl' className='bg-white'>
            <thead>
                <tr>
                    <th>Id Transaksi</th>
                    <th>
                        <div className="d-flex justify-content-between align-items-center w-100">  
                            <span>Tanggal</span>
                            <Button variant='outline-primary' className={shortBy==='tanggal_transaksi' && 'active'} onClick={()=>shortHandler('tanggal_transaksi')}>
                                <ButtonIconSetter itmShort="tanggal_transaksi"/>
                            </Button>
                        </div>
                    </th>
                    <th style={{ width:'40%' }}>Menu Items</th>
                    <th style={{ width:'25%' }}>
                        <div className="d-flex justify-content-between align-items-center w-100">  
                            <span>Jumlah Total</span>
                            <Button variant='outline-primary' className={shortBy==='total' && 'active'} onClick={()=>shortHandler('total')}>
                                <ButtonIconSetter itmShort="total"/>
                            </Button>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                {dtPesanan.map((props)=><RowTable props={props} key={props.id}/>)}
            </tbody>
        </Table>
    )
}

export default TableHistoryComp
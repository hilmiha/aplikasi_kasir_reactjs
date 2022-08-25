import React, { useState, useContext } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FoodNDrinkContext } from '../MenuPage'
import { IoCheckmarkCircleOutline, IoCloseCircleOutline } from "react-icons/io5";

const SuccessMod = () =>{
	return(
		<div className='text-center'>
			<IoCheckmarkCircleOutline size={64} className='text-success mb-4'/>
			<h5 className='text-success m-0'>Transaksi Berhasil Disimpan</h5>
		</div>
	)
}

const FailedMod = () =>{
	return(
		<div className='text-center'>
			<IoCloseCircleOutline size={64} className='text-danger mb-4'/>
			<h5 className='text-danger m-0'>Transaksi Gagal Disimpan</h5>
			<p className='m-0 mt-4 text-dark'>Cek kembali item keranjang</p>
		</div>
	)
}



const ModalTransaction = () =>{
	const [modTransaction, setModTransaction] = useContext(FoodNDrinkContext).moTransactionContx

	const handleClose = () => {
		setModTransaction({ open: false, satus: '' })
	}


	return (
		<>

			<Modal show={modTransaction.open} onHide={handleClose} centered size="sm">
				<Modal.Body className='m-4'>
					{modTransaction.status === 'success' ? <SuccessMod />  : modTransaction.status === 'false' ? <FailedMod/> : null }
				</Modal.Body>
			</Modal>
		</>
	);
}

export default ModalTransaction;
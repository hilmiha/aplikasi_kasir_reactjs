import { useState, useEffect, createContext, useContext } from "react";
import axios from 'axios';
import useDynamicRefs from 'use-dynamic-refs';
import Content from "./Content/index"
import Aside from './Aside/index';
import ModalTransaction from "./ModalTransaction/index";

export const FoodNDrinkContext = createContext();


const MenuPage = () =>{

    const [dtFoodnDrink, setDtFoodnDrink] = useState([]);
    const [dtCategories, setCategories] = useState([]);
    const [selCategory, setSelCategory] = useState(1)
    const [keranjang, setKeranjang] = useState([])
    const [totKerajang, setTotKeranjang] = useState({subtotal : 0,tax: 0, total: 0})
    const [problemKerajang, setProblemKeranjang] = useState(false)

    const [modTransaction, setModTransaction] = useState({open:false, status:''});


    const [getRef, setRef] =  useDynamicRefs();

    useEffect(() => {
        axios.get(`http://localhost:3004/categories`)
            .then(res => {
                const dtCate = res.data;
                setCategories(dtCate);
            })

        function getDtFD() {
            axios.get(`http://localhost:3004/foodndrink`)
            .then(res => {
                const dtFD = res.data;
                setDtFoodnDrink(dtFD);
            })
        }

        getDtFD()

        const interval = setInterval(() => {
            getDtFD()
        }, 10000)

        
        return()=>{
            clearInterval(interval);
        }
    }, []);

    const notifyAddedItm = (refid) =>{
        const refElm = getRef(refid).current
        refElm.className='addedNotifOn mt-3 mb-0 text-end'
        setTimeout(function() {
            refElm.className='addedNotifOff mt-3 mb-0 text-end'
        }, 500);
    }

    const addKeranjang = (id) =>{
        const inKeranjang = keranjang.filter((el)=>el.id===id)
        const itmFD = dtFoodnDrink[dtFoodnDrink.findIndex((el)=>el.id===id)]

        if(inKeranjang.length === 0 && itmFD.is_ready===true){
            let newItem = {
                id: itmFD.id,
                nama: itmFD.nama,
                harga: itmFD.harga,
                gambar: itmFD.gambar,
                is_ready: itmFD.is_ready,
                jum: 1
            }
            setKeranjang([...keranjang, newItem])
            notifyAddedItm(id)
        } else if(inKeranjang.length > 0 && itmFD.is_ready===true){

            const newKeranjang = keranjang.map((itm)=>{
                if (itm.id===id){
                    return {...itm, jum:(itm.jum+1)}
                } else{
                    return itm
                }
            })
            setKeranjang(newKeranjang)
            notifyAddedItm(id)
        }
    }

    const removeFromKeranjang = (id) =>{
        var newKeranjang = keranjang.filter((el)=>el.id!==id)
        setKeranjang(newKeranjang)
    }

    const lessKeranjang = (id) =>{
        const inKeranjang = keranjang.findIndex((el)=>el.id===id)
        if(keranjang[inKeranjang].jum>1){
            const newKeranjang = keranjang.map((itm)=>{
                if (itm.id===id){
                    return {...itm, jum:(itm.jum-1)}
                } else{
                    return itm
                }
            })
            setKeranjang(newKeranjang)
        }else {
            removeFromKeranjang(id)
        }
    }

    useEffect(()=>{
        function cekUpdated(itm){
            const itmFD = dtFoodnDrink[dtFoodnDrink.findIndex((el)=>el.id===itm.id)]
            if(itm.is_ready !== itmFD.is_ready){
                itm.is_ready = itmFD.is_ready
            }
            if(itm.nama !== itmFD.nama){
                itm.nama = itmFD.nama
            }
            if(itm.harga !== itmFD.harga){
                itm.harga = itmFD.harga
            }
            return itm
        }
        
        if(keranjang.length > 0){
            const newKeranjang = keranjang.map((itm)=>cekUpdated(itm))
            setKeranjang(newKeranjang)
        }

    }, [dtFoodnDrink])

    useEffect(() => {
        const cekProblemKeranjang = ()=>{
            if(keranjang.length > 0){
                const cek = keranjang.filter((el)=>el.is_ready==false)
                cek.length > 0 ? setProblemKeranjang(true) : setProblemKeranjang(false) 
            }else{
                setProblemKeranjang(true)
            }
            
        }

        const hitungKeranjang = ()=>{
            const tax = 11/100
            let newSubtotal = 0;
            let newTax = 0;
            keranjang.forEach(element => {
                newSubtotal += (element.harga * element.jum)
            });
            newTax = newSubtotal*tax;
            
            setTotKeranjang({
                subtotal : newSubtotal,
                tax: newTax,
                total: newSubtotal+newTax
            })
        }

        cekProblemKeranjang()
        hitungKeranjang()
    }, [keranjang]);

    const beliFoodNDrink = () =>{
        if(keranjang.length !== 0){
            axios.post('http://localhost:3004/pesanan', {
                id:'trx'+Date.now(),
                keranjang: keranjang,
                detail:{
                    subtotal: totKerajang.subtotal,
                    tax: totKerajang.tax
                },
                total: totKerajang.total,
                tanggal_transaksi:new Date().toISOString().slice(0, 19).replace('T', ' ')
                })
                .then(function () {
                    setKeranjang([])
                    setTotKeranjang({subtotal : 0,tax: 0, total: 0})
                    setModTransaction({
                        open:true,
                        status:'success'
                    })
                })
                .catch(function (error) {
                    console.log(error);
                    setModTransaction({
                        open:true,
                        status:'failed'
                    })
                });
        } else {
            console.log('keranjang kosong')
        }
    }

    return(
        <FoodNDrinkContext.Provider value={{
            dtFoodnDrinkContx:[dtFoodnDrink, setDtFoodnDrink], 
            dtCategoriesContx:[dtCategories, setCategories], 
            selCategoryContx:[selCategory, setSelCategory],
            keranjangContx:[keranjang, setKeranjang],
            totKerajangContx: [totKerajang, setTotKeranjang],
            problemKerajangContx: [problemKerajang, setProblemKeranjang],
            refContx: [getRef, setRef],
            moTransactionContx: [modTransaction, setModTransaction],
            addKeranjang, notifyAddedItm, removeFromKeranjang, lessKeranjang,beliFoodNDrink
        }}>
            
            <Content/>
            <Aside/>
            <ModalTransaction/>
        </FoodNDrinkContext.Provider>
    )
}

export default MenuPage
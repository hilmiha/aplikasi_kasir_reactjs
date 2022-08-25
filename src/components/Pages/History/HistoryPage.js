import { useState, useEffect, createContext, useContext } from "react";
import axios from 'axios';
import Content from "./content/index"

export const PesananHistoryContext = createContext();

const HistoryPage = () => {
    const [dtPesanan, setDtPesanan] = useState([]);
    const [shortBy, setShortBy] = useState('tanggal_transaksi')
    const [shortDesc, setshortDesc] =useState(true)

    const [filterWord, setFilterWord] = useState('')

    const filterDtbyWord = (event) =>{
        if(event.target.value.length > 0){
            setFilterWord(event.target.value)
            
            // setSelCategory(undefined)
        } else {
            setFilterWord('')
            // setSelCategory(1)
        }
    }

    useEffect(() => {
        function getDtPesanan() {
            const order = shortDesc ? 'desc' : 'asc'
            axios.get('http://localhost:3004/pesanan?_sort='+shortBy+'&_order='+order+'&id_like='+filterWord)
            .then(res => {
                const dtPesn = res.data;
                setDtPesanan(dtPesn);
            })
        }
    
        getDtPesanan()

    }, [shortBy, shortDesc, filterWord]);

    return(
        <PesananHistoryContext.Provider value={{
            dtPesananContx:[dtPesanan, setDtPesanan],
            shortByContx:[shortBy, setShortBy],
            shortDescContx:[shortDesc, setshortDesc],
            filterWordContx:[filterWord, setFilterWord],
            filterDtbyWord
        }}>
            <Content/>
        </PesananHistoryContext.Provider>
        
    )
}

export default HistoryPage
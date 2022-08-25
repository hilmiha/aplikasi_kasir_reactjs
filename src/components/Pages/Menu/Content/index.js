import { useState, useContext, createContext } from "react";
import './style.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FoooNDrinkComp from './FoooNDrinkComp';
import CategoryComp from './CategoryComp';
import { FoodNDrinkContext } from '../MenuPage'
import { IoSearch } from "react-icons/io5";

export const FilterFoodNDrinkContex = createContext();

const Content = () => {
    const dtFoodnDrink = useContext(FoodNDrinkContext).dtFoodnDrinkContx[0]
    const dtCategories = useContext(FoodNDrinkContext).dtCategoriesContx[0]
    const [selCategory,setSelCategory]  = useContext(FoodNDrinkContext).selCategoryContx

    const [filterWord, setFilterWord] = useState('')

    const filterFDbyWord = (event) =>{
        if(event.target.value.length > 0){
            setFilterWord(event.target.value)
            setSelCategory(undefined)
        } else {
            setFilterWord('')
            setSelCategory(1)
        }
    }
    
    return (
        
            <Col xs={12} lg={8} className='bg-light mt-5 mt-xl-0' style={{ minHeight: '100vh' }}>
                <div className='d-flex flex-column p-3'>
                    <Row className='my-5' style={{ minHeight: '48px' }}>
                        <Col xs={12} lg={4} className='d-flex align-items-center order-lg-last mb-4 mb-lg-0'>
                            <IoSearch/>
                            <Form.Control type="text" placeholder="Cari item menu" className='ms-3' onChange={(event)=>filterFDbyWord(event)} value={filterWord}/>                      
                        </Col>
                        <Col className='d-flex align-items-center order-lg-first'>
                            <h3 className='m-0'><b>Pilih Kategori</b></h3>
                        </Col>
                    </Row>
                    <Row className='mb-4 py-1 flex-row flex-nowrap' style={{ overflowX:'auto'}}>
                        <FilterFoodNDrinkContex.Provider value={{filterWord, setFilterWord}}>
                            {dtCategories.map((props)=><CategoryComp props={props} key={props.id}/>)}
                        </FilterFoodNDrinkContex.Provider>
                    </Row>

                    {filterWord!=='' ? 
                        <>
                            <p className="mb-4 text-dark">Hasil pencarian untuk "{filterWord}"</p> 
                            <Row>
                                {dtFoodnDrink.filter(itm => itm.nama.toLowerCase().search(filterWord.toLowerCase()) !== -1).map((props)=><FoooNDrinkComp props={props} key={props.id}/>)}
                            </Row>
                        </>
                    : 
                    
                        <Row>
                            {dtFoodnDrink.filter(itm => itm.category.id === selCategory).map((props)=><FoooNDrinkComp props={props} key={props.id}/>)}
                        </Row>
                    }    
                </div>
            </Col>
    );
}

export default Content;

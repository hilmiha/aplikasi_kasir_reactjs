import { useContext } from "react";
import Button from 'react-bootstrap/Button';



import { ReactComponent as BurgerIco } from '../../../../asset/icon/burger.svg';
import { ReactComponent as DrinksIco } from '../../../../asset/icon/drinks.svg';
import { ReactComponent as PancakeIco } from '../../../../asset/icon/pancake.svg';
import { ReactComponent as PasatIco } from '../../../../asset/icon/pasta.svg';
import { ReactComponent as PizzaIco } from '../../../../asset/icon/pizza.svg';
import { ReactComponent as SnacksIco } from '../../../../asset/icon/snacks.svg';
import { FoodNDrinkContext } from '../MenuPage'
import { FilterFoodNDrinkContex } from './index'

const categoryIcon = (label) =>{
    if(label === 'Burger and Fries') return  <BurgerIco className='kateIcon mb-3' />
    if(label === 'Pizza') return  <PizzaIco className='kateIcon mb-3' />
    if(label === 'Pasta') return  <PasatIco className='kateIcon mb-3' />
    if(label === 'Pancake') return  <PancakeIco className='kateIcon mb-3' />
    if(label === 'Snacks') return  <SnacksIco className='kateIcon mb-3' />
    if(label === 'Drinks') return  <DrinksIco className='kateIcon mb-3' />
}

const CategoryComp = ({props}) => {

    const [selCategory, setSelCategory] = useContext(FoodNDrinkContext).selCategoryContx
    const setFilterWord = useContext(FilterFoodNDrinkContex).setFilterWord

    const handleSelCategory = (idCategory) =>{
        setSelCategory(idCategory)
        setFilterWord('')
    }
    
    return(
        <div className='keteItm col-6 col-sm-4 col-md-3 col-lg-3 col-xl-2' >
            <Button 
                variant="outline-primary" 
                className={selCategory===props.id ? 'kateItem w-100 h-100 p-3 active' : 'kateItem w-100 h-100 p-3'}
                onClick={()=>handleSelCategory(props.id)}
            >
                {categoryIcon(props.label)}
                <span className='d-block'><b>{props.label}</b></span>
            </Button>
        </div>
    )
}

export default CategoryComp;
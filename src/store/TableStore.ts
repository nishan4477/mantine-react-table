import { create } from 'zustand'
import { Product } from '../types'
import { products } from '../data'

interface ProductStore{
    products: Product[] | [],
    setProducts: (products:Product[])=>void
    deleteProductId: number | null,
    setDeleteProductId: (id:number| null)=>void,
    editProductId: number | null,
    setEditProductId: (id:number| null)=>void,
    isOpenEditModal: boolean,
    setIsOpenEditModal: (isOpen:boolean)=>void
    isOpenAddModal:boolean,
    setIsOpenAddModal: (isOpen:boolean)=>void
}


 export const useTableStore = create<ProductStore>()((set)=>({
products:products || [],
setProducts: (products:Product[])=>set(()=>({products:products})),
deleteProductId: null,
setDeleteProductId: (id:number|null)=> set(()=>({deleteProductId:id})),
editProductId: null,
setEditProductId: (id:number|null)=> set(()=>({editProductId:id})),
isOpenEditModal: false,
setIsOpenEditModal: (isOpen:boolean)=>set(()=>({isOpenEditModal:isOpen})),
isOpenAddModal:false,
setIsOpenAddModal: (isOpen:boolean)=>set(()=>({isOpenAddModal:isOpen}))

}))


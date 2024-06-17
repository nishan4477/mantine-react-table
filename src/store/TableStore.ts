import { set } from 'zod';
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
    setIsOpenAddModal: (isOpen:boolean)=>void,
    isSearched: boolean,
    setIsSearched: (isSearched:boolean)=>void,
    searchProduct: Product[] | [],
    setSearchProduct: (products:Product[])=>void
    isSortName:boolean,
    setIsSortName:(isSort:boolean)=>void,
    sortNameOrder: 'asc' | 'desc',
    setSortNameOrder: (order: 'asc' | 'desc') => void,
    sortedProductName:  Product[] | [],
    setSortedProductName: (products:Product[])=>void,
    isSortTotal: boolean,
    setIsSortTotal: (isSort:boolean)=>void,
    sortedProductTotal: Product[] | [],
    setSortedProductTotal: (products:Product[])=>void
    sortTotalOrder: "asc" | 'desc',
    setSortTotalOrder: (order: "asc" | 'desc') => void
    
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
setIsOpenAddModal: (isOpen:boolean)=>set(()=>({isOpenAddModal:isOpen})),
isSearched: false,
setIsSearched: (isSearched:boolean)=>set(()=>({isSearched:isSearched})),
searchProduct: products,
setSearchProduct: (products:Product[])=>set(()=>({searchProduct:products})),
isSortName:false,
setIsSortName:(isSort:boolean)=>set(()=>({isSortName:isSort})),
sortNameOrder: 'asc',
setSortNameOrder: (order: 'asc' | 'desc') => set(()=>({sortNameOrder:order})),
sortedProductName: products,
setSortedProductName: (products:Product[])=>set(()=>({sortedProductName:products})),
isSortTotal: false,
setIsSortTotal: (isSort:boolean)=>set(()=>({isSortTotal:isSort})),
sortedProductTotal: products,
setSortedProductTotal: (products:Product[])=>set(()=>({sortedProductTotal:products})),
sortTotalOrder: "asc",
setSortTotalOrder: (order: "asc" | 'desc') => set(()=>({sortTotalOrder:order}))

}))


import { create } from "zustand";
import { products } from "../data";
import { Product } from "../types";

interface ProductStore {
  products: Product[];
  setProducts: (products: Product[]) => void;
  deleteProductId: number | null;
  setDeleteProductId: (id: number | null) => void;
  editProductId: number | null;
  setEditProductId: (id: number | null) => void;
  isOpenEditModal: boolean;
  setIsOpenEditModal: (isOpen: boolean) => void;
  isOpenAddModal: boolean;
  setIsOpenAddModal: (isOpen: boolean) => void;
  isSearched: boolean;
  setIsSearched: (isSearched: boolean) => void;
  searchProduct: Product[] | [];
  setSearchProduct: (products: Product[]) => void;

  sort: { name: null | "name" | "total"; type: null | "asc" | "desc" };
  setSort: (name: null | "name" | "total", type: null | "asc" | "desc") => void;
  sortedProducts: Product[];
  setSortedProducts: (sortProducts: Product[]) => void;
}

export const useTableStore = create<ProductStore>()((set) => ({
  products: products || [],
  setProducts: (products: Product[]) => set(() => ({ products: products })),
  deleteProductId: null,
  setDeleteProductId: (id: number | null) =>
    set(() => ({ deleteProductId: id })),
  editProductId: null,
  setEditProductId: (id: number | null) => set(() => ({ editProductId: id })),
  isOpenEditModal: false,
  setIsOpenEditModal: (isOpen: boolean) =>
    set(() => ({ isOpenEditModal: isOpen })),
  isOpenAddModal: false,
  setIsOpenAddModal: (isOpen: boolean) =>
    set(() => ({ isOpenAddModal: isOpen })),
  isSearched: false,
  setIsSearched: (isSearched: boolean) =>
    set(() => ({ isSearched: isSearched })),
  searchProduct: products,
  setSearchProduct: (products: Product[]) =>
    set(() => ({ searchProduct: products })),
  sort: { name: null, type: null },
  setSort: (name: null | "name" | "total", type: null | "asc" | "desc") =>
    set(() => ({ sort: { name: name, type: type } })),
  sortedProducts: products,
  setSortedProducts: (sortProducts: Product[]) =>
    set(() => ({ sortedProducts: sortProducts })),
}));

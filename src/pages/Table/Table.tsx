import React, { useState, useMemo } from "react";

import { products } from "../../data";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, TextInput } from "@mantine/core";

import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from "mantine-react-table";
import { Product } from "../../types";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useTableStore } from "../../store/TableStore";
import EditModal from "../../components/EditModal/EditModal";
import { useDebouncedCallback } from "@mantine/hooks";

const Table = () => {
  const [opened, handler] = useDisclosure(false);

  const [
    products,
    setProducts,
    deleteProductId,
    setDeleteProductId,
    setEditProductId,
    setIsOpenEditModal,
    setIsOpenAddModal,
    isSearched,
    setIsSearched,
    searchProduct,
    setSearchProduct,
    // isOpenAddModal

    // isOpenEditModal
  ] = useTableStore((state) => [
    state.products,
    state.setProducts,
    state.deleteProductId,
    state.setDeleteProductId,
    state.setEditProductId,
    state.setIsOpenEditModal,
    state.setIsOpenAddModal,
    state.isSearched,
    state.setIsSearched,
    state.searchProduct,
    state.setSearchProduct,

    // state.isOpenAddModal

    // state.isOpenEditModal
  ]);

  function handleDelete() {
    const temp = [...products];
    const filterdTemp = temp.filter(
      (product) => product.id !== deleteProductId
    );
    setProducts(filterdTemp);
    handler.close();
    setDeleteProductId(null);
  }

  function handleModalClose() {
    handler.close();
  }
  const columns = useMemo<MRT_ColumnDef<Product>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        filterVariant: "autocomplete",
        filterFn: "contains",
        Cell: (info) => `${info.row.original.id}- ${info.row.original.name}`,
        // columnFilterModeOptions: ['fuzzy', 'contains', 'startsWith'],
        sortingFn: "textCaseSensitive",
      },
      {
        accessorKey: "quantity",
        header: "Quantity",
      },
      {
        accessorKey: "price",
        header: "Price",
        Cell: ({ cell }) =>
          cell.getValue<number>().toLocaleString("en-NP", {
            style: "currency",

            currency: "NPR",
          }),

        filterVariant: "range-slider",

        filterFn: "betweenInclusive", // default (or between)

        mantineFilterRangeSliderProps: {
          max: 1000, //custom max (as opposed to faceted max)

          min: 1, //custom min (as opposed to faceted min)

          step: 1,

          label: (value) =>
            value.toLocaleString("en-NP", {
              style: "currency",
              currency: "NPR",
            }),
        },
      },
      {
        accessorKey: "total",
        header: "Total",
        Cell: ({ cell }) =>
          cell.getValue<number>().toLocaleString("en-NP", {
            style: "currency",

            currency: "NPR",
          }),

        filterVariant: "range-slider",

        filterFn: "betweenInclusive", // default (or between)

        mantineFilterRangeSliderProps: {
          max: 100000, //custom max (as opposed to faceted max)

          min: 100, //custom min (as opposed to faceted min)

          step: 1,
          label: (value) =>
            value.toLocaleString("en-NP", {
              style: "currency",

              currency: "NPR",
            }),
        },
      },
      {
        id: "actions",
        header: "Actions",
        Cell: (info) => (
          <div className="flex gap-2">
            <button
              onClick={() => {
                setEditProductId(info.row.original.id);
                setIsOpenEditModal(true);
              }}
            >
              <IconEdit size={20} />
            </button>
            <button
              onClick={() => {
                handler.open();
                setDeleteProductId(info.row.original.id);
              }}
            >
              <IconTrash size={20} />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const handleOnchangeSearch = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.trim();
      if (value === "") {
        setSearchProduct(products);
      }
      const filterProducts = products.filter((product) => {
        return product.name.toLowerCase().includes(value.toLowerCase());
      });

      setSearchProduct(filterProducts);
    },
    500
  );

  function handleManualSearch(val: string | undefined) {
    debugger;
    if (val === undefined) {
      setSearchProduct(products);
      return;
    }
    const value = val.trim();
    if (value === "") {
      setSearchProduct(products);
      return;
    }
    const filterProducts = products.filter((product) => {
      return product.name.toLowerCase().includes(value.toLowerCase());
    });

    setSearchProduct(filterProducts);
  }

  const table = useMantineReactTable({
    columns,
    data: searchProduct,

    // data: isSearched ? searchProduct : products, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    // enableGlobalFilter: false,
    // manualFiltering: true,
    enableFilterMatchHighlighting: true,
    // globalFilterFn: "contains",
    // manualFiltering: true,
    // globalFilterModeOptions: ["contains", "startsWith", "endsWith"],
    onGlobalFilterChange: handleManualSearch,
    // enableEditing: true,
    // onEditingRowSave: handleSaveRow,
    initialState: {
      showColumnFilters: true,
    },
  });

  return (
    <div>
      <div className="flex justify-end items-center gap-6">
        {/* <TextInput
          placeholder="Search"
          onChange={handleOnchangeSearch}
          onClick={() => setIsSearched(true)}
          onBlur={() => setIsSearched(false)}
        /> */}
        <Button
          className="mr-4 my-4"
          color="blue"
          onClick={() => {
            setIsOpenAddModal(true);
            setIsOpenEditModal(true);
          }}
        >
          Add Product
        </Button>
      </div>

      <Modal
        closeOnClickOutside
        centered
        opened={opened}
        onClose={handleModalClose}
        title="Delete Product"
      >
        {/* Modal content */}
        <h3 className="text-lg text-red-700 font-medium ">
          Are you sure you want to delete the item?
        </h3>
        <div className="flex justify-center items-center gap-4 mt-2">
          <Button onClick={handler.close}>No</Button>
          <Button color="red" onClick={handleDelete}>
            Yes
          </Button>
        </div>
      </Modal>
      <EditModal />

      <MantineReactTable table={table} />
    </div>
  );
};

export default Table;

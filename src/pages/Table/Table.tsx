import React, { useState, useMemo } from "react";

import { products } from "../../data";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";

import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from "mantine-react-table";
import { Product } from "../../types";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useTableStore } from "../../store/TableStore";
import EditModal from "../../components/EditModal/EditModal";

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
        Cell: (info) => `${info.row.original.id}- ${info.row.original.name}`,
      },
      {
        accessorKey: "quantity",
        header: "Quantity",
      },
      {
        accessorKey: "price",
        header: "Price",
      },
      {
        accessorKey: "total",
        header: "Total",
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

  const table = useMantineReactTable({
    columns,
    data: products, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
  });
  return (
    <div>
        <div className="flex justify-end">
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

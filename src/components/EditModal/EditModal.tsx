import React, { useEffect } from "react";
import { Modal, Button, TextInput, NumberInput } from "@mantine/core";
import { useTableStore } from "../../store/TableStore";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { z } from "zod";
import { Product } from "../../types";

const schema = z.object({
  name: z.string().min(1, { message: "Name cannot be empty" }),
  quantity: z.number().min(0, { message: "Quantity cannot be negative" }),
  price: z.number().min(0, { message: "Price cannot be negative" }),
});

const EditModal = () => {
  const [
    isOpenEditModal,
    setIsOpenEditModal,
    editProductId,
    setEditProductId,
    products,
    setProducts,
    isOpenAddModal,
    setIsOpenAddModal,
  ] = useTableStore((state) => [
    state.isOpenEditModal,
    state.setIsOpenEditModal,
    state.editProductId,
    state.setEditProductId,
    state.products,
    state.setProducts,
    state.isOpenAddModal,
    state.setIsOpenAddModal,
  ]);
  function close() {
    setIsOpenEditModal(false);
    setIsOpenAddModal(false);
    // form.reset
  }

  useEffect(() => {
    if (editProductId && !isOpenAddModal) {
      const product: Product | undefined = products.find(
        (product: Product) => product.id === editProductId
      );
      if (!product) {
        return;
      }
      form.setValues({
        name: product.name,
        quantity: product.quantity,
        price: product.price,
      });
    }
    if (isOpenAddModal) {
      form.setValues({
        name: "",
        quantity: 0,
        price: 0,
      });
    }
  }, [editProductId, isOpenAddModal]);
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      quantity: 0,
      price: 0,
    },
    validate: zodResolver(schema),
  });

  form.setInitialValues;

  interface editVal {
    name: string;
    quantity: number;
    price: number;
  }
  function handleEdit(val: editVal) {
    if (!editProductId) {
      setIsOpenEditModal(false);
      return null;
    }

    const updatedProduct = {
      id: editProductId,
      ...val,
      total: val.quantity * val.price,
    };

    const index =
      editProductId &&
      products.findIndex((product: Product) => {
        return product.id == editProductId;
      });

    if (index === -1) {
      alert("Product not found");
      return;
    }
    let temp = [...products];
    temp.splice(index, 1, updatedProduct);

    setProducts(temp);

    setEditProductId(null);

    setIsOpenEditModal(false);
    form.reset();
  }

  function handleAdd(val: editVal) {
    const newProduct = {
      id: Math.ceil(Math.random() * 10000),
      ...val,
      total: val.quantity * val.price,
    };

    setProducts([...products, newProduct]);
    setIsOpenAddModal(false);
    setIsOpenEditModal(false);
    form.reset();
  }
  return (
    <>
      <Modal
        closeOnClickOutside
        centered
        opened={isOpenEditModal}
        onClose={close}
        title={isOpenAddModal ? "Add the Product" : "Edit the Product"}
        size="lg"
      >
        <form onSubmit={form.onSubmit(isOpenAddModal ? handleAdd : handleEdit)}>
          <TextInput  
            className="mb-2"
            withAsterisk
            label="Product Name"
            placeholder=" Enter the name of product here..."
            key={form.key("name")}
            {...form.getInputProps("name")}
          />
          <NumberInput
            withAsterisk
            label="Quantity"
            // description="Input description"
            className="mb-2"
            key={form.key("quantity")}
            {...form.getInputProps("quantity")}
          />
          <NumberInput
            withAsterisk
            label="Price"
            // description="Input description"
            // placeholder="Input placeholder"
            key={form.key("price")}
            {...form.getInputProps("price")}
          />
          <Button className="mt-4" type="submit">
            {isOpenAddModal ? "Add" : "Edit"}
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default EditModal;

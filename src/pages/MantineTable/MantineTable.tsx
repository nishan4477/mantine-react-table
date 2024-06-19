import React, { useEffect, useState } from "react";
import { ScrollArea, Select, Table, TextInput } from "@mantine/core";
import clsx from "clsx";
import classes from "./MantineTable.module.scss";
import { useDebouncedCallback } from "@mantine/hooks";
import { Search } from "tabler-icons-react";

import { products } from "../../data";
import { useTableStore } from "../../store/TableStore";
import { ArrowsSort } from "tabler-icons-react";
import { SortAscending } from "tabler-icons-react";
import { SortDescending } from "tabler-icons-react";
import { Pagination, Text } from "@mantine/core";

const MantineTable = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [activePage, setPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [
    searchProduct,
    setSearchProduct,
    products,
    setProducts,
    isSearched,
    setIsSearched,
    isSortName,
    setIsSortName,
    sortNameOrder,
    setSortNameOrder,
    sortedProductName,
    setSortedProductName,
    isSortTotal,
    setIsSortTotal,
    sortedProductTotal,
    setSortedProductTotal,
    sortTotalOrder,
    setSortTotalOrder,
  ] = useTableStore((state) => [
    state.searchProduct,
    state.setSearchProduct,
    state.products,
    state.setProducts,
    state.isSearched,
    state.setIsSearched,
    state.isSortName,
    state.setIsSortName,
    state.sortNameOrder,
    state.setSortNameOrder,
    state.sortedProductName,
    state.setSortedProductName,
    state.isSortTotal,
    state.setIsSortTotal,
    state.sortedProductTotal,
    state.setSortedProductTotal,
    state.sortTotalOrder,
    state.setSortTotalOrder,
  ]);

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

  function handleSortName() {
    // if (isSortName) {

    let temp = [...products];
    if (sortNameOrder === "asc") {
      temp.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      temp.sort((a, b) => b.name.localeCompare(a.name));
    }
    setSortedProductName(temp);
    // }
  }

  function handleSortTotal() {
    let temp = [...products];
    if (sortTotalOrder === "asc") {
      temp.sort((a, b) => a.total - b.total);
    } else {
      temp.sort((a, b) => b.total - a.total);
    }
    setSortedProductTotal(temp);
  }

  useEffect(() => {
    if (isSortName) {
      handleSortName();
    }
  }, [isSortName, sortNameOrder]);

  useEffect(() => {
    if (isSortTotal) {
      handleSortTotal();
    }
  }, [isSortTotal, sortTotalOrder]);

  const tableData = isSortTotal
    ? sortedProductTotal
    : isSortName
    ? sortedProductName
    : isSearched
    ? searchProduct
    : products;

  const totalPages = Math.ceil(tableData.length / itemsPerPage);
  const currentPageData = tableData?.slice(
    (activePage - 1) * itemsPerPage,
    activePage * itemsPerPage
  );

  const rows = currentPageData.map((product) => (
    <Table.Tr key={product.id}>
      <Table.Td>{product.name}</Table.Td>
      <Table.Td>{product.quantity}</Table.Td>
      <Table.Td>Rs. {product.price}</Table.Td>
      <Table.Td>Rs. {product.total} </Table.Td>
    </Table.Tr>
  ));

  return (
    <div className="mantine-table px-4 py-4  w-full h-screen">
      <div className="relative">
        <TextInput
          styles={{
            input: {
              paddingLeft: "30px",
            },
          }}
          className="w-64"
          placeholder="Search by products name"
          onChange={handleOnchangeSearch}
          onClick={() => {
            setIsSortName(false);
            setIsSortTotal(false);
            setSortNameOrder("asc");
            setSortTotalOrder("asc");
            setIsSearched(true);
          }}
          onBlur={() => setIsSearched(false)}
        />
        <span className="absolute top-2 left-2 ">
          <Search size={20} strokeWidth={1.5} color={"#D3D3D3"} />
        </span>
      </div>

      <ScrollArea
        h={600}
        onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
        className="mt-4"
        scrollbarSize="8px"
      >
        <Table
          withTableBorder
          stickyHeader
          withRowBorders
          highlightOnHover
          withColumnBorders
          miw={700}
          styles={{ td: { color: "#1a324a" } }}
          className="mt-4"
        >
          <Table.Thead
            className={clsx(classes.header, { [classes.scrolled]: scrolled })}
          >
            <Table.Tr>
              <Table.Th className="flex items-center gap-2 cursor-pointer">
                Name
                {isSortName ? (
                  sortNameOrder === "asc" ? (
                    <SortAscending
                      size={24}
                      strokeWidth={1.5}
                      color={"black"}
                      onClick={() => {
                        setSortNameOrder("desc");
                      }}
                    />
                  ) : (
                    <SortDescending
                      size={24}
                      strokeWidth={1.5}
                      color={"black"}
                      onClick={() => {
                        setIsSortName(false);
                        setSortNameOrder("asc");
                      }}
                    />
                  )
                ) : (
                  <ArrowsSort
                    size={24}
                    strokeWidth={1.5}
                    color={"black"}
                    onClick={() => setIsSortName(true)}
                  />
                )}
              </Table.Th>
              <Table.Th>Quantity</Table.Th>
              <Table.Th>Price</Table.Th>
              <Table.Th className="flex items-center gap-2 cursor-pointer">
                Total
                {isSortTotal ? (
                  sortTotalOrder === "asc" ? (
                    <SortAscending
                      size={24}
                      strokeWidth={1.5}
                      color={"black"}
                      onClick={() => {
                        setSortTotalOrder("desc");
                      }}
                    />
                  ) : (
                    <SortDescending
                      size={24}
                      strokeWidth={1.5}
                      color={"black"}
                      onClick={() => {
                        setIsSortTotal(false);
                        setSortTotalOrder("asc");
                      }}
                    />
                  )
                ) : (
                  <ArrowsSort
                    size={24}
                    strokeWidth={1.5}
                    color={"black"}
                    onClick={() => setIsSortTotal(true)}
                  />
                )}
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </ScrollArea>
      <div className="flex  gap-4">
        <Pagination
          total={totalPages}
          value={activePage}
          onChange={(page) => setPage(page)}
          mt="sm"
        />
        <Select
          className="w-24 mt-3"
          placeholder="Pick value"
          data={["10", "20", "50"]}
          defaultValue="10"
          onChange={(val) => setItemsPerPage(Number(val))}
        />
      </div>
    </div>
  );
};

export default MantineTable;

import { ScrollArea, Select, Table, TextInput } from "@mantine/core";
import { useDebouncedCallback } from "@mantine/hooks";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { Search } from "tabler-icons-react";
import classes from "./MantineTable.module.scss";
import { Pagination } from "@mantine/core";
import SortIcons from "../../components/SortIcons/SortIcons";
import { useTableStore } from "../../store/TableStore";

const MantineTable = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activePage, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [
    searchProduct,
    setSearchProduct,
    products,
    isSearched,
    setIsSearched,
    sort,
    setSort,
    sortedProducts,
    setSortedProducts,
  ] = useTableStore((state) => [
    state.searchProduct,
    state.setSearchProduct,
    state.products,
    state.isSearched,
    state.setIsSearched,
    state.sort,
    state.setSort,
    state.sortedProducts,
    state.setSortedProducts,
  ]);

  const handleOnchangeSearch = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.trim();
      if (value === "") {
        setSearchProduct(products);
        return;
      }
      const filterProducts = products.filter((product) => {
        return product.name.toLowerCase().includes(value.toLowerCase());
      });
      setSearchProduct(filterProducts);
    },
    500,
  );

  const handleSort = () => {
    const temp = [...products];
    if (sort.name === "name") {
      if (sort.type === "asc") {
        temp.sort((a, b) => a.name.localeCompare(b.name));
      } else {
        temp.sort((a, b) => b.name.localeCompare(a.name));
      }
      setSortedProducts(temp);
    }

    if (sort.name === "total") {
      if (sort.type === "asc") {
        temp.sort((a, b) => a.total - b.total);
      } else {
        temp.sort((a, b) => b.total - a.total);
      }
      setSortedProducts(temp);
    }
  };

  useEffect(() => {
    if (sort.name !== null) {
      handleSort();
    }
  }, [sort.name, sort.type]);

  const tableData = isSearched
    ? searchProduct
    : sort.name === null
      ? products
      : sortedProducts;

  const totalPages = Math.ceil(tableData.length / itemsPerPage);
  const currentPageData = tableData?.slice(
    (activePage - 1) * itemsPerPage,
    activePage * itemsPerPage,
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
            setSort(null, null);
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
                <SortIcons name="name" />
              </Table.Th>
              <Table.Th>Quantity</Table.Th>
              <Table.Th>Price</Table.Th>
              <Table.Th className="flex items-center gap-2 cursor-pointer">
                Total
                <SortIcons name="total" />
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

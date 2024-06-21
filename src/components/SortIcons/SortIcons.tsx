import { ArrowsSort, SortAscending, SortDescending } from "tabler-icons-react";
import { useTableStore } from "../../store/TableStore";

const SortIcons = ({ name }: { name: "name" | "total" }) => {
  const [sort, setSort] = useTableStore((state) => [state.sort, state.setSort]);
  return (
    <>
      {sort.name === name ? (
        sort.type === "asc" ? (
          <SortAscending
            size={24}
            strokeWidth={1.5}
            color={"black"}
            onClick={() => {
              setSort(name, "desc");
            }}
          />
        ) : (
          <SortDescending
            size={24}
            strokeWidth={1.5}
            color={"black"}
            onClick={() => {
              setSort(null, null);
            }}
          />
        )
      ) : (
        <ArrowsSort
          size={24}
          strokeWidth={1.5}
          color={"black"}
          onClick={() => {
            setSort(name, "asc");
          }}
        />
      )}
    </>
  );
};

export default SortIcons;

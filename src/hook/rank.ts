import { Book } from "../types";
import { useData } from "./data";

const useBookRank = () => useData<Book[]>(["rank"], "/books/rank");

export default useBookRank;

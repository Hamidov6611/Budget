import { FC, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Form, useLoaderData } from "react-router-dom";
import { IResponseTransationLoader, ITransaction } from "../types/types";
import { formatData } from "../helpers/date.helpers";
import { formatToUSD } from "../helpers/currency.helper";
import { instance } from "../api/axios.api";
import ReactPaginate from "react-paginate";

interface ITransactionTable {
  limit?: number;
}

const TransactionsTable: FC<ITransactionTable> = ({ limit = 3 }) => {
  const { transactions } = useLoaderData() as IResponseTransationLoader;
  const { categories } = useLoaderData() as IResponseTransationLoader;

  const [data, setData] = useState<ITransaction[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [categoryId, setCategoryId] = useState<string>("");

  const fetchTransactions = async (page: number) => {
    const { data } = await instance.get(
      `/transactions/pagination?page=${page}&limit=${limit}`
    );
    setData(data.data);
    setTotalPage(Math.ceil(transactions.length / limit));
  };

  const hnadlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected + 1);
  };

  useEffect(() => {
    fetchTransactions(currentPage);
  }, [currentPage, transactions]);

  const SortByCategory = async () => {
    if (categoryId == "all") {
      fetchTransactions(1);
    }
    const { data } = await instance.get(`/categories/sort/${categoryId}`);
    console.log(data);
    setData(data[0]?.transactions);
  };
  useEffect(() => {
    SortByCategory();
  }, [categoryId]);

  const SortByType = async (type: string) => {
    const { data } = await instance.get(`/transactions/type/${type}`);
    setData(data);
  };
  return (
    <>
      <div className="flex justify-end gap-x-4 items-center">
        <div className="flex mt-4 gap-x-3 items-center">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="radio"
              name="type"
              value={"income"}
              onChange={(e) => SortByType(e.target.value)}
              className="form-radio text-blue-600"
            />
            <span>Income</span>
          </label>
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="radio"
              name="type"
              value={"expense"}
              onChange={(e) => SortByType(e.target.value)}
              className="form-radio text-blue-600"
            />
            <span>Expense</span>
          </label>
        </div>
        <Form method="GET" action="/categories">
          <label htmlFor="category" className="flex mt-4 items-center gap-x-3">
            <select
              onChange={(e) => {
                setCategoryId(e.target.value);
              }}
              required
              className="input2 border-slate-700 px-3"
            >
              <option value="all">All</option>
              {categories?.map((ctg, idx) => (
                <option key={idx} value={ctg.id}>
                  {ctg.title}
                </option>
              ))}
            </select>
          </label>
        </Form>

        <ReactPaginate
          className="flex gap-3 justify-end mt-4 items-center"
          activeClassName="bg-blue-600 rounded-sm"
          pageLinkClassName="text-white text-xs py-1 px-2 rounded-sm"
          previousClassName="text-white py-2 px-2 bg-slate-800 rounded-sm text-xs"
          nextClassName="text-white py-2 px-2 bg-slate-800 rounded-sm text-xs"
          disabledClassName="text-white/50 cursor-not-allowed"
          disabledLinkClassName="text-slate-600 cursor-not-allowed"
          pageCount={totalPage}
          pageRangeDisplayed={1}
          marginPagesDisplayed={2}
          onPageChange={hnadlePageChange}
        />
      </div>

      <div className="bg-slate-800 px-4 py-3 mt-4 rounded-md">
        {data ? (
          <table className="w-full">
          <thead>
            <tr>
              <td className="font-bold">№</td>
              <td className="font-bold">Title</td>
              <td className="font-bold">Amount($)</td>
              <td className="font-bold">Category</td>
              <td className="font-bold">Date</td>
              <td className="font-bold text-right">Action</td>
            </tr>
          </thead>
          <tbody>
            {data?.map((transaction, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{transaction.title}</td>
                <td
                  className={
                    transaction.type === "income"
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {transaction.type === "income"
                    ? `+ ${formatToUSD.format(transaction.amount)}`
                    : `- ${formatToUSD.format(transaction.amount)}`}
                </td>
                <td>{transaction.category?.title || "Other"}</td>
                <td>{formatData(transaction.createdAt)}</td>
                <td>
                  <Form method="delete" action="/transactions">
                    <input type="hidden" name="id" value={transaction.id} />
                    <button className="btn hover:btn-red ml-auto">
                      <FaTrash />
                    </button>
                  </Form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        ): (
          <div>
            <p>Empty transactions</p>
          </div>
        )}
      </div>
    </>
  );
};

export default TransactionsTable;

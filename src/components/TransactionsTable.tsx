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
  const [data, setData] = useState<ITransaction[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

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
  return (
    <>
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

      <div className="bg-slate-800 px-4 py-3 mt-4 rounded-md">
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
                <td>{transaction.id}</td>
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
      </div>
    </>
  );
};

export default TransactionsTable;

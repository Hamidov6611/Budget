import { FC } from "react";
import TransactionForm from "../components/TransactionForm";
import { instance } from "../api/axios.api";
import {
  ICategory,
  IResponseTransationLoader,
  ITransaction,
} from "../types/types";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { TransactionsTable } from "../components";
import { formatToUSD } from "../helpers/currency.helper";
import Chart from "../components/Chart";

export const transactionLoader = async () => {
  const categories = await instance.get<ICategory[]>("/categories");
  const transactions = await instance.get<ITransaction[]>("/transactions");
  const totalIncome = await instance.get<number>("/transactions/income/find");
  const totalExpense = await instance.get<number>("/transactions/expense/find");
  const data = {
    categories: categories.data,
    transactions: transactions.data,
    totalIncome: totalIncome.data,
    totalExpense: totalExpense.data,
  };
  return data;
};

export const transactionAction = async ({ request }: any) => {
  switch (request.method) {
    case "POST": {
      const formData = await request.formData();
      const newTransaction = {
        title: formData.get("title"),
        amount: +formData.get("amount"),
        category: formData.get("category"),
        type: formData.get("type"),
      };

      await instance.post("/transactions", newTransaction);
      toast.success("Transaction added.");
      return null;
    }
    case "DELETE": {
      const formData = await request.formData();
      const transactionId = formData.get("id");
      await instance.delete(`/transactions/transaction/${transactionId}`);
      toast.success("Transaction deleted.");
      return null;
    }
  }
};

const Transactions: FC = () => {
  const { totalIncome, totalExpense } =
    useLoaderData() as IResponseTransationLoader;
  return (
    <>
      <div className="grid grid-cols-3 gap-4 mt-4 items-start">
        {/* Add Transactios Form */}
        <div className="col-span-2 grid">
          <TransactionForm />
        </div>

        {/* Statistic blocks */}
        <div className="rounded-lg  bg-slate-800 p-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="uppercase text-base text-center font-bold">
                Total income
              </p>
              <p className="mt-2 bg-green-600 p-1 text-center">
                {formatToUSD.format(totalIncome)}
              </p>
            </div>
            <div>
              <p className="uppercase text-base text-center font-bold">
                Total Expense
              </p>
              <p className="mt-2 bg-red-600 p-1 text-center">
                {formatToUSD.format(totalExpense)}
              </p>
            </div>
          </div>
          <>
            <Chart totalExpense={totalExpense} totalIncome={totalIncome} />
          </>
        </div>
      </div>

      {/* Result Table */}
      <div className="my-5">
        <TransactionsTable limit={5} />
      </div>
    </>
  );
};

export default Transactions;

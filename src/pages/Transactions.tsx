import { FC } from "react";
import TransactionForm from "../components/TransactionForm";
import { instance } from "../api/axios.api";
import { ICategory, IResponseTransationLoader } from "../types/types";
import { useLoaderData } from "react-router-dom";

export const transactionLoader = async () => {
  const categories = await instance.get<ICategory[]>("/categories");
  const data = {
    categories: categories.data,
  };
  return data;
};

export const transactionAction = async () => {
  const data = {};
  return data;
};

const Transactions: FC = () => {
  const { categories } = useLoaderData() as IResponseTransationLoader;
  console.log(categories)
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
              <p className="mt-2 bg-green-600 p-1 text-center">1000$</p>
            </div>
            <div>
              <p className="uppercase text-base text-center font-bold">
                Total Expense
              </p>
              <p className="mt-2 bg-red-600 p-1 text-center">1000$</p>
            </div>
          </div>
          <div>Chart</div>
        </div>
      </div>

      {/* Result Table */}
      <h1>Table</h1>
    </>
  );
};

export default Transactions;

import { FC } from "react";
import { FaPlus } from "react-icons/fa";
import { Form } from "react-router-dom";

const TransactionForm: FC = () => {
  return (
    <div className="rounded-md bg-slate-800 p-4 mb-4">
      <Form method="post" action="/transactions" className="grid gap-2">
        <label className="grid" htmlFor="title">
          <span>Title</span>
          <input
            type="text"
            className="input border-slate-700"
            name="title"
            placeholder="Title..."
            required
          />
        </label>
        <label className="grid" htmlFor="title">
          <span>Amont</span>
          <input
            type="number"
            className="input border-slate-700"
            name="amount"
            placeholder="Amount..."
            required
          />
        </label>

        {/* Select */}
        <label htmlFor="category" className="grid">
          <span>Category</span>
          <select name="category" required className="input border-slate-700">
            <option value="1">Salary</option>
            <option value="2">Gift</option>
            <option value="3">Grocery</option>
          </select>
        </label>

        <button
          onClick={() => {}}
          className="mt-2 flex max-w-fit items-center gap-2 text-white/50 hover:text-white"
        >
          <FaPlus />
          <span>Manage Categories</span>
        </button>

        {/* Radio Buttons */}
        <div className="flex gap-4 items-center">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="radio"
              name="type"
              value={"income"}
              className="form-radio text-blue-600"
            />
            <span>Income</span>
          </label>
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="radio"
              name="type"
              value={"expense"}
              className="form-radio text-blue-600"
            />
            <span>Expense</span>
          </label>
        </div>

        {/* Submit Buttons */}
        <button className="btn btn-green mt-2 max-w-fit">Submit</button>
      </Form>
    </div>
  );
};

export default TransactionForm;

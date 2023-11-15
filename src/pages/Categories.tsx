import { FC, useState } from "react";
import { AiFillEdit, AiFillCloseCircle } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { Form, useLoaderData } from "react-router-dom";
import { CategoryModal } from "../components";
import { instance } from "../api/axios.api";
import { ICategory } from "../types/types";

export const categoriesAction = async ({ request }: any) => {
  console.log(request);
  switch (request.method) {
    case "POST": {
      const formData = await request.formData();
      console.log(formData);
      const title = {
        title: formData.get("title"),
      };
      await instance.post("/categories", title);
      return null;
    }
    case "PATCH": {
      const formData = await request.formData();
      const category = {
        id: formData.get("id"),
        title: formData.get("title"),
      };
      await instance.patch(`/categories/category/${category.id}`, {title: category.title});
      return null;
    }
    case "DELETE": {
      const formData = await request.formData();
      const categoryId = {
        id: formData.get("id"),
      };
      await instance.delete(`/categories/category/${categoryId.id}`);
      return null;
    }
  }
};

export const categoryLoader = async () => {
  const { data } = await instance.get<ICategory[]>("/categories");
  return data;
};

const Categories: FC = () => {
  const categories = useLoaderData() as ICategory[];
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const [categoryId, setCategoryId] = useState<number>(0);
  const [isEdit, setIsEdit] = useState(false)
  return (
    <>
      <div className="mt-10 p-4 rounded-md bg-slate-800">
        <h1>Your category list:</h1>
        {/* Category List */}
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {categories?.map((category, idx) => (
            <div
              key={idx}
              className="group relative py-2 px-4 rounded-lg bg-blue-600 flex  items-center  gap-2"
            >
              {category.title}
              <div className="absolute bottom-0 left-0 right-0 hidden top-0 rounded-lg gap-x-3 bg-black/90 px-3 group-hover:flex items-center justify-center">
                <button onClick={() => {
                  setCategoryId(category.id)
                  // setVisibleModal(true)
                  setIsEdit(true)
                }}>
                  <AiFillEdit />
                </button>

                <Form className="flex " method="delete" action="/categories">
                  <input type="hidden" value={category.id} name="id" />
                  <button type="submit">
                    <AiFillCloseCircle />
                  </button>
                </Form>
              </div>
            </div>
          ))}
        </div>

        {/* Add category */}
        <button
          onClick={() => setVisibleModal(true)}
          className="mt-5 flex max-w-fit items-center gap-2 text-white/50 hover:text-white"
        >
          <FaPlus />
          <span>Create a new category</span>
        </button>
      </div>

      {/* Add Category Modal */}
      {visibleModal && (
        <CategoryModal type="post" setVisibleModal={setVisibleModal} />
      )}

      {/* Edit Category Modal */}
      {isEdit && (
        <CategoryModal type="patch" id={categoryId} setVisibleModal={setIsEdit} />
      )}
    </>
  );
};

export default Categories;

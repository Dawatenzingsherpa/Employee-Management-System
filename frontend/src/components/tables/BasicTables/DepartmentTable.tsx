import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { useEffect } from "react";

import {
  deleteDepartment,
  fetchDepartmentData,
  setDeleteDepartment,
  setSingleDepartment,
} from "../../../store/DepartmentSlice";
import { Link, useNavigate } from "react-router";

export default function DepartmentTable() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { departments } = useAppSelector((state) => state.department);
  const handleDelete = async (id: string) => {
    await dispatch(setDeleteDepartment(id));
    dispatch(deleteDepartment(id));
  };

  useEffect(() => {
    dispatch(fetchDepartmentData());
  }, [dispatch]);

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Department Name
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Created At
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Updated At
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {departments.map((department) => (
                <TableRow key={department?.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      {department?.departmentName}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {new Date(
                      department?.createdAt as string,
                    ).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {new Date(
                      department?.updatedAt as string,
                    ).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <button
                      className="bg-blue-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200"
                      onClick={() => {
                        dispatch(setSingleDepartment(department));
                        navigate("/edit-form", {
                          state: {
                            type: "department",
                          },
                        });
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200"
                      onClick={() => handleDelete(department?.id)}
                    >
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="p-4">
        <Link to={"/form-elements"}>
          <button
            type="button"
            className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
          >
            Add Department
          </button>
        </Link>
      </div>
    </>
  );
}

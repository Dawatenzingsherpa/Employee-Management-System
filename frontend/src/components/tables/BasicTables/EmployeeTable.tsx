import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { useEffect, useState } from "react";
import {
  deleteEmployeeRecord,
  fetchEmployeeData,
  setDeleteEmployee,
  setSingleEmployee,
} from "../../../store/EmployeeSlice";
import { Link, useNavigate } from "react-router";

export default function EmployeeTable() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");
  const { employeeData } = useAppSelector((state) => state.employee);
  const handleDelete = async (id: string) => {
    await dispatch(setDeleteEmployee(id));
    dispatch(deleteEmployeeRecord(id));
  };

  useEffect(() => {
    dispatch(fetchEmployeeData());
  }, [dispatch]);

  const filteredEmployeeData = employeeData.filter((data) => {
    const matchesSearch = data?.firstName
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesSearch;
  });

  return (
    <>
      <div className="p-4">
        <input
          type="text"
          placeholder="Search "
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
        />
      </div>
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
                  Employee
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Department
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Phone Number
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Hire Date
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Salary
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {filteredEmployeeData.map((employee) => (
                <TableRow key={employee?.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <Link to={`/singlePage/${employee?.id}`}>
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {employee?.firstName} {employee?.lastName}
                        </span>
                        <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                          {employee?.email}
                        </span>
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {employee?.Department?.departmentName}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {employee?.phoneNumber}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {new Date(employee?.hireDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    ${employee?.salary?.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200"
                      onClick={() => {
                        dispatch(setSingleEmployee(employee));
                        navigate("/edit-form", {
                          state: {
                            type: "employee",
                          },
                        });
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200"
                      onClick={() => handleDelete(employee?.id)}
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
            Add Employee
          </button>
        </Link>
      </div>
    </>
  );
}

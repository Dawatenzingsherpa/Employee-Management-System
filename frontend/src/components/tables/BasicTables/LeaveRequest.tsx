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
  changeRequestStatus,
  fetchLeaveRequestData,
} from "../../../store/LeaveRequestSlice";
import { Link } from "react-router";

export default function LeaveRequestTable() {
  const dispatch = useAppDispatch();
  const { leaveRequestData } = useAppSelector((state) => state.leaveRequest);
  const [search, setSearch] = useState("");

  const handleStatusChange = (id: string, status: string) => {
    dispatch(changeRequestStatus(status, id));
  };

  useEffect(() => {
    dispatch(fetchLeaveRequestData());
  }, [dispatch]);

  const filteredLeaveRequest = leaveRequestData.filter((data) => {
    const matchesSearch = data?.Employee?.firstName
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
                  Requested On
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Leave Date
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Status
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {filteredLeaveRequest.map((leave) => (
                <TableRow key={leave?.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start text-gray-500 text-theme-sm dark:text-gray-400">
                    {leave?.Employee
                      ? `${leave?.Employee?.firstName} ${leave?.Employee?.lastName}`
                      : "—"}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {leave?.date}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {new Date(leave?.leaveDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <select
                      value={leave?.requestStatus || ""}
                      onChange={(e) =>
                        handleStatusChange(leave.id, e.target.value)
                      }
                      className="rounded-md border border-gray-300 px-3 py-1 text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
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
            Add Leave Request
          </button>
        </Link>
      </div>
    </>
  );
}

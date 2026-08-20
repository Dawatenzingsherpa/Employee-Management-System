import { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hook";
import {
  addLeaveRequest,
  checkIn,
  checkOut,
  fetchSingleAttendence,
  fetchSingleEmployee,
  fetchSingleLeaveRequest,
  fetchSinglePayroll,
  fetchSinglePerformance,
} from "../store/dataSlice";
import { useNavigate } from "react-router";
import { userLogout } from "../store/authSlice";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "attendance", label: "Attendance" },
  { id: "leave", label: "Leave Requests" },
  { id: "performance", label: "Performance" },
  { id: "payroll", label: "Payroll" },
];

const InfoCard = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900/50">
    <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-400">
      {label}
    </p>
    <p className="text-sm font-semibold text-gray-800 dark:text-white">
      {value}
    </p>
  </div>
);

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    Active: "bg-green-50 text-green-700 ring-green-600/20",
    Pending: "bg-yellow-50 text-yellow-700 ring-yellow-600/20",
    Approved: "bg-green-50 text-green-700 ring-green-600/20",
    Rejected: "bg-red-50 text-red-700 ring-red-600/20",
    Excellent: "bg-blue-50 text-blue-700 ring-blue-600/20",
    Good: "bg-green-50 text-green-700 ring-green-600/20",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${
        styles[status] || "bg-gray-50 text-gray-600 ring-gray-500/20"
      }`}
    >
      {status}
    </span>
  );
};

const SectionTitle = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => (
  <div className="mb-5">
    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
      {title}
    </h2>

    {description && (
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        {description}
      </p>
    )}
  </div>
);

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || token === null || token == undefined) navigate("/signin");
  }, []);

  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { token } = useAppSelector((state) => state.auth);
  console.log(token);
  const {
    employee,
    attendenceData,
    payrollData,
    performanceData,
    leaveRequestData,
  } = useAppSelector((state) => state.data);

  useEffect(() => {
    if (!token) return;
    console.log("tokne useeffect", token);
    dispatch(fetchSingleEmployee());
  }, [token]);

  useEffect(() => {
    dispatch(fetchSingleAttendence(employee.id));
    dispatch(fetchSinglePayroll(employee.id));
    dispatch(fetchSinglePerformance(employee.id));
    dispatch(fetchSingleLeaveRequest(employee.id));
  }, [employee]);

  const [activeTab, setActiveTab] = useState("overview");
  const [formData, setFormData] = useState({
    leaveDate: "",
    employeeId: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      employeeId: employee ? employee.id : "",
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("SUBMITTED");
    dispatch(addLeaveRequest(formData));
  };

  const handleLogOut = () => {
    dispatch(userLogout());
    navigate("/signin");
  };

  const currency = (value: number) => `NPR ${value.toLocaleString("en-NP")}`;

  return (
    <div className="min-h-screen bg-gray-50 p-4 dark:bg-gray-950 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Employee Details
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                View employee information, attendance, payroll and performance.
              </p>
            </div>
          </div>
          <button
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
            onClick={handleLogOut}
          >
            Logout
          </button>
        </div>

        {/* Profile */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="h-28 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />

          <div className="px-5 pb-6 sm:px-7">
            <div className="-mt-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white bg-gradient-to-br from-blue-500 to-indigo-600 text-2xl font-bold text-white shadow-md dark:border-gray-900">
                  {employee?.firstName?.slice(0, 1) +
                    employee?.lastName?.slice(0, 1)}
                </div>

                <div className="pb-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {employee?.firstName} {employee?.lastName}
                    </h2>
                  </div>

                  <p className="mt-1 text-sm text-gray-500">
                    {employee?.Department?.departmentName}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                Currently working
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 border-t border-gray-100 pt-6 sm:grid-cols-2 lg:grid-cols-4 dark:border-gray-800">
              <div>
                <p className="text-xs text-gray-400">Email</p>
                <p className="mt-1 text-sm font-medium text-gray-800 dark:text-gray-200">
                  {employee?.email}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">Phone</p>
                <p className="mt-1 text-sm font-medium text-gray-800 dark:text-gray-200">
                  +977 {employee?.phoneNumber}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">Department</p>
                <p className="mt-1 text-sm font-medium text-gray-800 dark:text-gray-200">
                  {employee?.Department?.departmentName}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">Employee ID</p>
                <p className="mt-1 text-sm font-medium text-gray-800 dark:text-gray-200">
                  {employee?.id}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="sticky top-4 z-10 overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="flex min-w-max">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`border-b-2 px-5 py-4 text-sm font-medium transition ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Overview */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <SectionTitle
                title="Employee Information"
                description="Basic employment information"
              />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <InfoCard label="Employee ID" value={employee?.id} />
                <InfoCard
                  label="Department"
                  value={employee?.Department?.departmentName}
                />
                <InfoCard label="Employment Type" value="Full Time" />
                <InfoCard label="Date Joined" value={employee?.hireDate} />
                <InfoCard label="Status" value="Active" />
                <InfoCard label="Location" value="Kathmandu, Nepal" />
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <SectionTitle
                title="Contact Information"
                description="Employee contact details"
              />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <InfoCard label="Email" value={employee?.email} />
                <InfoCard
                  label="Phone"
                  value={`+977 ${employee?.phoneNumber}`}
                />
                <InfoCard label="Address" value="Kathmandu, Nepal" />
              </div>
            </div>
          </div>
        )}

        {/* Attendance */}
        {activeTab === "attendance" && (
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="border-b border-gray-100 p-6 dark:border-gray-800">
              <SectionTitle
                title="Attendance"
                description="Employee attendance history"
              />
              <div className="flex gap-4">
                <button
                  className="rounded-lg bg-green-600 px-6 py-3 font-medium text-white hover:bg-green-700"
                  onClick={() => dispatch(checkIn(employee.id))}
                >
                  Check In
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] text-left">
                <thead className="bg-gray-50 dark:bg-gray-800/50">
                  <tr>
                    {[
                      "Date",
                      "Check In",
                      "Check Out",
                      "Working Hours",
                      "Overtime",
                      "action",
                    ].map((header) => (
                      <th
                        key={header}
                        className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {attendenceData.map((attendance) => (
                    <tr
                      key={attendance?.id}
                      className="transition hover:bg-gray-50 dark:hover:bg-gray-800/40"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-gray-800 dark:text-gray-200">
                        {attendance?.date}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(
                          attendance?.checkIn as string,
                        ).toLocaleString()}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-500">
                        {attendance?.checkOut
                          ? new Date(
                              attendance?.checkOut as string,
                            ).toLocaleString()
                          : null}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-500">
                        8h 15m
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-500">
                        {attendance?.overtime}
                      </td>
                      <td>
                        <button
                          className="rounded-lg bg-red-600 px-6 py-3 font-medium text-white hover:bg-red-700"
                          onClick={() => dispatch(checkOut(attendance?.id))}
                        >
                          Check Out
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Leave Requests */}
        {activeTab === "leave" && (
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="flex flex-col gap-4 border-b border-gray-100 p-6 sm:flex-row sm:items-center sm:justify-between dark:border-gray-800">
              <SectionTitle
                title="Leave Requests"
                description="Employee leave request history"
              />

              <button
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                onClick={() => setIsOpen(true)}
              >
                + Request Leave
              </button>
            </div>

            {isOpen ? (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 rounded-lg border bg-white p-6 shadow-sm"
              >
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="leaveDate"
                    className="text-sm font-medium text-gray-700"
                  >
                    Leave Date
                  </label>

                  <input
                    type="date"
                    id="leaveDate"
                    name="leaveDate"
                    value={formData.leaveDate}
                    onChange={handleChange}
                    className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  />
                </div>

                <button
                  type="submit"
                  className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                >
                  Submit
                </button>
              </form>
            ) : null}

            <div className="overflow-x-auto">
              <table className="w-full min-w-[750px] text-left">
                <thead className="bg-gray-50 dark:bg-gray-800/50">
                  <tr>
                    {["Requested On", "Leave Date", "Status"].map((header) => (
                      <th
                        key={header}
                        className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {leaveRequestData.map((leave) => (
                    <tr
                      key={leave?.id}
                      className="transition hover:bg-gray-50 dark:hover:bg-gray-800/40"
                    >
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {leave?.date}
                      </td>

                      <td className="px-6 py-4 text-sm font-medium text-gray-800 dark:text-gray-200">
                        {leave?.leaveDate}
                      </td>

                      <td className="px-6 py-4">
                        <StatusBadge status={leave?.requestStatus} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Performance */}
        {activeTab === "performance" && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <div className="border-b border-gray-100 p-6 dark:border-gray-800">
                <SectionTitle
                  title="Performance History"
                  description="Quarterly performance evaluation"
                />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px] text-left">
                  <thead className="bg-gray-50 dark:bg-gray-800/50">
                    <tr>
                      {[
                        "Period",
                        "Attendance",
                        "Quality",
                        "Productivity",
                        "Teamwork",
                        "Total Score",
                        "Rating",
                      ].map((header) => (
                        <th
                          key={header}
                          className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {performanceData.map((performance) => (
                      <tr
                        key={performance?.id}
                        className="transition hover:bg-gray-50 dark:hover:bg-gray-800/40"
                      >
                        <td className="px-6 py-4 text-sm font-semibold text-gray-800 dark:text-gray-200">
                          {new Date(
                            performance?.createdAt as string,
                          ).toLocaleString("en-US", {
                            month: "long",
                          })}
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-500">
                          {performance?.attendence}
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-500">
                          {performance?.quality}
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-500">
                          {performance?.productivity}
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-500">
                          {performance?.teamwork}
                        </td>

                        <td className="px-6 py-4 text-sm font-bold text-gray-800 dark:text-white">
                          {performance?.totalScore}
                        </td>

                        <td className="px-6 py-4">
                          <StatusBadge status={performance?.rating} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Payroll */}
        {activeTab === "payroll" && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <div className="border-b border-gray-100 p-6 dark:border-gray-800">
                <SectionTitle
                  title="Payroll History"
                  description="Monthly salary information"
                />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] text-left">
                  <thead className="bg-gray-50 dark:bg-gray-800/50">
                    <tr>
                      {[
                        "Month",
                        "Basic Salary",
                        "Allowance",
                        "Overtime",
                        "Bonus",
                        "Deduction",
                        "Net Pay",
                      ].map((header) => (
                        <th
                          key={header}
                          className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {payrollData?.map((payroll) => (
                      <tr
                        key={payroll?.id}
                        className="transition hover:bg-gray-50 dark:hover:bg-gray-800/40"
                      >
                        <td className="px-6 py-4 text-sm font-semibold text-gray-800 dark:text-gray-200">
                          {new Date(
                            payroll?.createdAt as string,
                          ).toLocaleString("en-US", {
                            month: "long",
                          })}
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-500">
                          {currency(payroll?.basicSalary)}
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-500">
                          {currency(payroll?.allowance)}
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-500">
                          {currency(payroll?.overtimePay)}
                        </td>

                        <td className="px-6 py-4 text-sm text-green-600">
                          {currency(payroll?.bonus)}
                        </td>

                        <td className="px-6 py-4 text-sm text-red-500">
                          -{currency(payroll?.deducation)}
                        </td>

                        <td className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-white">
                          {currency(payroll?.netPay)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

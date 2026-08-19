import { useState } from "react";

const fakeEmployee = {
  id: "EMP-001",
  firstName: "Aarav",
  lastName: "Sharma",
  email: "aarav.sharma@company.com",
  phoneNumber: "9841234567",
  department: "Engineering",
  position: "Senior Software Engineer",
  hireDate: "2023-04-15",
  status: "Active",
  employmentType: "Full Time",
  address: "Kathmandu, Nepal",
};

const attendanceData = [
  {
    id: 1,
    date: "2026-08-18",
    checkIn: "09:02 AM",
    checkOut: "06:15 PM",
    overtime: "1h 15m",
  },
  {
    id: 2,
    date: "2026-08-17",
    checkIn: "08:55 AM",
    checkOut: "05:45 PM",
    overtime: "0h",
  },
  {
    id: 3,
    date: "2026-08-16",
    checkIn: "09:10 AM",
    checkOut: "06:30 PM",
    overtime: "1h 30m",
  },
  {
    id: 4,
    date: "2026-08-15",
    checkIn: "09:00 AM",
    checkOut: "05:50 PM",
    overtime: "0h",
  },
];

const leaveData = [
  {
    id: 1,
    requestedOn: "2026-08-10",
    leaveDate: "2026-08-25",
    type: "Casual Leave",
    reason: "Personal work",
    status: "Pending",
  },
  {
    id: 2,
    requestedOn: "2026-07-20",
    leaveDate: "2026-08-05",
    type: "Sick Leave",
    reason: "Medical appointment",
    status: "Approved",
  },
  {
    id: 3,
    requestedOn: "2026-06-15",
    leaveDate: "2026-07-01",
    type: "Annual Leave",
    reason: "Vacation",
    status: "Rejected",
  },
];

const payrollData = [
  {
    id: 1,
    month: "August 2026",
    basicSalary: 85000,
    allowance: 10000,
    overtimePay: 5000,
    bonus: 8000,
    deduction: 4500,
    netPay: 103500,
  },
  {
    id: 2,
    month: "July 2026",
    basicSalary: 85000,
    allowance: 10000,
    overtimePay: 3500,
    bonus: 5000,
    deduction: 4500,
    netPay: 99000,
  },
  {
    id: 3,
    month: "June 2026",
    basicSalary: 85000,
    allowance: 10000,
    overtimePay: 2500,
    bonus: 0,
    deduction: 4500,
    netPay: 93000,
  },
];

const performanceData = [
  {
    id: 1,
    period: "Q2 2026",
    attendance: 95,
    quality: 92,
    productivity: 88,
    teamwork: 94,
    totalScore: 92.25,
    rating: "Excellent",
  },
  {
    id: 2,
    period: "Q1 2026",
    attendance: 91,
    quality: 88,
    productivity: 90,
    teamwork: 89,
    totalScore: 89.5,
    rating: "Good",
  },
];

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
  const [activeTab, setActiveTab] = useState("overview");

  const currency = (value: number) => `NPR ${value.toLocaleString("en-NP")}`;

  return (
    <div className="min-h-screen bg-gray-50 p-4 dark:bg-gray-950 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <button className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-blue-600">
              ← Back to Employees
            </button>

            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Employee Details
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              View employee information, attendance, payroll and performance.
            </p>
          </div>

          <div className="flex gap-2">
            <button className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300">
              Edit Employee
            </button>

            <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700">
              Export
            </button>
          </div>
        </div>

        {/* Profile */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="h-28 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />

          <div className="px-5 pb-6 sm:px-7">
            <div className="-mt-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white bg-gradient-to-br from-blue-500 to-indigo-600 text-2xl font-bold text-white shadow-md dark:border-gray-900">
                  AS
                </div>

                <div className="pb-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {fakeEmployee.firstName} {fakeEmployee.lastName}
                    </h2>

                    <StatusBadge status={fakeEmployee.status} />
                  </div>

                  <p className="mt-1 text-sm text-gray-500">
                    {fakeEmployee.position} · {fakeEmployee.department}
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
                  {fakeEmployee.email}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">Phone</p>
                <p className="mt-1 text-sm font-medium text-gray-800 dark:text-gray-200">
                  +977 {fakeEmployee.phoneNumber}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">Department</p>
                <p className="mt-1 text-sm font-medium text-gray-800 dark:text-gray-200">
                  {fakeEmployee.department}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">Employee ID</p>
                <p className="mt-1 text-sm font-medium text-gray-800 dark:text-gray-200">
                  {fakeEmployee.id}
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
                <InfoCard label="Employee ID" value={fakeEmployee.id} />
                <InfoCard label="Department" value={fakeEmployee.department} />
                <InfoCard label="Position" value={fakeEmployee.position} />
                <InfoCard label="Employment Type" value="Full Time" />
                <InfoCard label="Date Joined" value={fakeEmployee.hireDate} />
                <InfoCard label="Status" value={fakeEmployee.status} />
                <InfoCard label="Location" value="Kathmandu, Nepal" />
                <InfoCard label="Manager" value="Rohan Thapa" />
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <SectionTitle
                title="Contact Information"
                description="Employee contact details"
              />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <InfoCard label="Email" value={fakeEmployee.email} />
                <InfoCard
                  label="Phone"
                  value={`+977 ${fakeEmployee.phoneNumber}`}
                />
                <InfoCard label="Address" value={fakeEmployee.address} />
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  label: "Attendance",
                  value: "95%",
                  color: "text-blue-600",
                },
                {
                  label: "Leave Balance",
                  value: "12 Days",
                  color: "text-green-600",
                },
                {
                  label: "Performance",
                  value: "92.25",
                  color: "text-purple-600",
                },
                {
                  label: "Monthly Salary",
                  value: "NPR 103.5K",
                  color: "text-orange-600",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900"
                >
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className={`mt-2 text-2xl font-bold ${stat.color}`}>
                    {stat.value}
                  </p>
                </div>
              ))}
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
                      "Status",
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
                  {attendanceData.map((attendance) => (
                    <tr
                      key={attendance.id}
                      className="transition hover:bg-gray-50 dark:hover:bg-gray-800/40"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-gray-800 dark:text-gray-200">
                        {attendance.date}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-500">
                        {attendance.checkIn}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-500">
                        {attendance.checkOut}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-500">
                        8h 15m
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-500">
                        {attendance.overtime}
                      </td>

                      <td className="px-6 py-4">
                        <StatusBadge status="Active" />
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

              <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                + Request Leave
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[750px] text-left">
                <thead className="bg-gray-50 dark:bg-gray-800/50">
                  <tr>
                    {[
                      "Requested On",
                      "Leave Date",
                      "Type",
                      "Reason",
                      "Status",
                      "Action",
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
                  {leaveData.map((leave) => (
                    <tr
                      key={leave.id}
                      className="transition hover:bg-gray-50 dark:hover:bg-gray-800/40"
                    >
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {leave.requestedOn}
                      </td>

                      <td className="px-6 py-4 text-sm font-medium text-gray-800 dark:text-gray-200">
                        {leave.leaveDate}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-500">
                        {leave.type}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-500">
                        {leave.reason}
                      </td>

                      <td className="px-6 py-4">
                        <StatusBadge status={leave.status} />
                      </td>

                      <td className="px-6 py-4">
                        <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                          View
                        </button>
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
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <p className="text-sm text-gray-500">Overall Score</p>
                <p className="mt-2 text-3xl font-bold text-blue-600">92.25</p>
                <p className="mt-1 text-xs text-green-600">
                  +4.5% from last quarter
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <p className="text-sm text-gray-500">Attendance</p>
                <p className="mt-2 text-3xl font-bold text-green-600">95%</p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <p className="text-sm text-gray-500">Productivity</p>
                <p className="mt-2 text-3xl font-bold text-purple-600">88%</p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <p className="text-sm text-gray-500">Rating</p>
                <div className="mt-3">
                  <StatusBadge status="Excellent" />
                </div>
              </div>
            </div>

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
                        "Action",
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
                        key={performance.id}
                        className="transition hover:bg-gray-50 dark:hover:bg-gray-800/40"
                      >
                        <td className="px-6 py-4 text-sm font-semibold text-gray-800 dark:text-gray-200">
                          {performance.period}
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-500">
                          {performance.attendance}%
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-500">
                          {performance.quality}%
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-500">
                          {performance.productivity}%
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-500">
                          {performance.teamwork}%
                        </td>

                        <td className="px-6 py-4 text-sm font-bold text-gray-800 dark:text-white">
                          {performance.totalScore}
                        </td>

                        <td className="px-6 py-4">
                          <StatusBadge status={performance.rating} />
                        </td>

                        <td className="px-6 py-4">
                          <button className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300">
                            Edit
                          </button>
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
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <p className="text-sm text-gray-500">Current Basic Salary</p>
                <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                  NPR 85,000
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <p className="text-sm text-gray-500">Current Allowance</p>
                <p className="mt-2 text-2xl font-bold text-green-600">
                  NPR 10,000
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <p className="text-sm text-gray-500">Current Net Pay</p>
                <p className="mt-2 text-2xl font-bold text-blue-600">
                  NPR 103,500
                </p>
              </div>
            </div>

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
                        "Action",
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
                    {payrollData.map((payroll) => (
                      <tr
                        key={payroll.id}
                        className="transition hover:bg-gray-50 dark:hover:bg-gray-800/40"
                      >
                        <td className="px-6 py-4 text-sm font-semibold text-gray-800 dark:text-gray-200">
                          {payroll.month}
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-500">
                          {currency(payroll.basicSalary)}
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-500">
                          {currency(payroll.allowance)}
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-500">
                          {currency(payroll.overtimePay)}
                        </td>

                        <td className="px-6 py-4 text-sm text-green-600">
                          {currency(payroll.bonus)}
                        </td>

                        <td className="px-6 py-4 text-sm text-red-500">
                          -{currency(payroll.deduction)}
                        </td>

                        <td className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-white">
                          {currency(payroll.netPay)}
                        </td>

                        <td className="px-6 py-4">
                          <button className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50">
                            Delete
                          </button>
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

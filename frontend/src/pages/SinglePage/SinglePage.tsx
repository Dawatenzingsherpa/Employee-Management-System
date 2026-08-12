import { Link, useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { useEffect } from "react";
import { fetchSingleEmployee } from "../../store/EmployeeSlice";
import {
  Table,
  TableCell,
  TableBody,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { fetchAttendenceData } from "../../store/AttendenceSlice";
import {
  changeRequestStatus,
  fetchLeaveRequestData,
} from "../../store/LeaveRequestSlice";
import {
  deletePayroll,
  fetchPayrollData,
  setDeletePayroll,
} from "../../store/PayrollSlice";
import {
  deletePerformance,
  setDeletePerformance,
  setSinglePerformance,
} from "../../store/PerformanceSlice";
import Badge from "../../components/ui/badge/Badge";

const EmployeeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { singleEmployee } = useAppSelector((state) => state.employee);
  const { attendenceData } = useAppSelector((state) => state.attendence);
  const { leaveRequestData } = useAppSelector((state) => state.leaveRequest);
  const { payrollData } = useAppSelector((state) => state.payroll);
  const { performanceData } = useAppSelector((state) => state.performance);
  useEffect(() => {
    if (id) {
      dispatch(fetchSingleEmployee(id));
      dispatch(fetchAttendenceData());
      dispatch(fetchLeaveRequestData());
      dispatch(fetchPayrollData());
    }
  }, [dispatch]);

  const handleStatusChange = (id: string, status: string) => {
    dispatch(changeRequestStatus(status, id));
  };
  const handleDeletePayroll = async (id: string) => {
    await dispatch(setDeletePayroll(id));
    dispatch(deletePayroll(id));
  };

  const handleDeletePerformance = async (id: string) => {
    await dispatch(setDeletePerformance(id));
    dispatch(deletePerformance(id));
  };

  const singleAttendence = attendenceData.filter(
    (data) => data.employeeId === id,
  );

  const singleLeaveRequest = leaveRequestData.filter(
    (data) => data.employeeId === id,
  );
  const singlePerformance = performanceData.filter(
    (data) => data.employeeId === id,
  );

  const singlePayroll = payrollData.filter((data) => data.employeeId === id);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link to={"/employee-tables"}>
            <button className="mb-2 text-sm text-gray-500 hover:text-blue-600">
              ← Back to Employees
            </button>
          </Link>

          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Employee Details
          </h1>
        </div>

        <button className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700">
          Edit Employee
        </button>
      </div>

      {/* Employee Profile */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          {/* Basic Info */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                {singleEmployee?.firstName + " " + singleEmployee?.lastName}
              </h2>

              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                Active
              </span>
            </div>

            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500">
              <span>📧 {singleEmployee?.email}</span>
              <span>📞 +977 {singleEmployee?.phoneNumber}</span>
              <span>🏢 {singleEmployee?.Department?.departmentName}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex overflow-x-auto border-b border-gray-200 dark:border-gray-800">
          <button className="border-b-2 border-blue-600 px-5 py-4 text-sm font-medium text-blue-600">
            Overview
          </button>

          <a href="#attendence">
            <button className="px-5 py-4 text-sm font-medium text-gray-500 hover:text-blue-600">
              Attendance
            </button>
          </a>

          <a href="#leaveRequest">
            <button className="px-5 py-4 text-sm font-medium text-gray-500 hover:text-blue-600">
              Leave Request
            </button>
          </a>

          <a href="#performance">
            <button className="px-5 py-4 text-sm font-medium text-gray-500 hover:text-blue-600">
              Performance
            </button>
          </a>

          <a href="#payroll">
            <button className="px-5 py-4 text-sm font-medium text-gray-500 hover:text-blue-600">
              Payroll
            </button>
          </a>
        </div>

        {/* Employee Information */}
        <div className="p-6">
          <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white">
            Employee Information
          </h3>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <InfoCard label="Employee ID" value={singleEmployee?.id} />

            <InfoCard
              label="Department"
              value={singleEmployee?.Department?.departmentName}
            />

            <InfoCard label="Date Joined" value={singleEmployee?.hireDate} />

            <InfoCard label="Employment Type" value="Full Time" />
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white">
          Contact Information
        </h3>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <InfoCard label="Email" value={singleEmployee?.email} />

          <InfoCard
            label="Phone"
            value={"+977" + singleEmployee?.phoneNumber}
          />

          <InfoCard label="Address" value="Kathmandu, Nepal" />
        </div>
      </div>

      {/*attendence*/}
      <section id="attendence">
        <h1>Attendence</h1>
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
                    Date
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Check In
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Check Out
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Overtime
                  </TableCell>
                </TableRow>
              </TableHeader>

              {/* Table Body */}
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {singleAttendence.map((attendance) => (
                  <TableRow key={attendance.id}>
                    <TableCell className="px-5 py-4 sm:px-6 text-start text-gray-500 text-theme-sm dark:text-gray-400">
                      {attendance.Employee
                        ? `${attendance.Employee.firstName} ${attendance.Employee.lastName}`
                        : "—"}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {attendance.date}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {attendance.checkIn
                        ? new Date(attendance.checkIn).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "—"}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {attendance.checkOut
                        ? new Date(attendance.checkOut).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "—"}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {attendance.overtime ?? "—"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>

      {/*Leave Request*/}
      <section id="leaveRequest">
        <h1>Leave Requests</h1>
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
                {singleLeaveRequest.map((leave) => (
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
      </section>

      {/*Payroll*/}
      <section id="payroll">
        <h1>Payroll</h1>
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
                    Basic Salary
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Allowance
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Overtime Pay
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Bonus
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Deduction
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Net Pay
                  </TableCell>
                </TableRow>
              </TableHeader>

              {/* Table Body */}
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {singlePayroll.map((payroll) => (
                  <TableRow key={payroll.id}>
                    <TableCell className="px-5 py-4 sm:px-6 text-start text-gray-500 text-theme-sm dark:text-gray-400">
                      {payroll?.Employee
                        ? `${payroll?.Employee?.firstName} ${payroll?.Employee?.lastName}`
                        : "—"}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      ${payroll.basicSalary.toLocaleString()}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      ${payroll.allowance.toLocaleString()}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      ${payroll.overtimePay.toLocaleString()}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      ${payroll.bonus.toLocaleString()}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      ${payroll.deducation.toLocaleString()}
                    </TableCell>
                    <TableCell className="px-4 py-3 font-medium text-gray-800 text-start text-theme-sm dark:text-white/90">
                      ${payroll.netPay.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {/* <button
                    className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200"
                    onClick={() => {
                      dispatch(setSinglePayroll(payroll));
                      navigate("/edit-form", {
                        state: {
                          type: "payroll",
                        },
                      });
                    }}
                  >
                    Edit
                  </button> */}
                      <button
                        className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200"
                        onClick={() => handleDeletePayroll(payroll?.id)}
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
      </section>

      {/*performance*/}
      <section id="performance">
        <h1>Performance</h1>
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
                    Attendance
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Quality
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Productivity
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Teamwork
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Total Score
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Rating
                  </TableCell>
                </TableRow>
              </TableHeader>

              {/* Table Body */}
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {singlePerformance.map((performance) => (
                  <TableRow key={performance.id}>
                    <TableCell className="px-5 py-4 sm:px-6 text-start text-gray-500 text-theme-sm dark:text-gray-400">
                      {performance?.Employee
                        ? `${performance.Employee.firstName} ${performance.Employee.lastName}`
                        : "—"}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {performance.attendence}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {performance.quality}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {performance.productivity}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {performance.teamwork}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {performance.totalScore}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      <Badge
                        size="sm"
                        color={
                          performance.rating === "excellent"
                            ? "success"
                            : performance.rating === "good"
                              ? "success"
                              : performance.rating === "average"
                                ? "warning"
                                : "error"
                        }
                      >
                        {performance.rating}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <button
                        className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200"
                        onClick={() => {
                          dispatch(setSinglePerformance(performance));
                          navigate("/edit-form", {
                            state: {
                              type: "performance",
                            },
                          });
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200"
                        onClick={() => handleDeletePerformance(performance?.id)}
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
      </section>
    </div>
  );
};

const InfoCard = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50">
      <p className="mb-1 text-sm text-gray-500">{label}</p>

      <p className="font-medium text-gray-800 dark:text-white">{value}</p>
    </div>
  );
};

export default EmployeeDetails;

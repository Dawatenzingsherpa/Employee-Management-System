import { Link } from "react-router";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { useEffect } from "react";
import { fetchAttendenceData } from "../../store/AttendenceSlice";
import { fetchEmployeeData } from "../../store/EmployeeSlice";
import { fetchPerformanceData } from "../../store/PerformanceSlice";
import { fetchLeaveRequestData } from "../../store/LeaveRequestSlice";
import { fetchPayrollData } from "../../store/PayrollSlice";

export default function Home() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAttendenceData());
    dispatch(fetchEmployeeData());
    dispatch(fetchPerformanceData());
    dispatch(fetchLeaveRequestData());
    dispatch(fetchPayrollData());
  }, [dispatch]);
  const { employeeData } = useAppSelector((state) => state.employee);
  const { attendenceData } = useAppSelector((state) => state.attendence);
  const { leaveRequestData } = useAppSelector((state) => state.leaveRequest);
  const { performanceData } = useAppSelector((state) => state.performance);
  const { payrollData } = useAppSelector((state) => state.payroll);

  const pendingRequest = leaveRequestData.filter(
    (leaveRequest) => leaveRequest.requestStatus === "pending",
  );

  const totalAttendence = attendenceData.length;
  const calculateAttendence: number = Number(
    ((totalAttendence / (employeeData.length * 7)) * 100).toFixed(2),
  );

  let totalScoreOfAll = 0;
  performanceData.forEach(
    (data) => (totalScoreOfAll += Number(data.totalScore)),
  );
  const averageScore: number = Number(totalScoreOfAll / performanceData.length);

  let totalNetPay = 0;
  let totalDeduction = 0;
  let totalBonus = 0;
  payrollData.forEach((data) => (totalNetPay += Number(data.netPay)));
  payrollData.forEach((data) => (totalDeduction += Number(data.deducation)));
  payrollData.forEach((data) => (totalBonus += Number(data.bonus)));

  const stats = [
    {
      title: "Total Employees",
      value: employeeData.length,
      change: "",
      icon: "👥",
      color: "indigo",
      link: "employee-tables",
    },
    {
      title: "Present Today",
      value: totalAttendence,
      change: calculateAttendence.toFixed(2) + "%",
      icon: "✓",
      color: "green",
      link: "attendence-tables",
    },

    {
      title: "Pending Requests",
      value: pendingRequest.length,
      change: "",
      icon: "!",
      color: "red",
      link: "leaveRequest-tables",
    },
  ];

  const attendance = [
    {
      label: "Present",
      value: totalAttendence,
      percentage: calculateAttendence,
      color: "#10b981",
    },
    { label: "Late", value: 2, percentage: 3.2, color: "#f59e0b" },
    { label: "Absent", value: 10, percentage: 52.1, color: "#ef4444" },
  ];

  return (
    <main className="dashboard">
      {/* Page intro */}
      <section className="dashboard-intro">
        <div>
          <h1>Dashboard</h1>
          <p>Here's what's happening across your organization today.</p>
        </div>

        <div className="date-badge">
          <span>●</span>
          Tuesday, August 11
        </div>
      </section>

      {/* Statistics */}
      <section className="stats-grid">
        {stats.map((stat) => (
          <div className="stat-card" key={stat.title}>
            <div className="stat-top">
              <div className={`stat-icon ${stat.color}`}>{stat.icon}</div>
              <Link to={stat.link}>
                <button className="more-button">View More</button>
              </Link>
            </div>

            <div className="stat-content">
              <p>{stat.title}</p>
              <h2>{stat.value}</h2>
              <span className={`stat-change ${stat.color}`}>{stat.change}</span>
            </div>
          </div>
        ))}
      </section>

      {/* Main dashboard grid */}
      <section className="dashboard-grid">
        {/* Attendance */}
        <div className="dashboard-card attendance-card">
          <div className="card-header">
            <div>
              <h3>Today's Attendance</h3>
              <p>Employee attendance overview</p>
            </div>
            <Link to={"attendence-tables"}>
              <button className="text-button">View details →</button>
            </Link>
          </div>

          <div className="attendance-layout">
            <div className="attendance-circle">
              <div className="circle-inner">
                <strong>89.1%</strong>
                <span>Attendance</span>
              </div>
            </div>

            <div className="attendance-list">
              {attendance.map((item) => (
                <div className="attendance-row" key={item.label}>
                  <div className="attendance-label">
                    <span
                      className="status-dot"
                      style={{ backgroundColor: item.color }}
                    />

                    <span>{item.label}</span>
                  </div>

                  <div className="attendance-value">
                    <strong>{item.value}</strong>
                    <span>{item.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Leave requests */}
        <div className="dashboard-card">
          <div className="card-header">
            <div>
              <h3>Leave Requests</h3>
              <p>Requests waiting for review</p>
            </div>

            <span className="pending-badge">{pendingRequest.length}</span>
          </div>

          <div className="leave-list">
            {leaveRequestData.map((request) => (
              <div className="leave-item" key={request?.id}>
                <div className="leave-info">
                  <strong>{request?.Employee?.firstName}</strong>
                  <small>{request?.date}</small>
                </div>
                <Link to={"leaveRequest-tables"}>
                  <button className="review-button">Review</button>
                </Link>
              </div>
            ))}
          </div>
          <Link to={"leaveRequest-tables"}>
            <button className="view-all-button">View all requests →</button>
          </Link>
        </div>

        {/*Performance */}
        <div className="dashboard-card performance-card">
          <div className="card-header">
            <div>
              <h3>Performance</h3>
              <p>Employee performance overview</p>
            </div>
            <Link to={"performance-tables"}>
              <button className="text-button">View all →</button>
            </Link>
          </div>

          <div className="performance-summary">
            <div className="performance-stat">
              <span>Average Score</span>
              <strong>{averageScore}</strong>
            </div>

            <div className="performance-stat">
              <span>Excellent</span>
              <strong>12</strong>
            </div>
          </div>

          <div className="top-performers">
            <div className="section-label">Top Performers</div>

            {performanceData.slice(0, 4).map((data) => (
              <>
                <div className="performer" key={data?.id}>
                  <div className="performer-avatar">JD</div>

                  <div className="performer-info">
                    <strong>{data?.Employee?.firstName}</strong>
                    <span>{data?.rating}</span>
                  </div>

                  <strong className="performer-score">
                    {data?.totalScore}
                  </strong>
                </div>
              </>
            ))}
          </div>
        </div>

        {/*Payroll */}
        <div className="dashboard-card payroll-card">
          <div className="card-header">
            <div>
              <h3>Payroll</h3>
              <p>Current payroll overview</p>
            </div>
            <Link to={"payroll-tables"}>
              <button className="text-button">View all →</button>
            </Link>
          </div>

          <div className="net-pay">
            <span>Total Net Payroll</span>
            <strong>${totalNetPay}</strong>
            <small>August 2026</small>
          </div>

          <div className="payroll-stats">
            <div className="payroll-stat">
              <span>Employees</span>
              <strong>{employeeData.length}</strong>
            </div>

            <div className="payroll-stat">
              <span>Deductions</span>
              <strong>{totalDeduction}</strong>
            </div>

            <div className="payroll-stat">
              <span>Bonuses</span>
              <strong>{totalBonus}</strong>
            </div>
          </div>

          <div className="payroll-status">
            <span className="status-check">✓</span>

            <div>
              <strong>Payroll processed</strong>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

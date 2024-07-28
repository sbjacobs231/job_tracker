import { useState } from "react";
import "../dashboard-page.css";
import DashboardTable from "../components/DashboardTable";
import JobForm from "../components/JobForm";

function Dashboard() {
    const data = [
      {
        id: 1,
        title: "Data Engineer",
        company: "Patagonia",
        salary: 120000,
        location: "Remote",
        apply_date: "2024-07-25",
        status: "Applied"
      }
    ];

    const [jobs, setJobs] = useState(data);

    return (
      <div>
        <div className="dashboard-page align-center">
          <div className="content">
            <div>
              <DashboardTable 
                jobs={jobs} 
              />
            </div>
            <div>
              <JobForm 
                jobs={jobs} 
                setJobs={setJobs} 
              />
            </div>
          </div>
        </div>
      </div>
    )
}

export default Dashboard;

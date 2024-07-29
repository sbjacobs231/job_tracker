import { useState, useEffect } from "react";
import "../dashboard-page.css";
import DashboardTable from "../components/DashboardTable";
import JobForm from "../components/JobForm";
import { useNavigate } from "react-router-dom";

function Dashboard() {

    const navigate = useNavigate();

    const [jobs, setJobs] = useState([]);

    useEffect(() => {
      fetchJobs();
    }, []);

    const fetchJobs = async () => {
      try {
        const url = "/api/jobs";
        const response = await fetch(url);
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.log(error);
        setJobs([]);
        navigate("/login");
      }
    }

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
                fetchJobs={fetchJobs} 
              />
            </div>
          </div>
        </div>
      </div>
    )
}

export default Dashboard;

import { useState, useEffect } from "react";
import "../dashboard-page.css";
import DashboardTable from "../components/DashboardTable";
import JobForm from "../components/JobForm";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Dashboard() {

    const navigate = useNavigate();

    const [jobs, setJobs] = useState([]);

    useEffect(() => {
      fetchJobs();
    }, []);

    const fetchJobs = async () => {
      try {
        const response = await axios.get('/api/jobs');
        setJobs(response.data);
      } catch (error) {
        navigate("/login");
      }
    };

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

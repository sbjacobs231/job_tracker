import { useState, useEffect } from "react";
import "../dashboard-page.css";
import DashboardTable from "../components/DashboardTable";
import JobForm from "../components/JobForm";
import { useNavigate } from "react-router-dom";

function Dashboard() {

    const navigate = useNavigate();

    const [jobs, setJobs] = useState([]);
    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");
    const [salary, setSalary] = useState("");
    const [location, setLocation] = useState("");
    const [applyDate, setApplyDate] = useState("");

    const form = {
      title: title,
      setTitle: setTitle,
      company: company,
      setCompany: setCompany,
      salary: salary,
      setSalary: setSalary,
      location: location,
      setLocation: setLocation,
      applyDate: applyDate,
      setApplyDate: setApplyDate,
    }

    const resetForm = () => {
      setTitle("");
      setCompany("");
      setSalary("");
      setLocation("");
      setApplyDate("");
    }

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

    const createJob = async () => {
      const form = document.querySelector("#job-form");
      if (form.checkValidity() === false) {
        alert("Please enter a title, company, and apply date.")
        return;
      }
      const job = {
        title: title,
        company: company,
        salary: salary,
        location: location,
        apply_date: applyDate,
      }
      try {
        const url = "/api/jobs";
        const headers = {
          "Content-Type": "application/json",
        };
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify(job),
          headers: headers,
        });
        if (!response.ok) {
          const error = await response.text();
          console.log(error);
          return;
        }
        await fetchJobs();
        resetForm();
      } catch (error) {
        console.log(error);
      }
    }

    const deleteJob = async (id) => {
      try {
        const url = `/api/jobs/${id}`;
        const response = await fetch(url, {
          method: "DELETE",
        });
        if (!response.ok) {
          const error = await response.text();
          console.log(error);
          return;
        }
        await fetchJobs();
        resetForm();
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(() => {
      fetchJobs();
    }, []);

    return (
      <div>
        <div className="dashboard-page align-center">
          <div className="content">
            <div>
              <DashboardTable 
                jobs={jobs}
                deleteJob={deleteJob}
              />
            </div>
            <div>
              <JobForm 
                form={form}
                createJob={createJob}
              />
            </div>
          </div>
        </div>
      </div>
    )
}

export default Dashboard;

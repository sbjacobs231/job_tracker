import { useState, useEffect } from "react";
import "../dashboard-page.css";
import CountPerDayChart from "../components/CountPerDayChart";
import DashboardTable from "../components/DashboardTable";
import JobForm from "../components/JobForm";
import { useNavigate } from "react-router-dom";

function Dashboard() {

    const navigate = useNavigate();

    const [jobs, setJobs] = useState([]);
    const [countPerDayData, setCountPerDayData] = useState({ labels: [], datasets: [] });
    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");
    const [salary, setSalary] = useState("");
    const [location, setLocation] = useState("");
    const [applyDate, setApplyDate] = useState("");

    const form = {
      id: id,
      setId: setId,
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
      setId("");
      setTitle("");
      setCompany("");
      setSalary("");
      setLocation("");
      setApplyDate("");
    }

    const updateForm = (job) => {
      setId(job.id);
      setTitle(job.title);
      setCompany(job.company);
      setSalary(job.salary);
      setLocation(job.location);
      setApplyDate(job.applyDate);
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

    const fetchCountPerDay = async () => {
      try {
        const url = "/api/metrics/count-per-day";
        const response = await fetch(url);
        const data = await response.json();
        const dates = await data.dates.map((date) => date.split("T")[0]);
        const counts = data.counts;
        const config = {
          labels: dates,
          datasets: [
            {
              data: counts,
            }
          ],
        }
        setCountPerDayData(config);
      } catch (error) {
        console.log(error);
        setCountPerDayData({});
        navigate("/login");
      }
    }

    const createJob = async () => {
      const form = document.querySelector("#job-form");
      if (form.checkValidity() === false) {
        alert("Please complete the form.")
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
        await fetchCountPerDay();
        resetForm();
      } catch (error) {
        console.log(error);
      }
    }

    const updateJob = async (id) => {
      const form = document.querySelector("#job-form");
      if (form.checkValidity() === false) {
        alert("Please complete the form.")
        return;
      }
      const job = {
        id: id,
        title: title,
        company: company,
        salary: salary,
        location: location,
        apply_date: applyDate,
      }
      try {
        const url = `/api/jobs/${id}`;
        const headers = {
          "Content-Type": "application/json",
        };
        const response = await fetch(url, {
          method: "PUT",
          body: JSON.stringify(job),
          headers: headers,
        });
        if (!response.ok) {
          const error = await response.text();
          console.log(error);
          return;
        }
        await fetchJobs();
        await fetchCountPerDay();
        resetForm();
      } catch (error) {
        console.log(error);
      }
    }

    const saveJob = async() => {
      if (id) {
        updateJob(id);
      } else {
        createJob();
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
        await fetchCountPerDay();
        resetForm();
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(() => {
      fetchJobs();
      fetchCountPerDay();
    }, []);

    return (
      <div>
        <div className="dashboard-page align-center">
          <div className="content">
            <CountPerDayChart 
              countPerDayData={countPerDayData}
            />
          </div>
          <div className="content">
            <div>
              <DashboardTable 
                jobs={jobs}
                updateForm={updateForm}
                deleteJob={deleteJob}
              />
            </div>
            <div>
              <JobForm 
                form={form}
                saveJob={saveJob}
              />
            </div>
          </div>
        </div>
      </div>
    )
}

export default Dashboard;

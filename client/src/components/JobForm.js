import { useState } from "react";
import "../dashboard-page.css";

function JobForm({ jobs, setJobs }) {
    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");
    const [salary, setSalary] = useState("");
    const [location, setLocation] = useState("");
    const [applyDate, setApplyDate] = useState("");
    const [status, setStatus] = useState(1);

    const statusMap = {
      1: "Applied",
      2: "Interview Scheduled",
      3: "Interviewed",
      4: "Offer Extended",
      5: "Offer Accepted",
      6: "Offer Declined",
      7: "Rejected",
      8: "Interested",
    }

    const resetForm = () => {
      setTitle("");
      setCompany("");
      setSalary("");
      setLocation("");
      setApplyDate("");
      setStatus(1);
    }

    const createJob = () => {
      const form = document.querySelector("#job-form");
      if (form.checkValidity() === false) {
        alert("Please enter a title, company, and apply date.")
        return;
      }
      const job = {
        id: jobs.length + 1,
        title: title,
        company: company,
        salary: salary,
        location: location,
        apply_date: applyDate,
        status: statusMap[status],
      }
      setJobs([...jobs, job]);
      resetForm();
    }

    return (
      <div>
        <form id="job-form">
          <label htmlFor="title">Title</label>
          <input
            id="title" 
            type="text" 
            value={title} 
            required
            onChange={(event) => setTitle(event.target.value)} 
          />
          <label htmlFor="company">Company</label>
          <input 
            id="company" 
            type="text" 
            value={company} 
            required
            onChange={(event) => setCompany(event.target.value)} 
          />
          <label htmlFor="salary">Salary</label>
          <input 
            id="salary" 
            type="number" 
            value={salary}
            onChange={(event) => setSalary(event.target.value)} 
          />
          <label htmlFor="location">Location</label>
          <input 
            id="location" 
            type="text" 
            value={location}
            onChange={(event) => setLocation(event.target.value)} 
          />
          <label htmlFor="apply-date">Apply Date</label>
          <input 
            id="apply-date" 
            type="date" 
            value={applyDate} 
            required
            onChange={(event) => setApplyDate(event.target.value)} 
          />
          <label htmlFor="status">Status</label>
          <select 
            id="status" 
            value={status} 
            required
            onChange={(event) => setStatus(parseInt(event.target.value))} 
          >
            <option value="1">Applied</option>
            <option value="2">Interview Scheduled</option>
            <option value="3">Interviewed</option>
            <option value="4">Offer Extended</option>
            <option value="5">Offer Accepted</option>
            <option value="6">Offer Declined</option>
            <option value="7">Rejected</option>
            <option value="8">Interested</option>
          </select>
          <span className="submit" onClick={createJob}>Add job</span>
        </form>
      </div>
    )
}

export default JobForm;

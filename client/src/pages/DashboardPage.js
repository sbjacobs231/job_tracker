import { useState } from "react";
import "../dashboard-page.css";
import Header from "../components/Header";

function Dashboard() {
    const data = [
      {
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
        <Header />
        <div className="dashboard-page align-center">
          <div className="content">
            <div>
              <div className="scrollable-table">
                <table>
                  <thead>
                    <tr>
                      <th scope="col">Title</th>
                      <th scope="col">Company</th>
                      <th scope="col">Salary</th>
                      <th scope="col">Location</th>
                      <th scope="col">Apply Date</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  {jobs.map(job => (
                    <tr>
                      <td>{job.title}</td>
                      <td>{job.company}</td>
                      <td>{job.salary}</td>
                      <td>{job.location}</td>
                      <td>{job.apply_date}</td>
                      <td>{job.status}</td>
                    </tr>
                  ))}
                </table>
              </div>
            </div>
            <div>
              <div>
                <form>
                  <label htmlFor="title">Title</label>
                  <input id="title" type="text" required/>
                  <label htmlFor="company">Company</label>
                  <input id="company" type="text" required/>
                  <label htmlFor="salary">Salary</label>
                  <input id="salary" type="number"/>
                  <label htmlFor="location">Location</label>
                  <input id="location" type="text"/>
                  <label htmlFor="apply-date">Apply Date</label>
                  <input id="apply-date" type="date" required/>
                  <label htmlFor="status">Status</label>
                  <select id="status" required>
                    <option value="1">Applied</option>
                    <option value="2">Interview Scheduled</option>
                    <option value="3">Interviewed</option>
                    <option value="4">Offer Extended</option>
                    <option value="5">Offer Accepted</option>
                    <option value="6">Offer Declined</option>
                    <option value="7">Rejected</option>
                    <option value="8">Interested</option>
                  </select>
                  <span className="submit">Add job</span>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Dashboard;

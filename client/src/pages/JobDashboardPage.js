import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JobDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({ title: '', company: '', salary: '', location: '', apply_date: '' });
  const [id, setId] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get('/api/jobs');
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`/api/jobs/${id}`, form);
      } else {
        await axios.post('/api/jobs', form);
      }
      setForm({ title: '', company: '', salary: '', location: '', apply_date: '' });
      setId(null);
      fetchJobs();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleEdit = (job) => {
    setForm(job);
    setId(job.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/jobs/${id}`);
      fetchJobs();
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  return (
    <div>
      <h1>Job Dashboard</h1>
      <form onSubmit={handleFormSubmit}>
        <input name="title" value={form.title} onChange={handleInputChange} placeholder="Title" required />
        <input name="company" value={form.company} onChange={handleInputChange} placeholder="Company" required />
        <input name="salary" value={form.salary} onChange={handleInputChange} placeholder="Salary" required />
        <input name="location" value={form.location} onChange={handleInputChange} placeholder="Location" required />
        <input name="apply_date" value={form.apply_date} onChange={handleInputChange} placeholder="Apply Date" required />
        <button type="submit">{id ? 'Update' : 'Add'} Job</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Titles</th>
            <th>Company</th>
            <th>Salary</th>
            <th>Location</th>
            <th>Apply Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id}>
              <td>{job.title}</td>
              <td>{job.company}</td>
              <td>{job.salary}</td>
              <td>{job.location}</td>
              <td>{job.apply_date}</td>
              <td>
                <button onClick={() => handleEdit(job)}>Edit</button>
                <button onClick={() => handleDelete(job.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobDashboard;

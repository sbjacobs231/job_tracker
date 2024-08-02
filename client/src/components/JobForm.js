function JobForm({ form, saveJob }) {
    return (
      <div>
        <form id="job-form">
          <input
            id="id"
            type="text"
            value={form.id}
            hidden
          />
          <label htmlFor="title">Title</label>
          <input
            id="title" 
            type="text" 
            value={form.title} 
            required
            onChange={(event) => form.setTitle(event.target.value)} 
          />
          <label htmlFor="company">Company</label>
          <input 
            id="company" 
            type="text" 
            value={form.company} 
            required
            onChange={(event) => form.setCompany(event.target.value)} 
          />
          <label htmlFor="salary">Salary</label>
          <input 
            id="salary" 
            type="number" 
            value={form.salary}
            onChange={(event) => form.setSalary(event.target.value)} 
          />
          <label htmlFor="location">Location</label>
          <input 
            id="location" 
            type="text" 
            value={form.location}
            onChange={(event) => form.setLocation(event.target.value)} 
          />
          <label htmlFor="apply-date">Apply Date</label>
          <input 
            id="apply-date" 
            type="date" 
            value={form.applyDate} 
            required
            onChange={(event) => form.setApplyDate(event.target.value)} 
          />
          <span
            className="submit"
            tabIndex={0}
            onClick={saveJob}
            onKeyUp={ (event) => { if (event.key === "Enter") { saveJob() } } }
          >
            Submit
          </span>
        </form>
      </div>
    )
}

export default JobForm;

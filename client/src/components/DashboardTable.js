function DashboardTable({ jobs, updateForm, deleteJob }) {

    const handleDeleteClick = (event) => {
        const id = event.target.parentElement.parentElement.id;
        deleteJob(id);
    }

    const handleUpdateClick = (event) => {
        const tr = event.target.parentElement.parentElement;
        const job = {
            id: null,
            title: null,
            company: null,
            salary: null,
            location: null,
            applyDate: null,
        }
        for (let td of tr.children) {
            if (td.id === "id") { job.id = td.getAttribute("data-value") }
            else if (td.id === "title") { job.title = td.getAttribute("data-value") }
            else if (td.id === "company") { job.company = td.getAttribute("data-value") }
            else if (td.id === "salary") { job.salary = td.getAttribute("data-value") }
            else if (td.id === "location") { job.location = td.getAttribute("data-value") }
            else if (td.id === "apply-date") { job.applyDate = td.getAttribute("data-value") }
        }
        updateForm(job);
    }

    return (
        <div className="scrollable-table">
            <table>
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Title</th>
                        <th scope="col">Company</th>
                        <th scope="col">Salary</th>
                        <th scope="col">Location</th>
                        <th scope="col">Apply Date</th>
                        <th scope="col" colspan="2"></th>
                    </tr>
                </thead>
                <tbody>
                    {jobs.map(job => (
                    <tr id={job.id} key={job.id}>
                        <td id="id" data-value={job.id}>{job.id}</td>
                        <td id="title" data-value={job.title}>{job.title}</td>
                        <td id="company" data-value={job.company}>{job.company}</td>
                        <td id="salary" data-value={job.salary}>{job.salary}</td>
                        <td id="location" data-value={job.location}>{job.location}</td>
                        <td id="apply-date" data-value={job.apply_date.split("T")[0]}>{job.apply_date.split("T")[0]}</td>
                        <td>
                            <i
                                id="update-job"
                                className="bi bi-pencil"
                                onClick={(event) => { handleUpdateClick(event) }}
                            >
                            </i>
                        </td>
                        <td>
                            <i 
                                id="delete-job"
                                className="bi bi-trash"
                                onClick={(event) => { handleDeleteClick(event) }}
                            >
                            </i>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default DashboardTable;

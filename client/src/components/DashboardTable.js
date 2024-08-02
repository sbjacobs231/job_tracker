function DashboardTable({ jobs, deleteJob }) {

    const callDeleteJob = (event) => {
        const id = event.target.parentElement.parentElement.id;
        deleteJob(id);
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
                        <td>{job.id}</td>
                        <td>{job.title}</td>
                        <td>{job.company}</td>
                        <td>{job.salary}</td>
                        <td>{job.location}</td>
                        <td>{job.apply_date.split("T")[0]}</td>
                        <td>
                            <i
                                id="update-job"
                                className="bi bi-pencil"
                            >
                            </i>
                        </td>
                        <td>
                            <i 
                                id="delete-job"
                                className="bi bi-trash"
                                onClick={(event) => { callDeleteJob(event) }}
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

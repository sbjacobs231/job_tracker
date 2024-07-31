function DashboardTable({ jobs }) {
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
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {jobs.map(job => (
                    <tr key={job.id}>
                        <td>{job.id}</td>
                        <td>{job.title}</td>
                        <td>{job.company}</td>
                        <td>{job.salary}</td>
                        <td>{job.location}</td>
                        <td>{job.apply_date.split("T")[0]}</td>
                        <td>{job.status}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default DashboardTable;

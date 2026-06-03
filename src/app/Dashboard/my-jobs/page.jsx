import { Chip, Table } from "@heroui/react";

const JobsTable = async () => {
  const res = await fetch("http://localhost:5000/add-job", {
    cache: "no-store",
  });

  const data = await res.json();

  return (
    <Table>
      <Table.ResizableContainer>
        <Table.Content
          aria-label="Jobs Table"
          className="min-w-[900px]"
        >
          <Table.Header>
            <Table.Column>Title</Table.Column>
            <Table.Column>Company</Table.Column>
            <Table.Column>Location</Table.Column>
            <Table.Column>Salary</Table.Column>
            <Table.Column>Type</Table.Column>
          </Table.Header>

          <Table.Body>
            {data.map((job) => (
              <Table.Row key={job._id}>
                <Table.Cell>{job.title}</Table.Cell>

                <Table.Cell>{job.company}</Table.Cell>

                <Table.Cell>{job.location}</Table.Cell>

                <Table.Cell>{job.salary}</Table.Cell>

                <Table.Cell>
                  <Chip color="primary" size="sm">
                    {job.jobType}
                  </Chip>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ResizableContainer>
    </Table>
  );
};

export default JobsTable;
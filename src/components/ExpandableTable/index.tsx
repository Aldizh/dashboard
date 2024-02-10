import { useState, useEffect } from "react"
import { Table, Segment, Grid, Label, Container } from "semantic-ui-react"
import ParticlesBg from "particles-bg"
import { Outlet } from "react-router-dom"

import "./styles.css"

type Item = {
  type: string,
  status: string,
  date: string,
  tasks: string,
  name1: string,
  name2: string,
  percent: number
}

const tempData = [
  {
    type: "Onboard Contractor",
    status: "Pending",
    tasks: "2 of 4",
    date: "2014-04-18",
    name1: "Create Zendesk Ticket",
    name2: "LDAP Access",
    percent: 50
  },
  {
    type: "Onboard Employee",
    status: "Done",
    tasks: "1 of 3",
    date: "2014-04-21",
    name1: "Equipment Setup",
    name2: "Microsoft Training",
    percent: 100
  },
  {
    type: "Onboard Contractor",
    status: "Error",
    tasks: "3 of 3",
    date: "2014-08-09",
    name1: "Create Zendesk Ticket",
    name2: "LDAP Access",
    percent: 25
  },
  {
    type: "Terminate Contractor",
    status: "Done",
    tasks: "2 of 4",
    date: "2014-04-24",
    name1: "Create Zendesk Ticket",
    name2: "LDAP Access",
    percent: 100
  },
  {
    type: "Terminate Contractor",
    status: "Pending",
    tasks: "1 of 4",
    date: "2014-04-26",
    name1: "Create Zendesk Ticket",
    name2: "LDAP Access",
    percent: 90
  }
]

const renderGridSubColumns = (item: Item, index: number) => {
  let taskName = item.name1
  if (index > 1) taskName = item.name2
  return (
    <Grid columns={4}>
      <Grid.Column>
        <span><i>{taskName}</i></span>
      </Grid.Column>
      <Grid.Column>
        <span>Status: {item.status}</span>
      </Grid.Column>
      <Grid.Column>
        <span>Percent Complete: {item.percent}</span>
      </Grid.Column>
      <Grid.Column>
        <span>
          <button>Update</button>
        </span>
      </Grid.Column>
    </Grid>
  )
}

export default function ExpandTable() {
  const [expandedRows, setExpanded] = useState<Array<number>>([]);
  const [allItemRows, setData] = useState<Array<JSX.Element[]>>([]);

  useEffect(() => {
    const handleRowClick = (rowId: number) => {
      const currentExpandedRows: Array<number> = expandedRows
      const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId)
      
      // This allows for only one row to be expanded at a time
      const newExpandedRows: Array<number> = isRowCurrentlyExpanded ? [] : [rowId]

      // This allows for multiple rows to be expanded at a time
      // const newExpandedRows = isRowCurrentlyExpanded
      //   ? currentExpandedRows.filter((id) => id !== rowId)
      //   : currentExpandedRows.concat(rowId)

      setExpanded(newExpandedRows)
    }

    const renderItemCaret = (rowId: number) => {
      const currentExpandedRows = expandedRows
      const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId)

      if (isRowCurrentlyExpanded) {
        return <i className="fa fa-angle-up"></i>
      } else {
        return <i className="fa fa-angle-down"></i>
      }
    }

    const renderItem = (item: Item, index: number) => {
      const itemRows = [
        <Table.Row
          onClick={() => handleRowClick(index)}
          key={`row-data-${index}`}
        >
          <Table.Cell>{renderItemCaret(index)}</Table.Cell>
          <Table.Cell>{item.type}</Table.Cell>
          <Table.Cell>{item.status}</Table.Cell>
          <Table.Cell>{item.date}</Table.Cell>
          <Table.Cell>{item.tasks}</Table.Cell>
        </Table.Row>
      ]

      if (expandedRows.includes(index)) {
        itemRows.push(
          <Table.Row key={`row-expanded-${index}`}>
            <Table.Cell colSpan="5">{renderItemDetails(item)}</Table.Cell>
          </Table.Row>
        )
      }

      return itemRows
    }
    let allItemRows: Array<JSX.Element[]> = []
    tempData.forEach((item, index) => {
      const perItemRows = renderItem(item, index)
      allItemRows = [...allItemRows, perItemRows]
    })
    setData(allItemRows)
  }, [expandedRows])

  const renderItemDetails = (item: Item) => (
    <Segment basic>
      <Label><strong>2 Active Tasks</strong></Label>
      {renderGridSubColumns(item, 1)}
      {renderGridSubColumns(item, 2)}
    </Segment>
  )

  return (
    <>
      <Container>
        <Table selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell>Activity Type</Table.HeaderCell>
              <Table.HeaderCell>Overall Status</Table.HeaderCell>
              <Table.HeaderCell>Date Created</Table.HeaderCell>
              <Table.HeaderCell>Tasks Completed</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{allItemRows}</Table.Body>
        </Table>
      </Container>
      <ParticlesBg type="circle" bg={true} />
      <Outlet />
    </>
  )
}
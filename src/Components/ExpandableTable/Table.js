import React, { useState, useEffect } from 'react'
import { Table, Segment, Grid } from 'semantic-ui-react'
import './styles.css'

const tempData = [
  {
    type: 'Onboard Contractor',
    status: 'Pending',
    tasks: '2 of 4',
    date: '2014-04-18',
    name1: 'Create Zendesk Ticket',
    name2: 'LDAP Access',
    percent: 50,
  },
  {
    type: 'Onboard Employee',
    status: 'Done',
    tasks: '1 of 3',
    date: '2014-04-21',
    name1: 'Equipment Setup',
    name2: 'Microsoft Training',
    percent: 100,
  },
  {
    type: 'Onboard Contractor',
    status: 'Error',
    tasks: '3 of 3',
    date: '2014-08-09',
    name1: 'Create Zendesk Ticket',
    name2: 'LDAP Access',
    percent: 25,
  },
  {
    type: 'Terminate Contractor',
    status: 'Done',
    tasks: '2 of 4',
    date: '2014-04-24',
    name1: 'Create Zendesk Ticket',
    name2: 'LDAP Access',
    percent: 100,
  },
  {
    type: 'Terminate Contractor',
    status: 'Pending',
    tasks: '1 of 4',
    date: '2014-04-26',
    name1: 'Create Zendesk Ticket',
    name2: 'LDAP Access',
    percent: 90,
  },
]

const renderGridSubColumns = (item, index) => {
  let taskName = item.name1
  if (index > 1) taskName = item.name2
  return (
    <Grid columns={4}>
      <Grid.Column>
        <span>
          {index}: {taskName}
        </span>
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

const ExapndableTable = () => {
  const [expandedRows, setExpanded] = useState([])
  const [allItemRows, setData] = useState([])

  useEffect(() => {
    const handleRowClick = (rowId) => {
      const currentExpandedRows = expandedRows
      const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId)

      const newExpandedRows = isRowCurrentlyExpanded
        ? currentExpandedRows.filter((id) => id !== rowId)
        : currentExpandedRows.concat(rowId)

      setExpanded(newExpandedRows)
    }

    const renderItemCaret = (rowId) => {
      const currentExpandedRows = expandedRows
      const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId)

      if (isRowCurrentlyExpanded) {
        return <i className="fa fa-angle-up"></i>
      } else {
        return <i className="fa fa-angle-down"></i>
      }
    }

    const renderItem = (item, index) => {
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
        </Table.Row>,
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
    let allItemRows = []
    tempData.forEach((item, index) => {
      const perItemRows = renderItem(item, index)
      allItemRows = allItemRows.concat(perItemRows)
    })
    setData(allItemRows)
  }, [expandedRows])

  const renderItemDetails = (item) => (
    <Segment basic>
      <h2>2 Active Tasks</h2>
      {renderGridSubColumns(item, 1)}
      {renderGridSubColumns(item, 2)}
    </Segment>
  )

  return (
    <div className="expandTable">
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
    </div>
  )
}

export default ExapndableTable

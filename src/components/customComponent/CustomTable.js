import DataTable from 'react-data-table-component'
import React, { useEffect } from 'react'
import { CButton, CCol, CFormInput, CInputGroup, CInputGroupText, CRow } from '@coreui/react'

const CustomTable = ({ columns, data, feildName, showSearchFilter = false }) => {
  const [filterText, setFilterText] = React.useState('')
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false)

  const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <>
      <CRow>
        <CCol className="display-flex">
          <CInputGroup>
            <CFormInput
              id="search"
              type="text"
              placeholder={`Search By ${feildName}`}
              aria-label="Search Input"
              onChange={onFilter}
              value={filterText}
            />
            <CInputGroupText>
              <CButton color="secondary" type="button" onClick={onClear}>
                X
              </CButton>
            </CInputGroupText>
          </CInputGroup>
        </CCol>
      </CRow>
    </>
  )

  const filteredItems = data.filter(
    (item) => item[feildName] && item[feildName].toLowerCase().includes(filterText.toLowerCase())
  )

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle)
        setFilterText('')
      }
    }

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    )
  }, [filterText, resetPaginationToggle])

  const customStyles = {
    rows: {
      style: {
        minHeight: '1rem', // override the row height
      },
    },
    headCells: {
      style: {
        padding: '0px',
        margin: '0px',
        paddingLeft: '5px', // override the cell padding for head cells
        paddingRight: '5px',
        backgroundColor: '#4d3227',
        color: '#fff',
        fontSize: '0.8rem',
        fontWeight: 'bold',
        height: '3.25rem',
      },
    },
    cells: {
      style: {
        paddingLeft: '8px', // override the cell padding for data cells
        paddingRight: '8px',
        fontSize: '0.75zzzzzzzzzrem',
        textAlign: 'center',
      },
    },
  }

  return showSearchFilter ? (
    <DataTable
      data={filteredItems}
      columns={columns}
      // data={data}
      subHeader
      subHeaderComponent={subHeaderComponentMemo}
      pagination
      customStyles={customStyles}
    />
  ) : (
    <DataTable data={data} columns={columns} pagination customStyles={customStyles} />
  )
}

export default CustomTable

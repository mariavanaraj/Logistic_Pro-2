import React from 'react'
import { CButton } from '@coreui/react'

const CustomSpanButton = ({handleViewDocuments,vehicleId,documentType}) => {
  return (
    <>
      <span>
        <CButton
          onClick={(e) => handleViewDocuments(e,vehicleId,documentType)}
          className="w-100 m-0"
          color=""
          size="sm"
          id="inputAddress"
        >
          <span className="float-start">
            <i className="fa fa-eye" aria-hidden="true"></i> &nbsp;View
          </span>
        </CButton>
      </span>
    </>
  )
}

export default CustomSpanButton

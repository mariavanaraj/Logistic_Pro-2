// Created By Mariavanaraj
import {
  CForm,
  CButton,
  CCard,
  CContainer,
  CCol,
  CRow,
  CModal,
  CFormInput,
  CFormLabel,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CCardImage,
  CModalFooter,
  CAlert,
} from '@coreui/react'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useForm from 'src/Hooks/useForm'
import validate from 'src/Utils/Validation'
import CustomTable from 'src/components/customComponent/CustomTable'
import StatusApi from '../../../Service/SubMaster/StatusApi'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const StatusTable = () => {
  const [modal, setModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [rowData, setRowData] = useState([])
  const [save, setSave] = useState(true)
  const [success, setSuccess] = useState('')
  const [editId, setEditId] = useState('')
  const [deleteId, setDeleteId] = useState('')
  const [update, setUpdate] = useState('')
  const [deleted, setDeleted] = useState('')
  const [error, setError] = useState('')
  const [mount, setMount] = useState(1)
  const formValues = {
    status: '',
  }
  // =================== Validation ===============
  const {
    values,
    errors,
    handleChange,
    onFocus,
    handleSubmit,
    enableSubmit,
    onBlur,
    onClick,
    onKeyUp,
  } = useForm(login, validate, formValues)

  function login() {
    // alert('No Errors CallBack Called')
  }
  // =================== Validation ===============

  /*                    */

  // =================== CRUD =====================
  const Create = (e) => {
    e.preventDefault()
    let createValues = { status: values.status }
    StatusApi.createStatus(createValues)
      .then((response) => {
        setSuccess('New Status Added Successfully')
      })
      .catch((error) => {
        setError(error.response.data.errors.status[0])
        setTimeout(() => {
          setError('')
        }, 1000)
      })
  }

  const Edit = (id) => {
    setSave(false)
    setEditId('')
    StatusApi.getStatusById(id).then((response) => {
      let editData = response.data.data
      setModal(true)
      values.status = editData.status
      setEditId(id)
    })
  }

  const Update = (id) => {
    let updateValues = { status: values.status }
    console.log(updateValues, id)
    StatusApi.updateStatus(updateValues, id)
      .then((res) => {
        if (res.status == 200) {
          setModal(false)
          toast.success('Status Updated Successfully!')
          setMount((prevState) => (prevState = prevState + 1))
        }
      })
      .catch((error) => {
        setError(error.response.data.errors.status[0])
        setTimeout(() => {
          setError('')
        }, 1000)
      })
  }

  const Delete = (deleteId) => {
    StatusApi.deleteStatus(deleteId).then((res) => {
      if (res.status === 204) {
        setMount((prevState) => (prevState = prevState + 1))
        toast.success('Status Status Updated Successfully!')
      }
    })
    setTimeout(() => setDeleteModal(false), 500)
  }

  useEffect(() => {
    StatusApi.getStatus().then((response) => {
      let viewData = response.data.data
      let rowDataList = []
      viewData.map((data, index) => {
        rowDataList.push({
          sno: index + 1,
          StatusName: data.status,
          Created_at: data.created_at,
          Status: (
            <span
              className={`badge rounded-pill bg-${data.status_status === 1 ? 'info' : 'danger'}`}
            >
              {data.status_status === 1 ? 'Active' : 'InActive'}
            </span>
          ),
          Action: (
            <div className="d-flex justify-content-space-between">
              <CButton
                size="sm"
                color="danger"
                shape="rounded"
                id={data.id}
                onClick={() => Delete(data.id)}
                className="m-1"
              >
                {/* Delete */}
                <i className="fa fa-trash" aria-hidden="true"></i>
              </CButton>
              <CButton
              disabled={data.status_status === 1 ? false : true}
                size="sm"
                color="secondary"
                shape="rounded"
                id={data.id}
                onClick={() => Edit(data.id)}
                className="m-1"
              >
                {/* Edit */}
                <i className="fa fa-edit" aria-hidden="true"></i>
              </CButton>
            </div>
          ),
        })
      })
      setRowData(rowDataList)

      setTimeout(() => {
        setSuccess('')
        setUpdate('')
        setDeleted('')
      }, 1500)
    })
  }, [mount, modal, save, success, update, deleted])
  // ============ CRUD =====================
  /*                    */
  // ============ Column Header Data =======
  const columns = [
    {
      name: 'S.No',
      selector: (row) => row.sno,
      sortable: true,
      center: true,
    },
    {
      name: 'Created_at',
      selector: (row) => row.Created_at,
      left: true,
    },
    {
      name: 'Status',
      selector: (row) => row.StatusName,
      sortable: true,
      left: true,
    },
    {
      name: 'Status',
      selector: (row) => row.Status,
      left: true,
    },
    {
      name: 'Action',
      selector: (row) => row.Action,
      center: true,
    },
  ]
  // =================== Column Header Data =======

  return (
    <>
      <CContainer className="mt-2">
        <CRow className="mt-3">
          <CCol
            className="offset-md-6"
            xs={15}
            sm={15}
            md={6}
            style={{ display: 'flex', justifyContent: 'end' }}
          >
            <CButton
              size="md"
              color="warning"
              className="px-3 text-white"
              onClick={() => {
                values.status = ''
                setSuccess('')
                setUpdate('')
                setError('')
                setDeleted('')
                setModal(!modal)
              }}
            >
              <span className="float-start">
                <i className="" aria-hidden="true"></i> &nbsp;New Status
              </span>
            </CButton>
          </CCol>
        </CRow>
        <CCard className="mt-1">
          <CustomTable columns={columns} data={rowData || ''} />
        </CCard>
      </CContainer>

      {/* View & Edit Modal Section */}
      <CModal visible={modal} onClose={() => setModal(false)}>
        <CModalHeader>
          <CModalTitle>Status</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol>
              {update && (
                <CAlert color="primary" data-aos="fade-down" dismissible>
                  {update}
                </CAlert>
              )}
              {success && (
                <CAlert color="success" data-aos="fade-down" dismissible>
                  {success}
                </CAlert>
              )}
              {error && (
                <CAlert color="danger" data-aos="fade-down" dismissible>
                  {error}
                </CAlert>
              )}

              <CFormLabel htmlFor="status">
                Status*{' '}
                {errors.status && <span className="small text-danger">{errors.status}</span>}
              </CFormLabel>
              <CFormInput
                size="sm"
                id="status"
                maxLength={30}
                className={`${errors.status && 'is-invalid'}`}
                name="status"
                value={values.status || ''}
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={handleChange}
                aria-label="Small select example"
              />
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton onClick={(e) => (save ? Create(e) : Update(editId))} color="primary">
            {save ? 'Save' : 'Update'}
          </CButton>
        </CModalFooter>
      </CModal>
      {/* View & Edit Modal Section */}

      {/* Delete Modal Section */}
      <CModal visible={deleteModal} onClose={() => setDeleteModal(false)}>
        <CModalHeader>
          <CModalTitle className="h4">Confirm To Delete</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol>
              <CFormLabel htmlFor="status">Are you sure want to Delete ?</CFormLabel>
            </CCol>
          </CRow>
          {deleted && (
            <CAlert color="danger" dismissible>
              {deleted}
            </CAlert>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton onClick={() => Delete()} color="danger">
            YES
          </CButton>
          <CButton onClick={() => setDeleteModal(false)} color="primary">
            NO
          </CButton>
        </CModalFooter>
      </CModal>
      {/* Delete Modal Section */}
    </>
  )
}

export default StatusTable

// {
//   name: 'Creation Date',
//   selector: (row) => row.Creation_Date,
//   sortable: true,
//   center: true,
// },

// {
//   name: 'Status',
//   selector: (row) => row.Status,
//   center: true,
// },

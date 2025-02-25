/* eslint-disable prettier/prettier */
import {
    CButton,
    CCard,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CFormLabel,
    CFormSelect,
    CNav,
    CNavItem,
    CNavLink,
    CRow,
    CTabContent,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CTabPane,
    CFormFloating,
    CFormCheck,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
} from '@coreui/react'
import { React, useState } from 'react'
import useForm from 'src/Hooks/useForm.js'
import validate from 'src/Utils/Validation'

const UserLoginMaster = () => {
    const formValues = {
        vehicleType: '',
        OdometerKm: '',
        odometerPhoto: '',
    }

    const border = {
        borderColor: '#b1b7c1',
    }

    const { values, errors, handleChange, onFocus, handleSubmit, enableSubmit, onBlur } = useForm(
        login,
        validate,
        formValues
    )

    function login() {
        alert('No Errors CallBack Called')
    }

    const [visible, setVisible] = useState(false)
    // document.title=('Vehicle Inspection');
    return (
        <>
            <CCard>
                <CTabContent>
                    <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={true}>
                        <CForm className="row g-3 m-2 p-1" onSubmit={handleSubmit}>
                            <CRow className="mb-md-1">
                                <CCol md={3}>
                                    <CFormLabel htmlFor="uName">User Name*</CFormLabel>
                                    <CFormInput
                                        name="uName"
                                        size="sm"
                                        id="uName"
                                        placeholder=""

                                    />
                                </CCol>
                                <CCol md={3}>
                                    <CFormLabel htmlFor="Divison">
                                        Divison*{' '}
                                        {errors.Divison && (
                                            <span className="small text-danger">{errors.Divison}</span>
                                        )}
                                    </CFormLabel>

                                    <CFormSelect
                                        size="sm"
                                        name="Divison"
                                        id='Divison'
                                        onFocus={onFocus}
                                        onBlur={onBlur}
                                        onChange={handleChange}
                                        value={values.Divison}
                                        className={`mb-1 ${errors.Divison && 'is-invalid'}`}
                                        aria-label="Small select example"
                                    >
                                        <option >Select ...</option>

                                        <option value="1">NLFD</option>

                                        <option value="2">NLFA</option>

                                        <option value="3">NLMD</option>

                                        <option value="3">NLCD</option>

                                        <option value="3">NLDV</option>
                                    </CFormSelect>
                                </CCol>
                                <CCol md={3}>
                                    <CFormLabel htmlFor="Department">
                                        Department*{' '}
                                        {errors.Department && (
                                            <span className="small text-danger">{errors.Department}</span>
                                        )}
                                    </CFormLabel>

                                    <CFormSelect
                                        size="sm"
                                        name="Department"
                                        id='Department'
                                        onFocus={onFocus}
                                        onBlur={onBlur}
                                        onChange={handleChange}
                                        value={values.Department}
                                        className={`mb-1 ${errors.Department && 'is-invalid'}`}
                                        aria-label="Small select example"
                                    >
                                        <option >Select ...</option>

                                        <option value="1">Sourcing Team</option>

                                        <option value="2">Security</option>

                                        <option value="3">Accounts</option>

                                        <option value="4">Maintainence</option>

                                        <option value="5">Admin</option>
                                    </CFormSelect>
                                </CCol>
                                <CCol md={3}>
                                    <CFormLabel htmlFor="Designation">
                                        Designation*{' '}
                                        {errors.Designation && (
                                            <span className="small text-danger">{errors.Designation}</span>
                                        )}
                                    </CFormLabel>
                                    <CFormSelect
                                        size="sm"
                                        name="Designation"
                                        id='Designation'
                                        onFocus={onFocus}
                                        onBlur={onBlur}
                                        onChange={handleChange}
                                        value={values.Designation}
                                        className={`mb-1 ${errors.Designation && 'is-invalid'}`}
                                        aria-label="Small select example"
                                    >
                                        <option >Select ...</option>

                                        <option value="1">Junior Executive</option>

                                        <option value="2">Executiove</option>

                                        <option value="2">Senior Executive</option>

                                        <option value="2">Manageger</option>

                                        <option value="2">Security</option>
                                    </CFormSelect>
                                </CCol>

                            </CRow>
                            <CRow className="mb-md-1">
                                <CCol md={3}>
                                    <CFormLabel htmlFor="serial">Serial No*</CFormLabel>
                                    <CFormInput
                                        name="serial"
                                        size="sm"
                                        id="serial"
                                        placeholder=""

                                    />
                                </CCol>
                                <CCol md={3}>
                                    <CFormLabel htmlFor="uid">User ID*</CFormLabel>
                                    <CFormInput
                                        name="uid"
                                        size="sm"
                                        id="uid"
                                        placeholder=""
                                        readOnly
                                    />
                                </CCol>
                                <CCol md={3}>
                                    <CFormLabel htmlFor="uMob">User Mobile Number*</CFormLabel>
                                    <CFormInput
                                        name="uMob"
                                        size="sm"
                                        id="uMob"
                                        placeholder=""

                                    />
                                </CCol>
                                <CCol md={3}>
                                    <CFormLabel htmlFor="mail">User Mail ID*</CFormLabel>
                                    <CFormInput
                                        name="mail"
                                        size="sm"
                                        id="mail"
                                        placeholder=""

                                    />
                                </CCol>
                            </CRow>
                            <CRow className="mb-md-1">
                                <CCol md={3}>
                                    <CFormLabel htmlFor="UserPhoto">
                                        User Photo*{' '}
                                        {errors.UserPhoto && (
                                            <span className="small text-danger">{errors.UserPhoto}</span>
                                        )}
                                    </CFormLabel>
                                    <CFormInput
                                        type="file"
                                        name="UserPhoto"
                                        size="sm"
                                        id="UserPhoto"
                                    />
                                </CCol>

                            </CRow>
                            <CRow className="mb-md-1">
                                <CCol
                                    className="pull-right"
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    style={{ display: 'flex', justifyContent: 'flex-end' }}
                                >
                                    <CButton
                                        size="s-lg"
                                        color="warning"
                                        className="mx-1 px-2 text-white"
                                        type="submit"
                                    >
                                        Submit
                                    </CButton>

                                    <CButton
                                        size="s-lg"
                                        color="warning"
                                        className="mx-1 px-2 text-white"
                                        type="submit"
                                    >
                                        Cancel
                                    </CButton>
                                </CCol>
                            </CRow>
                        </CForm>
                    </CTabPane>
                </CTabContent>
            </CCard>
        </>
    )
}

export default UserLoginMaster

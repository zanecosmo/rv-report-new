import React, { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { ChooseReportTypeView } from "./choose-report-type";
import { Customer, Report } from "./types";

export interface CustomerProps {
  customer: Customer,
  setCustomer: Dispatch<SetStateAction<Customer | null>>
};

// interface CustomerFormState extends Record<string, string> {
//   info: CustomerInfo,
//   reports: Report[]
// };

export const CustomerView: FC<CustomerProps> = ({ customer, setCustomer }): JSX.Element => {
  const [ isEditing, setIsEditing] = useState(customer.id === "" ? true : false);
  const [ formState, setFormState ] = useState<Customer>(customer);
  const [ addingReport, setAddingReport ] = useState(false);

  const [ reports, setReports ] = useState<Report[]>([]);
  const [ report, setReport ] = useState<Report | null>(null);

  // const getReportList = async (id: string) => setReports(await window.electronAPI.getReportList(id));

  useEffect(() => {
    if (customer.id === "") return; // what if its a new customer? they will not have any reports
    // getReportList(customer.id!);
  }, [reports]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };
  
  const saveCustomer = () => {
    window.electronAPI.saveCustomerInfo(formState);
    setIsEditing(false);
  };

  const deleteCustomer = () => {
    window.electronAPI.deleteCustomer(customer.id!);
    setCustomer(null);
  };

  const addReport = () => {
    
  }

  if (addingReport) return (<ChooseReportTypeView {...customer} />)

  return (
    <>
      <section>
        {isEditing
          ? (<>
              <button type="button" onClick={saveCustomer}>Save</button>
              <button type="button" onClick={() => customer.id === "" ? setCustomer(null) : setIsEditing(false)}>Cancel</button>
            </>)
          : (<>
              <button type="button" onClick={() => setIsEditing(true)}>Edit Customer</button>
              <button type="button" onClick={() => setCustomer(null)}>Back</button>
              <button type="button" onClick={deleteCustomer}>Delete Customer</button>

            </>)}

        <h3>Customer Info</h3>
        <hr />

        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          name="firstName"
          value={ formState.firstName }
          onChange={ handleChange }
          readOnly={ !isEditing }
        />

        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          name="lastName"
          value={ formState.lastName }
          onChange={ handleChange }
          readOnly={ !isEditing }
        />

        <label htmlFor="address">Address</label>
        <input
          type="text"
          name="address"
          value={ formState.address }
          onChange={ handleChange }
          readOnly={ !isEditing }
        />

        <label htmlFor="phone">Phone Number</label>
        <input
          type="text"
          name="phone"
          value={ formState.phone }
          onChange={ handleChange }
          readOnly={ !isEditing }
        />

        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          value={ formState.email }
          onChange={ handleChange }
          readOnly={ !isEditing }
        />
      </section>
      <section>
        {!isEditing && (
          <>
            <button type="button" onClick={() => setAddingReport(true)}>Add Report</button>
            {reports.length === 0
              ? <div>NO REPORTS</div>
              : reports.map(report => {
                return <div>{ `${report.type} ${report.dateCreated}`}</div>
              })}
          </>
          )}
      </section>
    </>
  )
};
import React, { FormEvent, useState } from "react";
import { RequirementType } from "../lib/types";
import { useRequirement } from "../hooks/use-requirement";

const AddRequirementForm: React.FC = () => {
  const { addNewRequirement } = useRequirement();
  const [formData, setFormData] = useState<Omit<RequirementType, "id">>({
    complianceList: "",
    department: "",
    dateSubmitted: "",
    documentReference: "",
    entity: "",
    expiration: "",
    frequencyOfCompliance: "",
    personInCharge: "",
    renewal: "",
    status: "",
    typeOfCompliance: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { ...data } = formData;
    await addNewRequirement({ ...data });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col bg-slate-900 text-white p-4 rounded-md shadow-md"
    >
      <h2 className="text-2xl mb-4">Add New Requirement</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col gap-0.5">
          <label htmlFor="complianceList">List of Compliance</label>
          <input
            type="text"
            name="complianceList"
            value={formData.complianceList}
            onChange={handleChange}
            placeholder="Compliance List"
            className="p-2 rounded-md border border-gray-300"
          />
        </div>
        <div className="flex flex-col gap-0.5">
          <label htmlFor="department">Department</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="Department"
            className="p-2 rounded-md border border-gray-300"
          />
        </div>
        <div className="flex flex-col gap-0.5">
          <label htmlFor="dateSubmitted">Date Submitted</label>
          <input
            type="date"
            name="dateSubmitted"
            value={formData.dateSubmitted}
            onChange={handleChange}
            placeholder="Date Submitted"
            className="p-2 rounded-md border border-gray-300"
          />
        </div>
        <div className="flex flex-col gap-0.5">
          <label htmlFor="documentReference">Document Reference</label>
          <input
            type="text"
            name="documentReference"
            value={formData.documentReference}
            onChange={handleChange}
            placeholder="Document Reference"
            className="p-2 rounded-md border border-gray-300"
          />
        </div>
        <div className="flex flex-col gap-0.5">
          <label htmlFor="entity">Entity</label>
          <input
            type="text"
            name="entity"
            value={formData.entity}
            onChange={handleChange}
            placeholder="Entity"
            className="p-2 rounded-md border border-gray-300"
          />
        </div>
        <div className="flex flex-col gap-0.5">
          <label htmlFor="expiration">Expiration</label>
          <input
            type="date"
            name="expiration"
            value={formData.expiration}
            onChange={handleChange}
            placeholder="Expiration"
            className="p-2 rounded-md border border-gray-300"
          />
        </div>
        <div className="flex flex-col gap-0.5">
          <label htmlFor="frequencyOfCompliance">Frequency of Compliance</label>
          <input
            type="text"
            name="frequencyOfCompliance"
            value={formData.frequencyOfCompliance}
            onChange={handleChange}
            placeholder="Frequency of Compliance"
            className="p-2 rounded-md border border-gray-300"
          />
        </div>
        <div className="flex flex-col gap-0.5">
          <label htmlFor="personInCharge">Person In Charge</label>
          <input
            type="text"
            name="personInCharge"
            value={formData.personInCharge}
            onChange={handleChange}
            placeholder="Person in Charge"
            className="p-2 rounded-md border border-gray-300"
          />
        </div>
        <div className="flex flex-col gap-0.5">
          <label htmlFor="renewal">Renewal Date</label>
          <input
            type="date"
            name="renewal"
            value={formData.renewal}
            onChange={handleChange}
            placeholder="Renewal"
            className="p-2 rounded-md border border-gray-300"
          />
        </div>
        <div className="flex flex-col gap-0.5">
          <label htmlFor="status">Status</label>
          <input
            type="text"
            name="status"
            value={formData.status}
            onChange={handleChange}
            placeholder="Status"
            className="p-2 rounded-md border border-gray-300"
          />
        </div>
        <div className="flex flex-col gap-0.5">
          <label htmlFor="typeOfCompliance">Type of Compliance</label>
          <input
            type="text"
            name="typeOfCompliance"
            value={formData.typeOfCompliance}
            onChange={handleChange}
            placeholder="Type of Compliance"
            className="p-2 rounded-md border border-gray-300"
          />
        </div>
      </div>
      <button
        type="submit"
        className="mt-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Add Requirement
      </button>
    </form>
  );
};

export default AddRequirementForm;

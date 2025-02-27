import { useRequirement } from "../hooks/use-requirement";
import { useNavigate } from "react-router-dom";

export const Requirements: React.FC = () => {
  const { requirements, deleteRequirement } = useRequirement();
    const navigate = useNavigate();
  const calculateRemainingDays = (dateSubmitted: string, expiration: string) => {
    const submittedDate = new Date(dateSubmitted);
    const expirationDate = new Date(expiration);
    const timeDiff = expirationDate.getTime() - submittedDate.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  const handleDelete = async (e: React.FormEvent<HTMLElement>, id: string) => {
      e.preventDefault();
  
      if(confirm('Are you sure you want to delete this record?')) {
          try {
              await deleteRequirement(id);
          } catch (error) {
              console.error(error)
          }
      }
    }

  return (
    <div>
      <h1 className="text-3xl text-center font-bold mb-5">Requirements</h1>
      <table className="border-collapse w-full text-left">
        <thead className="bg-slate-600 border-2 text-white">
          <tr>
            <th className="p-2">Compliance List</th>
            <th className="p-2">Department</th>
            <th className="p-2">Date Submitted</th>
            <th className="p-2">Expiration</th>
            <th className="p-2">Renewal Date</th>
            <th className="p-2">Reference</th>
            <th className="p-2">Entity</th>
            <th className="p-2">Person In Charge</th>
            <th className="p-2">Type of Compliance</th>
            <th className="p-2">Frequency of Compliance</th>
            <th className="p-2">Remaining Days</th>
            <th className="p-2">Status</th>
            <th className="p-2">Options</th>
          </tr>
        </thead>
        <tbody>
          {requirements.map((req, index) => (
            <tr
              key={index}
              className="border-b hover:bg-slate-500 cursor-pointer"
            >
              <td className="p-2">{req.complianceList}</td>
              <td className="p-2">{req.department}</td>
              <td className="p-2">{req.dateSubmitted}</td>
              <td className="p-2">{req.expiration}</td>
              <td className="p-2">{req.renewal}</td>
              <td className="p-2">{req.documentReference}</td>
              <td className="p-2">{req.entity}</td>
              <td className="p-2">{req.personInCharge}</td>
              <td className="p-2">{req.typeOfCompliance}</td>
              <td className="p-2">{req.frequencyOfCompliance}</td>
              <td className="p-2">{calculateRemainingDays(req.dateSubmitted, req.expiration)}</td>
              <td className="p-2">{req.status}</td>
              <td className="p-2">
                <div className="flex gap-2.5">
                    <button className="bg-blue-800 p-5 rounded-3xl cursor-pointer" onClick={() => navigate(`/edit/${req.id}`)}>Edit</button>
                    <button className="bg-red-600 p-5 rounded-3xl cursor-pointer" onClick={(e) => handleDelete(e, req.id)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Requirements;

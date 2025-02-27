import { useRequirement } from "../hooks/use-requirement";
import { RequirementType } from "../lib/types";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

type IdProp = {
    id?: string
}

export const ViewRequirement = () => {
    const { id } = useParams<IdProp>();
    const navigate = useNavigate();
    const [requirements, setRequirements] = useState<RequirementType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { getRequirement, deleteRequirement } = useRequirement();

    const calculateRemainingDays = (dateSubmitted: string, expiration: string) => {
        const submittedDate = new Date(dateSubmitted);
        const expirationDate = new Date(expiration);
        const timeDiff = expirationDate.getTime() - submittedDate.getTime();
        return Math.ceil(timeDiff / (1000 * 3600 * 24));
      };
    
    useEffect(() => {
        const fetchData = async () => {
          if (id) {
            const data = await getRequirement(id);
            console.log(data)
            if (data) {
              setRequirements([data]);
              setLoading(false)
            }
          }
        };
        fetchData()
      }, [id]);

      const handleDelete = async (e: React.FormEvent<HTMLElement>, id: string) => {
        e.preventDefault();
    
        if (confirm('Are you sure you want to delete this record?')) {
            try {
                await deleteRequirement(id);
                navigate('/');
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Requirement Details</h1>
            { loading ? (<h1>Loading</h1>): requirements.length > 0 && (
                <div className="bg-slate-900 shadow-md rounded p-4">
                    <p><strong>Department:</strong> {requirements[0].department}</p>
                    <p><strong>Entity:</strong> {requirements[0].entity}</p>
                    <p><strong>Status:</strong> {requirements[0].status}</p>
                    <p><strong>Date Submitted:</strong> {requirements[0].dateSubmitted}</p>
                    <p><strong>Expiration:</strong> {requirements[0].expiration}</p>
                    <p><strong>Renewal Date:</strong> {requirements[0].renewal}</p>
                    <p><strong>Days Remaining:</strong> {calculateRemainingDays(requirements[0].dateSubmitted, requirements[0].expiration)}</p>
                    
                    <div className="flex gap-3 mt-4">
                        {id && <button className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer" onClick={() => navigate(`/edit/${id}`)}>Edit</button>}
                        {id && <button className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer" onClick={(e) => handleDelete(e, id)}>Delete</button>}
                        <button className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer" onClick={() => navigate('/')}>Back</button>
                    </div>
                </div>
            )}
        </div>
    );
};
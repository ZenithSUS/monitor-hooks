import { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  addDoc,
  getDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import { RequirementType } from "../lib/types";
import { useNavigate } from "react-router-dom";

export const useRequirement = () => {
  const [requirements, setRequirements] = useState<RequirementType[]>([]);

  const navigte = useNavigate();
  const fetchRequirement = async () => {
    const q = query(collection(db, "Requirements"));
    const requirementSnapshot = onSnapshot(q, (querySnapshot) => {
      let requirement: Object[] = [];
      querySnapshot.forEach((doc) => {
        requirement.push({ ...doc.data(), id: doc.id });
      });
      setRequirements(requirement as RequirementType[]);
    });

    return requirementSnapshot;
  };

  useEffect(() => {
    fetchRequirement();
  }, []);

  const getRequirement = async (id: string) => {
    try {
      const docSnap = await getDoc(doc(db, "Requirements", id));
      if (docSnap.exists()) {
        return docSnap.data() as RequirementType;
      } else {
        console.error("No such document!");
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  type CreateRequirement = Omit<RequirementType, "id">;

  const addNewRequirement = async (requirements: CreateRequirement) => {
    try {
      await addDoc(collection(db, "Requirements"), {
        complianceList: requirements.complianceList,
        department: requirements.department,
        dateSubmitted: requirements.dateSubmitted,
        documentReference: requirements.documentReference,
        entity: requirements.entity,
        expiration: requirements.expiration,
        frequencyOfCompliance: requirements.frequencyOfCompliance,
        personInCharge: requirements.personInCharge,
        renewal: requirements.renewal,
        status: requirements.status,
        typeOfCompliance: requirements.typeOfCompliance,
      });
      navigte("/");
    } catch (error) {
      console.error(error);
    }
  };

  const updateRequirement = async (
    requirements: CreateRequirement,
    id: string
  ) => {
    try {
      console.log(id)
      await updateDoc(doc(db, "Requirements", id), {
        complianceList: requirements.complianceList,
        department: requirements.department,
        dateSubmitted: requirements.dateSubmitted,
        documentReference: requirements.documentReference,
        entity: requirements.entity,
        expiration: requirements.expiration,
        frequencyOfCompliance: requirements.frequencyOfCompliance,
        personInCharge: requirements.personInCharge,
        renewal: requirements.renewal,
        status: requirements.status,
        typeOfCompliance: requirements.typeOfCompliance,
      });
      navigte('/');
    } catch (error) {
      console.error(error);
    }
  };

  const deleteRequirement = async (id: string) => {
    try {
      await deleteDoc(doc(db, "Requirements", id));
    } catch (error) {
      console.error(error);
    }
  };

  return {
    requirements,
    getRequirement,
    addNewRequirement,
    updateRequirement,
    deleteRequirement,
  };
};

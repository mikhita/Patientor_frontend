import axios from "axios";
import { HealthCheckEntryType, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const getById = async (id: string) => {
  console.log("ID:", id);
  const response = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  return response.data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

export const addEntryToPatient = async (patientId: string, entry: HealthCheckEntryType) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/patients/${patientId}/entries`, entry);
    console.log("patient id", patientId);
    return response.data;
  } catch (error) {
    // Handle errors, e.g., by throwing an exception or returning an error object
    console.error('Error adding entry:', error);
    throw error;
  }
};


export default {
  getAll, create, getById, addEntryToPatient
};


import axios from "axios";
// import { Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";
import { Diagnoses } from "../types";

const getAllDiagnoses = async () => {
  const { data } = await axios.get<Diagnoses[]>(
    `${apiBaseUrl}/diagnoses`
  );

  return data;
};

export default {
  getAllDiagnoses
};
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Patient, Entry, Diagnoses } from '../../types';
import patientService from "../../services/patients";
import { Box, Typography, CircularProgress, List, ListItem, ListItemText } from "@mui/material";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import diagnosesDataApi from "../../services/diagnosesDataApi";

let diagnosesData: Diagnoses[] = [];

async function loadDiagnosesData() {
  try {
    const data = await diagnosesDataApi.getAllDiagnoses();
    diagnosesData = data;
  } catch (error) {
    console.error("Error fetching diagnosis data: ", error);
  }
}

loadDiagnosesData();

const PatientDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const fetchedPatient = await patientService.getById(id ?? '');
        setPatient(fetchedPatient);
      } catch (error) {
        console.error("Error fetching patient by ID:", error);
      }
    };

    fetchPatient();
  }, [id]);
  const GenderIcon = ({ gender }: { gender: string }) => {
    return gender === "male" ? <MaleIcon /> : <FemaleIcon />;
  };
  
  const getDiagnosisDescription = (code: string) => {
    const diagnosis = diagnosesData.find((diagnosis) => diagnosis.code === code);
    return diagnosis ? diagnosis.name : "Unknown";
  };

  
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Patient Details
      </Typography>
      {patient ? (
        <Box >
          <Typography variant="h5">
            {patient.name}
            <GenderIcon gender={patient.gender} />
          </Typography>
          <Typography variant="body1">Occupation: {patient.occupation}</Typography>
          <Typography variant="body1">ssh: {patient.ssn}</Typography>
          <Typography variant="h5" marginTop="20px" marginBottom="20px">
            entries
          </Typography>
          {patient.entries.map((entry: Entry) => {
            return (
              <div key={entry.id}>
                <Typography variant="body1">
                  <strong>
                    {entry.date} {entry.description}
                  </strong>
                </Typography>
                {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
                  <div>
                    <Typography variant="body1"></Typography>
                    <List>
                      {entry.diagnosisCodes.map((code) => (
                        <ListItem key={code}>
                          <ListItemText primary={code}  secondary={getDiagnosisDescription(code)}/>
                        </ListItem>
                      ))}
                    </List>
                  </div>
                )}
              </div>
            );
          })}

        </Box>
      ) : (
        <Box display="flex" justifyContent="center" alignItems="center" height="100px">
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default PatientDetailsPage;

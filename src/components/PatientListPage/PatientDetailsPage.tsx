import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Patient, Entry, Diagnoses, HealthCheckEntry, HealthCheckEntryType } from '../../types';
import patientService, { addEntryToPatient } from "../../services/patients";
import { Box, Typography, CircularProgress, List, ListItem, ListItemText } from "@mui/material";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import WorkIcon from '@mui/icons-material/Work';
import diagnosesDataApi from "../../services/diagnosesDataApi";
import HealthRatingBar from "../HealthRatingBar";
import AddEntryForm from "../AddEntryModal/AddEntryForm";



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
  const TypeOfHealth = ({ type }: { type: string }) => {
  return (
    <>
      {type === "OccupationalHealthcare" ? (
        <>
          FBI <WorkIcon />
        </>
      ) : (
        <>
      <MedicalServicesIcon />
        </>
      )}
    </>
  );
};
  
  const getDiagnosisDescription = (code: string) => {
    const diagnosis = diagnosesData.find((diagnosis) => diagnosis.code === code);
    return diagnosis ? diagnosis.name : "Unknown";
  };
  
  const patientId = 'd2773336-f723-11e9-8f0b-362b9e155667';
  const handleAddEntry = async (entry: HealthCheckEntryType) => {
    try {
      // Add the entry to the patient data
      const addedEntry = await addEntryToPatient(patientId, entry); // Replace 'patientId' with the actual patient ID

      // Update the patient state when the Promise resolves
      setPatient((prevPatient) => {
        if (prevPatient) {
          // Make sure you handle the case when prevPatient is null (no patient found)
          return {
            ...prevPatient,
            entries: [...prevPatient.entries, addedEntry],
          };
        } else {
          return null; // Handle the case when no patient is found
        }
      });
    } catch (error) {
      // Handle errors, e.g., display an error message
      console.error('Error adding entry:', error);
    }
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
          {/* <AddEntryForm/> */}<AddEntryForm onAddEntry={handleAddEntry} patientId={patient.id} />
          <Typography variant="h5" marginTop="20px" marginBottom="20px">
            entries
          </Typography>
          {patient.entries.map((entry: Entry) => {
            return (
              <Box border={2} borderRadius={2} borderColor="black" marginBottom={3} marginTop={3} padding={2} key={entry.id}>
                <Typography variant="body1" >
                    {entry.date} 
                    {"    "}
                    <TypeOfHealth type={entry.type} />
                </Typography>
                <Typography variant="body1">
                   {entry.description}
                </Typography>
                {entry.type === "HealthCheck" && (
                  <div>
                    <HealthRatingBar showText={true} rating={(entry as HealthCheckEntry).healthCheckRating} />
                  </div>
                )}
                <Typography variant="body1">
                    {`diagnoses by ${entry.specialist}`} 
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
              </Box>
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

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Patient } from "../../types";
import patientService from "../../services/patients";
import { Box, Typography, CircularProgress } from "@mui/material";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';


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
    // Render the appropriate icon based on the gender
    return gender === "male" ? <MaleIcon /> : <FemaleIcon />;
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Patient Details
      </Typography>
      {patient ? (
        <Box border={1} borderColor="primary.main" p={2} borderRadius={8}>
          <Typography variant="h5">
            {patient.name}
            <GenderIcon gender={patient.gender} />
          </Typography>
          <Typography variant="body1">Occupation: {patient.occupation}</Typography>
          <Typography variant="body1">ssh: {patient.ssn}</Typography>
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

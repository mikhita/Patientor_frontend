// AddEntryForm.tsx

import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { addEntryToPatient } from '../../services/patients';
import { HealthCheckEntryType, HealthCheckRating } from '../../types';
import DateFieldValue from './DataFieldFormat';


interface AddEntryFormProps {
  onAddEntry: (entry: HealthCheckEntryType) => void;
  patientId: string;
}

const AddEntryForm: React.FC<AddEntryFormProps> = ({ onAddEntry, patientId }) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(0);
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newEntry: HealthCheckEntryType = {
      type: 'HealthCheck',
      description,
      date,
      specialist,
      healthCheckRating,
      diagnosisCodes,
    };

    try {
      // Call the addEntryToPatient service to add the entry
      const addedEntry = await addEntryToPatient(patientId, newEntry);
      onAddEntry(addedEntry);

      // Clear form fields or reset the form as needed
      setDescription('');
      setDate('');
      setSpecialist('');
      setHealthCheckRating(0);
      setDiagnosisCodes([]);
    } catch (error) {
      // Handle errors here, e.g., display an error message
      console.error('Error adding entry:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <DateFieldValue date={date} setDate={setDate} />
      <TextField
        label="Specialist"
        value={specialist}
        onChange={(e) => setSpecialist(e.target.value)}
      />
      <TextField
        label="Health Check Rating"
        type="number"
        value={healthCheckRating}
        onChange={(e) => setHealthCheckRating(Number(e.target.value))}
      />
      <TextField
        label="Diagnosis Codes"
        value={diagnosisCodes.join(', ')}
        onChange={(e) => setDiagnosisCodes(e.target.value.split(', '))}
      />
      <Button type="submit" variant="contained" color="primary">
        Add Entry
      </Button>
    </form>
  );
};

export default AddEntryForm;

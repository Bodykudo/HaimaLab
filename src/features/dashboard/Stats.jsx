/* eslint-disable react/prop-types */
import Stat from './Stat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStethoscope,
  faUserDoctor,
  faUserNurse,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { styled } from 'styled-components';

const DoctorBox = styled.div`
  @media (max-width: 1025px) {
    grid-column: 1 / span 2;
    grid-row: 1;
  }

  @media (max-width: 576px) {
    grid-column: 1 / span 4;
    grid-row: 1;
  }
`;

const NurseBox = styled.div`
  @media (max-width: 1025px) {
    grid-column: 3 / span 2;
    grid-row: 1;
  }

  @media (max-width: 576px) {
    grid-column: 1 / span 4;
    grid-row: 2;
  }
`;

const PatientBox = styled.div`
  @media (max-width: 1025px) {
    grid-column: 1 / span 2;
    grid-row: 2;
  }

  @media (max-width: 576px) {
    grid-column: 1 / span 4;
    grid-row: 3;
  }
`;

const DeviceBox = styled.div`
  @media (max-width: 1025px) {
    grid-column: 3 / span 2;
    grid-row: 2;
  }

  @media (max-width: 576px) {
    grid-column: 1 / span 4;
    grid-row: 4;
  }
`;

function Stats({ users, devices }) {
  // 1.
  const numDoctors = users?.filter((user) => user.userRole === 'doctor').length;

  // 2.
  const numNurses = users?.filter((user) => user.userRole === 'nurse').length;

  // 3.
  const numPatients = users?.filter(
    (user) => user.userRole === 'patient'
  ).length;

  // 4.
  const numDevices = devices?.length;

  return (
    <>
      <DoctorBox>
        <Stat
          title="Doctors"
          color="blue"
          icon={<FontAwesomeIcon icon={faUserDoctor} />}
          value={numDoctors}
        />
      </DoctorBox>
      <NurseBox>
        <Stat
          title="Nurses"
          color="green"
          icon={<FontAwesomeIcon icon={faUserNurse} />}
          value={numNurses}
        />
      </NurseBox>
      <PatientBox>
        <Stat
          title="Patients"
          color="indigo"
          icon={<FontAwesomeIcon icon={faUser} />}
          value={numPatients}
        />
      </PatientBox>
      <DeviceBox>
        <Stat
          title="Devices"
          color="yellow"
          icon={<FontAwesomeIcon icon={faStethoscope} />}
          value={numDevices}
        />
      </DeviceBox>
    </>
  );
}

export default Stats;

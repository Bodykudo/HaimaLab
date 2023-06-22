/* eslint-disable react/prop-types */
import styled from 'styled-components';
import Heading from '../../ui/Heading';
import {
  PieChart,
  ResponsiveContainer,
  Pie,
  Cell,
  Legend,
  Tooltip,
} from 'recharts';
import { useDarkMode } from '../../context/DarkModeContext';
import { useEffect, useState } from 'react';

const ChartBox = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;
  grid-column: 1 / span 2;
  grid-row: 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }

  @media (max-width: 1025px) {
    grid-column: 1 / span 4;
    grid-row: 4;
  }

  @media (max-width: 576px) {
    grid-row: 6;
  }
`;

const startDataLight = [
  {
    label: 'Male patients',
    value: 0,
    color: '#3b82f6',
  },
  {
    label: 'Female patients',
    value: 0,
    color: '#a855f7',
  },
];

const startDataDark = [
  {
    label: 'Male patients',
    value: 0,
    color: '#1d4ed8',
  },
  {
    label: 'Female patients',
    value: 0,
    color: '#7e22ce',
  },
];

function prepareData(startData, stays) {
  // A bit ugly code, but sometimes this is what it takes when working with real data 😅

  function incArrayValue(arr, field) {
    return arr.map((obj) =>
      obj.label === field ? { ...obj, value: obj.value + 1 } : obj
    );
  }

  const data = stays
    .reduce((arr, cur) => {
      // const num = cur.numNights;
      const role = cur.userRole;
      const sex = cur.sex;
      if (role === 'patient' && sex === 'male')
        return incArrayValue(arr, 'Male patients');
      if (role === 'patient' && sex === 'female')
        return incArrayValue(arr, 'Female patients');
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
}

function PatientsChart({ confirmedStays }) {
  const { isDarkMode } = useDarkMode();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const startData = isDarkMode ? startDataDark : startDataLight;
  const data = prepareData(startData, confirmedStays);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <ChartBox>
      <Heading as="h2">Patients gender distribution</Heading>
      <ResponsiveContainer width="100%" height={screenWidth > 576 ? 240 : 380}>
        <PieChart>
          <Pie
            data={data}
            nameKey="label"
            dataKey="value"
            innerRadius={85}
            outerRadius={110}
            cx={screenWidth > 576 ? '40%' : '50%'}
            cy={screenWidth > 576 ? '50%' : '50%'}
            paddingAngle={3}
          >
            {data.map((entry) => (
              <Cell fill={entry.color} stroke={entry.color} key={entry.label} />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign={screenWidth > 576 ? 'middle' : 'bottom'}
            align={screenWidth > 576 ? 'right' : 'center'}
            width={screenWidth > 576 ? '30%' : '60%'}
            layout="vertical"
            iconSize={15}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

export default PatientsChart;

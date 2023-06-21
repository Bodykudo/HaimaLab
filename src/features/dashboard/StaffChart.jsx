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

const ChartBox = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;
  grid-column: 3 / span 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }

  @media (max-width: 1025px) {
    grid-column: 1 / span 4;
    grid-row: 3;
  }

  @media (max-width: 576px) {
    grid-row: 5;
  }
`;

const startDataLight = [
  {
    label: 'Male doctors',
    value: 0,
    color: '#3b82f6',
  },
  {
    label: 'Female doctors',
    value: 0,
    color: '#a855f7',
  },
  {
    label: 'Male nurses',
    value: 0,
    color: '#14b8a6',
  },
  {
    label: 'Female nurses',
    value: 0,
    color: '#ef4444',
  },
];

const startDataDark = [
  {
    label: 'Male doctors',
    value: 0,
    color: '#1d4ed8',
  },
  {
    label: 'Female doctors',
    value: 0,
    color: '#7e22ce',
  },
  {
    label: 'Male nurses',
    value: 0,
    color: '#0f766e',
  },
  {
    label: 'Female nurses',
    value: 0,
    color: '#b91c1c',
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
      if (role === 'doctor' && sex === 'male')
        return incArrayValue(arr, 'Male doctors');
      if (role === 'doctor' && sex === 'female')
        return incArrayValue(arr, 'Female doctors');
      if (role === 'nurse' && sex === 'male')
        return incArrayValue(arr, 'Male nurses');
      if (role === 'nurse' && sex === 'female')
        return incArrayValue(arr, 'Female nurses');
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
}

function StaffChart({ confirmedStays }) {
  const { isDarkMode } = useDarkMode();
  const startData = isDarkMode ? startDataDark : startDataLight;
  const data = prepareData(startData, confirmedStays);

  return (
    <ChartBox>
      <Heading as="h2">Staff gender distribution</Heading>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            nameKey="label"
            dataKey="value"
            innerRadius={85}
            outerRadius={110}
            cx="40%"
            cy="50%"
            paddingAngle={3}
          >
            {data.map((entry) => (
              <Cell fill={entry.color} stroke={entry.color} key={entry.label} />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign="middle"
            align="right"
            width="30%"
            layout="vertical"
            iconSize={15}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

export default StaffChart;

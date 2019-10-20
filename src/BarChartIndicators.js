import React from 'react';
import {
  BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

// const dataTransformer = (previousDataSet: PreviousDataSet): NewDataSet => {
//   const newDataSet = previousDataSet.reduce((acc, currentItem, currentIndex) => {
//     acc[currentIndex] = acc[currentIndex] || {};
//     acc[currentIndex].roundNumber = currentItem.roundNumber;
//     currentItem.modelPredictions.forEach((item) => {
//       const { modelName } = item;
//       acc[currentIndex][modelName] = item.cumulativeCorrectCount;
//     });
//     return acc;
//   }, []);
//   return newDataSet;
// };

const BarChartIndicators = ({ data }) => {
  console.log(data);
  // const dataTransformed = dataTransformer(data);
  const mocked_data = [
    {
      name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
    },
    {
      name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
    },
    {
      name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
    },
    {
      name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
    },
    {
      name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
    },
    {
      name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
    },
    {
      name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
    },
  ];
  return (
    <ResponsiveContainer width="100%" height={451}>
      <BarChart
        width={800}
        height={300}
        data={mocked_data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" fill="#8884d8" />
        <Bar dataKey="uv" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartIndicators;

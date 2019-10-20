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
  // const dataTransformed = dataTransformer(data);

  return (
    <ResponsiveContainer width="100%" height={451}>
      <BarChart
        width={800}
        height={300}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="target" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="indicator1" fill="#8884d8" />
        <Bar dataKey="indicator2" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartIndicators;

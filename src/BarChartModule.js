import React from 'react';
import {
  BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const BarChartModule = ({ data }) => {
  const targetKeys = Object.keys(data);

  const indicators = targetKeys.reduce((acc, currentValue, index, array) => {
    acc.push({
      target: currentValue,
      ...data[currentValue]
    })
    return acc;
  }, []);

  return (
    <>
      <ResponsiveContainer width="100%" height={451}>
        <BarChart
          width={800}
          height={300}
          data={[{ "target": '3.1', "progress": 50 }, { "target": '3.2', "progress": 20 }, { "target": '3.7', "progress": 60 }]}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="target" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey='progress' fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="100%" height={451}>
        <BarChart
          width={800}
          height={300}
          data={indicators}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="target" />
          <YAxis />
          <Tooltip />
          <Legend />
          {
            indicators.map((item, index) => {
              const currentTarget = item.target;
              const rates = Object.keys(data[currentTarget]);
              return rates.map((rateName, index) => <Bar dataKey={rateName} fill="#8884d8" />)
            })
          }
        </BarChart>
      </ResponsiveContainer>

    </>
  );
};

export default BarChartModule;

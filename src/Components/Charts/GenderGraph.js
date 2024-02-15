import React from 'react';
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip } from 'recharts';

const GenderGraph = ({ data }) => {
  // Convert the API data format to the required format
  const yourGraphData = Object.keys(data).map(gender => ({
    name: gender,
    value: data[gender]
  }));

  // Define colors for each data segment
  const COLORS = ['#e47f7f', '#00C49F', '#000000']; // Pink for 'F', Blur for 'M', Black for 'O'

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Tooltip />
        <Pie
          dataKey="value"
          data={yourGraphData}
          isAnimationActive={true}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {yourGraphData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default GenderGraph;

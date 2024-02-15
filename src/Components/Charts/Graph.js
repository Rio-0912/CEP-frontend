import React from 'react';
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip } from 'recharts';

const Graph = ({ data }) => {
  // Convert the API data format to the required format
  const yourGraphData = data.map(item => ({
    name: item.name,
    value: item.value
  }));

  // Define colors for each data segment
  const COLORS = ['#00C49F', '#e47f7f', '#FFBB28', '#FF8042', '#DDBDF1', '#FF6565'];

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

export default Graph;

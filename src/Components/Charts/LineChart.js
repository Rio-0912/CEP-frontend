import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const LineChart = ({ data }) => {
  // Transform the data to match the expected format
  const transformedData = data.map(item => ({
    ...item,
    Student_Enrolled: item.uv
  }));

  return (
    <div>
      {/* Use ResponsiveContainer for better responsiveness */}
      <ResponsiveContainer width="100%" height={200}>
        {/* Use AreaChart with necessary components */}
        <AreaChart
          width={250}
          height={350}
          data={transformedData}
          margin={{
            top: 10,
            right: 30,
            left: -20,
            bottom: 0
          }}
        >
          {/* Add CartesianGrid for better readability */}
          <CartesianGrid strokeDasharray="3 3" />
          {/* Set XAxis and YAxis */}
          <XAxis dataKey="name" />
          <YAxis />
          {/* Add Tooltip for data display on hover */}
          <Tooltip />
          {/* Use Area for the chart itself */}
          <Area type="monotone" dataKey="Student_Enrolled" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart;

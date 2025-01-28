import React from 'react';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

const Chart = ({ chartData }) => {
  // console.log(chartData);
  const myData = {
    date: '' ,
    orders: 2,
    quantity: 1
  }
  return (
    <LineChart width={730} height={250} data={[chartData]}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend/>
      <Line type="monotone" dataKey="price" stroke="#8884d8" />
      <Line type="monotone" dataKey="orders" stroke="#82ca9d" />
    </LineChart>
  );
};

export default Chart;
"use client";

import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';

// Placeholder data - replace with actual data fetched from API
const data = [
  { name: 'Day 1', dusting: 4, poisoning: 1 },
  { name: 'Day 2', dusting: 7, poisoning: 2 },
  { name: 'Day 3', dusting: 5, poisoning: 1 },
  { name: 'Day 4', dusting: 10, poisoning: 3 },
  { name: 'Day 5', dusting: 8, poisoning: 2 },
  { name: 'Day 6', dusting: 12, poisoning: 4 },
  { name: 'Day 7', dusting: 15, poisoning: 5 },
];

export function OverviewChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="dusting" stroke="#FFA500" activeDot={{ r: 8 }} name="Dusting" />
        <Line type="monotone" dataKey="poisoning" stroke="#FF0000" activeDot={{ r: 8 }} name="Poisoning" />
      </LineChart>
    </ResponsiveContainer>
  );
}


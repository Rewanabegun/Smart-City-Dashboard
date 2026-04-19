import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

const TrafficChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>

        {/* ✅ FORMAT REAL TIME HERE */}
        tickFormatter={(time) => {
  const date = new Date(Number(time));
  if (isNaN(date.getTime())) return "";

  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
}}

        <YAxis stroke="#ccc" />

        <Tooltip
  labelFormatter={(time) => {
  const date = new Date(Number(time));
  if (isNaN(date.getTime())) return "";

  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
}}
/>

        <Line type="monotone" dataKey="density" stroke="#22c55e" />

      </LineChart>
    </ResponsiveContainer>
  );
};

export default TrafficChart;
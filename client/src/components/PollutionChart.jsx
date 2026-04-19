import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

const PollutionChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <XAxis dataKey="time" stroke="#ccc" />
        <YAxis stroke="#ccc" />
        <Tooltip />
        <Line type="monotone" dataKey="aqi" stroke="#ef4444" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PollutionChart;
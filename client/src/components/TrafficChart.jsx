import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

const TrafficChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>

        {/* ✅ SAME STYLE AS POLLUTION CHART */}
        <XAxis dataKey="time" stroke="#ccc" />
        <YAxis stroke="#ccc" />

        <Tooltip />

        <Line
          type="monotone"
          dataKey="density"
          stroke="#22c55e"
        />

      </LineChart>
    </ResponsiveContainer>
  );
};

export default TrafficChart;
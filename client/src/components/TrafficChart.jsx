import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

const TrafficChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>

        <XAxis
          dataKey="time"
          stroke="#ccc"
          tickFormatter={(time) =>
            time ? new Date(time).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit"
            }) : ""
          }
        />

        <YAxis stroke="#ccc" />

        <Tooltip
          labelFormatter={(time) =>
            time ? new Date(time).toLocaleTimeString() : ""
          }
        />

        <Line type="monotone" dataKey="density" stroke="#22c55e" />

      </LineChart>
    </ResponsiveContainer>
  );
};

export default TrafficChart;
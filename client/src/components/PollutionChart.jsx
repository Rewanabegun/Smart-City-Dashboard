import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const PollutionChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>

        {/* X AXIS (TIME FIXED) */}
        <XAxis
          dataKey="time"
          stroke="#ccc"
          tickFormatter={(time) => {
            const date = new Date(time);
            if (isNaN(date.getTime())) return "";

            return date.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });
          }}
        />

        {/* Y AXIS */}
        <YAxis stroke="#ccc" />

        {/* TOOLTIP */}
        <Tooltip
          labelFormatter={(time) => {
            const date = new Date(time);
            if (isNaN(date.getTime())) return "";

            return date.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            });
          }}
        />

        {/* AQI LINE */}
        <Line
          type="monotone"
          dataKey="aqi"
          stroke="#ef4444"
          strokeWidth={2}
          dot={false}
        />

      </LineChart>
    </ResponsiveContainer>
  );
};

export default PollutionChart;
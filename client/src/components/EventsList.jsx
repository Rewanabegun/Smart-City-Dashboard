const EventsList = () => {
  const events = [
    { id: 1, name: "Accident at Benz Circle", status: "Critical" },
    { id: 2, name: "Road Block - MG Road", status: "Moderate" }
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">City Events</h3>

      {events.map((e) => (
        <div
          key={e.id}
          className="bg-gray-700 p-3 mb-3 rounded-lg shadow"
        >
          <p className="font-semibold">{e.name}</p>
          <p className="text-sm text-gray-300">Status: {e.status}</p>
        </div>
      ))}
    </div>
  );
};

export default EventsList;
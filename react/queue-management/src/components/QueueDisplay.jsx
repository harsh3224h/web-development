import React from "react";

function QueueDisplay({ queue, onUpdateStatus, onRemoveStatus }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "waiting":
        return "var(--warning)";
        break;
      case "serving":
        return "var(--info)";
        break;
      case "completed":
        return "var(--success)";
        break;
      default:
        return "var(--text)";
    }
  };

  return (
    <div className="queue-display">
      <h2>Current Queue</h2>
      {queue.length === 0 ? (
        <p className="empty-queue">No Customer Data</p>
      ) : (
        <div className="queue-list">
          {queue.map((customer) => (
            <div className="queue-item" key={customer.id}>
              <div className="customer-info">
                <h3>{customer.name}</h3>
                <p>{customer.service}</p>
                <span
                  className="status"
                  style={{ color: getStatusColor(customer.status) }}
                >
                  {customer.status}
                </span>
              </div>
              <div className="actions">
                {customer.status === "waiting" && (
                  <button
                    className="serve-btn"
                    onClick={() => onUpdateStatus(customer.id, "serving")}
                  >
                    Serve
                  </button>
                )}
                {customer.status === "serving" && (
                  <button
                    className="serve-btn"
                    onClick={() => onUpdateStatus(customer.id, "completed")}
                  >
                    Complete
                  </button>
                )}
                <button
                  onClick={() => onRemoveStatus(customer.id)}
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default QueueDisplay;

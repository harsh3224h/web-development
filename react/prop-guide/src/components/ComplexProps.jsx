import { useState } from "react";

// User Profile Card component that accepts nested props
function UserProfileCard({ user, theme, actions }) {
  return (
    <div
      className={`p-6 rounded-xl shadow-lg ${theme.backgroundColor} ${theme.textColor}`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`w-16 h-16 rounded-full ${theme.avatarBg} flex items-center justify-center text-2xl`}
        >
          {user.avatar}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-1">{user.name}</h3>
          <p className="text-sm opacity-80 mb-2">{user.email}</p>
          <div className="flex gap-2 text-sm">
            <span className={`px-3 py-1 rounded-full ${theme.badgeBg}`}>
              {user.role}
            </span>
            <span className={`px-3 py-1 rounded-full ${theme.badgeBg}`}>
              {user.status}
            </span>
          </div>
        </div>
      </div>

      {user.stats && (
        <div className="mt-4 pt-4 border-t border-gray-300 grid grid-cols-3 gap-4">
          {Object.entries(user.stats).map(([key, value]) => (
            <div key={key} className="text-center">
              <div className="text-2xl font-bold">{value}</div>
              <div className="text-xs opacity-75 capitalize">{key}</div>
            </div>
          ))}
        </div>
      )}

      {actions && (
        <div className="mt-4 flex gap-2">
          {actions.primary && (
            <button
              onClick={actions.primary.onClick}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${actions.primary.className}`}
            >
              {actions.primary.label}
            </button>
          )}
          {actions.secondary && (
            <button
              onClick={actions.secondary.onClick}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${actions.secondary.className}`}
            >
              {actions.secondary.label}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default function ComplexProps() {
  const [message, setMessage] = useState("");

  const users = [
    {
      user: {
        name: "Alice Johnson",
        email: "alice@example.com",
        avatar: "👩‍💼",
        role: "Admin",
        status: "Active",
        stats: {
          posts: 145,
          followers: 2834,
          following: 421,
        },
      },
      theme: {
        backgroundColor: "bg-gradient-to-br from-purple-100 to-blue-100",
        textColor: "text-gray-800",
        avatarBg: "bg-purple-300",
        badgeBg: "bg-purple-200",
      },
      actions: {
        primary: {
          label: "View Profile",
          onClick: () => setMessage("Viewing Alice's profile"),
          className: "bg-purple-500 text-white hover:bg-purple-600",
        },
        secondary: {
          label: "Message",
          onClick: () => setMessage("Opening message to Alice"),
          className: "bg-gray-200 text-gray-800 hover:bg-gray-300",
        },
      },
    },
    {
      user: {
        name: "Bob Smith",
        email: "bob@example.com",
        avatar: "👨‍💻",
        role: "Developer",
        status: "Online",
        stats: {
          projects: 28,
          commits: 1523,
          reviews: 89,
        },
      },
      theme: {
        backgroundColor: "bg-gradient-to-br from-green-100 to-teal-100",
        textColor: "text-gray-800",
        avatarBg: "bg-green-300",
        badgeBg: "bg-green-200",
      },
      actions: {
        primary: {
          label: "View Profile",
          onClick: () => setMessage("Viewing Bob's profile"),
          className: "bg-green-500 text-white hover:bg-green-600",
        },
        secondary: {
          label: "Collaborate",
          onClick: () => setMessage("Starting collaboration with Bob"),
          className: "bg-gray-200 text-gray-800 hover:bg-gray-300",
        },
      },
    },
  ];

  return (
    <section className="p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">
        Complex/Nested Props
      </h2>
      <p className="text-gray-600 mb-6">
        Complex props allow you to pass nested objects and functions, enabling
        sophisticated component configurations and interactions.
      </p>

      {message && (
        <div className="mb-6 p-4 bg-blue-100 border-l-4 border-blue-500 text-blue-800 rounded">
          {message}
        </div>
      )}

      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            User Profile Cards (Nested User, Theme, and Actions):
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {users.map((userData, index) => (
              <UserProfileCard key={index} {...userData} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

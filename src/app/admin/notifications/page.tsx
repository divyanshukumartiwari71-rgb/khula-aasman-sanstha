"use client";

export default function NotificationsPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Notification Center</h1>
        <p className="text-gray-500 mt-1">
          Create and manage notifications for administrators.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow border p-10 text-center">
        <h2 className="text-xl font-semibold">
          No Notifications Yet
        </h2>

        <p className="text-gray-500 mt-2">
          Click the button below to publish your first notification.
        </p>

        <button
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          + Create Notification
        </button>
      </div>
    </div>
  );
}
"use client";

import { Bell, Plus, Pencil, Trash2 } from "lucide-react";
import type { AppNotification } from "@/lib/db";



interface NotificationsTabProps {
  onCreate: () => void;
  notifications: AppNotification[];
  onEdit: (notification: AppNotification) => void;
  onDelete: (id: string) => void;
}

export default function NotificationsTab({
  onCreate,
  notifications,
  onEdit,
  onDelete,
}: NotificationsTabProps) {

  return (
 
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-red-600">
  Notification Center
</h2>

          <p className="text-sm text-gray-500 mt-1">
            Create and manage announcements for administrators.
          </p>
        </div>

        <button
  type="button"
  onClick={onCreate}
  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg"
>
  <Plus className="w-4 h-4" />
  Create Notification
</button>
      </div>
      

      {notifications.length === 0 ? (
  <div className="bg-white rounded-xl border shadow-sm p-12">
    <div className="flex flex-col items-center justify-center">
      <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
        <Bell className="w-10 h-10 text-blue-600" />
      </div>

      <h3 className="mt-6 text-xl font-semibold">
        No Notifications Yet
      </h3>

      <p className="mt-2 text-gray-500 text-center max-w-md">
        Published notifications will appear here.
      </p>
    </div>
  </div>
) : (
  <div className="space-y-4">
    {notifications.map((notification) => (
      <div
        key={notification.id}
        className="bg-white border rounded-xl p-5 shadow-sm"
      >
        <div className="flex justify-between">
          <h3 className="font-bold text-lg">
            {notification.title}
          </h3>

          <span className="text-sm text-blue-600">
            {notification.priority}
          </span>
        </div>

        <p className="mt-2 text-gray-700">
          {notification.message}
        </p>

        <div className="mt-4 flex items-center justify-between">

  <p className="text-xs text-gray-500">
    {new Date(notification.created_at).toLocaleString()}
  </p>

  <div className="flex gap-2">

    <button
      onClick={() => onEdit(notification)}
      className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
    >
      <Pencil className="w-4 h-4" />
      Edit
    </button>

    <button
      onClick={() => {
        if (confirm("Delete this notification?")) {
          onDelete(notification.id);
        }
      }}
      className="flex items-center gap-1 text-red-600 hover:text-red-800"
    >
      <Trash2 className="w-4 h-4" />
      Delete
    </button>

  </div>

</div>
      </div>
    ))}
  </div>
)}
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";

interface AdminUser {
  id: string;
  full_name: string;
  email: string;
  role: string;
  status: string;
}

export default function AccessControl() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [permissionOverrides, setPermissionOverrides] = useState<
  Record<string, boolean>
>({});

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      const res = await fetch("/api/admin/access-control/users");
      const data = await res.json();

      if (data.success) {
        setUsers(data.users);
      }
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  }

  async function loadUser(id: string) {
    try {
      const res = await fetch(
        `/api/admin/access-control/user/${id}/permissions`
      );

      const data = await res.json();

      if (data.success) {
  setSelectedUser(data);

 const overrides: Record<string, boolean> = {};

data.permissions.forEach((permission: any) => {
  // Default permission from role
  let allowed = data.rolePermissions.some(
    (rp: any) => rp.permission_id === permission.id
  );

  // Check for admin override
  const custom = data.customPermissions.find(
    (cp: any) => cp.permission_id === permission.id
  );

  if (custom) {
    allowed = custom.access_type === "ALLOW";
  }

  overrides[permission.id] = allowed;
});

setPermissionOverrides(overrides);
}
    } catch (err) {
      console.error(err);
    }
  }

  const filteredUsers = users.filter((user) =>
  user.full_name.toLowerCase().includes(search.toLowerCase()) ||
  user.email.toLowerCase().includes(search.toLowerCase())
);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border p-8">
        Loading Users...
      </div>
    );
  }

  async function savePermissions() {
  try {
    const res = await fetch(
      `/api/admin/access-control/user/${selectedUser.admin.id}/permissions`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          permissions: permissionOverrides,
        }),
      }
    );

    const data = await res.json();

    if (data.success) {
  await loadUser(selectedUser.admin.id);
  alert("Permissions updated successfully!");
}else {
      alert("Failed to update permissions.");
    }
  } catch (err) {
    console.error(err);
    alert("Something went wrong.");
  }
}

  return (
    <div className="bg-white rounded-2xl border p-8">
      <h1 className="text-3xl font-bold mb-8">Access Control</h1>

      <div className="grid grid-cols-12 gap-6">
        {/* LEFT PANEL */}

        <div className="col-span-4">

  <input
    type="text"
    placeholder="Search Admin..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full border rounded-lg px-4 py-2 mb-4"
  />

  <div className="space-y-3">
    
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                onClick={() => loadUser(user.id)}
                className="border rounded-xl p-4 hover:bg-slate-50 cursor-pointer transition"
              >
                <div className="font-semibold">{user.full_name}</div>

                <div className="text-sm text-gray-500">{user.role}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL */}

        <div className="col-span-8">
          <div className="border rounded-xl p-8 h-full">
            {selectedUser ? (
              <div>
                <h2 className="text-2xl font-bold">
                  {selectedUser.admin.full_name}
                </h2>

                <div className="mt-6 space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Email</p>

                    <p className="font-medium">
                      {selectedUser.admin.email}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Role</p>

                    <p className="font-medium">
                      {selectedUser.admin.role}
                    </p>
                  </div>
                </div>

                <hr className="my-6" />

                <h3 className="text-lg font-semibold mb-4">
                  Permissions
                </h3>

                                <div className="space-y-2">
                  {selectedUser.permissions.map((permission: any) => {
                    

                    return (
                      <div
                        key={permission.id}
                        className="flex items-center justify-between border rounded-lg px-4 py-3"
                      >
                        <span>{permission.permission_key}</span>

                        <button
                          onClick={() =>
                            setPermissionOverrides((prev) => ({
                              ...prev,
                              [permission.id]:
                                !prev[permission.id],
                            }))
                          }
                          className={`px-3 py-1 rounded-lg text-white text-sm ${
                            permissionOverrides[permission.id]
                              ? "bg-green-600"
                              : "bg-red-600"
                          }`}
                        >
                          {permissionOverrides[permission.id]
                            ? "Allowed"
                            : "Denied"}
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* SAVE BUTTON */}

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={savePermissions}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                  >
                    Save Changes
                  </button>
                </div>

              </div>
            ) : (
              <div>
                <h2 className="text-xl font-bold">
                  Permission Details
                </h2>

                <p className="text-gray-500 mt-3">
                  Select a user from the left panel.
                </p>
              </div>
              
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
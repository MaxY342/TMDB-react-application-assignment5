import { useState } from "react";
import { Button } from "@/components";
import { useUserContext } from "@/hooks";

export const SettingsView = () => {
  const { userName, setUserName } = useUserContext();
  const [value, setValue] = useState(userName);
  const [error, setError] = useState("");

  return (
    <section className="mx-auto max-w-7xl space-y-5 p-5">
      <h1 className="font-bold text-3xl">Settings</h1>
      <div className="max-w-md space-y-4 rounded-2xl border border-gray-700 bg-gray-900 p-6">
        <div>
          <h2 className="font-semibold text-lg">Profile</h2>
          <p className="text-gray-400 text-sm">Update your profile</p>
        </div>
        <div className="space-y-2">
          <label className="text-gray-300 text-sm">Username</label>
          <input
            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(event) => {
              setValue(event.target.value);
              setError("");
            }}
            placeholder="Enter your name"
            type="text"
            value={value}
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
        </div>
        <div className="flex justify-end gap-2">
          <Button onClick={() => setValue(userName)} variant="grey">
            Reset
          </Button>
          <Button
            onClick={() => {
              const trimmed = value.trim();

              if (!trimmed) {
                setError("Username cannot be empty");
                return;
              } else {
                setUserName(trimmed);
                setError("");
              }
            }}
          >
            Save
          </Button>
        </div>
      </div>
    </section>
  );
};

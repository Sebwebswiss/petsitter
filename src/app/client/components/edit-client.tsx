"use client";
import React, { useState, useEffect } from "react";
import { useGetClientByIdQuery, useUpdateClientMutation } from "@/features/clientApi";
import ClientDefaultLayout from "../components/default-layout";
import withAuthClient from "@/middleware/withAuthClient";
import Link from "next/link";
import Loader from "@/components/loader";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


const EditClientPage = ({ clientId }: { clientId: string }) => {
  const { data: client, error, isLoading } = useGetClientByIdQuery(clientId);
  const [updateClient, { isLoading: isUpdating }] = useUpdateClientMutation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (client) {
      setFirstName(client.firstName || "");
      setLastName(client.lastName || "");
      setEmail(client.email || "");
    }
  }, [client]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateClient({ id: clientId, firstName, lastName, email }).unwrap();
      toast.success("Profile Updated");
      // router.push("/client/dashboard");
    } catch (err) {
      console.error("Failed to update client:", err);
    }
  };

  if (isLoading || isUpdating) return <Loader />;
  if (error) return <p>Error loading client details</p>;

  return (
    <div>
      <div className="bg-white h-full px-8 py-6">
        <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="mb-2.5 block font-medium font-heading text-black">
              First Name
            </label>
            <input
              type="text"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none"
              required
            />
          </div>

          <div>
            <label className="mb-2.5 block font-medium font-heading text-black">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none"
              required
            />
          </div>
          <div>
            <label className="mb-2.5 block font-medium font-heading text-black">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              disabled
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-stroke bg-gray-100 py-3 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none cursor-not-allowed "
              required
            />
          </div>

          <div className="flex items-end gap-8">
            <Link href={"/client/dashboard"} className="w-full bg-tertiary text-secondary font-semibold py-3 rounded-lg text-center">
              Cancel
            </Link>
            <button
              type="submit"
              className="w-full bg-primary text-white py-3 font-semibold rounded-lg"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withAuthClient(EditClientPage);

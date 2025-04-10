"use client";
import React, { useState } from "react";
import ClientDefaultLayout from "../components/default-layout";
import { useGetUserQuery, useUpdatePasswordMutation } from "@/features/clientApi";
import toast from "react-hot-toast";

const ResetPasswordPage = () => {
  
  const {data, isLoading: isLoadingUser} = useGetUserQuery("");
  
  const [showSecurityQuestions, setShowSecurityQuestions] = useState(false);
  const [showNewPasswordForm, setShowNewPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [securityAnswers, setSecurityAnswers] = useState({
    maidenName: "",
    favoriteFood: "",
  });

  const [updatePassword, { isLoading, error }] = useUpdatePasswordMutation();

  const handleNewPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      try {
        await updatePassword({
          clientId: data?._id, 
          currentPassword: !showNewPasswordForm ? currentPassword : undefined,
          newPassword,
          securityAnswers: showNewPasswordForm ? securityAnswers : undefined,
        }).unwrap();
        toast.success("Password updated successfully");
      } catch (error: any) {
        toast.error(error?.data?.message);
      }
    } else {
      toast.error("Passwords do not match");
    }
  };


  return (
    <ClientDefaultLayout>
      <div className="bg-white h-full px-8 py-6 grid md:grid-cols-2">
          <form className="w-full h-full" onSubmit={handleNewPasswordSubmit}>
            <div className="mb-4">
              <label className="mb-2.5 block font-medium font-heading text-black">
                Current Password
              </label>
              <input
                type="password"
                placeholder="Enter your current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none"
                required
              />
            </div>
            <div className="mb-4">
              <label className="mb-2.5 block font-medium font-heading text-black">
                New Password
              </label>
              <input
                type="password"
                placeholder="Enter a new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none"
                required
              />
            </div>
            <div className="mb-4">
              <label className="mb-2.5 block font-medium font-heading text-black">
                Confirm New Password
              </label>
              <input
                type="password"
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none"
                required
              />
            </div>
            <div className="mb-4">
              <button
                type="submit"
                className="w-full cursor-pointer rounded-lg border border-primary bg-primary py-3 text-white transition hover:bg-opacity-90"
                disabled={isLoading}
              >
                Reset Password
              </button>
            </div>
          </form>
        
      </div>
    </ClientDefaultLayout>
  );
};

export default ResetPasswordPage;

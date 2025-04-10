"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useGetPetsQuery, useDeletePetMutation } from "@/features/petsApi";
import Loader from "@/components/loader";
import toast from "react-hot-toast";
import Modal from "./modal"; // Ensure you have a Modal component

const PetsTable = ({ dashboard }: { dashboard: boolean }) => {
  const [page, setPage] = useState(1);
  const limit = dashboard ? 5 : 10;
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, error } = useGetPetsQuery({ page, limit });
  const pets = data?.data;
  const pagination = data?.pagination;
  const [deletePet, { isLoading: isDeleting }] = useDeletePetMutation();

  if (isLoading || isDeleting) {
    return <Loader />;
  }

  const handleNextPage = () => {
    if (pagination?.page < pagination?.pages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (pagination?.page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const openModal = (id: string) => {
    setSelectedPetId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPetId(null);
    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    if (selectedPetId) {
      await deletePet({ id: selectedPetId });
      closeModal();
      toast.success("Pet deleted");
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default ">
      <div className="flex items-center justify-between px-4 py-6 md:px-6 xl:px-7.5">
        <h4 className="text-2xl font-semibold text-black">My Pets</h4>
        <Link href={"/client/dashboard/pets/add"}>
          <button
            className="flex justify-center rounded bg-golden px-6 py-2 font-semibold text-gray hover:bg-opacity-90"
            type="button"
          >
            Create new Pet
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto">
      <div>
  {/* Desktop Header */}
  <div className="hidden md:grid grid-cols-12 border-t border-stroke px-4 py-4 md:px-6 2xl:px-7.5">
    <div className="col-span-2 flex items-center">
      <p className="font-medium">Pet</p>
    </div>
    <div className="col-span-3 flex items-center">
      <p className="font-medium">Name</p>
    </div>
    <div className="col-span-2 flex items-center">
      <p className="font-medium">Pet Type</p>
    </div>
    <div className="col-span-3 flex items-center">
      <p className="font-medium">Breed</p>
    </div>
    <div className="col-span-1 flex items-center">
      <p className="font-medium">Gender</p>
    </div>
    <div className="col-span-1 flex items-center justify-center">
      <p className="font-medium">Actions</p>
    </div>
  </div>

  {/* Table Rows */}
  {pets?.map((pet:any, key:number) => (
    <div key={key} className="border-t border-stroke px-4 py-4 md:px-6 2xl:px-7.5">
      {/* Mobile View: Single Cell */}
      <div className="md:hidden">
        <div className="flex items-center mb-2">
          <div className="h-12.5 w-15 rounded-md mr-2">
            <Image src={pet?.imageUrl} width={160} height={50} alt="pet" />
          </div>
        </div>
        <div className="mb-1">
          <p className="text-md text-black">
            <strong>Pet Name:</strong> {pet?.petName}
          </p>
        </div>
        <div className="mb-1">
          <p className="text-md text-black">
            <strong>Pet Type:</strong> {pet.petType}
          </p>
        </div>
        <div className="mb-1">
          <p className="text-md text-black">
            <strong>Breed:</strong> {pet?.petBreed}
          </p>
        </div>
        <div className="mb-1">
          <p className="text-md text-black">
            <strong>Gender:</strong> {pet?.petGender}
          </p>
        </div>
        
        <div className="flex justify-between items-center">
          <p className="font-bold">Actions:</p>
        <div className="flex space-x-3 mt-2">
          <Link href={`/client/dashboard/pets/add?id=${pet._id}&mode=view`}>
            <button className="hover:text-primary">
              {/* View Icon */}
              <svg
                className="fill-current"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                  fill=""
                />
                <path
                  d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                  fill=""
                />
              </svg>
            </button>
          </Link>
          <Link href={`/client/dashboard/pets/add?id=${pet._id}&mode=edit`}>
            <button className="hover:!text-primary">
              {/* Edit Icon */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
                    stroke="#000000"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
                    stroke="#000000"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </g>
              </svg>
            </button>
          </Link>
          <button className="hover:text-primary mb-1" onClick={() => openModal(pet._id)}>
            {/* Delete Icon */}
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                fill=""
              />
              <path
                d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                fill=""
              />
              <path
                d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                fill=""
              />
              <path
                d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                fill=""
              />
            </svg>
          </button>
        </div>
        </div>
      </div>

      {/* Desktop View: Grid Layout */}
      <div className="hidden md:grid grid-cols-12">
        {/* Pet Image */}
        <div className="col-span-2 flex items-center">
          <div className="h-12.5 w-15 rounded-md">
            <Image src={pet?.imageUrl} width={60} height={50} alt="pet" />
          </div>
        </div>
        {/* Name */}
        <div className="col-span-3 flex items-center">
          <p className="text-sm text-black">{pet?.petName}</p>
        </div>
        {/* Pet Type */}
        <div className="col-span-2 flex items-center">
          <p className="text-sm text-black">{pet.petType}</p>
        </div>
        {/* Breed */}
        <div className="col-span-3 flex items-center">
          <p className="text-sm text-black">{pet?.petBreed}</p>
        </div>
        {/* Gender */}
        <div className="col-span-1 flex items-center">
          <p className="text-sm text-black">{pet?.petGender}</p>
        </div>
        {/* Actions */}
        <div className="col-span-1 flex justify-center items-center space-x-3">
          <Link href={`/client/dashboard/pets/add?id=${pet._id}&mode=view`}>
            <button className="hover:text-primary">
              {/* View Icon */}
              <svg
                className="fill-current"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                  fill=""
                />
                <path
                  d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                  fill=""
                />
              </svg>
            </button>
          </Link>
          <Link href={`/client/dashboard/pets/add?id=${pet._id}&mode=edit`}>
            <button className="hover:!text-primary">
              {/* Edit Icon */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
                    stroke="#000000"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
                    stroke="#000000"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </g>
              </svg>
            </button>
          </Link>
          <button className="hover:text-primary mb-1" onClick={() => openModal(pet._id)}>
            {/* Delete Icon */}
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                fill=""
              />
              <path
                d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                fill=""
              />
              <path
                d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                fill=""
              />
              <path
                d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                fill=""
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  ))}

  {(pets?.length === 0 || !pets) && (
    <div className="text-black py-4 text-sm text-center bg-white border">
      No Pets Right Now!
    </div>
  )}
</div>

      </div>

      {!dashboard && (
        <div className="flex justify-end gap-6 p-4 px-6">
          <button
            className={`px-4 py-2 rounded ${
              pagination?.page === 1 ? "bg-gray-300" : "bg-primary text-white"
            }`}
            onClick={handlePreviousPage}
            disabled={pagination?.page === 1}
          >
            Previous
          </button>
          <button
            className={`px-4 py-2 rounded ${
              pagination?.page === pagination?.pages
                ? "bg-gray-300"
                : "bg-primary text-white"
            }`}
            onClick={handleNextPage}
            disabled={pagination?.page === pagination?.pages}
          >
            Next
          </button>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        title="Confirm Delete"
        message="Are you sure you want to delete this pet?"
        onClose={closeModal}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default PetsTable;

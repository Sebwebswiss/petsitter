import React, { useState, useEffect, FormEvent, Suspense } from "react";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import "react-quill/dist/quill.snow.css";
import { useDropzone } from "react-dropzone";
import Link from "next/link";
import toast from "react-hot-toast";
import Loader from "@/components/loader";
import { useCreatePetMutation, useGetPetByIdQuery, useUpdatePetMutation } from "@/features/petsApi";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const PetForm: React.FC = () => {
  // Updated state for pet details
  const [petName, setPetName] = useState<string>("");
  const [petBreed, setPetBreed] = useState<string>("");
  const [petGender, setPetGender] = useState<string>("");
  const [petDOB, setPetDOB] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [additionalDetails, setAdditionalDetails] = useState<string>("");
  const [petType, setPetType] = useState<string>("Dog"); // Default to Dog
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");
  const petId = searchParams.get("id") || "";
  const router = useRouter();

  const isEdit = mode === "edit";
  const isView = mode === "view";

  // Using existing API hooks; assume they now handle pet data
  const [createPet, { isLoading: isCreating }] = useCreatePetMutation();
  const [updatePet, { isLoading: isUpdating }] = useUpdatePetMutation();
  const { data: petData, isLoading: isPetLoading } = useGetPetByIdQuery(
    petId,
    {
      skip: !petId,
    }
  );

  useEffect(() => {
    if (petData) {
      setPetName(petData?.petName || petData?.title || "");
      setPetBreed(petData?.petBreed || "");
      setPetGender(petData?.petGender || "");
      setPetDOB(petData?.petDOB.split("T")[0] || petData?.publishDate || "");
      setAdditionalDetails(petData?.additionalDetails || petData?.description || "");
      setPetType(petData?.petType || "Dog");
      setImageUrl(petData?.imageUrl || "");
    }
  }, [petData]);

  const onDrop = (acceptedFiles: File[]) => {
    setImageFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    multiple: false,
    disabled: isView,
  });

  const handleImageUpload = async () => {
    if (!imageFile) return;

    const data = new FormData();
    data.append("file", imageFile);
    data.append("upload_preset", "bn1nm4qr");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/diijz1dyf/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );

    const fileData = await res.json();
    return fileData.secure_url;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    const uploadedImageUrl = await handleImageUpload();

    const petFormData = {
      petName,
      petType,
      petBreed,
      petGender,
      petDOB,
      additionalDetails,
      imageUrl: uploadedImageUrl || imageUrl,
    };

    try {
      if (isEdit && petId) {
        await updatePet({ id: petId, ...petFormData }).unwrap();
      } else {
        await createPet(petFormData).unwrap();
      }
      toast.success("Pet Saved Successfully");
      setIsLoading(false);
      router.push("/client/dashboard/pets");
    } catch (error) {
      toast.error("Error Saving Pet");
      setIsLoading(false);
      console.error("Failed to save pet", error);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
  };

  if (isPetLoading) return <p>Loading...</p>;

  return (
    <Suspense fallback={<Loader />}>
      <div className="p-6 bg-white rounded-sm shadow-md h-full">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between items-center mb-6">
            <Link
              href={"/client/dashboard/pets"}
              className="bg-tertiary text-black font-medium py-2 px-4 rounded-md transition"
            >
              &larr; Back
            </Link>
            <h1 className="text-2xl font-semibold hidden md:block">
              {isEdit
                ? "Edit Pet"
                : isView
                ? "View Pet"
                : "Create a New Pet"}
            </h1>
            {!isView && (
              <button
                type="submit"
                className="bg-primary text-black font-medium py-2 px-4 rounded-md transition duration-300"
                disabled={isLoading || isCreating || isUpdating}
              >
                {isLoading || isCreating || isUpdating
                  ? "Saving..."
                  : "Save Pet"}
              </button>
            )}
          </div>

          {/* Pet Image Field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Pet Image</label>
            <div
              {...getRootProps()}
              className={`border-dashed border border-gray-300 p-4 py-10 rounded-md text-center cursor-pointer ${
                isView ? "cursor-not-allowed" : ""
              }`}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the image here ...</p>
              ) : imageFile ? (
                <div className="relative">
                  <img
                    src={URL.createObjectURL(imageFile)}
                    alt="Selected image"
                    className="mx-auto h-[250px]"
                  />
                  {!isView && (
                    <button
                      type="button"
                      className="absolute flex-shrink-0 w-7 top-0 right-0 p-1 bg-red-500 text-sm text-white rounded-full"
                      onClick={handleRemoveImage}
                    >
                      x
                    </button>
                  )}
                </div>
              ) : imageUrl ? (
                <div className="relative">
                  <img
                    src={imageUrl}
                    alt="Selected image"
                    className="mx-auto h-[250px]"
                  />
                  {!isView && (
                    <button
                      type="button"
                      className="absolute flex-shrink-0 top-0 right-0 p-1 bg-red-500 text-sm text-white rounded-full"
                      onClick={handleRemoveImage}
                    >
                      x
                    </button>
                  )}
                </div>
              ) : (
                <p>
                  Drag &apos;n&apos; drop an image here, or click to select one
                </p>
              )}
            </div>
          </div>

          {/* Pet Name */}
          <div className="mb-4">
            <label className="block text-gray-700">Pet Name</label>
            <input
              type="text"
              className="w-full mt-2 p-2 border rounded-md"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              readOnly={isView}
              required
            />
          </div>

          {/* Pet Type Radio Buttons */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Pet Type</label>
            <div className="flex items-center gap-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="petType"
                  value="Dog"
                  checked={petType === "Dog"}
                  onChange={(e) => setPetType(e.target.value)}
                  disabled={isView}
                  className="form-radio"
                />
                <span className="ml-2">Dog</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="petType"
                  value="Cat"
                  checked={petType === "Cat"}
                  onChange={(e) => setPetType(e.target.value)}
                  disabled={isView}
                  className="form-radio"
                />
                <span className="ml-2">Cat</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="petType"
                  value="Other"
                  checked={petType === "Other"}
                  onChange={(e) => setPetType(e.target.value)}
                  disabled={isView}
                  className="form-radio"
                />
                <span className="ml-2">Other</span>
              </label>
            </div>
          </div>

          {/* Pet Breed */}
          <div className="mb-4">
            <label className="block text-gray-700">Pet Breed</label>
            <input
              type="text"
              className="w-full mt-2 p-2 border rounded-md"
              value={petBreed}
              onChange={(e) => setPetBreed(e.target.value)}
              readOnly={isView}
              required
            />
          </div>

          {/* Pet Gender */}
          <div className="mb-4">
            <label className="block text-gray-700">Pet Gender</label>
            <input
              type="text"
              className="w-full mt-2 p-2 border rounded-md"
              value={petGender}
              onChange={(e) => setPetGender(e.target.value)}
              readOnly={isView}
              required
            />
          </div>

          {/* Pet Date of Birth */}
          <div className="mb-4">
            <label className="block text-gray-700">Pet Date of Birth</label>
            <input
              type="date"
              className="w-full mt-2 p-2 border rounded-md"
              value={petDOB}
              onChange={(e) => setPetDOB(e.target.value)}
              readOnly={isView}
              required
            />
          </div>

          {/* Additional Details */}
          <div className="mb-4 h-80">
            <label className="block text-gray-700 mb-2">
              Any Other Details
            </label>
            <ReactQuill
              value={additionalDetails}
              onChange={setAdditionalDetails}
              readOnly={isView}
              className="h-64"
            />
          </div>
        </form>
        {(isLoading || isCreating || isUpdating) && <p>Loading...</p>}
      </div>
    </Suspense>
  );
};

export default PetForm;

"use client";

import { VideoUpload } from "~/components/VideoUpload";

const HomePage = () => {
  const handleUpload = (file: File) => {
    // Handle the uploaded file here
    console.log("Uploaded file:", file);
  };

  return (
    <div className="flex h-screen flex-col p-4">
      <h1 className="mb-4 text-2xl font-bold">Video Upload</h1>
      <div className="flex-1">
        <VideoUpload onUpload={handleUpload} />
      </div>
    </div>
  );
};

export default HomePage;

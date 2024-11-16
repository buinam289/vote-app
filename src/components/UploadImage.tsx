"use client";

import { useState, } from "react";
import Image from "next/image";

export default function UpdateProfile({ title, filePath, uploadImage }: { title: string, filePath: string | null, uploadImage: (formData: FormData) => Promise<string | null> }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [imagePath, setImagePath] = useState<string | null>(filePath);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files ? event.target.files[0] : null;
        setFile(selectedFile);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!file) {
            return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const uploadedFilePath = await uploadImage(formData);

            setImagePath(uploadedFilePath);
        } catch (error) {
            console.error(error);
            setError("Error uploading the file.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error || "Unauthorized"}</div>;

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                        {title}
                    </label>
                    <input onChange={handleFileChange}
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    {imagePath && <Image src={imagePath} alt="Profile" width={100} height={100} className="mt-2" />}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
                >
                    {loading ? "Uploading..." : "Upload"}
                </button>
            </form>
        </>
    );
}

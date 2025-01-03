"use client";

import { useState, useEffect } from "react";
import { uploadProfileImage } from "@/app/actions/profileUploadImage";
import UploadImage from "./UploadImage";
import { clientValidate } from "@/lib/validation";
import { profileSchema } from "@/app/api/profile/UpdateProfileDto";
import { User } from "@prisma/client";

export default function UpdateProfile() {
    const [profile, setProfile] = useState<User | null>(null);
    const [profileImagePath, setProfileImagePath] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [formSaving, setFormLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showCheckmark, setShowCheckmark] = useState(false);
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        async function fetchProfile() {
            try {
                const data = await fetch('/api/profile').then(res => res.json());
                if (!data) {
                    setError("Unauthorized");
                    return;
                }
                setProfileImagePath(data.image);
                setProfile(data);
            } catch (err) {
                console.error(err);
                setError("Failed to load profile.");
            } finally {
                setLoading(false);
            }
        }

        fetchProfile();
    }, []);

    async function handleUpdateProfile(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        if (!clientValidate(formData, profileSchema, setValidationErrors)) {
            return;
        }

        try {
            setFormLoading(true);
            const res = await fetch('/api/profile', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(Object.fromEntries(formData.entries())),
              });
            if (!res.ok) {
                //setValidationErrors(res.json());
            } else {
                setValidationErrors({});
                setShowCheckmark(true);
                setTimeout(() => setShowCheckmark(false), 1000);
            }
            setFormLoading(false);
        } catch (err) {
            console.error(err);
        }
    }

    if (loading) return <div>Loading...</div>;
    if (error || !profile) return <div>{error || "Unauthorized"}</div>;

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center" style={{ minHeight: "90vh" }}>
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
                <UploadImage title="Upload your profile image" filePath={profileImagePath} uploadImage={uploadProfileImage} />
                <br />
                <form onSubmit={handleUpdateProfile}>
                    <div className="mb-6">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name (*):
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            defaultValue={profile.name}
                            className="mt-1 px-2 py-2 block w-full border border-gray-300 rounded-sm shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                        {validationErrors.name && <p className="text-red-500 text-sm">{validationErrors.name}</p>}
                    </div>
                    <div className="mb-6">
                        <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                            Gender:
                        </label>
                        <select id="gender" name="gender" defaultValue={profile.gender} className="mt-1 px-2 py-2 block w-full border border-gray-300 rounded-sm shadow-sm focus:ring-blue-500 focus:border-blue-500">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        {validationErrors.gender && <p className="text-red-500 text-sm">{validationErrors.gender}</p>}
                    </div>
                    <div className="mb-6">
                        <label htmlFor="yearOfBirth" className="block text-sm font-medium text-gray-700">
                            Year Of Birth:
                        </label>
                        <select id="yearOfBirth" name="yearOfBirth" defaultValue={profile.yearOfBirth} className="mt-1 px-2 py-2 block w-full border border-gray-300 rounded-sm shadow-sm focus:ring-blue-500 focus:border-blue-500">
                            <option value="">Select year</option>
                            {Array.from({ length: 51 }, (_, i) => 2020 - i).map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                        {validationErrors.yearOfBirth && <p className="text-red-500 text-sm">{validationErrors.yearOfBirth}</p>}
                    </div>
                    <div className="mb-6">
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                            City:
                        </label>
                        <select id="city" name="city" defaultValue={profile.city} className="mt-1 px-2 py-2 block w-full border border-gray-300 rounded-sm shadow-sm focus:ring-blue-500 focus:border-blue-500">
                            <option value="Ho Chi Minh">Ho Chi Minh</option>
                            <option value="Ha Noi">Ha Noi</option>
                            {/* Add other cities */}
                        </select>
                        {validationErrors.city && <p className="text-red-500 text-sm">{validationErrors.city}</p>}
                    </div>
                    <button
                        type="submit"
                        className={`w-full py-2 px-4 font-bold rounded-lg transition duration-300 ${formSaving ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                    >
                        {formSaving ? 'Saving...' :
                            showCheckmark ? (
                                <div>Saved <span className="text-green-500 ml-2">
                                    &#10003;
                                </span></div>
                            ) : 'Save'}
                    </button>
                </form>
            </div>
        </div>
    );
}

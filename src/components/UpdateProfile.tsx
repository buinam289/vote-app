"use client";

import { useState, useEffect } from "react";
import { updateProfile } from "@/app/actions/updateProfile";
import { getProfile, Profile } from "@/app/actions/getProfile";

export default function UpdateProfile() {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);
    const [formLoading, setFormLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showCheckmark, setShowCheckmark] = useState(false);

    useEffect(() => {
        async function fetchProfile() {
            try {
                const data = await getProfile();
                if (!data) {
                    setError("Unauthorized");
                    return;
                }
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
        try {
            setFormLoading(true);
            await updateProfile(formData);
            setFormLoading(false);
            setShowCheckmark(true);
            setTimeout(() => setShowCheckmark(false), 1000);
        } catch (err) {
            console.error(err);
        }
    }

    if (loading) return <div>Loading...</div>;
    if (error || !profile) return <div>{error || "Unauthorized"}</div>;

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
                <form onSubmit={handleUpdateProfile}>
                    <div className="mb-6">
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                            Profile Image:
                        </label>
                        <input type="file" id="image" name="image" accept="image/*" className="mt-1 block w-full" />
                        {profile.image && <img src={profile.image} alt="Profile" width="100" className="mt-2" />}
                    </div>
                    <div className="mb-6">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name:
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            defaultValue={profile.name}
                            className="mt-1 block w-full"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                            Gender:
                        </label>
                        <select id="gender" name="gender" defaultValue={profile.gender} className="mt-1 block w-full">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                            City:
                        </label>
                        <select id="city" name="city" defaultValue={profile.city} className="mt-1 block w-full">
                            <option value="Ho Chi Minh">Ho Chi Minh</option>
                            <option value="Ha Noi">Ha Noi</option>
                            {/* Add other cities */}
                        </select>
                    </div>
                    <button
                        type="submit"
                        className={`w-full py-2 px-4 font-bold rounded-lg transition duration-300 ${formLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                    >
                        {formLoading ? 'Saving...' :
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

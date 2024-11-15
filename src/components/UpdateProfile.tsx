import { getProfile, updateProfile } from "@/app/actions/profile";
import { redirect } from "next/navigation";


export default async function UpdateProfile() {
    const profile = await getProfile();

    if (!profile) {
        return <div>Unauthorized</div>;
    }

    async function handleUpdateProfile(formData: FormData) {
        "use server";
        await updateProfile(formData);
    
        redirect("/profile")
    }
    
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
                <form action={handleUpdateProfile}>
                {/* <form action={async (formData) => {
                    "use server";
                    await handleUpdateProfile(formData);
                }} method="POST"> */}
                    <div className="mb-6">
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Profile Image:</label>
                        <input type="file" id="image" name="image" accept="image/*" className="mt-1 block w-full" />
                        {profile.image && <img src={profile.image} alt="Profile" width="100" className="mt-2" />}
                    </div>
                    <div className="mb-6">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
                        <input type="text" id="name" name="name" defaultValue={profile.name} className="mt-1 block w-full" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender:</label>
                        <select id="gender" name="gender" defaultValue={profile.gender} className="mt-1 block w-full">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">City:</label>
                        <select id="city" name="city" defaultValue={profile.city} className="mt-1 block w-full">
                            {/* Add city options here */}
                            <option value="Ho Chi Minh">Ho Chi Minh</option>
                            <option value="Ha Noi">Ha Noi</option>
                            {/* Add other cities */}
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
};

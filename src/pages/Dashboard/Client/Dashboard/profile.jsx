import { useState } from "react";
import Avatar from "../../../../assets/feature-1.jpg";
import axios from "axios";

const Profile = () => {
  const initialProfile = {
    username: "User23",
    bio: "Bio: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi nostrum eveniet molestiae sed nesciunt fugiat sit fugit, reiciendis error accusantium odit dolores, in omnis quaerat necessitatibus at, veritatis qui praesentium.",
    rating: 4.5,
    openProjects: 0,
    activeProjects: 0,
    pastProjects: 0,
    totalProjects: 0,
    location: "Nairobi, Kenya",
    joinedDate: "August 2023",
    recommendations: 0,
    avatar: Avatar,
  };

  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(initialProfile);
  const [newAvatar, setNewAvatar] = useState(null);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setNewAvatar(file);
  };

  const handleSaveClick = () => {
    setIsEditing(false);

    if (newAvatar) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfile({
          ...profile,
          avatar: event.target.result,
        });
      };
      reader.readAsDataURL(newAvatar);
    }

  };

  return (
    <div className="bg-snow-300 text-gray-800 p-4 flex flex-col md:flex-row">
      {/* Avatar Section */}
      <div className="w-full">
        <div className="w-52 mx-auto">
          <img
            className="h-40 w-full object-cover rounded-full"
            src={profile.avatar}
            alt="Avatar"
          />
          {isEditing && (
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="mt-2"
            />
          )}
        </div>
        <div className="text-center md:text-center mt-4">
          <h2>{profile.location}</h2>
          <h2>Joined {profile.joinedDate}</h2>
          <h2>{profile.recommendations} Recommendations</h2>
        </div>
      </div>

      {/* Details Section */}
      <div className="w-full border-gray-300 p-4">
        {isEditing ? (
          /* Edit Mode */
          <div>
            <input
              type="text"
              name="username"
              placeholder="Enter new username"
              className="w-full border border-gray-300 rounded-full px-4 py-2 mb-4"
              value={profile.username}
              onChange={handleInputChange}
            />
            <textarea
              name="bio"
              placeholder="Enter new bio"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
              value={profile.bio}
              onChange={handleInputChange}
            ></textarea>
            <input
              type="text"
              name="location"
              placeholder="Enter new location"
              className="w-full border border-gray-300 rounded-full px-4 py-2 mb-4"
              value={profile.location}
              onChange={handleInputChange}
            />
            <button
              className="bg-purple-800 text-white rounded-full px-4 py-2 hover:bg-purple-600"
              onClick={handleSaveClick}
            >
              Save
            </button>
          </div>
        ) : (
          /* Display Mode */
          <div>
            <h2 className="text-4xl font-semibold">{profile.username}</h2>
            <h2 className="text-xl font-semibold mt-4">{profile.bio}</h2>
            <h2 className="text-lg font-normal mt-4">
              Rating: {profile.rating}
            </h2>
          </div>
        )}
        <div className="grid grid-cols-2 mt-8">
          <div>
            <h2 className="font-semibold">Open Projects</h2>
            <p>{profile.openProjects}</p>
          </div>
          <div>
            <h2 className="font-semibold">Active Projects</h2>
            <p>{profile.activeProjects}</p>
          </div>
          <div>
            <h2 className="font-semibold">Past Projects</h2>
            <p>{profile.pastProjects}</p>
          </div>
          <div>
            <h2 className="font-semibold">Total Projects</h2>
            <p>{profile.totalProjects}</p>
          </div>
        </div>
      </div>
      <p>
        <button
          className="font-semibold cursor-pointer"
          onClick={handleEditClick}
        >
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </p>
    </div>
  );
};

export default Profile;

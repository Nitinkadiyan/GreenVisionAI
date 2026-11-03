
export default function Avatar({ small = false, user }) {
  const avatarSize = small ? "h-9 w-9" : "h-11 w-11";

  const profileImage =
    user?.profilePicture?.url || "/default-avatar.png";

  const userName = user?.name || "User";

  return (
    <div
      className={`${avatarSize} overflow-hidden rounded-full bg-emerald-100 ring-2 ring-white`}
    >
      <img
        className="h-full w-full object-cover"
        src={profileImage}
        alt={`${userName}'s profile`}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = "/default-avatar.png";
        }}
      />
    </div>
  );
}

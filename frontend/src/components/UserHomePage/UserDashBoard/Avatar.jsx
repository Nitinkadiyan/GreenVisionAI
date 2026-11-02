export default function Avatar({ small = false, user }) {
  console.log("user : ", user?.name);
  return (
    <div
      className={`${small ? "h-9 w-9" : "h-11 w-11"} overflow-hidden rounded-full bg-emerald-100 ring-2 ring-white`}
    >
      <img
        className="h-full w-full object-cover"
        src="https://i.pravatar.cc/120?img=12"
        alt="nitin"
      />
    </div>
  );
}
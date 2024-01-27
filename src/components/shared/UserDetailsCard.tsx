import { IUser } from "@/types";

interface Props {
  user: IUser;
  setShowDetails: () => void;
}

const UserDetailsCard = ({ user, setShowDetails }: Props) => {
  console.log(user);

  const liked = user.liked as any[];

  return (
    <div className="absolute bg-dark-1 left-0 top-0 w-full h-full">
      <p>{user.name}</p>
      {liked.map((like: object, index: number) => (
        <p key={index}>{like.caption}</p>
      ))}

      <button onClick={() => setShowDetails()}>X</button>
    </div>
  );
};

export default UserDetailsCard;

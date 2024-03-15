import "../css/profile_circle.css";

interface ProfileCircleItems {
  letter: string;
  loginStatus: boolean;
}

const ProfileCircle: React.FC<ProfileCircleItems> = ({
  letter,
  loginStatus,
}) => {
  return (
    <div className="container">
      <div className="circle">
        <span className="letter">{letter}</span>
      </div>
    </div>
  );
};

export default ProfileCircle;

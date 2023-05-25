import { useEffect, useState, useContext } from "react";
import dayjs from "dayjs";
import { useParams, Link } from "react-router-dom";
import { IdentityService } from "../services/IdentityService";
import { IUser } from "../domain/IUser";
import { IResult } from "../domain/IResult";
import ProfileModal from "../components/ProfileModal";
import Reviews from "../components/Reviews";
import ProfileWorkouts from "../components/ProfileWorkouts";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  let { id } = useParams<{ id?: string }>();
  const identityService = new IdentityService();
  const [profile, setProfile] = useState({} as IUser);
  const [workouts, setWorkouts] = useState([] as IResult[]);
  const [showModal, setShowModal] = useState(false);
  const { user } = useContext(AuthContext);

  const data = [
    { title: "Comments", value: profile.commentsNumber },
    {
      title: "Workouts participated",
      value: profile.workoutParticipatedNumber,
    },
    { title: "Posted Workouts", value: profile.postedWorkouts },
  ];

  useEffect(() => {
    identityService.getProfileById(id as string).then((response) => {
      if (response) {
        setProfile(response);

        var workouts = response.workouts.sort(
          (date1: any, date2: any) =>
            new Date(date2.startDate).valueOf() -
            new Date(date1.startDate).valueOf()
        );
        setWorkouts(workouts);
      }
    });
  }, [id]);

  return (
    <div className="p-8  max-w-screen-2xl mx-auto ">
      <div className="flex">
        <div className="bg-secondary  rounded-2xl">
          <img
            src={profile.image}
            className="h-32 w-32 rounded-2xl "
            alt="Profile image"
          />
        </div>
        <div className="flex flex-col pl-8">
          <h1 className="text-3xl font-medium">
            {profile.firstName} {profile.lastName}
          </h1>
          <h3 className="text-slate-500 text-sm pt-2">
            Joined {dayjs(profile.registeredAt).format("D MMM YYYY")}
          </h3>
          <div className="pt-2 text-sm text-slate-500">{profile.bio}</div>
          {user.id != id && (
          <div className="pt-2">
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center py-2 px-3 text-xs font-medium text-center text-white bg-orange rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800"
            >
              add review
            </button>
          </div>
          )}

          {showModal && (
            <ProfileModal setShowModal={setShowModal} appUserId={profile.id} createdByUserId={user.id} />
          )}
        </div>
      </div>

      <div className="border-b-[1.6px] my-8 border-b-[#a8b3cf65]"></div>

      <div className="text-2xl font-medium pb-2">Stats</div>
      <div className="gap-5 grid grid-cols-2 sm:grid-cols-3 w-full">
        {data.map((element, index) => (
          <div className="h-20 p-4 rounded-xl flex flex-col" key={index}>
            <div className="font-bold text-xl ">
              {element.value == null ? 0 : element.value.toString()}
            </div>
            <div className="text-primary typo font-normal">{element.title}</div>
          </div>
        ))}
      </div>

      {workouts && <ProfileWorkouts workouts={workouts} />}

      {profile.reviews && <Reviews reviews={profile.reviews} />}
    </div>
  );
};
export default Profile;

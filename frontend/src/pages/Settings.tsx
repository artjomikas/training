import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { IProfile } from "../domain/IProfile";
import { AiOutlineCheck } from "react-icons/ai";
import axios from "axios";
import { IdentityService } from "../services/IdentityService";

const Settings = () => {
  const [image, setImage] = useState({
    image: "",
    reader: "",
  });

  const [values, setValues] = useState<IProfile>({
    id: "",
    firstName: "",
    lastName: "",
    registeredAt: "",
    bio: "",
    image: "",
  });

  const data = [
    {
      title: "First Name",
      name: "firstName",
      value: values.firstName,
      required: true,
    },
    {
      title: "Last Name",
      name: "lastName",
      value: values.lastName,
      required: true,
    },
    { title: "Bio", name: "bio", value: values.bio },
  ];

  const { user } = useContext(AuthContext);
  const [added, setAdded] = useState(false);

  const handleChange = (e: any) => {
    setValues((oldValues) => ({
      ...oldValues,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageSubmit = async (target: any) => {
    const image = target.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      setImage({
        reader: reader.result as string,
        image: image,
      });
    };
  };

  const uploadImage = async (image: string) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "a0oail7i");

    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/taltech/image/upload",
      formData
    );

    const res = await response.data.url;
    const json = JSON.stringify({ ...values, image: res });
    return JSON.parse(json);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      let result = JSON.parse(JSON.stringify({ ...values }));

      if (values.image != image.image) {
        result = await uploadImage(image.image);
      }


      // UPDATE USER
      const user = new IdentityService();
      await user.updateUser(result);

      setAdded(true);

      setInterval(() => setAdded(false), 4000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setValues({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      registeredAt: user.registeredAt,
      bio: user.bio,
      image: user.image,
    });

    setImage({
      image: user.image,
      reader: user.image,
    });
  }, [user]);

  return (
    <div className="px-8 pt-2 container max-w-screen-md mx-auto text-[#323743] font-poppins">
      <h1 className="py-4 font-semibold text-2xl">Profile settings</h1>

      <div className="flex">
        <div className="p-1 bg-orange rounded-2xl">
          <img
            src={image.reader}
            className="h-20 w-20 rounded-2xl bg-dark color-dark"
          />
        </div>

        <div className="flex flex-col pl-8 pt-2">
          <h1 className="text-2xl font-medium">
            {values.firstName} {values.lastName}
          </h1>

          <h3 className="text-slate-500 text-sm pt-3">
            Joined {dayjs(values.registeredAt).format("D MMM YYYY")}
          </h3>
        </div>
      </div>

      <label className="block pt-6">
        <input
          type="file"
          onChange={(e) => handleImageSubmit(e)}
          name="image"
          className="block w-full file:text-hidden text-sm file:cursor-pointer text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
        />
      </label>

      <form onSubmit={handleSubmit} className="pt-6">
        {data.map(({ title, name, value, required }, i) => (
          <div className="my-5" key={i}>
            <label htmlFor={name} className="block mb-1 typo">
              {title}
            </label>
            <input
              required={required}
              value={value || ""}
              onChange={handleChange}
              type="text"
              name={name}
              id={name}
              className="input"
            />
          </div>
        ))}

        <div className="flex gap-4 pt-4">
          <button
            className="w-[180px] py-3 bg-[#33b864] hover:bg-[#30d46d] border-none active:outline-primary active:outline-1 active:outline rounded"
            type="submit"
          >
            <p className="mx-auto text-white">Save changes</p>
          </button>

          {added && (
            <div className="flex items-center gap-1 text-[#33b864] ease-in-out duration-700 transition-all">
              <AiOutlineCheck />
              <p>Saved</p>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};
export default Settings;

import styles from "./SignUp.module.css";
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios"; // Import jwt-decode to decode the JWT token
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import ProfileModal from "./ProfileModal";
import FileModal from "./FileModal";
import toast from "react-hot-toast";
import CategoryModal from "./SelectCategories";
import SkillModal from "./SelectSkills";
export default function SignUp() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const server = process.env.REACT_APP_SERVER_URL;
  const [searchParams, setSearchParams] = useSearchParams();
  const { UserLogin, UserLogout, userState } = useAuthContext();
  const [step, setStep] = useState(1);
  const [fileModal, setFileModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [resumeUrl, setResumeUrl] = useState(null);
  const [profile, setProfile] = useState(null);
  const [profileModal, setProfileModal] = useState(null);
  const { user_id, token } = userState;
  const [categoryModal, setCategoryModal] = useState(false);
  const [skillModal, setSkillModal] = useState(false);
  const [userSkills, setUserSkills] = useState([]);
  const [userCategories, setUserCategories] = useState([]);
  const navigate = useNavigate();

  function toggleFileModal() {
    setFileModal(!fileModal);
    setSelectedFile(null);
  }
  function toggleProfileModal() {
    setProfileModal(!profileModal);
  }
  function toggleCategoryModal() {
    setCategoryModal(!categoryModal);
  }
  function toggleSkillModal() {
    setSkillModal(!skillModal);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle the form submission logic here
    console.log({
      email,
      first_name: firstName,
      last_name: lastName,
      password,
    });
    alert(server);
    const role = searchParams.get("role");
    try {
      const res = await axios.post(
        `${server}/user/createAccount`,
        { email, first_name: firstName, last_name: lastName, password, role },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("The result is");
      console.log(res);
      const token = res.data;
      localStorage.setItem("authToken", token);
      const decoded_data = jwtDecode(token);
      const currentUser = {
        user_name: decoded_data.user_name,
        user_id: decoded_data.user_id,
        role: decoded_data.role,
        token: token,
      };
      UserLogin(currentUser);
      console.log(userState);
      setEmail("");
      setFirstName("");
      setLastName("");
      setPassword("");
      setStep((step) => step + 1);
    } catch (e) {
      alert(e);
    }
  };

  const handleGoogleLogin = (credentialResponse) => {
    // Decode the JWT token to extract user information
    // Handle the user information after successful login
    alert("bro");
  };

  const handleGoogleError = (error) => {
    console.error("Login Failed:", error);
  };

  const handleProfileClick = async (e) => {
    try {
      const res = await axios.post(
        `${server}/freelancer/updateProfile`,
        {
          resume_url: !resumeUrl ? "" : resumeUrl,
          profile: !profile ? "" : profile,
          user_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("You details have been saved", {
        duration: 3000,
      });
      setStep((step) => step + 1);
    } catch (e) {
      alert(e);
    }
  };

  return (
    <>
      {step === 1 && (
        <div className={styles.SignUp}>
          <h4>Join Hire.</h4>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit" className={styles.button}>
              Join Hire.
            </button>
          </form>
          <div className={styles.or}>or</div>{" "}
          {/* Optional: To separate the buttons visually */}
          {/* Google Login Button */}
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={handleGoogleError}
            clientId={process.env.REACT_APP_CLIENT_ID}
            scope="profile email" // Add the desired scopes here
          />
        </div>
      )}
      {step === 2 && userState.role === "freelancer" && (
        <div className={styles.about}>
          <div className={styles.intro}>
            How would you like to tell us about yourself?
          </div>
          <div className={styles.desc}>
            We need to get a sense of your education, experience and skills.
            It’s quickest to import your information — you can edit it before
            your profile goes live.
          </div>
          <div className={styles.resume}>
            <div
              className={styles.chooseGreen}
              onClick={(e) => {
                setFileModal((profileModal) => !profileModal);
              }}
            >
              Upload Your Resume
            </div>
            <div
              className={styles.chooseGreen}
              onClick={(e) => {
                setProfileModal((profileModal) => !profileModal);
              }}
            >
              Fill Out Manually (15 min)
            </div>
          </div>

          <button>Back</button>
        </div>
      )}
      {step === 3 && userState.role === "freelancer" && (
        <div className={styles.about}>
          <div className={styles.intro}>
            How would you like to profile yourself?
          </div>

          <div className={styles.resume}>
            <div
              className={styles.chooseGreen}
              onClick={(e) => {
                setCategoryModal((categoryModal) => true);
              }}
            >
              Profile Your Manually(10 mins)
            </div>
            <div
              className={styles.chooseGreen}
              onClick={(e) => {
                setCategoryModal((categoryModal) => !categoryModal);
              }}
            >
              Use AI
            </div>
          </div>

          <button
            onClick={(e) => {
              navigate("/");
            }}
          >
            Skip
          </button>
        </div>
      )}
      <FileModal
        fileModal={fileModal}
        setFileModal={setFileModal}
        toggleFileModal={toggleFileModal}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        resumeUrl={resumeUrl}
        setResumeUrl={setResumeUrl}
      />
      <ProfileModal
        profileModal={profileModal}
        setProfileModal={setProfileModal}
        toggleProfileModal={toggleProfileModal}
        profile={profile}
        setProfile={setProfile}
      />
      <CategoryModal
        categoryModal={categoryModal}
        setCategoryModal={setCategoryModal}
        toggleCategoryModal={toggleCategoryModal}
        userSkills={userSkills}
        skillModal={skillModal}
        setSkillModal={setSkillModal}
        setUserSkills={setUserSkills}
        userCategories={userCategories}
        setUserCategories={setUserCategories}
      />
      {skillModal && (
        <SkillModal
          skillModal={skillModal}
          setSkillModal={setSkillModal}
          toggleSkillModal={toggleSkillModal}
          userCategories={userCategories}
          userSkills={userSkills}
          setUserSkills={setUserSkills}
        />
      )}

      {(resumeUrl || profile) && step === 2 && (
        <button
          className={styles.continue}
          onClick={(e) => {
            handleProfileClick(e);
          }}
        >
          Continue
        </button>
      )}
    </>
  );
}

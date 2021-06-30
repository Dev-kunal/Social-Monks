import { MobileNav } from "../index";
import "./user.css";
export const User = () => {
  return (
    <>
      <div className="user-page">
        <div className="user-header">
          <img class="avatar-circle" src="./userAvatar.svg" alt="Avatar" />
          <div className="user-info">
            <h2 className="username">kunal_tijare</h2>
            <button className="plain-action-btn">Log -out</button>
          </div>
        </div>
        <div className="bio">
          <span>
            <strong>Kunal Tijare</strong>
            <br />
            Full Stack Web Developer | Student <br />
            MERN Stack <br />
            Growing with @neogcamp 🚀
          </span>
        </div>
        <div className="follow">
          <div className="follow-count">
            <span>
              0 <br />
              posts
            </span>
          </div>
          <div className="follow-count">
            <span>
              69 <br />
              followers
            </span>
          </div>
          <div className="follow-count">
            <span>
              60 <br />
              follow
            </span>
          </div>
        </div>
      </div>
      <MobileNav />
    </>
  );
};

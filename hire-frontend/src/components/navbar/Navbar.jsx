import React from "react";
import styles from "./Navbar.module.css";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { getCategories } from "../../apis/Categories";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { data: categories, isLoading } = useQuery({
    queryFn: () => getCategories(),
    queryKey: ["categories"],
  });
  const [active, setActive] = useState(false);
  const [openOp, setOpenOp] = useState(false);
  const [openJoin, setOpenJoin] = useState(false);
  const dropdownRef = useRef(null);
  const joinRef = useRef(null);
  const navigate = useNavigate();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };
  const { UserLogout, userState } = useAuthContext();
  console.log(userState);
  function handleLogout() {
    UserLogout();
    navigate("/");
  }
  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);
  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setOpenOp(false);
    });

    return document.removeEventListener("click", (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setOpenOp(false);
    });
  }, []);
  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (joinRef.current && !joinRef.current.contains(e.target))
        setOpenJoin(false);
    });
    return document.addEventListener("click", (e) => {
      if (joinRef.current && !joinRef.current.contains(e.target))
        setOpenJoin(false);
    });
  }, []);
  const { pathname } = useLocation();

  return (
    <div
      className={`${styles.navbar} ${
        active || pathname !== "/" ? styles.activeNavbar : ""
      }`}
    >
      <div className={styles.container}>
        <Link to="/">
          <div className={styles.logo}>
            <span className={styles.text}>Hire</span>
            <span className={styles.dot}>.</span>
          </div>
        </Link>
        <div className={styles.links}>
          <span>Hire Business</span>
          <span>Explore</span>
          <span>English</span>
          {!userState.name && (
            <span
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                navigate("/login");
              }}
            >
              Sign In
            </span>
          )}

          {!userState.name && (
            <div ref={joinRef}>
              <button
                className={styles.button}
                onClick={(e) => {
                  setOpenJoin(true);
                }}
              >
                Join
              </button>
              {openJoin && (
                <div className={styles.join}>
                  <Link to="/signUp?role=freelancer">
                    <span
                      styles={{ width: "100%" }}
                      onClick={(e) => {
                        setOpenJoin(false);
                      }}
                    >
                      Join As A Client
                    </span>
                  </Link>
                  <Link to="/signUp?role=client">
                    <span
                      styles={{ width: "100%" }}
                      onClick={(e) => {
                        setOpenJoin(false);
                      }}
                    >
                      Become A Buyer
                    </span>
                  </Link>
                </div>
              )}
            </div>
          )}

          {userState.name && (
            <div className={styles.user}>
              <img src="/assets/Logo.webp" alt="" className={styles.Img} />
              <span
                ref={dropdownRef}
                onClick={(e) => {
                  setOpenOp((openOp) => !openOp);
                }}
              >
                {userState?.name}
              </span>

              {openOp && (
                <div className={styles.options}>
                  {userState.role === "freelancer" && (
                    <>
                      <Link to="/gigs">
                        <span> Your Gigs</span>
                      </Link>
                      <Link to="/add">
                        <span>Add A Gig</span>
                      </Link>

                      <Link>
                        <span>Popular Skils</span>
                      </Link>
                    </>
                  )}
                  <Link to="/orders">
                    <span>Orders</span>
                  </Link>
                  <Link to="/messages">
                    <span>Messages</span>
                  </Link>
                  <span
                    onClick={(e) => {
                      handleLogout();
                    }}
                  >
                    Logout
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <hr />
      {(active || pathname !== "/") && (
        <div className={styles.menu}>
          {categories?.map((category, index) => (
            <Link className="link menuLink" key={index} to="/">
              {category.category_name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Navbar;

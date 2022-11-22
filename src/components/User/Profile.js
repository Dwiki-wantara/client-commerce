import React, { useContext, useState, useEffect } from "react";
import { useQuery } from "react-query";
import { UserContext } from "../../context/userContext";
import imgBlank from "../../assets/blank-profile.png";
import name from "../../assets/name.png";
import email from "../../assets/email.png";
import gender from "../../assets/gender.png";
import phone from "../../assets/phone.png";
import address from "../../assets/address.png";
import { API } from "../../config/api";

export default function UserProfile() {
  document.title = "Profile";

  const [state] = useContext(UserContext);

  let { data: profile } = useQuery("profileCache", async () => {
    const response = await API.get("/profile");
    return response.data.data;
  });

  return (
    
      <div className="profile-container" style={{backgroundColor:"black"}}>
      <div className="profile-card">
        <div className="profile-desc">
          <div className="profile-data">
            <h2>Data Pribadi</h2>
          </div>
          <div className="profile-data">
            <div className="profile-icon">
              <img src={name} alt="" />
            </div>
            <div className="profile-details">
              <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                Nama Lengkap
              </span>
              <span>{state.user.name}</span>
            </div>
          </div>
          <div className="profile-data">
            <div className="profile-icon">
              <img src={email} alt="" />
            </div>
            <div className="profile-details">
              <span style={{ fontSize: "18px", fontWeight: "bold" }}>
              Email
              </span>
              <span>{state.user.email}</span>
            </div>
          </div>
     
          <div className="profile-data">
            <div className="profile-icon">
              <img src={gender} alt="" />
            </div>
            <div className="profile-details">
              <span style={{ fontSize: "18px", fontWeight: "bold" }}>Gender</span>
              <span>{state.user.gender}</span>
            </div>
          </div>
          <div className="profile-data">
            <div className="profile-icon">
              <img src={phone} alt="" />
            </div>
            <div className="profile-details">
              <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                Nomor Handphone
              </span>
              <span>{state.user.phone}</span>
            </div>
          </div>
          
        </div>
        <div className="profile-img">
          <img src={profile?.image ? profile.image : imgBlank} alt="avatar" className="profile-avatar" style={{minWidth:"415px"}}/>
        </div>
      </div>
    </div>
 
  );
}

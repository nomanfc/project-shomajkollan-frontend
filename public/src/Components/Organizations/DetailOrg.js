import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import IconButton from "@mui/material/IconButton";
import { Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { orgsByRegNo } from "../../Auth/httprequests";
import * as s from "./Org.styled";

import BasicSortingTable from "./Table/BasicSortingTable";
import FounderTable from "./DetailsComponents/FounderTable.js";
import BankTable from "./DetailsComponents/BankTable.js";
import OfficerTable from "./DetailsComponents/OfficerTable.js";
import File from "./DetailsComponents/File.js";
import SearchBarAdminPanel from "../SideDrawer/SearchBarAdminPanel.js";
import { useDispatch } from "react-redux";

const DetailOrg = () => {
  const [formData, setFormData] = useState({});
  const data = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [org, setOrg] = useState(true);
  const [founder, setFounder] = useState(false);
  const [bank, setBank] = useState(false);
  const [officer, setOfficer] = useState(false);
  const [file, setFile] = useState(false);

  const load = localStorage.getItem("reload");
  useEffect(() => {
    orgsByRegNo(data.id).then((res) => {
      setFormData(res.data.data[0]);
    });
  }, [load]);

  const editHandler = (e) => {
    navigate(`/editorg/${data.id}`);
  };

  const handleOrg = (e) => {
    e.preventDefault();
    setOrg(true);
    setFounder(false);
    setBank(false);
    setOfficer(false);
    setFile(false);
  };

  const handleFounder = (e) => {
    e.preventDefault();
    setOrg(false);
    setFounder(true);
    setBank(false);
    setOfficer(false);
    setFile(false);
  };

  const handleBank = (e) => {
    e.preventDefault();
    setOrg(false);
    setFounder(false);
    setBank(true);
    setOfficer(false);
    setFile(false);
  };

  const handleOfficer = (e) => {
    e.preventDefault();
    setOrg(false);
    setFounder(false);
    setBank(false);
    setOfficer(true);
    setFile(false);
  };

  const handleFile = (e) => {
    e.preventDefault();
    setOrg(false);
    setFounder(false);
    setBank(false);
    setOfficer(false);
    setFile(true);
  };

  const handleBack = (e) => {
    navigate("/allorg");
  };

  return (
    <s.Container style={{ fontFamily: "Kalpurush" }}>
      <div
        style={{
          margin: "auto",
          width: "100%",
          textAlign: "center",
          padding: "10px",
          display: "flex",
          alignItems: "center",
          fontFamily: "Kalpurush",
        }}
      >
        <span onClick={handleBack}>
          <Tooltip title="পিছনে যান">
            <ArrowBackIcon
              style={{
                color: "#6f4283",
                cursor: "pointer",
                fontFamily: "Kalpurush",
              }}
            />
          </Tooltip>
        </span>
        <span
          style={{
            textAlign: "center",
            color: "#6f4283",
            marginLeft: "30%",
            textShadow: "1px 1px 1px gray",
            fontSize: "25px",
            fontFamily: "Kalpurush",
          }}
        >
          সংস্থার বিস্তারিত বিবরণ
        </span>
        <span
          style={{
            paddingLeft: "10px",
            fontSize: "25px",
          }}
        >
          <Tooltip title="তথ্য সম্পাদন করুন" aria-label="add">
            <IconButton onClick={editHandler}>
              <EditIcon style={{ color: "rgba(111, 52, 162, 1)" }} />
            </IconButton>
          </Tooltip>
        </span>
      </div>

      <s.DetailsArea style={{ fontFamily: "Kalpurush" }}>
        <s.OrgDetailsHeader
          style={{ minHeight: "100px", fontFamily: "Kalpurush" }}
        >
          <s.wrapper>
            <s.SubDivBody
              style={{
                fontWeight: "800",
                fontSize: "18px",
                color: "#101010",
                fontFamily: "Kalpurush",
              }}
            >
              {" "}
              {formData?.orgName}
            </s.SubDivBody>
          </s.wrapper>
          <s.wrapper>
            <s.SubDivBody>{formData?.regNo}</s.SubDivBody>
          </s.wrapper>
          <s.wrapper>
            <s.SubDivBody>{formData?.orgMobileNo}</s.SubDivBody>
          </s.wrapper>
          <s.wrapper>
            <s.SubDivBody>
              {formData?.orgVillage + ", " + formData?.orgPost + ","}
            </s.SubDivBody>
          </s.wrapper>
          <s.wrapper>
            <s.SubDivBody>
              {formData?.orgSubdist + ", " + formData?.orgDist}
            </s.SubDivBody>
          </s.wrapper>
        </s.OrgDetailsHeader>
        <s.MenuContainer>
          <s.MenuItems
            onClick={handleOrg}
            style={{
              background: org ? "#6F4283" : "#099f19",
              borderRadius: "10px 0 0 10px",
            }}
          >
            সংস্থার বিবরণ
          </s.MenuItems>
          <s.MenuItems
            onClick={handleFounder}
            style={{ background: founder ? "#6F4283" : "#099f19" }}
          >
            প্রতিষ্ঠাতা সদস্যবৃন্দ
          </s.MenuItems>
          <s.MenuItems
            onClick={handleBank}
            style={{ background: bank ? "#6F4283" : "#099f19" }}
          >
            আর্থিক বিবরণী
          </s.MenuItems>
          <s.MenuItems
            onClick={handleOfficer}
            style={{ background: officer ? "#6F4283" : "#099f19" }}
          >
            কার্যকরী কমিটি
          </s.MenuItems>

          <s.MenuItems
            onClick={handleFile}
            style={{
              background: file ? "#6F4283" : "#099f19",
              borderRadius: "0px 10px 10px 0px",
            }}
          >
            ফাইল
          </s.MenuItems>
        </s.MenuContainer>

        <s.MenuBody>
          <s.OrgsFulldetails
            style={{
              display: org ? "block" : "none",
              padding: "5px",
            }}
          >
            <p
              style={{
                width: "100%",
                textAlign: "center",
                color: "#6F4283",
                textShadow: "1px 1px 1px gray",
                fontSize: "20px",
              }}
            >
              সংস্থার বিবরণ
            </p>

            <s.OrgDetailsHeaderMenu style={{ margin: "auto", width: "100%" }}>
              <s.wrapper>
                <s.SubDivBodyHeader>কার্য এলাকা :</s.SubDivBodyHeader>
                <s.SubDivBodyText>{formData?.workArea}</s.SubDivBodyText>
              </s.wrapper>
              <s.wrapper>
                <s.SubDivBodyHeader>
                  সংশ্লিষ্ট কার্যালয়ের নাম :
                </s.SubDivBodyHeader>
                <s.SubDivBodyText>
                  {formData?.orgRelatedOfficeName}
                </s.SubDivBodyText>
              </s.wrapper>
              <s.wrapper>
                <s.SubDivBodyHeader>রেজিস্ট্রিকরণের তারিখ :</s.SubDivBodyHeader>
                <s.SubDivBodyText>{formData?.regDate}</s.SubDivBodyText>
              </s.wrapper>
              <s.wrapper>
                <s.SubDivBodyHeader>স্থাপনের তারিখ :</s.SubDivBodyHeader>
                <s.SubDivBodyText>{formData?.placementDate}</s.SubDivBodyText>
              </s.wrapper>
              <s.wrapper>
                <s.SubDivBodyHeader>
                  সর্বশেষ কার্যকরী কমিটি অনুমোদনের তারিখ :
                </s.SubDivBodyHeader>
                <s.SubDivBodyText>
                  {formData?.lastActiveCommiteApproveDate}
                </s.SubDivBodyText>
              </s.wrapper>
              <s.wrapper>
                <s.SubDivBodyHeader>
                  সর্বশেষ কার্যকরী কমিটির মেয়াদ উত্তীর্ণের তারিখ :
                </s.SubDivBodyHeader>
                <s.SubDivBodyText>
                  {formData?.lastActiveCommiteExpireDate}
                </s.SubDivBodyText>
              </s.wrapper>
              <s.wrapper>
                <s.SubDivBodyHeader> সংস্থার ইমেইল : </s.SubDivBodyHeader>
                <s.SubDivBodyText>{formData?.orgEmail}</s.SubDivBodyText>
              </s.wrapper>
              <s.wrapper>
                <s.SubDivBodyHeader>সংস্থার ওয়েবসাইট :</s.SubDivBodyHeader>
                <s.SubDivBodyText>{formData?.orgWebsite}</s.SubDivBodyText>
              </s.wrapper>
              <s.wrapper>
                <s.SubDivBodyHeader>
                  সংস্থার লক্ষ্য ও উদ্দেশ্যসমূহ :
                </s.SubDivBodyHeader>
                <s.SubDivBodyText>{formData?.orgMission}</s.SubDivBodyText>
              </s.wrapper>

              <s.wrapper>
                <s.SubDivBodyHeader>মন্তব্য :</s.SubDivBodyHeader>
                <s.SubDivBodyText>{formData?.comment}</s.SubDivBodyText>
              </s.wrapper>
            </s.OrgDetailsHeaderMenu>
          </s.OrgsFulldetails>

          <s.FounderFulldetails
            style={{ padding: "5px", display: founder ? "block" : "none" }}
          >
            <p
              style={{
                width: "100%",
                textAlign: "center",
                color: "#6F4283",
                textShadow: "1px 1px 1px gray",
                fontSize: "20px",
              }}
            >
              প্রতিষ্ঠাতা সদস্যদের বিবরণ
            </p>
            <FounderTable />
          </s.FounderFulldetails>

          <s.BankFulldetails
            style={{ padding: "5px", display: bank ? "block" : "none" }}
          >
            <p
              style={{
                width: "100%",
                textAlign: "center",
                color: "#6F4283",
                textShadow: "1px 1px 1px gray",
                fontSize: "20px",
              }}
            >
              আর্থিক বিবরণী
            </p>
            <BankTable />
          </s.BankFulldetails>

          <s.OfficerFulldetails
            style={{ padding: "5px", display: officer ? "block" : "none" }}
          >
            <p
              style={{
                width: "100%",
                textAlign: "center",
                color: "#6F4283",
                textShadow: "1px 1px 1px gray",
                fontSize: "20px",
              }}
            >
              সর্বশেষ কার্যকরী কমিটির সদস্যদের বিবরণ
            </p>
            <OfficerTable />
          </s.OfficerFulldetails>

          <s.FileFulldetails
            style={{ padding: "5px", display: file ? "block" : "none" }}
          >
            <p
              style={{
                width: "100%",
                textAlign: "center",
                color: "#6F4283",
                textShadow: "1px 1px 1px gray",
                fontSize: "20px",
              }}
            >
              আপলোডকৃত ফাইল
            </p>
            {formData?.fileName ? (
              <File file={formData} />
            ) : (
              <p
                style={{
                  textAlign: "center",
                  marginTop: "50px",
                  fontSize: "18px",
                  color: "gray",
                }}
              >
                কোনো ডাটা পাওয়া যায়নি ।
              </p>
            )}
          </s.FileFulldetails>
        </s.MenuBody>
      </s.DetailsArea>
    </s.Container>
  );
};

export default DetailOrg;

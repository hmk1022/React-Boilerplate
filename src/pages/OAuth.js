import React from "react";
import styled from "styled-components";
import { customAxios } from "../config/customAxios";
// import kakaoLogin from "../assets/kakao_login.png";
import naverLogin from "../assets/naver_login.png";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import KakaoLogin from "../component/KakaoLogin";

function OAuth() {
  const dispatch = useDispatch();

  async function kakaoAuth() {
    const redirectUri = window.location.href.replace(/oauth/g, "");
    console.log("리다이렉트 :: ", redirectUri);
    const res = await customAxios.post("/login/getKakaoAuthUrl", {
      redirectUri: redirectUri,
    });
    console.log("소셜로그인 res : ", res.data);
    window.location.href = res.data;
  }

  async function naverAuth() {
    const res = await customAxios.get("/login/getNaverAuthUrl");
    console.log("소셜로그인 res : ", res.data);
    dispatch(userActions.setOauthType("naver"));
    window.location.href = res.data;
  }

  return (
    <BtnWrap>
      <KakaoLogin />
      {/* <OauthBtnKakao ></OauthBtnKakao> */}
      {/* <OauthBtnNaver onClick={naverAuth}></OauthBtnNaver> */}
    </BtnWrap>
  );
}

export default OAuth;

const BtnWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  margin: 0px auto;
`;

const OauthBtnNaver = styled.div`
  margin-bottom: 10px;
  cursor: pointer;
  background: url(${naverLogin});
  background-size: cover;
  height: 65px;
  width: 100%;
  overflow: hidden;
  border-radius: 5px;
  background-position: center;
`;

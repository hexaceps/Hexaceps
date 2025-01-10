import axios from "axios";
import { API_SERVER_HOST } from './qnaApi'

const client_id = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const client_secret = process.env.REACT_APP_GOOGLE_CLIENT_SECRET;
const redirect_uri = process.env.REACT_APP_GOOGLE_REDIRECT_URI;

const auth_code_path = `https://accounts.google.com/o/oauth2/auth`;
const access_token_url = `https://oauth2.googleapis.com/token`;

export const getGoogleLoginLink = () => {
  return `${auth_code_path}?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&scope=email%20profile`;
};

export const getAccessToken = async (authCode) => {
  const params = new URLSearchParams();
  params.append("code", authCode);
  params.append("client_id", client_id);
  params.append("client_secret", client_secret);
  params.append("redirect_uri", redirect_uri);
  params.append("grant_type", "authorization_code");

  try {
    const response = await axios.post(access_token_url, params);
    return response.data.access_token;
  } catch (error) {
    console.error("Error fetching access token:", error);
    throw error;
  }
};

export const getMemberWithAccessToken = async (accessToken) => {
  try {
    const response = await axios.get(
      `${API_SERVER_HOST}/api/google/member?accessToken=${accessToken}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching member info:", error);
    throw error;
  }
};

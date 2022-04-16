import axios from "axios";
import AuthSession from "expo-auth-session";

import githubConfig from "../../github.config";

const githubFields = [
  "user",
  "public_repo",
  "repo",
  "repo_deployment",
  "repo:status",
  "read:repo_hook",
  "read:org",
  "read:public_key",
  "read:gpg_key",
];

const createTokenWithCode = async (code) => {
  const url =
    `https://github.com/login/oauth/access_token` +
    `?client_id=${githubConfig.id}` +
    `&client_secret=${githubConfig.secret}` +
    `&code=${code}`;

  const res = await axios.post(
    url,
    {},
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  console.log({data: res.data})

  return res.data;
};

export const getGithubToken = async () => {
  try {
    console.log("outside")
    const REDIRECT_URL = AuthSession.getRedirectUrl();

    const { type, params } = await AuthSession.startAsync({
      authUrl:
        `https://github.com/login/oauth/authorize` +
        `?client_id=${githubConfig.id}` +
        `&redirect_uri=${encodeURIComponent(REDIRECT_URL)}` +
        `&scope=${encodeURIComponent(githubFields.join(" "))}`,
    });

    console.log("getGithubTokenAsync: A: ", { type, params });
    if (type !== "success") {
      return null;
    }

    if (params.error) {
      const { error, error_description, error_uri } = params;
      if (error === "redirect_uri_mismatch") {
        console.warn(
          `Please set the "Authorization callback URL" in your Github application settings to ${REDIRECT_URL}`
        );
      }
      throw new Error(`Github Auth: ${error} ${error_description}`);
    }

    const { token_type, scope, access_token } = await createTokenWithCode(
      params.code
    );

    console.log("getGithubTokenAsync: B: ", {
      token_type,
      scope,
      access_token,
    });

    return access_token;
  } catch (err) {
    console.log({err})
    throw new Error(`Github Auth: ${err.message}`);
  }
};

import axios from "axios";

import githubConfig from "../../github.config";

export const githubFields = [
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

export const githubDiscovery = {
  authorizationEndpoint: "https://github.com/login/oauth/authorize",
  tokenEndpoint: "https://github.com/login/oauth/access_token",
  revocationEndpoint: `https://github.com/settings/connections/applications/${githubConfig.id}`,
};

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

  return res.data;
};

export const getGithubToken = async ({ type, params }) => {
  try {
    if (type !== "success") return;

    if (params.error) {
      const { error, error_description } = params;
      if (error === "redirect_uri_mismatch") {
        console.warn(
          `Please set the "Authorization callback URL" in your Github application settings to ${REDIRECT_URL}`
        );
      }
      throw new Error(`Github Auth: ${error} ${error_description}`);
    }

    const { access_token } = await createTokenWithCode(params.code);

    return access_token;
  } catch (err) {
    throw new Error(`Github Auth: ${err.message}`);
  }
};

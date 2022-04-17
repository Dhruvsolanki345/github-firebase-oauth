import { StyleSheet, Text, View, FlatList } from "react-native";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import axios from "axios";

import { reposState } from "../store/repo";
import { getItemFromStore } from "../utils/secureStore";
import moment from "moment";

const data = {
  allow_forking: true,
  archive_url:
    "https://api.github.com/repos/Dhruvsolanki345/Amazaon-Clone/{archive_format}{/ref}",
  archived: false,
  assignees_url:
    "https://api.github.com/repos/Dhruvsolanki345/Amazaon-Clone/assignees{/user}",
  blobs_url:
    "https://api.github.com/repos/Dhruvsolanki345/Amazaon-Clone/git/blobs{/sha}",
  branches_url:
    "https://api.github.com/repos/Dhruvsolanki345/Amazaon-Clone/branches{/branch}",
  clone_url: "https://github.com/Dhruvsolanki345/Amazaon-Clone.git",
  collaborators_url:
    "https://api.github.com/repos/Dhruvsolanki345/Amazaon-Clone/collaborators{/collaborator}",
  comments_url:
    "https://api.github.com/repos/Dhruvsolanki345/Amazaon-Clone/comments{/number}",
  commits_url:
    "https://api.github.com/repos/Dhruvsolanki345/Amazaon-Clone/commits{/sha}",
  compare_url:
    "https://api.github.com/repos/Dhruvsolanki345/Amazaon-Clone/compare/{base}...{head}",
  contents_url:
    "https://api.github.com/repos/Dhruvsolanki345/Amazaon-Clone/contents/{+path}",
  contributors_url:
    "https://api.github.com/repos/Dhruvsolanki345/Amazaon-Clone/contributors",
  created_at: "2021-07-24T02:20:52Z",
  default_branch: "master",
  deployments_url:
    "https://api.github.com/repos/Dhruvsolanki345/Amazaon-Clone/deployments",
  description: null,
  disabled: false,
  downloads_url:
    "https://api.github.com/repos/Dhruvsolanki345/Amazaon-Clone/downloads",
  events_url:
    "https://api.github.com/repos/Dhruvsolanki345/Amazaon-Clone/events",
  fork: false,
  forks: 0,
  forks_count: 0,
  forks_url: "https://api.github.com/repos/Dhruvsolanki345/Amazaon-Clone/forks",
  full_name: "Dhruvsolanki345/Amazaon-Clone",
  git_commits_url:
    "https://api.github.com/repos/Dhruvsolanki345/Amazaon-Clone/git/commits{/sha}",
  git_refs_url:
    "https://api.github.com/repos/Dhruvsolanki345/Amazaon-Clone/git/refs{/sha}",
  git_tags_url:
    "https://api.github.com/repos/Dhruvsolanki345/Amazaon-Clone/git/tags{/sha}",
  git_url: "git://github.com/Dhruvsolanki345/Amazaon-Clone.git",
  has_downloads: true,
  has_issues: true,
  has_pages: false,
  has_projects: true,
  has_wiki: true,
  homepage: null,
  hooks_url: "https://api.github.com/repos/Dhruvsolanki345/Amazaon-Clone/hooks",
  html_url: "https://github.com/Dhruvsolanki345/Amazaon-Clone",
  id: 388977625,
  is_template: false,
  issue_comment_url:
    "https://api.github.com/repos/Dhruvsolanki345/Amazaon-Clone/issues/comments{/number}",
  issue_events_url:
    "https://api.github.com/repos/Dhruvsolanki345/Amazaon-Clone/issues/events{/number}",
  issues_url:
    "https://api.github.com/repos/Dhruvsolanki345/Amazaon-Clone/issues{/number}",
  keys_url:
    "https://api.github.com/repos/Dhruvsolanki345/Amazaon-Clone/keys{/key_id}",
  labels_url:
    "https://api.github.com/repos/Dhruvsolanki345/Amazaon-Clone/labels{/name}",
  language: "JavaScript",
  languages_url:
    "https://api.github.com/repos/Dhruvsolanki345/Amazaon-Clone/languages",
  license: null,
  merges_url:
    "https://api.github.com/repos/Dhruvsolanki345/Amazaon-Clone/merges",
  milestones_url:
    "https://api.github.com/repos/Dhruvsolanki345/Amazaon-Clone/milestones{/number}",
  mirror_url: null,
  name: "Amazaon-Clone",
  node_id: "MDEwOlJlcG9zaXRvcnkzODg5Nzc2MjU=",
  notifications_url:
    "https://api.github.com/repos/Dhruvsolanki345/Amazaon-Clone/notifications{?since,all,participating}",
  open_issues: 0,
  open_issues_count: 0,
  owner: {
    avatar_url: "https://avatars.githubusercontent.com/u/71400881?v=4",
    events_url: "https://api.github.com/users/Dhruvsolanki345/events{/privacy}",
    followers_url: "https://api.github.com/users/Dhruvsolanki345/followers",
    following_url:
      "https://api.github.com/users/Dhruvsolanki345/following{/other_user}",
    gists_url: "https://api.github.com/users/Dhruvsolanki345/gists{/gist_id}",
    gravatar_id: "",
    html_url: "https://github.com/Dhruvsolanki345",
    id: 71400881,
    login: "Dhruvsolanki345",
    node_id: "MDQ6VXNlcjcxNDAwODgx",
    organizations_url: "https://api.github.com/users/Dhruvsolanki345/orgs",
    received_events_url:
      "https://api.github.com/users/Dhruvsolanki345/received_events",
    repos_url: "https://api.github.com/users/Dhruvsolanki345/repos",
    site_admin: false,
    starred_url:
      "https://api.github.com/users/Dhruvsolanki345/starred{/owner}{/repo}",
    subscriptions_url:
      "https://api.github.com/users/Dhruvsolanki345/subscriptions",
    type: "User",
    url: "https://api.github.com/users/Dhruvsolanki345",
  },
  permissions: {
    admin: true,
    maintain: true,
    pull: true,
    push: true,
    triage: true,
  },
  private: true,
  pulls_url:
    "https://api.github.com/repos/Dhruvsolanki345/Amazaon-Clone/pulls{/number}",
  pushed_at: "2021-07-24T02:24:20Z",
  releases_url:
    "https://api.github.com/repos/Dhruvsolanki345/Amazaon-Clone/releases{/id}",
  size: 722,
  ssh_url: "git@github.com:Dhruvsolanki345/Amazaon-Clone.git",
  stargazers_count: 0,
  stargazers_url:
    "https://api.github.com/repos/Dhruvsolanki345/Amazaon-Clone/stargazers",
  statuses_url:
    "https://api.github.com/repos/Dhruvsolanki345/Amazaon-Clone/statuses/{sha}",
  subscribers_url:
    "https://api.github.com/repos/Dhruvsolanki345/Amazaon-Clone/subscribers",
  subscription_url:
    "https://api.github.com/repos/Dhruvsolanki345/Amazaon-Clone/subscription",
  svn_url: "https://github.com/Dhruvsolanki345/Amazaon-Clone",
  tags_url: "https://api.github.com/repos/Dhruvsolanki345/Amazaon-Clone/tags",
  teams_url: "https://api.github.com/repos/Dhruvsolanki345/Amazaon-Clone/teams",
  topics: [],
  trees_url:
    "https://api.github.com/repos/Dhruvsolanki345/Amazaon-Clone/git/trees{/sha}",
  updated_at: "2021-07-24T02:24:23Z",
  url: "https://api.github.com/repos/Dhruvsolanki345/Amazaon-Clone",
  visibility: "private",
  watchers: 0,
  watchers_count: 0,
};

export default function Repositories() {
  const [repos, setRepos] = useRecoilState(reposState);

  useEffect(() => {
    const getData = async () => {
      try {
        const token = await getItemFromStore("github-token");

        const res = await axios.get(`https://api.github.com/user/repos`, {
          headers: {
            accept: "application/vnd.github.v3+json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = res.data;
        setRepos(data);
      } catch (err) {
        console.log("Error when fetching repositories data -> ", err);
      }
    };

    getData();
  }, []);

  const RenderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.repoName}>{item.full_name}</Text>
      <View style={styles.row}>
        <Text style={styles.name}>{item.owner.login}</Text>
        <Text style={styles.visibility}>{item.visibility}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.language}>{item.language}</Text>
        <Text style={styles.date}>
          {"Last updated at " +
            moment(item.updated_at).calendar({ sameElse: "Do MMMM, YYYY" })}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={repos}
        keyExtractor={(item) => item.node_id}
        renderItem={RenderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  card: {
    backgroundColor: "#fff",
    elevation: 6,
    marginVertical: 10,
    marginHorizontal: 15,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  repoName: {
    fontSize: 20,
    marginBottom: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginVertical: 5,
  },
  visibility: {
    fontSize: 16,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  language: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#43b7b8",
  },
  date: {
    color: "#000",
  },
});

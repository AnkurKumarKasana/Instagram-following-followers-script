const fetchOptions = {
  credentials: "include",
  headers: {
    "X-IG-App-ID": "936619743392459",
  },
  method: "GET",
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const random = (min, max) => Math.ceil(Math.random() * (max - min)) + min;

// Recursive function to load all pages of followers/following
const concatFriendshipsApiResponse = async (
  user_id,
  list,
  count,
  next_max_id = ""
) => {
  let url = https://www.instagram.com/api/v1/friendships/${user_id}/${list}/?count=${count};
  if (next_max_id) {
    url += &max_id=${next_max_id};
  }

  const data = await fetch(url, fetchOptions).then((r) => r.json());

  if (data.next_max_id) {
    const timeToSleep = random(100, 500);
    console.log(
      Loaded ${data.users.length} ${list}. Sleeping ${timeToSleep}ms to avoid rate limiting
    );

    await sleep(timeToSleep);

    return data.users.concat(
      await concatFriendshipsApiResponse(user_id, list, count, data.next_max_id)
    );
  }

  return data.users;
};

// Helpers to get followers and following
const getFollowers = (user_id, count = 50, next_max_id = "") => {
  return concatFriendshipsApiResponse(user_id, "followers", count, next_max_id);
};

const getFollowing = (user_id, count = 50, next_max_id = "") => {
  return concatFriendshipsApiResponse(user_id, "following", count, next_max_id);
};

// Get user ID (pk) from username
const getUserId = async (username) => {
  const lower = username.toLowerCase();
  const url = https://www.instagram.com/api/v1/web/search/topsearch/?context=blended&query=${lower}&include_reel=false;
  const data = await fetch(url, fetchOptions).then((r) => r.json());

  const result = data.users?.find(
    (result) => result.user.username.toLowerCase() === lower
  );

  return result?.user?.pk || null;
};

// Main function to get relationship stats
const getUserFriendshipStats = async (username) => {
  const user_id = await getUserId(username);

  if (!user_id) {
    throw new Error(Could not find user with username "${username}");
  }

  const followers = await getFollowers(user_id);
  const following = await getFollowing(user_id);

  const followersUsernames = followers.map((f) => f.username.toLowerCase());
  const followingUsernames = following.map((f) => f.username.toLowerCase());

  const followerSet = new Set(followersUsernames);
  const followingSet = new Set(followingUsernames);

  console.log("-".repeat(30));
  console.log(
    Fetched ${followerSet.size} followers and ${followingSet.size} following.
  );
  console.log(
    If this doesn't seem right, some of the output might be incomplete.
  );

  const PeopleIDontFollowBack = Array.from(followerSet).filter(
    (follower) => !followingSet.has(follower)
  );

  const PeopleNotFollowingMeBack = Array.from(followingSet).filter(
    (following) => !followerSet.has(following)
  );

  return {
    PeopleIDontFollowBack,
    PeopleNotFollowingMeBack,
  };
};

// ✅ Replace with your own Instagram username
const username = "example_username";

getUserFriendshipStats(username)
  .then(console.log)
  .catch(console.error);

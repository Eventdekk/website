const base = "http://localhost:8000/api";
const ending = "?format=json";

export async function fetchData(url) {
  const response = await fetch(base + url + ending, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data;
}

export async function fetchUsers() {
  return await fetchData("/users/");
}

export async function fetchGroups() {
  return await fetchData("/groups/");
}

export async function fetchEvents() {
  return await fetchData("/events/");
}

export async function fetchUser(userId) {
  if (userId === null) {
    return;
  }

  try {
    return await fetchData("/users/" + userId + "/");
  } catch (error) {
    console.log("Error: " + error);
    throw error;
  }
}

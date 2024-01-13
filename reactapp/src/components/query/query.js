const base = "http://localhost:8000/api";
const ending = "?format=json";

async function fetchData(url) {
  const response = await fetch(base + url + ending, {
    headers: {
      Accept: "application/json",
    },
  });
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

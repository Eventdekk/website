const base = "http://localhost:8000/api";
const ending = "?format=json";

export async function fetchData(url) {
  const response = await fetch(base + url + ending, {
    headers: {
      Accept: "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data;
}

export async function postData(url, postData) {
  const response = await fetch(base + url + ending, {
    method: "POST",
    headers: {
      //"Content-Type": "multipart/form-data",
      //Accept: "application/json",
    },
    credentials: "include",
    body: postData,
  });

  if (!response.ok) {
    let errorMessage = "Network response was not ok";
    try {
      const errorData = await response.json();
      errorMessage = errorData.error || errorMessage;
    } catch (e) {
      console.log("Error parsing error response:", e);
    }

    const error = new Error(errorMessage);
    error.response = response;
    throw error;
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
    return null;
  }

  try {
    return await fetchData("/users/data/" + userId + "/");
  } catch (error) {
    console.log("Error: " + error);
    throw error;
  }
}

export async function fetchUserGroups(userId) {
  if (userId === null) {
    return;
  }

  try {
    return await fetchData("/users/groups/" + userId + "/");
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function fetchGroupEvents(groupId) {
  if (groupId === null) {
    return;
  }

  try {
    return await fetchData("/groups/events/" + groupId + "/");
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function postEvent(eventData) {
  try {
    return await postData("/events/create/", eventData);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

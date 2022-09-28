export const api = {
  get: async (url, params) => {
    return await fetch(url, params);
  },
  post: async (
    url,
    payload,
    headers = {
      "Content-Type": "application/json;charset=utf-8",
    }
  ) => {
    return await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });
  },
  put: async (
    url,
    payload,
    headers = {
      "Content-Type": "application/json;charset=utf-8",
    }
  ) => {
    return await fetch(url, {
      method: "PUT",
      headers,
      body: JSON.stringify(payload),
    });
  },
  patch: async (
    url,
    payload,
    headers = {
      "Content-Type": "application/json;charset=utf-8",
    }
  ) => {
    return await fetch(url, {
      method: "PATCH",
      headers,
      body: JSON.stringify(payload),
    });
  },
  delete: async (
    url,
    headers = {
      "Content-Type": "application/json;charset=utf-8",
    }
  ) => {
    return await fetch(url, {
      method: "DELETE",
      headers,
    });
  },
};

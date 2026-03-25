import axios from "axios";

class ApiServices {
  token = localStorage.getItem("token");

  setToken(token) {
    this.token = token;
  }

  async signIn(loginData) {
    const { data } = await axios.post(
      import.meta.env.VITE_BASE_URL + "/users/signin",
      loginData,
    );

    return data;
  }

  async signUp(registerData) {
    const { data } = await axios.post(
      import.meta.env.VITE_BASE_URL + "/users/signup",
      registerData,
    );
    return data;
  }

  async getPosts() {
    const { data } = await axios.get(import.meta.env.VITE_BASE_URL + "/posts", {
      headers: {
        token: this.token,
      },
      params: {
        page: 1,
      },
    });
    return data;
  }

  async getPostDetails(postId) {
    const { data } = await axios.get(
      import.meta.env.VITE_BASE_URL + "/posts/" + postId,
      {
        headers: {
          token: this.token,
        },
      },
    );
    return data;
  }

  async getLoggedUserData() {
    const { data } = await axios.get(
      import.meta.env.VITE_BASE_URL + "/users/profile-data",
      {
        headers: {
          token: this.token,
        },
      },
    );
    return data;
  }

  async getPostComments(postId) {
    const { data } = await axios.get(
      import.meta.env.VITE_BASE_URL + `/posts/${postId}/comments`,
      {
        headers: {
          token: this.token,
        },
      },
    );
    return data;
  }

  async createPost(formData) {
    const { data } = await axios.post(
      import.meta.env.VITE_BASE_URL + "/posts",
      formData,
      {
        headers: {
          token: this.token,
        },
      },
    );
    return data;
  }

  async createComment(postId, formData) {
    const { data } = await axios.post(
      import.meta.env.VITE_BASE_URL + `/posts/${postId}/comments`,
      formData,
      {
        headers: {
          token: this.token,
        },
      },
    );
    return data;
  }

  async deleteComment(postId, commentId) {
    const { data } = await axios.delete(
      import.meta.env.VITE_BASE_URL + `/posts/${postId}/comments/${commentId}`,
      {
        headers: {
          token: this.token,
        },
      },
    );
    return data;
  }

  async deletePost(postId) {
    const { data } = await axios.delete(
      import.meta.env.VITE_BASE_URL + "/posts/" + postId,
      {
        headers: {
          token: this.token,
        },
      },
    );
    return data;
  }

  async updateComment(postId, commentId, formData) {
    const { data } = await axios.put(
      import.meta.env.VITE_BASE_URL + `/posts/${postId}/comments/${commentId}`,
      formData,
      {
        headers: {
          token: this.token,
        },
      },
    );
    return data;
  }

  async updatePost(postId, formData) {
    const { data } = await axios.put(
      import.meta.env.VITE_BASE_URL + `/posts/${postId}`,
      formData,
      {
        headers: {
          token: this.token,
        },
      },
    );
    return data;
  }

  async getMyProfile() {
    const { data } = await axios.get(
      import.meta.env.VITE_BASE_URL + "/users/profile-data",
      {
        headers: {
          token: this.token,
        },
      },
    );
    return data.data.user;
  }

  async getUserPosts(userId) {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/users/${userId}/posts`,
      {
        headers: { token: this.token },
      },
    );
    return data.data.posts;
  }

  async uploadProfilePhoto(formData) {
    const { data } = await axios.put(
      import.meta.env.VITE_BASE_URL + "/users/upload-photo",
      formData,
      {
        headers: {
          token: this.token,
        },
      },
    );
    return data;
  }

  async getPostLikes(postId) {
    const { data } = await axios.put(
      import.meta.env.VITE_BASE_URL + `/posts/${postId}/like`,
      {},
      {
        headers: {
          token: this.token,
        },
      },
    );
    return data;
  }

  async getUserProfile(userId) {
    const { data } = await axios.get(
      import.meta.env.VITE_BASE_URL + `/users/${userId}/profile`,
      {
        headers: {
          token: this.token,
        },
      },
    );
    return data;
  }

  async getSuggestions() {
    const { data } = await axios.get(
      import.meta.env.VITE_BASE_URL + "/users/suggestions?limit=5",
      {
        headers: {
          token: this.token,
        },
      },
    );
    return data.data.suggestions;
  }
}

export const apiServices = new ApiServices();

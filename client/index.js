cache.writeData({
    data: {
      isLoggedIn: Boolean(localStorage.getItem("auth-token"))
    }
  });
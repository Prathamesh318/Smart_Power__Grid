const logout = () => {
  localStorage.clear();
  window.location.href = "http://localhost:5000/logout";
};

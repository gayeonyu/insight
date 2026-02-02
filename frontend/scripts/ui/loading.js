const loading = document.getElementById("loading");

export function showLoading() {
  loading?.classList.remove("hidden");
}

export function hideLoading() {
  loading?.classList.add("hidden");
}
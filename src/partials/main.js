document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded", "page-login loaded")
})

$(document).ready(function () {
  initSetting()
  initInterface()
})

function initSetting() {}

function initInterface() {
  // 로그아웃 버튼 클릭시,
  $("#btnLogout").click(function (event) {
    location.href = "/"
  })
}

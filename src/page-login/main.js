require("../css/main.css")
require("./page.css")

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded", "page-login loaded")
})

$(document).ready(function () {
  initSetting()
  initInterface()
})

function initSetting() {}

function initInterface() {
  $("#btnLogin").click(function (event) {
    location.href = "/staff.html"
  })
}

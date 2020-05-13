require("../css/main.css")
require("./page.css")
require("../partials/main.js")

var root = document.getElementById("tabsContent")

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded", "page-leader loaded")
})

$(document).ready(function () {
  initSetting()
  initInterface()
})

function initSetting() {
  $("#position").text(LEADER.getPosition())
  $("#userName").text(LEADER.getName())
  router("Ta")
}

function initInterface() {
  $("#btnGoTaTab").click(function () {
    activateTab("Ta")
    router("Ta")
  })

  $("#btnGoVacationTab").click(function () {
    activateTab("Vacation")
    router("Vacation")
  })
}

function activateTab(tab) {
  var activatedTabStyle =
    "text-center block border border-blue-500 rounded py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white"
  var deactivatedTabStyle =
    "text-center block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-2 px-4"

  switch (tab) {
    case "Ta":
      $("#tabVacation").removeClass(activatedTabStyle)
      $("#tabVacation").addClass(deactivatedTabStyle)
      $("#tabTa").removeClass(deactivatedTabStyle)
      $("#tabTa").addClass(activatedTabStyle)
      break
    case "Vacation":
      $("#tabVacation").removeClass(deactivatedTabStyle)
      $("#tabVacation").addClass(activatedTabStyle)
      $("#tabTa").removeClass(activatedTabStyle)
      $("#tabTa").addClass(deactivatedTabStyle)
      break
  }
}

function get(url) {
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest()
    req.open("GET", url)
    req.send()

    req.onreadystatechange = function () {
      if (req.readyState === XMLHttpRequest.DONE) {
        if (req.status === 200) resolve(req.response)
        else reject(req.statusText)
      }
    }
  })
}

function router(page) {
  if (page === "Ta") {
    console.log("here")
    get("/ta").then(function (html) {
      root.innerHTML = html
    })
  } else {
    get("/vacation").then(function (html) {
      root.innerHTML = html
    })
  }
}

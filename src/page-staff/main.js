require("../css/main.css")
require("./page.css")
require("../partials/main.js")

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded", "page-staff loaded")
})

$(document).ready(function () {
  initSetting()
  initInterface()
})

/**
 * 초기 세팅을 합니다.
 */
function initSetting() {
  $("#position").text(STAFF.getPosition())
  $("#userName").text(STAFF.getName())

  var today = new Date().toISOString().substr(0, 10)
  $("#inputTaDate").val(today)
}

/**
 * 사용자 동작에 대한 처리를 담당합니다.
 */
function initInterface() {
  // 근무내역 버튼 클릭시,
  $("#btnCommute").click(function (event) {
    event.preventDefault()
    var selectedDate = $("#inputTaDate").val()
    var selectedStartTime = $("#selectorTimeTo option:selected").val()
    var selectedEndTime = $("#selectorTimeOff option:selected").val()
    alert(
      selectedDate + " 출근:" + selectedStartTime + " | 퇴근:" + selectedEndTime
    )
  })

  // 특정일의 수정 버튼 클릭시(예시는 1일),
  $("#btnEditDay" + "1").click(function (event) {
    event.preventDefault()
    changeStyleByMode("editable", 1)
  })

  // 특정일의 취소 버튼 클릭시(예시는 1일),
  $("#btnSaveDay" + "1").click(function (event) {
    event.preventDefault()
    alert("변경 완료!")
    location.href = "/staff.html"
  })

  // 특정일의 취소 버튼 클릭시(예시는 1일),
  $("#btnCancelDay" + "1").click(function (event) {
    event.preventDefault()
    changeStyleByMode("display", 1)
  })
}

/**
 * 수정 중인지 아닌지에 따른 모드를 설정합니다.
 * 수정 모드에서는 출근 및 퇴근 날짜를 수정할 수 있도록 스타일이 적용됩니다.
 *
 * @param {String} mode "editable" - 수정 전(표출) 모드 , "display" - 수정 모드
 * @param {Number} index
 */
function changeStyleByMode(mode, index) {
  switch (mode) {
    case "display":
      $("#inputStartTimeDay" + index).attr("disabled", true)
      $("#inputEndTimeDay" + index).attr("disabled", true)

      $("#btnEditDay" + index).removeClass("hidden")
      $("#btnSaveDay" + index).addClass("hidden")
      $("#btnCancelDay" + index).addClass("hidden")
      break
    case "editable":
      $("#inputStartTimeDay" + index).attr("disabled", false)
      $("#inputStartTimeDay" + index).focus()
      $("#inputEndTimeDay" + index).attr("disabled", false)

      $("#btnEditDay" + index).addClass("hidden")
      $("#btnSaveDay" + index).removeClass("hidden")
      $("#btnCancelDay" + index).removeClass("hidden")
      break
  }
}

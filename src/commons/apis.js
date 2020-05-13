var API = new Object();

APIS.serviceURL = "http://localhost:12080";

/**
  * GET) 출퇴근 시간을 기록합니다... (샘플)
  * @param {String} sample 샘플입니다.
  */
APIS.addCommute = function (sample) {
  var url = APIS.serviceURL + "sample/";
  return _get(url);
}

/**
  * GET) 출퇴근 시간을 기록합니다... (샘플)
  * @param {String} sample 샘플입니다.
  */
APIS.addCommute = function (sample) {
  var url = APIS.serviceURL + "sample/";
  return _get(url);
}

/**
 * GET 통신
 * 샘플이며, 재사용시 수정하여 사용하세요.
 * @param {*} url
 */
function _get(url) {
  var result = new Object();
  $.ajax({
    url: url,
    type: "GET",
    async: false,
    timeout: 8000,
    contentType: "application/json",
  })
    .done(function (data) {
      result = data;
      if (data.responseJSON) result = data.responseJSON;
      console.log(result);
    })
    .fail(function (response) {
      result.code = response.status;
    });
  return result;
}

/**
 * POST 통신
 * @param {*} url
 * @param {*} data
 */
function _post(url, data) {
  console.log(data);
  let result = new Object();
  let token = LERNI.getCookie("token");
  let nickname = encodeURI(LERNI.getCookie("nickname"));
  let uuid = LERNI.getCookie("UUID");

  $.ajax({
    url: url,
    type: "POST",
    async: false,
    timeout: 8000,
    data: JSON.stringify(data),
    contentType: "application/json",
    headers: {
    }
  })
    .done(function (data) {
      result = data;
      if (data.responseJSON) result = data.responseJSON;
    })
    .fail(function (response, text, error) {
      result.code = response.status;
    });
  return result;
}


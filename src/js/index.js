 /*------
                  宣告變數
                ------*/

 // 不能被污染的 raw data;
 var typhoon_origin = void 0;
 // 可被處理的 data;
 var typhoon_data = void 0;
 // 資料索引;
 var i = void 0;
 // 總共要有多少頁碼按紐;
 var buttonPage_total = void 0;
 // 新增的頁碼按紐;
 var buttonPage = void 0;
 // 每次新增的頁碼按鈕數
 var buttonPage_add = 4;
 // 每頁要顯示的資料數;
 var everyPage_results = 20;
 // 點擊按鈕前的頁碼（取 data-num）;
 var current_page = void 0;
 // 點擊按鈕後的頁碼（取 data-num）;
 var click_page = void 0;


 /*------
                            ajax
                          ------*/
 $.ajax({
 	url: "https://next.json-generator.com/api/json/get/Ek86hdRMr",
 	cache: false,
 	success: function success(res) {

 		typhoon_origin = res;

 		typhoon_data = typhoon_origin;

 		// ajax 會在其它代碼執行完後才執行，所以要把欲執行的函數放在裡面，才叫得到資料;
 		common_result();
 		initial_selOpt();

 		// 一開始一定是第一頁，因此將 "active" 加到第一頁;
 		$("button[data-num='1']").addClass("active");
 	}
 });


 /*------
           一開始的選項載入
         ------*/
 function initial_selOpt() {

 	var dists = [];
 	typhoon_data.forEach(function (el, id) {
 		dists[id] = el.CaseLocationDistrict;
 	});

 	var dists_notRepeat = dists.filter(function (dist, id, arr) {
 		return arr.indexOf(dist) === id;
 	});

 	dists_notRepeat.forEach(function (dist) {
 		var selOpt_html = "<li>" + dist + "</li>";
 		$(".select__option.dist").append(selOpt_html);
 	});

 	var typies = [];
 	typhoon_data.forEach(function (el, id) {
 		typies[id] = el.PName;
 	});

 	var typies_notRepeat = typies.filter(function (type, id, arr) {
 		return arr.indexOf(type) === id;
 	});

 	typies_notRepeat.forEach(function (type) {
 		var selOpt_html = "<li>" + type + "</li>";
 		$(".select__option.type").append(selOpt_html);
 	});

 }


 /*------
     動態資料結果設定
   ------*/
 function clickPage_result() {

 	// 清空資料;
 	$(".search-result").empty();

 	/*!!! 計算要取得哪個範圍的資料 !!!*/

 	// 1. 假設現在按下第 5 頁，一次顯示 20 筆資料，那 i 就是 (5 - 1) * 20 = 80
 	i = (click_page - 1) * everyPage_results;

 	// 2. click_page * everyPage_results 為 5 * 20 = 100
 	// 3. 如此就是取得索引 80 ~ 99 的資料;
 	for (i; i < (click_page * everyPage_results > typhoon_data.length ? typhoon_data.length : click_page * everyPage_results); i++) {

 		var result_html = "\n      <div>\n        <article>\n          <section class=\"search-result__time\">\n            <div class=\"title\">\u767C\u751F\u6642\u9593\uFF1A</div>\n            <p>" +




 			typhoon_data[i].CaseTime.replace("T", " ") + "</p>\n          </section>\n          <section class=\"search-result__dist\">\n            <div class=\"title\">\u53D7\u707D\u5730\u5340\uFF1A</div>\n            <p>" +



 			typhoon_data[i].CaseLocationDistrict + "</p>\n          </section>\n          <section class=\"search-result__type\">\n            <div class=\"title\">\u707D\u5BB3\u985E\u578B\uFF1A</div>\n            <p>" +



 			typhoon_data[i].PName + "</p>\n          </section>\n          <section class=\"search-result__address\">\n            <div class=\"title\">\u8A73\u7D30\u5730\u5740\uFF1A</div>\n            <p>" +



 			typhoon_data[i].CaseLocationDescription + "</p>\n          </section>\n          <section class=\"search-result__desc\">\n            <div class=\"title\">\u707D\u60C5\u63CF\u8FF0\uFF1A</div>\n            <p>" +



 			typhoon_data[i].CaseDescription + "</p>\n          </section>\n          <div class=\"complete " + (

 				typhoon_data[i].CaseComplete === true ? "yes" : "") + "\"></div>\n          <i class=\"fas fa-arrow-up\"></i>\n        </article>\n      </div>\n    ";





 		$(".search-result").append(result_html);
 	}

 	if ($(window).width() < 620)
 		$(window).scrollTop(472);
 	else

 		$(window).scrollTop(212);
 }


 /*------
     資料結果、頁碼按鈕動態更新
   ------*/
 function common_result() {
 	// 1. 先移除所有資料結果
 	$(".search-result").empty();
 	$("button[data-num]").remove();
 	$(".search-info__summary span").text(typhoon_data.length);

 	setTimeout(function () {

 		// 2. 再添加新的資料結果;
 		for (
 			i = 0; i < (
 				typhoon_data.length > everyPage_results ?
 				everyPage_results :
 				typhoon_data.length); i++) {
 			var result_html = "\n        <div>\n          <article>\n            <section class=\"search-result__time\">\n              <div class=\"title\">\u767C\u751F\u6642\u9593\uFF1A</div>\n              <p>" +




 				typhoon_data[i].CaseTime.replace("T", " ") + "</p>\n            </section>\n            <section class=\"search-result__dist\">\n              <div class=\"title\">\u53D7\u707D\u5730\u5340\uFF1A</div>\n              <p>" +



 				typhoon_data[i].CaseLocationDistrict + "</p>\n            </section>\n            <section class=\"search-result__type\">\n              <div class=\"title\">\u707D\u5BB3\u985E\u578B\uFF1A</div>\n              <p>" +



 				typhoon_data[i].PName + "</p>\n            </section>\n            <section class=\"search-result__address\">\n              <div class=\"title\">\u8A73\u7D30\u5730\u5740\uFF1A</div>\n              <p>" +



 				typhoon_data[i].CaseLocationDescription + "</p>\n            </section>\n            <section class=\"search-result__desc\">\n              <div class=\"title\">\u707D\u60C5\u63CF\u8FF0\uFF1A</div>\n              <p>" +



 				typhoon_data[i].CaseDescription + "</p>\n            </section>\n            <div class=\"complete " + (


 					typhoon_data[i].CaseComplete === true ? "yes" : "") + "\"></div>\n            <i class=\"fas fa-arrow-up\"></i>\n          </article>\n        </div>\n      ";






 			$(".search-result").append(result_html);
 		}

 		// 1. 先移除所有頁碼按鈕
 		// $("button[data-num]").remove();

 		// 2. 計算在當前資料筆數下，總共需要多少頁碼按鈕
 		buttonPage_total = Math.ceil(typhoon_data.length / everyPage_results);

 		// 3. 再新加新的頁碼按鈕;
 		for (
 			buttonPage = 0; buttonPage < (
 				buttonPage_total >= buttonPage_add ? buttonPage_add : buttonPage_total); buttonPage++) {
 			var button_html = "\n<button data-num=\"" + (
 				buttonPage + 1) + "\">" + (buttonPage + 1) + "</button>\n";

 			$("button.next").before(button_html);

 			$("button[data-num='1']").addClass("active");

 			$("button.prev").addClass("disabled");

 			if (buttonPage_total === 0 || buttonPage_total === 1)
 				$("button.next").addClass("disabled");
 			else
 				$("button.next").removeClass("disabled");
 		}
 	}, 100);
 }



 /*------
     調整選項，動態載入資料
   ------*/
 $(".select__option").on("click", "li", function () {

 	var selDisplay = $(this).parent().prev();

 	selDisplay.text($(this).text());

 	$(this).siblings(".active").removeClass("active");
 	$(this).addClass("active");

 	$(this).parent().addClass("hide");

 	// 取得 "select__display" 上的文字;
 	var selDist = $(".select__display.dist").text();
 	var selType = $(".select__display.type").text();
 	var selComplete = $(".select__display.complete").text();

 	// 1.篩選出符合使用者所選「受災地區」(dist)的資料
 	typhoon_data = typhoon_origin.filter(function (item) {
 		if (selDist !== "所有受災地區") {
 			return item.CaseLocationDistrict === selDist;
 		} else {
 			// 如果讀者沒篩選，那就回傳原本的資料;
 			return typhoon_origin;
 		}
 	});

 	// 2.從被地區篩選的資料，再篩選出符合使用者所選「災害類型」(type)的資料
 	typhoon_data = typhoon_data.filter(function (item) {
 		if (selType !== "- 請選擇災害類型 -" && selType !== "所有災害類型") {
 			return item.PName === selType;
 		} else {
 			// 如果使用者沒篩選，那就回傳原本的資料;
 			return typhoon_data;
 		}
 	});

 	// 3.從被地區、類型篩選的資料，再篩選出符合使用者所選「是否完成」(complete)的資料;
 	typhoon_data = typhoon_data.filter(function (item) {

 		if (selComplete !== "- 請選擇是否完成 -" && selComplete !== "無") {

 			// 右半邊：如果使用者選「已經處理完成」，回傳 true；否則回傳 false;
 			return (
 				item.CaseComplete === (selComplete === "已經處理完成" ? true : false));

 		} else {

 			// 如果使用者沒篩選，那就回傳原本的資料;
 			return typhoon_data;
 		}
 	});

 	common_result();
 });

 $(document).click(function (evt) {

 	var selOpt = $(evt.target).next();

 	if (!selOpt.hasClass("hide")) {
 		$(".select__option").addClass("hide");
 		$(".select__display").removeClass("rotate");
 	} else {
 		$(".select__option").addClass("hide");
 		selOpt.removeClass("hide");
 		$(".select__display").removeClass("rotate");
 		$(evt.target).addClass("rotate");
 	}

 });

 $(".select__option.type, .select__option.complete").one("click", "li", function () {
 	$(this).parent().prev().removeClass("placeholder");
 });



 /*------
       當按頁碼按鈕「下一頁」按到盡頭時，刪除當前按鈕，添增新按鈕
     ------*/
 function buttonPages_next() {

 	// 刪除當前按鈕;
 	$("button[data-num]").remove();

 	for (
 		buttonPage; buttonPage < (
 			current_page + buttonPage_add > buttonPage_total ? buttonPage_total : current_page + buttonPage_add); buttonPage++) {
 		var button_html = "\n      <button data-num=\"" + (
 			buttonPage + 1) + "\">" + (buttonPage + 1) + "</button>\n    ";

 		$("button.next").before(button_html);
 	}

 	$("button[data-num=\"" + (current_page + 1) + "\"]").addClass("active");
 	click_page = $("button.active").data("num");

 	if (click_page === buttonPage_total)
 		$("button.next").addClass("disabled");
 	else

 		$("button.next").removeClass("disabled");

 	clickPage_result();
 }


 /*------
     當按頁碼按鈕「上一頁」按到盡頭時，刪除當前按鈕，添增新按鈕
   ------*/
 function buttonPages_prev() {

 	$("button[data-num]").remove();

 	var buttonPage_endRemain = buttonPage_total % buttonPage_add;

 	buttonPage =
 		buttonPage === buttonPage_total ?
 		buttonPage - (buttonPage_add + buttonPage_endRemain) :
 		buttonPage - buttonPage_add * 2;

 	for (buttonPage; buttonPage < current_page - 1; buttonPage++) {
 		var button_html = "\n      <button data-num=\"" + (
 			buttonPage + 1) + "\">" + (buttonPage + 1) + "</button>\n    ";

 		$("button.next").before(button_html);
 	}

 	$("button[data-num=\"" + (current_page - 1) + "\"]").addClass("active");

 	click_page = $("button.active").data("num");

 	clickPage_result();

 }


 /*------
     按頁碼按鈕時，載入上or下則數筆資料
   ------*/
 $(".pagination").on("click", "button:not(.prev, .next)", function () {

 	current_page = $("button.active").data("num");
 	click_page = $(this).data("num");

 	$("button").removeClass("active");
 	$(this).addClass("active");

 	if ($(this).data("num") === 1)
 		$("button.prev").addClass("disabled");
 	else

 		$("button.prev").removeClass("disabled");

 	if ($(this).data("num") === buttonPage_total)
 		$("button.next").addClass("disabled");
 	else

 		$("button.next").removeClass("disabled");


 	clickPage_result();
 });


 /*------
       按「上一頁」or「下一頁」時，載入上or下則數筆資料
     ------*/
 $("button.prev, button.next").click(function () {

 	current_page = $("button.active").data("num");

 	if ($(this).hasClass("next")) {

 		if (buttonPage_total !== 0 && buttonPage_total !== 1)
 			$("button.prev").removeClass("disabled");

 		if (current_page === buttonPage_total) return;

 		if ($("button.active").index() === buttonPage_add) {
 			buttonPages_next();

 		} else {

 			$("button.active").removeClass("active").
 			next().addClass("active");
 			click_page = $("button.active").data("num");
 			if (click_page === buttonPage_total)
 				$("button.next").addClass("disabled");

 			clickPage_result();
 		}

 	} else if ($(this).hasClass("prev")) {

 		if (buttonPage_total !== 0 && buttonPage_total !== 1)
 			$("button.next").removeClass("disabled");

 		if ($("button.active").text() === "1") return;

 		if ($("button.active").index() === 1) {

 			buttonPages_prev();

 		} else {

 			$("button.active").removeClass("active").
 			prev().addClass("active");

 			click_page = $("button.active").data("num");

 			if (click_page === 1)
 				$(this).addClass("disabled");

 			clickPage_result();
 		}
 	}
 });


 $("nav h1:nth-child(1)").click(function () {
 	location = location;
 });

 $(".search-result").on("click", ".fa-arrow-up", function () {
 	console.log("hi");
 	$("html, body").animate({
 			scrollTop: 0
 		},

 		400);

 });

 $(".search-info__display .num").click(function () {
 	everyPage_results = $(this).text();

 	$("span.num").removeClass("active");
 	$(this).addClass("active");

 	common_result();

 });
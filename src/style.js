$(function () {
  $("#btn-toggle").on("click", function () {
    $(".city-select").toggleClass("show");
  });

  $("#btn-close").on("click", function () {
    $(".city-select").removeClass("show");
  });

  $("#city-list").on("change", function () {
    $(".city-select").removeClass("show");
  });
});

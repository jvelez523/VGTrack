document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("IronGenerator JS imported successfully!");
  },
  false
);

//open modal
$(document).ready(function() {
  $(".modal").modal();
  $(".sidenav").sidenav();
  $(".tabs").tabs();
  $(".materialboxed").materialbox();
  $(".fixed-action-btn").floatingActionButton({
    hoverEnabled: false
  });
  $(".carousel").carousel();
  $(".editbtn").click(function() {
    $(".minusbtn").toggleClass("scale-out");
  });
});

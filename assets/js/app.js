let trEl = $("tr");

trEl.click(function(e) {
  //   console.log(e.target);
  if (e.target.matches("button")) {
    const rowID = $(this).data("id");
    console.log(rowID);
    // let todoObj = {
    //     id:
    //     activity:
    // };
    // saveTodo(todoObj);
  }

  id = act;
});

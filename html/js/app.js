var money = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
});

(() => {
  Kashacter = {};

  Kashacter.ShowUI = function (data) {
    $("body").fadeIn();

    $("[data-charid=1]")
      .html(
        '<div class="character-info"><p id="character-info-name" class="character-info-name">' +
           data.firstname +
           " " +
           data.lastname +
          "<span>" +
          '</span></p> <p id="character-info-dateofbirth" class="character-info-dateofbirth">' +
          data.dateofbirth +
          "<span>" +
          '</span></p><p id="info-text" class="character-info-money">' +
          money.format(data.money) +
          "<span> " +
          `<span class="material-symbols-outlined">
          monetization_on
          </span>` +
          '</span></p><p id="info-text" class="character-info-bank">' +
          money.format(data.bank) +
          "<span> " +
          `<span class="material-symbols-outlined">
          account_balance
          </span>` +
          '</span></p> <p id="info-text" class="character-info-gender">' +
          data.sex +
          "<span>" +
          `<span class="material-symbols-outlined">
          </span>` +
          "</span></p></div>"
      )
      .attr("data-ischar", "true");
  };

  Kashacter.CloseUI = function () {
    $("body").fadeOut();
    $("[data-charid=1]").html(
      '<h3 class="character-fullname"></h3><div class="character-info"><p class="character-info-new"></p></div>'
    );
  };

  window.onload = function (e) {
    window.addEventListener("message", function (event) {
      switch (event.data.action) {
        case "openui":
          console.log(event.data.character);
          Kashacter.ShowUI(event.data.character);
          break;
        case "closeui":
          Kashacter.CloseUI();
          break;
      }

      let data = event.data
      if (data.type == 'resetdata'){
        console.log('aaaaaaaaaa')
        $('#option').remove();
        $('#option').remove();
        $('#option').remove();
        $('#option').remove();
        $('#option').remove();
      }
      if (data.type == 'createcharacters'){
        let ui = `
        <button id="option" onclick="selectoption(${data.value})" >
            <p id="optionname"><span class="material-symbols-outlined">person</span>${data.label}</p>
            <p id="playerjob">${data.job}</p>
        </button>`
        document.getElementById('characters').insertAdjacentHTML("beforeend", ui)
        ui = null
      }
      if (data.type == '_createcharacters'){
        let ui = `
        <button id="option" onclick="selectoption(${data.value})" >
            <p id="optionname"><span class="material-symbols-outlined">person</span>${data.label}</p>
        </button>`
        document.getElementById('_characters').insertAdjacentHTML("beforeend", ui)
       // $('#_char_header').animate({'left':'2rem'},100)
       // $('#characters').animate({'left':'10%'},100)
       // $('#_characters').animate({'left':'10%'},100)
        ui = null
      }
    });
  };
})();


function selectoption(value){

  $.post(
    `https://${GetParentResourceName()}/previewcharacter`,
    JSON.stringify(value)
  );


  const element = document.getElementById("select");
  const element1 = document.getElementById("delete");
   element.remove();
   element1.remove();
  let data = value
  let ui = `
  <button id="select"  onclick="selectcharacter(${data})"   ><span class="material-symbols-outlined">play_arrow</span></button>
  <button id="delete"  onclick="deletecharacter(${data})"   ><span class="material-symbols-outlined">delete</span></button>
  `
  document.getElementById('select-button').insertAdjacentHTML("beforeend", ui)
  $('#select-button').fadeIn()
  ui = null
}


function deletecharacter(value){
  $.post(
    `https://${GetParentResourceName()}/deletecharacter`,
    JSON.stringify(value)
  );

}


function selectcharacter(value){
  $.post(
    `https://${GetParentResourceName()}/selectcharacter`,
    JSON.stringify(value)
  );
  
}

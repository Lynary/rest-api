$.ajax({
  url: "https://kisahnabi-api-zhirrr.vercel.app/api/searchnabi?q=adam",
  success: (result) => {
    const hasil = result.nabi;
    $(".tampil-nabi").html(tampilNabi(hasil));
  },
});

function tampilNabi(hasil) {
  return `<div class="col-md-8 text-center lh-base">
    <h2>${hasil.nama}</h2>
  <p><h4>Lahir : ${hasil.lahir}</h4></p>
  <p><h4>Tempat : ${hasil.tempat}</h4></p>
  <img src="${hasil.image}" class="my-3">
  </div>

  <div class="row justify-content-center">
        <div class="col-md-8 fs-5">
        <p style="text-align: justify;">${hasil.kisah}</p>
        </div>
      </div>
  
  `;
}

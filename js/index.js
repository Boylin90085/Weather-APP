var tempChange = "C";
function getWeather(lat,long){
$.ajax({
  type: "GET",
  url: "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22("+lat+"%2C"+long+")%22)%20and%20u%3D%22c%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys",
  success: function(data){
    //YQL回傳的JSON為物件
    var country = data.query.results.channel.location.country;
    var city = data.query.results.channel.location.city;
    var temp = data.query.results.channel.item.condition.temp;
    var weather = data.query.results.channel.item.condition.text;
    var weatherCode =  data.query.results.channel.item.condition.code;
    $("#city").html(city + ",");
    $("#country").html(country);
    $("#temp").html(temp + "°");
    $("#tempChange").text(tempChange);
    $("#weather").html(weather);
    // console.log(weatherCode);
    // console.log(city);
    // console.log(temp);

    if(weatherCode >= 0 && weatherCode <= 12){
      $(".rainy").removeClass("hide");
    }else if((weatherCode >= 13 && weatherCode <= 22) || weatherCode == 35 || (weatherCode >= 41 && weatherCode <= 43) || weatherCode == 46){
      $(".flurries").removeClass("hide");
    }else if((weatherCode >= 23 && weatherCode <= 31) || weatherCode == 44){
      $(".cloudy").removeClass("hide");
    }else if((weatherCode >= 32 && weatherCode <= 34) || weatherCode == 36){
      $(".sunny").removeClass("hide");
    }else if((weatherCode >= 37 && weatherCode <= 40) || weatherCode == 45 || weatherCode == 47){
      $(".thunder-storm").removeClass("hide");
    }
  }
})
}

$(document).ready(function(){
    //利用.geolocation取得使用者位置的經緯度後 傳入yahoo weather API查詢當地天氣
   if (navigator.geolocation){
 navigator.geolocation.getCurrentPosition(function(position){
      var lat = position.coords.latitude;
      var long = position.coords.longitude;
      getWeather(lat,long);
    });
  }else{
    console.log("Geolocation is not supported by this browser.");
  }
  //點擊CorF後轉換溫度單位
  $("#tempChange").on("click",function(){
    var tempChange = $("#tempChange").text();
    var newtempChange = tempChange == "C" ? "F" : "C";
    //若tempChange = C 就改為F
    $("#tempChange").text(newtempChange);
    if(newtempChange == "F"){
      var change
      //Math.round如果小數位的部分值大於 0.5, 這個值將會進位. 如果小數位的部分值小於 0.5, 這個值將不會進位. parseInt能將輸入的字串轉成整數。
      change = Math.round(parseInt($("#temp").text()) * 9 / 5 + 32);
      $("#temp").text(change + "°");
    }else if(newtempChange == "C"){
      var change
      change = Math.round((parseInt($("#temp").text()) - 32) * 5 / 9);
      console.log(change);
      $("#temp").text(change + "°");
    }
})
});
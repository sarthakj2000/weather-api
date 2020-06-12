const express=require("express");
const https=require("https");
const app=express();
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req, res){

  res.sendFile(__dirname+"/index.html")

});
app.post("/",function(req,res){

  const query=req.body.cityName;
  const appKey="131a22ab1a579a6872da9a0b5cb9bad1";
  const units="metric";
  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appKey+"&units="+units;
  https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
      const weatherData=JSON.parse(data);
      const temp=weatherData.main.temp;
      const description=weatherData.weather[0].description;
      const icon=weatherData.weather[0].icon;
      const imageUrl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.write("<h1>temprature is "+temp+"</h1>");
      res.write("<h1>the weather despription is"+description+"</h1>");
      res.write("<img src="+imageUrl+">");
      res.send();
    });
  });


});




app.listen(3000,function(){
  console.log("server started at 3000");
});

    let myMap;
    let canvas;
    let slider;
    let boo = false;
    let week = 0;
    let posJ = [];
    let posA = [];
    let posM = [];
    let posAnt = [];
    let posMig = [];
    let posJam = [];
    let months = [];
    let years = [];

    const mappa = new Mappa('Leaflet');

    let options = {
    lat: 42,
    lng: 0,
    zoom: 3,
    style: "https://api.mapbox.com/styles/v1/jamiekyl/ckgi1lx8m0ou419lep0313xck/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiamFtaWVreWwiLCJhIjoiY2tnZ3NlNm4yMG9kbTJxbWxvdGsxMWtuMiJ9.gpZC_H9jzt9chN0tk3SHHA"
    }


    function preload() {
    antoineData = loadTable('Locations_Antoine.csv', 'csv', 'header');
    miguelData = loadTable('Locations_Miguel.csv', 'csv', 'header');
    jamieData = loadTable('Locations_Jamie.csv', 'csv', 'header');


    }


    function setup() {
    canvas = createCanvas(1200, 800);
    frameRate(5);
    myMap = mappa.tileMap(options);
    myMap.overlay(canvas);
    myMap.onChange(clear);

    slider = createSlider(0,1514,0,1);
    slider.input(sliderChange);
    slider.position(50,830);
    slider.style('width', '300px');
    textBox = createInput('');
    textBox.position(50,880)
    textBox.size(50);
    textBox.value(0);
    button = createButton('Submit');
    button.position(textBox.x + textBox.width+10, textBox.y);
    button.mousePressed(updateValue);
    valueDisplayer = createP()
    valueDisplayer.position(50,height-50)

    button = createButton('Reset');
    button.position(textBox.x + textBox.width+70, textBox.y);
    button.mousePressed(reset);

    button = createButton('Start');
    button.position(textBox.x + textBox.width+123, textBox.y);
    button.mousePressed(startAnimation);

    button = createButton('Stop');
    button.position(textBox.x + textBox.width+169, textBox.y);
    button.mousePressed(stopAnimation);

    myMap.onChange(dataAntoine.bind(null, antoineData));
    myMap.onChange(dataJamie.bind(null, jamieData));
    myMap.onChange(dataMiguel.bind(null, miguelData));


    function dataAntoine(data) {
    nullsAnt = [];
    nullsAnt.length = 289
    pos = [];
    posA = [];
    for (let i = 289; i < data.getRowCount(); i++) {
    let latAnt = Number(data.getString(i, 'Latitude'));
    let lngAnt = Number(data.getString(i, 'Longitude'));
    pos.push(myMap.latLngToPixel(latAnt, lngAnt));
    posA = nullsAnt.concat(pos);
    }
    }

    function dataJamie(data) {
    nullsJam = [];
    nullsJam.length = 173
    pos = [];
    posJ = [];
    for (let i = 173; i < data.getRowCount(); i++) {
    let latJam = Number(data.getString(i, 'Latitude'));
    let lngJam = Number(data.getString(i, 'Longitude'));
    pos.push(myMap.latLngToPixel(latJam, lngJam));
    posJ = nullsJam.concat(pos);
    }
    }

    function dataMiguel(data) {
    posM = [];
    for (let i = 0; i < data.getRowCount(); i++) {
    let latMig = Number(data.getString(i, 'Latitude'));
    let lngMig = Number(data.getString(i, 'Longitude'));
    posM.push(myMap.latLngToPixel(latMig, lngMig));

    let month = data.getString(i, 'Month');
    let year = data.getString(i, 'Year');
    months.push(month);
    years.push(year);
    console.log(months);
}
    }

}


    function draw() {
    push();
    erase();
    rect(0,0,1200,800);
    noErase();
    pop();


    if (boo == true){
    slider.value(week);
    textBox.value(slider.value());
    week = week+1;
    }
    else {
    slider.value(week);
    }


    let posAnt = subset(posA,0,week - 1);
    for (let i = 290; i < posAnt.length; i++){
    x1 = posAnt[i-1].x;
    y1 = posAnt[i-1].y;
    x3 = posAnt[i].x;
    y3 = posAnt[i].y;

    distx = x3 - x1;
    disty = y3 - y1;

    x2 = x1 + 0.6*distx;
    y2 = y1 + 0.4*disty;

    noFill();
    strokeWeight(2);
    if (week-i < 100){
    stroke(20,50,220,255-(week - i)*2);
  }
  else {
    stroke(20,50,220,55)
  }
    bezier(x1,y1,x2,y2,x2,y2,x3,y3)

    for (let i = posAnt.length - 1; i < posAnt.length; i++){
      erase(255,0);
      fill(0);
      noStroke();
      circle(x1,y1,10);
      noErase();
      circle(x3,y3,10);
    }
    }

    let posJam = subset(posJ,0,week-1);
    for (let i = 174; i < posJam.length; i++){
    x1 = posJam[i-1].x;
    y1 = posJam[i-1].y;
    x3 = posJam[i].x;
    y3 = posJam[i].y;

    distx = x3 - x1;
    disty = y3 - y1;

    x2 = x1 + 0.6*distx;
    y2 = y1 + 0.4*disty;
    jalph = map((week-i),0,1514,0,220);
    // console.log(jalph)
    stroke(180,0,170,255+jalph);
    noFill();
    strokeWeight(2);
    if (week-i < 100){
    stroke(255,126,2,255-(week - i)*2);
  }
  else {
    stroke(255,126,2,55)
  }
    bezier(x1,y1,x2,y2,x2,y2,x3,y3)

    for (let i = posJam.length - 1; i < posJam.length; i++){
      erase(255,0);
      fill(0);
      noStroke();
      circle(x1,y1,10);
      noErase();
      circle(x3,y3,10);
    }
  }

  let posMig = subset(posM,0,week-1);
  for (let i = 1; i < posMig.length; i++){
    textFont('verdana');
    textSize(24);
    text(months[week],20,750);
    text(years[week], 20,780);
  x1 = posMig[i-1].x;
  y1 = posMig[i-1].y;
  x3 = posMig[i].x;
  y3 = posMig[i].y;

  distx = x3 - x1;
  disty = y3 - y1;

  x2 = x1 + 0.6*distx;
  y2 = y1 + 0.4*disty;
  noFill();
  strokeWeight(2);
  if (week-i < 100){
  stroke(180,0,170,255-(week - i)*2);
}
else {
  stroke(180,0,170,55)
}

  bezier(x1,y1,x2,y2,x2,y2,x3,y3);

  for (let i = posMig.length - 1; i < posMig.length; i++){
    erase(255,0);
    fill(0);
    noStroke();
    circle(x1,y1,10);
    noErase();
    circle(x3,y3,10);
  }
}
}

    function updateValue(){
    slider.value(textBox.value());
    week = slider.value();
    clear();
    }

    function sliderChange(){
    textBox.value(slider.value());
    week = slider.value();
    clear();
    }

    function reset(){
    slider.value(0);
    textBox.value(slider.value());
    week = slider.value();
    clear();
    }

    function startAnimation(){
      clear();
    boo = true
    }

    function stopAnimation(){
    boo = false
    }

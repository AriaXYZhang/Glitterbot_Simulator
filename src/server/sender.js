const engine = require('./roverPathFinding.js')
var grid = [];
var litterArrayLocations = [];
var roverX;
var roverY;
var width = 29;
var height = 29;

function sender(io) {
	//test roverPath
	//test comment
	var scanRadius = 0;
  var grid = [];
	// 0 for left and 1 for right
	var direction = 1;

	roverPath = [
		{posx: 1, posy:0},
	  {posx: 2, posy:0},
		{posx: 2, posy:1},
	  {posx: 3, posy:1},
		{posx: 4, posy:1},
		{posx: 4, posy:0},
		{posx: 5, posy:1},
		{posx: 6, posy:1},
	]

	//When a client connect display message on console
	io.on('connection', function(socket){
	  console.log('a user connected');
		socket.on('rover-frontEnd', function(data) {
			console.log(data.coordinates.posx);
			console.log(data.coordinates.posx+"-"+data.coordinates.posy);
			console.log("rover is waiting: "+data.state);
			roverX = data.coordinates.posx;
			roverY = data.coordinates.posy;
			var path = engine(litterArrayLocations, {x:roverX, y:roverY}, grid);
			console.log(path);
			if (data.state != false) {
				socket.emit('rover-frontEnd', path);
			}
		});

		//receive the location of the drone and send back the path
		socket.on('drone-frontEnd', function(data) {
			console.log(data.coordinates.posx+"-"+data.coordinates.posy);
			scanRadius = data.scanRadius;
			console.log('scan radius: ' + scanRadius);

			console.log('routinePath start work!');
			console.log('Direction: '+direction);
			routinePath(data.coordinates.posx, data.coordinates.posy, scanRadius, direction, socket);
			//this.direction = nextLocation.direction;
			//socket.emit('drone-frontEnd', nextLocation);
		});

		// receive
	});
}

function routinePath(posx, posy, scanRadius, direction, socket) {
	//Really shitty design rn. need to fix it up and change implementation but at least it works? :D

	console.log('from server: '+posx+'-'+posy);
	while(posx != width && posy != height){

		while(direction == 1){
			if(posx == width)
			{
				direction = 0;
			}

			posx = moveRight(posx, posy, scanRadius);
			var data = {coordinates: {posx:posx, posy:posy},
				direction: direction}
				socket.emit('drone-frontEnd', data);
			}

			posy = moveDown(posx, posy, scanRadius);
			var data = {coordinates: {posx:posx, posy:posy},
				direction: direction}
				socket.emit('drone-frontEnd', data);

				while(direction == 0){
					if(posx == 0)
					{
						direction = 1;
					}
					posx = moveLeft(posx, posy, scanRadius);

					var data = {coordinates: {posx:posx, posy:posy},
					direction: direction}
					socket.emit('drone-frontEnd', data);
				}

				posy = moveDown(posx, posy, scanRadius);
				var data = {coordinates: {posx:posx, posy:posy},
					direction: direction}
					socket.emit('drone-frontEnd', data);
				}
			}

function moveRight(posx, posy, scanRadius){
	if((width - posx) > scanRadius)
	{
		posx += scanRadius;
	}
	else{
		posx += (width-posx);
	}
	return posx;
}

function moveDown(posx, posy, scanRadius){
	if (posy != height) {
		if((height - posy) > (2*scanRadius))
		{
			posy += 2*scanRadius;
		}
		else {
			posy += (height-posy);
		}
	}
	return posy;
}

function moveLeft(posx, posy, scanRadius){
	if((posx) > scanRadius)
	{
		posx -= scanRadius;
	}
	else{
		posx -= posx;
	}
	return posx;
}
module.exports = sender;

const engine = require('./roverPathFinding.js')
var grid = [];
var litterArrayLocations = [];
var roverX;
var roverY;

function sender(io) {
<<<<<<< HEAD
=======
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

>>>>>>> d2e60b32d96650ee9a608181e34d86a94934408b
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
<<<<<<< HEAD
		socket.on('grid-channel', function(data) {
			grid = data.grid;
			litterArrayLocations = data.litter;
			console.log(litterArrayLocations);
		})
=======

		//receive the location of the drone and send back the path
		socket.on('drone-frontEnd', function(data) {
			console.log(data.coordinates.posx+"-"+data.coordinates.posy);
			scanRadius = data.scanRadius;
			console.log('scan radius: ' + scanRadius);

			console.log('routinePath start work!');
			console.log('Direction: '+direction);
			var nextLocation = routinePath(data.coordinates.posx, data.coordinates.posy, scanRadius, direction);
			this.direction = nextLocation.direction;
			socket.emit('drone-frontEnd', nextLocation);
		});

		// receive
>>>>>>> d2e60b32d96650ee9a608181e34d86a94934408b
	});
}

function routinePath(posx, posy, scanRadius, direction) {
	//how to know the size of the map?
	// for test

	//var width = grid.length;
	//var height = grid[0].length;

	var width = 100;
	var height = 100;
	console.log('from server: '+posx+'-'+posy);


	if (posx == width || (posx == 0 && posy != 0)) {

		if (posx == width) {
			direction = 0;
		}
		else{
			direction = 1;
		}
		if (posy != height) {
			posy += 2*scanRadius;
		}
	}
	else {
		if (direction == 0) {
			posx -= scanRadius;
		}
		else {
			posx += scanRadius;
		}
	}

	var data = {coordinates: {posx:posx, posy:posy},
		direction: direction}
	return data;
}








module.exports = sender;

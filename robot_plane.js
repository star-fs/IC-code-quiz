const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// keep a list of places where robots where "lost"
losts = [];

// playing field
function make_world(top_right) {

  if (top_right[0] > 50) {
    console.log("x:" + top_right[0] + " is greater than the max field size (50)");
    return;
  }

  if (top_right[1] > 50) {
    console.log("y:" + top_right[1] + " is greater than the max field size (50)");
    return;
  }

  var world = new Array(top_right[0]);
  for (var i = 0; i < top_right[0]; i++) {
    world[i] = new Array(top_right[1]);
  }

  return world;

}

// define the robot and behaviors
var Robot = {
  leave_scent: function() {
    losts[losts.length] = [this.position];
  },
  position: Array(2),
  direction: ""
};

// handle input
function parse_command(cmd) {

  if (cmd.length >= 100) {
    console.log("error: comand length exceeds 100 characters.");
    return;
  }

  data = cmd.split(/\ /);

  if (data.length == 3) {

    loc_data = cmd.split(/\ /);

    if (parseInt(loc_data[0]) > world[0]) {
      console.log("Error: x location off of map:" + loc_data[0]);
      return;
    }
    if (parseInt(loc_data[1]) > world[1]) {
      console.log("Error: y location off of map:" + loc_data[1]);
      return;
    }

    Robot.position = [parseInt(loc_data[0]), parseInt(loc_data[1])];
    Robot.direction = loc_data[2];

    console.log(Robot.position[0] + " " + Robot.position[1] + " " + Robot.direction); 

    return;
  }

  if (data.length == 2) {

    world = make_world(cmd.split(/\ /));

    return;
  }

  if (data.length == 1) {

    if (Robot.position[0] == 0 && Robot.position[1] == 0) {
      console.log("Error: no current robot!");
      return;
    }

    // parse move commands
    mv = data[0].split("");

    for (i=0;i<mv.length;i++) {

      if (mv[i]=='L' || mv[i]=='R') {
        adjust_direction(mv[i]);
      }

      // forward movements
      if (mv[i] == "F") {

        if (Robot.direction == 'E') {
          Robot.position[0]++;
          check_lost();
        }
        if (Robot.direction == 'W') {
          Robot.position[0]--;
          check_lost();
        }

        if (Robot.direction == 'N') {
          Robot.position[1]++;
          check_lost();
        }
        if (Robot.direction == 'S') {
          Robot.position[1]--;
          check_lost();
        }
      }
    }
    console.log(Robot.position[0] + " " + Robot.position[1] + " " + Robot.direction); 
  }
}

function adjust_direction(turn) {

  // Left turns
  if (turn == 'L' && Robot.direction == 'E') {
    Robot.direction = 'N';
    return;
  }
  if (turn == 'L' && Robot.direction == 'W') {
    Robot.direction = 'S';
    return;
  }
  if (turn == 'L' && Robot.direction == 'N') {
    Robot.direction = 'W';
    return;
  }
  if (turn == 'L' && Robot.direction == 'S') {
    Robot.direction = 'E';
    return;
  }

  // Right turns
  if (turn == 'R' && Robot.direction == 'E') {
    Robot.direction = 'S';
    return;
  }
  if (turn == 'R' && Robot.direction == 'W') {
    Robot.direction = 'N';
    return;
  }
  if (turn == 'R' && Robot.direction == 'N') {
    Robot.direction = 'E';
    return;
  }
  if (turn == 'R' && Robot.direction == 'S') {
    Robot.direction = 'W';
    return;
  }

}

// did we fall off the map?
function check_lost() {

  // check to see if we got "lost" E/W
  if (Robot.position[0] > world[0] || Robot.position[0] < 1) {
    console.log(Robot.position[0] + " " + Robot.position[1] + " " + Robot.direction + " LOST");
    Robot.leave_scent();
    Robot.position = [0,0];
    return;
  }

  // check to see if we got "lost" N/S
  if (Robot.position[1] > world[1] || Robot.position[1] < 1) {
    console.log(Robot.position[0] + " " + Robot.position[1] + " " + Robot.direction + " LOST");
    Robot.leave_scent();
    Robot.position = [0,0];
    return;
  }
}

function get_input() {
  // handle cl interaction
  rl.question('>> ', (cmd) => {
    parse_command(cmd);
    get_input();
  });
}

get_input();

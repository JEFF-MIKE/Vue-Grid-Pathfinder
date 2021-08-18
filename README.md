# Grid Pathfinder

A VueJS application that maps the shortest path between two points on a grid.

Note that this is still a work in progress, and will not work with mobiles currently.

### Features

Currently, the application can do the following:
+ Place a start node and end node for the pathfinding algorithm.
    + Currently if you do this, it wipes the entire grid for now.
+ Place (and remove) walls as obstructions for the pathfinding algorithm.
+ Place and adjust weighted nodes to simulate longer distances on the grid.
+ Buttons that allow the user to fill the grid with walls, paths and reset weights to 1.
+ Simulate the Pathfinding to get the shortest distance.
    + When completed, you can hover over any node to see the shortest distance from the start node to the highlighted visited node.

Future additions/changes I will make include:
+ Improve the UI over time / Make it easier to interact with.
+ A logger that describes in English what actions are taking place.
+ Break down certain components even further (this will mean introducing VueX).
+ Add other pathfinding algorithms.
+ Some form of a mobile view / decent mobile interaction.

Possible future additions:
+ A Maze generator, which will create a set of walls and paths with randomized start nodes and end nodes.

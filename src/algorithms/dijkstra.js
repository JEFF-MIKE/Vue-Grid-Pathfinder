// Below returns an ordered array of the path taken for dijkstra's algorithm.
export const dijkstra = (grid, startNode, endNode) => {
  if (!startNode || !endNode || startNode === endNode) return false;
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  const unvisitedNodes = getGridNodes(grid);
  while(unvisitedNodes.length != 0) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();

    if (closestNode.isWall) continue;

    // if the closest distance is infinity it means the
    // pathfinder is trapped and cannot continue further.
    if (closestNode.distance === Infinity) return visitedNodesInOrder;

    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === endNode) return visitedNodesInOrder;
    updateUnvisitedNeighbors(closestNode, grid);
  }

  // Return here for silly edgecases where grid gets filled
  // up and somehow doesn't return the shortest path.
}

const getGridNodes = (grid) => { return grid.flat() }

const sortNodesByDistance = (unvisitedNodes) => {
  unvisitedNodes.sort((nodeOne, nodeTwo) => nodeOne.distance - nodeTwo.distance);
}

const updateUnvisitedNeighbors = (node, grid) => {
  const neighbors = getUnvisitedNeighbors(node, grid);

  for (const neighbor of neighbors) {
    // We need to check here to see if the new distance is
    // less than the previous distance. If it is, update it and
    // the previous node reference, otherwise continue.

    if (neighbor.distance !== Infinity){
      // There is a known distance, we need to check if it's shorter
      // than the current distance. If it is, update it.
      const newDistance = node.distance + neighbor.weight;
      if (neighbor.distance > newDistance) {
        neighbor.distance = newDistance;
        neighbor.previousNode = node;
      }
      continue;
    }

    neighbor.distance = node.distance + neighbor.weight;
    neighbor.previousNode = node;

  }
}

const getUnvisitedNeighbors = (node, grid) => {
  const neighbors = [];
  const {col, row} = node;
  // grid is currently a square, might want to do a row and height specific
  // check in the future.
  if (row > 0) neighbors.push(grid[row - 1][col]); // left
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]); // right
  if (col > 0) neighbors.push(grid[row][col - 1]);// up
  if (col < grid.length - 1) neighbors.push(grid[row][col + 1]) // down

  return neighbors.filter(neighbor => !neighbor.isVisited);
}
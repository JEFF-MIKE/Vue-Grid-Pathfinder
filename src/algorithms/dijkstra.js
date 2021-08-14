// Below returns an ordered array of the path taken for dijkstra's algorithm.
export const dijkstra = (grid, startNode, endNode) => {
  if (!startNode || !endNode || startNode === endNode) return false;
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  const unvisitedNodes = getGridNodes(grid);
  while(unvisitedNodes.length != 0) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();

    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === endNode) return visitedNodesInOrder;
    updateUnvisitedNeighbors(closestNode, grid);
  }
}

const getGridNodes = (grid) => { return grid.flat() }

const sortNodesByDistance = (unvisitedNodes) => {
  unvisitedNodes.sort((nodeOne, nodeTwo) => nodeOne.distance - nodeTwo.distance);
}

const updateUnvisitedNeighbors = (node, grid) => {
  const neighbors = getUnvisitedNeighbors(node, grid);

  for (const neighbor of neighbors) {
    neighbor.distance = node.distance + 1;
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
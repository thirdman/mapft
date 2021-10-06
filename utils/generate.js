const tileIndexArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

/* This maps the sides that have doors */
const tileSidesMap = {
  0: [0, 0, 0, 0],
  1: [1, 0, 0, 0],
  2: [0, 1, 0, 0],
  3: [1, 1, 0, 0],
  4: [0, 0, 1, 0],
  5: [1, 0, 1, 0],
  6: [0, 1, 1, 0],
  7: [1, 1, 1, 0],
  8: [0, 0, 0, 1],
  9: [1, 0, 0, 1],
  10: [0, 1, 0, 1],
  11: [1, 1, 0, 1],
  12: [0, 0, 1, 1],
  13: [1, 0, 1, 1],
  14: [0, 1, 1, 1],
  15: [1, 1, 1, 1],
};
const compileStaticTileMap = (data) => {
  const {
    tileMap,
    tiles,
    useMapGrid,
    mapGrid,
    tileSetId,
    tileSetBase,
    returnTiles = true,
  } = data;
  if (!tiles) {
    return;
  }
  /** check if the mapGrid value is eqial to the 'hasElement' value
   * If not, then calculate the tile based on surrounding tiles;
   * Then create a src, along with dummy tile value merged from supplied.
   */
  const elementIndex = 15;
  const hasElementValue = "1";
  const hasPointValue = "2";
  const hasEncounterValue = "3";
  // const noElementValue = "0";
  const staticMapTiles = tiles.map((tile, i) => {
    const row = tile.location[1];
    const col = tile.location[0];
    const targetValue = tileMap[row][col];

    const isTileWithElement =
      targetValue === hasElementValue ||
      targetValue === hasPointValue ||
      targetValue === hasEncounterValue;
    console.log("targetValue", targetValue, isTileWithElement);
    let tileImageIndex;
    if (isTileWithElement) {
      tileImageIndex = elementIndex;
    } else {
      console.log("targetValue is not 1", targetValue);
      // calcualte as if exploring a tile....
      let isNorth = determinePossible({
        direction: "north",
        row,
        col,
        tileMap,
        useMapGrid,
        mapGrid,
      });
      let isEast = determinePossible({
        direction: "east",
        row,
        col,
        tileMap,
        useMapGrid,
        mapGrid,
      });
      let isSouth = determinePossible({
        direction: "south",
        row,
        col,
        tileMap,
        useMapGrid,
        mapGrid,
      });
      let isWest = determinePossible({
        direction: "west",
        row,
        col,
        tileMap,
        useMapGrid,
        mapGrid,
      });

      console.log("static values", { isNorth, isEast, isSouth, isWest });

      tileImageIndex = calculateImageIndex(isNorth, isEast, isSouth, isWest);
      if (
        isNorth === elementIndex &&
        isEast === elementIndex &&
        isSouth === elementIndex &&
        isWest === elementIndex
      ) {
        console.log(
          "this tile has all 15",
          {
            isNorth,
            isEast,
            isSouth,
            isWest,
          },
          "andtargetValue is",
          targetValue
        );
        tileImageIndex = 16;
      }
      if (i === 12) {
        console.log("this tile is index 12", {
          isNorth,
          isEast,
          isSouth,
          isWest,
        });
      }
    }

    const imageSrc = generateSrc({
      tileIndex: tileImageIndex,
      tileSetId,
      base: tileSetBase,
      blankIsJpg: false,
    });
    console.log("imageSrc", imageSrc);
    const optionObj = {
      newTileIndex: tileImageIndex,
      newTileSrc: imageSrc,
      newTileValue: 0,
      tile,
      location: [col, row],
    };

    const mergedTile = compileTile(optionObj);
    if (returnTiles) {
      return mergedTile;
    } else {
      return imageSrc;
    }
  });
  return staticMapTiles;
};

const compileTile = (data) => {
  const {
    tiles,
    newTileValue,
    newTileIndex,
    newTileSrc,
    location,
    walletAddress,
    tile,
  } = data;
  console.log("tiles", tiles);

  const tempTiles = tiles && [...tiles];
  const activeTile =
    tile ||
    (tempTiles && tempTiles.find((tile) => tile.location === location)) ||
    {};

  // const sourceTile = activeTile[0];
  const tempTile = {
    ...activeTile,
    meta: {
      value: newTileValue,
      owner: walletAddress,
      attack: null,
      defence: null,
      team: null,
      owner: null,
      creature: null,
    },
    index: newTileIndex,
    location: location,
    // title: "blah",
    // id: "123",
    src: newTileSrc,
  };
  // console.log("activeTile", activeTile);
  // console.log("tempTile", tempTile);
  // const resultObject = { test: "q234" };
  return tempTile;
};

const forceCalculateTile = (data) => {
  const {
    directions = { north: true, west: false, south: false, east: false },
    location,
    tileSetId,
  } = data;
  const { north, east, south, west } = directions;
  const tileImageIndex = calculateImageIndex(north, east, south, west);
  const imageSrc = generateSrc({
    tileIndex: tileImageIndex,
    tileSetId: tileSetId,
  });

  const resultObj = {
    tileImageIndex,
    imageSrc,
  };
  return resultObj;
};
const calculateTile = (data) => {
  const {
    location,
    tileMap,
    settings = { tileSetId: "QmcCeeuE1hxx9R8vfqLa8ma2jEyiqgzyntS1wGX8wFU3Me" },
    includeContext = false,
    tiles,
    force = "south",
    useMapGrid,
    mapGrid,
  } = data;
  const row = location[1];
  const col = location[0];
  console.log("calculteTile dataa", data);
  // const { minValue = 10, maxValue = 20 } = settings;
  const { preferConnection = true, connectionChance = 75 } = settings;
  if (!tileMap[row]) {
    console.error("missing tilemap 0");
    console.groupEnd();
    return;
  }
  if (useMapGrid) {
    console.group("use map grid");
    console.log("this is where the gridmap would function");
    console.groupEnd();
  }

  let isPossibleNorth = determinePossible({
    direction: "north",
    row,
    col,
    tileMap,
  });
  let isPossibleEast = determinePossible({
    direction: "east",
    row,
    col,
    tileMap,
  });
  let isPossibleSouth = determinePossible({
    direction: "south",
    row,
    col,
    tileMap,
  });
  let isPossibleWest = determinePossible({
    direction: "west",
    row,
    col,
    tileMap,
  });

  const possibles = {
    isPossibleNorth,
    isPossibleEast,
    isPossibleSouth,
    isPossibleWest,
  };
  if (includeContext) {
    console.log("includeContext", includeContext);
    const contextArray = generateContext({
      tiles,
      tileMap,
      location,
      row,
      col,
    });
    console.log("contextArray", contextArray);
  }
  console.log("possibles", possibles);
  let isNorth =
    isPossibleNorth === "maybe"
      ? generateUnknownDirection({ chance: connectionChance, preferConnection })
      : isPossibleNorth;
  let isEast =
    isPossibleEast === "maybe"
      ? generateUnknownDirection({ chance: connectionChance, preferConnection })
      : isPossibleEast;
  let isSouth =
    isPossibleSouth === "maybe"
      ? generateUnknownDirection({ chance: connectionChance, preferConnection })
      : isPossibleSouth;
  let isWest =
    isPossibleWest === "maybe"
      ? generateUnknownDirection({ chance: connectionChance, preferConnection })
      : isPossibleWest;
  const cardinals = {
    isNorth,
    isEast,
    isSouth,
    isWest,
  };
  if (preferConnection) {
    const hasTrue = isNorth || isEast || isSouth || isWest;
    if (!hasTrue) {
      const tempPossibles = [];
      isPossibleNorth && tempPossibles.push("north");
      isPossibleEast && tempPossibles.push("east");
      isPossibleSouth && tempPossibles.push("south");
      isPossibleWest && tempPossibles.push("west");
      const randIndex = random(0, tempPossibles.length, false);
      if (tempPossibles.length > 0) {
        // ie. if there's something we can posisbely change;
        const directionToChange = tempPossibles[randIndex];
        // console.log("directionToChange", directionToChange);
        if (directionToChange === "north") {
          isNorth = true;
        }
        if (directionToChange === "east") {
          isEast = true;
        }
        if (directionToChange === "south") {
          isSouth = true;
        }
        if (directionToChange === "west") {
          isWest = true;
        }
      }
    }
  }
  console.log("cardinals new", cardinals);
  const tileImageIndex = calculateImageIndex(isNorth, isEast, isSouth, isWest);
  const imageSrc = generateSrc({
    tileIndex: tileImageIndex,
    tileSetId: settings.tileSetId,
    // base: null,
    blankIsJpg: false,
  });

  const resultObj = {
    tileImageIndex,
    imageSrc,
    possibles,
    cardinals,
  };
  return resultObj;
};
const generateContext = (data) => {
  const { tileMap, location, row, col } = data;
  const tempArray = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  // const nextNumber = this.random(number, 15, false);
  const tile0 = calculateImageIndex(false, true, true, false);
  const tile1 = calculateImageIndex(false, true, true, true);
  const tile2 = calculateImageIndex(false, false, true, true);
  const tile3 = calculateImageIndex(true, false, true, false);
  const tile5 = calculateImageIndex(true, true, true, false);
  const tile6 = calculateImageIndex(true, true, false, false);
  const tile7 = calculateImageIndex(false, true, false, true);
  const tile8 = calculateImageIndex(true, true, false, true);
  tempArray[0] = tile0;
  tempArray[1] = tile1;
  tempArray[2] = tile2;
  tempArray[3] = tile3;
  // generated tlie is array[4]
  tempArray[5] = tile5;
  tempArray[6] = tile6;
  tempArray[7] = tile7;
  tempArray[8] = tile8;
  console.log("tempArray", tempArray);

  return tempArray;
};
const determinePossible = (options) => {
  const {
    direction,
    row,
    col,
    tileMap,
    mapMode = "static",
    useMapGrid = true,
  } = options;
  console.log("determinePossible options", options);
  if (!tileMap) {
    return;
  }

  /** possible outcomes: generatable, true, false */
  const wallValue = "0";
  const floorValue = "1";
  const pointValue = "2";
  const encounterValue = "3";
  const elementIndex = 15; // the index of s completely full tile
  const totelRows = tileMap[0].length;
  const totelCols = tileMap.length;
  const isFirstRow = mapMode !== "explore" && row === 0;
  const isLastCol = mapMode !== "explore" && col === totelRows - 1;
  const isLastRow = mapMode !== "explore" && row === totelCols - 1;
  const isFirstCol = mapMode !== "explore" && col === 0;
  console.log("determine:", {
    totelRows,
    totelCols,
    isFirstRow,
    isLastRow,
    isFirstCol,
    isLastCol,
  });
  /** CHeck For Edges of Map */
  if (direction === "north" && isFirstRow) {
    return false;
  }
  if (direction === "east" && isLastCol) {
    return false;
  }
  if (direction === "south" && isLastRow) {
    return false;
  }
  if (direction === "west" && isFirstCol) {
    return false;
  }

  /** CHeck For existence of tile
   * In this situation, the tile can have an index, which represents a tile.
   * we look for null or undefined, which means the tile is empty but can exist in the future.
   * ... TODO or refacor out
   */

  /** CHeck For existence of tile
   * In this situation, the tile can have an index, which represents a tile.
   * we look for null or undefined, which means the tile is empty but can exist in the future.
   */
  let targetIsGeneratable = false;
  const mapInverseDirections = {
    north: 2,
    east: 3,
    south: 0,
    west: 1,
  };
  // const mapTargetLocations = {
  //   'north' : tileMap[row - 1][col],
  //   'east' : tileMap[row][col +1],
  //   'south' : tileMap[row + 1][col],
  //   'west' : tileMap[row][col - 1],
  // }
  const invertDirection = mapInverseDirections[direction];

  console.log("invertDirection", invertDirection);
  let target;
  /** gets the image index in the target direction */
  if (direction === "north") {
    if (mapMode === "explore") {
      const isFirstRow = tileMap[row - 1];
      console.log("test for isNorth", isFirstRow);
    } else {
      target = tileMap[row - 1][col];
    }
  }
  if (direction === "east") {
    target = tileMap[row] && tileMap[row][col + 1];
  }
  if (direction === "south") {
    target = tileMap[row + 1] && tileMap[row + 1][col];
  }
  if (direction === "west") {
    target = tileMap[row] && tileMap[row][col - 1];
  }
  const targetTileSides = tileSidesMap[target];
  if (useMapGrid) {
    console.log("target value is String", typeof target);
    if (target === "0") {
      console.log('target is "0", and does not have element (is a wall)');
      return 0;
    }
    if (target === floorValue) {
      console.log('target is "1", and has element!');
      return elementIndex;
    }
    if (target === pointValue) {
      console.log('target is "2", and has floor + point');
      return elementIndex;
    }
    if (target === encounterValue) {
      console.log('target is "3", and has floor + encounter');
      return elementIndex;
    }
  }
  console.log("gene target", target);
  console.log("gene targetTileSides", targetTileSides);
  console.log("gene tileMap", tileMap);
  if (!targetTileSides) {
    // console.log("tile is not generated yet");
    targetIsGeneratable = true;
    // return 'generate'
  } else {
    const hasPath = targetTileSides[invertDirection] === 1 ? true : false; // gets the matching edge (clockwise 0, 1, 2, 3)
    console.log("hasPath", hasPath);
    return hasPath;
  }
  // console.log("targetIsGeneratable", targetIsGeneratable);

  if (targetIsGeneratable) {
    return "maybe";
  }
  /**if we get here somethign is missing */
  console.error("how did we get here?");
  return false;
};

const generateUnknownDirection = (options) => {
  const { chance = 75, preferConnection = true } = options;
  /** isf less than 75% then make a path */
  const number = random(0, 100, false);
  // console.log("isGeneratable number", number);
  return number < chance;
};

const calculateImageIndex = (north, east, south, west) => {
  /** uses a clockwise index system */
  var sum = 0;
  if (north) sum += 1;
  if (east) sum += 2;
  if (south) sum += 4;
  if (west) sum += 8;
  return sum;
};

const generateSrc = ({
  tileIndex,
  tileSetId = "QmcCeeuE1hxx9R8vfqLa8ma2jEyiqgzyntS1wGX8wFU3Me",
  base = "https://gateway.pinata.cloud/ipfs/QmcCeeuE1hxx9R8vfqLa8ma2jEyiqgzyntS1wGX8wFU3Me/",
  blankIsJpg = true,
}) => {
  const fileBase = tileSetId
    ? `https://gateway.pinata.cloud/ipfs/${tileSetId}/`
    : base;
  const newSrc = `${fileBase}${tileIndex}.${
    blankIsJpg && tileIndex === 0 ? "jpg" : "png"
  }`;
  console.log("newSrc", newSrc);
  return newSrc;
};
const random = (min, max, float = false) => {
  const val = Math.random() * (max - min) + min;
  if (float) {
    return val;
  }
  return Math.floor(val);
};

export { calculateTile, forceCalculateTile, compileTile, compileStaticTileMap };

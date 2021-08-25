import { createStore } from 'vuex'

const store = createStore({
    state: {
        isPlacingStartNode: false,
        isPlacingEndNode: false,
        isPlacingWeights: false,
        shouldFillWall: false,
        allowedToDraw: true,
        hasDrawnAlgorithm: false,
        weightAmount: 2,
        currentShortestDistance: Infinity,
        highlightedDistance: Infinity,
    },
    mutations: {
        setIsPlacingStartNode(state, placingStartNodeBoolean){
            state.isPlacingStartNode = placingStartNodeBoolean;
        },

        setIsPlacingEndNode(state, placingEndNodeBoolean){
            state.isPlacingEndNode = placingEndNodeBoolean;
        },

        setIsPlacingWeights(state, placingWeightsNodesBoolean){
            state.isPlacingWeights = placingWeightsNodesBoolean;
        },

        setShouldFillWall(state, shouldFillWallBoolean){
            state.shouldFillWall = shouldFillWallBoolean;
        },

        setAllowedToDraw(state, allowedToDrawBoolean){
            state.allowedToDraw = allowedToDrawBoolean;
        },
        
        setHasDrawnAlgorithm(state, hasDrawnAlgorithm){
            state.hasDrawnAlgorithm = hasDrawnAlgorithm;
        },

        updateWeightAmount(state, newWeightValue){
            state.weightAmount = newWeightValue;
        },

        updateCurrentShortestDistance(state, newShortestDistance){
            state.currentShortestDistance = newShortestDistance;
        },

        updateHighlightedDistance(state, newHighlightedDistance){
            state.highlightedDistance = newHighlightedDistance;
        }
    },

    getters: {
        drawingMode(state) {
            if (state.isPlacingStartNode) return "Start Node";

            if (state.isPlacingEndNode) return "End Node";

            if (state.isPlacingWeights) return "Weight(s)";

            return "Walls";
        },
    }
});

export default store;
import { createStore } from 'vuex'

const store = createStore({
    state: {
        isPlacingStartNode: false,
        isPlacingEndNode: false,
        isPlacingWeights: false,
        shouldFillWall: false,
        allowedToDraw: true,
        hasDrawnAlgorithm: false,
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
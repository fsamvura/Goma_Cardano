import { createStore, action } from "easy-peasy";

const store = createStore({
    connection: {
        connected: null,
        setConnected: action((state, payload) => {
            state.connected = payload;
        }),
    },
    ownedUtxos : {
        utxos: [],
        add: action((state, payload) => {
            state.utxos = payload;
        }),
    },
});

export default store;
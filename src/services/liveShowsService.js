import {db} from "../config/firebase";

const COLLECTION_NAME = 'live-shows'

const getAll = () => {
    return new Promise( (resolve, reject) => {
        db.collection(COLLECTION_NAME)
            .get()
            .then( result => {
                resolve(result.docs)
            })
    })
}

const getAllOrderByTimestampDESC = () => {
    return new Promise( (resolve, reject) => {
        db.collection(COLLECTION_NAME)
            .orderBy('timestamp', 'desc')
            .get()
            .then( result => {
                resolve(result.docs)
            })
    })
}


export const LiveShowService = {
    getAll,
    getAllOrderByTimestampDESC
}
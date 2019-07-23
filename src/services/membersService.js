import {db} from "../config/firebase";

const COLLECTION_NAME = 'members'

const getAll = () => {
    return new Promise( (resolve, reject) => {
        db.collection(COLLECTION_NAME)
            .get()
            .then( result => {
                resolve(result.docs)
            })
    })
}

const getAllOrderByCourseASC = () => {
    return new Promise( (resolve, reject) => {
        db.collection(COLLECTION_NAME)
            .orderBy('course')
            .get()
            .then( result => {
                resolve(result.docs)
            })
    })
}

const getAllOrderByChairmanDESC = () => {
    return new Promise( (resolve, reject) => {
        db.collection(COLLECTION_NAME)
            .orderBy('chairman', "desc")
            .get()
            .then( result => {
                resolve(result.docs.filter(doc => doc.data().chairman !== ''))
            })
    })
}
const getAllOrderByChairmanASC = () => {
    return new Promise( (resolve, reject) => {
        db.collection(COLLECTION_NAME)
            .orderBy('chairman')
            .get()
            .then( result => {
                resolve(result.docs.filter(doc => doc.data().chairman !== ''))
            })
    })
}

const onSnapshot = (snapshot) => {
    return db.collection(COLLECTION_NAME).onSnapshot(snapshot)
}

const addNew = (requestBody) => {
    return new Promise( (resolve, reject) => {
        db.collection(COLLECTION_NAME)
            .add(requestBody)
            .then( resolve)
    })
}

const remove = (id) => {
    return new Promise( (resolve, reject) => {
        db.collection(COLLECTION_NAME)
            .doc(id)
            .delete()
            .then(resolve)
    })
}
const update = (id, requestBody) => {
    return new Promise( (resolve, reject) => {
        db.collection(COLLECTION_NAME)
            .doc(id)
            .set(requestBody)
            .then(resolve)
    })
}


export const MemberService = {
    getAll,
    addNew,
    onSnapshot,
    getAllOrderByCourseASC,
    getAllOrderByChairmanDESC,
    getAllOrderByChairmanASC,
    remove,
    update
}
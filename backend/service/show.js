const Show = require("../models/show")

const isShow = async (showId) => {
    try {
        const show = await Show.findById(showId)
        return {show,error: null}
    } catch (error) {
        return {show:null, error}
    }
}

const existingShow = async (theaterId,movieId) => {
    try {
        const show = await Show.find({theaterId,movieId})
        return {show,error: null}
    } catch (error) {
        return {show:null, error}
    }
}

module.exports = {
    isShow,
    existingShow
}
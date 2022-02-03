module.exports = (app)=>{
    /**
     * Authentication Routes
     */
    require('./auth')(app)

    /**
     * User Routes
     */
    // require('./User')(app)
}
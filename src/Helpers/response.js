exports.successResponse = (res, code, message, data)=>{
    return res.status(code).json({
        "success": true,
        "message": message,
        "data": data
    })
}

exports.errorResponse = (res, code, message, data)=>{
    return res.status(code).json({
        "success": false,
        "message": message,
        "data": data        
    })
}
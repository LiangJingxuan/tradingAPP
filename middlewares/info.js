module.exports={
    // 失败提示信息
    err (err){
        return {
            msg: err,
            i: false
        }
    },
    // 成功提示信息
    suc (suc){
        return {
            msg: suc,
            i: true
        }
    },
    // 分页返回信息
    paging (dataList,page,totalPage,totalRows){
        return {
            dataList,
            page,
            totalPage,
            totalRows: totalRows[0].n
        }
    }

};
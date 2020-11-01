const path = require("path");
const fs = require("fs");
// 具体业务
const data = require("../data.json");
// 自动生成图书编号
let maxBookCode = () => {
    let arr = [];
    data.forEach(item => {
        arr.push(item.id)
    })
    return Math.max.apply(null, arr)
}

exports.showIndex = (req, res) => {
    // console.log(req, res)
    res.render("index", {list: data})
}

exports.toAddBook = (req, res) => {
    res.render("add", {})
}

// 添加图书保存数据
exports.addBook = (req, res) => {
    // 获取表单数据
    let info = req.body;
    let book = { ...info };
    book.id = maxBookCode() + 1;
    data.push(book); // 放入内存中
    // 将数据写入到文件中
    fs.writeFile(path.join(__dirname, "data.json"), JSON.stringify(data), (err) => {
        if(err) {
            res.send("500 server error")
        }
        // 文件写入成功之后重新跳转到列表页
        res.redirect("/")
    })
}

// 跳转到编辑页面
exports.toEdit = (req, res) => {
    let currentId = req.query.id;
    let book = {};
    data.forEach(item => {
        if(item.id == currentId) {
            book = item;
            return;
        }
    });
    res.render("edit", book)
}

// 修改图书
exports.editBook = (req, res) => {
    let info = req.body;
    data.forEach(item => {
        if(item.id == info.id) {
            for (const key in info) {
                if (Object.hasOwnProperty(key)) {
                    item[key] = info[key]
                }
            }
            return;
        }
    })
    // 写入数据至文件
    fs.writeFile(path.join(__dirname, "data.json"), JSON.stringify(data), (err) => {
        if(err) {
            res.send("500 server error")
        }
        // 文件写入成功之后重新跳转到列表页
        res.redirect("/")
    })
}
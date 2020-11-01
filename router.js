// 路由模块
const express = require("express");
const router = express.Router();
const service = require("./service/service.js");

// 首页
router.get("/", service.showIndex);
// 添加图书
router.get("/add", service.toAddBook)
// 添加图书（提交表单）
router.post("/addBook", service.addBook)
// 跳转至编辑页面
router.get("/toEdit", service.toEdit)
// 编辑图书，提交表单数据
router.post("/editBook", service.editBook)


module.exports = router;

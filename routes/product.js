const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
var Product = require('../models/product');

function xoadau(str) {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");


    return str;
}

router.route('/search').post((req, res) => {
    let a = req.body.search;
    const kq = [];

    Product.find({}, (err, result) => {
        if (err) throw err;
        a = xoadau(a);
        console.log(a);
        a = a.split(" ");
        for (let i = 0; i < result.length; i++) {
            let b = result[i].name;
            b = xoadau(b);
            console.log(b);
            b = b.split(" ");
            for (let e = 0; e < a.length; e++) {
                let num = 0;
                for (let r = 0; r < b.length; r++) {
                    if (a[e] == b[r]) num++;
                }
                if (num > 0) {
                    console.log(result[i].name + "");
                    kq.push(result[i]);
                    e = a.length;
                }
            }
        }
        console.log("   " + kq);
        return res.render('searchresult', {
            product: kq,
            user: req.user,
            search: "Hien thi ket qua cho: " + req.body.search
        });
    })
});
router.route('/brand/:brand([a-zA-z0-9]{1,100})').get((req, res) => {
    let a = req.params.brand;
    const kq = [];

    Product.find({}, (err, result) => {
        if (err) throw err;
        a = xoadau(a);
        console.log(a);
        a = a.split(" ");
        for (let i = 0; i < result.length; i++) {
            let b = result[i].brand;
            b = xoadau(b);
            console.log(b);
            b = b.split(" ");
            for (let e = 0; e < b.length; e++) {
                let num = 0;
                for (let r = 0; r < a.length; r++) {
                    if (b[e] == a[r]) num++;
                }
                if (num > 0) {
                    console.log(result[i].brand + "");
                    kq.push(result[i]);
                    e = b.length;
                }
            }
        }
        console.log("   " + kq);
        return res.render('searchresult', {
            product: kq,
            user: req.user,
            search: req.body.search
        });
    });

});
router.route('/brand/:brand([a-zA-z0-9]{1,100})').post((req, res) => {
    let a = req.params.brand;
    const kq = [];

    Product.find({}, (err, result) => {
        if (err) throw err;
        a = xoadau(a);
        console.log(a);
        a = a.split(" ");
        for (let i = 0; i < result.length; i++) {
            let b = result[i].brand;
            b = xoadau(b);
            console.log(b);
            b = b.split(" ");
            for (let e = 0; e < a.length; e++) {
                let num = 0;
                for (let r = 0; r < b.length; r++) {
                    if (a[e] == b[r]) num++;
                }
                if (num > 0) {
                    console.log(result[i].brand + "");
                    kq.push(result[i]);
                    e = b.length;
                }
            }
        }
        console.log("   " + kq);
        return res.render('searchresult', {
            product: kq,
            user: req.user,
            search: req.body.search
        });
    });

});
router.route('/category/:category([a-zA-z0-9%]{1,100})').get((req, res) => {
    let a = req.params.category;
    a = xoadau(a);
    a = a.split(" ");
    let kq = [];
    console.log(a);
    Product.find({}, (err, result) => {
        if (err) throw err;
        console.log(result.length)
        for (let i = 0; i < result.length; i++) {
            let b = result[i].categories;
            b = xoadau(b);
            b = b.split(" ");
            for (let e = 0; e < a.length; e++) {
                let num = 0;
                for (let r = 0; r < b.length; r++) {
                    if (a[e] == b[r]) num++;
                }
                if (num > 0) {
                    console.log(result[i].categories + "j");
                    kq.push(result[i]);
                    e = a.length;
                }
            }
        }
        console.log("   " + kq);
        return res.render('searchresult', {
            product: kq,
            user: req.user,
            search: "Danh muc nganh: " + req.params.category
        })
    })

})
router.route('/brand/:brand([a-zA-z0-9]{1,100})').post((req, res) => {
    let a = req.params.brand;
    const kq = [];

    Product.find({}, (err, result) => {
        if (err) throw err;
        a = xoadau(a);
        console.log(a);
        a = a.split(" ");
        for (let i = 0; i < result.length; i++) {
            let b = result[i].categories;
            b = xoadau(b);
            console.log(b);
            b = b.split(" ");
            for (let e = 0; e < a.length; e++) {
                let num = 0;
                for (let r = 0; r < b.length; r++) {
                    if (a[e] == b[r]) num++;
                }
                if (num > 0) {
                    console.log(result[i].categories + "");
                    kq.push(result[i]);
                }
            }
        }
        console.log("   " + kq);
        return res.render('searchresult', {
            product: kq,
            user: req.user,
            search: req.body.search
        });
    });

});

router.route('/getinfor/:id([a-zA-Z0-9]{1,100})').get((req, res) => {
    let a = req.params;
    console.log(a);
    Product.findById(a.id, (err, result) => {
        if (err) throw err;
        else {

            if(!req.user){
                console.log("ok");
                res.render('getinforproduct',{
                    user:req.user,
                    product:result,
                    x:0
                })
            }
            if(req.user){
                let id = req.user._id.toString();
            let dem1 = 0,dem2=0;
            for (let i = 0; i < result.like.length; i++) {
                let id1 = result.like[i].toString();
                if (id == id1) {
                    dem1++; break;
                }

            }
            for (let i = 0; i < result.dislike.length; i++) {
                let id1 = result.dislike[i].toString();
                if (id == id1) {
                    dem2++; break;
                }

            }

            console.log(result);
           if(dem1==0&&dem2==0){
            res.render('getinforproduct', {
                product: result,
                user: req.user,
                x: 0
            })
           }
           if(dem1>0){
            res.render('getinforproduct', {
                product: result,
                user: req.user,
                x: 9
            })
           }
           if(dem2>0){
            res.render('getinforproduct', {
                product: result,
                user: req.user,
                x: -1
            })
           }
            }
        }
    })

});


router.route('/getinfor/:id([a-zA-Z0-9]{1,100})').post((req, res) => {
    let a = req.params;
    console.log(a);

    Product.findById(a.id, (err, result) => {
        if (err) throw err;
        else {
            console.log(result);
            res.json(result);
        }
    });
});
router.route('/:categories([a-zA-Z0-9]{1,100})/brand/:brand([a-zA-Z0-9]{1,100})').post((req, res) => {
    console.log(req.params);
    Product.find({
        categories: req.params.categories,
        brand: xoadau(req.params.brand)
    }, (err, result) => {
        if (err) throw err;
        if (result.length == 0) {
            res.render('message', {
                user: req.user,
                message: "Khong tim thay san pham",
                product: []
            })
        }
        console.log(result);
        if (result.length > 0) {
            res.render('searchresult', {
                user: req.user,
                search: "Danh sach san pham",
                product: result
            })
        }
    })
})
router.route('/:categories([a-zA-Z0-9]{1,100})/brand/:brand([a-zA-Z0-9]{1,100})').get((req, res) => {
    console.log(req.params);
    Product.find({
        categories: req.params.categories,
        brand: xoadau(req.params.brand)
    }, (err, result) => {
        if (err) throw err;
        if (result.length == 0) {
            res.render('message', {
                user: req.user,
                message: "Khong tim thay san pham",
                product: []
            })
        }
        console.log(result);
        if (result.length > 0) {
            res.render('searchresult', {
                user: req.user,
                search: "Danh sach san pham " + req.params.categories + " cua nha san xuat  " + req.params.brand,
                product: result
            })
        }
    })
});
router.route('/other').get((req, res) => {
    Product.find({
        categories: "other"
    }, (err, result) => {
        if (err) throw err;
        if (result.length == 0) {
            res.render('searchresult', {
                user: req.user,
                search: "Khong tim thay san pham hop le.",
                product: []
            })
        }
        if (result.length > 0) {
            res.render('searchresult', {
                user: req.user,
                search: "Danh sach cac san pham phu kien",
                product: result
            })
        }
    })
})
router.route('/other').post((req, res) => {
    Product.find({
        categories: "other"
    }, (err, result) => {
        if (err) throw err;
        if (result.length == 0) {
            res.render('searchresult', {
                user: req.user,
                search: "Khong tim thay san pham hop le.",
                product: []
            })
        }
        if (result.length > 0) {
            res.render('searchresult', {
                user: req.user,
                search: "Danh sach cac san pham phu kien",
                product: result
            })
        }
    })
})
router.route('/store/:id([a-zA-Z0-9]{1,100})').get((req, res) => {

})
router.route('/answer/:id([a-zA-Z0-9]{1,100})/:s([0-9]{1,1000})').post((req,res)=>{
    let a=req.params.id;
    let s=req.params.s;
    console.log(s);
    console.log(a);
    let b=req.body.comment;
    console.log(b);
   
    Product.update({
        _id:a,
        "comment.idcomment":s
    },{
     $set :{"comment.$.answer":b}
    },(err,result)=>{
        if(err) throw err;
        let c="/product/getinfor/";
        c=c+a;
        console.log(result);
       res.redirect(c);

    })
})


module.exports = router;

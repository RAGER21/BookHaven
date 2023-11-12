import express from 'express'

const router = express.Router();


router.get("/", (req, res) =>{
  res.render("logreg");
})

router.get("/index", (req,res) =>{
  res.render('index');
})

/*router.get("/register", (req, res) =>{
  res.render("logreg");
})
*/

router.get()


export default router;
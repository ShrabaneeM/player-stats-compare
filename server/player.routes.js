const router = require('express').Router();
const Player = require('./player.model');

router.post('/setData', async (req, res) => {
    const player = req.body;
    let newPlayer = new Player(player);

    let done = await newPlayer.save();
   
    return res.status(200).send({msg : 'done'});
});

module.exports = router;
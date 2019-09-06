const router = require('express').Router();
const Player = require('./player.model');

router.post('/setData', async (req, res) => {
    const player = req.body;
    let newPlayer = new Player(player);

    let done = await newPlayer.save();
   
    return res.status(200).send({msg : 'done'});
});

router.get('/getAllPlayers', async (req, res) => {
    Player.find({}).exec((err, playerRecords) => {
        if(err) {
            console.log(err)
            return res.status(401).send({msg : 'some error'});
        }
        return res.status(200).send(playerRecords);
    });
    
});

router.post('/getData', async (req, res) => {
    const { playerIds } = req.body;
    Player.find({_id : {$in : playerIds}}).exec((err, playerRecords) => {
        if(err) {
            console.log(err)
            return res.status(401).send({msg : 'some error'});
        }
        return res.status(200).send(playerRecords);
    });
    
});

module.exports = router;
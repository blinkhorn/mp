const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Memory = require('../../models/Memory');
const User = require('../../models/User');

// @route    POST api/memories
// @desc     Create a memory
// @access   Private
router.post(
    '/',
    [
        auth,
        [
            check('topic', 'Topic is required')
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const user = await User.findById(req.user.id).select('-password');

            const newMemory = new Memory({
                topic: req.body.topic,
                name: user.name,
                user: req.user.id
            });

            const memory = await newMemory.save();

            res.json(memory);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route    GET api/memories
// @desc     Get all memories
// @access   Private
router.get('/', auth, async (req, res) => {
    try {
        const memories = await Memory.find().sort({ date: -1 });
        res.json(memories);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route    GET api/memories/:id
// @desc     Get memory by ID
// @access   Private
router.get('/:id', auth, async (req, res) => {
    try {
        const memory = await Memory.findById(req.params.id);

        if (!memory) {
            return res.status(404).json({ msg: 'Memory not found' });
        }
        res.json(memory);
    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Memory not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @route    DELETE api/memories/:id
// @desc     Delete a memory
// @access   Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const memory = await Memory.findById(req.params.id);

        if (!memory) {
            return res.status(404).json({ msg: 'Memory not found' });
        }

        // check user
        if (memory.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await memory.remove();

        res.json({ msg: 'Memory removed' });
    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Memory not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @route    POST api/memories/image/:id
// @desc     Add images for what you want to remember
// @access   Private
router.post(
    '/image/:id',
    [
        auth,
        [
            check('memory', 'Memory is required')
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const user = await User.findById(req.user.id).select('-password');
            const memory = await Memory.findById(req.params.id);

            const newImage = {
                memory: req.body.memory,
                name: user.name,
                imageURL: req.body.imageURL,
                user: req.user.id
            };

            memory.images.unshift(newImage);

            await memory.save();

            res.json(memory.images);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route    DELETE api/memories/image/:id/:image_id
// @desc     Delete image
// @access   Private
router.delete('/image/:id/:image_id', auth, async (req, res) => {
    try {
        const memory = await Memory.findById(req.params.id);

        // pull out image
        const image = memory.images.find(
            image => image.id === req.params.image_id
        );

        // make sure image exists
        if (!image) {
            return res.status(404).json({ msg: 'Image does not exits' });
        }
        // check user
        if (image.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        // Get remove index
        const removeIndex = memory.images
            .map(image => image.id)
            .indexOf(req.params.image_id);

        memory.images.splice(removeIndex, 1);

        await memory.save();

        res.json(memory.images);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});
module.exports = router;

const express = require('express');
const tagsRouter = express.Router();
const { getPostsByTagName } = require('../database');

tagsRouter.use((req, res, next) => {
  console.log("A request is being made to /tags");

  next();
});

tagsRouter.get('/:tagName/posts', async (req, res, next) => {
  const { tagName } = req.params;
  try {
    const allTags = await getPostsByTagName(tagName);

    const tags = allTags.filter(tag => {
      if (tag.active) {
        return true;
      } else if (req.user && post.author.id === req.user.id) {
        return true;
      } else {
        return false;
      }
    });

    res.send({
      tags
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

tagsRouter.get('/', async (req, res) => {
    const tags = await getAllTags();

    res.send({
      tags
    });
  });

module.exports = tagsRouter;
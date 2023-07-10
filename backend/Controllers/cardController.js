import Card from '../models/card.js';

import NotFoundError from '../errors/NotFoundError.js';
import InaccurateDataError from '../errors/InaccurateDataError.js';
import ForbiddenError from '../errors/ForbiddenError.js';

const getAllCards = (req, res, next) => {
  Card
    .find({})
    .populate(['owner', 'likes'])
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const { userId: ownerId } = req.user;
  Card
    .create({ name, link, owner: ownerId })
    .then((card) => {
      card
        .populate('owner')
        .then(() => res.status(201).send(card))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new InaccurateDataError('Переданы некорректные данные при создании карточки'));
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  const { id: cardId } = req.params;
  const { userId } = req.user;

  Card
    .findById({
      _id: cardId,
    })
    .then((card) => {
      if (!card) throw new NotFoundError('Данные по указанному id не найдены');

      const { owner: cardOwnerId } = card;
      if (cardOwnerId.valueOf() !== userId) throw new ForbiddenError('Нет прав доступа');

      card.deleteOne()
        .then(() => res.send(card))
        .catch(next);
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  const { cardId } = req.params;
  const { userId } = req.user;
  Card
    .findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: userId } },
      { new: true },
    )
    .populate(['owner', 'likes'])
    .orFail(() => {
      throw new NotFoundError('Карточка с указанным id не найдена');
    })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new InaccurateDataError('Переданы некорректные данные при добавлениилайка карточке'));
      } else {
        next(err);
      }
    });
};

const dislikeCard = (req, res, next) => {
  const { cardId } = req.params;
  const { userId } = req.user;
  Card
    .findByIdAndUpdate(
      cardId,
      { $pull: { likes: userId } },
      { new: true },
    )
    .populate(['owner', 'likes'])
    .orFail(() => {
      throw new NotFoundError('Карточка с указанным id не найдена');
    })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new InaccurateDataError('Переданы некорректные данные при снятии лайка карточки'));
      }
      return next(err);
    });
};

export {
  getAllCards, createCard, deleteCard, likeCard, dislikeCard,
};

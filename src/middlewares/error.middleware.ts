import type { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  try {
    console.log(err);
  } catch (err) {
    next(err);
  }
};

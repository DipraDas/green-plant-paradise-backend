import mongoose from "mongoose";
import { TGenericErrorResponse } from "../instances/error";

const handleCastError = (
  err: mongoose.Error.CastError
): TGenericErrorResponse => {
  const errorSources = [
    {
      path: err?.path,
      message: err?.message,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: "Invalid id",
    errorSources,
  };
};

export default handleCastError;

﻿namespace Domain.Common
{
    public class Result
    {
        public bool IsSuccess { get; }
        public string Error { get; }
        public bool IsFailure => !IsSuccess;

        protected Result(bool isSuccess, string error)
        {
            IsSuccess = isSuccess;
            Error = error;
        }

        public static Result Ok() => new(true, string.Empty);
        public static Result Fail(string error) => new(false, error);
        public static Result<T> Ok<T>(T value) => new(value, true, string.Empty);
        public static Result<T> Fail<T>(string error) => new(default, false, error);
    }

    public class Result<T> : Result
    {
        public T Value { get; }

        protected internal Result(T value, bool isSuccess, string error)
            : base(isSuccess, error)
        {
            Value = value;
        }
    }
}
namespace TodoApi.Exceptions;

public class FailedGetElementFromDatabaseException : Exception
{
    public FailedGetElementFromDatabaseException()
        : base("Error retrieving an item from the database") { }
}

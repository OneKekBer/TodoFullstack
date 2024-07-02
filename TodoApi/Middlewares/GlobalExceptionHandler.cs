using System.Net;
using System.Text.Json;

public class GlobalExceptionHandler
{
    private readonly RequestDelegate _next;
    private readonly ILogger<GlobalExceptionHandler> _logger;

    public GlobalExceptionHandler(ILogger<GlobalExceptionHandler> logger, RequestDelegate next)
    {
        _logger = logger;
        _next = next;
    }

    public async Task InvokeAsync(HttpContext httpContext)
    {
        try 
        {
            _logger.LogInformation("GlobalExceptionMiddleware is working!");
            await _next(httpContext);
        }
        catch (Exception ex)
        {
            _logger.LogError("something went wrong");
            await HandleExceptionAsync(httpContext, ex);
        }
    }

    private Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        _logger.LogInformation("HandleExceptionAsync is working");
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

        var response = new
        {
            StatusCode = context.Response.StatusCode,
            Message = "Internal Server Error. Please try again later.",
            Detailed = exception.Message  // Optionally include detailed information
        };

        var jsonResponse = JsonSerializer.Serialize(response);

        return context.Response.WriteAsync(jsonResponse);
    }
}


using Microsoft.AspNetCore.Http;
using System.Net;
using System.Text.Json;

namespace TodoApi.Middlewares;

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
            await _next(httpContext);
        }
        catch(BadHttpRequestException ex)
        {
            await HandlerBadRequestException(httpContext, ex);
        }
        catch (Exception ex)
        {
            await GlobalHandlerException(httpContext, ex);
        }
    }

    private Task HandlerBadRequestException(HttpContext context, BadHttpRequestException exception)
    {
        _logger.LogError(exception.Message);
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)HttpStatusCode.BadRequest;

        var response = new
        {
            Message = exception.Message,
        };

        var jsonResponse = JsonSerializer.Serialize(response);

        return context.Response.WriteAsync(jsonResponse);
    }

    private Task GlobalHandlerException(HttpContext context, Exception exception)
    {
        _logger.LogError(exception.Message);
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

        var response = new
        {
            Message = "Internal Server error" 
        };

        var jsonResponse = JsonSerializer.Serialize(response);

        return context.Response.WriteAsync(jsonResponse);
    }
}


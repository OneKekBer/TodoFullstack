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
            await BadRequestHandlerException(httpContext, ex);
        }
        catch (Exception ex)
        {
            await GlobalHandlerException(httpContext, ex);
        }
    }

    private Task BadRequestHandlerException(HttpContext context, BadHttpRequestException exception)
    {
        _logger.LogError(exception.Message);
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

        var response = new
        {
            StatusCode = context.Response.StatusCode, //maybe its useless
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
            StatusCode = context.Response.StatusCode, //maybe its useless
            Message = "Internal Server error" 
        };

        var jsonResponse = JsonSerializer.Serialize(response);

        return context.Response.WriteAsync(jsonResponse);
    }
}


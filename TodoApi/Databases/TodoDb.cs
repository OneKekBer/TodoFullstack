using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using TodoApi.Models;

public class TodoDb : DbContext
{
    public TodoDb(DbContextOptions<TodoDb> options)
        : base(options)
    { }

    public DbSet<Todo> Todos { get; set; }
}
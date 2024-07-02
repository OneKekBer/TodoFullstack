using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace TodoApi.Controllers
{
    [ApiController]
    [Route("api/todo")]
    [EnableCors("AllowSpecificOrigin")]
    public class TodoController : Controller
    {
        private readonly TodoDb _db;
        private readonly ILogger<TodoController> _logger;

        public TodoController(TodoDb db, ILogger<TodoController> logger) 
        {
            _db = db;
            _logger = logger;
        }

        [HttpPost]
        public async Task<IActionResult> CreateTodo([FromBody] TodoCreateDTO todoCreateDTO)
        {
            _logger.LogInformation("creating new todo....");
            if (todoCreateDTO.Title == String.Empty)
                return BadRequest();
            var processedDto = new Todo { Title = todoCreateDTO.Title, Id = Guid.NewGuid() }; 

            await _db.AddAsync(processedDto);
            await _db.SaveChangesAsync();

            return Ok(processedDto.Id);
        }

        //toggle iscompleted
        [HttpGet("{id}")]
        public async Task<IActionResult> ToggleTodoById(Guid id)
        {
            var todoItem = await _db.Todos.FirstOrDefaultAsync(todo => todo.Id == id);

            todoItem.ToggleTodo();

            _db.Todos.Update(todoItem);
            await _db.SaveChangesAsync();

            return Ok(todoItem);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Todo>>> GetTodos()
        {
            var allTodos = await _db.Todos.ToListAsync();

            return Ok(allTodos);
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> EditTodoById(Guid id, [FromBody] TodoEditDto todoEditDto)
        {
            var todoItem = await _db.Todos.FirstOrDefaultAsync(todo => todo.Id == id);
 
            todoItem.Title = todoEditDto.Title;

            _db.Todos.Update(todoItem);
            await _db.SaveChangesAsync();

            return Ok(todoItem);
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodo(Guid id)
        {
            var todoItem = await _db.Todos.FirstOrDefaultAsync(todo => todo.Id == id);

            _db.Todos.Remove(todoItem);

            await _db.SaveChangesAsync();

            return Ok();
        }
    }
}

using Asp.Versioning;
using AutoMapper;
using BLL.Contracts.App;
using DAL.Contracts.App;
using Microsoft.AspNetCore.Mvc;
using Domain.App;
using Helpers.Base;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Public.DTO.Mappers;

namespace WebApp.ApiControllers
{
    [ApiVersion("1.0")]
    [ApiController]
    [Route("api/v{version:apiVersion}/[controller]")]
    public class WorkoutsController : ControllerBase
    {
        private readonly IAppBLL _bll;
        private readonly WorkoutMapper _mapper;

        public WorkoutsController(IMapper autoMapper, IAppBLL bll)
        {
            _bll = bll;
            _mapper = new WorkoutMapper(autoMapper);
        }


        /// POST: api/v{version}/Workouts
        /// <summary>
        /// Add workout
        /// </summary>
        /// <param name="workout">workout info</param>
        /// <returns>Added workout with id</returns>
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<Public.DTO.v1.WorkoutDTO>> PostWorkout(Public.DTO.v1.WorkoutDTO workout)
        {
            var bllWorkout = _mapper.Map(workout);
            if (bllWorkout == null)
            {
                return BadRequest("error while adding workout");
            }

            var res = _bll.WorkoutService.Add(bllWorkout);
            await _bll.SaveChangesAsync();
            return Ok(res);
        }


        // GET: api/v{version}/Workouts
        /// <summary>
        /// Get all workouts
        /// </summary>
        /// <returns>Mapped workouts</returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Public.DTO.v1.WorkoutDTO>>> GetWorkouts()
        {
            var data = await _bll.WorkoutService.AllAsync();
            var res = data.Select(e => _mapper.Map(e)).ToList();
            return Ok(res);
        }

        // GET: api/v{version}/Workouts/{id}
        /// <summary>
        /// Get workout by id
        /// </summary>
        /// <param name="id">searching id</param>
        /// <returns>Mapped workout</returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<Public.DTO.v1.WorkoutDTO>> GetWorkout(Guid id)
        {
            var workout = await _bll.WorkoutService.FindAsync(id);

            if (workout == null)
            {
                return NotFound();
            }

            var res = _mapper.Map(workout);

            return Ok(res);
        }

        // POST: api/v{version}/Workouts/Date
        /// <summary>
        /// Get all workouts on a specific date
        /// </summary>
        /// <param name="workout">workout info with date and id</param>
        /// <returns>Mapped workouts on a specific date</returns>
        [HttpPost("Date")]
        public async Task<ActionResult<Public.DTO.v1.WorkoutDTO>> GetWorkoutByDate(Public.DTO.v1.WorkoutDTO workout)
        {
            var date = workout.StartDate;
            var workoutTypeId = workout.WorkoutTypeId;
            var workoutResp = await _bll.WorkoutService.AllAsyncByDate(date, workoutTypeId);


            var res = workoutResp.Select(e => _mapper.Map(e)).ToList();

            return Ok(res);
        }

        // DELETE: api/Workouts/{id}
        /// <summary>
        /// Delete workout by id
        /// </summary>
        /// <param name="id">deleting id</param>
        [HttpDelete("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> DeleteWorkout(Guid id)
        {
            var workout = await _bll.WorkoutService.FindAsync(id);

            if (workout == null)
            {
                return NotFound();
            }

            var workoutCheck = await _bll.WorkoutService.IsOwnedByUserAsync(id, User.GetUserId());

            if (!workoutCheck)
            {
                return BadRequest("No hacking (bad user id)!");
            }

            await _bll.WorkoutService.RemoveAsyncById(id);
            await _bll.SaveChangesAsync();

            return NoContent();
        }


        // PUT: api/Workouts/5
        /// <summary>
        /// Update workout information
        /// </summary>
        /// <returns>Mapped workouts</returns>
        /// <param name="id">update workout id</param>
        /// <param name="workout">Updated user</param>
        [HttpPut("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> PutWorkout(Guid id, Public.DTO.v1.WorkoutDTO workout)
        {
            if (id != workout.Id)
            {
                return BadRequest();
            }

            var workoutCheck = await _bll.WorkoutService.IsOwnedByUserAsync(id, User.GetUserId());

            if (!workoutCheck)
            {
                return BadRequest("No hacking (bad user id)!");
            }


            var bllWorkout = _mapper.Map(workout);

            bllWorkout!.AppUserId = User.GetUserId();

            _bll.WorkoutService.Update(bllWorkout);


            await _bll.SaveChangesAsync();

            return NoContent();
        }
    }
}
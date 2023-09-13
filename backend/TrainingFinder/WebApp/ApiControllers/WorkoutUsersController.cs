using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Asp.Versioning;
using AutoMapper;
using BLL.Contracts.App;
using DAL.Contracts.App;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DAL.EF.App;
using Domain.App;
using Helpers.Base;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using NuGet.Protocol;
using Public.DTO.Mappers;
using Public.DTO.v1;

namespace WebApp.ApiControllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class WorkoutUsersController : ControllerBase
    {
        private readonly IAppBLL _bll;
        private readonly ScheduleMapper _mapper;
        private readonly ApplicationDbContext _context;


        public WorkoutUsersController(IMapper autoMapper, IAppBLL bll, ApplicationDbContext context)
        {
            _bll = bll;
            _context = context;
            _mapper = new ScheduleMapper(autoMapper);
        }


        // POST: api/WorkoutUsers/schedule
        /// <summary>
        /// Get schedule for specific user
        /// </summary>
        /// <returns>Mapped schedule for specific user</returns>
        [HttpGet]
        public async Task<ActionResult<Public.DTO.v1.ScheduleDTO>> GetScheduleByUserId()
        {
            var workoutUser = new ScheduleDTO();
            workoutUser.AppUserId = User.GetUserId();

            var mapperSchedule = _mapper.Map(workoutUser);

            if (mapperSchedule == null)
            {
                return NotFound();
            }

            var data = await _bll.WorkoutUserService.GetScheduleForUser(mapperSchedule);
            var res = data.Select(e => _mapper.Map(e)).ToList();

            return Ok(res);
        }

        // POST: api/WorkoutUsers/schedule
        /// <summary>
        /// Get schedule for specific user
        /// </summary>
        /// <returns>Mapped schedule for specific user</returns>
        [HttpGet("history")]
        public async Task<ActionResult<Public.DTO.v1.ScheduleDTO>> GetHistoryByUserId()
        {
            var workoutUser = new ScheduleDTO();
            workoutUser.AppUserId = User.GetUserId();
            var mapperSchedule = _mapper.Map(workoutUser);

            if (mapperSchedule == null)
            {
                return NotFound();
            }

            var data = await _bll.WorkoutUserService.GetHistoryForUser(mapperSchedule);

            var res = data.Select(e => _mapper.Map(e)).ToList();

            return Ok(res);
        }


        // POST: api/WorkoutUsers
        /// <summary>
        /// Add workout to user schedule
        /// </summary>
        /// <param name="workoutUser">user id with workout id</param>
        /// <returns>Added schedule for specific user</returns>
        [HttpPost("join")]
        public async Task<ActionResult<Public.DTO.v1.ScheduleDTO>> PostWorkoutUser(BLL.DTO.WorkoutUser workoutUser)
        {
            workoutUser.AppUserId = User.GetUserId();

            var workout = await _bll.WorkoutService.FindAsync(workoutUser.WorkoutId);

            if (workout == null)
            {
                return NotFound();
            }

            if (workout.MaxParticipants < workout.WorkoutUsers!.Count + 1)
            {
                return BadRequest("Too much parcipiants");
            }


            // var mappedSchedule = _mapper.Map(workoutUser);

            var res = _bll.WorkoutUserService.Add(workoutUser);

            await _bll.SaveChangesAsync();

            return Ok("Added");
        }

        // DELETE: api/WorkoutUsers/{id}
        /// <summary>
        /// Remove schedule (remove workout from user)
        /// </summary>
        /// <param name="id">schedule id</param>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWorkoutUser(Guid id)
        {
            var workout = await _bll.WorkoutUserService.FindAsync(id);
            if (workout == null)
            {
                return NotFound();
            }

            if (workout.AppUserId != User.GetUserId())
            {
                return BadRequest("no hacking");
            }

            await _bll.WorkoutUserService.RemoveAsyncById(id);
            await _bll.SaveChangesAsync();

            return NoContent();
        }
        //
        // [HttpGet]
        // public async Task<ActionResult<IEnumerable<WorkoutUser>>> GetSkillLevels()
        // {
        //     if (_context.WorkoutUsers == null)
        //     {
        //         return NotFound();
        //     }
        //     return await _context.WorkoutUsers.ToListAsync();
        // }
    }
}
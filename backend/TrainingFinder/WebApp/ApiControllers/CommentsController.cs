using Asp.Versioning;
using AutoMapper;
using BLL.Contracts.App;
using Domain.App;
using Helpers.Base;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Public.DTO.Mappers;
using Public;


namespace WebApp.ApiControllers
{
    [ApiVersion("1.0")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/v{version:apiVersion}/[controller]")]
    public class CommentsController : ControllerBase
    {
        private readonly IAppBLL _bll;
        private readonly CommentMapper _mapper;

        public CommentsController(IAppBLL bll, IMapper autoMapper)
        {
            _bll = bll;
            _mapper = new CommentMapper(autoMapper);
        }


        // POST: api/v{version}/Comments
        /// <summary>
        /// Add comment to workout
        /// </summary>
        /// <param name="comment">comment info</param>
        /// <returns>Added comment with id</returns>
        [HttpPost]
        public async Task<ActionResult<Public.DTO.v1.CommentDTO>> PostComment(Public.DTO.v1.CommentDTO comment)
        {
            var mapperComment = _mapper.Map(comment);

            if (mapperComment == null)
            {
                return BadRequest("error adding comment");
            }

            var res = _bll.CommentService.Add(mapperComment);
            await _bll.SaveChangesAsync();
            return Ok(res);
        }

        // PUT: api/v{version}/Comments/5
        /// <summary>
        /// Update comment
        /// </summary>
        /// <param name="id">id of updating comment</param>
        /// <param name="comment">comment info</param>
        [HttpPut("{id}")]
        public async Task<IActionResult> PutComment(Guid id, Public.DTO.v1.CommentDTO comment)
        {
            if (id != comment.Id)
            {
                return BadRequest();
            }

            var ownerСheck = await _bll.CommentService.IsOwnedByUserAsync(id, User.GetUserId());

            if (!ownerСheck)
            {
                return BadRequest("No hacking (bad user id)!");
            }


            var bllComment = _mapper.Map(comment);

            bllComment!.AppUserId = User.GetUserId();

            _bll.CommentService.Update(bllComment);


            await _bll.SaveChangesAsync();

            return NoContent();
        }


        // DELETE: api/v{version}/Comments/5
        /// <summary>
        /// Delete comment by id
        /// </summary>
        /// <param name="id">id of deleting comment</param>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComment(Guid id)
        {
            var comment = await _bll.CommentService.FindAsync(id);

            var userId = User.GetUserId();

            if (comment == null)
            {
                return NotFound();
            }
            
            if (comment.Workout?.AppUserId == userId || comment.AppUserId == userId)
            {
                await _bll.CommentService.RemoveAsyncById(comment.Id);

                await _bll.SaveChangesAsync();
                return NoContent();
            }


            return BadRequest("You do not have access to remove this comment!");
        }
    }
}
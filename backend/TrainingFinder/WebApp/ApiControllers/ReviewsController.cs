using Asp.Versioning;
using AutoMapper;
using BLL.Contracts.App;
using Microsoft.AspNetCore.Mvc;
using Domain.App;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Public.DTO.Mappers;

namespace WebApp.ApiControllers
{
    [ApiVersion("1.0")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/v{version:apiVersion}/[controller]")]
    public class ReviewsController : ControllerBase
    {
        private readonly IAppBLL _bll;
        private readonly ReviewMapper _mapper;

        public ReviewsController(IAppBLL bll, IMapper autoMapper)
        {
            _bll = bll;
            _mapper = new ReviewMapper(autoMapper);
        }

        // POST: api/v{version}/Reviews
        /// <summary>
        /// Add review to user
        /// </summary>
        /// <param name="review">review information, contains text, user id who adds and to whom</param>
        [HttpPost]
        public async Task<ActionResult<Public.DTO.v1.ReviewDTO>> PostReview(Public.DTO.v1.ReviewDTO review)
        {
            var bllReview = _mapper.Map(review);

            if (bllReview == null)
            {
                return NotFound();
            }
            
            bllReview.CreatedAt = DateTime.Now;
            
            // review.CreatedAt = DateTime.Now;
  
            var res = _bll.ReviewService.Add(bllReview);
            await _bll.SaveChangesAsync();
            return Ok(res);
        }
    }
}
import React, { useState, useEffect } from "react";
function Testimonials() {

   const testimonials = [
    {
        rating: 4.5,
        description: "This platform has transformed my learning experience. The courses are well-structured and the instructors are knowledgeable.",
        authorName: "John Doe",
        authorNewsPaper: "Tech Times",
        authorImageURL: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
        rating: 5,
        description: "I love the interactive content and the supportive community. It has helped me achieve my goals faster than I expected.",
        authorName: "Jane Smith",
        authorNewsPaper: "Learning Weekly",
        authorImageURL: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
        rating: 4.8,
        description: "The courses are well-organized and easy to follow. The instructors are passionate and knowledgeable.",
        authorName: "Mark Johnson",
        authorNewsPaper: "Tech Buzz",
        authorImageURL: "https://randomuser.me/api/portraits/men/2.jpg"
    }
  ]
  // Function to render stars safely
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    return (
      <div className="flex text-yellow-400 mb-3">
        {"★".repeat(fullStars)}
        {halfStar && "☆"}
      </div>
    );
  };

  return (
    <section className="py-16 px-4 ">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          <span className="bg-[#6b2d2d] bg-clip-text text-transparent">Testimonials</span>
        </h2>
        <p className="text-[#6b2d2d] mb-12">
         What our learners say, Stories of success and growth
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-[#969393] shadow-md rounded-xl p-6 text-left border border-gray-100 hover:shadow-lg transition"
            >
              {/* Rating Stars */}
              {renderStars(testimonial.rating)}

              {/* Testimonial Description */}
              <p className="text-[#6b2d2d] mb-4">{testimonial.description}</p>

              {/* Author Section */}
              {testimonial.authorImageURL ? (
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.authorImageURL}
                    alt={testimonial.authorName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-[#6b2d2d]">
                      {testimonial.authorName}
                    </h4>
                    <p className="text-sm text-[#6b2d2d]">
                      {testimonial.authorNewsPaper}
                    </p>
                  </div>
                </div>
              ) : (
                <h4 className="font-semibold text-[#6b2d2d]">
                  {testimonial.authorNewsPaper}
                </h4>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;

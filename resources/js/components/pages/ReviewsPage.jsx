import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ReviewsPage() {
    const [filterRating, setFilterRating] = useState(null);

    const reviews = [
        {
            id: 1,
            name: 'Sarah M.',
            location: 'California',
            rating: 5,
            date: '2024-10-15',
            title: 'Saved me thousands!',
            content: 'I was nervous about doing this alone, but WithMilestone made it so easy. The questionnaire was straightforward and I had my documents in just a few hours. This would have cost me $2,000+ with a lawyer. Highly recommend!',
            verified: true,
        },
        {
            id: 2,
            name: 'John D.',
            location: 'Texas',
            rating: 5,
            date: '2024-10-10',
            title: 'Professional and affordable',
            content: 'Best decision I made. The whole process was smooth and professional. I got exactly what I needed without all the legal jargon. Great customer service too when I had questions.',
            verified: true,
        },
        {
            id: 3,
            name: 'Emily R.',
            location: 'New York',
            rating: 5,
            date: '2024-09-28',
            title: 'Fast and efficient',
            content: 'I completed everything in about an hour. The forms were clear, the guidance was helpful, and I was able to move forward with my life without the headache of hiring an attorney.',
            verified: true,
        },
        {
            id: 4,
            name: 'Michael T.',
            location: 'Florida',
            rating: 4,
            date: '2024-09-15',
            title: 'Good service, great price',
            content: 'Overall very satisfied. The documents were customized for Florida laws and everything was what I needed. Only minor issue was waiting for support response, but they eventually got back to me.',
            verified: true,
        },
        {
            id: 5,
            name: 'Jessica L.',
            location: 'Illinois',
            rating: 5,
            date: '2024-09-10',
            title: 'No regrets',
            content: 'This was exactly what I was looking for. No complicated legal jargon, no pressure, no expensive attorney fees. Just the documents I needed to move forward. Recommend to anyone considering divorce.',
            verified: true,
        },
        {
            id: 6,
            name: 'David K.',
            location: 'Pennsylvania',
            rating: 5,
            date: '2024-08-30',
            title: 'Outstanding experience',
            content: 'From start to finish, everything was clear and easy to understand. The website is user-friendly, the process is logical, and the support team is helpful. Worth every penny.',
            verified: true,
        },
        {
            id: 7,
            name: 'Linda S.',
            location: 'Ohio',
            rating: 4,
            date: '2024-08-20',
            title: 'Helpful and affordable',
            content: 'Great alternative to expensive lawyers. The documents were everything I needed and the process was straightforward. My only suggestion would be more detailed guides for some sections.',
            verified: true,
        },
        {
            id: 8,
            name: 'Robert M.',
            location: 'Georgia',
            rating: 5,
            date: '2024-08-10',
            title: 'Highly recommend',
            content: 'Simple, fast, and affordable. Exactly what I was looking for. The questionnaire asked all the right questions to generate the right documents. Best decision I made.',
            verified: true,
        },
        {
            id: 9,
            name: 'Amanda P.',
            location: 'Michigan',
            rating: 5,
            date: '2024-07-25',
            title: 'Life-changing service',
            content: 'Going through a divorce is stressful, but WithMilestone made the document part easy. I could focus on the emotional side while they handled the legal paperwork. Thank you!',
            verified: true,
        },
        {
            id: 10,
            name: 'Christopher N.',
            location: 'North Carolina',
            rating: 4,
            date: '2024-07-15',
            title: 'Solid service',
            content: 'Good value for money. Documents were accurate and state-specific. The process was faster than I expected. Would definitely recommend to friends.',
            verified: true,
        },
    ];

    const filteredReviews = filterRating
        ? reviews.filter(review => review.rating === filterRating)
        : reviews;

    const averageRating = (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1);
    const ratingCounts = {
        5: reviews.filter(r => r.rating === 5).length,
        4: reviews.filter(r => r.rating === 4).length,
        3: reviews.filter(r => r.rating === 3).length,
        2: reviews.filter(r => r.rating === 2).length,
        1: reviews.filter(r => r.rating === 1).length,
    };

    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => (
            <span key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300'}>
                ⭐
            </span>
        ));
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 mb-12">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Customer Reviews</h1>
                    <p className="text-xl text-gray-600">
                        See what thousands of satisfied customers say about WithMilestone
                    </p>
                </div>
            </section>

            {/* Rating Summary Section */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Overall Rating */}
                    <div className="bg-white rounded-lg shadow-md p-8 text-center">
                        <div className="text-6xl font-bold text-blue-600 mb-2">{averageRating}</div>
                        <div className="flex justify-center gap-1 mb-4">
                            {renderStars(Math.round(averageRating))}
                        </div>
                        <p className="text-gray-600">Based on {reviews.length} verified reviews</p>
                    </div>

                    {/* Rating Distribution */}
                    <div className="md:col-span-2 bg-white rounded-lg shadow-md p-8">
                        <h3 className="font-bold text-gray-900 mb-6">Rating Distribution</h3>
                        <div className="space-y-3">
                            {[5, 4, 3, 2, 1].map((rating) => (
                                <div key={rating} className="flex items-center gap-4">
                                    <span className="text-sm font-medium text-gray-700 w-12">{rating}★</span>
                                    <div className="flex-grow bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-yellow-400 h-2 rounded-full transition-all"
                                            style={{ width: `${(ratingCounts[rating] / reviews.length) * 100}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-sm text-gray-600 w-12 text-right">{ratingCounts[rating]}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Filter Section */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={() => setFilterRating(null)}
                        className={`px-6 py-2 rounded-lg font-medium transition ${
                            filterRating === null
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-600'
                        }`}
                    >
                        All Reviews
                    </button>
                    {[5, 4, 3, 2, 1].map((rating) => (
                        <button
                            key={rating}
                            onClick={() => setFilterRating(rating)}
                            className={`px-6 py-2 rounded-lg font-medium transition ${
                                filterRating === rating
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-600'
                            }`}
                        >
                            {rating} ★ ({ratingCounts[rating]})
                        </button>
                    ))}
                </div>
            </section>

            {/* Reviews Grid */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredReviews.map((review) => (
                        <div key={review.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="font-bold text-gray-900">{review.name}</h3>
                                    <p className="text-sm text-gray-600">{review.location}</p>
                                </div>
                                {review.verified && (
                                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">
                                        ✓ Verified
                                    </span>
                                )}
                            </div>

                            <div className="flex items-center gap-2 mb-3">
                                <div className="flex gap-1">{renderStars(review.rating)}</div>
                                <span className="text-sm text-gray-600">{new Date(review.date).toLocaleDateString()}</span>
                            </div>

                            <h4 className="font-semibold text-gray-900 mb-2">{review.title}</h4>
                            <p className="text-gray-600 leading-relaxed text-sm">{review.content}</p>
                        </div>
                    ))}
                </div>

                {filteredReviews.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-600 text-lg">No reviews found for this rating.</p>
                    </div>
                )}
            </section>

            {/* Stats Section */}
            <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 mb-16">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Why Customers Love Us</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="text-5xl font-bold text-blue-600 mb-2">10,000+</div>
                            <p className="text-gray-600">Happy Customers</p>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl font-bold text-blue-600 mb-2">{averageRating}</div>
                            <p className="text-gray-600">Average Rating</p>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl font-bold text-blue-600 mb-2">95%</div>
                            <p className="text-gray-600">Would Recommend</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-blue-600 text-white py-16 px-4 sm:px-6 lg:px-8 mb-16">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-6">Join Thousands of Satisfied Customers</h2>
                    <p className="text-xl mb-8 text-blue-50">
                        Get your divorce documents easily and affordably.
                    </p>
                    <Link
                        to="/assessment"
                        className="inline-block bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition"
                    >
                        Check Your Eligibility
                    </Link>
                </div>
            </section>
        </div>
    );
}

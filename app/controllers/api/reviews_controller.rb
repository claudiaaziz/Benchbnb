class Api::ReviewsController < ApplicationController
  before_action :require_logged_in
  wrap_parameters include: Review.attribute_names + ['benchId']

  def create
    @review = current_user.reviews.new(review_params)

    if @review.save
      render json: { message: "Review created & added to it's specific bench succesfully." }, status: :created
    else
      render json: { errors: @review.errors.full_messages }, status: 422
    end
  end

  def destroy
    @review = current_user.reviews.find(params[:id])

    if @review.destroy
      render json: { message: 'Review deleted successfully', deleted_review: @review }
    else
      render json: { errors: @review.errors.full_messages }, status: 422
    end
  end

  private

  def review_params 
    params.require(:review).permit(:body, :bench_id, :rating)
  end
end

class Api::ReviewsController < ApplicationController
  wrap_parameters include: Review.attribute_names + ['benchId']
  before_action :require_logged_in

  def create
    @review = current_user.reviews.build(review_params)

    if @review.save
      render :show
    else
      # puts  @review.errors.full_messages

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

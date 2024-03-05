class Api::ReviewsController < ApplicationController
  before_action :require_logged_in

  def create
    @review = current_user.reviews.build(review_params)

    if @review.save
      render json: { review: @review }
    else
      puts @review.errors.full_messages
      render json: { errors: @review.errors.full_messages }, status: 422
    end
  end

  def destroy
    @review = current_user.reviews.find(params[:id])
    @review.destroy
  end

  private

  def review_params 
    params.require(:review).permit(:body, :user_id, :bench_id, :rating)
  end
end

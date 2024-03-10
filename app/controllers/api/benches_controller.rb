class Api::BenchesController < ApplicationController
  before_action :require_logged_in, only: :create
  wrap_parameters include: Bench.attribute_names + [:photo], format: :multipart_form

  def index
    @benches = Bench.all
    @benches = @benches.in_bounds(bounds) if bounds
    @benches = @benches.where(seating: seating_range) if seating_range
  end

  def create
    @bench = Bench.new(bench_params)

    if @bench.save
      render :show
    else
      render json: { errors: @bench.errors.full_messages }, status: 422
    end
  end

  def show
    @bench = Bench.find(params[:id])
  end

  private

  def bench_params 
    params.require(:bench).permit(:price, :seating, :lat, :lng, :title, :description, :photo)
  end

  def bounds
    params[:bounds].split(',').map(&:to_f)
  end

  def seating_range
    return nil unless params[:min_seating] && params[:max_seating]
    params[:min_seating].to_i..params[:max_seating].to_i
  end
end

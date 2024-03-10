class Api::BenchesController < ApplicationController
  before_action :require_logged_in, only: :create

  def index
    if params[:bounds]
      bounds = params[:bounds].split(',').map(&:to_f)
      @benches = Bench.in_bounds(bounds)
    else
      @benches = Bench.all
    end
  end

  def create
    @bench = Bench.new(bench_params)
    @user

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
    params.require(:bench).permit(:price, :seating, :lat, :lng, :title, :description)
  end
end

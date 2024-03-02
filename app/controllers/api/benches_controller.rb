class Api::BenchesController < ApplicationController
  def index
    @benches = Bench.all
    render :index
  end

  def create
    @bench = Bench.new(bench_params)

    if @bench.save
      render :show
    else
      puts @bench.errors.full_messages
      render json: { errors: @bench.errors.full_messages }, status: 422
    end
  end

  def show
    @bench = Bench.find(params[:id])
    render :show
  end

  private

  def bench_params 
    params.require(:bench).permit(:price, :seating, :lat, :lng, :title, :description)
  end
end

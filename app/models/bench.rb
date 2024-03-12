class Bench < ApplicationRecord
  validates :title, :description, :price, :seating, :lat, :lng, presence: true
  validates :price, inclusion: { in: 10..1000, message: "must be between $10 and $1000" }

  has_many :reviews, dependent: :destroy
  has_one_attached :photo

  def self.in_bounds(bounds)
    sw_lat, sw_lng, ne_lat, ne_lng = bounds
    where(lat: sw_lat..ne_lat, lng: sw_lng..ne_lng)
  end
end
